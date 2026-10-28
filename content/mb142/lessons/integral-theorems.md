## Intuice

Integrál vydělený délkou intervalu je **průměrná hodnota** funkce. Spojitá funkce svůj průměr někde opravdu nabývá. A když plochu pod grafem „natahujeme“ horní mezí, rychlost jejího růstu je právě hodnota funkce, tedy integrování a derivování jsou navzájem inverzní.

## Vzorec

**Průměrná hodnota:** $\operatorname{av}(f)=\dfrac{1}{b-a}\displaystyle\int_a^b f$.

**1. věta o střední hodnotě:** $f\in R[a,b]\Rightarrow\int_a^b f=c\,(b-a)$ pro nějaké $c\in[m,M]$. Je-li $f$ **spojitá**, existuje $x_0\in[a,b]$ s $f(x_0)=\operatorname{av}(f)$.

**2. věta:** $f,g\in R[a,b]$, $g\ge0$ $\Rightarrow$ $\int fg=c\int g$; pro spojitou $f$ je $c=f(x_0)$.

**Integrál jako funkce horní meze** $F(x)=\int_a^x f(t)\,\mathrm{d}t$:

- $f\in R[a,b]\Rightarrow F$ je **spojitá** na $[a,b]$ (i když $f$ nespojitá).
- $f$ spojitá $\Rightarrow$ **fundamentální vztah**
$$\left(\int_a^x f(t)\,\mathrm{d}t\right)'=f(x)$$
- Dolní mez: $\left(\int_x^c f\right)'=-f(x)$.
- Složená mez: $\left(\int_a^{g(x)} f\right)'=f(g(x))\,g'(x)$.

## Mini příklad

$f(x)=4-x^2$ na $[0,3]$: $\operatorname{av}(f)=\frac13(12-9)=1$, takže $\int_0^3 f=1\cdot3=3$ a $f(x_0)=1\Rightarrow x_0=\sqrt3$.

Derivace bez výpočtu integrálu: $\left(\int_0^x t^2\sin t\,\mathrm{d}t\right)'=x^2\sin x$.

Obě meze proměnné: $H(x)=\int_x^{x^2}\ln t\,\mathrm{d}t$, rozděl přes bod $1$:
$$H'(x)=-\ln x+\ln x^2\cdot2x=(4x-1)\ln x$$

## Pozor

> - Spojitá funkce svůj průměr nabývá; **nespojitá nemusí** ($-1$ na $[-1,0)$, $1$ na $[0,1]$ má průměr $0$, ale hodnotu $0$ nikdy nenabývá).
> - Dolní mez dává **mínus**: $\left(\int_x^c f\right)'=-f(x)$.
> - U horní meze $g(x)$ nezapomeň vynásobit $g'(x)$ (řetízkové pravidlo).
> - Opačně obecně neplatí: $\int_a^x f'(t)\,\mathrm{d}t=f(x)-f(a)\neq f(x)$.

## Praxe

Průměrné hodnoty a derivace integrálu s proměnnou mezí.
