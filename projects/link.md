# Vizitka — raqamli vizitka platformasi

**Bir jumlada:** Taplink'ga o'xshash: profil-link, QR, vizitka dizayneri (24 shablon), bosma buyurtmalar, Telegram orqali kirish va admin panel.
**Joylashuv:** `DESKTOP-QA8B43G`: `C:\link` · Git: yo'q · Domen/URL: vizitka.kattabaza.uz
**Holat:** ishlab chiqilmoqda / ishlayapti?
**Oxirgi yangilanish:** 2026-10-09

## Stack
- React + Vite, Express, qrcode, jspdf, html-to-image; Telegram Mini App; PWA

## Arxitektura (qisqa)
- `web/` frontend, `server/` backend, `deploy/`, `scripts/`, `data-dev/`
- `/admin` — statistika, buyurtmalar, narxlar; buyurtmalar adminga Telegramda keladi

## Ishga tushirish
`npm install`, skriptlar — package.json. .env: BOT_TOKEN va boshqalar (README §2)

## Hozirgi holat
- QR menyu (`web/src/pages/Share.jsx`): ochilishi bilan A-format QR poster (`web/src/lib/poster.js`, 8 rang presetı), qalamcha → tahrirlash oynasi (Poster / Oddiy QR); PNG (2480px) va SVG eksport
- Ommaviy profilda qalamcha (FAB) → "Xabar yozish" → `leads` (kind=message) → egasiga Telegram bot xabari + Web Push (`server/push.js`, `web-push`, VAPID `data/vapid.json` yoki .env VAPID_PUBLIC/PRIVATE)
- Ilovada `/app/messages` sahifasi, TopBar'da qo'ng'iroqcha + o'qilmagan soni (30 s polling), push yoqish tugmasi
- Buyurtmada son qo'lda kiritiladi: narx = yetgan eng katta pog'onaning dona narxi × son; `materials.min_qty` (admin "Minimal buyurtma soni")

## Keyingi qadamlar
- [ ] ?

## Muhim qarorlar
- ?

## Ehtiyot bo'ling
- `.env` da maxfiy kalitlar bor — hubga yozilmaydi.

## Tarix
- 2026-10-09 | Claude | DESKTOP-QA8B43G | QR poster + qalamcha tahrir, profil xabarlari (TG bot + Web Push), buyurtmada erkin son va minimal miqdor
- 2026-10-09 | Claude | DESKTOP-QA8B43G | Prod: build + Vizitka xizmati qayta ishga tushirildi (DB zaxira: data/backup-2026-10-09)
- 2026-10-09 | Claude | DESKTOP-QA8B43G | DevTemplates.jsx ga ?demo= va ?qr= (faqat dev) — promo video suratlari uchun
- 2026-10-08 | Claude | DESKTOP-QA8B43G | Karta yaratildi (README/package.json asosida, chuqur tahlil qilinmagan)
