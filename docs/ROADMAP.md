# Roadmap a stav

## Rozhodnutí
- Lokální web, bez backendu; progress v IndexedDB, záloha exportem JSON. Obsah kurzů je v repu (`content/`).
- Gamifikace jemná: skill tree s hvězdami, prerekvizity (i mezi předměty), boss uzly = písemky/zkoušky, achievementy. Bez XP/streaků.
- Mezery = self-rating 1–5 na téma + výsledky otázek; spaced repetition; matika s generovanými příklady.
- Lekce = zhuštěná látka ze slidů: čtení → vzorec → mini příklad → praxe, s diagramy.
- Drží se bodové hranice (min. body ke zkoušce atd.) per předmět a ukazují se v UI.

## Fáze
0. [x] Scaffold (Vite/React/TS, Tailwind, Vitest), struktura složek
1. [x] Datový model + Dexie + export/import + testy (`src/core`: types, prereq, progress, srs, milestones, db, backup)
2. [ ] Shell: routing, dashboard (milníky, odpočty, bodové hranice)
3. [ ] Skill tree/roadmapa + zamykání prerekvizit
4. [ ] Lesson renderer (MD + KaTeX + diagramy) + cvičení + hvězdy
5. [ ] Mezery + spaced repetition + math drill generátory
6. [ ] Achievementy
7. [ ] Předměty: MB142 (rozpracováno, viz `content/mb142/README.md`), pak PB006, PB016, VB001, PV028

## Aktuální stav
Fáze 0–1 hotové (core logika + persistence + testy, 21 testů). Další: fáze 2 (shell + dashboard). MB142: podklady přečteny (struktura, formát zkoušky), obsah se tvoří po fázi 4.
