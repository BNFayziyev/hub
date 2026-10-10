# hubweb — hub.kattabaza.uz (loyihalar hubi platformasi)

**Bir jumlada:** `C:\hub` dagi loyiha kartalarini brauzerda ko'rish/tahrirlash: AI va kompyuterlardan kelgan yozuvlar, bo'sh bo'limlarni qo'lda to'ldirish.
**Joylashuv:** `DESKTOP-QA8B43G`: `C:\hubweb` · Git: yo'q · Domen/URL: https://hub.kattabaza.uz (kattabaza Cloudflare tunnel → localhost:3800)
**Holat:** ishlayapti (prod): https://hub.kattabaza.uz → 127.0.0.1:3800, HubWeb vazifasi
**Oxirgi yangilanish:** 2026-10-10

## Stack
- Node 24, Express 5, marked (markdown). Frontend: vanilla JS (build yo'q), `public/`
- Ma'lumot bazasi yo'q — manba `C:\hub` markdown fayllari + git

## Arxitektura (qisqa)
- `server/index.js` API: `/api/state`, `/api/projects/:slug` (GET/PUT), `POST /api/projects`, `/api/files` (COMPUTERS.md, AGENTS.md, INDEX.md, README.md, shablon, prompt), `/api/activity`, `/api/commits/:sha`, `/api/sync`, `/api/vault` (barcha qaydlar + prompt bir so'rovda), `/api/report` (+`/send`), `/api/notify/test`, `/api/projects/:slug/at/:sha`, `POST /api/projects/:slug/restore`
- `server/hub.js` — karta parser (preamble `**Kalit:**` maydonlari + `## ` bo'limlar), saqlashda: sana, Tarix qatori `Men (web) | hub.kattabaza.uz`, INDEX sana/holat
- `server/git.js` — barcha git amallari bitta navbatda; saqlashdan oldin `pull --rebase --autostash`, keyin commit + push (rad etilsa pull --rebase + qayta push); har `PULL_INTERVAL_SEC` (120) da pull
- `public/app.js` — oddiy ko'rinish (loyihalar, karta, faollik, fayllar); `public/vault.js` + `vault.css` — Obsidian rejimi (`#/v/<id>`), graf (`#/v/__graph`), tez almashtirgich (Ctrl+K, `>` buyruqlar), vazifalar (`#/vazifalar`), "AI uchun nusxa"
- Havolalar: `[[slug]]` / `[[slug|matn]]` va `x.md` havolalar hub ichida ochiladi; backlink/graf — havola + slug eslatmasi (matnda loyiha nomi)
- `server/notify.js` — Telegram: har pull/tickda `lastHead`..HEAD oralig'idagi commitlar (`(web)` bilan tugaganlari hisobga olinmaydi), qo'shilgan Tarix qatorlari → xabar; dushanba 09:00 (Toshkent) haftalik hisobot; holat `DATA_DIR/notify.json`
- `public/extras.js` — Hisobot (`#/hisobot`), Kompyuterlar (`#/kompyuterlar`), versiyani qaytarish (Tarix bo'limi hozirgisicha qoladi)
- Kesh: Cloudflare js/css ga `max-age=14400` qo'yadi → index.html `no-store`, assetlar `/a/<versiya>/...` (public fayllar mtime xeshi), importlar nisbiy (`./app.js`) — bitta modul nusxasi
- PWA: `manifest.webmanifest`, ikonkalar `scripts/make-icons.js` bilan yasalgan
- `server/auth.js` — bitta parol (scrypt xesh `.env` PASSWORD_HASH), sessiya cookie 30 kun (`data/sessions.json`, xeshlangan), 15 daqiqada 5 xato urinish
- Himoya: `X-Hub: 1` sarlavhasi (CSRF), SameSite=Strict, CSP, `baseHash` bilan konflikt (409), maxfiy kalit naqshlari (Telegram token, sk-, ghp_, AKIA, private key, JWT) — 422

## Ishga tushirish
```
cd C:\hubweb && npm install
npm run set-password
powershell -ExecutionPolicy Bypass -File C:\hubweb\deploy\install-task.ps1
```
- Prod: Task Scheduler `HubWeb` (kirishda, foydalanuvchi nomidan — git push ruxsati uchun), `deploy\run.cmd` qayta yoqish sikli, log `logs\server.log`
- `.env`: HUB_DIR, HOST, PORT (3800), PASSWORD_HASH, PULL_INTERVAL_SEC, DATA_DIR, TG_BOT_TOKEN, TG_CHAT_ID (`npm run telegram-setup`), PUBLIC_URL
- Dev: `C:\hub\.claude\launch.json` → `hubweb-dev` (port 3801, hubning remote'siz nusxasi bilan; DATA_DIR=`C:\hubweb\data-dev`, dev parol shu yerda)

## Hozirgi holat
- Tayyor: kirish, loyihalar ro'yxati (filtr: to'ldirish kerak / kompyuter, qidiruv), loyiha sahifasi (maydon va bo'lim tahriri, to'liq markdown, tarix, git diff), faollik, umumiy fayllar, yangi loyiha, telefon ko'rinishi, qorong'i/yorug' mavzu
- Obsidian rejimi: fayllar daraxti + to'liq matnli qidiruv, tablar, o'qish/tahrir/yonma-yon, `[[` avtoto'ldirish, Ctrl+S, checkbox bosib vazifa belgilash, mundarija, backlinklar, chiquvchi havolalar, tarix; saqlanmagan qoralama localStorage'da (tiklash/konflikt banneri)
- Vazifalar doskasi: barcha kartalardagi `- [ ]` (Tarixdan tashqari), belgilash va qo'shish (`Keyingi qadamlar` ga, `- [ ] ?` o'rniga)
- Bosh sahifada "eskirgan" belgisi (21+ kun yangilanmagan)
- Hisobot (7/14/30 kun, AI/kompyuter kesimi, tegilmagan/eskirgan/to'ldirish kerak), Kompyuterlar sahifasi, versiyani qaytarish, Telegram xabarnoma kodi (token kiritilmagan), PWA
- Lokal nusxada sinovdan o'tdi: saqlash, konflikt 409, maxfiy kalit 422, CSRF 403, yangi karta, vault saqlash, vazifa qo'shish/belgilash

## Keyingi qadamlar
- [x] Egasi: `npm run set-password`, `install-task.ps1`
- [x] Cloudflare: Public Hostname `hub.kattabaza.uz → http://localhost:3800`
- [ ] Egasi: `npm --prefix C:\hubweb run telegram-setup` → serverni qayta ishga tushirish
- [ ] Ixtiyoriy: Cloudflare Access (faqat egasining emaili)

## Muhim qarorlar
- NSSM emas, Task Scheduler (foydalanuvchi nomidan): SYSTEM sifatida ishlasa GitHub credential'lari yo'q, git push ishlamaydi
- Alohida baza yo'q — hub markdown fayllari yagona manba, AI'lar ishlash tartibi o'zgarmaydi
- Kartani o'chirish funksiyasi ataylab yo'q

## Ehtiyot bo'ling
- Port 3800 — hubweb; 3801 — dev. Boshqa loyihalar portlari: 3410, 3600, 3700, 4000, 4410, 8090
- Textarea qatorlarni LF ga aylantiradi — solishtirishda `raw` ni `
`→`
` qiling (aks holda "saqlanmagan" doim ko'rinadi); server eski fayl EOL'ini saqlaydi
- Frontend importlari nisbiy bo'lsin (`./x.js`): absolyut `/app.js` versiyalangan `/a/<v>/app.js` bilan ikki xil modul nusxasini beradi
- Dev va prod bitta `data/` ni ishlatmasin (`DATA_DIR`) — notify.json'dagi lastHead aralashadi
- Karta formati (`**Kalit:**` va `## Bo'lim`) o'zgarsa `server/hub.js` parserini moslang

## Tarix
- 2026-10-10 | Claude | DESKTOP-QA8B43G | Loyiha yaratildi: server, interfeys, Task Scheduler skripti; lokal nusxada sinov
- 2026-10-10 | Claude | DESKTOP-QA8B43G | Obsidian rejimi (daraxt, tablar, muharrir, graf, backlinklar, [[havola]], Ctrl+K), vazifalar doskasi, AI uchun nusxa, eskirgan belgisi; prod qayta ishga tushirildi
- 2026-10-10 | Claude | DESKTOP-QA8B43G | Kesh tuzatildi (Cloudflare 4 soat — versiyalangan assetlar); Telegram xabarnoma + haftalik hisobot, Hisobot va Kompyuterlar sahifalari, versiyani qaytarish, PWA
