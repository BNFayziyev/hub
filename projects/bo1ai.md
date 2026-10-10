# bo1ai — Telegram yordamchi (2-ishchi)

**Bir jumlada:** 2-Telegram akkaunt orqali mijoz chatlarini kuzatib, egasiga 3-4 javob varianti taklif qiladi; tanlanmaguncha o'zi yozmaydi, uslubni o'rganadi; xodimlar statistikasi va ertalabki eslatma.
**Joylashuv:** `DESKTOP-QA8B43G`: `C:\bo1ai` · Git: yo'q (o'zgartirishdan oldin `backup\<sana>_...` ga nusxa) · Domen/URL: -
**Holat:** ishlayapti (prod, ~53 mijoz guruhi), fon rejimida
**Oxirgi yangilanish:** 2026-10-10

## Stack
- Python 3.14 (.venv, requirements.txt): Telethon userbot (2-akkaunt "Bobirjon") + boshqaruv boti, Claude (`claude -p` headless, asboblarsiz, CLAUDE_CODE_OAUTH_TOKEN — obuna), faster-whisper (ovoz), matplotlib (grafik), tzdata, SQLite `data\bo1ai.db`

## Arxitektura (qisqa)
- `bo1ai/`: `app.py` (ishga tushirish, scheduler, heartbeat), `userbot.py`, `control.py` (bot buyruqlari, kartalar), `engine.py` (murojaat sikli, eslatmalar, limit navbati), `brain.py` (Claude promptlari), `claude_cli.py` (limit "resets" vaqtini o'qiydi), `staffing.py` (kim hal qiladi), `stats.py`/`charts.py`/`dashboard.py`/`daily.py` (statistika, 07:00 eslatma, 18:30 hisobot so'rovi), `learner.py` (23:00 o'rganish), `anydesk.py`/`vm.py` (VirtualBox VM orqali AnyDesk)
- `bilim/` — o'rganganlari (ochiq md), `statistika.html` — panel (15 daqiqada yangilanadi)
- `fon.pyw` — oynasiz ishga tushiruvchi (20 s da qayta yoqadi); `nazoratchi.pyw` — watchdog

## Ishga tushirish
- Task Scheduler: "bo1ai yordamchi" (logonda, `pythonw fon.pyw`), "bo1ai nazoratchi" (har 5 daq), "bo1ai VM"
- Kod o'zgarsa: `-m bo1ai` python jarayonlarini o'ldirish — fon.pyw 20 soniyada qayta yoqadi
- `toxtat.bat` — to'xtatish (data\pauza, nazoratchi tegmaydi); `run.bat` — oynada ishga tushirish
- `login.bat`, `claude-token.bat`, `test-claude.bat`, `vm-start.bat`
- .env kalitlari: TG_API_ID, TG_API_HASH, BOT_TOKEN, CLAUDE_CODE_OAUTH_TOKEN, MORNING_TIME, REPORT_TIME (ixtiyoriy)
- Jurnallar: `logs\bo1ai.log`, `logs\fon.log`, `logs\nazoratchi.log`

## Hozirgi holat
- Mijoz yozsa: egaga karta (variantlar + mas'ul xodim); IT guruhga 2–30 daq ichida (vaqtni Claude hal qiladi) mas'ulni @ belgilab; egaga 10 daq; 15 daq — mijozga avto kutish javobi
- Statistika: /statistika, /panel, /hisobotlar, /ertalab; 07:00 IT guruhga ertalabki eslatma, 18:30 kunlik hisobot so'rovi (reply)
- Claude limiti: "resets ..." vaqtigacha kutadi, keyin javobsiz murojaatlarni darhol qayta tayyorlaydi
- Nazoratchi: to'xtasa/qotsa qayta yoqadi va yurak urishi (`data\heartbeat.json`) bilan tekshiradi, egaga xabar beradi

## Keyingi qadamlar
- [ ] O'chiq paytdagi javobsiz chatlarni qayta yoqilganda tekshirish
- [ ] Murojaatni xodimga biriktirish tugmasi, va'dalarni kuzatish
- [ ] Takrorlanuvchi muammolar, mijozga oylik PDF hisobot
- [ ] 2026-10-09 15:08–15:42 yordamchi qayta-qayta yiqilgan, sababi noma'lum (endi `logs\fon.log` ga yoziladi)

## Muhim qarorlar
- Mijozga hech narsa egasi tasdiqlamasdan yozilmaydi (yagona istisno — 15 daq kutish javobi); bot yozgani monospace
- Xodim buyrug'i ham faqat ega tasdiqlagach; IT guruhdagi hisobot reply'lari tasdiqqa bormaydi
- Owner ID va IT guruh ID kodda qat'iy (`config.py`)

## Ehtiyot bo'ling
- `.env` da maxfiy kalitlar — hubga yozilmaydi. VM paroli `vm\vm-credentials.txt`
- Vaqtlar kompyuter soati (America/New_York); mijozlar asosan 07–18 da yozadi
- Claude obuna limiti tez tugaydi — keraksiz sinov chaqiruvlaridan saqlaning
- Windows yangilanishi kompyuterni qayta yuklaydi — avtomatik ishga tushish logonga bog'liq

## Tarix
- 2026-10-08 | Claude | DESKTOP-QA8B43G | Karta yaratildi (README/package.json asosida, chuqur tahlil qilinmagan)
- 2026-10-10 | Claude | DESKTOP-QA8B43G | Statistika/eslatma/hisobot, aqlli IT-guruh eskalatsiyasi, nazoratchi, fon rejimi, Claude limitini reset vaqtigacha kutish; karta to'ldirildi
