## Intuice

Než začneš řešit problém, musíš ho **zformulovat**: co je konfigurace, které z nich jsou řešení a (případně) co je „nejlepší“. Skoro všechno rozhoduje, **jak zvolíš reprezentaci** – stejný problém může mít $10^{14}$ nebo $4\cdot10^{4}$ konfigurací.

## Vzorec

**Problém** = množina *konfigurací* + vlastnost, kterou mají mít řešení. **Optimalizační problém** = hledáme konfiguraci *nejlepší* podle kritéria (plánování zisku, nejkratší cesta). Pouhé *nalezení platného řešení* (sudoku, zavření lednice) optimalizační problém **není**.

**Formální definice pro prohledávání:** počáteční stav, přechodové akce (+ nezáporná cena), cílová podmínka. Implicitně zadávají **stavový prostor** (graf: stavy = uzly, akce = hrany). Řešení = cesta z počátečního do cílového stavu.

**Problém $n$ dam** ($n$ dam na šachovnici $n\times n$ tak, aby se žádné dvě neohrožovaly po řádku, sloupci ani diagonále). Postupně zmenšujeme počet konfigurací:

| reprezentace | počet konfigurací | pro $n=8$ |
|---|---|---|
| I: $n$ dam, každá libovolné pole | $(n^2)^n$ | $\approx 2{,}8\cdot10^{14}$ |
| I’: množina souřadnic (bez opakování pozic) | $\dfrac{n^2!}{(n^2-n)!}$ | $\approx 1{,}8\cdot10^{14}$ |
| II: dáma na sloupec, seznam $y$ | $n!$ (permutace) | $40\,320$ |
| III: navíc udržuj volné řádky a diagonály $u=x-y$, $v=x+y$ | – | $2\,057$ prozkoumaných |

Počet řešení pro $n=8$: **92** (pro $n=3$: **0**, $n=4$: 2, $n=5$: 10, $n=6$: 4).

**Optimalizační, nebo ne?** Rozhoduje, zda hledáme *libovolné platné* řešení, nebo *nejlepší* podle kritéria. Plánování semestru (co nejvíc kreditů a zároveň co nejvíc volného času) je optimalizace, naskládání nákupu tak, aby šla zavřít lednice, není: stačí jakékoliv řešení.

**Další klasické problémy ze sbírky (1.2):**

| problém | reprezentace | počet konfigurací | optimalizační? |
|---|---|---|---|
| **Sudoku** $n\times n$, zadáno $k$ políček | matice $n\times n$, zadaná políčka s příznakem neměnnosti | doplnit $n^2-k$ políček z $n$ hodnot: $n^{\,n^2-k}$ | ne (stačí platné vyplnění) |
| **Přiřazení** ($n$ úkolů, $n$ pracovníků, cena $c(t,w)$, minimalizuj celkovou cenu) | pole $A$, $A[i]$ = úkol pracovníka $i$ | $n^n$; bez opakování úkolů (permutace) jen $n!$ | **ano** (min. cena) |
| **Batoh** ($n$ položek s váhou $w_i$ a hodnotou $v_i$, nosnost $W$; maximalizuj hodnotu) | množina vybraných položek $M\subseteq\{1..n\}$, nebo pole $n$ booleanů | $2^n$ (obě reprezentace jsou **ekvivalentní**, odtud $\sum_i\binom ni=2^n$) | **ano** (max. hodnota) |
| **Žádné tři v řadě** (mřížka $n\times n$, kolik bodů lze umístit, aby žádné tři neležely v přímce) | matice 0/1 $n\times n$ | $2^{n^2}$ | **ano** (co nejvíc bodů) |

U přiřazení není každá konfigurace přípustná: jeden úkol může dostat víc pracovníků, takže vedle ceny se musí kontrolovat **přípustnost**. Pro „žádné tři v řadě“ plyne z povahy problému, že na řádku jsou **nejvýše 2 body**: řádek pak stačí uložit jako dvojici souřadnic (nebo `null`), což dává $1+n+\binom n2=\frac{n^2+n+2}{2}$ možností na řádek a celkem $\left(\frac{n^2+n+2}{2}\right)^{n}$ konfigurací. Asymptoticky $2^{\Theta(n^2)}\to 2^{\Theta(n\log n)}$. Na mřížce $3\times3$ je maximum 6 bodů.

**Problém $n$ dam jako problém prohledávání:** počáteční stav = prázdná šachovnice; akce = přidej dámu (pokud jich tam ještě není $n$), cena 1; cíl = $n$ dam, žádné dvě se neohrožují. V přechodovém grafu vede hrana ze stavu $s$ do $t$, právě když $t$ vznikne z $s$ přidáním jedné dámy.

**Metriky stavového prostoru:** $b$ – faktor větvení (max. počet následníků), $d$ – hloubka cíle (nejkratší cesta k cíli), $m$ – maximální hloubka. U $n$ dam v pozice-po-pozici modelu: $b=n^2$, $d=n$, $m=n$.

**Posunovačka** (hra $m\times m$, $n=m^2-1$ kamenů; akce = pohyb mezery): 8-posunovačka má $9!/2=181\,440$ dosažitelných stavů (polovina konfigurací je nedosažitelná), $b\le 4$. Optimální řešení obecné $n$-posunovačky je **NP-úplné**.

## Mini příklad

Úkol: seřadit $n$ různých čísel vzestupně hrubou silou (generují se všechny posloupnosti a testuje se seřazenost). Konfigurace = permutace $\Rightarrow n!$ stavů. Pro $n=3$: $3!=6$.

## Pozor

> - **Počet konfigurací** ≠ počet řešení. Problém $n$ dam pro $n=3$ má $\binom{9}{3}=84$ možných rozmístění (množina), ale **0** řešení.
> - Redukce prostoru je legální, jen když **neztratíš řešení** (každá dáma ve vlastním sloupci neubere žádné řešení, protože dvě v jednom sloupci by se ohrožovaly).
> - Sudoku/n dam = *hledání platné konfigurace*, ne optimalizace. Nejkratší cesta/nejlevnější let, přiřazení, batoh, „žádné tři v řadě“ = optimalizace.
> - Jiná datová struktura pro stejné konfigurace (množina vs. pole booleanů u batohu) **nemění počet konfigurací**; počet snižuje až zahrnutí vlastností řešení do návrhu.

## Praxe

Zformuluj problémy, spočítej konfigurace a urči $b$, $d$, $m$.
