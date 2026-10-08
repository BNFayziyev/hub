# bo1ai — Telegram yordamchi (2-ishchi)

**Bir jumlada:** 2-Telegram akkaunt orqali mijoz chatlarini kuzatib, egasiga 3-4 javob varianti taklif qiladi; tanlanmaguncha o'zi yozmaydi, uslubni o'rganadi.
**Joylashuv:** `DESKTOP-QA8B43G`: `C:\bo1ai` · Git: yo'q · Domen/URL: -
**Holat:** ishlab chiqilmoqda / ishlayapti?
**Oxirgi yangilanish:** 2026-10-08

## Stack
- Python (.venv, requirements.txt), Telegram userbot (api_id/api_hash) + boshqaruv boti, Claude (CLAUDE_CODE_OAUTH_TOKEN)

## Arxitektura (qisqa)
- `bo1ai/` kod, `bilim/` o'rganganlari (ochiq matn), `data/`, `logs/`, `runtime/`, `vm/`
- `nazoratchi.pyw` — nazoratchi, `statistika.html`

## Ishga tushirish
`run.bat` (ishga tushirish), `login.bat` (2-akkauntga kirish), `claude-token.bat`, `test-claude.bat`, `toxtat.bat`, `vm-start.bat`. Botda /organ — tarixdan o'rganish.
.env kalitlari: TG_API_ID, TG_API_HASH, BOT_TOKEN, CLAUDE_CODE_OAUTH_TOKEN

## Hozirgi holat
- ? (birinchi ishlagan AI to'ldirsin)

## Keyingi qadamlar
- [ ] ?

## Muhim qarorlar
- ?

## Ehtiyot bo'ling
- `.env` da maxfiy kalitlar bor — hubga yozilmaydi.

## Tarix
- 2026-10-08 | Claude | DESKTOP-QA8B43G | Karta yaratildi (README/package.json asosida, chuqur tahlil qilinmagan)
