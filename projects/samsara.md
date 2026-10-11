# Samsara Wall

**Bir jumlada:** Samsara kamera devori — har kompaniya o'z Samsara API kaliti bilan: traklarning tashqi kameralari iVMS uslubidagi zich to'rda, xarita + trak yo'li izi, Safety Inbox videolari, Telegram guruhga hodisalar.
**Joylashuv:** `DESKTOP-QA8B43G`: `C:\samsara` · Git: yo'q · Domen/URL: https://samsara.kattabaza.uz (Cloudflare tunnel → localhost:3900)
**Holat:** prod (Task `SamsaraWall`, bot @samsara_kattabot)
**Oxirgi yangilanish:** 2026-10-11

## Stack
- Node 24 (`.ts` to'g'ridan-to'g'ri), Fastify 5, SQLite `node:sqlite`, grammy, React 18 + Vite 6, MapLibre GL
- treyler bilan bir xil uslub (ko'p kompaniya, Telegram kirish, AES-256-GCM shifrlangan kalitlar), PWA
- Logo: KattaBaza katakchalari + katta kvadratda trak (`web/public/brand/logo.svg`); PNG/ICO ikonkalar treyler'dagi Playwright bilan chiqariladi (scratchpad `icons.cjs` mantiqi: SVG → 192/512/maskable/180/48-ICO); manifest `/app.webmanifest`

## Arxitektura (qisqa)
- `server/src/samsara/client.ts` — Samsara REST (US/EU/CA), 220 ms oraliq, 429 qayta urinish
- `server/src/jobs/poller.ts` — har kompaniya sikli: `/fleet/vehicles` (10 daq), `/fleet/vehicles/stats?types=gps,engineStates`, `GET /cameras/media` (dashcamRoadFacing, kursor kv `media_cursor:<id>`), retrieval holati, haydovchilar (`/fleet/driver-vehicle-assignments`, 2 daq), Safety (`/safety-events/stream`, kursor `safety_cursor:<id>`, 1 daq)
- Jonli rejim (`companies.live_seconds`): devor ko'rinib turgan traklarni `/api/wall?watch=&focus=` bilan bildiradi (20 s TTL); `liveTick` (3 s) yo'ldagilarga `POST /cameras/media/retrieval` image (ochilgan trak 15 s), konveyer, kunlik kvota ulushi, 90% da to'xtaydi
- Kadrlar/videolar diskda: `data/media/<kompaniya>/<trak>/` (kadr 24 soat, klip 7 kun), `safety-<trak>/` (14 kun; tashqi PRIMARY + ichki SECONDARY `-in`)
- Safety: `core/safety.ts`; `preferredCam(labels)` — telefon/chalg'ish/uyqu/kamar/chekish → ichki kamera, qolgani → tashqi
- Telegram: `bot/telegram.ts` (`/link`, `/holat`, `/unlink`, guruh/mavzularni eslab qoladi `tg_chats`, `tg_chat_topics`), `bot/notify.ts` (20 s, ≤12 xabar/daq, video 15 daq kutiladi, mayda tezlik yuborilmaydi); rejimlar: `topic` yoki `per_truck` (thread_id=-1, bot "🚛 <raqam>" mavzu ochadi, `tg_truck_topics`)
- Web: `Wall.tsx` (devor 1–64, o'ng chetda Safety yorlig'i), `FleetPage.tsx` + `FleetMap.tsx` (ro'yxat, xarita, yo'l izi 6–72 soat), `SafetyFeed.tsx` (filtrlar: video, kamera avto/tashqi/ichki, toifa, holat, qidiruv), `Settings.tsx` (Ulanish / Devor / Telegram / Shaxsiy), `i18n.ts` (uz/en/ru, kalit = o'zbekcha matn)

## Ishga tushirish
```
npm install; npm run build:web; npm start          # :3900
powershell -ExecutionPolicy Bypass -File C:\samsara\scripts\install-task.ps1   # Task "SamsaraWall", kirishda
npm run probe -- <API_KALIT> [us|eu|ca]            # kalit + kadrlar oralig'i
```
Prod'ni qayta ishga tushirish: `--env-file-if-exists=.env server` node jarayonini to'xtatish (run.cmd 10 s da qayta yoqadi).
`.env` kalitlari: PORT, HOST, PUBLIC_URL, SECRET_KEY, CREDENTIALS_KEY, ADMIN_PASSWORD, TELEGRAM_BOT_TOKEN, TELEGRAM_ADMIN_IDS, TELEGRAM_TIMEZONES, MEDIA_KEEP_HOURS, CLIP_KEEP_DAYS, SAFETY_KEEP_DAYS
Dev: `.claude/launch.json` → `samsara-dev` (port 3901, `.env.dev`, `data-dev/`, demo kompaniya)

## Hozirgi holat
- Kompaniyalar: "Continental" (79 trak, 65 kamerali) va "bitvin" (o'sha 79 trak — ehtimol o'sha kalit, foydalanuvchi qo'shgan)
- Jonli rejim 60 s; o'lchov: kadr kechikishi 72–87 s; kvota oyiga 8040 s HD (1 rasm = 0.1 s)
- Safety: 3 kunda ~3100 hodisa (93% tezlik, videosiz); videoli ~140 ta (~200 KB). Haydovchi faqat 7/79 trakda biriktirilgan
- Telegram: "Samsara Continental" guruhi `per_truck` rejimida (bot admin + Manage topics)
- 3 til, PWA, sozlamalar bo'limlari tayyor

## Keyingi qadamlar
- [ ] Kvota sarfini kuzatish ("bitvin" ham shu kalitni ishlatsa - ikki baravar)
- [ ] Taklif: hodisani dismiss/coach qilish (Write Safety Events), kunlik hisobot Telegram'ga
- Fakt: periodicStill har 360 s (6 daq), oralig'ini o'zgartirib bo'lmaydi; Samsara Live Stream API'da yo'q, litsenziyasiz 5 daq/oy/kamera; Helicopter View o'chiq (litsenziya yo'q)

## Muhim qarorlar
- Samsara ochiq API'sida jonli video YO'Q → "deyarli jonli" devor (kameralar yuklagan kadrlar + retrieval). Dashboard'ni brauzer orqali tortish rad etildi
- Devorda faqat tashqi kamera; Safety'da hodisa turiga qarab ichki/tashqi (foydalanuvchi so'rovi)
- Kadrlar serverga yuklanadi (Samsara URL 8 soatda eskiradi)
- Tarjima: o'zbekcha matn kalit, tarjima topilmasa o'zbekchasi chiqadi; Telegram xabarlari o'zbekcha

## Ehtiyot bo'ling
- `CREDENTIALS_KEY` ni o'zgartirmang — saqlangan API kalitlar ochilmay qoladi
- Port 3900 prod, 3901 dev (boshqa loyihalar: 3410, 3600, 3700, 3800, 4000, 4410, 8090)
- Retrieval oylik kvotani sarflaydi; avto-rasm default o'chiq
- Samsara `startMs` hujjatda son, amalda ISO matn; media input `MEDIA_INPUT_PRIMARY/SECONDARY`
- Cloudflare js/css/svg/png ni 4 soat keshlaydi — index.html `no-store`, assetlar xeshli; fastify-static `cacheControl: false`. Ikonka/logo o'zgarsa - FAYL NOMINI almashtiring (brauzer favicon keshi juda qattiq)
- Hub kartasiga sed `${ln}a` bilan yozishda `ln` bo'sh bo'lsa - qator HAR qatordan keyin qo'shiladi (2026-10-11 shunday buzilgan, tiklandi)

## Tarix
- 2026-10-11 | Claude | DESKTOP-QA8B43G | Loyiha yaratildi: Samsara API (ko'p kompaniya), kamera devori iVMS uslubida, demo rejimi, Telegram/parol kirish
- 2026-10-11 | Claude | DESKTOP-QA8B43G | Jonli rejim (retrieval konveyer, kunlik kvota), kamerasiz traklar chiqarildi
- 2026-10-11 | Claude | DESKTOP-QA8B43G | Xarita menyusi (ro'yxat + MapLibre + Safety Inbox videolari), haydovchilar, trak yo'li izi
- 2026-10-11 | Claude | DESKTOP-QA8B43G | Telegram guruh: /link, platformadan ulash, har trakka alohida mavzu; Safety filtrlari
- 2026-10-11 | Claude | DESKTOP-QA8B43G | Safety ichki kamera, hodisa turiga qarab kamera tanlash
- 2026-10-11 | Claude | DESKTOP-QA8B43G | KattaBaza logo, PWA, 3 til (uz/en/ru), sozlamalar bo'limlari + shaxsiy sozlamalar, Safety yorlig'i o'ng chetda; buzilgan hub kartasi tiklandi
- 2026-10-11 | Claude | DESKTOP-QA8B43G | Yangi logo (KattaBaza + trak, C variant), ikonkalar /brand/ ga yangi nomlar bilan (eski ko'k favicon keshi); to'liq ekranda Safety paneli ham
