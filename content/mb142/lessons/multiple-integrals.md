## Intuice

Dvojný integrál $\iint_Af\,dx\,dy$ je „objem pod grafem“ $f$ nad množinou $A\subseteq\mathbb R^2$ (pro $f\equiv1$ je to **obsah** $A$). Konstruuje se jako Riemannův integrál: rovinu pokryjeme sítí čtverců, sečteme „sup·plocha“ (horní součet) a „inf·plocha“ (dolní součet); když mají společnou limitu, $f$ je integrovatelná. Počítá se ale převodem na **dvojnásobný** integrál (dva obyčejné integrály po sobě).

## Vzorec

**Integrovatelnost.** $f$ spojitá a omezená na omezené měřitelné $A$ je integrovatelná; stačí i omezená a **skoro všude** spojitá. Měřitelná = hranice má míru $0$. Změna $f$ na množině míry nula integrál nemění.

**Vlastnosti** (jako v $\mathbb R^1$): linearita $\iint(f\pm g)$, $\iint\alpha f$; aditivita $\iint_{A\cup B}=\iint_A+\iint_B$ pro $A\cap B$ míry nula; monotonie $f\le g\Rightarrow\iint f\le\iint g$; $\left|\iint f\right|\le\iint|f|$; $m(A)=\iint_A1\,dx\,dy$.

**Fubiniova věta.** Pro obdélník $A=[a,b]\times[c,d]$ a $f$ spojitou:
$$\iint_Af=\int_a^b\!\!\int_c^d f(x,y)\,dy\,dx=\int_c^d\!\!\int_a^b f(x,y)\,dx\,dy.$$
Pro **normální oblast** $A=\{a\le x\le b,\ g(x)\le y\le h(x)\}$:
$$\iint_Af=\int_a^b\int_{g(x)}^{h(x)}f(x,y)\,dy\,dx$$
(a analogicky $c\le y\le d$, $g(y)\le x\le h(y)$). Vnitřní integrál se počítá podle jedné proměnné, druhá je konstanta. **Změna pořadí** = oblast popsat „z druhé strany“ (nakreslit!).

**Trojný integrál:** $A=\{a\le x\le b,\ g(x)\le y\le h(x),\ G(x,y)\le z\le H(x,y)\}$:
$$\iiint_Af=\int_a^b\int_{g(x)}^{h(x)}\int_{G(x,y)}^{H(x,y)}f\,dz\,dy\,dx,\qquad \text{objem}=\iiint_A1.$$
Analogicky $n$-rozměrný kvádr = $n$ vnořených integrálů.

**Aplikace** ($\sigma(x,y)$ plošná hustota):
$$\text{střední hodnota}=\frac{\iint_Af}{m(A)},\quad \text{hmotnost }m=\iint\sigma,\quad U_x=\iint y\sigma,\ U_y=\iint x\sigma\ \text{(lineární momenty)}$$
$$J_x=\iint y^2\sigma,\ J_y=\iint x^2\sigma,\ J_o=\iint(x^2+y^2)\sigma\ \text{(momenty setrvačnosti)},\qquad x_T=\frac{\iint x}{S},\ y_T=\frac{\iint y}{S}\ (\sigma=1).$$

## Mini příklad

**Normální oblast:** $\displaystyle\iint_Ax^3y\,dx\,dy$, $A=\{0\le x\le1,\ x^3\le y\le x\}$:
$$\int_0^1x^3\left[\frac{y^2}2\right]_{x^3}^{x}dx=\frac12\int_0^1\big(x^5-x^9\big)dx=\frac12\left(\frac16-\frac1{10}\right)=\frac1{30}.$$

**Změna pořadí:** $\displaystyle\int_0^1\!\int_{x^2}^{\sqrt{2x-x^2}}f\,dy\,dx$. Hranice: $y=x^2\Rightarrow x=\sqrt y$; $y=\sqrt{2x-x^2}\Leftrightarrow(x-1)^2+y^2=1,\ y\ge0\Rightarrow x=1-\sqrt{1-y^2}$. Pro $y\in[0,1]$:
$$=\int_0^1\!\int_{1-\sqrt{1-y^2}}^{\sqrt y}f\,dx\,dy.$$

**Obsah:** $A=\{-1\le x\le1,\ 0\le y\le\sqrt{1-x^2}\}$: $m(A)=\int_{-1}^1\sqrt{1-x^2}\,dx=\frac\pi2$ (půlkruh).

**Simplex** $\{x_i\ge0,\ x_1+\dots+x_n\le1\}$ má objem $\dfrac1{n!}$ (pro $n=4$: $\frac1{24}$).

## Pozor

> - U Fubiniho **meze vnitřního integrálu mohou záviset jen na vnějších proměnných**; vnější integrál má konstantní meze.
> - Při změně pořadí **vždy načrtni oblast** a najdi průsečíky hranic; oblast může být nutné rozdělit na víc částí.
> - Pořadí integrace často rozhoduje o **složitosti**: $\int\!\!\int e^{y^2}dy\,dx$ nejde po $y$, ale po záměně pořadí ano.
> - $\iint f\,dx\,dy$ nemá „záporný objem“: kde je $f<0$, se příspěvek odčítá. Obsah/objem = integrál z $1$ nebo $|f|$.
> - Těžiště: $x_T=\frac{\iint x}{S}$ (moment ÷ obsah), nezaměnit $U_x$ a $U_y$ (moment vůči ose $x$ je s $y$).
> - U simplexu a podobných oblastí s podmínkou typu $x_1+x_2\le1$ je horní mez další proměnné $1-x_1-\dots$.

## Praxe

Spočti dvojnásobné integrály přes obdélníky a normální oblasti, změň pořadí integrace, urči obsahy, objemy a těžiště.
