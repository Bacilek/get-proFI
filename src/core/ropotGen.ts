import type { ChoiceQuestion } from './questions'

/** Random numbers in [0, 1); injected so generators are reproducible in tests. */
export type Rng = () => number
export type Level = 'easy' | 'hard'

export function makeRng(seed: number): Rng {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const int = (r: Rng, a: number, b: number) => a + Math.floor(r() * (b - a + 1))
const pick = <T>(r: Rng, xs: readonly T[]): T => xs[Math.floor(r() * xs.length)]

export function shuffle<T>(r: Rng, xs: readonly T[]): T[] {
  const out = [...xs]
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(r() * (i + 1))
    ;[out[i], out[j]] = [out[j], out[i]]
  }
  return out
}

/** Builds a 4-option question: the correct option plus the first three distinct wrong ones, shuffled. */
function choice(r: Rng, id: string, prompt: string, correct: string, wrong: string[], solution: string, hints?: string[]): ChoiceQuestion {
  const distinct = [...new Set(wrong.filter((w) => w !== correct))].slice(0, 3)
  if (distinct.length < 3) throw new Error(`generator ${id}: not enough distinct distractors`)
  const options = shuffle(r, [correct, ...distinct])
  return { id, type: 'choice', prompt, options, answer: options.indexOf(correct), solution, hints }
}

/** Numeric answer with plausible neighbours as distractors (extra candidates come first-choice after `near`). */
function numeric(r: Rng, id: string, prompt: string, correct: number, near: number[], solution: string, hints?: string[], fmt = String): ChoiceQuestion {
  const pool = [...near, correct + 1, correct - 1, correct + 2, correct - 2, correct + 3].filter((v) => v >= 0 && v !== correct)
  return choice(r, id, prompt, fmt(correct), pool.map(fmt), solution, hints)
}

export interface Generator {
  id: string
  /** Lecture number the questions belong to (ROPOT k tests lecture k-1). */
  lecture: number
  make(r: Rng, level: Level): ChoiceQuestion
}

const uid = (r: Rng, name: string) => `gen-${name}-${int(r, 1, 999999)}`

// --- lecture 2: search ---

const GOAL = [1, 2, 3, 4, 5, 6, 7, 8, 0]
function puzzleHeuristics(board: number[]) {
  let h1 = 0
  let h2 = 0
  board.forEach((t, i) => {
    if (t === 0) return
    const g = GOAL.indexOf(t)
    if (g !== i) h1++
    h2 += Math.abs(Math.floor(i / 3) - Math.floor(g / 3)) + Math.abs((i % 3) - (g % 3))
  })
  return { h1, h2 }
}

const puzzle: Generator = {
  id: 'puzzle',
  lecture: 2,
  make(r, level) {
    let board: number[]
    let h: { h1: number; h2: number }
    do {
      board = shuffle(r, GOAL)
      h = puzzleHeuristics(board)
    } while (h.h1 === h.h2 || h.h1 < 3)
    const rows = [0, 1, 2].map((i) => board.slice(i * 3, i * 3 + 3).map((t) => (t === 0 ? '_' : String(t))).join(' '))
    const show = `\`\`\`\n${rows.join('\n')}\n\`\`\``
    const goal = '```\n1 2 3\n4 5 6\n7 8 _\n```'
    const manhattan = level === 'hard'
    const correct = manhattan ? h.h2 : h.h1
    const other = manhattan ? h.h1 : h.h2
    return numeric(
      r,
      uid(r, 'puzzle'),
      `8-puzzle, aktuální stav:\n\n${show}\n\ncílový stav:\n\n${goal}\n\nJaká je hodnota heuristiky „${manhattan ? 'součet Manhattanských vzdáleností dlaždic od cíle' : 'počet dlaždic (bez mezery) mimo svou cílovou pozici'}“?`,
      correct,
      [other],
      `Počet dlaždic mimo místo: $h_1=${h.h1}$. Součet Manhattanských vzdáleností: $h_2=${h.h2}$. Vždy platí $h_1\\le h_2$ (každá dlaždice mimo místo má vzdálenost aspoň 1).`,
      [manhattan ? 'Pro každou dlaždici spočítej |Δřádek| + |Δsloupec| k cíli a sečti (mezeru nepočítej).' : 'Porovnej pozici po pozici s cílem; mezeru nepočítej.'],
    )
  },
}

const nextNode: Generator = {
  id: 'next-node',
  lecture: 2,
  make(r, level) {
    for (let tries = 0; tries < 400; tries++) {
      const names = shuffle(r, ['A', 'B', 'C', 'D', 'E', 'F']).slice(0, 4).sort()
      const nodes = names.map((name) => ({ name, g: int(r, 1, 9), h: int(r, 0, 8) }))
      const argmin = (key: (n: (typeof nodes)[number]) => number) => {
        const best = Math.min(...nodes.map(key))
        const hit = nodes.filter((n) => key(n) === best)
        return hit.length === 1 ? hit[0].name : null
      }
      const a = argmin((n) => n.g + n.h)
      const gr = argmin((n) => n.h)
      const u = argmin((n) => n.g)
      if (!a || !gr || !u) continue
      const strategy = level === 'hard' ? 'A*' : pick(r, ['greedy', 'UCS'])
      if (level === 'hard' && (a === gr || a === u)) continue
      const target = strategy === 'A*' ? a : strategy === 'greedy' ? gr : u
      const label = strategy === 'A*' ? '$f=g+h$' : strategy === 'greedy' ? 'podle $h$' : 'podle $g$'
      const table = `| uzel | g | h |\n|---|---|---|\n${nodes.map((n) => `| ${n.name} | ${n.g} | ${n.h} |`).join('\n')}`
      const name = strategy === 'A*' ? 'A*' : strategy === 'greedy' ? 'Greedy best-first' : 'Uniform-cost (UCS)'
      return choice(
        r,
        uid(r, 'next'),
        `Okraj (fronta) obsahuje uzly s cenou cesty $g$ a heuristikou $h$:\n\n${table}\n\nKterý uzel expanduje algoritmus **${name}** jako další?`,
        target,
        nodes.map((n) => n.name),
        `${name} vybírá minimum ${label}. ${strategy === 'A*' ? `Hodnoty $f$: ${nodes.map((n) => `${n.name}=${n.g + n.h}`).join(', ')}.` : ''} Vybere se **${target}**.`,
        ['Nejdřív urči, jakou hodnotu algoritmus minimalizuje: A* $g+h$, greedy jen $h$, UCS jen $g$.'],
      )
    }
    throw new Error('next-node: no unambiguous instance')
  },
}

const traversal: Generator = {
  id: 'traversal',
  lecture: 2,
  make(r, level) {
    const letters = 'ABCDEFGHIJKLMNO'.split('')
    const children = (i: number) => [2 * i + 1, 2 * i + 2].filter((c) => c < 15)
    const dfs: number[] = []
    const walk = (i: number) => {
      dfs.push(i)
      children(i).forEach(walk)
    }
    walk(0)
    const depth = (i: number) => Math.floor(Math.log2(i + 1))
    const candidates = letters.map((_, i) => i).filter((i) => (level === 'hard' ? depth(i) === 3 : depth(i) >= 1 && depth(i) <= 2))
    const t = pick(r, candidates)
    const useDfs = r() < 0.5
    const pos = (useDfs ? dfs.indexOf(t) : t) + 1
    const alt = (useDfs ? t : dfs.indexOf(t)) + 1
    const tree = [0, 1, 2, 3, 4, 5, 6].map((i) => `${letters[i]} -> ${children(i).map((c) => letters[c]).join(', ')}`).join('\n')
    return numeric(
      r,
      uid(r, 'trav'),
      `Strom (potomci se zkoumají zleva doprava, kořen je A):\n\n\`\`\`\n${tree}\n\`\`\`\n\nKolikátý v pořadí expandovaný uzel je **${letters[t]}** při prohledávání ${useDfs ? 'do hloubky (DFS)' : 'do šířky (BFS)'}? (Kořen A je 1.)`,
      pos,
      [alt],
      useDfs
        ? `DFS (preorder): ${dfs.map((i) => letters[i]).join(', ')}. Uzel ${letters[t]} je na pozici ${pos}.`
        : `BFS po úrovních: ${letters.join(', ')}. Uzel ${letters[t]} je na pozici ${pos}.`,
      [useDfs ? 'DFS jde vždy nejdřív do levého potomka, dokud může.' : 'BFS expanduje celou úroveň, než jde na další.'],
    )
  },
}

// --- lecture 3: CSP ---

export function countColorings(shape: 'path' | 'cycle', n: number, k: number): number {
  return shape === 'path' ? k * (k - 1) ** (n - 1) : (k - 1) ** n + (n % 2 === 0 ? 1 : -1) * (k - 1)
}

const coloring: Generator = {
  id: 'coloring',
  lecture: 3,
  make(r, level) {
    const shape = level === 'hard' ? 'cycle' : 'path'
    const n = shape === 'path' ? int(r, 3, 5) : int(r, 3, 5)
    const k = int(r, 3, 4)
    const c = countColorings(shape, n, k)
    return numeric(
      r,
      uid(r, 'col'),
      `Graf je ${shape === 'path' ? `cesta` : `cyklus`} o ${n} uzlech (${shape === 'path' ? 'uzly spojené za sebou, první s posledním ne' : 'uzly spojené za sebou a poslední s prvním'}). Kolika způsoby ho lze obarvit ${k} barvami tak, aby sousední uzly měly různé barvy?`,
      c,
      [k ** n, k * (k - 1) ** n, (k - 1) ** n, shape === 'path' ? countColorings('cycle', n, k) : countColorings('path', n, k)],
      shape === 'path'
        ? `První uzel $${k}$ způsoby, každý další $${k - 1}$ (liší se od předchozího): $${k}\\cdot${k - 1}^{${n - 1}}=${c}$.`
        : `Cyklus: $(k-1)^n+(-1)^n(k-1)=${k - 1}^{${n}}${n % 2 === 0 ? '+' : '-'}${k - 1}=${c}$.`,
      [shape === 'path' ? 'Kolik možností má první uzel a kolik každý další?' : 'Cyklus je omezenější než cesta: poslední uzel se musí lišit od dvou sousedů.'],
    )
  },
}

// --- lecture 4: games ---

type Tree = number[][]

export function alphaBeta(tree: Tree, strict: boolean): { value: number; leaves: number } {
  let leaves = 0
  let alpha = -Infinity
  let best = -Infinity
  for (const branch of tree) {
    let beta = Infinity
    let v = Infinity
    for (const leaf of branch) {
      leaves++
      v = Math.min(v, leaf)
      beta = Math.min(beta, v)
      if (strict ? beta <= alpha : beta < alpha) break
    }
    best = Math.max(best, v)
    alpha = Math.max(alpha, best)
  }
  return { value: best, leaves }
}

const minimax: Generator = {
  id: 'minimax',
  lecture: 4,
  make(r, level) {
    for (let tries = 0; tries < 500; tries++) {
      const tree: Tree = [0, 1, 2].map(() => [0, 1, 2].map(() => int(r, 1, 9)))
      const value = Math.max(...tree.map((b) => Math.min(...b)))
      const a = alphaBeta(tree, true)
      const b = alphaBeta(tree, false)
      if (a.value !== value || a.leaves !== b.leaves) continue
      if (level === 'hard' && a.leaves === 9) continue
      const show = tree.map((b2, i) => `MIN ${i + 1}: ${b2.join(', ')}`).join('\n')
      const base = `Kořen je uzel MAX, má tři potomky MIN; listy zleva doprava:\n\n\`\`\`\n${show}\n\`\`\`\n\n`
      if (level === 'easy') {
        return numeric(
          r,
          uid(r, 'mm'),
          `${base}Jaká je minimaxová hodnota kořene?`,
          value,
          [Math.max(...tree.flat()), Math.min(...tree.flat()), ...tree.map((b2) => Math.max(...b2))],
          `Hodnoty MIN uzlů: ${tree.map((b2) => Math.min(...b2)).join(', ')}; MAX z nich je ${value}.`,
          ['Nejdřív spočítej minimum v každé větvi, pak z těchto minim vyber maximum.'],
        )
      }
      return numeric(
        r,
        uid(r, 'ab'),
        `${base}Kolik listů prohlédne alfa-beta prořezávání (zleva doprava) před určením hodnoty kořene?`,
        a.leaves,
        [9, 9 - (9 - a.leaves) * 2, a.leaves + 1],
        `Alfa-beta prohlédne ${a.leaves} z 9 listů, hodnota kořene je ${value}. Větev se přeruší, jakmile její dosavadní minimum je $\\le\\alpha$ (už nemůže zlepšit MAX).`,
        ['Po první větvi je $\\alpha$ její minimum. U dalších větví ukonči prohlížení, když minimum klesne pod $\\alpha$ (nebo se mu rovná).'],
      )
    }
    throw new Error('minimax: no unambiguous instance')
  },
}

// --- lecture 5: propositional logic ---

type F = { k: 'v'; n: string } | { k: 'n'; a: F } | { k: 'b'; op: '∧' | '∨' | '⇒' | '⇔'; a: F; b: F }

function evalF(f: F, env: Record<string, boolean>): boolean {
  if (f.k === 'v') return env[f.n]
  if (f.k === 'n') return !evalF(f.a, env)
  const a = evalF(f.a, env)
  const b = evalF(f.b, env)
  return f.op === '∧' ? a && b : f.op === '∨' ? a || b : f.op === '⇒' ? !a || b : a === b
}

function tex(f: F, top = true): string {
  if (f.k === 'v') return f.n
  if (f.k === 'n') return `\\lnot ${tex(f.a, false)}`
  const op = { '∧': '\\land', '∨': '\\lor', '⇒': '\\Rightarrow', '⇔': '\\Leftrightarrow' }[f.op]
  const s = `${tex(f.a, false)} ${op} ${tex(f.b, false)}`
  return top ? s : `(${s})`
}

export function modelCount(f: F): number {
  let count = 0
  for (let m = 0; m < 8; m++) {
    if (evalF(f, { p: !!(m & 1), q: !!(m & 2), r: !!(m & 4) })) count++
  }
  return count
}

function randomFormula(r: Rng): F {
  const lit = (): F => {
    const v: F = { k: 'v', n: pick(r, ['p', 'q', 'r']) }
    return r() < 0.35 ? { k: 'n', a: v } : v
  }
  const bin = (a: F, b: F): F => ({ k: 'b', op: pick(r, ['∧', '∨', '⇒', '⇔'] as const), a, b })
  return bin(r() < 0.5 ? bin(lit(), lit()) : lit(), r() < 0.5 ? bin(lit(), lit()) : lit())
}

const truth: Generator = {
  id: 'truth',
  lecture: 5,
  make(r, level) {
    const want = pick(r, ['tautology', 'satisfiable', 'unsat'] as const)
    let f = randomFormula(r)
    for (let i = 0; i < 400; i++) {
      const c = modelCount(f)
      const cls = c === 8 ? 'tautology' : c === 0 ? 'unsat' : 'satisfiable'
      if (level === 'hard' || cls === want) break
      f = randomFormula(r)
    }
    const c = modelCount(f)
    const formula = `$${tex(f)}$`
    if (level === 'hard') {
      return numeric(
        r,
        uid(r, 'models'),
        `Kolik interpretací proměnných $p,q,r$ (z 8 možných) splňuje formuli ${formula}?`,
        c,
        [8 - c, 4],
        `Vyhodnocením všech 8 řádků pravdivostní tabulky je formule pravdivá v ${c} z nich.`,
        ['Sepiš všech 8 kombinací $p,q,r$ a formuli vyhodnoť po částech (podformule zvlášť).'],
      )
    }
    const T = 'tautologie (pravdivá při každé interpretaci)'
    const S = 'splnitelná, ale není tautologie'
    const U = 'nesplnitelná (kontradikce)'
    const correct = c === 8 ? T : c === 0 ? U : S
    return choice(
      r,
      uid(r, 'cls'),
      `Jaká je formule ${formula}?`,
      correct,
      [T, S, U, 'nelze rozhodnout bez znalosti hodnot $p,q,r$'],
      `Pravdivostní tabulka: formule je pravdivá v ${c} z 8 interpretací, tedy ${correct}.`,
      ['Vyhodnoť formuli pro všech 8 kombinací $p,q,r$. Stačí najít jednu pravdivou a jednu nepravdivou, aby nebyla ani tautologie, ani kontradikce.'],
    )
  },
}

// --- lectures 10 to 12: learning, language models ---

const entropy: Generator = {
  id: 'entropy',
  lecture: 10,
  make(r, level) {
    const total = level === 'hard' ? pick(r, [10, 12, 14, 16]) : pick(r, [4, 8])
    const p = int(r, 1, total - 1)
    const n = total - p
    const h = (x: number) => (x === 0 ? 0 : -(x / total) * Math.log2(x / total))
    const H = h(p) + h(n)
    const f2 = (v: number) => v.toFixed(2).replace('.', ',')
    return choice(
      r,
      uid(r, 'ent'),
      `Množina má ${total} příkladů, z toho ${p} kladných a ${n} záporných. Jaká je její entropie $H=-\\sum p_i\\log_2 p_i$ (zaokrouhleno na 2 desetinná místa)?`,
      f2(H),
      [f2(H * Math.LN2), f2(p / total), f2(1 - H), f2(Math.abs(p - n) / total), '1,00', '0,00'].filter((x) => x !== f2(H)),
      `$H=-\\frac{${p}}{${total}}\\log_2\\frac{${p}}{${total}}-\\frac{${n}}{${total}}\\log_2\\frac{${n}}{${total}}\\approx ${f2(H)}$. Entropie je 1 pro poměr 1:1 a 0 pro čistou množinu.`,
      ['Použij logaritmus o základu 2. Rovnoměrné rozdělení 1:1 má entropii přesně 1.'],
    )
  },
}

const perceptron: Generator = {
  id: 'perceptron',
  lecture: 10,
  make(r, level) {
    for (let tries = 0; tries < 400; tries++) {
      const w0 = int(r, -3, 3)
      const w = [int(r, -3, 3), int(r, -3, 3), int(r, -3, 3)]
      const x = [int(r, -3, 3), int(r, -3, 3), int(r, -3, 3)]
      const xi = w0 + w.reduce((s, wi, i) => s + wi * x[i], 0)
      if (level === 'hard' ? Math.abs(xi) > 1 : xi === 0) continue
      const out = (v: number) => (v >= 0 ? 1 : 0)
      const fmt = (v: number) => `$w\\cdot\\tilde x=${v}$, výstup ${out(v)}`
      const dot = xi - w0
      return choice(
        r,
        uid(r, 'perc'),
        `Perceptron má váhy $\\vec w=\\langle ${[w0, ...w].join(', ')}\\rangle$ (první je práh $w_0$) a vstup $\\vec x=\\langle ${x.join(', ')}\\rangle$. Pro $\\tilde x=\\langle 1, ${x.join(', ')}\\rangle$ vrací 1, když $\\vec w\\cdot\\tilde x\\ge 0$, jinak 0. Co platí?`,
        fmt(xi),
        [fmt(dot), fmt(dot - w0), fmt(-xi), fmt(xi + 1), fmt(xi - 1), fmt(xi + 2), fmt(xi - 2), fmt(xi + 3)],
        `$\\vec w\\cdot\\tilde x=${w0}+${w.map((wi, i) => `(${wi})(${x[i]})`).join('+')}=${xi}$. ${xi >= 0 ? 'Je ≥ 0, výstup 1.' : 'Je < 0, výstup 0.'} Práh $w_0$ se násobí jedničkou a **přičítá**.`,
        ['Rozšířený vstup má na začátku 1, takže práh $w_0$ se prostě přičte.'],
      )
    }
    throw new Error('perceptron: no instance')
  },
}

const bigram: Generator = {
  id: 'bigram',
  lecture: 12,
  make(r, level) {
    if (level === 'easy') {
      for (;;) {
        const nPrev = int(r, 4, 12)
        const k = int(r, 1, nPrev - 1)
        if (2 * k === nPrev) continue
        const corpus = nPrev * int(r, 3, 6)
        const [w1, w2] = pick(r, [['pes', 'běží'], ['kočka', 'spí'], ['dům', 'stojí'], ['student', 'čte']])
        return choice(
          r,
          uid(r, 'bg'),
          `V korpusu o ${corpus} slovech se slovo „${w1}“ vyskytuje ${nPrev}×, z toho ${k}× bezprostředně následuje „${w2}“. Jaká je bigramová pravděpodobnost $P(\\text{${w2}}\\mid\\text{${w1}})$ odhadnutá z korpusu?`,
          `$\\frac{${k}}{${nPrev}}$`,
          [`$\\frac{${k}}{${corpus}}$`, `$\\frac{${nPrev}}{${k}}$`, `$\\frac{${nPrev - k}}{${nPrev}}$`, `$\\frac{${k}}{${corpus - nPrev}}$`],
          `$P(w_2\\mid w_1)=C(w_1w_2)/C(w_1)=${k}/${nPrev}$. Dělí se počtem výskytů kontextu $w_1$, ne velikostí korpusu.`,
          ['Podmíněná pravděpodobnost = počet dvojic / počet výskytů prvního slova.'],
        )
      }
    }
    for (;;) {
      const e = [int(r, 1, 4), int(r, 1, 4), int(r, 1, 4)]
      const s = e[0] + e[1] + e[2]
      if (s % 3 !== 0) continue
      const probs = e.map((x) => `$\\frac1{${2 ** x}}$`).join(', ')
      const pp = 2 ** (s / 3)
      const arithmetic = e.reduce((a, x) => a + 2 ** x, 0) / 3
      const same = (x: number) => String(Math.round(x * 100) / 100).replace('.', ',')
      return choice(
        r,
        uid(r, 'pp'),
        `Jazykový model přiřadil třem slovům testovací věty podmíněné pravděpodobnosti ${probs}. Jaká je perplexita věty?`,
        same(pp),
        [same(arithmetic), String(2 ** s), same(1 / 2 ** s), same(pp + 1)],
        `$P(W)=2^{-${s}}$, perplexita $=P(W)^{-1/3}=2^{${s}/3}=${same(pp)}$. Je to geometrický průměr převrácených pravděpodobností, ne aritmetický.`,
        ['Perplexita je $P(W)^{-1/N}$: součin pravděpodobností, pak $N$-tá odmocnina z převrácené hodnoty.'],
      )
    }
  },
}

export const GENERATORS: readonly Generator[] = [puzzle, nextNode, traversal, coloring, minimax, truth, entropy, perceptron, bigram]
