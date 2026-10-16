# Roadster — havo bilan sakraydigan mashina (UZ reel, 9:16, 3D)

**Bir jumla:** "The Unseen How" reelining (Tesla Roadster sovuq gazli dvigatellar bilan 5 ta Tesla ustidan sakraydi) o'zbekcha, qisqartirilgan (~70 s) va yaxshilangan 3D versiyasi. Ovoz: Firdavs Urinov (AishaAI). Ichida o'zbekcha misollar bor: Gentra, to'y sharlari, so'm.
**Joylashuv:** `DESKTOP-QA8B43G`: `C:\roadster` · Git: yo'q · `C:\yer` ish usulining nusxasi (`node_modules` → `C:\nega\node_modules` junction)
**Holat:** hook v1 (0–12.6 s) render qilingan `out/hook-v1.mp4`, foydalanuvchi ko'rib chiqmoqda
**Oxirgi yangilanish:** 2026-10-16

## Ssenariy
`script/ssenariy.md` — 11 satr: sakrash → havo → shar → bak + Gentra ballonidan ×150 bosim → 10 soplo → 6 ta Gentrani ko'taradi → 250/125 = 2 s → sakraydi → 35 kVt·soat (xonadonning 3–4 kunlik elektri) → 3 soat vs 2 s → "3 milliard so'mlik tomosha?"
Tanklar "bak" deb ataladi, chunki "ballon" so'zlashuvda g'ildirak degani.

## Ishga tushirish (C:\nega bilan bir xil)
tools/tts.py --tag v1 --tempo 1.07 -> layout.py --vo v1 -> (cd tools) mix.py --vo v1 -> `npx remotion render src/index.ts Roadster out/hook-v1.mp4 --concurrency=12 --gl=angle`; kadr: `node tools/stills.mjs 2 4.6 9` + `tools/sheet.py`
3D: `three/Car.tsx` (protsedural Roadster + krossover, siqiq profil), `three/Jets.tsx` (deterministik zarrachalar + "sahna soati": sekinlashtirish, muzlatish, orqaga), `three/World.tsx` (nam asfalt: Reflector + qoplama). Sahna: `scenes/Hook.tsx`

## Eslatma
- Vertikal kadrga yondan ko'rilgan uzun oqim sig'maydi — oqimni orqa 3/4 burchakdan oling
- Reel ichidagi raqamlar fizika bo'yicha tekshirildi (~34 kVt·soat, ~640 m/s); Tesla namoyishining o'zi tekshirilmagan

## Keyingi qadamlar
- [ ] Hook bo'yicha izohlar (ovoz, 'i' tovushi, kamera)
- [ ] 3–11 satrlar sahnalari

## Tarix
- 2026-10-16 | Claude | DESKTOP-QA8B43G | Loyiha yaratildi, ssenariy v2, hook v1 (3D sakrash, sekin harakatda ag'darilish, muzlatilgan oqim, orqaga so'rilish) render qilindi
