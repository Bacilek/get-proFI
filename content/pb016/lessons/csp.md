## Intuice

Místo „černé skříňky“ stavu (jen cílový test + přechody) popíšeš problém **deklarativně**: *proměnné*, jejich *domény* a *omezení*. Obecný řešič pak využije strukturu problému (a obecné heuristiky), nejen tvoji specifickou znalost.

## Vzorec

**CSP (Constraint Satisfaction Problem):**
- proměnné $X_1,\dots,X_n$ s neprázdnými doménami $D_1,\dots,D_n$,
- omezení $C_1,\dots,C_m$ (každé je podmnožinou $D_1\times\dots\times D_n$ nebo relace nad několika proměnnými),
- (někdy) účelová funkce $f$ → **COP** (constraint optimization problem).

**Stav** = (částečné) přiřazení hodnot. *Konzistentní* přiřazení neporušuje omezení; *úplné* přiřazuje všechny proměnné. **Řešení = úplné konzistentní přiřazení.**

**Typy omezení:** unární (jedna proměnná, např. $SA\neq\text{zelená}$), binární (dvě), vyššího řádu (3+; např. sloupce v algebrogramu, `all_distinct`), preferenční / soft (cena přiřazení → optimalizace).
**Typy domén:** diskrétní konečné (výčet, Boolean – SAT je NP-úplné), diskrétní nekonečné (čísla – je třeba jazyk omezení, lineární řešitelné, nelineární obecně ne), spojité (lineární programování – polynomiální).

**Graf omezení:** binární omezení → uzly = proměnné, hrany = omezení; n-ární → hypergraf.

**Převod na prohledávání (inkrementální formulace):** počáteční stav = prázdné přiřazení $\{\}$; akce = přiřaď hodnotu dosud nenastavené proměnné tak, aby zůstalo konzistentní; cíl = přiřazení je úplné; cena konstantní. Hloubka řešení $d=n$ ⇒ vhodný **DFS = backtracking** (přiřazení jsou komutativní → v každém kroku jedna proměnná, listů max. $|D|^n$). Backtracking zvládne třeba $n\approx25$ dam.

**Zlepšení backtrackingu:**
- *nejomezenější proměnná* (MRV, fail-first): vyber proměnnou s nejméně zbývajícími hodnotami;
- *nejvíce omezující proměnná*: ta s nejvíc omezeními na zbylé;
- *nejméně omezující hodnota*: ta, která zruší nejméně hodnot ostatním;
- *dopředná kontrola* (forward checking): udržuj zbývající domény;
- *propagace omezení*: navíc kontroluj nekonzistence mezi zbývajícími proměnnými.

**CLP (Constraint Logic Programming, Prolog):** `X in 1..5`, `Xs ins 0..9`, aritmetická omezení `#=, #\=, #<, #>=…`, výroková `#\ #/\ #\/ #<==>`, `all_distinct(L)`, `sum(Vars,RelOp,S)`, hledání `labeling(Options, Vars)` (volby `ff`, `min`, `max`, `bisect`, `up/down`, `min(Cost)`).

```
N dam:  L ins 1..N,  pro i<j:  L[i] #\= L[j],  L[i]+(j-i) #\= L[j],  L[i]-(j-i) #\= L[j];  labeling(L)
SEND+MORE:  [S,E,N,D,M,O,R,Y] ins 0..9, S #> 0, M #> 0, all_distinct, 1000*S+100*E+10*N+D + 1000*M+100*O+10*R+E #= 10000*M+1000*O+100*N+10*E+Y
  →  S=9 E=5 N=6 D=7 M=1 O=0 R=8 Y=2   (9567 + 1085 = 10652)
```

**Proč CSP a jak modelovat (sbírka 3.2):**
- **Deklarativní × imperativní programování:** u CSP popíšeš *vlastnosti řešení* a řešič hledá; těžké je právě řešení. Efektivní řešiče existují jen pro určité typy omezení, jinak se spoléhá na heuristické prohledávání ohodnocení. Využití: rozvrhování (i na FI), konstrukce mikročipů, typová inference, logické hádanky, maximální tok, lexikální analýza.
- **Typová inference jako CSP:** z programu `x = f(g(0)); x = f(x); x = g(x)` plynou omezení na typy funkcí (g bere `int`, f bere typ, který vrací g, ...); řešením jsou typy $f,g:\text{int}\to\text{int}$.
- **Sudoku:** proměnné = prázdná políčka, doména $\{1..9\}$, omezení = různé hodnoty v řádku, sloupci a čtverci. Místo série $x_i\neq x_j$ se použije `ALL_DISTINCT(...)`, což je stručnější a řešič ho umí optimalizovat.
- **Kouzelný čtverec $3\times3$:** 9 proměnných s doménou $\{1..9\}$, 5 rovností součtů (řádky a sloupce se rovnají součtu prvního řádku). **Latinský čtverec** $n\times n$: `ALL_DISTINCT` pro každý řádek a sloupec; pro $n=3$ má **12** řešení.
- **Algebrogram** $PPP\cdot PP$ s prvočíselnými číslicemi: 18 proměnných s doménou $\{2,3,5,7\}$ a 3 omezení (dílčí součiny a jejich součet jako rovnice nad čísly zapsanými z číslic).
- **Einsteinova hádanka (zebra):** 25 proměnných s doménou $\{1..5\}$, **hodnota = číslo domu** (zleva doprava). „Angličan žije v červeném domě“ → `Angličan = červený`; „zelený je hned napravo od bílého“ → `zelený = bílý + 1`; „vedle“ → $|a-b|=1$; „první dům“ → `Nor = 1`. Navíc `ALL_DISTINCT` pro každou kategorii (barvy, národnosti, zvířata, povolání, pití). Řešení: zebru má Japonec, vodu pije Nor.
- **Nevzájemné ohrožení různých figur na $8\times8$:** každá figura = dvě proměnné (řádek, sloupec) z $\{1..8\}$. Král vs. figura $X$: $(K_r-X_r)^2+(K_s-X_s)^2>2$; dáma: různý řádek, sloupec a obě diagonály ($D_r-X_r\neq\pm(D_s-X_s)$); jezdec navíc: $(J_r-X_r)^2+(J_s-X_s)^2\neq5$ (nesmí napadat jezdcovým tahem) a $>0$ (nestát na jednom poli).
- **Stavový graf CSP:** start $\{\}$, akce = přiřazení další proměnné (v pořadí deklarace); kreslí se jen stavy dosažitelné při splnění omezení a částečný stav, který nejde rozšířit, je slepá ulička. Např. `A in 2..4, B in 2..3, C in 0..6, A-B>=C, A*(B-1)!=B+C, A!=B` má **5** řešení.

## Mini příklad

Obarvení mapy Austrálie třemi barvami: proměnné $WA,NT,Q,NSW,V,SA,T$, domény $\{\text{červená, zelená, modrá}\}$, omezení: sousedé mají různou barvu (WA–NT, WA–SA, NT–SA, NT–Q, SA–Q, SA–NSW, Q–NSW, SA–V, NSW–V). Tasmánie $T$ je nezávislá. Řešení: $WA=\check c$, $NT=z$, $Q=\check c$, $NSW=z$, $V=\check c$, $SA=m$, $T=z$. Celkem existuje 18 obarvení: $SA$ má 3 barvy, zbytek pevninské části se pak obarví 2 způsoby (6 obarvení) a $T$ je libovolná ze 3 barev: $6\cdot3=18$.

`X in 1..7, Y in 1..7, X+Y=7` má 6 řešení; přidání omezení „$X\cdot Y$ je sudé“ je nezmění (jedno z čísel musí být sudé).

## Pozor

> - **Počet řešení** zjišťuj dosazením omezení; spor v omezeních ⇒ 0 řešení (např. `B in 0..4, A+B==A-B` vynutí $B=0$, ale `0<A*B` pak vyžaduje $B>0$ ⇒ **0 řešení**).
> - Piškvorky/hry s protivníkem **nejsou přirozeně CSP** (je tam soupeř); sudoku, N dam, rozvrhy, obarvení jsou.
> - Backtracking je **DFS** s kontrolou omezení během přiřazování (ne až na konci).
> - Ve stromu prohledávání CSP se uvažuje přiřazení **jedné** proměnné v kroku, jinak se zbytečně násobí pořadí.

## Praxe

Najdi řešení a počet řešení CSP, formuluj problémy a vyber správné heuristiky.
