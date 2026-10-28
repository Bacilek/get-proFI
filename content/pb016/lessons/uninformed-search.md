## Intuice

Stavový prostor je (implicitní) graf. Prohledávání = opakované **expandování uzlů** z kolekce „ke zpracování“; **způsob výběru uzlu** (zásobník, fronta, prioritní fronta) určuje strategii. Neinformované strategie znají jen počáteční stav, přechody a cíl – prohledávají „slepě“.

## Vzorec

**Kostra:** `process = {init}`; dokud neprázdné: vyber uzel, jestli je cíl → konec, jinak přidej jeho následníky.

**Vlastnosti strategií:** úplnost (najde řešení, pokud existuje), optimálnost (najde nejlepší), časová a prostorová složitost. Parametry: $b$ faktor větvení, $d$ hloubka nejmělčího cíle, $m$ maximální hloubka, $\ell$ limit, $C^*$ cena optimálního řešení, $\epsilon$ minimální cena hrany.

| strategie | úplná | optimální | čas | prostor |
|---|---|---|---|---|
| **DFS** (do hloubky, zásobník/rekurze) | ne (nekonečná větev, cykly) | ne | $O(b^m)$ | $O(bm)$ |
| **DLS** (s limitem $\ell$) | ano pro $\ell\ge d$ | ne | $O(b^\ell)$ | $O(b\ell)$ |
| **BFS** (do šířky, FIFO) | ano ($b$ konečné) | ano pro délku cesty / ne pro obecnou cenu | $O(b^{d+1})$ | $O(b^{d+1})$ |
| **UCS** (podle ceny, prioritní fronta podle $g$) | ano ($\text{cena}\ge\epsilon$) | ano | $O(b^{1+\lfloor C^*/\epsilon\rfloor})$ | totéž |
| **IDS** (postupné prohlubování, DFS s $\ell=0,1,2,\dots$) | ano | ano (pro rovnoměrnou cenu) | $O(b^d)$ | $O(bd)$ |

**Pořadí návštěv:** při více následnících (typicky abecedně) DFS jde „doleva dolů“ a vrací se (backtrack), BFS prochází po úrovních. DFS používá **zásobník** (LIFO), BFS **frontu** (FIFO).

**IDS** kombinuje výhody: paměť jako DFS (lineární), úplnost a optimalitu jako BFS. Opakované generování vrchních vrstev je zanedbatelné – většina uzlů je v poslední vrstvě. Je to nejvhodnější neinformovaná strategie pro velké prostory a neznámou hloubku řešení.

## Mini příklad

$b=10$, $d=5$: počet vygenerovaných uzlů
$N(\text{IDS})=50+400+3000+20000+100000=123\,450$ (úroveň $i$ se generuje $(d-i+1)$krát),
$N(\text{BFS})=10+100+1000+10000+100000+999\,990=1\,111\,100$ (BFS generuje ještě následníky celé poslední vrstvy).

BFS paměť: pro $b=10$ je hloubka 8 ≈ $10^{9}$ uzlů ≈ 10 GB; hloubka 12 ≈ 100 TB. Úzkým hrdlem BFS je **paměť**.

## Pozor

> - DFS s limitem **není úplný**, pokud $\ell<d$; a není optimální, pokud $\ell>d$.
> - **BFS je optimální jen pro délku cesty** (rovnoměrné ceny). Pro obecné ceny potřebuješ UCS.
> - IDS má stejnou prostorovou složitost jako DFS jen v $O(bd)$, **ne** $O(bm)$ – mělčí cíl, nižší paměť. Ale v degenerovaném prostoru ($b=1$) je IDS $O(n^2)$ vs. $O(n)$ u DFS.
> - Test cyklu v cestě v pseudokódu je jen volitelný; bez něj DFS cykluje.
> - Při DFS limit v uzlech vs. v hranách: u cvičení dej pozor na definici (kolik uzlů má cesta délky $\ell$).

## Praxe

Simuluj strategie na stromech a grafech, porovnej vlastnosti a spočítej počty uzlů.
