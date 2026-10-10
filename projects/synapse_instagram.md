# SYNAPSE — Instagram @synapseit.uz

**Bir jumlada:** SYNAPSE MChJ ning Instagram sahifasi — profil, kontent va (keyinroq) API orqali avtomatik joylash.
**Joylashuv:** `DESKTOP-QA8B43G`: `C:\synapse\instagram` · Git: yo'q · Domen/URL: instagram.com/synapseit.uz
**Holat:** boshlang'ich (akkaunt ochilgan, profil to'ldirilmoqda)
**Oxirgi yangilanish:** 2026-10-10

## Stack
- Hozircha: profil matnlari + avatar (HTML → headless Chrome PNG)
- Reja: Instagram API (Instagram Login, Business akkaunt), media synapseit.uz orqali ochiq URL, Telegram orqali tasdiqlash

## Arxitektura (qisqa)
- `profile.md` — ism, bio (UZ/RU), havolalar, kategoriya, highlights
- `brand/avatar-a|b.html` → `avatar-*.png` (1080×1080), `preview-circles.png`

## Ishga tushirish
Avatar: `chrome --headless=new --window-size=1080,1080 --screenshot=avatar-b.png file:///C:/synapse/instagram/brand/avatar-b.html`
Kerakli `.env` kalitlari (faqat nomlari, API ulangach): `IG_ACCESS_TOKEN`, `IG_USER_ID`

## Hozirgi holat
- Bio UZ (asosiy) va RU varianti, avatar 2 variant (tavsiya: avatar-b) tayyor — foydalanuvchi tanlashi kerak

## Keyingi qadamlar
- [ ] Foydalanuvchi: bio tili va avatarni tanlash, profilni Business ga o'tkazish
- [ ] Meta app + token (foydalanuvchi o'zi) → joylash skripti + Telegram tasdiqlash
- [ ] Highlight muqovalari, birinchi 9 post (3 ta pin: promo Reel 9:16, xizmatlar, loyihalar)

## Muhim qarorlar
- Aloqa ma'lumotlari saytdagi bilan bir xil (Behzod Hasanov, @synapse_bo1); Bobirjon kontaktlari yo'q
- Har bir post foydalanuvchi tasdig'idan keyin chiqadi

## Ehtiyot bo'ling
- Instagram'da ism 14 kunda faqat 2 marta o'zgaradi
- API bio/highlight/musiqani o'zgartira olmaydi — bular qo'lda

## Tarix
- 2026-10-10 | Claude | DESKTOP-QA8B43G | Loyiha ochildi: bio (UZ/RU), ism, havolalar, avatar 2 variant
