# stk — Telegram stiker/emoji boti

**Bir jumlada:** Foydalanuvchi rasm/video/GIF/stiker/matn yuboradi -> statik, video, animatsiyali (TGS) stiker yoki custom emoji (premium) to'plamiga qo'shiladi; matndan AI (Claude) SVG/Lottie chizadi. Bo1AI `/stiker` orqali ham chaqiradi.
**Joylashuv:** `DESKTOP-QA8B43G`: `C:\stk` · Git: yo'q
**Holat:** kod tayyor, token kutilmoqda (BOT_TOKEN, ADMIN_ID, CLAUDE_CODE_OAUTH_TOKEN `.env` ga yozilishi kerak); jonli sinov qilinmagan
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
- Claude tokeni Bo1AI/synapse_instagram bilan umumiy obuna limitini yeydi

## Tarix
- 2026-10-16 | Claude | DESKTOP-QA8B43G | Loyiha yaratildi: bot, media konvertatsiya (ffmpeg/Pillow sinovdan o'tdi), AI (soxta javob bilan sinaldi), Bo1AI /stiker
