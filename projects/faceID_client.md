# faceID_client — ofis clienti

**Bir jumlada:** Ofis Windows PC'sida Hikvision terminallaridan o'tish voqealarini yig'ib, faceID_manager serveriga uzatadi.
**Joylashuv:** `DESKTOP-QA8B43G`: `C:\faceID_client` · Git: yo'q · Domen/URL: -
**Holat:** ishlayapti (versiya 1.8.1 gacha zip'lar)
**Oxirgi yangilanish:** 2026-10-09

## Stack
- Python, PyInstaller (.exe, faceID_client.spec), ISAPI drayver, SQLite bufer, wss:// orqali serverga chiquvchi ulanish

## Arxitektura (qisqa)
- `faceid_client/` kod, `config/`, `build/`, `dist/`
- Bog'liq: [faceID_manager](faceID_manager.md)

## Ishga tushirish
`build.bat` — exe + zip yasash, `holat.bat` — holatni ko'rish. Yangi versiya = yangi `faceID_client-X.Y.Z.zip`.

## Hozirgi holat
- ? (birinchi ishlagan AI to'ldirsin)

## Keyingi qadamlar
- [ ] ?

## Muhim qarorlar
- ?

## Ehtiyot bo'ling
- `.env` da maxfiy kalitlar bor — hubga yozilmaydi.

## Tarix
- 2026-10-08 | Claude | DESKTOP-QA8B43G | Karta yaratildi (README/package.json asosida, chuqur tahlil qilinmagan)
- 2026-10-09 | Claude | DESKTOP-QA8B43G | 1.8.2 build: ishga tushganda oflayn terminal host:port kaliti bilan qolib, buyruqlar "Terminal topilmadi" berardi (Adams: vaqt/rasm/log). Yuklanmagan, tarqatilmagan
