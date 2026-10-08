# Monitoring platforma

**Bir jumlada:** IT xizmat ko'rsatiladigan mijoz kompaniyalar qurilmalarini markazdan kuzatish, Telegram ogohlantirish, web panel. 1-bosqich: MikroTik.
**Joylashuv:** `DESKTOP-QA8B43G`: `C:\monitoring` · Git: yo'q · Domen/URL: -
**Holat:** boshlang'ich (reja + kod boshlangan)
**Oxirgi yangilanish:** 2026-10-08

## Stack
- Python (`app/config.py`, `db.py`, `security.py`, `drivers/`), WireGuard

## Arxitektura (qisqa)
- Mijoz MikroTik'lari → WireGuard → markaziy ofis MikroTik (hub) → shu Windows PC
- Reja: `docs/PLAN.md`. Keyin: FaceID ([faceID_manager](faceID_manager.md)), AD, kameralar

## Ishga tushirish
?

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
