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
2. [x] Shell: routing (HashRouter), dashboard (milníky, odpočty, bodové hranice, varování o chybějících info), stránka kurzu (zatím seznam lekcí), Settings se zálohou
3. [x] Skill tree/roadmapa (vrstvy podle prerekvizit, zamčené = přerušovaně, aktuální týden zvýrazněn, boss readiness; hvězdy zatím ručně)
4. [x] Lesson renderer (MD + KaTeX), cvičení (numeric/choice/free), hvězdy z cvičení, self-rating tématu; ukázková lekce `differential` (z vlastních znalostí, překontrolovat proti slidům)
5. [x] Mezery + spaced repetition + math drill generátory (stránka /review: due otázky (SM-2), nejslabší témata, drill; generátory v `src/core/drill.ts` pro derivace, určitý integrál, parciální derivace, geometrickou řadu)
6. [x] Achievementy (odvozené z postupu, bez tabulky; `src/core/achievements.ts`, stránka /achievements)
7. [ ] Předměty: MB142 (rozpracováno, viz `content/mb142/README.md`), pak PB006, PB016, VB001, PV028

## Aktuální stav
Fáze 0–6 hotové (43 testů). MB142: hotové lekce differential, antiderivative, integration-methods, rational-integration, riemann, integral-theorems, definite-integral-methods, integral-applications, improper-integrals. Další: řady (pdf s. 112+, series-intro), nevlastní integrály, řady; potom starší témata. Obsah MB142 (zhušťování slidů do lekcí; tím přibudou otázky do SRS). Drill generátory jsou zatím jen pro MB142 témata.
