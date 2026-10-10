# SYNAPSE — Instagram @synapseit.uz

**Bir jumlada:** SYNAPSE MChJ ning Instagram sahifasi — profil, post tayyorlash (HTML → JPEG) va Instagram API orqali joylash.
**Joylashuv:** `DESKTOP-QA8B43G`: `C:\synapse\instagram` · Git: yo'q · Domen/URL: instagram.com/synapseit.uz
**Holat:** ishlab chiqilmoqda (API ulandi, 1-post tayyor, joylanmagan)
**Oxirgi yangilanish:** 2026-10-10

## Stack
- Node 24 (`ig.mjs`, bog'liqlik faqat `playwright-core` → o'rnatilgan Chrome), lucide-static ikonkalar (`C:\synapse\node_modules`)
- Instagram API with Instagram Login, `graph.instagram.com/v24.0`, token turi IG… (Facebook EAA… ham qo'llab-quvvatlanadi)
- Akkaunt: @synapseit.uz, ID 17841423699555438, turi MEDIA_CREATOR (Creator), limit 100 post/24 soat

## Arxitektura (qisqa)
- `ig.mjs` — check | refresh | media | render <post> | publish <post> [--go]
- `posts/<nom>/` — post.json (type, published), caption.txt, slides.html (`section.slide` = 1 rasm, 1080×1350)
- `posts/_shared/slide.css|js` — brend uslubi, sarlavha/sanoq/pastki qator, fon neyron-tarmog'i
- Rasm URL: publish JPEG'ni `C:\synapse\dist\ig\<tasodifiy>\` ga qo'yadi → `https://synapseit.uz/ig/...`, joylangach o'chiradi
- Reels: resumable upload (URL kerak emas)
- `profile.md` — ism, bio, havolalar; `brand/avatar-*.png`

## Ishga tushirish
`cd C:\synapse\instagram && npm install && node ig.mjs check` (batafsil README.md)
Kerakli `.env` kalitlari (faqat nomlari): `IG_ACCESS_TOKEN`, `IG_USER_ID`, `PUBLIC_BASE`

## Hozirgi holat
- Token ishlaydi (2026-10-10 tekshirildi), synapseit.uz/ig/ orqali hosting Cloudflare'dan o'tadi
- `posts/01-tanishuv` — 5 slaydli karusel + matn tayyor, egasi tasdig'ini kutmoqda
- Akkauntda 2026-10-09 dagi 1 ta Reel bor (foydalanuvchi o'zi joylagan)

## Keyingi qadamlar
- [ ] 01-tanishuv ni tasdiqlash → `publish --go`
- [ ] Profil: ism/bio (UZ tanlandi), avatar-b, havolalar — foydalanuvchi qo'lda
- [ ] 02 xizmatlar, 03 loyihalar karusellari; promo Reel 9:16
- [ ] Token yangilash avtomatik (haftalik `node ig.mjs refresh`) — 60 kunda tugaydi
- [ ] Telegram orqali tasdiqlash (preview + ✅ tugma)

## Muhim qarorlar
- Bio — o'zbekcha, avatar — B (yashil fon) (foydalanuvchi, 2026-10-10)
- Aloqa ma'lumotlari saytdagi bilan bir xil (Behzod Hasanov, @synapse_bo1); Bobirjon kontaktlari yo'q
- Har bir post faqat foydalanuvchi tasdig'idan keyin `--go` bilan chiqadi
- Slaydlarda o'zbekcha ʻ (U+02BB): toʻliq, oʻz

## Ehtiyot bo'ling
- Instagram'da ism 14 kunda faqat 2 marta o'zgaradi
- API bio/highlight/pin/musiqani o'zgartira olmaydi — bular qo'lda
- API faqat JPEG rasm qabul qiladi; `npm run build` (sayt) dist/ni tozalaydi — joylash paytida build qilmang

## Tarix
- 2026-10-10 | Claude | DESKTOP-QA8B43G | Loyiha ochildi: bio (UZ/RU), ism, havolalar, avatar 2 variant
- 2026-10-10 | Claude | DESKTOP-QA8B43G | ig.mjs (API: check/render/publish/media/refresh), token tekshirildi, 01-tanishuv karuseli tayyor
