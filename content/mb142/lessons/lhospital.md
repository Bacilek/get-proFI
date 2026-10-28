## Intuice

Limita podílu $\frac00$ nebo $\frac{\pm\infty}{\pm\infty}$ se často vyřeší tak, že **zvlášť zderivuješ čitatele a jmenovatele** (ne podíl!). Ostatní neurčité výrazy se na tyto dva typy nejdřív převedou.

## Vzorec

**L'Hospitalovo pravidlo.** Nechť $\lim_{x\to x_0}\frac{f(x)}{g(x)}$ je typu $\frac00$ nebo $\frac{\pm\infty}{\pm\infty}$ ($x_0\in\mathbb R^*$). Existuje-li (vlastní i nevlastní) limita $\lim\frac{f'(x)}{g'(x)}=L$, pak existuje i původní limita a platí
$$\lim_{x\to x_0}\frac{f(x)}{g(x)}=\lim_{x\to x_0}\frac{f'(x)}{g'(x)}=L.$$

**Převody ostatních typů:**
- $0\cdot\infty$: $\;f\,g=\dfrac{f}{1/g}$ (nebo $\dfrac g{1/f}$) $\to\frac00$ či $\frac\infty\infty$.
- $\infty-\infty$: společný jmenovatel, případně $f-g=\dfrac{\frac1g-\frac1f}{\frac1{fg}}$.
- $0^0,\ \infty^0,\ 1^\infty$: $\;f^g=e^{g\ln f}$, spočítej limitu exponentu (typ $0\cdot\infty$) a použij spojitost $e^x$.

## Mini příklad

$\displaystyle\lim_{x\to0^+}x\ln x=\lim_{x\to0^+}\frac{\ln x}{1/x}\overset{\text{l'H}}=\lim\frac{1/x}{-1/x^2}=\lim(-x)=0.$

Proto $\displaystyle\lim_{x\to0^+}x^x=\lim e^{x\ln x}=e^0=1$.

$\displaystyle\lim_{x\to0}\frac{1-\cos x}{x^2}\overset{\text{l'H}}=\lim\frac{\sin x}{2x}=\frac12$ (opakované použití, pokud po derivaci zůstane $\frac00$).

## Pozor

> - Derivuješ čitatele a jmenovatele **zvlášť**, nikoli podíl jako celek.
> - Pravidlo platí jen pro typ $\frac00$ a $\frac\infty\infty$. Pro $\frac{\text{cokoli}}{0}$ nepoužívat: $\lim_{x\to\infty}\frac{\operatorname{arctg}x}{\operatorname{arccotg}x}=\frac{\pi/2}{+0}=\infty$, ale podíl derivací dává $-1$.
> - Pokud $\lim\frac{f'}{g'}$ **neexistuje**, nic se neříká o původní limitě: $\lim_{x\to\infty}\frac{\sin x}x=0$ (omezená/nekonečno), ale $\frac{\cos x}1$ limitu nemá.
> - Před použitím vždy ověř typ; často stačí upravit nebo použít základní limity a l'Hospital by byl zbytečně složitý.
> - Limita typu $\frac{k}{\pm\infty}$ ($k$ konstanta) je automaticky $0$.

## Praxe

Spočítej limity a rozhodni, kdy pravidlo smíš použít.
