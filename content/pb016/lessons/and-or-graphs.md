## Intuice

Některé problémy se nedají vyřešit jako *cesta*, ale jako **rozklad na podproblémy**: „vyřeš A **a zároveň** B“ (AND) nebo „vyřeš A **nebo** B“ (OR). Takový rozklad kreslíme jako **AND/OR graf**; řešení je *strom*, ne cesta.

## Vzorec

**Příklady dekompozice:** Hanojské věže $n(A,B,C)$ = přesuň $n-1$ disků A→C (pomocí B), 1 disk A→B, $n-1$ disků C→B (pomocí A); počet tahů $2^n-1$. Cesta mezi městy přes hraniční přechod: $a\to z$ = OR přes klíčové body, každý „via $k$“ je AND ($a\to k$ a $k\to z$).

**AND/OR graf:** vnitřní uzly typu **AND** (vyřeš *všechny* následníky) nebo **OR** (stačí *kterýkoliv*); listy = elementární problémy (cílové = vyřešené, necílové = neřešitelné). Značení: OR obdélník, AND elipsa/kruh (nebo oblouk přes hrany).

**Strom řešení** $T$ problému $P$ v grafu $G$:
- kořen = $P$,
- je-li uzel typu **OR**, je v $T$ **právě jeden** z jeho následníků (s jeho stromem řešení),
- je-li uzel typu **AND**, jsou v $T$ **všichni** jeho následníci,
- každý list $T$ je cílový uzel v $G$.
Uzel může být ve stromu ve více kopiích (strom není nutně podgrafem grafu). Počet stromů řešení: OR = **součet** počtů řešení následníků, AND = **součin**.

**Hry jako AND/OR graf:** stav „já na tahu“ = OR (stačí *jeden* výherní tah), stav „soupeř na tahu“ = AND (musí vyhrávat *všechny* jeho tahy). Výherní strategie = strom řešení. Omezení: výhra/prohra (nelze skóre – na to je minimax).

**Nedeterministický svět (vysavač):** akce agenta = OR, náhodná reakce prostředí = AND; řešením je *kontingenční plán*.

**Prohledávání do hloubky:** pro OR uzel zkoušej následníky, vrať první úspěšný; pro AND uzel musí uspět všichni, jinak `failure`; cyklus (uzel už v cestě) = neúspěch.

**AO\*** (heuristické, stejné vlastnosti jako A\*): cena uzlu $N$ (s hranou $M\to N$ o ceně $c(M,N)$):
$$F(N)=c(M,N)+\begin{cases}h(N)&\text{neexpandovaný}\\0&\text{cíl}\\\min_i F(N_i)&\text{OR}\\\sum_i F(N_i)&\text{AND}\end{cases}$$
Při $h\le h^*$ najde optimální strom řešení. Např. cesta mezi městy: $h$ = vzdušná vzdálenost.

## Mini příklad

Kořen $R$ (OR) má následníky $A$, $B$. $A$ (AND): $C$ (OR: listy true, false), $D$ (AND: listy true, true). $B$ (OR): $E$ (list false), $F$ (OR: listy true, true).
- přes $A$: $C$ má 1 řešení (list true), $D$ jedno, $A=1\cdot1=1$;
- přes $B$: $E$ (false) 0, $F$ má 2 ⇒ $B=0+2=2$.
Celkem $1+2=3$ stromy řešení.

AO\*: AND uzel $A$ (hrana z rodiče 1) s dětmi $B$ (hrana 1, $h=3$) a $C$ (hrana 2, $h=4$): $F(B)=4$, $F(C)=6$, $F(A)=1+(4+6)=11$.

## Pozor

> - **Konvence značení** se zadává v textu (obdélník = OR, kruh = AND nebo naopak) – vždy si ji ověř.
> - V **AND** uzlu je jeden neřešitelný následník dost k selhání celého uzlu; v **OR** potřebuješ aspoň jednoho řešitelného.
> - Uzel s jediným následníkem může být AND i OR bez vlivu na sémantiku.
> - Strom řešení u **OR** obsahuje jen *jednoho* následníka, u **AND** *všechny*.
> - Při počítání řešení uvažuj jen ty, kde **všechny listy** jsou cílové (true).

## Praxe

Spočítej stromy řešení, rozliš AND/OR a spočti $F$ pro AO\*.
