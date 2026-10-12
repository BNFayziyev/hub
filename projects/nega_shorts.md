# Nega? — ilmiy shorts (Instagram Reels + YouTube Shorts)

**Bir jumlada:** "Nega bunday, unday emas?" / "Agar ... bo'lganida-chi?" formatidagi ilmiy-ommabop vertikal (1080×1920, 60 fps) videolar, o'zbekcha diktor (Firdavs Urinov, AishaAI), hammasi kod bilan (Remotion).
**Joylashuv:** `DESKTOP-QA8B43G`: `C:\nega` · Git: yo'q · Domen/URL: -
**Holat:** 1-mavzu "Tish" — to'liq video (~105 s) render qilindi `out/tish-full.mp4`; VoiceLab kredit tugagani uchun f3, g1, g2 satrlari hozircha jim o'rinbosar
**Oxirgi yangilanish:** 2026-10-11

## Stack
- `C:\motion` (opus_video) pipeline nusxasi: Remotion 4.0.534, `node_modules` nusxa
- Python: `C:\synapse\video\.venv`; TTS: VoiceLab (`tools/tts.py`), sintez saundtrek (`tools/dsp.py`, `tools/mix.py`)

## Arxitektura (qisqa)
- `script/lines.json` + `script/cues.json` -> `tools/tts.py` -> `tools/mix.py` -> `public/audio/mix.wav` + `timeline.json`
- 3D (three.js + @remotion/three): `src/three/geo.ts` (protsedural odam tishlari toj+ildiz, milk, akula tishi/jag'i), `HumanJaw.tsx`, `SharkJaw.tsx`, `common.tsx` (PMREM muhit, kamera Rig, rentgen fresnel shader)
- `tools/layout.py` — diktor iboralarini ketma-ket joylab, barcha sahna hodisalarini so'zlarga bog'laydi (cues.json qo'lda yozilmaydi)
- `src/scenes/Body.tsx` (Siri, Bite, Chew, Twice, Fil, Future, Outro), `src/three/Extra.tsx` (akula jag'i kesimi, fil tishlari, muz), `components/Ui.tsx`
- `src/scenes/Shark.tsx` (3D akula jag'i, tish konveyeri, hisoblagich), `Human.tsx` (3D tish ravog'i, qimirlab tushish, rentgen), `Nega.tsx` (NEGA? + ∞ vs 2 panellar), `components/Captions.tsx` (kinetik subtitr)
- Uslub: qorong'i laboratoriya, moviy #3fe6ff + qizil #ff3346 + suyak oqi; Unbounded + JetBrains Mono

## Ishga tushirish
```
C:\synapse\video\.venv\Scripts\python tools\tts.py --tag v2 --tempo 1.07   # (--offline: yo'q satrlarga o'rinbosar)
C:\synapse\video\.venv\Scripts\python tools\layout.py                      # cues.json: vaqtlar so'zlarga bog'lanadi
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
- Nutq tabiiy bo'lsin, oshirib yuborilmasin
- Tishlar 3D bo'lsin (2D SVG versiyasi rad etildi)
- Qismlab ishlash: avval hook, tasdiqdan keyin davomi
- Mavzular ro'yxati: g'ildirak, muz suzishi, qon rangi, tishlar (tanlangan), azot, Oy, regeneratsiya, og'riq, katta Yer, Oysiz Yer, sekin yorug'lik, uyqusiz

## Keyingi qadamlar
- [ ] VoiceLab kreditini to'ldirib: `tts.py --tag v2 --tempo 1.07 --only f3 g1 g2`, keyin layout.py, mix.py, render
- [ ] To'liq video bo'yicha izohlar

## Tarix
- 2026-10-11 | Claude | DESKTOP-QA8B43G | To'liq video: nutq tabiiylashtirildi (tempo 1.07, yengil VO zanjiri), 7 ta yangi 3D sahna, avtomatik vaqt jadvali
- 2026-10-11 | Claude | DESKTOP-QA8B43G | Hook 3D ga o'tkazildi (protsedural tishlar, rentgen shader)
- 2026-10-11 | Claude | DESKTOP-QA8B43G | Loyiha yaratildi, "Tish" ssenariysi, hook render `out/tish-hook.mp4`
