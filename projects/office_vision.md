# office_vision — ofis kameralaridan ish joyi mavjudligi

**Bir jumlada:** Har kompaniya ofisidagi Windows PC kameralarni lokal tahlil qiladi; mustaqil panel va baza, time.kattabaza.uz bilan hisobot/statistika sinxronlash.
**Joylashuv:** RTX 5060 Ti kompyuteri: nomi va kod yo'li ? · Git: hali yaratilmagan · Domen/URL: time.kattabaza.uz bilan integratsiya
**Holat:** g'oya; kamera oqimlari foydalanuvchida ochilgan, pilot kodi hali yozilmagan
**Oxirgi yangilanish:** 2026-10-15

## Stack
- Maqsad PC: Windows, Intel Ultra 7 265F, 32 GB DDR5 6000 MT/s, RTX 5060 Ti 8 GB, taxminan 1.8 TB disk.
- Taklif: Python tahlil xizmati, lokal baza va veb panel; framework/model hali tanlanmagan va o'rnatilmagan.
- Bog'liq: [faceID_manager](faceID_manager.md), [faceID_client](faceID_client.md). Ularning kartalari kod tekshiruvi o'rnini bosmaydi.

## Arxitektura (qisqa)
- Hozir: boshqa ofisdagi 2 kamera -> NVR -> MikroTik dst-nat -> RTX PC -> lokal tahlil/baza/panel -> Time.
- Keyinchalik har kompaniyada o'z ofis PC'si lokal kameralarni tahlil qiladi. Internet uzilsa lokal ishlash davom etadi.
- Markazga voqea/statistika yuborish; yagona voqea ID, qayta yuborishda takror yozmaslik, tuzatish va navbat kerak.
- Xodimlarni Time'dagi barqaror ID bilan bog'lash; kompaniya/ofis ajratilishi kerak. API hali tekshirilmagan.

## Ishga tushirish
- Hali bajariladigan dastur yo'q. Yangi PC'da hostname, ish papkasi, NVIDIA drayver/GPU, Python/Git holatini tekshirishdan boshlash.
- Kod uchun alohida papka/repo ochish; Hub ichiga dastur kodini joylamaslik. Hub protokoli bo'yicha office_vision claim olish.
- RTSP: public NVR manzilidagi tashqi video port va /Streaming/Channels/101 yoki /201; transport TCP.
- Parol va ulanish kalitlari lokal .env yoki credential storage ichida saqlansin; bu repoda parollar yo'q.

## Hozirgi holat
- Foydalanuvchi NAT ishlaganini bildirdi va ikkala rakursdagi jonli video kadrlarini yubordi.
- NVR Hikvision DS-7608NI-Q1(E), lokal IP 10.1.1.227.
- D1: 10.1.1.2; D2: 10.1.1.3. Ikkalasi DS-2CD2443G0E-I(C), NVR ro'yxatida onlayn.
- D1 asosiy oqim 101, substream 102; D2 asosiy 201, substream 202.
- MikroTik L009UiGS, RouterOS 7.20.8, public IP bor. VPN ishlatilmaydi — foydalanuvchi NAT'ni tanlagan.
- NAT TCP: tashqi 15554 -> NVR:554; 15080 -> :80; 15800 -> :8000, kirish ether1.
- NAT rasmlarida Src Address bo'sh edi; tahlil PC public IP /32 bilan cheklash tavsiya qilingan, bajarilgani tasdiqlanmagan.
- Bitta xona qarama-qarshi ikki burchakdan ko'rinadi. D1'da deraza tomoni juda yorug', monitorlar odamlarni to'sishi mumkin.
- 21 doimiy joy: A01-A07, B01-B07, C01-C07. Oldingi 25 soni xato; 104 yozuvi A04 deb tuzatilgan va belgilangan rasm tasdiqlaydi.
- Asosiy D1: A01-A07, B01-B04. Asosiy D2: B05-B07, C01-C07. Qo'shimcha rakurs vaqtni ikki marta qo'shmasin.
- Foydalanuvchi barcha ma'lumot va rasmlarni shu public repodan olishni aniq so'radi; kadrlar quyida saqlangan.
- D1 belgilangan kadr: A01 yuqori o'ngda, A02 uning pastida, A03 yaqinroq o'ng, A04 eng yaqin joy; A05-A07 stolning qarshi tomoni, A07 o'tirgan odam joyi.
- D1 B01 o'rta qatorning uzoq o'ngida, B02 undan yaqinroq, B03 markaz-chap, B04 chapdagi yaqin chetda.
- D2 B05-B07 uzoqdagi qatorning chapdan o'ngiga; B06 qizil kiyim tashlangan kreslo yonida.
- D2 C01 eng yaqin chap chetda, C02-C04 qarshi tomonda uzoqlashadi; C05-C07 yaqin/o'ng tomonda uzoqlashadi. Aniq polygonlar hali chizilmagan.

## Keyingi qadamlar
- [ ] Yangi PC'da Hub sync/status, ushbu karta va repo rasmlarini o'qish; office_vision claim olish.
- [ ] PC nomi va haqiqiy kod yo'lini tekshirish; quyidagi repo rasmlarini ochish.
- [ ] NVR uchun faqat kerakli live-view huquqli foydalanuvchi va lokal credential sozlash.
- [ ] RTSP TCP'da 2 oqimni olish, uzilganda qayta ulanish va alohida uzilish jurnali.
- [ ] Toza kadrda zona chizish/tahrirlash/saqlash paneli; 21 joy ID'si yuqoridagidek.
- [ ] Avval A07, B06, C05 da odam o'tirishi, ketishi, qaytishi, yonidan o'tishni tekshirish.
- [ ] Band / bo'sh / aniqlanmagan holat va davomiylikni lokal bazaga yozish, kunlik vaqt chizig'i.
- [ ] Keyin barcha 21 joy; ikki rakursni birlashtirish va takror vaqtni bartaraf etish.
- [ ] Time kodi/APIni tekshirish va xodim ID/sinxronlashni qo'shish; keyin telefon/holat aniqlashni alohida baholash.

## Muhim qarorlar
- Hozir stollar doimiy, keyin almashtirish qo'llab-quvvatlanadi.
- Stol bandligi xodim shaxsini tasdiqlamaydi. Boshqa odam o'tirsa farqlash birinchi bosqichda yo'q.
- Kamera mavjudlikni o'lchaydi; buni unumdorlik yoki ishlagan vaqt deb avtomatik tenglashtirmaslik.
- Ko'rinmaslik va video uzilishi yo'qlik deb hisoblanmasin; noaniq holat alohida.
- Telefon bilan o'zaro harakat keyingi bosqich; ish/shaxsiy foydalanishni video orqali avtomatik hukm qilmaslik.

## Ehtiyot bo'ling
- Yangi PC konteksti avtomatik keladi deb va'da bermang; shu karta va arxivni haqiqatan o'qing.
- GitHub kirishi boshqa PC diskiga yoki NVR'ga kirish degani emas.
- Time kodining kartadagi yo'llari DESKTOP-QA8B43G: C:\faceID_manager va C:\faceID_client; hozirgi haqiqiy joylashuvi noma'lum.
- Kamera vaqt zonasi, PC/NVR vaqt mosligi tekshirilsin. Skrinshotlar har xil vaqtda olingan.

## Tarix
- 2026-10-15 | Codex | WIN-6V7C5DQJNII | 03a00ac4be0148e7adcf0ef04d074be0, suhbat kelishuvlari boshqa PC uchun kartaga yig'ildi.

## Topshirish
- Vazifa ID / owner: f70365a64c86413882f710c9c47635aa / Codex/WIN-6V7C5DQJNII/vision-full-20261015.
- Kod repo / branch / commit: dastur hali yo'q; bu faqat Hub xotira kartasi.
- Sinov buyrug'i va natijasi: Hub validate va git diff --check push oldidan bajariladi; GPU/NVR testi bu sessiyada bajarilmagan.
- Qaysi kompyuterga yetkazildi / prod holati: Hub GitHub'ga yuboriladi; RTX PC'ga o'rnatish hali bajarilmagan.
- Qolgan ish / to'siq: yuqoridagi Keyingi qadamlar; kod yozish yangi PC'da boshlanadi.

## Repo ichidagi to'liq topshirish materiallari
- NVR public IP: 195.158.11.180 (foydalanuvchi skrinshotlari; yangi PC'da amaldaligini tekshiring).
- D1 RTSP: rtsp://195.158.11.180:15554/Streaming/Channels/101
- D2 RTSP: rtsp://195.158.11.180:15554/Streaming/Channels/201
- [D1 belgilangan joylar](../assets/office_vision/D1-marked.png)
- [D2 belgilangan joylar](../assets/office_vision/D2-marked.png)
- [D1 toza kadr](../assets/office_vision/D1-clean.png)
- [D2 toza kadr](../assets/office_vision/D2-clean.png)
- Rasmdagi yashil yozuvlar joy nomlari; aniq polygon koordinatalari hali yo'q, ularni dasturda chizish kerak.
- NVR foydalanuvchi/parolini foydalanuvchi yangi PC'da lokal kiritadi; chatda/repo ichida yo'q.
- 2026-10-15 | Codex | WIN-6V7C5DQJNII | f70365a64c86413882f710c9c47635aa, foydalanuvchi talabiga ko'ra to'liq hujjat va 4 kadr public Hub'ga joylandi.