# faceID_manager — FaceID davomat platformasi (server)

**Bir jumlada:** Markaziy server: veb platforma, Telegram bot va barcha ofislardan kelgan davomat ma'lumotlari; bitta server ko'p kompaniyaga xizmat qiladi.
**Joylashuv:** `DESKTOP-QA8B43G`: `C:\faceID_manager` · Git: yo'q · Domen/URL: time.kattabaza.uz (?)
**Holat:** ishlayapti?
**Oxirgi yangilanish:** 2026-10-08

## Stack
- FastAPI (backend), Next.js (frontend), aiogram (Telegram bot), PostgreSQL, Caddy (HTTPS), Docker Compose

## Arxitektura (qisqa)
- `backend/`, `frontend/`, `tools/`, `data/`, `Caddyfile`, `docker-compose.yml`
- Reja: `PLAN.md` (arxitektura, smena/hisob dvigateli)
- Terminallar internetga ochilmaydi; faqat client chiquvchi ulanadi. Bog'liq: [faceID_client](faceID_client.md)

## Ishga tushirish
`docker compose up -d` (batafsil — README.md). Promo video: [kattabaza_promo](kattabaza_promo.md)

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
