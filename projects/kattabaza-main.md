# KattaBaza — dasturlar, VPN va servislar markazi

**Bir jumlada:** kattabaza.uz sayti: ilovalar katalogi, IP qidiruv, kalitlar, servislar (time, treyler, camera, med), AI yordamchi.
**Joylashuv:** `DESKTOP-QA8B43G`: `C:\kattabaza-main` · Git: https://github.com/BNFayziyev/kattabaza.git · Domen/URL: kattabaza.uz
**Holat:** ishlayapti (prod)
**Oxirgi yangilanish:** 2026-10-08

## Stack
- React + Vite + Tailwind, Leaflet, react-router, Supabase; Node server (`server/index.js`, port 8090); Cloudflare Tunnel; Telegram bot/userbot

## Arxitektura (qisqa)
- Brauzer → Cloudflare → cloudflared (shu PC) → 127.0.0.1:8090 → `dist/` (sayt) + `/api/*`
- `src/` frontend, `server/`, `bot/`, `db/`, `scripts/`, `tools/`; sozlash — `SETUP.md`
- Tillar: EN/UZ/RU. AI yordamchi → Telegram @synapse_bo1

## Ishga tushirish
`npm install`, `npm run build`, server: `node server/index.js` (aniq skriptlar — package.json). `push-to-github.bat`

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
