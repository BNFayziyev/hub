# SYNAPSE — Instagram @synapseit.uz

**Bir jumlada:** SYNAPSE MChJ ning Instagram sahifasi — Telegram bot (@Instagram_kattabot) har kuni IT Reel taklif qiladi, egasi tasdiqlagach API orqali joylanadi; karusel postlar CLI orqali.
**Joylashuv:** `DESKTOP-QA8B43G`: `C:\synapse\instagram` · Git: yo'q · Domen/URL: instagram.com/synapseit.uz, t.me/Instagram_kattabot
**Holat:** ishlayapti (bot fon rejimida, 1-post chiqqan, Reels tasdiq kutmoqda)
**Oxirgi yangilanish:** 2026-10-11

## Stack
- Node 24: `grammy` (bot), Remotion 4.0.534 (`reels/`, 1080×1920 30fps), `playwright-core` (slaydlar), `zod` 4.5.4 (Remotion talabi)
- Python `.venv`: edge-tts (`uz-UZ-SardorNeural`), numpy (musiqa sintezi)
- Claude CLI (`~/.local/bin/claude.exe -p`, asboblarsiz) — ssenariy yozish/tahrirlash; token bo1ai bilan bir xil (obuna)
- Instagram API with Instagram Login, `graph.instagram.com/v24.0`; akkaunt ID 17841423699555438, MEDIA_CREATOR

## Arxitektura (qisqa)
- `bot.mjs` — Telegram bot: kunlik taklif (DAILY_TIME, standart 10:00 Toshkent), tugmalar: ✅ hozir / 🕖 POST_TIME (19:00) / ✏️ o'zgartirish / 🔁 boshqa g'oya / 📝 matn / ❌; matn = yangi mavzu, reply/✏️ = tahrir izohi; bitta render navbati
- `lib/writer.mjs` — Claude promptlari (8 rukn aylanadi), zod sxema, ekrandagi matnda oʻ/gʻ → U+02BB normalizatsiya, caption + aloqa + xeshteg
- `lib/reel.mjs` — TTS → sahna vaqtlari → Remotion bundle/render (har render bundle) → reel.mp4 + cover.jpg
- `reels/` — Reel.tsx (hook/item/outro, tugma "keycap"lari, progress chizig'i), Backdrop.tsx (neyron tarmoq), theme.ts
- `lib/ig.mjs` — API: publishReel (`video_url`), publishImages, recentMedia, refreshToken; fayllar `dist/ig/<tasodifiy>/` orqali vaqtincha ochiq, keyin o'chiriladi
- `ig.mjs` — CLI (check/render/publish/reel/media/refresh); `posts/` — karusel slaydlar; `tools/` tts.py, music.py
- `data/` — reels/<sana-id>/ (state.json, script.json, reel.mp4), history.json, bot-state.json, bot.log, refresh.log

## Ishga tushirish
Batafsil: `README.md`. Bot: Windows vazifasi `SynapseIG-Bot` (logonda, `conhost --headless` → `bot-loop.cmd`, 10 s da qayta yoqadi).
Kod o'zgarsa: `node.exe ... bot.mjs` jarayonini o'ldirish — loop 10 s da qayta yoqadi.
Kerakli `.env` kalitlari (faqat nomlari): `IG_ACCESS_TOKEN`, `IG_USER_ID`, `PUBLIC_BASE`, `TG_BOT_TOKEN`, `TG_ADMIN_IDS`, `CLAUDE_CODE_OAUTH_TOKEN`, ixtiyoriy `DAILY_TIME`, `POST_TIME`, `REEL_VOICE`, `REEL_MODEL`, `REEL_EFFORT`

## Hozirgi holat
- 2026-10-11: bot ishlayapti, admin = foydalanuvchi (TG_ADMIN_IDS); 1-kunlik taklif «Clipboard History (Win+V)» yuborilgan (ekranda talaffuz yozuvi chiqib qolgan — keyin tuzatildi, bu variantni ✏️ bilan yangilash mumkin)
- Reel joylash sinovi (joylamasdan konteyner) — FINISHED, 29–54 s
- `posts/01-tanishuv` karusel chiqqan: https://www.instagram.com/p/DeU9bgZGu76/

## Keyingi qadamlar
- [ ] Birinchi Reel'ni haqiqatan joylash (foydalanuvchi ✅) va natijani tekshirish
- [ ] Foydalanuvchi ovoz (Sardor) va musiqa sifatiga fikr bildirsin; kerak bo'lsa Madina / ElevenLabs
- [ ] Bot orqali karusel postlar ham (hozir faqat Reels)
- [ ] 2026-10-12 dan keyin `data/refresh.log` (token yangilash) tekshirish
- [ ] Izohlar/DM ga javob tayyorlash (keyinroq)

## Muhim qarorlar
- Reels — asosiy format, har kuni 1 ta; hech narsa egasi tasdig'isiz joylanmaydi (foydalanuvchi, 2026-10-11)
- Claude — bo1ai'dagi obuna tokeni (foydalanuvchi tanladi, 2026-10-11); API kalit yo'q
- Musiqa — kod bilan sintez (Instagram API litsenziyali musiqani qo'sha olmaydi)
- Murojaat: Telegram @beekhasanov, tel +998 90 665 67 00; @synapse_bo1 Instagram'da ishlatilmaydi; Bobirjon kontaktlari yo'q
- Mahsulot nomi: "Time — FaceID davomat platformasi" ("KattaBaza Time" emas)
- Bio — o'zbekcha, avatar — B (yashil fon)

## Ehtiyot bo'ling
- Instagram ustida ishlaganda synapseit.uz SAYT kodiga va promo videoga TEGMANG (foydalanuvchi, 2026-10-10); faqat `dist/ig/` vaqtinchalik fayllar
- `CLAUDE_CODE_OAUTH_TOKEN` bo1ai bilan bir xil — bo1ai tokeni yangilansa, `instagram/.env` ni ham yangilang
- Instagram Login API resumable upload'ni qabul qilmaydi ("video_url is required") — video URL orqali
- `npm run build` (sayt) dist/ni tozalaydi — joylash paytida build qilmang
- Remotion zod 4.5.4 ni talab qiladi (boshqa versiya — ogohlantirish)
- Instagram'da ism 14 kunda 2 marta o'zgaradi; API bio/highlight/pin/musiqani o'zgartira olmaydi

## Tarix
- 2026-10-10 | Claude | DESKTOP-QA8B43G | Loyiha ochildi: bio (UZ/RU), ism, havolalar, avatar 2 variant
- 2026-10-10 | Claude | DESKTOP-QA8B43G | ig.mjs (API: check/render/publish/media/refresh), token tekshirildi, 01-tanishuv karuseli tayyor
- 2026-10-10 | Claude | DESKTOP-QA8B43G | @synapse_bo1 olib tashlandi → Telegram @beekhasanov; 4-slaydda AI yordamchi o'rniga Xavfsizlik tekshiruvi
- 2026-10-10 | Claude | DESKTOP-QA8B43G | 4-slayd: Time (FaceID davomat), Samsara Bot, "…va yana"; token yangilash vazifasi SynapseIG-TokenRefresh
- 2026-10-10 | Claude | DESKTOP-QA8B43G | 01-tanishuv API orqali joylandi (karusel, 5 slayd), foydalanuvchi tasdigi bilan
- 2026-10-11 | Claude | DESKTOP-QA8B43G | Reels tizimi: @Instagram_kattabot (tasdiq/tahrir/rejalash), Remotion shablon, o'zbekcha TTS, sintez musiqa, Claude CLI yozuvchi; vazifa SynapseIG-Bot
