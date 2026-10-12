# Hub

**Bir jumlada:** Bir nechta AI va kompyuter uchun loyiha xotirasi va vazifa muvofiqlashtirish.
**Joylashuv:** `DESKTOP-QA8B43G`: `C:\hub` (HubWeb); AIlar alohida clone · Git: https://github.com/BNFayziyev/hub · Domen/URL: https://hub.kattabaza.uz
**Holat:** hamkorlik protokoli tayyor; barcha kompyuterlarga joriy etish kerak
**Oxirgi yangilanish:** 2026-10-12

## Stack
- Markdown, Python 3.10+ standard library, Git, PowerShell installer.

## Arxitektura (qisqa)
- AGENTS.md umumiy qoidalar; COORDINATION.md amaliy buyruqlar.
- tools/hub.py: status, claim, block, cancel, finish, sync, validate.
- hub-coordination branch/state.json: vazifalar va egalar; main'ga merge qilinmaydi.
- Remote fast-forward push orqali bir loyiha/resurs uchun bitta faol egasi.
- setup/install-ai.ps1: loyiha AGENTS/CLAUDE/GEMINI fayllariga Hub havolasi.

## Ishga tushirish
```
python tools/hub.py status
python tools/hub.py validate
python -m unittest discover -s tools -p test_hub.py -v
```
GitHub yozish huquqi kerak. Maxfiy kalitlar Hubda saqlanmaydi.

## Hozirgi holat
- Vazifa egallash, egani tekshirish, bloklash/bekor qilish/yakunlash va topshirish maydonlari.
- Karta/INDEX tekshiruvi; aniq fayllarni commit qilish; har sessiyaga alohida clone qoidasi.
- Ikki raqib claim, owner, blok, qayta egallash, umumiy papka va remote xatosi sinovlari.
- DESKTOP-QA8B43G lokal nusxasi va HubWeb server kodi ushbu sessiyaga ulanmagan.

## Keyingi qadamlar
- [ ] DESKTOP-QA8B43G va boshqa PC larda yangi qoidalarni olib, eski AI sessiyalariga o'qitish.
- [ ] Eski global Claude qoidalarini yangi protokolga moslash; project installer ishlatish.
- [ ] HubWeb saqlash/restore oqimiga claim protokolini ulash; faol vazifalarni ko'rsatish.
- [ ] Qolgan kompyuter nomlari, kod yo'llari va remote manzillarini tekshirib to'ldirish.
- [ ] Remote'siz muhim loyihalarni alohida private repositoriylarga chiqarish.

## Muhim qarorlar
- Qulf avtomatik eskirmaydi; egasi yoki foydalanuvchi tasdiqlagan topshirish kerak.
- Owner avtorizatsiya o'rnini bosmaydi; GitHub repo ruxsatlari xavfsizlik chegarasi.
- GitHub push, lokal yangilash va prodga o'rnatish alohida holatlar.

## Ehtiyot bo'ling
- Eski AIlar va HubWeb yangi protokolni chetlab o'tishi mumkin; o'tish davrida faol kartani webdan tahrirlamang.
- Kartadagi faktlar kod bilan tekshiriladi; validator prodning ishlashini tasdiqlamaydi.

## Tarix
- 2026-10-12 | Codex | WIN-6V7C5DQJNII | Hub hamkorlik protokoli, koordinatsiya CLI, validator, installer va konflikt sinovlari yaratildi.
