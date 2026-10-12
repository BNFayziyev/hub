import type { Tier } from '../types'

// Prompt matnidan model darajasini tanlaydi. Qo'shimcha model chaqiruvi yo'q — bepul.
// null = "oldingi darajani saqla" (ha, davom, ok kabi qisqa tasdiqlar).

const OPUS = [
  /arxitektura|architect/i,
  /yangi loyiha|loyiha (yarat|och|qur)|noldan/i,
  /refaktor|refactor|qayta yoz/i,
  /murakkab|chuqur|puxta|ultrathink|o'ylab ko'r|yaxshilab o'yla/i,
  /xavfsizlik|security|audit/i,
  /reja tuz|plan (tuz|qil)|strategiya/i,
  /nega ishlamayapti|topolmayapti|hal bo'lmayapti|race condition|memory leak/i,
  /migratsiya|migration|algoritm/i,
]

const HAIKU = [
  /tarjima|translate/i,
  /nima degani|qisqacha|bir so'z bilan/i,
  /\b(git|commit|push|pull|status)\b/i,
  /\b(rename|typo|imlo)\b|nomini o'zgartir/i,
  /ro'yxat|ko'rsat|qayerda|qaysi fayl|nechta/i,
  /formatla|format qil/i,
]

const KEEP = /^(ha|xa|yo'q|ok|okay|mayli|davom( et)?|bo'ldi|rahmat|zo'r|yes|no|go|qil|bajar)[.!?\s]*$/i

const OVERRIDE = /^!(o|opus|s|sonnet|h|haiku)\b\s*/i

export function parseOverride(text: string): { tier: Tier | null; text: string } {
  const m = text.match(OVERRIDE)
  if (!m) return { tier: null, text }
  const k = m[1].toLowerCase()[0]
  const tier: Tier = k === 'o' ? 'opus' : k === 'h' ? 'haiku' : 'sonnet'
  return { tier, text: text.slice(m[0].length) }
}

export function classify(text: string): Tier | null {
  const t = text.trim()
  if (KEEP.test(t)) return null
  if (OPUS.some(r => r.test(t)) || t.length > 1500) return 'opus'
  const hasCode = /```|\n\s{2,}\S|[{};]\s*$/m.test(t)
  if (!hasCode && t.length < 160 && HAIKU.some(r => r.test(t))) return 'haiku'
  if (!hasCode && t.length < 40) return 'haiku'
  return 'sonnet'
}

const RANK: Record<Tier, number> = { haiku: 0, sonnet: 1, opus: 2 }

// Model almashtirish keshni buzadi: katta kontekstda pastga tushish keyin qimmatga tushadi.
// Yuqoriga — har doim; pastga — faqat kontekst kichik bo'lsa.
export function decide(prev: Tier | null, want: Tier | null, ctxTokens: number): Tier {
  if (want === null) return prev ?? 'sonnet'
  if (prev === null) return want
  if (RANK[want] >= RANK[prev]) return want
  return ctxTokens < 30_000 ? want : prev
}

export const MODEL: Record<Tier, string> = {
  haiku: 'claude-haiku-5-5',
  sonnet: 'claude-sonnet-5-5',
  opus: 'claude-opus-5-5',
}

export const EFFORT: Record<Tier, 'low' | 'medium' | 'high'> = {
  haiku: 'low',
  sonnet: 'medium',
  opus: 'high',
}

export function countdown(resetsAt: string | undefined, now: number): string {
  if (!resetsAt) return '—'
  let s = Math.max(0, Math.floor((Date.parse(resetsAt) - now) / 1000))
  const d = Math.floor(s / 86400); s -= d * 86400
  const h = Math.floor(s / 3600); s -= h * 3600
  const m = Math.floor(s / 60); s -= m * 60
  const p = (n: number) => String(n).padStart(2, '0')
  return d > 0 ? `${d}k ${p(h)}:${p(m)}:${p(s)}` : `${p(h)}:${p(m)}:${p(s)}`
}

// INDEX.md jadvalidan cwd ga mos loyiha kartasini topadi (eng uzun yo'l yutadi).
export function findCard(index: string, cwd: string): string | null {
  const norm = (p: string) => p.replace(/\//g, '\\').replace(/\\+$/, '').toLowerCase()
  const c = norm(cwd)
  let best: { card: string; len: number } | null = null
  for (const line of index.split('\n')) {
    const card = line.match(/\((projects\/[^)]+\.md)\)/)?.[1]
    const path = line.match(/`([A-Za-z]:\\[^`]*)`/)?.[1]
    if (!card || !path) continue
    const p = norm(path)
    if ((c === p || c.startsWith(p + '\\')) && (!best || p.length > best.len)) best = { card, len: p.length }
  }
  return best?.card ?? null
}
