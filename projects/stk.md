# stk — Telegram stiker/emoji boti

**Bir jumlada:** Foydalanuvchi rasm/video/GIF/stiker/matn yuboradi -> statik, video, animatsiyali (TGS) stiker yoki custom emoji (premium) to'plamiga qo'shiladi; matndan AI (Claude) SVG/Lottie chizadi. Bo1AI `/stiker` orqali ham chaqiradi.
**Joylashuv:** `DESKTOP-QA8B43G`: `C:\stk` · Git: yo'q
**Holat:** bot ishlayapti (@emoji_AIbot, `run.bat`, fon rejimi/avtostart yo'q); AI ishlayapti (Bo1AI tokeni ko'chirildi)
**Oxirgi yangilanish:** 2026-10-16

## Stack
- Python 3.14 (.venv), python-telegram-bot 22, Pillow, imageio-ffmpeg (ffmpeg, VP9), resvg-py (SVG->PNG), rlottie-python (TGS tekshiruv), aiohttp, SQLite `data\stk.db`

## Arxitektura
- `stk/bot.py` (interfeys, tugmalar), `maker.py` (job->baytlar), `media.py` (webp/webm/tgs), `ai.py` (Claude: SVG statik, Lottie animatsiya, xatoda qayta urinish), `claude.py` (claude -p, Bo1AI'dagidek), `sets.py` (to'plam nomi `u<id>_<kod><n>_by_<bot>`, sarlavha `... @<bot>`), `api.py` (127.0.0.1:8765 `/make`)
- Alohida to'plam har tur uchun: static, video, animated, emoji_static/video/animated

## Ishga tushirish
- `run.bat` (`python -m stk`). `.env`: BOT_TOKEN, ADMIN_ID, CLAUDE_CODE_OAUTH_TOKEN, AI_DAILY_LIMIT (oddiy user, admin cheksiz), API_PORT

## Bo1AI bilan bog'lanish
- `C:\bo1ai\bo1ai\control.py` ga `/stiker [anim] [emoji] tavsif` qo'shildi (backup: `C:\bo1ai\backup\2026-10-16_stiker`). Bo1AI qayta ishga tushirilgandan keyin ishlaydi. Natija stiker botidan adminga boradi.

## Ehtiyot bo'ling
- Premium effektli stikerlarni bot yarata olmaydi. Custom emoji to'plam uchun egasida Premium kerak bo'lishi mumkin (Telegram xatosi foydalanuvchiga ko'rsatiladi)
- Claude tokeni Bo1AI va synapse_instagram bilan umumiy (`C:\stk\.env` da ham) — token yangilansa bu yerda ham yangilang; umumiy obuna limitini yeydi

## Tarix
- 2026-10-16 | Claude | DESKTOP-QA8B43G | `tmp/term4.py`: synapseit.uz 3D logotipi (3 bo'lak S, orbitalar; LOGO_PIECES dan ray-cast) va `neofetch` stikerlari belgilardan; adminga yuborildi
- 2026-10-16 | Claude | DESKTOP-QA8B43G | Qo'lda chizilgan video stikerlar (`C:\stk	mp	erm3.py globe|logo`): yarim shaffof macOS terminal `synapse@IT`, belgilardan yashil globus va 3D aylanuvchi Synapse logo; adminga yuborildi
- 2026-10-16 | Claude | DESKTOP-QA8B43G | AI jonli sinov (API orqali): statik SVG ~16 s, animatsiyali Lottie ~3.5 daq, ikkalasi birinchi urinishda qabul qilindi
- 2026-10-16 | Claude | DESKTOP-QA8B43G | Jonli sinov: statik/video/TGS va emoji statik/TGS to'plamlari Telegramda yaratildi (adminda `Sinov` to'plamlari qoldi); sarlavhada bot nik asl registrda
- 2026-10-16 | Claude | DESKTOP-QA8B43G | Loyiha yaratildi: bot, media konvertatsiya (ffmpeg/Pillow sinovdan o'tdi), AI (soxta javob bilan sinaldi), Bo1AI /stiker
