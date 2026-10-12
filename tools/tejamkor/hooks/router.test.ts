import { test, expect } from 'claude-code/testing'
import { classify, decide, parseOverride, findCard, countdown } from './router'

test('classify', () => {
  expect(classify('yangi loyiha arxitekturasini tuz')).toBe('opus')
  expect(classify('git push qil')).toBe('haiku')
  expect(classify('login sahifasidagi validatsiyani tuzat, email bo\'sh bo\'lsa xato chiqarsin')).toBe('sonnet')
  expect(classify('ha')).toBe(null)
})

test('decide keeps cache on big context', () => {
  expect(decide('opus', 'haiku', 80_000)).toBe('opus')
  expect(decide('opus', 'haiku', 5_000)).toBe('haiku')
  expect(decide('haiku', 'opus', 80_000)).toBe('opus')
  expect(decide('sonnet', null, 0)).toBe('sonnet')
})

test('override', () => {
  expect(parseOverride('!o salom')).toEqual({ tier: 'opus', text: 'salom' })
  expect(parseOverride('salom').tier).toBe(null)
})

test('findCard', () => {
  const idx = String.raw`| [synapse](projects/synapse.md) | x | ${'`'}C:\synapse${'`'} (PC) |` + '\n' +
    String.raw`| [sp](projects/synapse_promo.md) | x | ${'`'}C:\synapse\video${'`'} (PC) |`
  expect(findCard(idx, String.raw`C:\synapse\video\src`)).toBe('projects/synapse_promo.md')
  expect(findCard(idx, 'C:/Synapse')).toBe('projects/synapse.md')
  expect(findCard(idx, String.raw`C:\other`)).toBe(null)
})

test('countdown', () => {
  expect(countdown(new Date(3_723_000).toISOString(), 0)).toBe('01:02:03')
})
