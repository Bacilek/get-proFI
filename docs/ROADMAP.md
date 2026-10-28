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
7. [ ] Předměty: MB142 (rozpracováno, viz `content/mb142/README.md`), PB016 (př. 1–6 hotové, př. 7–12 čekají na slidy, viz `content/pb016/README.md`), pak PB006, VB001, PV028

## Aktuální stav
**PB016 (28. 10. 2026):** kurz `pb016` – 17 lekcí / ~150 otázek pro př. 1–6 (prohledávání, CSP, hry, výrokovka, PL1) hotový; milníky: odpovědníky (24 b, min 10), průběžná písemka (20 b, př. 1–5, datum TBD), zkouška (60 b). Chybí: slidy př. 7–12, materiály ze cvičení 6+, ROPOTs 5+ (viz `openItems`). Syllabus × přednášky jsou posunuté, lekce jsou seskupeny podle témat (tabulka v README předmětu).

Fáze 0–6 hotové (43 testů). Otázky mají volitelné `hints` + tlačítko "Give up" (hotové pro všechny otázky MB142, ~535). Rozpracováno: otázky ze zápočtovek (zápočtovky a ukázkové písemky zpracovány, viz content/mb142/README.md). MB142: hotové lekce basics, limits, continuity, differential, antiderivative, integration-methods, rational-integration, riemann, integral-theorems, definite-integral-methods, integral-applications, improper-integrals, series-intro, series-nonneg, series-alternating, power-series, taylor-series (kap. 3 hotová), derivative-def, derivative-rules, derivative-elementary, derivative-applications, mean-value, lhospital, implicit, taylor, monotonicity, convexity, asymptotes, curve-sketching, optimization (kap. 1 hotová), horner-partial-fractions, multivar-limits, partial-derivatives, multivar-extrema (kap. 2 hotová). Tím je zpracována celá zkoušená látka (kap. 1–3) ze slidů. Kap. 4–8 (DR, integrály více proměnných, Fourier, metrické prostory, interpolace) zpracovány do 15 nových lekcí v modulech ode, multiint, fourier, metric, interp (viz README předmětu); zatím nejsou v coversModules milníků. Sken Priklady_k_prednaskam zpracován (př. 1–118 → otázky pk-*). Zdroje už jen nové soubory z ISu. Dříve plánováno: zkontrolovat zbylé zdroje (sbírka příkladů, ukázková zkouškovka, zápočtovky 2025 – využít na procvičovací otázky/drill), nové soubory z ISu; kap. 4–8 jsou jen pracovní verze. Obsah MB142 (zhušťování slidů do lekcí; tím přibudou otázky do SRS). Drill generátory jsou zatím jen pro MB142 témata.
