# PTI — reys oldi ko'rigi boti (pti.kattabaza.uz)

**Bir jumlada:** Amerika logistika kompaniyalari uchun: haydovchi guruhida "PTI" so'zi yozilsa bot Mini App tugmasini beradi, haydovchi 12 ta shablon rasmni oladi, bot PDF hisobot yasab haydovchi guruhiga va asosiy (mavzuli) guruhdagi haydovchi mavzusiga tashlaydi; sayt: tarix, chek-list muharriri, admin panel.
**Joylashuv:** `DESKTOP-QA8B43G`: `C:\pti` · Git: yo'q · Domen/URL: https://pti.kattabaza.uz (Cloudflare tunnel → localhost:3950, hali ulanmagan)
**Holat:** kod tayyor va lokal sinovdan o'tdi (49 ta e2e tekshiruv, soxta Telegram bilan); prod'ga chiqarilmagan — bot tokeni va domen kutilmoqda
**Oxirgi yangilanish:** 2026-10-24

## Stack
- Node 24 (`.ts` to'g'ridan-to'g'ri), Fastify 5, SQLite `node:sqlite`, grammY (polling), sharp (rasm), pdf-lib + fontkit (PDF, DejaVu shrift)
- React 18 + Vite 6 (bitta bundle: sayt, haydovchi Mini App, ommaviy hisobot), glass/orange uslub, light/dark, uz/ru/en (`web/src/lang-*.ts`)

## Arxitektura (qisqa)
- Ko'p kompaniya, bitta bot. Botga `/start` bergan har kim o'z kompaniyasini oladi. Botni guruhga qo'shgan odamning kompaniyasiga guruh avtomatik ulanadi (`my_chat_member`); forum (mavzuli) guruh = asosiy guruh, oddiy guruh = haydovchi guruhi (1 guruh = 1 haydovchi). `/connect` — qo'lda ulash.
- Kalit so'z (`companies.keyword`, sukut `pti`, butun so'z) faqat haydovchi guruhida ishlaydi → `requests` (token) → tugma: `t.me/<bot>/<MINIAPP_SHORT>?startapp=q_<token>` yoki `PUBLIC_URL/m/<token>`
- Haydovchi oqimi `/api/m/:token/*` (token = kalit, sessiyasiz): start → qadam rasmlari (PUT, sharp bilan qayta kodlanadi) → submit → PDF → `bot/notify.ts` guruhga + mavzuga yuboradi. Hisobot: `/r/<public_token>`
- Chek-list kompaniyaga tegishli (`checklist_steps`), tekshiruvga nusxalanadi (eski hisobotlar o'zgarmaydi). 12 ta standart qadam + `web/public/examples/*.svg`
- Kirish: bot orqali (`/start login_<nonce>`), Mini App initData, yoki `ADMIN_PASSWORD` (platforma egasi). Platforma egasi: `TELEGRAM_ADMIN_IDS` (1232455326) → "Administration" (kompaniyalar, foydalanuvchilar, guruhlarni ko'chirish)
- Jadval: `bot/scheduler.ts` (har 30 s), saqlash muddati tozalash kuniga bir marta

## Ishga tushirish
```
npm install; npm run build:web; npm start                  # :3950
powershell -ExecutionPolicy Bypass -File C:\pti\scripts\install-task.ps1   # Task "PtiBot"
sh scripts/test-e2e.sh        # soxta Telegram + 49 tekshiruv
sh scripts/dev-demo.sh        # demo: http://localhost:3951 (parol demo-pass)
```
`.env` kalitlari: PORT, HOST, PUBLIC_URL, SECRET_KEY, ADMIN_PASSWORD, TELEGRAM_ADMIN_IDS, TELEGRAM_BOT_TOKEN, MINIAPP_SHORT, (PHOTO_MAX_MB, REQUEST_TTL_HOURS, DATA_DIR, TELEGRAM_API_ROOT — faqat test)

## Hozirgi holat
- Tayyor: bot (guruh ulash, kalit so'z, so'rov, natija, mavzular, jadval), haydovchi Mini App (12 qadam, kamera, vaqt belgisi, lokatsiya ixtiyoriy, All good/Problem), PDF, ommaviy hisobot, sayt (obzor, tarix, haydovchilar, guruhlar, chek-list, jadval, jamoa, sozlamalar, jurnal, administratsiya), ru/uz tarjimalar to'liq
- Tekshirilgan: e2e (mock), brauzerda desktop va mobil ko'rinish; haqiqiy Telegram bilan sinalmagan

## Keyingi qadamlar
- [ ] Egasi: @BotFather'da bot yaratib tokenni `.env` ga yozishi; `/setprivacy` Disable, `/newapp` (MINIAPP_SHORT), `/setmenubutton`
- [ ] Cloudflare'da `pti.kattabaza.uz → http://localhost:3950`; keyin `install-task.ps1`
- [ ] Haqiqiy Telegramda sinov (guruh qo'shish, mavzu, kamera iOS/Android)
- [ ] Video rejimi (hozir "Coming soon", bazada `media` ustuni tayyor)
- [ ] 7–8 qadam nomi video asosida taxminiy ("Left trailer tires"); kompaniya o'zi tahrirlaydi

## Muhim qarorlar
- Haydovchi sahifasi hisob yaratmaydi: havola = kalit (24 soat). Bot guruhda "PTI" ko'rishi uchun admin bo'lishi yoki privacy o'chirilishi shart
- Asosiy guruhda PTI so'ralmaydi; so'rov faqat haydovchi guruhida (shu haydovchiga tegishli)
- Rasm faqat kamera (`capture`), vaqt belgisi canvas'da; PDF inglizcha, ilova tili sozlanadi (sukut inglizcha)
- Raqobatchi/namuna: RaiseDash (@raisedashbot) videosi — oqim shunga o'xshash, lekin PDF, mavzular, sayt tarixi bizda qo'shimcha

## Ehtiyot bo'ling
- `SECRET_KEY` o'zgarsa hamma tizimdan chiqadi. `.env` hubga yozilmaydi.
- Port 3950 prod, 3951 test (`data-test/`), 3999 soxta Telegram
- Windows'da test jarayonlarini to'xtatish: `node.exe` ichida `server\src\index.ts` / `mock-telegram`

## Tarix
- 2026-10-24 | Claude | DESKTOP-QA8B43G | Loyiha noldan yaratildi: bot, Mini App, PDF, sayt, admin, tarjimalar, e2e testlar, README
