# Vizitka — promo video

**Bir jumlada:** 64 s, 1920×1080, 60 fps motion-promo (vizitka.kattabaza.uz uchun), gapsiz — faqat musiqa va effektlar; hammasi kod bilan.
**Joylashuv:** `DESKTOP-QA8B43G`: `C:\vizitka_promo` · Git: yo'q · Domen/URL: -
**Holat:** birinchi versiya tayyor
**Oxirgi yangilanish:** 2026-10-12

## Stack
- Remotion 4 (React, TS), Python sintez (`C:\kattabaza_promo\.venv` dan foydalaniladi), puppeteer-core (ilova suratlari)

## Arxitektura (qisqa)
- `src/timeline.json` sahna vaqtlari, `src/scenes/S1Intro…S11Finale.tsx`, `src/components/Device.tsx` (3D telefon, karta, logo)
- `capture/` — demo baza bilan alohida link serveri (3711) + vite (5199) orqali haqiqiy ekranlarni suratga olish → `public/shots/`
- `tools/soundtrack.py` → `public/soundtrack.wav`; natija `out/`, `final/`

## Ishga tushirish
README.md da: studio, soundtrack.py, render.

## Muhim qarorlar
- Ilova ekranlari qayta chizilmagan — haqiqiy UI suratlari (2x) telefonda animatsiya qilinadi
- `C:\link\web\src\pages\DevTemplates.jsx` ga `?demo=` va `?qr=` parametrlari qo'shilgan (faqat dev)

## Ehtiyot bo'ling
- node_modules kattabaza_promo'dan nusxa; robocopy /XD bilan nusxalaganda ichki `audio`/`dev` papkalar tushib qoladi

## Tarix
- 2026-10-09 | Claude | DESKTOP-QA8B43G | Loyiha yaratildi: 11 sahna, sintez musiqa/SFX, haqiqiy ilova suratlari
- 2026-10-12 | Codex | WIN-6V7C5DQJNII | Hub tekshiruvida yetishmagan Keyingi qadamlar bo'limi qo'shildi; loyiha kodi tekshirilmadi.

## Keyingi qadamlar
- [ ] ? Egasi bilan keyingi video o'zgarishini aniqlash; lokal kod/chiqishni tekshirish.
