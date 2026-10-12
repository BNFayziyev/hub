# Nega? — 2-mavzu: "Agar Yer 2 barobar katta bo'lganida-chi?"

**Bir jumlada:** "Nega?" kanalining 2-videosi (vertikal 1080x1920, 60 fps, Firdavs Urinov ovozi), 3D sahnalar (Yer shari, tarozi+manekin, shisha kublar). Oxirida "Nega tishlarimiz akulanikidek qayta o'smaydi?" videosiga ishora bo'ladi.
**Joylashuv:** `DESKTOP-QA8B43G`: `C:\yer` · Git: yo'q · pipeline `C:\nega` nusxasi (node_modules junction)
**Holat:** 1-qism (hook + hajm/massa/tortishish, 18.5 s) render `out/yer-part1.mp4`, foydalanuvchi ko'rib chiqmoqda
**Oxirgi yangilanish:** 2026-10-11

## Ssenariy (faraz: radius 2x, zichlik bir xil -> hajm/massa x8, g x2, qochish tezligi 22 km/s)
hook (tarozi 70->140 kg) -> hajm/massa/tortishish -> tana (sakrash yarmi, yiqilish) -> tog'lar (Everest ~4,4 km), jirafa -> havo zichroq -> kosmos (qochish tezligi, raketa) -> "omad" -> ishora: tish videosi

## Ishga tushirish (C:\nega bilan bir xil)
tools/tts.py --tag v1 --tempo 1.07 -> layout.py -> mix.py -> `npx remotion render src/index.ts Yer out/yer-part1.mp4 --concurrency=12 --gl=angle`; kadr: `node tools/stills.mjs 2.2 8`
Sahnalar: `src/scenes/Hook.tsx`, `MathScene.tsx`; 3D: `three/Planet.tsx` (fbm shader Yer), `Props.tsx` (manekin, tarozi, kub)

## Eslatma
- PowerShell/bash heredoc'da apostrofli katta fayl yozish buziladi — Write vositasi ishlating
- `tts.py` MAXGAP=0.4 (pauza qisqa); PYTHONIOENCODING=utf-8 kerak (kirill print)
- Ishora so'zlari hali tasdiqlanmagan (kanal handle yo'q)

## Keyingi qadamlar
- [ ] 1-qism izohlari; keyin 3–8 sahnalar (tana, tog'lar, havo, raketa, ishora)

## Tarix
- 2026-10-11 | Claude | DESKTOP-QA8B43G | Loyiha yaratildi, 1-qism (0–18 s) render
