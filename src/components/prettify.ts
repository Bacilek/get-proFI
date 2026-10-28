/**
 * Layout helpers for lesson markdown, so dense authored text reads as separate blocks:
 *  - `remarkPrettify`: one paragraph per source line and per labelled sentence ("**Label:** ..."),
 *    and a paragraph that is only a formula becomes display math (boxed by CSS).
 *  - `rehypeSections`: every `##` heading starts a styled card; labelled paragraphs get the `term` class.
 */

interface MNode {
  type: string
  value?: string
  children?: MNode[]
}

const SENTENCE_END = /[.;!?]$/

const textOf = (n: MNode): string => n.value ?? (n.children ?? []).map(textOf).join('')

function splitParagraph(p: MNode): MNode[] {
  const parts: MNode[][] = [[]]
  const kids = p.children ?? []
  kids.forEach((child, i) => {
    if (child.type === 'text' && child.value?.includes('\n')) {
      const lines = child.value.split('\n')
      lines.forEach((line, k) => {
        if (k > 0) parts.push([])
        if (line !== '') parts[parts.length - 1].push({ ...child, value: line })
      })
      return
    }
    const prev = kids[i - 1]
    const labelled = child.type === 'strong' && textOf(child).trim().endsWith(':')
    if (labelled && prev?.type === 'text' && SENTENCE_END.test((prev.value ?? '').trim())) parts.push([])
    parts[parts.length - 1].push(child)
  })
  return parts
    .map((children) => {
      const first = children[0]
      const last = children[children.length - 1]
      if (first?.type === 'text') first.value = first.value!.replace(/^\s+/, '')
      if (last?.type === 'text') last.value = last.value!.replace(/\s+$/, '')
      return children.filter((c) => c.type !== 'text' || c.value !== '')
    })
    .filter((children) => children.length > 0)
    .map((children): MNode => {
      const formulaOnly = children.length === 1 && children[0].type === 'inlineMath'
      return formulaOnly ? { type: 'math', value: children[0].value } : { type: 'paragraph', children }
    })
}

function walk(node: MNode): void {
  if (!node.children || node.type === 'tableCell') return
  node.children = node.children.flatMap((child) => {
    walk(child)
    return child.type === 'paragraph' ? splitParagraph(child) : [child]
  })
}

export function remarkPrettify() {
  return (tree: MNode) => walk(tree)
}

// --- hast (rehype) ---

interface HNode {
  type: string
  tagName?: string
  value?: string
  properties?: Record<string, unknown>
  children?: HNode[]
}

const SECTION_KINDS: [RegExp, string][] = [
  [/intuice/i, 'intro'],
  [/vzorec|vzorce|definice/i, 'formula'],
  [/mini\s*p[řr]íklad|příklad/i, 'example'],
  [/pozor/i, 'warn'],
  [/praxe/i, 'practice'],
]

const hastText = (n: HNode): string => n.value ?? (n.children ?? []).map(hastText).join('')

function markTerms(node: HNode): void {
  for (const child of node.children ?? []) {
    if (child.type !== 'element') continue
    const first = child.children?.[0]
    if (child.tagName === 'p' && first?.type === 'element' && first.tagName === 'strong' && hastText(first).trim().endsWith(':')) {
      child.properties = { ...child.properties, className: ['term'] }
    }
    markTerms(child)
  }
}

export function rehypeSections() {
  return (tree: HNode) => {
    const out: HNode[] = []
    let current: HNode | null = null
    for (const child of tree.children ?? []) {
      if (child.type === 'element' && child.tagName === 'h2') {
        const kind = SECTION_KINDS.find(([re]) => re.test(hastText(child)))?.[1] ?? 'other'
        current = { type: 'element', tagName: 'section', properties: { className: ['sec', `sec-${kind}`] }, children: [child] }
        out.push(current)
      } else if (current) {
        current.children!.push(child)
      } else {
        out.push(child)
      }
    }
    tree.children = out
    markTerms(tree)
  }
}
