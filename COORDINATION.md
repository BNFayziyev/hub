# Birga ishlash

## Har AI sessiyasini boshlash
Har sessiyaga alohida clone (misol nomini o'z sessiyangizga almashtiring):
```powershell
 git clone https://github.com/BNFayziyev/hub.git C:\hub-agents\codex-session1
 cd C:\hub-agents\codex-session1
 python tools/hub.py sync
 python tools/hub.py status
 python tools/hub.py claim --project bronbar --owner Codex/PC1/session1 --summary "Telefon tekshiruvi"
```
Javobdagi id ni saqlang. Claim kodni yuklamaydi yoki boshqa PCga ulanmaydi.
Loyiha kartasidagi kod papkasi/remote bilan alohida ishlang. Status remote holatni o'qiydi.

## Natijani yuborish
```powershell
 python tools/hub.py validate
 git diff
 git add -- projects/bronbar.md INDEX.md
 git diff --cached
 git commit -m "bronbar: telefon tekshiruvi holati"
 git push origin main
 python tools/hub.py finish --task ID --owner Codex/PC1/session1 --result "Kod: repo/branch/commit; Hub: commit; prodga o'rnatilmadi" --tests "Test buyrug'i va natijasi" --next-step "PC1 da tekshirish"
```
ID o'rniga claim javobidagi ID. Result, tests, next-step bo'sh bo'lmasin.
Block va cancel ham shu argumentlarni oladi. Block vazifani band holda saqlaydi.
Finish ish bosqichi yakunini bildiradi; prodga yetkazish holati result ichida alohida yoziladi.

## Git to'qnashuvi
Push rad etilsa git status ni tekshiring. Toza bo'lsa git fetch origin va git rebase origin/main.
Konflikt chiqsa ikkala o'zgarish ma'nosini saqlab tuzating; faqat aniq fayllarni stage qilib,
rebase --continue, validate, diff va oddiy push. Ishonch bo'lmasa git rebase --abort,
vazifani block qilib sababni yozing. Begona/saqlanmagan o'zgarish ustida rebase qilmang.

## Himoya
- Alohida hub-coordination branchida vazifa tarixi turadi; main tarkibiga tegilmaydi.
- Da'vo fast-forward push o'tgach beriladi. Ikki raqibdan biri rad etilib, yangi holatni o'qiydi.
- Har amal vaqtinchalik clone'da; agentning staged/tugallanmagan fayllariga tegmaydi.
- Vaqt o'tishi bilan qulf ochilmaydi. Owner nomi tasodifiy xatodan himoya; xavfsizlik
  chegarasi GitHub ruxsatlari. Repo yozuvchisi protokolni ataylab chetlab o'tishi mumkin.
- Tarmoq uzilib push natijasi noaniq bo'lsa status orqali owner/ID ni tekshiring.
- Lokal .git/index.lock barcha mashinalar o'rtasida qulf vazifasini bajarmaydi.

## HubWeb bilan o'tish davri
HubWeb C:\hub nusxasida qolsin; AIlar alohida clone ishlatsin. HubWeb hozir claim'ni
tekshirmaydi. AI vazifasi faol paytda o'sha kartani webdan tahrirlamang. Keyingi integratsiya:
HubWeb saqlash/restore operatsiyalarini claim protokoliga ulash va band holatini UI'da ko'rsatish.
Coordination branchini o'chirmang va uning tarixini force bilan o'zgartirmang.

## Tekshiruv
```powershell
 python tools/hub.py validate
 python -m unittest discover -s tools -p test_hub.py -v
```
Validator karta formatini, indeks havolasi/sanasini, uzunlik va konflikt belgilarini tekshiradi.
Holat matnining ma'nosi va haqiqiy prod ishlashini AI tekshiradi. Remote yo'qligi ogohlantirish.
