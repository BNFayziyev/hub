# Nega? — 2-mavzu: "Agar Yer 2 barobar katta bo'lganida-chi?"

**Bir jumlada:** "Nega?" kanalining 2-videosi (vertikal 1080x1920, 60 fps, Firdavs Urinov ovozi), 3D sahnalar (Yer shari, tarozi+manekin, shisha kublar). Oxirida "Nega tishlarimiz akulanikidek qayta o'smaydi?" videosiga ishora bo'ladi.
**Joylashuv:** `DESKTOP-QA8B43G`: `C:\yer` · Git: yo'q · pipeline `C:\nega` nusxasi (node_modules junction)
**Holat:** to'liq video v1 (76 s, 8 ta 3D sahna) render `out/yer-full.mp4`, foydalanuvchi ko'rib chiqmoqda
**Oxirgi yangilanish:** 2026-10-11

## Ssenariy (faraz: radius 2x, zichlik bir xil -> hajm/massa x8, g x2, qochish tezligi 22 km/s)
hook (tarozi 70->140 kg) -> hajm/massa/tortishish -> tana (sakrash yarmi, yiqilish) -> tog'lar (Everest ~4,4 km), jirafa -> havo zichroq -> kosmos (qochish tezligi, raketa) -> "omad" -> ishora: tish videosi

## Ishga tushirish (C:\nega bilan bir xil)
tools/tts.py --tag v1 --tempo 1.07 -> layout.py -> mix.py -> `npx remotion render src/index.ts Yer out/yer-part1.mp4 --concurrency=12 --gl=angle`; kadr: `node tools/stills.mjs 2.2 8`
Sahnalar: `src/scenes/` Hook, MathScene, BodyScene, NatureScene, AirScene, SpaceScene, LuckScene, TeaseScene; 3D: `three/Planet.tsx` (fbm shader Yer), `Props.tsx` (manekin, tarozi, kub), `Props2.tsx` (yurak, tog', jirafa, qush, o'pka, raketa), `SharkJaw.tsx` (nega'dan)

## Eslatma
- PowerShell/bash heredoc'da apostrofli katta fayl yozish buziladi — Write vositasi ishlating
- `tts.py` MAXGAP=0.4 (pauza qisqa); PYTHONIOENCODING=utf-8 kerak (kirill print)
- Ishora so'zlari hali tasdiqlanmagan (kanal handle yo'q)

## Keyingi qadamlar
- [ ] To'liq video bo'yicha izohlar (ovoz 'i' tovushi, ritm, ishora so'zlari)

## Tarix
- 2026-10-11 | Claude | DESKTOP-QA8B43G | To'liq video: tana, tog'/jirafa, havo/qush/o'pka, raketa, omad, akula ishorasi (76 s) render yer-full.mp4
- 2026-10-11 | Claude | DESKTOP-QA8B43G | Loyiha yaratildi, 1-qism (0–18 s) render
