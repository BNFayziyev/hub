# Samsara Wall

**Bir jumlada:** Samsara kamera devori — har kompaniya o'z Samsara API kaliti bilan, barcha traklarning yo'lga qaragan (tashqi) kameralari iVMS uslubidagi zich to'rda, pastida trak raqami.
**Joylashuv:** `DESKTOP-QA8B43G`: `C:\samsara` · Git: yo'q · Domen/URL: https://samsara.kattabaza.uz (Cloudflare tunnel → localhost:3900)
**Holat:** prod (Task `SamsaraWall`, bot @samsara_kattabot), 1 kompaniya ulangan (44 trak)
**Oxirgi yangilanish:** 2026-10-11

## Stack
- Node 24 (`.ts` to'g'ridan-to'g'ri), Fastify 5, SQLite `node:sqlite`, grammy (kirish boti), React 18 + Vite 6
- treyler bilan bir xil uslub (ko'p kompaniya, Telegram kirish, AES-256-GCM shifrlangan kalitlar)

## Arxitektura (qisqa)
- `server/src/samsara/client.ts` — Samsara REST (US/EU/CA), 220 ms oraliq, 429 qayta urinish
- `server/src/jobs/poller.ts` — har kompaniya sikli (default 30 s): `/fleet/vehicles` (10 daq), `/fleet/vehicles/stats?types=gps,engineStates`, `GET /cameras/media` (20 mashinadan, `inputs=dashcamRoadFacing`, `availableAfterTime` kursori kv `media_cursor:<id>`), retrieval holati, ixtiyoriy avto-rasm
- Kadrlar `data/media/<kompaniya>/<mashina>/<ts>.jpg` ga yuklanadi (Samsara URL 8 soatda eskiradi), `/api/media/*` faqat o'z kompaniyasiga; 24 soatdan eskilari o'chadi (oxirgisi qoladi), kliplar 7 kun
- `samsara/demo.ts` — demo kompaniya (28 soxta trak, SVG kadrlar)
- Jonli rejim (`companies.live_seconds`): devor ko'rinib turgan trak ID larini `/api/wall?watch=..&focus=..` bilan yuboradi (20 s TTL), `liveTick` (har 3 s) yo'ldagi ko'rinib turganlarga `POST /cameras/media/retrieval` image yuboradi (ochilgani har 15 s), konveyer, kunlik kvota ulushi (qolgan*0.9 / oyning qolgan kunlari)
- Xarita menyusi (`FleetPage.tsx`): chapda traklar (haydovchi, manzil, tezlik, filtr/saralash), markazda MapLibre (qorong'i/yorug'/sputnik, yo'nalish strelkalari), o'ngda Safety Inbox (`SafetyFeed.tsx`, ko'rinib turgan video aylanib o'ynaydi)
- Haydovchilar: `/fleet/driver-vehicle-assignments?filterBy=vehicles` (2 daq); Safety: `/safety-events/stream` updatedAtTime kursori kv `safety_cursor:<id>` (1 daq), PRIMARY video diskka (`data/media/<id>/safety-<trak>/`), 14 kun
- Telegram: guruh mavzusida `/link` (kompaniya admini) → `tg_targets` (chat_id, thread_id, toifalar: collision/harsh/distraction/speeding/other), inline tugmalar bilan toifa tanlanadi; `bot/notify.ts` har 20 s yuborilmaganlarni (`tg_sent`) video+izoh bilan yuboradi, video 15 daq kutiladi, ≤12 xabar/daq; Light/Moderate speeding yuborilmaydi; vaqt TOSH + CT (`TELEGRAM_TIMEZONES`)- Yo'l izi: `/api/vehicles/:id/track?hours=` → `/fleet/vehicles/stats/history?types=gps` (60 s kesh, ≤1500 nuqta), xaritada chiziq + boshlanish + 10+ daq to'xtashlar + safety hodisalar
- Telegram v2: bot ko'rgan guruhlar `tg_chats` (my_chat_member + har xabar), mavzu nomlari `tg_chat_topics` (forum_topic_created); platformadan ulash `POST /api/telegram` (faqat kompaniya a'zosi botni qo'shgan guruhlar); rejim `per_truck` (thread_id=-1): bot har trakka "🚛 <raqam>" mavzu ochadi (`tg_truck_topics`, createForumTopic, admin + Manage topics kerak), o'chirilsa qayta ochadi- Safety panel: filtrlar - video (hammasi/videoli/videosiz), toifalar (+ mayda tezlik, server `minor=1`), holat, qidiruv (localStorage); Kameralar sahifasida ham (Safety tugmasi / S)
- `web/src/components/Wall.tsx` — devor (1–64 layout, sahifa, avto-aylantirish, F to'liq ekran, filtr), `Viewer.tsx` — katta ko'rinish + timelapse + "Hozirgi rasm"/"Video klip"

## Ishga tushirish
```
npm install; npm run build:web; npm start          # :3900
powershell -ExecutionPolicy Bypass -File C:\samsara\scripts\install-task.ps1   # Task "SamsaraWall", kirishda
npm run probe -- <API_KALIT> [us|eu|ca]            # kalit + kadrlar oralig'ini tekshirish
```
`.env` kalitlari: PORT, HOST, PUBLIC_URL, SECRET_KEY, CREDENTIALS_KEY, ADMIN_PASSWORD, TELEGRAM_BOT_TOKEN, TELEGRAM_ADMIN_IDS, MEDIA_KEEP_HOURS, CLIP_KEEP_DAYS
Dev: `.claude/launch.json` → `samsara-dev` (port 3901, `.env.dev`, `data-dev/`)

## Hozirgi holat
- Server + web tayyor, typecheck toza; demo kompaniya bilan brauzerda sinaldi (devor, 36 layout, viewer, rasm/video so'rovi, telefon)
- Kompaniya 1: jonli rejim 60 s (ochilgan trak 15 s), kunlik kvota ulushi bilan; o'lchov: kadr kechikishi 72–87 s
- Safety: 3 kunda ~3100 hodisa, 93% tezlik (videosiz); videoli ~135 ta (har biri ~200 KB, MEDIA_INPUT_PRIMARY). `startMs` ISO matn keladi (hujjatda son). Haydovchi ko'pincha id "0" - trakning hozirgi haydovchisi qo'yiladi; atigi 7/79 trakda haydovchi biriktirilgan
- `.env` to'ldirilgan (TELEGRAM_BOT_TOKEN bor, ADMIN_PASSWORD ham hali yoqiq), prod ishlayapti
- Kompaniya 1: Write Media Retrieval qo'shildi, jonli rejim 30 s da YOQIQ va ishlayapti (o'lchandi: har trakda kadr ~33–36 s da yangilanadi, kechikish 72–87 s)
- Kvota: oyiga 8040 s HD video (1 rasm = 0.1 s) → 30 s da 1 yo'ldagi trak soatiga 12 s; 90% da jonli rejim o'zi to'xtaydi
- Kamerasiz traklar (`cameraSerial` bo'sh, 79 dan 14 tasi) devorda ko'rinmaydi va so'ralmaydi; 400 "Camera was not recording" → shu trak 10 daq tinch qo'yiladi
- Jonli so'rovlar konveyer: trakda bir vaqtda ≤ ceil(75 s / oraliq) ta so'rov kutilishi mumkin

## Keyingi qadamlar
- [x] Bot @samsara_kattabot, Cloudflare domeni, Task SamsaraWall, Write Media Retrieval
- [ ] Kvota sarfini kuzatish
- [ ] Guruhda Topics yoqib, har mavzuda /link qilish (foydalanuvchi)
- [ ] Taklif: hodisani dismiss/coach qilish (Write Safety Events), kunlik hisobot
- Fakt: periodicStill har 360 s (6 daq) keladi; Samsara Live Stream API da yo'q va litsenziyasiz 5 daq/oy/kamera

## Muhim qarorlar
- Samsara ochiq API'sida jonli video oqimi YO'Q (Live Stream faqat dashboard'da) → "deyarli jonli" devor: kameralar yuklagan kadrlar + so'rov bilan rasm/klip. Dashboard'ni brauzer orqali tortish rad etildi (mo'rt, haydovchiga ogohlantirish chiqadi, 5 mph+ trip talab)
- Faqat `dashcamRoadFacing` (javobda `dashcamForwardFacing` ham) — salon kamerasi olinmaydi
- Kadrlar serverga yuklanadi (URL 8 soatda eskiradi, devor tez ochiladi, Samsara URL'lari yashirin)

## Ehtiyot bo'ling
- `CREDENTIALS_KEY` ni o'zgartirmang — saqlangan API kalitlar ochilmay qoladi
- Port 3900 prod, 3901 dev (boshqa loyihalar: 3410, 3600, 3700, 3800, 4000, 4410, 8090)
- Retrieval (rasm/video so'rash) oylik kvotani sarflaydi; avto-rasm default o'chiq

## Tarix
- 2026-10-11 | Claude | DESKTOP-QA8B43G | Loyiha yaratildi: Samsara API (ko'p kompaniya), kamera devori iVMS uslubida, demo rejimi, Telegram/parol kirish
- 2026-10-11 | Claude | DESKTOP-QA8B43G | Jonli rejim (ko'rinib turgan yo'ldagi traklardan har N s retrieval), latency CLI; prod qayta ishga tushirildi
- 2026-10-11 | Claude | DESKTOP-QA8B43G | Jonli rejim prod'da yoqildi (30 s): konveyer so'rovlar, kamerasiz traklar chiqarildi, kvota 90% to'xtatish; o'lchov ~35 s/kadr, 72–87 s kechikish
- 2026-10-11 | Claude | DESKTOP-QA8B43G | Xarita menyusi (ro'yxat + MapLibre + Safety Inbox videolari), haydovchilar, kunlik kvota taqsimoti, jonli 60 s/fokus 15 s
- 2026-10-11 | Claude | DESKTOP-QA8B43G | Telegram guruh mavzulariga Safety videolari (/link + toifa tugmalari), xaritada trak yo'li izi (6–72 soat)
- 2026-10-11 | Claude | DESKTOP-QA8B43G | Telegram: platformadan ulash, har trakka alohida mavzu; Safety filtrlari kengaytirildi, Kameralar sahifasida Safety paneli
