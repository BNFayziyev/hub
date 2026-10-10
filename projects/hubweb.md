# hubweb — hub.kattabaza.uz (loyihalar hubi platformasi)

**Bir jumlada:** `C:\hub` dagi loyiha kartalarini brauzerda ko'rish/tahrirlash: AI va kompyuterlardan kelgan yozuvlar, bo'sh bo'limlarni qo'lda to'ldirish.
**Joylashuv:** `DESKTOP-QA8B43G`: `C:\hubweb` · Git: yo'q · Domen/URL: https://hub.kattabaza.uz (kattabaza Cloudflare tunnel → localhost:3800)
**Holat:** ishlab chiqilmoqda (lokal sinovdan o'tdi, prod hali ishga tushirilmagan)
**Oxirgi yangilanish:** 2026-10-10

## Stack
- Node 24, Express 5, marked (markdown). Frontend: vanilla JS (build yo'q), `public/`
- Ma'lumot bazasi yo'q — manba `C:\hub` markdown fayllari + git

## Arxitektura (qisqa)
- `server/index.js` API: `/api/state`, `/api/projects/:slug` (GET/PUT), `POST /api/projects`, `/api/files` (COMPUTERS.md, AGENTS.md, INDEX.md, README.md, shablon, prompt), `/api/activity`, `/api/commits/:sha`, `/api/sync`
- `server/hub.js` — karta parser (preamble `**Kalit:**` maydonlari + `## ` bo'limlar), saqlashda: sana, Tarix qatori `Men (web) | hub.kattabaza.uz`, INDEX sana/holat
- `server/git.js` — barcha git amallari bitta navbatda; saqlashdan oldin `pull --rebase --autostash`, keyin commit + push (rad etilsa pull --rebase + qayta push); har `PULL_INTERVAL_SEC` (120) da pull
- `server/auth.js` — bitta parol (scrypt xesh `.env` PASSWORD_HASH), sessiya cookie 30 kun (`data/sessions.json`, xeshlangan), 15 daqiqada 5 xato urinish
- Himoya: `X-Hub: 1` sarlavhasi (CSRF), SameSite=Strict, CSP, `baseHash` bilan konflikt (409), maxfiy kalit naqshlari (Telegram token, sk-, ghp_, AKIA, private key, JWT) — 422

## Ishga tushirish
```
cd C:\hubweb && npm install
npm run set-password
powershell -ExecutionPolicy Bypass -File C:\hubweb\deploy\install-task.ps1
```
- Prod: Task Scheduler `HubWeb` (kirishda, foydalanuvchi nomidan — git push ruxsati uchun), `deploy\run.cmd` qayta yoqish sikli, log `logs\server.log`
- `.env`: HUB_DIR, HOST, PORT (3800), PASSWORD_HASH, PULL_INTERVAL_SEC
- Dev: `C:\hub\.claude\launch.json` → `hubweb-dev` (port 3801, hubning remote'siz nusxasi bilan; dev parol `C:\hubweb\data-dev\`)

## Hozirgi holat
- Tayyor: kirish, loyihalar ro'yxati (filtr: to'ldirish kerak / kompyuter, qidiruv), loyiha sahifasi (maydon va bo'lim tahriri, to'liq markdown, tarix, git diff), faollik, umumiy fayllar, yangi loyiha, telefon ko'rinishi, qorong'i/yorug' mavzu
- Lokal nusxada sinovdan o'tdi: saqlash, konflikt 409, maxfiy kalit 422, CSRF 403, yangi karta

## Keyingi qadamlar
- [ ] Egasi: `npm run set-password`, `install-task.ps1`
- [ ] Cloudflare: Public Hostname `hub.kattabaza.uz → http://localhost:3800`
- [ ] Ixtiyoriy: Cloudflare Access (faqat egasining emaili)

## Muhim qarorlar
- NSSM emas, Task Scheduler (foydalanuvchi nomidan): SYSTEM sifatida ishlasa GitHub credential'lari yo'q, git push ishlamaydi
- Alohida baza yo'q — hub markdown fayllari yagona manba, AI'lar ishlash tartibi o'zgarmaydi
- Kartani o'chirish funksiyasi ataylab yo'q

## Ehtiyot bo'ling
- Port 3800 — hubweb; 3801 — dev. Boshqa loyihalar portlari: 3410, 3600, 3700, 4000, 4410, 8090
- Karta formati (`**Kalit:**` va `## Bo'lim`) o'zgarsa `server/hub.js` parserini moslang

## Tarix
- 2026-10-10 | Claude | DESKTOP-QA8B43G | Loyiha yaratildi: server, interfeys, Task Scheduler skripti; lokal nusxada sinov
