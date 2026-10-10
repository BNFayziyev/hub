# synapseit.uz — SYNAPSE MChJ korporativ sayti

**Bir jumlada:** 3D korporativ sayt (Vite + Three.js), RU asosiy, /uz/, /en/; statik HTML (SEO) + alohida 3D sahna.
**Joylashuv:** `DESKTOP-QA8B43G`: `C:\synapse` · Git: yo'q · Domen/URL: synapseit.uz, synapseit.us (Cloudflare Tunnel → shu kompyuter)
**Holat:** ishlayapti (prod)
**Oxirgi yangilanish:** 2026-10-10

## Stack
- Vite, Three.js, Lenis; Vercel (`api/lead.js` — ariza → Telegram)

## Arxitektura (qisqa)
- Matnlar faqat `src/content/` da (site.js, services.js, projects.js, ui.js)
- `src/render/` shablon, `src/scene/` 3D, `src/ui/`, `src/styles/main.css`, `public/`

## Ishga tushirish
`npm install`, `npm run dev`, `npm run build`

## Hozirgi holat
- `node server/index.js` (127.0.0.1:8095) `dist/` ni beradi; fayllar har so'rovda o'qiladi — `npm run build` yetarli, restart shart emas
- Raqamlar (`src/content/site.js` STATS): 32+ server, 16+ bot, 30+ kompaniya, 99,9%

## Keyingi qadamlar
- [ ] ?

## Muhim qarorlar
- ?

## Ehtiyot bo'ling
- `.env` da maxfiy kalitlar bor — hubga yozilmaydi.

## Tarix
- 2026-10-08 | Claude | DESKTOP-QA8B43G | Karta yaratildi (README/package.json asosida, chuqur tahlil qilinmagan)
- 2026-10-10 | Claude | DESKTOP-QA8B43G | Server soni 23+ → 32+ (site.js STATS, services.js matni), build — jonli saytda tekshirildi
