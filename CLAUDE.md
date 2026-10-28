# get-proFI – orientace pro Clauda

Osobní studijní appka (lokální web, React 19 + TS + Vite, Tailwind, Dexie/IndexedDB, Vitest). Uživatel: student FI MUNI (prog. a vývoj aplikací), opakuje problémové předměty. Jeden "kurz" na předmět, roadmapa/skill tree, milníky, mezery, drill. Podrobnosti:

- `docs/ROADMAP.md` – plán fází a **aktuální stav** (číst první, po každém větším kroku aktualizovat).
- `docs/CONTENT-GUIDE.md` – formát obsahu kurzu a pravidla pro zhušťování slidů.
- `content/<kód>/README.md` – stav a poznámky ke konkrétnímu předmětu (data, bodování, co je hotové).

## Konvence
- UI anglicky; obsah předmětů česky (anglické termíny ponechat, pokud je zdroj anglicky; anglicismy jen přirozené).
- Gamifikace jen jemná: skill tree, hvězdy 0–3, achievementy, boss = zkoušky/písemky. Žádné XP/streaky.
- Commity malé a lokalizované (zpráva anglicky, stručně) + `Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>`. Push po ověření (`npm test && npm run lint && npm run build`).
- **Struktura `sources/<KÓD>/`** (u každého nového předmětu udržovat): `Lectures/` (slidy aj.), `Seminars/` (věci z cvik), `ROPOTs/` (odpovědníky), `Syllabus/` (interaktivní osnova, pokud ji předmět má) + textový soubor `course.txt` (podmínky/fungování + katalog předmětu; u starších předmětů se může jmenovat jinak, např. `fungovani predmetu.txt`). **Když uživatel některou z těchto 4 složek smaže, předmět ji nevyužívá – nikdy ji neobnovovat.** Prázdné složky nechat (uživatel do nich průběžně nahrává).
- Zdroje v `sources/` jsou neverzované; co je zpracované a už nepotřeba, se maže (nejdřív zaznamenat do `content/<kód>/README.md`, co bylo zpracováno).
- Text z PDF: `pdftotext -enc UTF-8 -layout` (diakritika ze slidů vychází jako kombinující znaky, např. `ˇc`); skeny bez textové vrstvy číst jako obrázky (Read na PDF s `pages`).
- Uživatel studuje u svých materiálů průběžně; každý týden přibývají soubory v ISu → při práci na kurzu se zeptat/připomenout, zda jsou nové.
- Po větších krocích navrhnout uživateli `/clear` (kontext je uložen v docs/ a CLAUDE.md).

- Uživatel někdy odchází spát/pryč a nechce otázky: rozhodovat za něj, nejistoty zapsat do README předmětu a do `openItems`, nechat se opravit až potom.

## Chybějící informace ("vykřičník")
Cokoli, co musí doplnit uživatel (data písemek/zkoušek, pravidla bodování, nové soubory z ISu...), se eviduje v `course.json` → `openItems` a milníky bez `date` (viz `src/core/missing.ts`). Appka je ukazuje s varováním u předmětu i na dashboardu. Při práci na kurzu uživatele aktivně upozorni, které položky stále chybí, a po doplnění je odstraň.
