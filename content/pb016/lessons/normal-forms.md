## Intuice

Každou výrokovou formuli lze přepsat do **normální formy** – standardního tvaru, na který pak navazuje rezoluce a SAT solvery. Převod se dělá mechanicky: odstraň $\Leftrightarrow$ a $\Rightarrow$, přesuň negace dovnitř, roznásob.

## Vzorec

**Literál** = symbol nebo jeho negace. **Klauzule** = disjunkce literálů; **duální klauzule** = konjunkce literálů.
- **KNF / CNF** = konjunkce klauzulí (s navzájem různými množinami literálů),
- **DNF** = disjunkce duálních klauzulí,
- **úplná** KNF/DNF (ÚKNF, ÚDNF): každá klauzule obsahuje **každý** symbol právě jednou.
Příklad: $(p\vee\neg q)\wedge(\neg p\vee\neg q\vee r)$ je KNF, ne úplná. Úplná: $(p\vee\neg q\vee r)\wedge(p\vee\neg q\vee\neg r)\wedge(\neg p\vee\neg q\vee r)$.

**Logické ekvivalence:**

| | |
|---|---|
| komutativita, asociativita $\wedge,\vee$ | $\alpha\wedge\beta\equiv\beta\wedge\alpha$ … |
| dvojí negace | $\neg\neg\alpha\equiv\alpha$ |
| kontrapozice | $(\alpha\Rightarrow\beta)\equiv(\neg\beta\Rightarrow\neg\alpha)$ |
| eliminace implikace | $(\alpha\Rightarrow\beta)\equiv(\neg\alpha\vee\beta)$ |
| eliminace ekvivalence | $(\alpha\Leftrightarrow\beta)\equiv(\alpha\Rightarrow\beta)\wedge(\beta\Rightarrow\alpha)$ |
| de Morgan | $\neg(\alpha\wedge\beta)\equiv\neg\alpha\vee\neg\beta$, $\neg(\alpha\vee\beta)\equiv\neg\alpha\wedge\neg\beta$ |
| distributivita | $\alpha\wedge(\beta\vee\gamma)\equiv(\alpha\wedge\beta)\vee(\alpha\wedge\gamma)$ a naopak |

**Převod do CNF (4 kroky):**
1. eliminuj $\Leftrightarrow$: $\alpha\Leftrightarrow\beta\to(\alpha\Rightarrow\beta)\wedge(\beta\Rightarrow\alpha)$;
2. eliminuj $\Rightarrow$: $\alpha\Rightarrow\beta\to\neg\alpha\vee\beta$;
3. přesuň $\neg$ k symbolům (de Morgan, dvojí negace);
4. roznásob pomocí distributivity $\vee$ přes $\wedge$.

**Z pravdivostní tabulky:** ÚDNF = disjunkce duálních klauzulí pro **pravdivé** řádky; ÚKNF = konjunkce klauzulí pro **nepravdivé** řádky (literály s opačným znaménkem než v řádku).

## Mini příklad

$V_{1,1}\Leftrightarrow(J_{1,2}\vee J_{2,1})$:
1. $(V\Rightarrow(J_1\vee J_2))\wedge((J_1\vee J_2)\Rightarrow V)$
2. $(\neg V\vee J_1\vee J_2)\wedge(\neg(J_1\vee J_2)\vee V)$
3. $(\neg V\vee J_1\vee J_2)\wedge((\neg J_1\wedge\neg J_2)\vee V)$
4. $(\neg V\vee J_1\vee J_2)\wedge(\neg J_1\vee V)\wedge(\neg J_2\vee V)$ – **CNF**, tři klauzule.

Další: $(A\Rightarrow B)\Rightarrow C\equiv\neg(\neg A\vee B)\vee C\equiv(A\wedge\neg B)\vee C\equiv(A\vee C)\wedge(\neg B\vee C)$.

DNF: $(p\vee q)\wedge r$ má modely $011,101,111$ ($p,q,r$) ⇒ ÚDNF $(\neg p\wedge q\wedge r)\vee(p\wedge\neg q\wedge r)\vee(p\wedge q\wedge r)$.

## Pozor

> - V kroku 3 nezapomeň při průchodu negací **prohodit $\wedge\leftrightarrow\vee$** (de Morgan).
> - Distributivita platí **oběma směry**, ale pro CNF roznásobuješ $\vee$ přes $\wedge$.
> - Klauzule jsou **množiny** literálů: pořadí a opakování nehrají roli ($p\vee p\equiv p$).
> - Úplná NF obsahuje každý symbol v každé klauzuli – i ty, které formule jinak nezmiňuje (ze zadání všech uvažovaných symbolů).
> - Počet klauzulí ÚKNF = počet nepravdivých řádků tabulky (u $2^n$ řádků).

## Praxe

Převeď do CNF, ověř ekvivalenci a sestav ÚKNF/ÚDNF.
