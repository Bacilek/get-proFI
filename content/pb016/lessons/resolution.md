## Intuice

Rezoluce je **jediné pravidlo**, kterým se dá mechanicky dokázat vyplývání. Místo „odvozuj, co jde“ **dokazuješ sporem**: přidáš negaci závěru a snažíš se odvodit **prázdnou klauzuli** □ (kontradikci). Pro Hornovy klauzule (Prolog) stačí navíc přímočará SLD rezoluce a řetězení.

> Zdroj: sbírka (kap. 7) – slidy přednášky 7 zatím nejsou k dispozici; po jejich nahrání zkontrolovat.

## Vzorec

**Klauzule jako množina literálů:** $\ell_1\vee\dots\vee\ell_n\equiv\{\ell_1,\dots,\ell_n\}$; □ = prázdná klauzule (nesplnitelná).

**Rezoluční pravidlo:** z $\{p,\ell_1,\dots,\ell_n\}$ a $\{\neg p,\ell'_1,\dots,\ell'_m\}$ odvoď **rezolventu** $\{\ell_1,\dots,\ell_n,\ell'_1,\dots,\ell'_m\}$. Příklad: $\{\neg p,q\},\{r,\neg q\}\vdash\{\neg p,r\}$; $\{\neg p,r,\neg t,u\},\{\neg r\}\vdash\{\neg p,\neg t,u\}$.
**Korektnost:** rezolvent zachovává pravdivost v interpretaci (ve které jsou pravdivé obě klauzule je pravdivá i rezolventa). Odvodíš-li □, je množina nesplnitelná.
**Rezoluce se provádí na JEDNOM literálu naráz!** $\{p,q\},\{\neg p,\neg q\}$ ⇒ □ by byl chybný (interpretace $p=0,q=1$ splňuje obě klauzule).

**Důkaz:** (I) přímé odvození závěru, nebo (II) **rezoluční vyvrácení** $T\cup\{\neg\varphi\}\vdash\square$ (Věta: $T\models\varphi\iff T\cup\{\neg\varphi\}$ nesplnitelná). Zapisuje se **rezolučním stromem** (listy = předpoklady, vnitřní uzly = rezolventy).
Negace závěru: $\neg(p\Rightarrow r)\equiv p\wedge\neg r$ ⇒ klauzule $\{p\}$, $\{\neg r\}$. Negace $\neg(a\wedge b)\to\{\neg a,\neg b\}$.

**Hornovy klauzule:** nejvýše **jeden pozitivní literál**. V uspořádaném zápisu je pozitivní literál první:
- **fakt** $[p]$ (jeden pozitivní literál),
- **pravidlo** $[p,\neg q_1,\dots,\neg q_m]$ ($p\Leftarrow q_1\wedge\dots\wedge q_m$),
- **cíl** $[\neg p_1,\dots,\neg p_n]$ (jen negativní literály = dotaz).

**SLD rezoluce** (lineární rezoluce na uspořádaných klauzulích s výběrovým pravidlem): začni cílem, rezolvuj vždy **první literál** cíle s hlavou pravidla/faktu:
$[\neg p_1,\dots,\neg p_n]$ a $[p_1,\neg q_1,\dots,\neg q_m]\vdash[\neg q_1,\dots,\neg q_m,\neg p_2,\dots,\neg p_n]$.
Rezoluční strom má tvar jedné větve; je **úplná pro Hornovy klauzule**. **SLD strom** zachycuje všechny možnosti (větví se tam, kde jde použít víc faktů/pravidel); úspěšná větev končí □, větev bez použitelného pravidla = neúspěch; může být nekonečná. **Prolog** prohledává SLD strom do hloubky zleva doprava (priorita pravidel dle pořadí v programu).

**Prolog:** fakt `p.` = $[p]$; pravidlo `p :- q, r.` = $p\Leftarrow q\wedge r$ = $[p,\neg q,\neg r]$; dotaz `?- s, r.` přidá cíl $[\neg s,\neg r]$.

**Dopředné řetězení** (forward chaining; Horn KB): `count[klauzule]` = počet dosud neodvozených symbolů premisy, `queue` na počátku fakta. Vyber symbol z fronty; není-li odvozen, označ jej a sniž `count` klauzulí, v jejichž premise je; při `count=0` přidej její důsledek do fronty. Končí, když je odvozen dotaz. **Zpětné řetězení** jde od dotazu k faktům (Prolog). Obojí **lineární** v délce KB.

## Mini příklad

Z $\{p\Rightarrow q,\,q\Rightarrow r\}$ plyne $p\Rightarrow r$: klauzule $\{\neg p,q\},\{\neg q,r\}$ + negace závěru $\{p\},\{\neg r\}$.
$\{\neg p,q\}+\{p\}\to\{q\}$; $\{q\}+\{\neg q,r\}\to\{r\}$; $\{r\}+\{\neg r\}\to\square$ ✓.

SLD: program $1\!:\![q,\neg r]$, $2\!:\![q,\neg t]$, $3\!:\![q]$, $4\!:\![r]$, $5\!:\![u,\neg q]$, $6\!:\![s]$, cíl $[\neg s,\neg u]$:
$[\neg s,\neg u]\overset{6}{\to}[\neg u]\overset{5}{\to}[\neg q]\overset{1}{\to}[\neg r]\overset{4}{\to}\square$ (úspěch; větev přes 2 selže, přes 3 uspěje).

Dopředné řetězení, KB: $(B\wedge D)\Rightarrow E$, $A\Rightarrow B$, $(A\wedge F)\Rightarrow D$, $F\Rightarrow A$, $C\Rightarrow B$, fakt $F$; dotaz $E$: fronta $F\to A\to(B,D)\to E$ ⇒ $E$ odvozeno v 5. iteraci (odvozeno: $F,A,B,D,E$; $C$ ne).

## Pozor

> - **Jen jeden literál** v kroku (nelze eliminovat $p$ i $q$ zároveň).
> - V rezolventě **nezapomeň** na zbylé literály obou klauzulí; duplicity splynou (množina).
> - Při vyvracení **přidáváš negaci závěru**, ne závěr.
> - SLD rezoluce je úplná **jen pro Hornovy klauzule**; obecná KB potřebuje obecnou rezoluci.
> - SLD strom může obsahovat **nekonečnou větev** (např. $t\leftarrow s$, $s\leftarrow t$) – Prolog se pak zacyklí, i když úspěšná větev existuje.
> - Rezoluce nic „nedokazuje přímo“: nesplnitelnost $T\cup\{\neg\varphi\}$ ⇔ $T\models\varphi$.

## Praxe

Rezoluční stromy, SLD odvození, Hornovy klauzule a řetězení.
