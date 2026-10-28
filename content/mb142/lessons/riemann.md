## Intuice

Určitý (Riemannův) integrál $\int_a^b f$ je **orientovaná plocha** mezi grafem $f$ a osou $x$: nad osou se počítá kladně, pod osou záporně. Plochu „sevřeme“ shora a zdola obdélníky.

## Definice

Dělení $D=\{x_0=a<x_1<\dots<x_n=b\}$, **norma** $n(D)=\max(x_k-x_{k-1})$. Pro ohraničenou $f$ je $m_k=\inf f$ a $M_k=\sup f$ na $[x_{k-1},x_k]$:

$$s(D,f)=\sum m_k(x_k-x_{k-1}),\qquad S(D,f)=\sum M_k(x_k-x_{k-1})$$

Dolní integrál $\underline{\int}f=\sup_D s$, horní $\overline{\int}f=\inf_D S$ (vždy $\underline\int\le\overline\int$). Když se rovnají, $f$ je **integrovatelná** ($f\in R[a,b]$) a ten společný údaj je $\int_a^b f$.

- **Spojitá** nebo **monotónní** funkce na $[a,b]$ je integrovatelná.
- Změna v konečně mnoha bodech integrál nemění.
- Pro $n(D_k)\to0$ platí $s(D_k,f)\to\int_a^b f$ (a stejně $S$), je-li $f$ integrovatelná.

## Vlastnosti

- Linearita: $\int (cf\pm g)=c\int f\pm\int g$; monotonie: $f\le g\Rightarrow\int f\le\int g$; $\left\lvert\int f\right\rvert\le\int\lvert f\rvert$.
- Návaznost: $\int_a^b f=\int_a^c f+\int_c^b f$.
- Konvence: $\int_a^a f=0$, $\int_b^a f=-\int_a^b f$.
- $c\le f\le d\Rightarrow c(b-a)\le\int_a^b f\le d(b-a)$.
- **Součin** integrálů obecně neplatí: $\int fg\neq\int f\cdot\int g$.

## Mini příklad

$f(x)=x^2$ na $[0,1]$, dělení na $n$ stejných dílů. $m_k=\left(\frac{k-1}{n}\right)^2$:
$$s(D_n,f)=\frac1{n^3}\sum_{k=1}^{n}(k-1)^2=\frac{(n-1)n(2n-1)}{6n^3}\to\frac13\ \Rightarrow\ \int_0^1x^2\,\mathrm{d}x=\frac13$$

Pak z linearity: $\int_0^1(x^2+x)\,\mathrm{d}x=\frac13+\frac12=\frac56$.

## Pozor

> - Dirichletova funkce ($1$ na $\mathbb{Q}$, $0$ jinde) **není** integrovatelná: $s=0$, $S=b-a$.
> - Plocha pod osou $x$ se počítá **záporně**: $\int_{-1}^1x^3\,\mathrm{d}x=0$.
> - $\int_{-2}^{3}\operatorname{sgn}x\,\mathrm{d}x=3-2=1$, nespojitost v jednom bodě nevadí.
> - Při prohození mezí se mění znaménko.

## Praxe

Dolní a horní součty, vlastnosti a hodnoty z geometrie.
