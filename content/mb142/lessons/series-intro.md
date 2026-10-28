## Intuice

Nekonečná řada $\sum a_n$ je „součet nekonečně mnoha čísel“. Smysl mu dáme přes **částečné součty** $s_n=a_0+\dots+a_n$: řada konverguje, pokud $s_n$ míří ke konečnému číslu $s$ (součet řady).

## Vzorec

**Konvergence:** $\lim s_n=s\in\mathbb{R}$ $\Rightarrow$ konverguje, součet $s$. $\lim s_n=\pm\infty$ $\Rightarrow$ diverguje k $\pm\infty$. $\lim s_n$ neexistuje $\Rightarrow$ **osciluje**.

**Geometrická řada** $\displaystyle\sum_{n=0}^\infty aq^n$ ($a\neq0$): konverguje $\iff|q|<1$, pak
$$\sum_{n=0}^\infty aq^n=\frac{a}{1-q}\qquad\Big(s_n=a\,\frac{1-q^{n+1}}{1-q}\Big)$$
(první člen děleno $1-q$; začíná-li řada jinde, $a$ je její **první** člen).

**Teleskopická řada:** rozklad na parciální zlomky, např. $\dfrac{1}{(n+1)(n+2)}=\dfrac{1}{n+1}-\dfrac{1}{n+2}$, členy se krátí a $s_n=1-\frac{1}{n+2}\to1$.

**Nutná podmínka:** $\sum a_n$ konverguje $\Rightarrow\lim a_n=0$. Tedy pokud $\lim a_n\neq0$ nebo neexistuje, řada **nekonverguje**.

**Pravidla:** pokud $\sum a_n=A$, $\sum b_n=B$ konvergují, pak $\sum c\,a_n=cA$ a $\sum(a_n\pm b_n)=A\pm B$. Součin řad takto počítat nelze.

## Mini příklad

$\displaystyle\sum_{n=0}^\infty\frac{3^n-1}{6^n}=\sum\Big(\frac12\Big)^n-\sum\Big(\frac16\Big)^n=\frac{1}{1-\frac12}-\frac{1}{1-\frac16}=2-\frac65=\frac45$

Míček padá z $2$ m a odráží se do $\frac13$ předchozí výšky: celá dráha je $2+2\cdot\sum_{n=1}^\infty 2\left(\tfrac13\right)^n=2+\dfrac{4/3}{1-\frac13}=4$ m (obecně $a\frac{1+q}{1-q}$).

Teleskop: $\displaystyle\sum_{n=1}^\infty\frac{1}{n(n+1)}=\sum\Big(\frac1n-\frac1{n+1}\Big)=\lim\Big(1-\frac1{n+1}\Big)=1$.

## Pozor

> - $\lim a_n=0$ je jen **nutná**, ne postačující: **harmonická řada** $\sum\frac1n$ diverguje (k $\infty$), ačkoli $\frac1n\to0$.
> - $\lim a_n\neq0\Rightarrow$ diverguje; např. $\sum\frac{n}{2n+1}$, $\sum(-1)^n$ (osciluje).
> - Geometrická řada s $q=1$ diverguje ($s_n=(n+1)a$), s $q=-1$ osciluje.
> - Vzorec $\frac{a}{1-q}$ pořádně použij: $a$ je první člen, ne $q^0$. Řada $\sum_{n=2}^\infty 3\left(\frac14\right)^n$ má první člen $\frac{3}{16}$.
> - Součet řady není součet řad: $\sum(a_n+b_n)$ se rozdělit smí jen pro **konvergentní** řady (případně v duchu $\infty+\infty$); $\infty-\infty$ je neurčitý výraz.

## Praxe

Součty geometrických a teleskopických řad a nutná podmínka. Výsledky na 3 desetinná místa.
