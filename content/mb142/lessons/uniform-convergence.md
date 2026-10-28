## Intuice

Bodová konvergence posloupnosti funkcí $f_n\to f$ jen říká, že pro každé $x$ zvlášť $f_n(x)\to f(x)$. **Stejnoměrná** konvergence požaduje, aby celý graf $f_n$ ležel v „trubici“ šířky $\varepsilon$ kolem $f$ najednou pro všechna $x$. Teprve ta zaručuje, že se limita „zdědí“ (spojitost) a že lze zaměnit limitu s derivací a integrálem.

## Vzorec

**Definice.** $f_n\to f$ **stejnoměrně** na $[a,b]$, pokud
$$\forall\varepsilon>0\ \exists N\ \forall n\ge N\ \forall x\in[a,b]:\ |f_n(x)-f(x)|<\varepsilon.$$
Řada funkcí konverguje stejnoměrně, pokud tak konverguje posloupnost jejích částečných součtů.

**Věta 87 (co stejnoměrná konvergence zaručuje).** Konverguje-li $S(x)=\sum f_n(x)$ stejnoměrně na $I=[a,b]$, pak:
1. jsou-li všechny $f_n$ spojité, je $S$ spojitá;
2. jsou-li $f_n$ spojitě diferencovatelné a stejnoměrně konverguje i $T=\sum f_n'$, pak $S'=T$, tj. $\left(\sum f_n\right)'=\sum f_n'$;
3. jsou-li $f_n$ integrovatelné, je $S$ integrovatelná a $\displaystyle\int_a^b\sum f_n=\sum\int_a^bf_n$.

**Weierstrassův test (Věta 88).** Platí-li $|f_n(x)|\le a_n$ na $I$ a $\sum a_n<\infty$, pak $\sum f_n$ konverguje stejnoměrně na $I$.

**Mocninné řady (Věta 89):** $\sum a_n(x-x_0)^n$ s poloměrem konvergence $r$ konverguje stejnoměrně na každém $[a,b]\subset(x_0-r,x_0+r)$. Proto je uvnitř intervalu konvergence spojitá a spojitě diferencovatelná a lze ji **derivovat i integrovat člen po členu**.

## Mini příklad

$\displaystyle S(x)=\sum_{n=1}^\infty\frac{\cos nx}{n^2}$: $\left|\frac{\cos nx}{n^2}\right|\le\frac1{n^2}$ a $\sum\frac1{n^2}<\infty$ ⇒ (Weierstrass) konverguje stejnoměrně na $\mathbb R$, a tedy $S$ je spojitá a smí se integrovat člen po členu: $\int_0^\pi S\,dx=\sum\int_0^\pi\frac{\cos nx}{n^2}dx=0$.

**Protipříklad:** $f_n(x)=x^n$ na $[0,1]$: $f_n(x)\to0$ pro $x<1$ a $f_n(1)=1$. Limita není spojitá, a proto konvergence **není** stejnoměrná.

## Pozor

> - Stejnoměrná konvergence ⇒ bodová, **ne naopak** ($x^n$ na $[0,1]$).
> - Derivovat člen po členu lze jen když **stejnoměrně konverguje i řada derivací** (samotná $\sum f_n$ nestačí).
> - Weierstrassův test dává jen postačující podmínku a vyžaduje **číselnou** řadu $\sum a_n$ nezávislou na $x$.
> - Mocninná řada konverguje stejnoměrně na uzavřených podintervalech **uvnitř** $(x_0-r,x_0+r)$, na celém otevřeném intervalu nemusí.

## Praxe

Rozhodni, zda konvergence je stejnoměrná, použij Weierstrassův test a zdůvodni záměnu limity s integrálem/derivací.
