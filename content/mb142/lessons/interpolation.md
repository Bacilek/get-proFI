## Intuice

Máme $n+1$ bodů $(x_i,y_i)$ s různými $x_i$ a chceme funkci, která jimi prochází. Nejjednodušší je **polynom** stupně nejvýše $n$ – a je určen **jednoznačně**. Lze ho najít řešením soustavy (Vandermondova matice), anebo přímo **Lagrangeovým** vzorcem bez řešení soustavy.

## Vzorec

**Věta 95.** Pro navzájem různé $x_0,\dots,x_n$ a libovolné $y_0,\dots,y_n$ existuje **právě jeden** polynom $f$ stupně nejvýše $n$ s $f(x_i)=y_i$.

*Důkaz (idea):* koeficienty $a_0,\dots,a_n$ splňují soustavu $\sum_ka_kx_i^k=y_i$ s **Vandermondovým determinantem**
$$V(x_0,\dots,x_n)=\prod_{i>j}(x_i-x_j)\ne0.$$

**Lagrangeův tvar.** Pomocné polynomy
$$\ell_i(x)=\prod_{j\ne i}\frac{x-x_j}{x_i-x_j},\qquad \ell_i(x_j)=\begin{cases}1&i=j\\0&i\ne j\end{cases},\qquad f(x)=\sum_{i=0}^ny_i\,\ell_i(x).$$

**Poznámky:** řešení soustavy stojí ~$n^3$ operací; vyčíslení polynomu vysokého stupně v bodě je pomalé a numericky nestabilní (velká $x$). Lagrangeův tvar dává polynom přímo; jiné báze (Newtonova) usnadňují přidání bodu.

## Mini příklad

Body $(2,1),(3,0),(4,-1),(5,6)$ (stupeň $\le3$). Lagrange:
$$P(x)=1\cdot\frac{(x-3)(x-4)(x-5)}{(2-3)(2-4)(2-5)}+(-1)\cdot\frac{(x-2)(x-3)(x-5)}{(4-2)(4-3)(4-5)}+6\cdot\frac{(x-2)(x-3)(x-4)}{(5-2)(5-3)(5-4)}$$
$$=\frac43x^3-12x^2+\frac{101}3x-29.$$
(Ověř: $P(2)=1,\ P(3)=0,\ P(4)=-1,\ P(5)=6$.)

**Menší příklad:** body $(0,1),(1,3),(2,7)$: $f(x)=1\cdot\frac{(x-1)(x-2)}{2}+3\cdot\frac{x(x-2)}{-1}+7\cdot\frac{x(x-1)}{2}=x^2+x+1$.

## Pozor

> - Pro $n+1$ bodů je stupeň **nejvýše $n$** (může vyjít menší, třeba $0$ pro stejné $y_i$).
> - Body $x_i$ musí být **navzájem různé**, jinak $V=0$ a úloha nemá jednoznačné řešení.
> - V $\ell_i$ se ve **jmenovateli** dosazuje $x_i$ (konstanta), v čitateli proměnná $x$; $\ell_i(x_i)=1$ ověř.
> - Vysoký stupeň ≠ dobrá aproximace: polynomiální interpolace může mezi uzly silně oscilovat a je citlivá na chyby (proto se používají po částech polynomy – splajny).

## Praxe

Najdi interpolační polynom (řešením soustavy i Lagrangeovým vzorcem) a spočti jeho hodnotu v jiném bodě.
