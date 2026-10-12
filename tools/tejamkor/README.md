# Tejamkor — Claude kreditini tejash modi (qo'llanma)

Claude desktop (Code tab) va Claude Code uchun mod. Uch ish qiladi:
1. Prompt ustida qolgan limit va teskari sanoqni ko'rsatadi.
2. Har bir xabar uchun modelni o'zi tanlaydi: Haiku (arzon), Sonnet (o'rta) yoki Opus (qimmat).
3. Loyiha kartasini hub'dan (`C:\hub`) avtomatik ulaydi — Claude loyihani qayta o'qib chiqmaydi.

---

## 1. O'rnatish (har bir kompyuterda bir marta)

```
cd C:\hub
git pull
setx CLAUDE_CODE_PLUGIN_DIRS "C:\hub\tools\tejamkor"
```
Keyin Claude ilovasini **to'liq yoping** (tray'dagi belgidan ham: o'ng tugma → Quit) va qayta oching.
Yangi sessiya oching — prompt ustida limit paneli chiqsa, mod ishlayapti.

Tekshirish: chatga `/tejam` yozing — holat chiqishi kerak.

O'chirish: `setx CLAUDE_CODE_PLUGIN_DIRS ""` va ilovani qayta ochish (yoki vaqtincha `/tejam off`).

---

## 2. Limit paneli

```
5 soat: 63% qoldi ⏳ 02:14:05   7 kun: 41% qoldi ⏳ 3k 04:10:22   Model: sonnet (auto) · kontekst 48k
```
- **5 soat** — qisqa limit; sanoq tugaganda 100% ga qaytadi.
- **7 kun** — haftalik limit; `3k` = 3 kun.
- Rang: yashil > 40% · sariq ≤ 40% · qizil ≤ 15%.
- 5 soatlik limitning 80% i ishlatilsa — ogohlantirish chiqadi.
- **kontekst** — har bir xabarda qayta yuboriladigan hajm. 120k dan oshsa `/compact` qiling yoki yangi sessiya oching.
- Limitlar sessiyadagi birinchi javobdan keyin chiqadi (faqat Pro/Max obunada).

---

## 3. Avtomatik model tanlash

| Xabarda | Model |
|---|---|
| arxitektura, yangi loyiha, refaktor, xavfsizlik, audit, reja, murakkab xato, migratsiya, juda uzun topshiriq | **Opus** |
| git/commit/push, tarjima, "qayerda", "ro'yxat", "nechta", rename, qisqa savol | **Haiku** |
| qolgan hammasi (oddiy kod yozish, tuzatish) | **Sonnet** |
| "ha", "davom", "ok", "mayli" | oldingi model qoladi |

**Kesh qoidasi:** suhbat katta bo'lsa (kontekst > 30k), model arzonroqqa tushirilmaydi — almashtirish keshni yo'qotadi va qaytib chiqish qimmatroq tushadi. Yuqoriga (Opus'ga) har doim chiqadi.

### Qo'lda boshqarish
| Yozasiz | Natija |
|---|---|
| `!o <xabar>` | shu xabar Opus'da |
| `!s <xabar>` | shu xabar Sonnet'da |
| `!h <xabar>` | shu xabar Haiku'da |
| `/tejam` | holat: limitlar, model, sessiya narxi, kontekst |
| `/tejam auto` | avtomatik tanlash (standart) |
| `/tejam opus` / `sonnet` / `haiku` | modelni qotirib qo'yish |
| `/tejam off` | mod model va qoidalarga aralashmaydi |

---

## 4. Hub xotirasi

Sessiyaning birinchi xabarida mod qaysi papkada ishlayotganingizni oladi, `C:\hub\INDEX.md` dan mos loyihani topadi va kartasini Claude'ga o'zi beradi.

- Ishlashi uchun: sessiyani **loyiha papkasida** oching ("No folder" emas) va loyiha `INDEX.md` da yo'li bilan bo'lsin.
- Karta qanchalik to'liq bo'lsa (arxitektura, buyruqlar, "Ehtiyot bo'ling"), Claude shuncha kam fayl o'qiydi.
- Ish tugagach Claude kartani yangilaydi (`CLAUDE.md` qoidasi) — keyingi sessiya undan boshlaydi.

---

## 5. Kreditni tejash odatlari (eng muhimi)

1. **Yangi vazifa — yangi sessiya.** Har bir xabar butun suhbatni qayta yuboradi: 100k kontekstda "ha" ham 100k token.
2. **`/compact`** — mavzu o'sha, lekin kontekst 100k+ bo'lsa.
3. **Bitta to'liq xabar** — uchta qisqa xabardan arzon.
4. **Fayl va joyni ko'rsating:** "`api/auth.ts` dagi login" — Claude qidirmaydi.
5. **Agent so'ramang**, kerak bo'lmasa — har biri noldan kontekst yig'adi.
6. **Effort'ni pasaytiring** oddiy ishlarda (low/medium).
7. **Katta log/faylni chatga yopishtirmang** — yo'lini bering.
8. **Limit qizil bo'lsa** — `/tejam haiku` yoki `/tejam sonnet`.

---

## 6. Muammolar

| Belgi | Sabab / yechim |
|---|---|
| Panel chiqmadi | Ilova to'liq yopilmagan (tray). Quit → qayta oching. `echo %CLAUDE_CODE_PLUGIN_DIRS%` ni tekshiring. |
| "Limit ma'lumoti..." yozuvi qoldi | Hali javob kelmagan yoki API kalit bilan ishlayapsiz (limit faqat obunada). |
| Model kutilgandek emas | `!o/!s/!h` bilan majburlang; kalit so'zlar `hooks/router.ts` da (`OPUS`, `HAIKU`). |
| Hub kartasi ulanmadi | Sessiya loyiha papkasida emas yoki yo'l `INDEX.md` da yo'q. |

## Fayllar
- `hooks/router.ts` — model tanlash qoidalari, kalit so'zlar, model IDlari.
- `hooks/register.tsx` — panel, hooklar, `/tejam`.
- Tekshirish: `claude plugin validate C:\hub\tools\tejamkor` · `claude plugin test C:\hub\tools\tejamkor`
