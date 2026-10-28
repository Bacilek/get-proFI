import { remarkPrettify } from './prettify'

type N = { type: string; value?: string; children?: N[] }
const text = (value: string): N => ({ type: 'text', value })
const run = (children: N[]): N[] => {
  const tree: N = { type: 'root', children: [{ type: 'paragraph', children }] }
  remarkPrettify()(tree)
  return tree.children!
}

test('soft line breaks become separate paragraphs', () => {
  const out = run([text('first line\nsecond line')])
  expect(out.map((p) => p.type)).toEqual(['paragraph', 'paragraph'])
  expect(out[1].children![0].value).toBe('second line')
})

test('a labelled sentence after a full stop starts a new paragraph', () => {
  const out = run([
    { type: 'strong', children: [text('Rule:')] },
    text(' do x. '),
    { type: 'strong', children: [text('Soundness:')] },
    text(' holds.'),
  ])
  expect(out).toHaveLength(2)
  expect(out[1].children![0].type).toBe('strong')
})

test('a label in the middle of a sentence does not split', () => {
  const out = run([text('see the '), { type: 'strong', children: [text('Note:')] }, text(' below')])
  expect(out).toHaveLength(1)
})

test('a paragraph that is only a formula becomes display math', () => {
  const out = run([{ type: 'inlineMath', value: 'a^2+b^2=c^2' }])
  expect(out).toEqual([{ type: 'math', value: 'a^2+b^2=c^2' }])
})
