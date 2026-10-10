# SYNAPSE — promo video (RU)

**Bir jumlada:** 82 s, 1920×1080, 60 fps kinematografik motion-promo, rus tilida diktor bilan ("nerv tizimi" → "мы держим связь"); hammasi kod bilan.
**Joylashuv:** `DESKTOP-QA8B43G`: `C:\synapse\video` · Git: yo'q · Domen/URL: -
**Holat:** qoralama tayyor (diktor — vaqtinchalik bepul ovoz)
**Oxirgi yangilanish:** 2026-10-10

## Stack
- Remotion 4.0.534 (React 19, TS, @remotion/three + three.js), Python 3.14 `.venv` (numpy, scipy, pedalboard, pyloudnorm, edge-tts)
- ElevenLabs (TTS / Music / SFX) — ulanmagan, kalit kutilmoqda

## Arxitektura (qisqa)
- `script/cues.json` (zarbalar/sahnalar vaqti) + `script/lines.json` (diktor satrlari) — audio ham, video ham shulardan o'qiydi
- `tools/tts.py` diktor (`edge` | `eleven`, so'z vaqtlari bilan) → `assets/vo/<engine>/`
- `tools/dsp.py` sintez (braam, impact, riser, whoosh, yurak urishi, pianino, torli, xor), `tools/mix.py` → `public/audio/mix.wav` + `timeline.json` (−14 LUFS, −1 dBTP, nutq polosasida ducking)
- `src/scenes/` Intro, Reveal, Services, ProductsStats, Finale; `src/three/` Network (3D tarmoq), Logo3D
- `tools/eleven.py` check/voices/audition/music/sfx; `tools/stills.mjs` kadr tekshirish; `tools/analyze.py` spektrogramma; `tools/srt.py` subtitr

## Ishga tushirish
`README.md` da: tts.py → mix.py → `npx remotion render src/index.ts Promo out/... --concurrency=12 --gl=angle` (~4 daqiqa)
Kerakli `.env` kalitlari (faqat nomlari): `ELEVENLABS_API_KEY`, `ELEVEN_VOICE_ID`, `ELEVEN_MODEL`

## Hozirgi holat
- `out/synapse-promo-draft.mp4` (+ `-preview.mp4`, `synapse-promo.ru.srt`) tayyor
- Raqamlar: 32+ server, 16+ bot, 30+ kompaniya, 99,9% aptaym; yakuniy karta: synapseit.uz, +998 90 665 67 00, @synapse_bo1

## Keyingi qadamlar
- [ ] ElevenLabs kaliti → ovoz audition, foydalanuvchi tanlaydi → yakuniy diktor, mix, render
- [ ] (ixtiyoriy) ElevenLabs Music bilan orkestr musiqasi; 9:16 vertikal versiya

## Muhim qarorlar
- Server soni 32+ (foydalanuvchi talabi, 2026-10-10); saytda hali 23+ turibdi (?)
- Diktor so'zlari va ekrandagi matn so'z vaqtlari (TTS word timestamps) bo'yicha sinxron

## Ehtiyot bo'ling
- KattaBaza skrinshotining pastki qismi (foydalanuvchi ismi) kesib ko'rsatiladi (`crop: 78`)
- Network shaderlari CustomBlending (alfa 0) — AdditiveBlending qora dog' beradi

## Tarix
- 2026-10-08 | Claude | DESKTOP-QA8B43G | Loyiha yaratildi: ssenariy, sintez saundtrek, 3D sahnalar, qoralama render
- 2026-10-10 | Claude | DESKTOP-QA8B43G | Server soni 23+ → 32+ (statistika va xizmat sahnasi), qayta render
