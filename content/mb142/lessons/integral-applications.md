## Intuice

Všechny aplikace mají stejný vzorec vzniku: rozřežeme útvar na úzké proužky, každý přibližně spočteme a součet je Riemannův součet, tedy integrál. Stačí si pamatovat, **co je „výška proužku“**.

## Vzorec

**Plocha mezi grafy** ($f,g\in R[a,b]$, $f\ge g$):
$$P=\int_a^b\big[f(x)-g(x)\big]\,\mathrm{d}x=\int_a^b(\text{horní}-\text{dolní})\,\mathrm{d}x\ \ge0$$
Meze dostaneš z průsečíků grafů; pokud se grafy křižují, rozděl interval v průsečících.

**Délka křivky** $[x(t),y(t)]$, $t\in[\alpha,\beta]$, se spojitými $x',y'$:
$$d=\int_\alpha^\beta\sqrt{[x'(t)]^2+[y'(t)]^2}\,\mathrm{d}t$$
**Délka grafu** ($f'$ spojitá): $\;d=\displaystyle\int_a^b\sqrt{1+[f'(x)]^2}\,\mathrm{d}x$.

**Objem rotačního tělesa** (rotace plochy pod $f\ge0$ kolem osy $x$):
$$V=\pi\int_a^b f^2(x)\,\mathrm{d}x$$

**Obsah pláště** rotačního tělesa ($f\ge0$): $\;S=2\pi\displaystyle\int_a^b f(x)\sqrt{1+[f'(x)]^2}\,\mathrm{d}x$.

## Mini příklad

Plocha mezi $y=1-x^2$ a $y=-3$: průsečíky $x=\pm2$, horní je parabola:
$$P=\int_{-2}^{2}(4-x^2)\,\mathrm{d}x=\Big[4x-\tfrac{x^3}{3}\Big]_{-2}^{2}=\tfrac{32}{3}$$

Objem koule o poloměru $r$ (rotace $\sqrt{r^2-x^2}$, dvojnásobek polokoule):
$$V=2\pi\int_0^r(r^2-x^2)\,\mathrm{d}x=2\pi\Big[r^2x-\tfrac{x^3}{3}\Big]_0^r=\tfrac43\pi r^3$$

Obvod kružnice: $[r\cos t,r\sin t]$, $t\in[0,2\pi]$, $\sqrt{r^2\sin^2t+r^2\cos^2t}=r$, takže $d=2\pi r$.

## Pozor

> - Plocha je **horní − dolní**, vždy $\ge0$. $\int_a^b f$ je orientovaná plocha: $\int_0^{2\pi}\sin x\,\mathrm{d}x=0$, skutečná plocha je $4$ (počítej po půlperiodách).
> - U objemu se **umocňuje celé $f$**, $\pi\int f^2$, ne $\big(\int f\big)^2$; $\pi$ před integrál.
> - Délka grafu vede často na těžký integrál (např. $\sqrt{1+x^2}$); u zkoušky bývá s daným výsledkem nebo jednoduchou parametrizací.
> - Rotace kolem osy $x$ předpokládá $f$ **neměnící znaménko**.

## Praxe

Plochy, délky a objemy. Výsledky na 3 desetinná místa.
