# BronBar — sartaroshxonalar uchun bron platformasi

**Bir jumlada:** Ko'p biznesli onlayn navbat platformasi (avval erkaklar sartaroshxonasi); mijoz va sartarosh ilovasi bitta PWA, UZ/RU/EN.
**Joylashuv:** `DESKTOP-QA8B43G`: `C:\s` · Git: lokal (remote yo'q) · Domen/URL: https://bron.kattabaza.uz (kattabaza Cloudflare tunnel)
**Holat:** ishlayapti (prod, MVP)
**Oxirgi yangilanish:** 2026-10-09

## Stack
- Monorepo: `apps/api` NestJS 12 ESM + Prisma 7.10 (pinned) + PostgreSQL 17 (Windows service, db `bronbar`); `apps/web` Next 16 (App Router, Turbopack) + Tailwind 4
- Kirish: Telegram bot (@bronbarbot) — login token + poll; Telegram Mini App ham
- Xabarlar: Telegram + Web Push (VAPID); SMS — sartarosh telefonidan `sms:` havola
- Hosting: shu kompyuter 24/7 (keyin O'zbekiston VPS); Docker lokal ishlatilmaydi

## Arxitektura (qisqa)
- To'liq talablar: `C:\s\TZ.md`. Kodda umumiy "biznes/joy" (Business, StaffMember, Booking, ClientCard)
- Brend nomi/ranglari bitta joyda: `apps/web/src/lib/brand.ts`. Zaxira: `~\BronBar-backups` (30 kun)
- Web `/api/*` → Next rewrite → API (cookie bitta domenda)
- Sahifalar: `/` landing, `/b/<slug>` sartaroshxona ochiq sahifasi (SSR, SEO), `/app/*` ilova (client), `/admin/*`, `/login`, `/privacy` `/terms` `/delete-account`
- Offline/tezlik: `public/sw.js` (VERSION; /app qobig'i keshdan darhol + orqa fonda yangilanadi; API JSON keshi `bronbar-api`), `lib/use-api.ts` (keshdan darhol → internetdan yangilash), `lib/offline.ts` (o'zgarishlar navbati, sinxron), skeletlar `components/skeleton.tsx`, animatsiya `components/offline-art.tsx`
- Tayyor QR: bo'sh `/b/<slug>` → `/app/barber?claim=<slug>` → sartarosh shu havola bilan ro'yxatdan o'tadi (`lib/claim.ts`, admin `/admin/qr`)

## Ishga tushirish
```
npm install
npm run dev:api        # API 4400 (dev)
npm run dev:web        # web 3400 (dev)
cd apps/api && npx vitest run --config ./vitest.config.e2e.ts   # e2e (TEST_DATABASE_URL)
powershell -ExecutionPolicy Bypass -File scripts\update.ps1     # prod: backup → build → migrate → restart
npm run make-admin +998XXXXXXXXX                                # platforma admini
```
Prod nusxa: `scripts/start.cmd` — web 3410, API 4410 (dist-prod, .next-prod). Avtostart va backup — Task Scheduler.
`.env` (`C:\s\.env`) kalitlari: DATABASE_URL, TEST_DATABASE_URL, TELEGRAM_BOT_TOKEN, TELEGRAM_BOT_USERNAME, VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY, VAPID_SUBJECT, PUBLIC_ORIGIN, WEB_ORIGIN, API_PORT, POSTGRES_SUPERUSER_PASSWORD

## Hozirgi holat
- TZ bosqichlari 1–7 tayyor: bron, jadval, mijoz kartochkasi, sharhlar, avans, hisobotlar, admin, SEO
- Akkauntni o'chirish (DELETE /me), huquqiy sahifalar, PWA manifest, o'rnatish tugmasi
- Internetsiz ishlash: sartarosh mijoz qo'shadi/bekor qiladi/keldi belgilaydi — navbatga tushadi va keyin yuboriladi (walk-in id ilovada yaratiladi — takrorlanmaydi)
- Tez ochilish: sahifalar oldindan yuklanadi (o'tish ~6–9 ms), ma'lumot keshdan darhol
- Tayyor username'li QR: admin yaratadi → sartarosh skanerlab shu havola bilan ro'yxatdan o'tadi; ro'yxatdagi sartaroshga havolani ulash taklif qilinadi

## Keyingi qadamlar
- [ ] Server vaqt mintaqasi muammosini tuzatish (pastda "Ehtiyot bo'ling")
- [ ] O'z domeni (masalan bronbar.uz) — Play Market'dan OLDIN (TWA domenga bog'lanadi)
- [ ] Google Play: TWA (25$, 12 tester × 14 kun yopiq test); keyin App Store: Capacitor + push (99$/yil)
- [ ] Do'kon uchun skrinshotlar, 1024×500 banner, tavsif

## Muhim qarorlar
- Akkaunt o'chirilganda bron tarixi nomsiz qoladi (sartaroshxona hisobi uchun), yagona ega bo'lsa sartaroshxona yopiladi
- /app sahifalarida HTML ichida shaxsiy ma'lumot yo'q (client render) — shuning uchun SW ularni keshlaydi; shaxsiy API keshi chiqishda va 401 da o'chiriladi
- Yangi versiya foydalanuvchiga bir ochilish kechikib yetadi (SW eski qobiqni beradi, fon yangilaydi; fayllar ro'yxati o'zgarsa eski sahifalar almashtiriladi)
- Skeletlar faqat asosiy ro'yxatlarda (bronlar, mijozlar, mijoz bronlari, sartaroshxonalar)

## Ehtiyot bo'ling
- `.env` da maxfiy kalitlar — hubga yozilmaydi
- Kompyuter vaqt mintaqasi America/New_York (Toshkent emas) → Postgres timestamptz qiymatlari 4 soat siljib saqlanmoqda (ilova ichida to'g'ri ko'rinadi). VPS'ga ko'chirishdan oldin tuzatish SHART
- Dev va prod BITTA bazani ishlatadi — dev'da test ma'lumot yaratmang; sinov uchun TEST_DATABASE_URL bilan alohida nusxa
- Port 4000 boshqa loyiha (kattabaza) — o'ldirmang; BronBar: 4400/3400 dev, 4410/3410 prod
- PowerShell 5.1 npm argumentlaridagi `--` ni yo'qotadi
- `sw.js` kesh tuzilishi o'zgarsa `VERSION` ni oshiring
- Next 16 — `apps/web/AGENTS.md`: kod yozishdan oldin `node_modules/next/dist/docs` ni o'qing
- Bot polling va reja ishlari faqat prod nusxada ishlaydi

## Tarix
- 2026-10-08 | Claude | DESKTOP-QA8B43G | Karta yaratildi (README/package.json asosida)
- 2026-10-09 | Claude | DESKTOP-QA8B43G | Karta to'ldirildi; do'konga tayyorgarlik, offline rejim, tez ochilish, tayyor username'li QR (bo'sh /b/<slug> → ro'yxatdan o'tish)
