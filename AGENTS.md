# HUB — barcha loyihalar xotirasi (har qanday AI uchun qoidalar)

Bu papka egasining BARCHA loyihalari haqidagi yagona manba. Uni Claude, ChatGPT, Gemini
va 4 ta kompyuter ishlatadi. Maqsad: yangi chat yoki boshqa AI loyihani qaytadan
o'qib chiqmasdan, shu yerdagi ma'lumot bilan xatosiz va kam token sarflab davom ettirsin.

## Ish boshlashdan oldin (O'QISH)
1. `INDEX.md` ni o'qing — qaysi loyiha qayerda, holati qanday.
2. Faqat kerakli loyiha kartasini o'qing: `projects/<nom>.md`.
3. Kartada yozilgan narsani qaytadan tekshirib, butun loyihani skanerlamang.
   Faqat kartada yo'q yoki "?" bilan belgilangan narsa uchun kerakli fayllarni oching.
4. Karta koddan farq qilsa — kod to'g'ri, kartani tuzating.

## Ish tugagach (YOZISH) — majburiy
Loyihada biror narsa o'zgartirsangiz yoki yangi loyiha ochsangiz:
1. `projects/<nom>.md` ni yangilang: "Hozirgi holat", "Keyingi qadamlar", kerak bo'lsa
   "Arxitektura"/"Muhim qarorlar"/"Ehtiyot bo'ling". Eskirgan gaplarni o'chiring (karta qisqa qolsin).
2. Kartaning oxiridagi "Tarix" ga BITTA qator qo'shing:
   `- YYYY-MM-DD | <AI nomi> | <kompyuter> | nima qilindi`
3. Yangi loyiha bo'lsa: `templates/project.md` dan nusxa oling va `INDEX.md` ga qator qo'shing.
4. `INDEX.md` dagi holat/sana ustunini yangilang.
5. Git mavjud bo'lsa: `git pull` (boshida) va `git add -A && git commit -m "<loyiha>: ..." && git push` (oxirida).

## Yozish qoidalari
- Karta 150 qatordan oshmasin. Faktlar, buyruqlar, yo'llar — suv yo'q.
- Til: o'zbekcha (lotin). Kod, buyruq, fayl nomlari asl holicha.
- HECH QACHON parol, token, API kalit, `.env` qiymatlarini yozmang. Faqat kalit NOMI
  (masalan `BOT_TOKEN — .env da`).
- Noaniq narsani "?" bilan belgilang, o'ylab topmang.
- Loyiha qaysi kompyuterda va qaysi yo'lda turganini yozing (kompyuterlar ro'yxati — `COMPUTERS.md`).

## Fayllar
- `INDEX.md` — loyihalar jadvali (birinchi o'qiladigan fayl)
- `projects/*.md` — har bir loyiha kartasi
- `COMPUTERS.md` — 4 ta kompyuter va ulardagi loyihalar
- `templates/project.md` — yangi karta shabloni
- `prompts/start.md` — ChatGPT/Gemini veb-chatiga yopishtiriladigan matn
