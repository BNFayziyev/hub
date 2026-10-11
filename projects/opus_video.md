# Opus 5.5 — motion video (UZ)

**Bir jumlada:** Claude Opus 5.5 video qilishini ko'rsatadigan ~85 s, 1920×1080, 60 fps kinetik motion video (o'zbekcha diktor — Firdavs Urinov, AishaAI); hammasi kod bilan. Namuna: instagram.com/reel/DeL-m8QIIiN (faqat uslub).
**Joylashuv:** `DESKTOP-QA8B43G`: `C:\motion` · Git: yo'q · Domen/URL: -
**Holat:** 1-qism (hook + reveal, 21 s) tayyor, foydalanuvchi ko'rib chiqmoqda
**Oxirgi yangilanish:** 2026-10-11

## Stack
- Remotion 4.0.534 (React 19, TS), `node_modules` `C:\synapse\video` dan nusxa
- Python: `C:\synapse\video\.venv` (numpy, scipy, pedalboard, pyloudnorm, soundfile, PIL) — alohida venv yo'q
- VoiceLab TTS (AishaAI, `api.voicelab.uz/v1/tts`, model lison), ovoz Firdavs Urinov `voice_OBuMpAaB5iYCUZS0eCc9Fj3k`

## Arxitektura (qisqa)
- `script/lines.json` (diktor satrlari, `say` — talaffuz, `...` — iboralarga bo'lish, `separate`) + `script/cues.json` (barcha zarba/sahna vaqtlari) — audio ham video ham shulardan o'qiydi
- `tools/tts.py` → `assets/vo/firdavs/<id>.<k>.wav` + manifest; `tools/dsp.py` (sintez, synapse'dan) + `tools/mix.py` → `public/audio/mix.wav` + `timeline.json` (−14 LUFS, −1 dBTP)
- `src/scenes/Hook.tsx` (streak, BU VIDEONI/HECH KIM/MONTAJ QILMAGAN, ikonkalar man qilinadi, CRT o'chishi, kino kadri), `Tension.tsx` (yurak urishi, pleyer chizig'i, warp, glitch), `Reveal.tsx` (nafas, zarrachalar → CLAUDE OPUS, 5.5 ekstruziya)
- `tools/stills.mjs` + `tools/sheet.py` — kadr tekshirish

## Ishga tushirish
```
C:\synapse\video\.venv\Scripts\python tools\tts.py          # yangi satrlar
cd tools; ..\..\synapse\video\.venv\Scripts\python mix.py    # saundtrek
npx remotion render src/index.ts Opus out/opus-part1.mp4 --concurrency=12 --gl=angle   # ~95 s
```
Kerakli `.env` kalitlari (faqat nomlari): `AISHA_API_KEY`, `VOICELAB_VOICE`, `VOICELAB_MODEL`

## Muhim qarorlar (foydalanuvchi)
- Asosiy rang **#f76400** (binafsha emas), gorizontal 16:9
- Oxirida faqat Instagram: **BobirjonFayziyev**; "montajchilar kerakmi?" savoli yo'q
- Foydalanuvchining asl xabari ko'rsatilmaydi — namunali xabar: "Claude Opus 5.5 haqida 90 soniyalik video qil: qora fon, to'q sariq neon, kinetik yozuvlar, 3D logo va o'zbekcha diktor bo'lsin."
- Limitni tejash uchun qismlab: avval 1-qism, tasdiqdan keyin davomi

## Keyingi qadamlar
- [ ] Foydalanuvchi izohlari bo'yicha 1-qismni tuzatish
- [ ] 2-qism: chat oynasi (namunali xabar), savol/namuna/ssenariy, kod+preview, 60 fps, ovoz, ilgari/hozir, rekursiya, yakun (Instagram)

## Ehtiyot bo'ling
- PowerShell 5 `Get-Content/Set-Content` UTF-8 fayllarni buzadi (BOM, tire) — `[IO.File]::WriteAllText` yoki Edit ishlating; JSON lar `utf-8-sig` bilan o'qiladi
- VoiceLab "..." da pauza qilmaydi — aniq bo'linish kerak bo'lsa satrga `"separate": true`

## Tarix
- 2026-10-11 | Claude | DESKTOP-QA8B43G | Loyiha yaratildi: ssenariy, Firdavs Urinov ovozi, sintez saundtrek, 1-qism (0–21 s) render `out/opus-part1.mp4`
