## Intuice

**Dijkstra** hledá nejkratší cesty ze startu do *všech* uzlů; udržuje odhad vzdálenosti a vždy „zafixuje“ nejbližší nezafixovaný uzel. **A\*** je Dijkstra s kompasem: hledá jen *jeden* cíl a přidáním heuristiky $h$ se vyhne prohledávání „špatným směrem“. (Dijkstra = A\* s $h\equiv0$ = prohledávání podle ceny.)

## Vzorec

Podmínky: hrany **nezáporné** ($f(e)\ge0$); algoritmy fungují i na orientovaných grafech.

**Úkol 1** (nejkratší cesty z jednoho uzlu do všech) – Dijkstra. **Úkol 2** (mezi dvěma uzly) – Dijkstra nebo A\*.

**Dijkstra:**
1. `dist[start]=0`, ostatní $\infty$; všechny uzly nezafixované.
2. Vyber nezafixovaný uzel $u$ s nejmenším `dist`, zafixuj ho (jeho vzdálenost je definitivní).
3. Pro každého souseda $v$: `dist[v] = min(dist[v], dist[u] + w(u,v))` (relaxace hrany).
4. Opakuj, dokud jsou nezafixované (dosažitelné) uzly.

Implementace s prioritní frontou: $O((|V|+|E|)\log|V|)$. Úplný a optimální (pro nezáporné hrany); zafixovaný uzel už se nezlepší.

**A\*:** jako Dijkstra, ale pořadí podle $f(n)=g(n)+h(n)$; přípustná $h$ (nepřeceňuje) ⇒ optimální. Silnější heuristika ⇒ méně expandovaných uzlů; $h=0$ ⇒ Dijkstra. S konzistentní $h$ se uzel nemusí expandovat víckrát.

Typické použití: navigace, plánování, pohyb NPC ve hrách, robotika; Dijkstra pro směrování (OSPF).

## Mini příklad

Neorientovaný graf: S–A 7, S–B 2, B–A 3, A–C 1, B–C 8, C–T 4, A–T 9, B–D 5, D–T 6. Dijkstra ze $S$:

| krok | zafixováno | změny |
|---|---|---|
| 1 | S (0) | B=2, A=7 |
| 2 | B (2) | A=5 (přes B), C=10, D=7 |
| 3 | A (5) | C=6, T=14 |
| 4 | C (6) | T=10 |
| 5 | D (7) | T=min(10,13)=10 |
| 6 | T (10) | – |

Nejkratší cesta $S\to T$: S–B–A–C–T, délka **10**.

## Pozor

> - Dijkstra **nefunguje se zápornými hranami** (zafixování by bylo předčasné).
> - Dijkstra expanduje *všechny* uzly bližší než cíl; A\* jen ty „slibné“. Proto A\* pro úkol 2 bývá rychlejší.
> - Zlepšení odhadu `dist` přes novou hranu = **relaxace**; hranu zpět do zafixovaného uzlu nemusíš kontrolovat.

## Praxe

Procvičíš si běh Dijkstry a vztah k UCS/A\*.
