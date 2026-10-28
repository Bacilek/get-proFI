## Intuice

Výroková logika vidí svět jako sadu faktů. **Predikátová logika 1. řádu (PL1, FOPL)** vidí **objekty**, jejich **vlastnosti a vztahy (relace)** a **funkce** – a umí o nich říkat „pro všechny“ a „existuje“. Má větší expresivitu než výrokovka, ale menší složitost než přirozený jazyk (který je víceznačný a závislý na kontextu).

## Vzorec

**Abeceda:** konstanty (`KingJohn`, `2`), proměnné ($x,y$), funkční symboly ($\text{Sqrt}$, $\text{LeftLegOf}$; arita $n$, konstanta = nulární), predikátové symboly ($\text{Brother}$, $>$; arita $n$), spojky, kvantifikátory $\forall,\exists$, rovnost $=$, závorky.

**Term** = výraz popisující objekt: proměnná, konstanta, nebo $f(t_1,\dots,t_n)$. Např. $\text{Add}(x,\text{Add}(\text{Sqrt}(y),1))$. Termy představují **hodnoty/objekty, ne tvrzení**.
**Atomická formule:** $P(t_1,\dots,t_n)$ nebo $t_1=t_2$. **Formule:** atomická, nebo vzniklá spojkami a kvantifikátory $\forall x\,\varphi$, $\exists x\,\varphi$.

**Sémantika:** *interpretace* $I$ = neprázdná **doména** $D$ + $I(c)\in D$ pro konstanty, $I(f):D^n\to D$ pro funkce, $I(P)\subseteq D^n$ pro predikáty. *Valuace* $V:\text{proměnné}\to D$ určuje hodnoty proměnných. Atomická formule $P(t_1,\dots,t_n)$ je pravdivá, pokud $(|t_1|,\dots,|t_n|)\in I(P)$.
Formule je **pravdivá v interpretaci**, je-li pravdivá pro **každou** valuaci (volné proměnné = univerzálně vázané); **tautologie** = pravdivá v každé interpretaci.
Interpretací jedné syntaxe může být víc – např. $\forall x\,(x<\text{Succ}(x))$ v $\mathbb N_0$ (standardní) vs. řetězce nad $\{a\}$ s prefixovou relací (nestandardní).

**Kvantifikátory:**
- $\forall x\,P$ ≈ konjunkce instancí $P$ pro všechny objekty; 
- $\exists x\,P$ ≈ disjunkce instancí.

| česky | správně | **špatně** (znamená…) |
|---|---|---|
| každý $P$ je $Q$ | $\forall x\,(P(x)\Rightarrow Q(x))$ | $\forall x\,(P\wedge Q)$ – každý je $P$ i $Q$ |
| někdo $P$ je $Q$ | $\exists x\,(P(x)\wedge Q(x))$ | $\exists x\,(P\Rightarrow Q)$ – někdo není $P$, nebo je $Q$ |

**Vlastnosti:** $\forall x\forall y\equiv\forall y\forall x$, $\exists x\exists y\equiv\exists y\exists x$, ale $\exists x\forall y\not\equiv\forall y\exists x$:
$\exists x\forall y\,\text{ráda}(x,y)$ = existuje osoba, která má ráda *všechny*; $\forall y\exists x\,\text{ráda}(x,y)$ = každého má někdo rád (pokaždé potenciálně jiný).
**Dualita:** $\forall x\,\varphi\equiv\neg\exists x\,\neg\varphi$, $\exists x\,\varphi\equiv\neg\forall x\,\neg\varphi$; negace: $\neg\forall x\,P\equiv\exists x\,\neg P$.

## Mini příklad

Sokrates: $\forall x\,(\text{čl}(x)\Rightarrow\text{sm}(x))\wedge\text{čl}(\text{So})\ \models\ \text{sm}(\text{So})$ — ve výrokové logice nevyjádřitelné.

„Každý na FI MU je inteligentní“: $\forall x\,(\text{Na}(x,\text{FI})\Rightarrow\text{intel}(x))$.
„Někdo na MFF UK je inteligentní“: $\exists x\,(\text{Na}(x,\text{MFF})\wedge\text{intel}(x))$.
„Není pravda, že všichni lidé jsou spokojení“: $\neg\forall x\,(\text{člověk}(x)\Rightarrow\text{spokojený}(x))\equiv\exists x\,(\text{člověk}(x)\wedge\neg\text{spokojený}(x))$.

Konečná interpretace: $D=\{1,2,3\}$, $I(P)=\{(1,2),(1,3),(2,3)\}$ („menší než“). $\forall x\exists y\,P(x,y)$ je **nepravdivé** (pro 3 žádné $y$), $\exists x\forall y\,(x=y\vee P(x,y))$ je **pravdivé** ($x=1$).

## Pozor

> - U $\forall$ patří **implikace**, u $\exists$ **konjunkce** – zaměnit je je nejčastější chyba.
> - **Pořadí různých kvantifikátorů** $\exists\forall$ vs. $\forall\exists$ záleží.
> - Konstanty jsou nulární funkce; **term ≠ formule**: $x+2$ je term (objekt), $x+2\ge y$ formule (tvrzení).
> - Predikát je **relace**, funkce vrací **objekt**. „Otec(Petr)“ je term, „Je_otec(Jan, Petr)“ formule.
> - PL1 je **rozhodnutelná jen částečně** (Church 1936) – úplná inference existuje (Gödel 1930), ale nemusí skončit.

## Praxe

Formalizuj věty do PL1, vyhodnoť formule v konečných interpretacích a rozliš kvantifikátory.
