## Intuice

Reálné hry mají tři komplikace: strom je příliš velký (→ **ohodnocovací funkce**), vstupuje do toho **náhoda** (kostky, míchání → expectiminimax) a hráč nezná celý stav (karty soupeře → **Monte Carlo**). Dnešní nejlepší programy kombinují prohledávání stromu se simulacemi (MCTS) a naučenými ohodnoceními (AlphaGo).

## Vzorec

**Ohodnocovací funkce** (nahrazuje utilitu v listech řezu): typicky **lineární vážený součet rysů**
$$\text{Eval}(s)=w_1f_1(s)+\dots+w_nf_n(s)=\sum_i w_if_i(s),$$
např. šachy: $w_1=9$, $f_1$ = (počet bílých dam) − (počet černých dam). V **deterministické** hře záleží jen na *uspořádání* hodnot ⇒ chování se nezmění při libovolné **monotónní** transformaci Eval (ordinální funkce).

**Nedeterministické hry – expectiminimax:** přibudou uzly **náhody**:
$$\text{expectiminimax}(n)=\begin{cases}\text{utility}(n)&\text{koncový}\\\max_s\text{expectiminimax}(s)&\text{MAX}\\\min_s\text{expectiminimax}(s)&\text{MIN}\\\sum_s P(s)\cdot\text{expectiminimax}(s)&\text{náhoda}\end{cases}$$
U her s náhodou musí Eval odpovídat **očekávanému výnosu** – zachovává se jen při **pozitivní lineární** transformaci (nikoli libovolné monotónní). Alfa-beta jde upravit (intervaly hodnot), ale je mnohem méně účinná. Kostky zvyšují $b$ (dvě kostky: 21 výsledků); s hloubkou klesá pravděpodobnost dosažení uzlu, takže se význam hlubokého prohledávání snižuje. Backgammon: TDGammon = hloubka 2 + výborná Eval (úroveň světového šampiona).

**Hry s nepřesnou znalostí – Monte Carlo:** neznáme např. rozdání soupeřových karet; vygenerujeme $N$ (např. 100) rozdání konzistentních s pozorováním, pro každé vyřešíme hru jako s perfektní informací a vybereme **v průměru nejlepší** akci (program Jack, bridž). Prohledáváme „domnělý“ stavový prostor.

**Monte Carlo Tree Search (MCTS)** – opakuj čtyři fáze:
1. **Výběr** (selection): od kořene sestup po nejslibnějších uzlech až k uzlu s neprozkoumaným tahem,
2. **Expanze**: přidej nový uzel,
3. **Simulace**: náhodně dohraj hru do konce,
4. **Zpětná propagace**: aktualizuj skóre (výhry/návštěvy) od nového uzlu zpět ke kořeni.
Výhody: obecnost (nepotřebuje heuristiku), přizpůsobivost (strom roste podle simulací), kdykoliv dá nejlepší odhad, jednoduchost. Nevýhody: někdy nenajde nejlepší tahy, potřebuje hodně simulací.

**Přehled úspěchů:** dáma – Chinook (1994, databáze koncovek); šachy – Deep Blue (1997), 200 mil. pozic/s; Go – $b>300$, AlphaGo porazil Lee Sedola 4:1 (2016) a Ke Jie 3:0 (2017), AlphaGo Zero se učí jen hrou sama proti sobě (neuronové sítě + posilované učení).

## Mini příklad

**Expectiminimax:** MAX má dva tahy vedoucí na uzly náhody.
Uzel 1: s pravd. 0,5 → MIN(2, 4)=2, s pravd. 0,5 → MIN(7, 4)=4 ⇒ $0{,}5\cdot2+0{,}5\cdot4=3$.
Uzel 2: 0,5 → MIN(6, 0)=0, 0,5 → MIN(5, −2)=−2 ⇒ $-1$. MAX volí uzel 1 (hodnota 3).

**Proč lineární transformace?** Uzel A: s pravd. 0,9 výnos 2, 0,1 výnos 3 ⇒ 2,1. Uzel B: 0,9 → 1, 0,1 → 4 ⇒ 1,3. MAX volí A. Po monotónním přeznačení $1\to1,\ 2\to20,\ 3\to30,\ 4\to400$: A = 21, B = 40,9 ⇒ MAX volí B. **Rozhodnutí se změnilo**, ač pořadí hodnot zůstalo.

## Pozor

> - U **deterministických** her stačí pořadí hodnot (monotónní transformace), u her s **náhodou** potřebuješ očekávanou hodnotu (pozitivní lineární transformace).
> - **Horizontový efekt**: zvrat těsně za hloubkou prohledávání zůstane neviděn ⇒ prohledávej do *klidných* stavů (quiescence).
> - MCTS ≠ minimax s Eval: výsledek simulací je statistický odhad, ne přesná hodnota.
> - Monte Carlo pro nepřesné znalosti dává „v průměru nejlepší“ tah, ne jistě nejlepší.

## Praxe

Procvič Eval, expectiminimax a fáze MCTS.
