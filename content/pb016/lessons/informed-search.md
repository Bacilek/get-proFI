## Intuice

Když o poloze cíle něco tušíš (třeba vzdušnou čarou), expanduj nejdřív uzly, které *vypadají nejlíp*. Ohodnocovací funkce $f(n)$ říká „jak slibný uzel je“; udržuješ **prioritní frontu** podle $f$ (nejmenší první). Různá $f$ = různé algoritmy.

## Vzorec

- $g(n)$ – skutečná cena cesty z počátku do $n$.
- $h(n)$ – **heuristika**: odhad ceny nejlevnější cesty z $n$ do cíle; $h\ge0$, $h(\text{cíl})=0$.
- **Greedy best-first:** $f(n)=h(n)$. Rychlý, ale není optimální ani úplný (cykly, nekonečné prostory); čas/prostor $O(b^m)$.
- **A\*:** $f(n)=g(n)+h(n)$ – odhad ceny nejlevnější cesty vedoucí *přes* $n$.

**Přípustná (admissible) heuristika:** $0\le h(n)\le h^*(n)$ pro všechna $n$, kde $h^*$ je skutečná cena nejlevnější cesty do cíle. Nikdy nepřeceňuje.
**Konzistentní (monotónní) heuristika:** $h(n)\le c(n,m)+h(m)$ pro každý přechod $n\to m$ (trojúhelníková nerovnost). Konzistentní ⇒ přípustná (opak neplatí). Při konzistenci neklesá $f$ podél cesty.

**Vlastnosti A\*** (s přípustnou $h$): úplný (cena hran $\ge\epsilon$, $b$ konečné), **optimální**, čas i paměť $O((b^*)^d)$ (efektivní faktor větvení $b^*$), každý uzel v paměti. A\* expanduje všechny uzly s $f<C^*$, některé s $f=C^*$, žádný s $f>C^*$. Paměť řeší IDA\*, RBFS.

**Důkaz optimality (náčrt):** Nechť $G_2$ je suboptimální cíl ve frontě a $n$ neexpandovaný uzel na optimální cestě k $G_1$. Pak $f(G_2)=g(G_2)>g(G_1)\ge f(n)$ (druhá nerovnost z přípustnosti). Tedy A\* expanduje $n$ dřív než $G_2$.

**Pseudokód:** prioritní fronta záznamů $(f,g,\text{cesta})$; vyber nejmenší $f$, je-li cíl → vrať cestu; jinak přidej následníky s $g'=g+c$ a $f'=g'+h$.

## Mini příklad

Rumunsko, cesta Arad → Bukurešť, $h$ = vzdušná vzdálenost.
**Greedy:** Arad(366) → Sibiu(253) → Fagaras(176) → Bukurešť = **450** (není optimální).
**A\*:** Arad → Sibiu ($f=393$) → Rimnicu Vilcea (413) → Fagaras (415) → Pitesti (417) → Bukurešť ($f=418$): cesta Arad–Sibiu–Rimnicu–Pitesti–Bukurešť = **418** (optimální).

## Pozor

> - A\* potřebuje **přípustnou** $h$ (u grafového varianty se často požaduje konzistence). Bez toho nemusí být optimální.
> - Přípustná ≠ konzistentní: $h$ může být přípustná a přesto porušovat $h(n)\le c(n,m)+h(m)$.
> - Greedy hledá podle $h$, ignoruje $g$ → může jít „zdánlivě bližší“ cestou, která je dražší. V A\* rozhoduje součet.
> - Při remíze $f$ se postupuje podle zadání (typicky abecedně) – v příkladech to vždy bývá uvedeno.
> - A\* nemá žádnou „poslední“ kontrolu: cíl je hotový až když je **vybrán z fronty**, ne když je vygenerován.

## Praxe

Simuluj greedy a A\* na grafech a rozhodni o přípustnosti a konzistenci heuristik.
