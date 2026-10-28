# PB016 Úvod do umělé inteligence (podzim 2026)

Přednášející A. Horák (Po 14:00–15:50, záznamy v ISu), cvičení Po 8:00 (uživatel), vede doc. Mgr. Bc. V. Nováček aj. Rozsah 2/2/0, 3 kr., zk. Web: nlp.fi.muni.cz/uui/ (interaktivní osnova = složka Syllabus).

## Hodnocení (zdroj: slidy 1, notebook w01, `fungovani predmetu.txt`)
- **Odpovědníky** na každém cvičení: 12 × max 2 b = 24 b, 4 otázky abc(d), +0,5 správně / −0,25 špatně, 6 min v ISu. Z tématu **předchozí přednášky** a z vyznačených definic ve sbírce. **≥ 10 b nutné k připuštění ke zkoušce.** Max 3 neomluvené absence, bez podpůrných materiálů (jinak −2 b).
- **Průběžná písemka** max 20 b, **úterý 3. 11. 2026 v 20:00** (zadal uživatel), jediný termín. Pokyny z ISu: 40 min, 7 příkladů (6× 3 b, 1× 2 b), jediná správná odpověď, špatná/nejasná −0,5 b, bez odpovědi 0 b; odpovědní list (hodnotí se jen on), jen psací potřeby + ISIC, bez kalkulačky/mobilu (základní výpočty, extra listy na požádání). Rozsah přednášky 1–5 (A + výroková logika), minimum neznámé.
- **Závěrečná písemka** max 60 b, 2 řádné + 1 opravný termín.
- Součet max 104 b: **A > 95, E > 63** (zk). Extra body ve cvičení max 1/cvičení (oprava chyby v materiálech, elegantní řešení).
- Bloky: A (př./cv. 1–4: řešení problémů, kódové cvičení), B (5–7: logika, tužka a papír, zadání v PDF), C (8–12: znalosti, NLP, ML, hluboké učení, generativní modely – kódové).

## Týdny a synchronizace (POZOR: syllabus × přednášky nejsou v jednom týdnu)
Sem. start 14. 9. 2026 (týden 1; přednášky Po 14:00). Cvičení k tématu jsou o týden **po** přednášce (odpovědník ve cvičení k. = téma přednášky k−1; w01 notebook je jen samostudium organizace, první cvičení bylo v týdnu 2). Lekce v appce jsou seskupeny **podle tématu/přednášky**, ne podle týdne notebooku:

| př. | téma | lekce v appce | cvičení (notebook) | ROPOT |
|---|---|---|---|---|
| 1 | úvod, řešení problémů | ai-intro, problem-formulation | w02 (DFS/BFS, n dam) – ROPOT je z př. 1 | 01 |
| 2 | prohledávání | uninformed-search, informed-search, heuristics, dijkstra | w03 (best-first, A*, 8-puzzle) | 02 |
| 3 | dekompozice, CSP | and-or-graphs, csp | w04 (AND/OR drak, python-constraint) | 03 |
| 4 | hry | minimax, alpha-beta, games-advanced | w05 (piškvorky, minimax, alfa-beta) | – |
| 5 | logický agent, výrokovka | logic-agent, propositional, normal-forms | w06+ (logika – PDF zadání, pen&paper) | – |
| 6 | PL1 | fol-basics, fol-forms, other-logics | w07+ | – |
| 7 | inference, rezoluce | resolution, resolution-fol (**jen ze sbírky kap. 7**) | w07+ | – |
| 8 | reprezentace znalostí, nejistota | knowledge-repr, probability-bayes (**jen ze sbírky kap. 8**) | | – |
| 9 | NLP | grammars (**jen kap. 9.2; předzpracování dat prázdné**) | | – |
| 10–11 | učení, stromy, neurony, hluboké učení | decision-trees, perceptron, neural-nets (**jen kap. 10–11**; CNN/hluboké učení chybí) | | – |
| 12 | generativní modely | language-models (**jen kap. 12.2–12.3**; etika AI prázdná) | | – |

Dnes (28. 10.) je týden 7; slidy jsou jen uui01–06. Lekce př. 7–12 vznikly ze sbírky (kap. 7–12) předem – nejsou v rozsahu průběžné písemky (př. 1–5), ale jsou v coversModules zkoušky.

## Co je hotové
- Kurz `pb016`: 26 lekcí (př. 1–6 podle slidů; **př. 7–12 jen ze sbírky, rozpracováno – po nahrání slidů zkontrolovat a doplnit**), 209 otázek (všechny s hints; číselné odpovědi a pořadí algoritmů ověřeny skriptem: A*/greedy na Rumunsku, Dijkstra, alfa-beta, počty obarvení/řešení CSP, SEND+MORE, pravdivostní tabulky, 8-puzzle h1/h2).
- Milníky: odpovědníky (14. 12. = poslední cvičení; kumulativní, zadáno 5,25 b), průběžná písemka (3. 11. 20:00), závěrečná (bez data).
- ROPOT trainer: 76 ručních otázek `ro-<lekce>-<n>` (easy/hard, přednášky 1–12) + 9 generátorů (`src/core/ropotGen.ts`: posunovačka h1/h2, další uzel greedy/UCS/A*, pořadí DFS/BFS, obarvení cesty/cyklu, minimax a alfa-beta, pravdivostní tabulky, entropie, perceptron, bigram/perplexita).
- `materials` v course.json: lecture 7, syllabus 6, seminar 6, ropot 4 (nejstarší týdny bez zpracovaného materiálu; seminar od 6, protože cvičení 1–5 byla v Syllabus notebookech). Modul `fol` (př. 6) není v rozsahu průběžné písemky.
- ROPOT 01–03 (viz níže) zapracovány do otázek (`ai-optimization-which`, `ai-turing-players`, `pf-sort-configs`, `pf-queens-n3`, `pf-4queens-actions`, `is-astar-f`, `is-greedy-pick`, `us-properties`, `ao-tictactoe-leaves`, `ao-solutions-rn`, `csp-count-zero`, `csp-queens-model`).
- Výsledky odpovědníků (uživatel, z ROPOTs): 01 = 2,0 b (4/4), 02 = 1,25 b (3 správně, 1 špatně: greedy → správně D, uživatel zvolil B), 03 = 2,0 b (4/4) ⇒ **5,25 b z 6**. Seedováno přes `initialParts` (2; 1,25; 2), v appce lze body po týdnech upravit tlačítkem „by week“ u milníku odpovědníků.

## Zpracované zdroje (sources/PB016, smazáno po zpracování)
- Slidy uui01–uui06 (+ handouty) a Dijkstra_a_A_star_VM_2026 (24. 3. 2026, V. Míč): zpracováno do lekcí 1–6.
- Notebooky w02–w05 (zadání i řešení) a w01 (organizace): zpracováno (koncepty do lekcí, kód do `free` otázek `us-code-*`, `csp-code-python`, `ao-code-dragon`, `mm-code-tictactoe`).
- ROPOTs 01.png–03.png: viz výše.
- Nezpracováno/zachováno: `Lectures/sbirka/*` – sbírka příkladů (12 kapitol) vč. klíče a shrnutí; využita jen pro definice a vybrané příklady kap. 1–6. Číslované příklady (kap. 1–6) lze ještě převést na otázky; kap. 7–12 zpracovány jen jako rozpracované lekce (viz výše).

## Chyby / poznámky ke zdrojům
- Slidy 4: odhad backgammon „20 × (21·20)³ ≈ 1,2·10⁹“ – přepočet dává ≈ 1,5·10⁹ (neopisovat).
- Grafy ve sbírce jsou v PDF jen obrázky; příklady s grafy se rekonstruují (viz `informed-search`, `dijkstra` – vlastní grafy, výsledky ověřeny).

## Otevřené položky (viz course.json → openItems)
- Minimum průběžné písemky; termíny zkoušky.
- Slidy přednášek 7–12 (inference/rezoluce, reprezentace znalostí, NLP, strojové učení, hluboké učení, generativní modely).
- Materiály po týdnech řeší pole `materials` (viz výše), ne openItems. ROPOTs od 04 dál: složka `ROPOTs` je prázdná, po nahrání převést na `choice` otázky.
- Připomínat každý týden: nové soubory v ISu (slidy dalších přednášek, notebooky, ROPOTs).

## Audit lekcí proti sbírce (28. 10. 2026)
Sbírka (kap. 1–12 včetně klíče) byla znovu projita proti lekcím. Slidy uui01–06 jsou smazané a nově je nešlo ověřit, proto je tento seznam jediná stopa po tom, co je pokryto.

| kap. sbírky | lekce | stav |
|---|---|---|
| 1.1 Turing, diskuzní příklady 1.1.x | ai-intro | doplněno (čínský pokoj, Turingův seznam, Evans, racionalita, prostředí); příklady 1.1.1–1.1.4 jsou diskuzní, bez klíče |
| 1.2 Řešení problémů (1.2.1–1.2.3) | problem-formulation | doplněno (sudoku, přiřazení, batoh, 3 v řadě, optimalizační ano/ne); 1.2.4–1.2.5 jsou implementace (cvičení) |
| 2.1–2.2 | problem-formulation, uninformed-search | doplněno (n dam jako graf, posunovačka d≤31, piškvorky) |
| 2.3 Neinformované | uninformed-search | doplněno (binární cesta 2k/2k+1, limit DLS, DFS×BFS) |
| 2.4 Heuristické | informed-search, heuristics, dijkstra | doplněno (best-first speciální případy, tree×graph search, greedy skáče, součet/max heuristik, věž/král/jezdec) |
| 3.1 AND/OR | and-or-graphs | doplněno (integrál, listy jako AND/OR, bipartitní tvar, Hanoj) |
| 3.2 CSP | csp | doplněno (typová inference, kouzelný/latinský čtverec, algebrogram, zebra, figury, stavový graf) |
| 4.1–4.3 Hry | minimax, alpha-beta, games-advanced | doplněno (co jde modelovat, složitost, minimax ⊇ AND/OR, worst case, transformace listů, uzly náhody) |
| 5 Výroková logika, NF, spojky | propositional, normal-forms, logic-agent | doplněno (syntax, vyplývání, monotónie, počty formulí/spojek, {¬,⇒}, ÚKNF triky) |
| 6 PL1 | fol-basics, fol-forms | doplněno (jazyk, volné/vázané, hodnota termu, pořadí kvantifikátorů, tautologie); Skolem a PNF už byly |
| 7 Rezoluce, SLD, unifikace, Prolog | resolution, resolution-fol | bylo kompletní (lekce vznikly ze sbírky) |
| 8.1–8.2 Ontologie, sém. sítě, rámce | knowledge-repr | beze změny (nekontrolováno do hloubky) |
| 8.3–8.4 Pravděpodobnost, Bayes | probability-bayes | doplněno (axiomy, tabulka složeného rozdělení, podmíněné z tabulky); 8.4 bez změny |
| 9.1, 9.3 Předzpracování, syntaktická analýza | grammars | doplněno (9.3.1 sbírka řešení neuvádí, značky Penn Treebank jsou z mé znalosti) |
| 10 ML úvod, 10.1–10.5 | decision-trees, perceptron | doplněno (typy učení, konzistentní strom, perceptronový algoritmus, lineární regrese) |
| 11 Neuronové sítě | neural-nets | doplněno (funkce z P/ReLU, řetězové pravidlo, online algoritmus, softmax odhadem); CNN ve sbírce není |
| 12.1 Etika, 12.2–12.3 | language-models | doplněno (etika jako diskuzní příklady bez klíče, Markov, greedy není optimum) |

Zbývá: porovnat se slidy 7–12 (zatím nejsou), příklady 8.1.x–8.2.x (ontologie, sémantické sítě) a 8.4.x projít stejně podrobně jako ostatní kapitoly, číslované příklady kap. 1–6 lze dál převádět na další otázky.
