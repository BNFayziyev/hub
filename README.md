# Hub — loyihalar va AIlar hamkorligi

Hub kartalarda loyiha holatini, alohida coordination branchida esa kim nima qilayotganini saqlaydi.
Har AI avval AGENTS.md va COORDINATION.md ni o'qiydi. Python 3.10+ va Git kerak.

## Ish tartibi
1. Har AI sessiyasi uchun alohida Hub clone.
2. Sync → kerakli karta → status → claim.
3. Alohida kod ish nusxasida vazifani bajarish va tekshirish.
4. Karta va INDEX yangilanishi → validate → aniq fayllarni commit/push.
5. Finish: kod commit, test va boshqa kompyuterga yetkazish holati.

Buyruqlar: [COORDINATION.md](COORDINATION.md). Vazifalar: `python tools/hub.py status`.
Hub GitHub manzili: https://github.com/BNFayziyev/hub

## Boshqa loyiha papkasidan foydalanish
Har sessiyada AIga ayting: "Hub nusxam <to'liq yo'l>. Undagi AGENTS.md ga amal qil."
Loyiha papkasiga uch AI uchun havola o'rnatish:
```powershell
 .\setup\install-ai.ps1 -ProjectPath C:\loyiha -HubPath C:\hub-agents\session1
```
Skript AGENTS.md, CLAUDE.md, GEMINI.md ga boshqariladigan bo'lim qo'shadi, mavjud matnni
saqlaydi va o'zgaradigan faylning zaxirasini oladi. Bitta loyiha papkasini sessiyalar o'rtasida
bo'lishmang. O'rnatishdan keyin AIga yangi qoidalarni o'qiting.
Eski global Claude ulanishi bor kompyuterlarda eski install-claude.ps1 ni takror ishlatmang;
uning global qoidalarini yangi tartibga moslash kerak. AGENTS.md dagi protokol ustun.

## Kompyuterlarni ulash
COMPUTERS.md dagi yo'llar va ulanish holatini haqiqiy tekshiruv asosida to'ldiring.
GitHubga kirish boshqa PCga masofaviy kirish bermaydi. Kod repositoriylari alohida ulanadi.
HubWeb ishlatadigan C:\hub faqat HubWeb nusxasi bo'lsin. Faol AI vazifasi kartasini webdan
integratsiya tugaguncha tahrirlamang. Qolgan ishlar: projects/hub.md.

## Veb-chat
Git vositasi bo'lmagan chat faqat taklif tayyorlaydi. prompts/start.md dan foydalaning.
Yozishni lokal AI claim olgach amalga oshiradi.

## Tekshiruv
`python tools/hub.py validate` va `python -m unittest discover -s tools -p test_hub.py -v`.
Hech qachon parol, token yoki .env qiymatlarini Hubga yozmang.
