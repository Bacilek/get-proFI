import type { NumericQuestion } from './questions'
import type { GlobalId } from './types'

/** Deterministic PRNG (mulberry32) so generated questions are reproducible from a seed. */
export function rng(seed: number): () => number {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

type Rand = () => number
const int = (r: Rand, lo: number, hi: number) => lo + Math.floor(r() * (hi - lo + 1))
const nonZero = (r: Rand, lo: number, hi: number) => {
  let n = 0
  while (n === 0) n = int(r, lo, hi)
  return n
}
/** `a x^n` rendered for KaTeX, with the sign folded into a leading term. */
const term = (c: number, pow: number, first: boolean) => {
  const sign = c < 0 ? '-' : first ? '' : '+'
  const abs = Math.abs(c)
  const coef = abs === 1 && pow > 0 ? '' : String(abs)
  const x = pow === 0 ? '' : pow === 1 ? 'x' : `x^{${pow}}`
  return `${sign}${coef}${x}` || `${sign}1`
}
const poly = (coefs: number[]) =>
  coefs
    .map((c, pow) => ({ c, pow }))
    .filter((t) => t.c !== 0)
    .reverse()
    .map((t, i) => term(t.c, t.pow, i === 0))
    .join('')

export interface Generator {
  topic: GlobalId
  title: string
  make(r: Rand, id: string): NumericQuestion
}

export const generators: Generator[] = [
  {
    topic: 'mb142:derivative-rules',
    title: 'Derivative of a polynomial at a point',
    make(r, id) {
      const coefs = [int(r, -5, 5), nonZero(r, -5, 5), nonZero(r, -4, 4), nonZero(r, 1, 3)]
      const x0 = int(r, -3, 3)
      const d = coefs.map((c, i) => c * i).slice(1)
      const answer = d.reduce((s, c, i) => s + c * x0 ** i, 0)
      return {
        id,
        type: 'numeric',
        prompt: `Spočtěte $f'(${x0})$ pro $f(x)=${poly(coefs)}$.`,
        answer,
        solution: `$f'(x)=${poly(d)}$, tedy $f'(${x0})=${answer}$.`,
      }
    },
  },
  {
    topic: 'mb142:definite-integral-methods',
    title: 'Definite integral of a polynomial',
    make(r, id) {
      const coefs = [nonZero(r, -4, 4), nonZero(r, -4, 4), nonZero(r, 1, 3)]
      const a = int(r, -2, 1)
      const b = a + int(r, 1, 3)
      const prim = [0, ...coefs.map((c, i) => c / (i + 1))]
      const F = (x: number) => prim.reduce((s, c, i) => s + c * x ** i, 0)
      const answer = F(b) - F(a)
      return {
        id,
        type: 'numeric',
        prompt: `Spočtěte $\\int_{${a}}^{${b}} (${poly(coefs)})\\,dx$ (na 3 desetinná místa, případně zlomek).`,
        answer,
        tolerance: 0.001,
        solution: `Primitivní funkce $F(x)=${prim
          .map((c, p) => ({ c, p }))
          .filter((t) => t.c !== 0)
          .reverse()
          .map((t, i) => term(Math.round(t.c * 1e6) / 1e6, t.p, i === 0))
          .join('')}$, výsledek $F(${b})-F(${a})\\approx ${answer.toFixed(3)}$.`,
      }
    },
  },
  {
    topic: 'mb142:partial-derivatives',
    title: 'Partial derivative at a point',
    make(r, id) {
      const a = nonZero(r, -3, 3)
      const b = nonZero(r, -3, 3)
      const c = nonZero(r, 1, 3)
      const [x0, y0] = [int(r, -2, 2), int(r, -2, 2)]
      // f = a x^2 y + b x y^3 + c y  =>  f_y = a x^2 + 3 b x y^2 + c
      const answer = a * x0 ** 2 + 3 * b * x0 * y0 ** 2 + c
      return {
        id,
        type: 'numeric',
        prompt: `Spočtěte $\\frac{\\partial f}{\\partial y}(${x0},${y0})$ pro $f(x,y)=${a === 1 ? '' : a === -1 ? '-' : a}x^2y${b < 0 ? '-' : '+'}${Math.abs(b) === 1 ? '' : Math.abs(b)}xy^3${c < 0 ? '-' : '+'}${c === 1 ? '' : c}y$.`,
        answer,
        solution: `$f_y=${a}x^2+${3 * b}xy^2+${c}$, dosazením $${answer}$.`,
      }
    },
  },
  {
    topic: 'mb142:series-intro',
    title: 'Sum of a geometric series',
    make(r, id) {
      const a = nonZero(r, 1, 6)
      const den = int(r, 2, 5)
      const num = int(r, 1, den - 1)
      const q = num / den
      const answer = a / (1 - q)
      return {
        id,
        type: 'numeric',
        prompt: `Určete součet řady $\\sum_{n=0}^{\\infty} ${a}\\left(\\frac{${num}}{${den}}\\right)^n$ (na 3 desetinná místa, případně zlomek).`,
        answer,
        tolerance: 0.001,
        solution: `Geometrická řada s $|q|<1$: $\\frac{a_0}{1-q}=\\frac{${a}}{1-\\frac{${num}}{${den}}}=${answer.toFixed(3)}$.`,
      }
    },
  },
]

export function generate(topic: GlobalId, seed: number): NumericQuestion | null {
  const g = generators.find((x) => x.topic === topic)
  return g ? g.make(rng(seed), `drill-${topic.split(':')[1]}-${seed}`) : null
}
