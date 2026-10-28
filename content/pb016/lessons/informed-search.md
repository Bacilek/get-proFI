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

**Vztahy a pravidla (sbírka 2.4):**
- **Best-first search** = obecná kostra s prioritní frontou podle $f$. DFS ($f=-\text{depth}$), BFS ($f=\text{depth}$) a UCS ($f=g$) jsou její speciální případy. BFS je navíc UCS se stejnými cenami hran a **UCS je A\* s $h\equiv0$** (ta je přípustná i konzistentní).
- **Tree-search × graph-search:** tree-search si nepamatuje navštívené uzly, a proto může cyklit (greedy s „lákavou“ slepou uličkou donekonečna). Graph-search cykly ošetří.
- **Greedy „skáče“:** pořadí expandovaných uzlů se může lišit od výsledné cesty, protože se vrací k libovolnému dříve objevenému uzlu s nejmenším $h$.
- **Přípustnost × konzistence:** konzistentní ⇒ přípustná; opak neplatí (protipříklad $h(A)>c(A,B)+h(B)$). $h\equiv0$ je vždy obojí, takže vhodná heuristika vždy existuje. **Max/min** přípustných heuristik je přípustné, **součet** ne.
- **Cena mění přípustnost:** Manhattanská vzdálenost je přípustná pro posun políček po jednom, ale pro věž, která jde o libovolný počet polí za jeden tah, **není** (nadhodnocuje); byla by přípustná, kdyby se cena měřila v projitých polích.
- DFS nemusí expandovat víc uzlů než A\* (může mít štěstí); BFS je úplné i s nulovými cenami hran (nulové hrany ale mohou ohrozit úplnost UCS).

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
