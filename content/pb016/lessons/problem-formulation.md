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

**Metriky stavového prostoru:** $b$ – faktor větvení (max. počet následníků), $d$ – hloubka cíle (nejkratší cesta k cíli), $m$ – maximální hloubka. U $n$ dam v pozice-po-pozici modelu: $b=n^2$, $d=n$, $m=n$.

**Posunovačka** (hra $m\times m$, $n=m^2-1$ kamenů; akce = pohyb mezery): 8-posunovačka má $9!/2=181\,440$ dosažitelných stavů (polovina konfigurací je nedosažitelná), $b\le 4$. Optimální řešení obecné $n$-posunovačky je **NP-úplné**.

## Mini příklad

Úkol: seřadit $n$ různých čísel vzestupně hrubou silou (generují se všechny posloupnosti a testuje se seřazenost). Konfigurace = permutace $\Rightarrow n!$ stavů. Pro $n=3$: $3!=6$.

## Pozor

> - **Počet konfigurací** ≠ počet řešení. Problém $n$ dam pro $n=3$ má $\binom{9}{3}=84$ možných rozmístění (množina), ale **0** řešení.
> - Redukce prostoru je legální, jen když **neztratíš řešení** (každá dáma ve vlastním sloupci neubere žádné řešení, protože dvě v jednom sloupci by se ohrožovaly).
> - Sudoku/n dam = *hledání platné konfigurace*, ne optimalizace. Nejkratší cesta/nejlevnější let = optimalizace.

## Praxe

Zformuluj problémy, spočítej konfigurace a urči $b$, $d$, $m$.
