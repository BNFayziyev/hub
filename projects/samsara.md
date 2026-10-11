# Samsara Wall

**Bir jumlada:** Samsara kamera devori — har kompaniya o'z Samsara API kaliti bilan, barcha traklarning yo'lga qaragan (tashqi) kameralari iVMS uslubidagi zich to'rda, pastida trak raqami.
**Joylashuv:** `DESKTOP-QA8B43G`: `C:\samsara` · Git: yo'q · Domen/URL: rejada `samsara.kattabaza.uz` (Cloudflare tunnel → localhost:3900, hali ulanmagan)
**Holat:** ishlab chiqilmoqda (MVP tayyor, demo bilan sinalgan; haqiqiy kalit bilan hali sinalmagan)
**Oxirgi yangilanish:** 2026-10-11

## Stack
- Node 24 (`.ts` to'g'ridan-to'g'ri), Fastify 5, SQLite `node:sqlite`, grammy (kirish boti), React 18 + Vite 6
- treyler bilan bir xil uslub (ko'p kompaniya, Telegram kirish, AES-256-GCM shifrlangan kalitlar)

## Arxitektura (qisqa)
- `server/src/samsara/client.ts` — Samsara REST (US/EU/CA), 220 ms oraliq, 429 qayta urinish
- `server/src/jobs/poller.ts` — har kompaniya sikli (default 30 s): `/fleet/vehicles` (10 daq), `/fleet/vehicles/stats?types=gps,engineStates`, `GET /cameras/media` (20 mashinadan, `inputs=dashcamRoadFacing`, `availableAfterTime` kursori kv `media_cursor:<id>`), retrieval holati, ixtiyoriy avto-rasm
- Kadrlar `data/media/<kompaniya>/<mashina>/<ts>.jpg` ga yuklanadi (Samsara URL 8 soatda eskiradi), `/api/media/*` faqat o'z kompaniyasiga; 24 soatdan eskilari o'chadi (oxirgisi qoladi), kliplar 7 kun
- `samsara/demo.ts` — demo kompaniya (28 soxta trak, SVG kadrlar)
- `web/src/components/Wall.tsx` — devor (1–64 layout, sahifa, avto-aylantirish, F to'liq ekran, filtr), `Viewer.tsx` — katta ko'rinish + timelapse + "Hozirgi rasm"/"Video klip"

## Ishga tushirish
```
npm install; npm run build:web; npm start          # :3900
powershell -ExecutionPolicy Bypass -File C:\samsara\scripts\install-task.ps1   # Task "SamsaraWall", kirishda
npm run probe -- <API_KALIT> [us|eu|ca]            # kalit + kadrlar oralig'ini tekshirish
```
`.env` kalitlari: PORT, HOST, PUBLIC_URL, SECRET_KEY, CREDENTIALS_KEY, ADMIN_PASSWORD, TELEGRAM_BOT_TOKEN, TELEGRAM_ADMIN_IDS, MEDIA_KEEP_HOURS, CLIP_KEEP_DAYS
Dev: `.claude/launch.json` → `samsara-dev` (port 3901, `.env.dev`, `data-dev/`)

## Hozirgi holat
- Server + web tayyor, typecheck toza; demo kompaniya bilan brauzerda sinaldi (devor, 36 layout, viewer, rasm/video so'rovi, telefon)
- Noto'g'ri kalit haqiqiy api.samsara.com dan 401 bilan to'g'ri rad etiladi
- `.env` yaratilgan (kalitlar generatsiya qilingan, TELEGRAM_ADMIN_IDS treyler'dan), TELEGRAM_BOT_TOKEN bo'sh → hozircha ADMIN_PASSWORD bilan kirish

## Keyingi qadamlar
- [ ] @BotFather'dan yangi bot → `TELEGRAM_BOT_TOKEN` (treyler botini ishlatib bo'lmaydi — bitta tokenni ikki jarayon polling qilolmaydi)
- [ ] Cloudflare: `samsara.kattabaza.uz → http://localhost:3900`, keyin `install-task.ps1`
- [ ] Haqiqiy kompaniya kaliti bilan `npm run probe` — periodicStill oralig'ini ko'rish
- [ ] ? Agar kadrlar siyrak bo'lsa: avto-rasm (kvota) yoki Samsara'da still oralig'ini kamaytirish

## Muhim qarorlar
- Samsara ochiq API'sida jonli video oqimi YO'Q (Live Stream faqat dashboard'da) → "deyarli jonli" devor: kameralar yuklagan kadrlar + so'rov bilan rasm/klip. Dashboard'ni brauzer orqali tortish rad etildi (mo'rt, haydovchiga ogohlantirish chiqadi, 5 mph+ trip talab)
- Faqat `dashcamRoadFacing` (javobda `dashcamForwardFacing` ham) — salon kamerasi olinmaydi
- Kadrlar serverga yuklanadi (URL 8 soatda eskiradi, devor tez ochiladi, Samsara URL'lari yashirin)

## Ehtiyot bo'ling
- `CREDENTIALS_KEY` ni o'zgartirmang — saqlangan API kalitlar ochilmay qoladi
- Port 3900 prod, 3901 dev (boshqa loyihalar: 3410, 3600, 3700, 3800, 4000, 4410, 8090)
- Retrieval (rasm/video so'rash) oylik kvotani sarflaydi; avto-rasm default o'chiq

## Tarix
- 2026-10-11 | Claude | DESKTOP-QA8B43G | Loyiha yaratildi: Samsara API (ko'p kompaniya), kamera devori iVMS uslubida, demo rejimi, Telegram/parol kirish
