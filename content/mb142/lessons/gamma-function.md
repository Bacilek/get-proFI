## Intuice

Eulerova funkce $\Gamma$ je „faktoriál pro necelá čísla“: $\Gamma(n)=(n-1)!$. Je definovaná nevlastním integrálem, a proto nejdřív potřebujeme nástroje pro **konvergenci nevlastních integrálů** (srovnávací kritéria). Gama a beta funkce se hodí k výpočtu obtížných integrálů, např. Gaussova $\int e^{-x^2}$.

## Vzorec

**Srovnávací kritérium** ($0\le f\le g$ na $[a,\infty)$): $\int_a^\infty g$ konverguje $\Rightarrow$ $\int_a^\infty f$ konverguje; $\int_a^\infty f$ diverguje $\Rightarrow$ $\int_a^\infty g$ diverguje.

**Limitní srovnávací kritérium** ($f,g\ge0$, $\lim_{x\to\infty}\frac{f}{g}=L$): je-li $L<\infty$ a $\int g$ konverguje, konverguje $\int f$; je-li $L>0$ a $\int g$ diverguje, diverguje $\int f$.

**Důsledek (test s $x^\alpha$):** $f\ge0$, $a>0$. Existuje-li $\alpha>1$ s $\lim_{x\to\infty}x^\alpha f(x)<\infty$, integrál $\int_a^\infty f$ konverguje; existuje-li $\alpha\le1$ s $\lim x^\alpha f(x)>0$, diverguje.

**Gama funkce:**
$$\Gamma(x)=\int_0^\infty e^{-t}t^{x-1}\,dt\quad(x>0),$$
konverguje (absolutně) pro každé $x>0$ (u $0$: $e^{-t}t^{x-1}\sim t^{x-1}$, u $\infty$: $e^{-t}$ dominuje všechny mocniny).

**Vlastnosti:**
- $\Gamma(x+1)=x\,\Gamma(x)$ (per partes), $\Gamma(1)=1$, tedy $\Gamma(n)=(n-1)!$ pro $n\in\mathbb N$.
- Rozšíření na $x<0$, $x\notin\mathbb Z$: $\Gamma(x)=\dfrac{\Gamma(x+n)}{x(x+1)\cdots(x+n-1)}$. Definiční obor $\mathbb R\setminus\{0,-1,-2,\dots\}$.
- $\Gamma(\tfrac12)=\sqrt\pi$, $\ \Gamma\!\left(\tfrac12+n\right)=\dfrac{(2n-1)!!}{2^n}\sqrt\pi$.
- $\Gamma(x)\Gamma(1-x)=\dfrac{\pi}{\sin\pi x}$.
- Stirling: $n!\approx\sqrt{2\pi n}\left(\frac ne\right)^n$.

**Beta funkce:** $B(x,y)=\displaystyle\int_0^1t^{x-1}(1-t)^{y-1}dt=\dfrac{\Gamma(x)\Gamma(y)}{\Gamma(x+y)}$, $x,y>0$.

## Mini příklad

**Hodnoty:** $\Gamma(5)=4!=24$; $\Gamma(\tfrac52)=\tfrac32\cdot\tfrac12\sqrt\pi=\tfrac34\sqrt\pi$; $\Gamma(-\tfrac12)=\dfrac{\Gamma(\frac12)}{-\frac12}=-2\sqrt\pi$.

**Gaussův integrál** (přes $B$): $\Gamma(\frac12)^2=\Gamma(1)\,B(\tfrac12,\tfrac12)=\int_0^1\frac{dt}{\sqrt{t(1-t)}}=\pi$ (subst. $t=\sin^2u$). Pak ($u=x^2$)
$$\int_0^\infty e^{-x^2}dx=\frac12\int_0^\infty e^{-u}u^{-1/2}du=\frac12\Gamma(\tfrac12)=\frac{\sqrt\pi}2.$$
(Alternativa: polární souřadnice, viz lekce o transformacích.)

**Převod integrálu na $\Gamma$:** $\displaystyle\int_0^\infty x^3e^{-2x}dx$; $t=2x$: $=\frac1{2^4}\int_0^\infty t^3e^{-t}dt=\frac{\Gamma(4)}{16}=\frac{6}{16}=\frac38$.

**Konvergence:** $\displaystyle\int_1^\infty\frac{x^2}{x^4+1}dx$: pro $\alpha=2>1$ je $\lim_{x\to\infty}x^2\cdot\frac{x^2}{x^4+1}=1<\infty$, integrál konverguje.

## Pozor

> - $\Gamma(n)=(n-1)!$, **ne** $n!$ (posun o $1$): $\Gamma(5)=24$, $\Gamma(6)=120$.
> - Rekurze $\Gamma(x+1)=x\Gamma(x)$ funguje i pro necelá/záporná $x$ (mimo póly $0,-1,\dots$), tak se počítá $\Gamma$ z hodnoty na $(0,1]$.
> - Při převodu integrálu na $\Gamma$ hlídej **substituci i faktor**: u $\int x^3e^{-2x}$ musí vyjít $t^{3}e^{-t}$ s exponentem $x-1=3$, tedy $\Gamma(4)$, a koeficient $2^{-4}$.
> - Limitní srovnání: $\alpha>1$ dává konvergenci jen když **limita je konečná**, pro divergenci je třeba $\alpha\le1$ a limita **kladná**.
> - Gaussův integrál $\int_0^\infty e^{-x^2}dx=\frac{\sqrt\pi}2$ (přes celé $\mathbb R$ je $\sqrt\pi$).

## Praxe

Spočti hodnoty $\Gamma$ a $B$, převeď integrály na gama funkci a rozhodni o konvergenci nevlastních integrálů.
