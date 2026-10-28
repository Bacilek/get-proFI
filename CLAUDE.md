# get-proFI – orientace pro Clauda

Osobní studijní appka (lokální web, React 19 + TS + Vite, Tailwind, Dexie/IndexedDB, Vitest). Uživatel: student FI MUNI (prog. a vývoj aplikací), opakuje problémové předměty. Jeden "kurz" na předmět, roadmapa/skill tree, milníky, mezery, drill. Podrobnosti:

- `docs/ROADMAP.md` – plán fází a **aktuální stav** (číst první, po každém větším kroku aktualizovat).
- `docs/CONTENT-GUIDE.md` – formát obsahu kurzu a pravidla pro zhušťování slidů.
- `content/<kód>/README.md` – stav a poznámky ke konkrétnímu předmětu (data, bodování, co je hotové).

## Konvence
- UI anglicky; obsah předmětů česky (anglické termíny ponechat, pokud je zdroj anglicky; anglicismy jen přirozené).
- Gamifikace jen jemná: skill tree, hvězdy 0–3, achievementy, boss = zkoušky/písemky. Žádné XP/streaky.
- Commity malé a lokalizované (zpráva anglicky, stručně) + `Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>`. Push po ověření (`npm test && npm run lint && npm run build`).
- Zdroje v `sources/` jsou neverzované; co je zpracované a už nepotřeba, se maže (nejdřív zaznamenat do `content/<kód>/README.md`, co bylo zpracováno).
- Text z PDF: `pdftotext -enc UTF-8 -layout` (diakritika ze slidů vychází jako kombinující znaky, např. `ˇc`); skeny bez textové vrstvy číst jako obrázky (Read na PDF s `pages`).
- Uživatel studuje u svých materiálů průběžně; každý týden přibývají soubory v ISu → při práci na kurzu se zeptat/připomenout, zda jsou nové.
- Po větších krocích navrhnout uživateli `/clear` (kontext je uložen v docs/ a CLAUDE.md).
