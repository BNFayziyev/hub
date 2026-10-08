# Loyihalar hubi (C:\hub) — har bir sessiyada majburiy

Barcha loyihalar haqidagi ma'lumot `C:\hub` da. Qoidalar: `C:\hub\AGENTS.md`.

- Loyiha ustida ish boshlashdan oldin: `C:\hub` da `git pull` (agar remote bo'lsa), `C:\hub\INDEX.md` va
  shu loyihaning `C:\hub\projects\<nom>.md` kartasini o'qing. Kartadagi ma'lumotga tayaning, butun
  loyihani qayta skanerlamang — faqat kerakli fayllarni oching.
- Loyihada biror narsa o'zgartirgach yoki yangi loyiha ochgach: kartani va `INDEX.md` ni yangilang,
  "Tarix" ga bitta qator qo'shing (`YYYY-MM-DD | Claude | <COMPUTERNAME> | nima qilindi`), keyin
  `C:\hub` da commit + push (remote bo'lsa).
- Hubga hech qachon parol, token, `.env` qiymatlarini yozmang.
