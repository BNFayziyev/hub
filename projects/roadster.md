# Roadster — havo bilan sakraydigan mashina (UZ reel, 9:16, 3D)

**Bir jumla:** "The Unseen How" reelining (Tesla Roadster sovuq gazli dvigatellar bilan 5 ta Tesla ustidan sakraydi) o'zbekcha, qisqartirilgan (~70 s) va yaxshilangan 3D versiyasi. Ovoz: Firdavs Urinov (AishaAI). Ichida o'zbekcha misollar bor: Gentra, to'y sharlari, so'm.
**Joylashuv:** `DESKTOP-QA8B43G`: `C:\roadster` · Git: yo'q · `C:\yer` ish usulining nusxasi (`node_modules` → `C:\nega\node_modules` junction)
**Holat:** reel v5 (~70 s) `out/roadster-v5.mp4` (+ `-instagram.mp4`): ssenariy v7 — yangi hook (`scenes/Hook2.tsx`: teskari yurish original kadri), tabiiy raqamlar
**Oxirgi yangilanish:** 2026-10-17

## Ssenariy
`script/ssenariy.md` — 11 satr: sakrash → havo → shar → bak + Gentra ballonidan ×150 bosim → 10 soplo → 6 ta Gentrani ko'taradi → 250/125 = 2 s → sakraydi → 35 kVt·soat (xonadonning 3–4 kunlik elektri) → 3 soat vs 2 s → "3 milliard so'mlik tomosha?"
Tanklar "bak" deb ataladi, chunki "ballon" so'zlashuvda g'ildirak degani.

## Ishga tushirish (C:\nega bilan bir xil)
tools/tts.py --tag v1 --tempo 1.0 --gap 0.25 -> layout.py --vo v1 -> (cd tools) mix.py --vo v1 -> `npx remotion render src/index.ts Roadster out/hook-v4.mp4 --concurrency=12 --gl=angle`; kadr: `node tools/stills.mjs 2 4.6 9` + `tools/sheet.py`
3D: `three/loft.ts` (kesimlardan kuzov: superellips kesim, g'ildirak arkalari, qoraytirilgan pastki qism), `three/Car.tsx` (Roadster: Kamm tail + 4 oltin soplo; Model Y uslubidagi krossover, Tesla zavod ranglari), `three/Jets.tsx` (deterministik zarrachalar + "sahna soati": sekinlashtirish, muzlatish, orqaga), `three/World.tsx` (nam asfalt: Reflector + qoplama). Sahna: `scenes/Hook.tsx`

## Muhim qarorlar (foydalanuvchi)
- Hook 0 dan boshqacha (eski 'beshta Tesla' hook rad etildi, `archive/Hook_v4.tsx`); 'bulut', 'soplo' so'zlari ishlatilmasin; raqamlar tabiiy gapda aytilsin
- 2026-10-17: Nyuton/formulasiz, Kun.uz reeli (DejLj-GtSmX) kabi qisqa yangilik-tushuntirish uslubi
- Instagramga o'zi telefondan joylaydi (Chrome kengaytmasi 10 MB dan katta fayl yuklay olmaydi)
- Ssenariy ilmiy bo'lsin: hayotiy/o'zbekcha misollar va arifmetika (250÷125, uyda zaryad) kerak emas; ventilyator bilan yopishish albatta bo'lsin
- Ovoz: tempo 1.0 (1.07 tez edi), jumlalar orasiga +0.25 s pauza (`--gap`) — siqilgan pauzalar yoqmadi
- Mashinalar yumaloq/o'yinchoqdek bo'lmasin — qirrali, haqiqiy Teslaga o'xshash; Roadster namunasi: 2026 yangi dizayn (Cybertruck uslubi, ikki rang, katta qanot, 4 soplo diffuzorda)
- Raqam o'rniga "SYNAPSE"; qatorda Cybertruck ham bo'lsin
- 5 ta mashina haqiqiy Teslaga o'xshasin (Model Y shakli, zavod ranglari); 3D sifat originaldan yaxshiroq bo'lishi kerak

## Eslatma
- Vertikal kadrga yondan ko'rilgan uzun oqim sig'maydi — oqimni orqa 3/4 burchakdan oling
- Reel ichidagi raqamlar fizika bo'yicha tekshirildi (~34 kVt·soat, ~640 m/s); Tesla namoyishining o'zi tekshirilmagan

## Keyingi qadamlar
- [ ] Hook bo'yicha izohlar (ovoz, 'i' tovushi, kamera)
- [x] 3–11 satrlar sahnalari (v1)
- [ ] Foydalanuvchi izohlari; uzunlik ~116 s (manba 98 s)

## Tarix
- 2026-10-17 | Claude | DESKTOP-QA8B43G | Ssenariy v7: yangi hook (Hook2.tsx), butun ovoz qayta (vo/v7), mix hook qismi qayta, time.ts HITS/Video tension yangilandi; render roadster-v5
- 2026-10-17 | Claude | DESKTOP-QA8B43G | Ssenariy v6 (Kun.uz uslubi): tana qayta o'qitildi (vo/v6), Body.tsx: Secrets/Versions/Specs kartalari + rentgen soplolar + ventilyator diagrammasi; render roadster-v4
- 2026-10-17 | Claude | DESKTOP-QA8B43G | Ssenariy v5 (ilmiy): tana qayta yozildi va o'qitildi (assets/vo/v5), ventilyator/bosim diagrammasi, adiabatik sovish, sun'iy yo'ldosh, m_ramp klipi; render roadster-v3.mp4
- 2026-10-17 | Claude | DESKTOP-QA8B43G | Ssenariy v4 butunlay qayta: manba reel transkripsiyasi (faster-whisper), 'Gentra' ovozda 'Jentra', har jumla alohida TTS (assets/vo/v4); Guts.tsx (shaffof kuzov, 2 karbon bak, klapan, quvurlar, 10 soplo), Body.tsx qayta yozildi; render roadster-v2.mp4
- 2026-10-17 | Claude | DESKTOP-QA8B43G | To'liq reel v1: b3–b11 ovozi (VoiceLab, gap 0.25), layout/mix tana bo'limi, Body.tsx (3D + 2D + 7 ta original klip), render roadster-v1.mp4; Python paketlari qayta o'rnatildi (soundfile, pedalboard, pyloudnorm)
- 2026-10-17 | Claude | DESKTOP-QA8B43G | Hook v5: 4 reel yuklandi (`assets/reels`), 3 ta original Tesla kadri hookka qo'yildi (`ORIGS` Hook.tsx, 'BU MONTAJ EMAS'), ssenariy v3 yaxshilashlar + kadrlar xaritasi
- 2026-10-16 | Claude | DESKTOP-QA8B43G | Hook v4: Roadster 2026 dizayni bo'yicha qirrali (`three/facet.ts`: tekis yuzalar, ikki rang, bronza shisha, qanot, diffuzor, SYNAPSE raqami); Cybertruck qo'shildi (qator o'rtasida); 2-reel (DejbdmGhyhD) g'oyalari ssenariyga yozildi
- 2026-10-16 | Claude | DESKTOP-QA8B43G | Hook v3: kuzov kesimi qirrali (tekis yon, yelka/ostona qirralari) — v2 "o'yinchoqdek yumaloq" deb rad etildi; `Garage` kompozitsiyasi (model tekshiruvi, COMP=Garage stills)
- 2026-10-16 | Claude | DESKTOP-QA8B43G | Hook v2: ovoz sekinroq + uzunroq pauzalar, loft kuzovli yangi Roadster va Model Y, render hook-v2.mp4
- 2026-10-16 | Claude | DESKTOP-QA8B43G | Loyiha yaratildi, ssenariy v2, hook v1 (3D sakrash, sekin harakatda ag'darilish, muzlatilgan oqim, orqaga so'rilish) render qilindi
