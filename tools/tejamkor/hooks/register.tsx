import { atom, read, update } from 'claude-code'
import type { Register } from 'claude-code'

import type { Limit, Mode, Tier } from '../types'
import { EFFORT, MODEL, classify, countdown, decide, findCard, parseOverride } from './router'

const limits = atom({ plugin: 'tejamkor', key: 'limits' } as const, [] as Limit[])
const now = atom({ plugin: 'tejamkor', key: 'now' } as const, 0)
const tier = atom({ plugin: 'tejamkor', key: 'tier' } as const, null as Tier | null)
const mode = atom({ plugin: 'tejamkor', key: 'mode' } as const, 'auto' as Mode)
const usd = atom({ plugin: 'tejamkor', key: 'usd' } as const, 0)
const ctx = atom({ plugin: 'tejamkor', key: 'ctx' } as const, 0)
const hubInjected = atom({ plugin: 'tejamkor', key: 'hubInjected' } as const, false)

const HUB = 'C:/hub'
const LABEL: Record<string, string> = { five_hour: '5 soat', seven_day: '7 kun', spend_limit: 'Limit' }

const RULES = `# Tejamkor rejim (kreditni tejash)
- Loyiha haqidagi ma'lumot hub kartasida (C:\\hub). Karta kontekstga qo'shilgan bo'lsa, uni qayta o'qima va loyihani skanerlama.
- Faylni butun o'qima: avval Grep bilan joyini top, keyin Read'da offset/limit bilan faqat kerakli qismni o'qi.
- Bir marta o'qigan faylingni qayta o'qima; Edit'dan keyin tekshirish uchun qayta o'qima.
- Foydalanuvchi so'ramasa subagent (Agent tool) ishga tushirma.
- Mustaqil tool chaqiruvlarini bitta javobda parallel yubor.
- Javob qisqa bo'lsin: natija + kerakli faktlar. Kodni chatga takrorlama, fayl:qator bilan ko'rsat.`

export const register: Register = on => {
  let pinnedThisTurn: Tier | null = null

  on('session.start', async ($, e, next) => {
    await $.command.register({
      name: 'tejam',
      description: "Tejamkor: holat | auto | opus | sonnet | haiku | off",
    })
    try {
      const u = await $.session.usage()
      await update($, limits, () => u.rateLimits.map(r => ({ ...r })))
      await update($, usd, () => u.cost?.usd ?? 0)
      await update($, ctx, () => u.context.tokens ?? 0)
    } catch {}
    await update($, now, () => Date.now())
    $.clock.every(1000, () => void update($, now, () => Date.now()))
    return next(e)
  })

  on('session.measure', async ($, e, next) => {
    await update($, limits, () => e.rateLimits.map(r => ({ ...r })))
    await update($, usd, () => e.cost?.usd ?? 0)
    await update($, ctx, () => e.context.tokens ?? 0)
    const five = e.rateLimits.find(r => r.kind === 'five_hour')
    if (five && e.changed.includes('rateLimits') && five.percentUsed >= 80) {
      $.ui.toast(`5 soatlik limitning ${five.percentUsed}% ishlatildi — Haiku/Sonnet'ga o'ting`)
    }
    return next(e)
  })

  on('prompt.submit', async ($, e, next) => {
    const o = parseOverride(e.text)
    const m = await read($, mode)
    let context = e.context ?? []

    // Hub xotirasi: sessiyaning birinchi promptida loyiha kartasini avtomatik ulash.
    if (!(await read($, hubInjected))) {
      await update($, hubInjected, () => true)
      try {
        const cwd = await $.session.cwd()
        const index = await $.fs.read(`${HUB}/INDEX.md`)
        const card = findCard(index as string, cwd)
        if (card) {
          const text = await $.fs.read(`${HUB}/${card}`)
          context = [...context, `Hub kartasi (avtomatik, ${card}). Buni qayta o'qima:\n\n${text}`]
        }
      } catch {}
    }

    if (m !== 'off') {
      const prev = await read($, tier)
      let next_: Tier
      if (o.tier) next_ = o.tier
      else if (m !== 'auto') next_ = m
      else next_ = decide(prev, classify(o.text), await read($, ctx))
      pinnedThisTurn = next_
      await update($, tier, () => next_)
    }

    return next({ ...e, text: o.text, context })
  })

  on('turn.step', async function* ($, e, next) {
    const t = pinnedThisTurn
    if (e.agentId || !t) return yield* next(e)
    return yield* next({ ...e, model: MODEL[t], effort: e.effort === undefined ? undefined : EFFORT[t] })
  })

  on('prompt.compose', async ($, e, next) => {
    const r = await next(e)
    if ((await read($, mode)) === 'off') return r
    return { sections: [...r.sections, { id: 'tejamkor:rules', text: RULES, scope: 'session' as const }] }
  })

  on('command.run', { command: 'tejam' }, async ($, e) => {
    const arg = e.args.trim().toLowerCase()
    if (['auto', 'opus', 'sonnet', 'haiku', 'off'].includes(arg)) {
      await update($, mode, () => arg as Mode)
      if (arg !== 'auto' && arg !== 'off') await update($, tier, () => arg as Tier)
      return { text: `Tejamkor rejimi: ${arg}` }
    }
    const ls = await read($, limits)
    const t = Date.now()
    const lines = ls.map(l => `${LABEL[l.kind] ?? l.kind}: ${Math.max(0, 100 - l.percentUsed)}% qoldi, ${countdown(l.resetsAt, t)} dan keyin yangilanadi`)
    return {
      text: [
        `Rejim: ${await read($, mode)} · joriy model: ${(await read($, tier)) ?? '—'}`,
        ...lines,
        `Sessiya narxi: $${(await read($, usd)).toFixed(2)} · kontekst: ${Math.round((await read($, ctx)) / 1000)}k token`,
        "Promptda: !o / !s / !h — bitta xabar uchun Opus/Sonnet/Haiku",
      ].join('\n'),
    }
  })

  on('ui.render', { component: 'AbovePrompt' }, async ($, e, next) => {
    if (e.props.hasSurvey) return next(e)
    const { Box, Text } = $.ui.resolve(e)
    const ls = await read($, limits)
    const t = (await read($, now)) || Date.now()
    const m = await read($, mode)
    const cur = await read($, tier)
    const k = Math.round((await read($, ctx)) / 1000)
    const color = (left: number) => (left <= 15 ? 'red' : left <= 40 ? 'yellow' : 'green')

    return (
      <Box flexDirection="row" flexWrap="wrap" columnGap={2}>
        {ls.length === 0 && <Text dimColor>Limit ma'lumoti birinchi javobdan keyin chiqadi</Text>}
        {ls.map(l => {
          const left = Math.max(0, Math.round((100 - l.percentUsed) * 10) / 10)
          return (
            <Text key={l.kind}>
              <Text dimColor>{LABEL[l.kind] ?? l.kind}: </Text>
              <Text bold color={color(left)}>{left}% qoldi</Text>
              <Text dimColor> ⏳ {countdown(l.resetsAt, t)}</Text>
            </Text>
          )
        })}
        <Text dimColor>
          Model: {cur ?? '—'} ({m}) · kontekst {k}k{k > 120 ? ' — /compact qiling' : ''}
        </Text>
      </Box>
    )
  })
}
