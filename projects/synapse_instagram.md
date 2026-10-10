# SYNAPSE — Instagram @synapseit.uz

**Bir jumlada:** SYNAPSE MChJ ning Instagram sahifasi — profil, post tayyorlash (HTML → JPEG) va Instagram API orqali joylash.
**Joylashuv:** `DESKTOP-QA8B43G`: `C:\synapse\instagram` · Git: yo'q · Domen/URL: instagram.com/synapseit.uz
**Holat:** ishlayapti (API orqali 1-post chiqdi)
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
- `refresh-token.cmd` ← Windows vazifasi `SynapseIG-TokenRefresh` (har dushanba 10:00, foydalanuvchi sessiyasida, `conhost --headless`), log: `data/refresh.log`

## Ishga tushirish
`cd C:\synapse\instagram && npm install && node ig.mjs check` (batafsil README.md)
Kerakli `.env` kalitlari (faqat nomlari): `IG_ACCESS_TOKEN`, `IG_USER_ID`, `PUBLIC_BASE`

## Hozirgi holat
- Token ishlaydi (2026-10-10 tekshirildi), synapseit.uz/ig/ orqali hosting Cloudflare'dan o'tadi
- `posts/01-tanishuv` — 5 slaydli karusel CHIQDI 2026-10-10: https://www.instagram.com/p/DeU9bgZGu76/
- Akkauntda 2026-10-09 dagi 1 ta Reel bor (foydalanuvchi o'zi joylagan)

## Keyingi qadamlar
- [ ] 01-tanishuv ni profil tepasiga pin qilish (qo'lda — API qila olmaydi)
- [ ] Profil: ism/bio (UZ tanlandi), avatar-b, havolalar — foydalanuvchi qo'lda
- [ ] 02 xizmatlar, 03 loyihalar karusellari; promo Reel 9:16
- [ ] 2026-10-12 dan keyin `data/refresh.log` ni tekshirish (vazifa birinchi marta ishlaganmi)
- [ ] Telegram orqali tasdiqlash (preview + ✅ tugma)

## Muhim qarorlar
- Bio — o'zbekcha, avatar — B (yashil fon) (foydalanuvchi, 2026-10-10)
- Murojaat: Telegram @beekhasanov (Behzod Hasanov), tel +998 90 665 67 00; @synapse_bo1 Instagram'da UMUMAN ishlatilmaydi (2026-10-10); Bobirjon kontaktlari yo'q
- Har bir post faqat foydalanuvchi tasdig'idan keyin `--go` bilan chiqadi
- Slaydlarda o'zbekcha ʻ (U+02BB): toʻliq, oʻz
- Mahsulot nomi: "Time — FaceID davomat platformasi" ("KattaBaza Time" EMAS); 4-slayd: Time, Trailer Watch, Samsara Bot, Xavfsizlik tekshiruvi + "…va yana" (foydalanuvchi, 2026-10-10)

## Ehtiyot bo'ling
- Instagram ustida ishlaganda synapseit.uz SAYTGA va promo videoga TEGMANG (foydalanuvchi, 2026-10-10) — saytda @synapse_bo1 hali bor, bu alohida qaror
- Instagram'da ism 14 kunda faqat 2 marta o'zgaradi
- API bio/highlight/pin/musiqani o'zgartira olmaydi — bular qo'lda
- API faqat JPEG rasm qabul qiladi; `npm run build` (sayt) dist/ni tozalaydi — joylash paytida build qilmang

## Tarix
- 2026-10-10 | Claude | DESKTOP-QA8B43G | Loyiha ochildi: bio (UZ/RU), ism, havolalar, avatar 2 variant
- 2026-10-10 | Claude | DESKTOP-QA8B43G | ig.mjs (API: check/render/publish/media/refresh), token tekshirildi, 01-tanishuv karuseli tayyor
- 2026-10-10 | Claude | DESKTOP-QA8B43G | @synapse_bo1 olib tashlandi → Telegram @beekhasanov; 4-slaydda AI yordamchi o'rniga Xavfsizlik tekshiruvi
- 2026-10-10 | Claude | DESKTOP-QA8B43G | 4-slayd: Time (FaceID davomat), Samsara Bot, "…va yana"; token yangilash vazifasi SynapseIG-TokenRefresh
- 2026-10-10 | Claude | DESKTOP-QA8B43G | 01-tanishuv API orqali joylandi (karusel, 5 slayd), foydalanuvchi tasdigi bilan
