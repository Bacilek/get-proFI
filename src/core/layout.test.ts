import { layoutRoadmap, NODE_H, NODE_W, GAP_X, GAP_Y, readiness } from './layout'
import type { LessonMeta, LessonProgress, Module } from './types'

const l = (id: string, prerequisites: string[] = []): LessonMeta => ({ id, title: id, prerequisites, topics: [] })
const modules: Module[] = [
  { id: 'm1', title: 'M1', lessons: [l('a'), l('b', ['a']), l('c', ['a'])] },
  { id: 'm2', title: 'M2', lessons: [l('d', ['b', 'c']), l('e', ['other:x'])] },
]

test('layers follow the longest prerequisite chain', () => {
  const { nodes } = layoutRoadmap(modules)
  const layer = Object.fromEntries(nodes.map((n) => [n.lesson.id, n.layer]))
  expect(layer).toEqual({ a: 0, b: 1, c: 1, d: 2, e: 0 })
})

test('positions are on a grid, rows count within a layer', () => {
  const { nodes, width, height } = layoutRoadmap(modules)
  const at = (id: string) => nodes.find((n) => n.lesson.id === id)!
  expect(at('a')).toMatchObject({ x: 0, y: 0 })
  expect(at('e')).toMatchObject({ x: 0, y: NODE_H + GAP_Y })
  expect(at('c')).toMatchObject({ x: NODE_W + GAP_X, y: NODE_H + GAP_Y })
  expect(width).toBe(3 * NODE_W + 2 * GAP_X)
  expect(height).toBe(2 * NODE_H + GAP_Y)
})

test('edges skip prerequisites outside the layout', () => {
  const { edges } = layoutRoadmap(modules)
  expect(edges).toHaveLength(4)
  expect(edges).not.toContainEqual({ from: 'other:x', to: 'e' })
})

test('cycle throws', () => {
  expect(() => layoutRoadmap([{ id: 'm', title: 'm', lessons: [l('x', ['y']), l('y', ['x'])] }])).toThrow(/cycle/i)
})

test('readiness is the done share in covered modules', () => {
  const progress = new Map<string, LessonProgress>([['a', { lessonId: 'a', stars: 1, updatedAt: 0 }]])
  expect(readiness({ coversModules: ['m1'] }, modules, progress)).toBeCloseTo(1 / 3)
  expect(readiness({ coversModules: ['m1', 'm2'] }, modules, progress)).toBeCloseTo(1 / 5)
  expect(readiness({}, modules, progress)).toBeNull()
})
