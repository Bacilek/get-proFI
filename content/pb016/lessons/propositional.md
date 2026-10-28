## Intuice

Výroková logika je nejjednodušší logika: věty jsou **výrokové symboly** spojené spojkami. Význam složené věty plyne z významu částí a z pravdivostní tabulky spojky. Je **deklarativní** a **kompoziční**, ale málo expresivní (nelze říct „každá jáma způsobuje vánek v sousedství“ bez vypsání pro každé pole).

## Vzorec

**Syntaxe:** symboly $P_1,P_2,\dots$; je-li $S$ věta, je $\neg S$ věta; jsou-li $S_1,S_2$ věty, jsou věty $S_1\wedge S_2$, $S_1\vee S_2$, $S_1\Rightarrow S_2$, $S_1\Leftrightarrow S_2$.

**Úplný systém spojek:** $\{\neg,\wedge,\vee\}$, také $\{\neg,\vee\}$, $\{\neg,\wedge\}$, $\{\neg,\Rightarrow\}$. Jednoprvkové: **NAND** (Sheffer), **NOR** (Nicod): $p\vee q\equiv(p\,\text{nand}\,p)\,\text{nand}\,(q\,\text{nand}\,q)$.

**Sémantika:** *interpretace* $I:\text{Symboly}\to\{\text{true},\text{false}\}$, rozšířená na všechny věty (valuace):

| $S_1$ | $S_2$ | $\neg S_1$ | $S_1\wedge S_2$ | $S_1\vee S_2$ | $S_1\Rightarrow S_2$ | $S_1\Leftrightarrow S_2$ |
|---|---|---|---|---|---|---|
| F | F | T | F | F | **T** | T |
| F | T | T | F | T | **T** | F |
| T | F | F | F | T | **F** | F |
| T | T | F | T | T | T | T |

$S_1\Rightarrow S_2$ je nepravdivá **jen** když $S_1$ je pravdivé a $S_2$ nepravdivé (≡ $\neg S_1\vee S_2$). $\Leftrightarrow$ je pravdivá, když mají obě strany stejnou hodnotu.

**Pojmy** (pro formuli $\varphi$): 
- **model** = interpretace, ve které je $\varphi$ pravdivá; 
- **tautologie / platná** (valid) = pravdivá ve **všech** interpretacích (např. $A\vee\neg A$, $(A\wedge(A\Rightarrow B))\Rightarrow B$); 
- **kontradikce / nesplnitelná** = nepravdivá ve všech (např. $A\wedge\neg A$); 
- **splnitelná** = pravdivá aspoň v jedné; 
- **sémanticky ekvivalentní** $\varphi\equiv\psi$: stejné hodnoty ve všech interpretacích.
Množina formulí $T$ je splnitelná, má-li model, v němž jsou pravdivé všechny její formule; prázdná množina je splnitelná. $T\models\varphi$: $\varphi$ je pravdivá v každém modelu $T$. $\emptyset\models\varphi$ ⇒ $\varphi$ je tautologie.

**Věty:** dedukční: $\{\psi_1,\dots,\psi_n\}\models\varphi\iff\{\psi_1,\dots,\psi_{n-1}\}\models\psi_n\Rightarrow\varphi$; důkaz sporem: $T\models\varphi\iff T\cup\{\neg\varphi\}$ nesplnitelná.

**SAT:** je dána formule s $n$ symboly splnitelná? **NP-úplný**. Řešení CSP lze převést na SAT. SAT solvery pro velké úlohy. Pravdivostní tabulka má $2^n$ řádků.

**Spojky vs. jazyk:** v přirozeném jazyce je „nebo“ často XOR; implikace ve výrokové logice nepředpokládá příčinný vztah a z nepravdivé premisy plyne cokoliv („5 je sudá ⇒ AZ Tower je nejvyšší“ je pravdivá).

## Mini příklad

$\varphi\equiv p\wedge(q\Rightarrow\neg p)$:

| $p$ | $q$ | $q\Rightarrow\neg p$ | $\varphi$ |
|---|---|---|---|
| 0 | 0 | 1 | 0 |
| 0 | 1 | 1 | 0 |
| 1 | 0 | 1 | **1** |
| 1 | 1 | 0 | 0 |

Není ani tautologie, ani kontradikce; je **splnitelná**, jediný model je $I(p)=1,I(q)=0$.

$\varphi=(p\vee q)\Rightarrow(\neg p\wedge q)$ při $I(p)=I(q)=1$: $(1\vee1)=1$, $(\neg1\wedge1)=0$ ⇒ $1\Rightarrow0=0$.

Vyplývání: $\{p\Rightarrow q,\,q\Rightarrow r\}\models p\Rightarrow r$ ✓ (tranzitivita); $\{p\Rightarrow q,\,q\}\models p$ ✗ (klam: potvrzení důsledku).

## Pozor

> - Pravdivostní tabulku čti po **řádcích = interpretacích**; sloupec výsledné formule je její valuace.
> - Implikace **s nepravdivou premisou je pravdivá**.
> - Počet interpretací je $2^n$ pro $n$ symbolů *celé úlohy* – i symboly, které se ve formuli nevyskytují, se počítají do počtu modelů.
> - Formule může být splnitelná, a přesto **ne tautologie** (a naopak každá tautologie je splnitelná).
> - $\models$ (vyplývání) není $\Rightarrow$ (spojka) – souvisí přes dedukční větu.

## Praxe

Pravdivostní tabulky, klasifikace formulí (tautologie/kontradikce/splnitelná), vyplývání.
