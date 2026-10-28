## Intuice

Mocninná řada je „polynom nekonečného stupně“. Její součet je funkce $s(x)$ a ptáme se dvou věcí: **pro která $x$ řada konverguje** a **jaký je její součet**. Konvergenční množina je vždy interval se středem $x_0$ a poloměrem $R$.

## Vzorec

**Mocninná řada** se středem $x_0$ a koeficienty $a_n$:
$$\sum_{n=0}^\infty a_n(x-x_0)^n=a_0+a_1(x-x_0)+a_2(x-x_0)^2+\dots$$

**Poloměr konvergence $R$:** řada konverguje absolutně pro $|x-x_0|<R$ a nekonverguje pro $|x-x_0|>R$ (v krajních bodech $x_0\pm R$ se musí vyšetřit zvlášť). Platí-li
$$a=\lim_{n\to\infty}\left|\frac{a_{n+1}}{a_n}\right|\quad\text{nebo}\quad a=\lim_{n\to\infty}\sqrt[n]{|a_n|},\qquad R=\begin{cases}\frac1a&a\in(0,\infty)\\ \infty&a=0\\ 0&a=\infty\end{cases}$$

Tři možnosti: $R=0$ (konverguje jen v $x_0$), $0<R<\infty$ (interval $(x_0-R,\,x_0+R)$ plus případně krajní body), $R=\infty$ (konverguje na celém $\mathbb R$).

**Geometrická řada** jako základní stavební kámen:
$$\sum_{n=0}^\infty x^n=\frac1{1-x},\quad \sum_{n=0}^\infty(-1)^nx^n=\frac1{1+x}\qquad x\in(-1,1)$$

**Vlastnosti součtu** (uvnitř $(x_0-R,\,x_0+R)$, poloměr se nemění):
- $s$ je **spojitá**; konverguje-li řada v krajním bodě, je tam $s$ spojitá zleva/zprava (Abel),
- **derivace člen po členu:** $s'(x)=\sum_{n=1}^\infty na_nx^{n-1}$,
- **integrace člen po členu:** $\displaystyle\int_0^x s(t)\,dt=\sum_{n=0}^\infty a_n\frac{x^{n+1}}{n+1}$ (i určitý integrál přes $[a,b]\subset(-R,R)$).

**Důležité součty** (odvozené integrací geometrické řady):
$$\ln(1+x)=\sum_{n=1}^\infty\frac{(-1)^{n-1}x^n}{n},\ x\in(-1,1]\qquad \operatorname{arctg}x=\sum_{n=1}^\infty\frac{(-1)^{n-1}x^{2n-1}}{2n-1},\ x\in[-1,1]$$

## Mini příklad

**Obor konvergence** $\displaystyle\sum_{n=1}^\infty\frac{(x-2)^n}{n\,3^n}$: $a_n=\frac1{n3^n}$, $\left|\frac{a_{n+1}}{a_n}\right|=\frac{n}{3(n+1)}\to\frac13$, tedy $R=3$ a konverguje na $(-1,5)$.
Krajní body: $x=5$ dává $\sum\frac1n$ (diverguje), $x=-1$ dává $\sum\frac{(-1)^n}{n}$ (konverguje, Leibniz). Obor konvergence je $[-1,5)$.

**Součet** $\displaystyle\sum_{n=1}^\infty n x^n$ pro $|x|<1$: derivováním $\sum x^n=\frac1{1-x}$ je $\sum nx^{n-1}=\frac1{(1-x)^2}$, vynásobením $x$:
$$\sum_{n=1}^\infty nx^n=\frac{x}{(1-x)^2}$$

**Číselná řada přes integraci:** $\displaystyle\sum_{n=1}^\infty\frac1{n\,2^n}$. Z $\int_0^{1/2}x^{n-1}dx=\frac{1}{n2^n}$ plyne
$$\sum_{n=1}^\infty\frac1{n2^n}=\int_0^{1/2}\frac{dx}{1-x}=-\ln\tfrac12=\ln2$$

## Pozor

> - Poloměr $R$ **neříká nic o krajních bodech**: dosaď $x_0\pm R$ a vyšetři číselnou řadu zvlášť (Leibniz, p-řada…). Uvnitř je konvergence absolutní.
> - Vzorec $R=1/a$ předpokládá, že řada má **všechny** mocniny. U řady s vynechanými členy (např. $\sum\frac{x^{2n}}{4^n}$) použij podílové/odmocninové kritérium přímo na členy $|a_n(x-x_0)^n|$, jinak vyjde $\frac{a_{n+1}}{a_n}=0$ nesmysl. Zde: $\frac{|x|^2}{4}<1$, $R=2$.
> - Odmocninový vzorec $\sqrt[n]{|a_n|}$ funguje častěji než podílový (limita podílu nemusí existovat).
> - Při integraci a derivaci se **mění index** $n$ a konstanta: integrál $\int s$ musí mít správnou integrační konstantu (dosazením $x=0$), derivace zahodí člen $a_0$.
> - Poloměr se derivací/integrací nemění, ale **krajní body se mohou změnit** (např. $\frac1{1+x}$ na $(-1,1)$ vs. $\ln(1+x)$ na $(-1,1]$).
> - Při zápisu $\frac{1}{x-4}$ apod. nejdřív převeď na tvar $\frac{1}{1-q}$ s $q$ závislým na $x$ a teprve potom rozvíjej geometrickou řadu.

## Praxe

Urči poloměr a obor konvergence a sečti řady pomocí derivace/integrace geometrické řady.
