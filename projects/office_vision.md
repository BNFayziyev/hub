# office_vision — lokal kamera tahlili

**Bir jumlada:** Ofisdagi lokal kompyuter ish joylari mavjudligini tahlil qiladi; mustaqil ishlaydi va Time bilan hisobot/statistikani sinxronlaydi.
**Joylashuv:** Yangi kompyuterda yo'l tekshiriladi · Git: hali yo'q · Domen/URL: Time integratsiyasi
**Holat:** g'oya; pilot kodi hali yozilmagan
**Oxirgi yangilanish:** 2026-10-15

## Stack
- Windows va NVIDIA GPU; Python xizmat/lokal baza/panel taklif qilingan, hali tanlanmagan.
- Bog'liq loyihalar: [faceID_manager](faceID_manager.md), [faceID_client](faceID_client.md).

## Hozirgi holat
- Foydalanuvchi video oqimlarini ochgan va joylarni rasmlarda belgilagan.
- Texnik ulanish tafsilotlari va kadrlar public repo'ga kiritilmagan.
- Barcha kelishuvlar, belgilangan va toza kadrlar foydalanuvchiga office-vision-transfer.zip arxivida topshiriladi.
- Dastur kodi yozilmagan; boshqa PC'ga o'rnatildi deb hisoblamaslik.

## Keyingi qadamlar
- [ ] Foydalanuvchidan office-vision-transfer.zip arxivini olish va office_vision.md hamda rasmlarni o'qish.
- [ ] Hub AGENTS/COORDINATION bo'yicha sync/status va office_vision claim olish.
- [ ] Kompyuter nomi, ish papkasi, GPU/drayver va runtime'larni tekshirish.
- [ ] Alohida kod repo/papka; RTSP TCP oqimlari, qayta ulanish va uzilish jurnali.
- [ ] Zona chizish/tahrirlash/saqlash paneli; joy kodlari arxivdagi xaritaga mos bo'lsin.
- [ ] Band / bo'sh / aniqlanmagan holatlarni va vaqtni lokal bazaga yozish.
- [ ] Kichik pilotni tekshirish, keyin barcha joylar; ikki rakurs vaqtini takror qo'shmaslik.
- [ ] Time kodi/APIni haqiqatan tekshirib, xodim ID va offline sinxronlashni qo'shish.

## Muhim qarorlar
- Har kompaniyada lokal tahlil, mustaqil panel/baza; markazga hisobot/statistika.
- Hozir stollar doimiy; keyinchalik o'zgaradi. Telefon/holat aniqlash keyingi bosqich.
- Stol bandligi shaxsni yoki unumdorlikni tasdiqlamaydi; video uzilishi yo'qlik emas.
- Maxfiy ulanishlar, parollar va ofis kadrlarini public Hub'ga joylamaslik.

## Tarix
- 2026-10-15 | Codex | WIN-6V7C5DQJNII | 03a00ac4be0148e7adcf0ef04d074be0, umumiy topshirish kartasi va alohida ko'chirish arxivi tayyorlandi.