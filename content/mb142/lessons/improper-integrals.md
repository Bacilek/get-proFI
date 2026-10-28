## Intuice

Nevlastní integrál je plocha pod grafem na **nekonečném intervalu** (1. druh) nebo pod **neohraničenou funkcí** (2. druh). Počítá se jako obyčejný integrál s proměnnou mezí a pak limita. Plocha může být konečná (konverguje), nekonečná (diverguje) nebo limita neexistuje.

## Vzorec

**1. druh** (nekonečná mez):
$$\int_a^\infty f=\lim_{b\to\infty}\int_a^b f,\qquad \int_{-\infty}^b f=\lim_{a\to-\infty}\int_a^b f$$

**2. druh** ($f$ neohraničená u kraje):
$$\int_a^b f=\lim_{\alpha\to a^+}\int_\alpha^b f\ \ (\text{problém v }a),\qquad \int_a^b f=\lim_{\beta\to b^-}\int_a^\beta f\ \ (\text{problém v }b)$$

- Vlastní limita $L$ $\Rightarrow$ **konverguje**, hodnota $L$. Limita $\pm\infty$ $\Rightarrow$ **diverguje**.
- Přes celé $\mathbb{R}$: rozděl v pevném bodě, $\int_{-\infty}^\infty f=\int_{-\infty}^{0}f+\int_0^\infty f$; konverguje, jen když konvergují **obě** části.
- Při zápisu lze limitu schovat do dosazení: $\Big[F\Big]_a^\infty=\lim_{x\to\infty}F(x)-F(a)$. Metody (substituce, per partes) jsou stejné jako u určitého integrálu.

**Důležité typy** (srovnávací etalon):
$$\int_1^\infty\frac{1}{x^p}\,\mathrm{d}x\ \text{konverguje}\iff p>1,\qquad \int_0^1\frac{1}{x^p}\,\mathrm{d}x\ \text{konverguje}\iff p<1$$

## Mini příklad

$\displaystyle\int_1^\infty\frac{1}{x^2}\,\mathrm{d}x=\Big[-\frac1x\Big]_1^\infty=0+1=1$ (konverguje), ale $\displaystyle\int_1^\infty\frac{1}{x}\,\mathrm{d}x=\Big[\ln x\Big]_1^\infty=\infty$ (diverguje).

Funkce neohraničená u $0$: $\displaystyle\int_0^1\frac{1}{\sqrt x}\,\mathrm{d}x=\Big[2\sqrt x\Big]_0^1=2$, ale $\displaystyle\int_0^1\frac1{x^2}\,\mathrm{d}x=\Big[-\frac1x\Big]_0^1=-1+\infty=\infty$.

Se substitucí: $\displaystyle\int_0^\infty\frac{x}{(x^2+a^2)^2}\,\mathrm{d}x$, $t=x^2$, $\mathrm{d}t=2x\,\mathrm{d}x$:
$$\frac12\int_0^\infty\frac{\mathrm{d}t}{(t+a^2)^2}=\frac12\Big[-\frac{1}{t+a^2}\Big]_0^\infty=\frac{1}{2a^2}$$

## Pozor

> - $1/x$ je **hraniční případ**: na $[1,\infty)$ i na $(0,1]$ diverguje. Hranice konvergence je $p=1$, ale na opačné straně.
> - Integrál $\int_{-1}^{1}\frac{1}{x^2}\,\mathrm{d}x$ **nepočítej** jako $[-\frac1x]_{-1}^1=-2$: problém je uvnitř, rozděl v $0$ a obě části divergují.
> - Přes $\mathbb{R}$ nepočítej „symetricky“ $\lim_{b\to\infty}\int_{-b}^b$: $\int_{-b}^b x\,\mathrm{d}x=0$, ale $\int_{-\infty}^\infty x\,\mathrm{d}x$ diverguje.
> - Je-li $F$ v kraji spojitá (např. $\arcsin$ v $1$), limita je jen dosazení: $\int_{-1}^1\frac{\mathrm{d}x}{\sqrt{1-x^2}}=\pi$.
> - Limity typu $x e^{-x}$ ($\infty\cdot0$) uprav na zlomek a použij l'Hospitala.

## Praxe

Spočti nevlastní integrály nebo rozhodni o konvergenci. Výsledky na 3 desetinná místa.
