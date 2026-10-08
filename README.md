# Hub — qanday ishlatiladi (siz uchun)

Hub — barcha loyihalaringizning "xotirasi". Har bir AI ishni shu yerdan o'qib boshlaydi
va tugatgach shu yerga yozadi. Shuning uchun yangi chat loyihani qayta o'qimaydi → kam kredit.

## Claude Code (4 ta kompyuterda)
Har bir kompyuterda `C:\Users\<siz>\.claude\CLAUDE.md` da hub qoidasi bor (o'rnatish — pastda).
Shundan keyin istalgan loyiha papkasida Claude avtomatik: hubdan o'qiydi → ishlaydi → kartani yangilaydi.
Esdan chiqsa ayting: **"hubni yangila"**.

## ChatGPT / Gemini
- **Codex CLI / Gemini CLI** (kompyuterda): ular `AGENTS.md` / `GEMINI.md` ni o'zi o'qiydi —
  hub papkasida ishga tushiring yoki promptda "C:\hub\AGENTS.md ga amal qil" deng.
- **Veb-chat** (chatgpt.com, gemini.google.com): [prompts/start.md](prompts/start.md) dagi matn + kerakli
  karta faylini yuklang. Oxirida bergan "KARTA YANGILANISHI" ni kartaga qo'shing
  (yoki Claude'ga "shu bilan hubni yangila" deb bering).
- ChatGPT Projects / Gemini Gems ichiga `AGENTS.md` va `INDEX.md` ni doimiy fayl qilib qo'yish ham mumkin.

## 4 ta kompyuter o'rtasida sinxronlash (GitHub private repo)
Birinchi kompyuterda (bir marta):
```
cd C:\hub
git remote add origin https://github.com/<user>/hub.git
git push -u origin main
```
Boshqa kompyuterlarda:
```
git clone https://github.com/<user>/hub.git C:\hub
```
So'ng `setup/install-claude.ps1` ni ishga tushiring. AI har ish boshida `git pull`, oxirida `git push` qiladi.

## Muhim
- Hubga parol/token/`.env` yozilmaydi — repo private bo'lsa ham.
- `COMPUTERS.md` dagi qolgan 3 ta kompyuter qatorini to'ldiring.
