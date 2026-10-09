# BotChat — Telegram botlari uchun messenjer (Mini App)

**Bir jumlada:** Telegram orqali kiriladi, @BotFather tokenlari qo'shiladi va botlar Telegram Plus'dagidek ishlatiladi (xabarlarni o'qish, bot nomidan javob); botlar soni cheklanmagan.
**Joylashuv:** `DESKTOP-QA8B43G`: `C:\botchat` · Git: yo'q · Domen/URL: https://bot.kattabaza.uz (kattabaza Cloudflare tunnel → localhost:3700)
**Holat:** ishlab chiqilmoqda (lokal sinovdan o'tdi, prod hali ishga tushirilmagan)
**Oxirgi yangilanish:** 2026-10-09

## Stack
- Express 5 + `node:sqlite` (data/app.db) + React 19/Vite 8 (lucide-react). Node 24.
- Telegram Bot API, webhook rejimi; real vaqt SSE

## Arxitektura (qisqa)
- `server/`: `index.js` (API, webhooklar, media proksi), `bots.js` (ulash/uzish, webhook tekshiruv, update qayta ishlash), `messages.js` (Message → baza, API ko'rinishi), `mainbot.js` (platforma boti: login, menyu tugmasi), `crypto.js` (token AES-GCM, initData), `events.js` (SSE), `tg.js`
- `web/src/`: `App.jsx` (holat, SSE, mobil/kompyuter joylashuvi), `BotRail`/`BotsHome`, `ChatList`, `ChatView`, `Message`, `AddBot`, `BotSettings`
- Har bot: webhook `PUBLIC_URL/hook/b/<botId>` + tasodifiy secret_token. Bot bir nechta foydalanuvchiga tegishli bo'lishi mumkin (`bot_members`; token = huquq)
- "Barcha chatlar" — hamma botlar chatlari bitta ro'yxatda; ommaviy xabar (broadcast) bot sozlamalarida
- Kirish: Mini App initData (MAIN_BOT_TOKEN bilan tekshiriladi) yoki brauzerda `t.me/<asosiy bot>?start=login_<kod>` + polling

## Ishga tushirish
```
npm install
npm run dev     # mock Telegram 3799 + server 3701 + vite 3710 (data-dev/, .env o'qilmaydi)
npm run build
powershell -ExecutionPolicy Bypass -File C:\botchat\deploy\install-windows-service.ps1   # Admin: NSSM xizmati "BotChat", port 3700
```
`.env` kalitlari: MAIN_BOT_TOKEN, PUBLIC_URL, PORT, (ixtiyoriy) SECRET_KEY. Preview: `C:\link\.claude\launch.json` → `botchat-dev`.

## Hozirgi holat
- Tayyor: bot ulash (boshqa webhook bo'lsa ogohlantirish), matn/rasm/video/ovoz/fayl/stiker/joylashuv/kontakt ko'rish, matn+fayl yuborish, javob (reply), tahrirlash, o'chirish, inline tugmalar ko'rinishi, tugma bosilishi (callback) chatda ko'rinadi, bloklaganlar belgisi, guruhlar, qidiruv, broadcast, Telegram temasi
- Lokal sinov mock API bilan o'tdi (kompyuter + mobil)

## Keyingi qadamlar
- [ ] Egasi: asosiy bot yaratib `.env` MAIN_BOT_TOKEN yozishi
- [ ] Admin PowerShell'da xizmatni o'rnatish; Cloudflare'da `bot.kattabaza.uz → http://localhost:3700`
- [ ] Kunlik zaxira (data/app.db + data/secret.key) — Task Scheduler
- [ ] G'oyalar: tayyor javoblar (shablonlar), jamoa a'zolarini taklif qilish, Web Push

## Muhim qarorlar
- Polling emas webhook — cheksiz botga bitta server yetadi
- Bot API eski tarixni bermaydi → yozishma ulangan paytdan saqlanadi; bot boshqa dasturda yuborgan xabarlar ko'rinmaydi
- Callback'larga avtomatik answerCallbackQuery qilinadi (tugma "aylanib" qolmasligi uchun)
- Oxirgi a'zo botni uzsa: deleteWebhook + shu botning barcha ma'lumotlari o'chiriladi

## Ehtiyot bo'ling
- Bot ulanishi uning webhookini egallaydi — bot o'z kodida ishlayotgan bo'lsa, u to'xtaydi (UI ogohlantiradi)
- `data/secret.key` yo'qolsa tokenlarni ochib bo'lmaydi — zaxiraga albatta qo'shing
- Dev rejim haqiqiy Telegramga ulanmaydi (mock) — prod webhooklarni buzmaslik uchun shunday qoldiring
- Port 4000/3600/3410/4410 boshqa loyihalarniki; BotChat: 3700 prod, 3701/3710/3799 dev

## Tarix
- 2026-10-09 | Claude | DESKTOP-QA8B43G | Loyiha yaratildi: server, Mini App UI, mock Telegram, NSSM skripti; lokal sinov