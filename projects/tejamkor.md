# tejamkor

**Bir jumlada:** Claude Code / Claude desktop uchun mod — kreditni tejaydi: limit + teskari sanoq, avtomatik model tanlash, hub kartasini avtomatik ulash.
**Joylashuv:** `DESKTOP-QA8B43G`: `C:\hub\tools\tejamkor` · Git: hub repo ichida · Domen/URL: yo'q
**Holat:** ishlab chiqilmoqda (validate + test o'tdi, jonli sinalmagan)
**Oxirgi yangilanish:** 2026-10-11

## Stack
- Claude Code plugin (mod) API, TSX. DOM/Node yo'q — hamma narsa `$` orqali.

## Arxitektura (qisqa)
- `hooks/router.ts` — sof funksiyalar: `classify` (prompt → haiku/sonnet/opus, kalit so'zlar bo'yicha, bepul), `decide` (kesh himoyasi), `findCard` (cwd → hub kartasi), `countdown`.
- `hooks/register.tsx` — hooklar:
  - `ui.render AbovePrompt` — 5 soat / 7 kun limitidan qolgan %, sekundli teskari sanoq, joriy model, kontekst hajmi.
  - `session.measure` — limitlarni yangilaydi, 5 soatlik ≥80% da toast.
  - `prompt.submit` — `!o/!s/!h` prefiksi; darajani tanlaydi; 1-promptda hub kartasini `context` ga qo'shadi.
  - `turn.step` (async generator) — faqat asosiy oqimda model+effortni almashtiradi (subagentlarga tegmaydi).
  - `prompt.compose` — "tejamkor qoidalar" bo'limi (Grep+offset, qayta o'qimaslik, subagent yo'q, qisqa javob).
  - `/tejam` — holat | auto | opus | sonnet | haiku | off.
- `types/index.d.ts` — `$.state` shartnomasi.

## Ishga tushirish
```
claude plugin validate C:\hub\tools\tejamkor
claude plugin test C:\hub\tools\tejamkor
```
Doimiy yoqish: foydalanuvchi env `CLAUDE_CODE_PLUGIN_DIRS=C:\hub\tools\tejamkor`, keyin Claude ilovasini qayta ochish.
`claude` PATH da yo'q — desktop binari: `%APPDATA%\Claude\claude-code\<versiya>\...\claude.exe`.

## Muhim qarorlar
- Model tanlash heuristik (qo'shimcha model chaqiruvisiz) — klassifikator uchun Haiku chaqirish ham pul.
- Pastga tushish (opus→haiku) faqat kontekst <30k tokenda: model almashsa prompt keshi yo'qoladi, katta kontekstda qaytib chiqish qimmat.
- "ha/davom/ok" — oldingi daraja saqlanadi.
- Model IDlari: claude-opus-5-5 / claude-sonnet-5-5 / claude-haiku-5-5 (`router.ts` `MODEL`).

## Ehtiyot bo'ling
- Bash heredoc Windows'da `\\` ni yeydi — test fayllarida `String.raw` ishlatilgan.
- `atom({ plugin: ... })` da plugin nomi string literal bo'lishi shart (validator).
- Limitlar faqat obunada (Pro/Max) chiqadi; API kalitda bo'sh.

## Keyingi qadamlar
- [ ] Jonli sessiyada sinash: band ko'rinishi, model haqiqatan almashishi.
- [ ] Kalit so'zlar ro'yxatini real promptlar bo'yicha sozlash.

## Tarix
- 2026-10-11 | Claude | DESKTOP-QA8B43G | mod yaratildi (band+sanoq, avto model, hub karta inject, /tejam), validate+5 test o'tdi
