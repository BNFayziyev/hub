# Roadster — havo bilan sakraydigan mashina (UZ reel, 9:16, 3D)

**Bir jumla:** "The Unseen How" reelining (Tesla Roadster sovuq gazli dvigatellar bilan 5 ta Tesla ustidan sakraydi) o'zbekcha, qisqartirilgan (~70 s) va yaxshilangan 3D versiyasi. Ovoz: Firdavs Urinov (AishaAI). Ichida o'zbekcha misollar bor: Gentra, to'y sharlari, so'm.
**Joylashuv:** `DESKTOP-QA8B43G`: `C:\roadster` · Git: yo'q · `C:\yer` ish usulining nusxasi (`node_modules` → `C:\nega\node_modules` junction)
**Holat:** hook v4 (0–13.9 s) render qilingan `out/hook-v4.mp4`, foydalanuvchi ko'rib chiqmoqda
**Oxirgi yangilanish:** 2026-10-16

## Ssenariy
`script/ssenariy.md` — 11 satr: sakrash → havo → shar → bak + Gentra ballonidan ×150 bosim → 10 soplo → 6 ta Gentrani ko'taradi → 250/125 = 2 s → sakraydi → 35 kVt·soat (xonadonning 3–4 kunlik elektri) → 3 soat vs 2 s → "3 milliard so'mlik tomosha?"
Tanklar "bak" deb ataladi, chunki "ballon" so'zlashuvda g'ildirak degani.

## Ishga tushirish (C:\nega bilan bir xil)
tools/tts.py --tag v1 --tempo 1.0 --gap 0.25 -> layout.py --vo v1 -> (cd tools) mix.py --vo v1 -> `npx remotion render src/index.ts Roadster out/hook-v4.mp4 --concurrency=12 --gl=angle`; kadr: `node tools/stills.mjs 2 4.6 9` + `tools/sheet.py`
3D: `three/loft.ts` (kesimlardan kuzov: superellips kesim, g'ildirak arkalari, qoraytirilgan pastki qism), `three/Car.tsx` (Roadster: Kamm tail + 4 oltin soplo; Model Y uslubidagi krossover, Tesla zavod ranglari), `three/Jets.tsx` (deterministik zarrachalar + "sahna soati": sekinlashtirish, muzlatish, orqaga), `three/World.tsx` (nam asfalt: Reflector + qoplama). Sahna: `scenes/Hook.tsx`

## Muhim qarorlar (foydalanuvchi)
- Ovoz: tempo 1.0 (1.07 tez edi), jumlalar orasiga +0.25 s pauza (`--gap`) — siqilgan pauzalar yoqmadi
- Mashinalar yumaloq/o'yinchoqdek bo'lmasin — qirrali, haqiqiy Teslaga o'xshash; Roadster namunasi: 2026 yangi dizayn (Cybertruck uslubi, ikki rang, katta qanot, 4 soplo diffuzorda)
- Raqam o'rniga "SYNAPSE"; qatorda Cybertruck ham bo'lsin
- 5 ta mashina haqiqiy Teslaga o'xshasin (Model Y shakli, zavod ranglari); 3D sifat originaldan yaxshiroq bo'lishi kerak

## Eslatma
- Vertikal kadrga yondan ko'rilgan uzun oqim sig'maydi — oqimni orqa 3/4 burchakdan oling
- Reel ichidagi raqamlar fizika bo'yicha tekshirildi (~34 kVt·soat, ~640 m/s); Tesla namoyishining o'zi tekshirilmagan

## Keyingi qadamlar
- [ ] Hook bo'yicha izohlar (ovoz, 'i' tovushi, kamera)
- [ ] 3–11 satrlar sahnalari

## Tarix
- 2026-10-16 | Claude | DESKTOP-QA8B43G | Hook v4: Roadster 2026 dizayni bo'yicha qirrali (`three/facet.ts`: tekis yuzalar, ikki rang, bronza shisha, qanot, diffuzor, SYNAPSE raqami); Cybertruck qo'shildi (qator o'rtasida); 2-reel (DejbdmGhyhD) g'oyalari ssenariyga yozildi
- 2026-10-16 | Claude | DESKTOP-QA8B43G | Hook v3: kuzov kesimi qirrali (tekis yon, yelka/ostona qirralari) — v2 "o'yinchoqdek yumaloq" deb rad etildi; `Garage` kompozitsiyasi (model tekshiruvi, COMP=Garage stills)
- 2026-10-16 | Claude | DESKTOP-QA8B43G | Hook v2: ovoz sekinroq + uzunroq pauzalar, loft kuzovli yangi Roadster va Model Y, render hook-v2.mp4
- 2026-10-16 | Claude | DESKTOP-QA8B43G | Loyiha yaratildi, ssenariy v2, hook v1 (3D sakrash, sekin harakatda ag'darilish, muzlatilgan oqim, orqaga so'rilish) render qilindi
