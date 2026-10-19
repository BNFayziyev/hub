# Vizitka — raqamli vizitka platformasi

**Bir jumlada:** Taplink'ga o'xshash: profil-link, QR, vizitka dizayneri (24 shablon), bosma buyurtmalar, Telegram orqali kirish va admin panel.
**Joylashuv:** `DESKTOP-QA8B43G`: `C:\link` · Git: yo'q · Domen/URL: vizitka.kattabaza.uz
**Holat:** ishlab chiqilmoqda / ishlayapti?
**Oxirgi yangilanish:** 2026-10-19

## Stack
- React + Vite, Express, qrcode, jspdf, html-to-image; Telegram Mini App; PWA

## Arxitektura (qisqa)
- `web/` frontend, `server/` backend, `deploy/`, `scripts/`, `data-dev/`
- `/admin` — statistika, buyurtmalar, narxlar; buyurtmalar adminga Telegramda keladi
- `/shop` — 2-admin: vizitka do'koni paneli (`web/src/pages/shop/`, `server/routes/shop.js`); buyurtma API admin bilan umumiy: `server/routes/order-ops.js`
- `desktop/` — Electron kompyuter dasturi (`/shop` ni ochadi); o'rnatuvchi `data/downloads/` dan `/download/windows` orqali beriladi
- `server/seo.js` — SEO sahifalar (`/vizitka-yaratish`, `/taplink-alternativa`, `/vizitka/<soha>`, `/ru/...`), `robots.txt`, `sitemap.xml`

## Ishga tushirish
`npm install`, skriptlar — package.json. .env: BOT_TOKEN va boshqalar (README §2)

## Hozirgi holat
- QR menyu (`web/src/pages/Share.jsx`): ochilishi bilan A-format QR poster (`web/src/lib/poster.js`, 8 rang presetı), qalamcha → tahrirlash oynasi (Poster / Oddiy QR); PNG (2480px) va SVG eksport
- Ommaviy profilda qalamcha (FAB) → "Xabar yozish" → `leads` (kind=message) → egasiga Telegram bot xabari + Web Push (`server/push.js`, `web-push`, VAPID `data/vapid.json` yoki .env VAPID_PUBLIC/PRIVATE)
- Ilovada `/app/messages` sahifasi, TopBar'da qo'ng'iroqcha + o'qilmagan soni (30 s polling), push yoqish tugmasi
- Buyurtmada son qo'lda kiritiladi: narx = yetgan eng katta pog'onaning dona narxi × son; `materials.min_qty` (admin "Minimal buyurtma soni")

## Hozirgi holat (2026-10-19)
- Do'kon paneli: bosh sahifa, Kanban doska (drag&drop), buyurtmalar (filtr: muddati o'tgan/qarzdor, ommaviy holat, CSV), qo'lda buyurtma (source=shop, mijozga TG xabar ketmaydi), to'lovlar (shop_payments, orders.paid), muddat/ustuvorlik/mas'ul, tarix (shop_log), chop varag'i PDF (A4/A3/SRA3, kesish belgilari), mijozlar, ombor (shop_stock), xarajat+hisobot
- Xodimlar: .env SHOP_IDS yoki admin sozlamalarida `shop_ids`; yangi buyurtma xabari ularga ham boradi
- Saytda ilovani o'rnatish taklifi (`web/src/components/InstallPrompt.jsx`): PWA / iOS yo'riqnoma / Windows dasturi
- Sohalarga Barbershop qo'shildi
- Server `index.html` ni mtime bo'yicha qayta o'qiydi (build'dan keyin restart shart emas, lekin server kodi o'zgarsa — shart)
- Desktop build: `cd desktop && npm run dist` (winCodeSign keshini 7za bilan qo'lda ochish kerak bo'ldi)

## Keyingi qadamlar
- [ ] Vizitka xizmatini qayta ishga tushirish (2026-10-19 dagi server o'zgarishlari uchun)
- [ ] Google Search Console / Yandex Webmaster'ga sitemap.xml qo'shish
- [ ] ?

## Muhim qarorlar
- ?

## Ehtiyot bo'ling
- `.env` da maxfiy kalitlar bor — hubga yozilmaydi.

## Tarix
- 2026-10-19 | Claude | DESKTOP-QA8B43G | SEO: /taplink va /ru/taplink sahifalari (tablink, таблинк va boshqa xato yozilishlar), /tablink -> /taplink 301
- 2026-10-19 | Claude | DESKTOP-QA8B43G | Do'kon paneli (/shop), Electron desktop dastur, o'rnatish taklifi, Barbershop sohasi, SEO sahifalar + sitemap (DB zaxira: data/backup-2026-10-19.db)
- 2026-10-09 | Claude | DESKTOP-QA8B43G | QR poster + qalamcha tahrir, profil xabarlari (TG bot + Web Push), buyurtmada erkin son va minimal miqdor
- 2026-10-09 | Claude | DESKTOP-QA8B43G | Prod: build + Vizitka xizmati qayta ishga tushirildi (DB zaxira: data/backup-2026-10-09)
- 2026-10-09 | Claude | DESKTOP-QA8B43G | DevTemplates.jsx ga ?demo= va ?qr= (faqat dev) — promo video suratlari uchun
- 2026-10-08 | Claude | DESKTOP-QA8B43G | Karta yaratildi (README/package.json asosida, chuqur tahlil qilinmagan)
