## Intuice

Délku vektoru lze měřit různě: součet absolutních hodnot ($p=1$), euklidovsky ($p=2$) nebo největší složkou ($p=\infty$). Všechny tyto $p$-normy se zobecňují z vektorů na posloupnosti ($\ell^p$) a funkce ($L^p$) – místo součtu se bere integrál. Důkaz trojúhelníkové nerovnosti stojí na **Hölderově** a **Minkowského** nerovnosti.

## Vzorec

**$p$-norma** vektoru $z=(z_1,\dots,z_n)$, $p\ge1$:
$$\|z\|_p=\Big(\sum_{i=1}^n|z_i|^p\Big)^{1/p},\qquad \|z\|_\infty=\max_i|z_i|.$$

**Hölderova nerovnost** ($\frac1p+\frac1q=1$, pro $p=1$ je $q=\infty$): $\displaystyle\sum_i|x_i||y_i|\le\|x\|_p\,\|y\|_q$. Pro $p=q=2$ je to Cauchy–Schwarz.

**Minkowského nerovnost** (= trojúhelníková nerovnost pro $\|\cdot\|_p$): $\|x+y\|_p\le\|x\|_p+\|y\|_p$.

**Prostor $\ell^p$:** posloupnosti $(x_i)$ s $\sum|x_i|^p<\infty$, $\|x\|_p=\big(\sum_{i=0}^\infty|x_i|^p\big)^{1/p}$. $\ell^\infty$: omezené posloupnosti, $\|x\|_\infty=\sup|x_i|$.

**Funkce** (po částech spojité na $[a,b]$): $\|f\|_p=\Big(\int_a^b|f|^p\,dx\Big)^{1/p}$, $\|f\|_\infty=\sup_{[a,b]}|f|$. Hölder: $\int|fg|\le\|f\|_p\|g\|_q$; Minkowski: $\|f+g\|_p\le\|f\|_p+\|g\|_p$.

**Jednotková koule** $\{\|z\|_p\le1\}$ v $\mathbb R^2$: $p=1$ je kosočtverec, $p=2$ kruh, $p=\infty$ čtverec.

## Mini příklad

$z=(3,-4)$: $\|z\|_1=7$, $\|z\|_2=5$, $\|z\|_\infty=4$ (vždy $\|z\|_\infty\le\|z\|_2\le\|z\|_1$).

Pro $f(x)=x$ na $[0,1]$: $\|f\|_1=\frac12$, $\|f\|_2=\sqrt{\int_0^1x^2}=\frac1{\sqrt3}$, $\|f\|_\infty=1$.

Hölder pro $x=(1,2)$, $y=(3,1)$, $p=q=2$: $1\cdot3+2\cdot1=5\le\sqrt5\cdot\sqrt{10}=\sqrt{50}\approx7{,}07$.

## Pozor

> - V definici je $|z_i|^p$ a **odmocnina stupně $p$** celého součtu, ne odmocnina u každého členu.
> - Pro $0<p<1$ vzorec **není norma** (porušuje trojúhelníkovou nerovnost); platí jen $p\ge1$.
> - $\|f\|_p=0$ jen pro funkci nulovou **skoro všude**; pro po částech spojité funkce proto ztotožňujeme funkce lišící se v bodech nespojitosti.
> - Prostory po částech spojitých funkcí s $L^p$ normou **nejsou úplné** (viz další lekce).
> - Hölderovy exponenty musí splnit $\frac1p+\frac1q=1$ (např. $p=3\Rightarrow q=\frac32$).

## Praxe

Spočítej $p$-normy vektorů a funkcí, najdi sdružený exponent $q$ a ověř Hölderovu nerovnost na konkrétních datech.
