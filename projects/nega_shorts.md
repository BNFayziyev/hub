# Nega? — ilmiy shorts (Instagram Reels + YouTube Shorts)

**Bir jumlada:** "Nega bunday, unday emas?" / "Agar ... bo'lganida-chi?" formatidagi ilmiy-ommabop vertikal (1080×1920, 60 fps) videolar, o'zbekcha diktor (Firdavs Urinov, AishaAI), hammasi kod bilan (Remotion).
**Joylashuv:** `DESKTOP-QA8B43G`: `C:\nega` · Git: yo'q · Domen/URL: -
**Holat:** 1-mavzu "Tish" — hook 3D versiyasi render qilindi (`out/tish-hook-3d.mp4`), ko'rib chiqilmoqda
**Oxirgi yangilanish:** 2026-10-11

## Stack
- `C:\motion` (opus_video) pipeline nusxasi: Remotion 4.0.534, `node_modules` nusxa
- Python: `C:\synapse\video\.venv`; TTS: VoiceLab (`tools/tts.py`), sintez saundtrek (`tools/dsp.py`, `tools/mix.py`)

## Arxitektura (qisqa)
- `script/lines.json` + `script/cues.json` -> `tools/tts.py` -> `tools/mix.py` -> `public/audio/mix.wav` + `timeline.json`
- 3D (three.js + @remotion/three): `src/three/geo.ts` (protsedural odam tishlari toj+ildiz, milk, akula tishi/jag'i), `HumanJaw.tsx`, `SharkJaw.tsx`, `common.tsx` (PMREM muhit, kamera Rig, rentgen fresnel shader)
- `src/scenes/Shark.tsx` (3D akula jag'i, tish konveyeri, hisoblagich), `Human.tsx` (3D tish ravog'i, qimirlab tushish, rentgen), `Nega.tsx` (NEGA? + ∞ vs 2 panellar), `components/Captions.tsx` (kinetik subtitr)
- Uslub: qorong'i laboratoriya, moviy #3fe6ff + qizil #ff3346 + suyak oqi; Unbounded + JetBrains Mono

## Ishga tushirish
```
C:\synapse\video\.venv\Scripts\python tools\tts.py
cd tools; C:\synapse\video\.venv\Scripts\python mix.py
npx remotion render src/index.ts Tish out/tish-hook.mp4 --concurrency=12 --gl=angle
node tools/stills.mjs 1 4.6 9.3   # kadr tekshirish
```
`.env` kalitlari (faqat nomlari): `AISHA_API_KEY`, `VOICELAB_VOICE`, `VOICELAB_MODEL`

## Muhim qarorlar (foydalanuvchi)
- Asosiy talab: video boshidan oxirigacha ushlab tursin (retention)
- Hozircha kanal nomi/handle yo'q
- Ovoz: Firdavs Urinov — tasdiqlandi
- Tishlar 3D bo'lsin (2D SVG versiyasi rad etildi)
- Qismlab ishlash: avval hook, tasdiqdan keyin davomi
- Mavzular ro'yxati: g'ildirak, muz suzishi, qon rangi, tishlar (tanlangan), azot, Oy, regeneratsiya, og'riq, katta Yer, Oysiz Yer, sekin yorug'lik, uyqusiz

## Keyingi qadamlar
- [ ] Hook bo'yicha izohlar
- [ ] Tish videosining davomi: akula siri, burilish, chaynash, nega 2 ta, fil, Yaponiya USAG-1

## Tarix
- 2026-10-11 | Claude | DESKTOP-QA8B43G | Hook 3D ga o'tkazildi (protsedural tishlar, rentgen shader)
- 2026-10-11 | Claude | DESKTOP-QA8B43G | Loyiha yaratildi, "Tish" ssenariysi, hook render `out/tish-hook.mp4`
