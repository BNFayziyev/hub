# HUB — barcha AI va kompyuterlar uchun umumiy tartib

Hub loyiha xotirasi; loyiha kodi alohida papka/repositoriyda. Til: o'zbekcha lotin.
Amaliy buyruqlar: COORDINATION.md. Python 3.10+ va Git kerak.

## Ish boshlash
1. Kompyuter nomi, haqiqiy loyiha yo'li va Git remote'ni tekshiring. Boshqa kompyuterdagi
   papka ulangan deb hisoblamang. GitHub nusxasi yuborilmagan lokal ishni ko'rsatmaydi.
2. Har AI sessiyasi alohida Hub clone'da ishlasin. HubWeb ishlatadigan C:\hub ni AI
   tahrir va Git amallari uchun ishlatmang. Bir clone'da ikki yozuvchi bo'lmasin.
3. `python tools/hub.py sync`, INDEX.md, keyin kerakli projects/<nom>.md ni o'qing.
   Faqat vazifaga tegishli kodni tekshiring. Karta koddan farq qilsa, kod faktini yozing.
4. `python tools/hub.py status` bilan band vazifalarni ko'ring. Kod/kartani o'zgartirishdan
   oldin claim bajaring; muvaffaqiyatli push va vazifa IDsi olinmaguncha boshlamang.
   Owner: AI/COMPUTER/session — har sessiyaga alohida nom.
5. Bir loyiha uchun bitta faol yozuvchi. Blocked ham band. Internet bo'lmasa faqat o'qish.
   Umumiy papkadagi loyihalar bir resurs: synapse + synapse_promo + synapse_instagram;
   hub + tejamkor + hubweb. Yangi umumiy papka bo'lsa tools/hub.py dagi GROUPS ni yangilang.
6. Kod uchun alohida branch/worktree yoki clone ishlating. Umumiy ish papkasida davom
   etish zarur bo'lsa, avval oldingi AI topshirig'i va lokal o'zgarishlar egasini aniqlang.

## Ish tugashi va topshirish
1. Tegishli testlarni bajaring: o'tdi / yiqildi / bajarilmadi + sababni yozing.
2. Kartadagi Hozirgi holat, Keyingi qadamlar va kerakli qarorlarni yangilang.
   Tarixga bitta qator: YYYY-MM-DD | AI | COMPUTER | vazifa IDsi, nima qilindi.
3. INDEX holati/sanasini karta bilan moslang. Yangi karta uchun templates/project.md.
   Noaniq holatni taxmin bilan almashtirmang; ? va nimani tekshirish kerakligini yozing.
4. `python tools/hub.py validate`, keyin git diff. Faqat o'zingiz o'zgartirgan fayllarni
   `git add -- <aniq fayllar>` bilan stage qiling. `git add -A` ishlatmang.
   `git diff --cached` ni tekshirib commit va oddiy push qiling.
5. Push rad etilsa: toza ish nusxasida fetch + rebase, konfliktlarni mazmunan tekshirish,
   validate va qayta push. Avtomatik ours/theirs, force-push, reset --hard va autostash yo'q.
   Boshqa AI ishini o'chirmang yoki uning nomidan commit qilmang.
6. Kod commit/branch/PR, test, qayerga yetkazilgani va qolgan qadamlarni finish ga yozing.
   GitHubga push boshqa kompyuterga o'rnatildi degani emas. Prod holatini tekshirgach yozing.
7. Ish to'xtasa block, bekor qilinsa cancel: sabab, saqlangan ish va keyingi qadam majburiy.
   Egasi qaytmasa, foydalanuvchi tasdiqlagan topshirish asosida eski owner/ID bilan cancel,
   keyin yangi claim. Qulf vaqt o'tishi bilan o'z-o'zidan ochilmaydi.

## Ma'lumot sifati
- Karta 150 qatordan oshmasin. Faktlar, yo'llar, buyruqlar, tekshiruv natijalari.
- Parol, token, API kalit va .env qiymatlarini yozmang. Faqat kalit nomi.
- COMPUTERS.md: kompyuter, yo'l, ulanish. Bilinmagan narsani ? bilan belgilang.
- hub-coordination branchidagi state.json vazifalar uchun yagona manba; uni qo'lda
  tahrirlamang, main'ga merge qilmang, ikkinchi vazifalar ro'yxatini yuritmang.
- Barcha AIlar protokolga o'tmaguncha himoya to'liq ishlamaydi. Eski sessiyalarga yangi
  AGENTS.md ni qayta o'qiting. HubWeb integratsiyasi alohida ish.
