## Intuice

Derivace se „rozkládá“ přes algebru funkcí: součet, součin, podíl, skládání i inverzi. Hlavní myšlenka skládání: **změny se násobí** (soukolí: $y$ se mění $\frac13\times$ rychleji než $u$, $u$ $\frac32\times$ rychleji než $x$, tedy $y$ $\frac12\times$ rychleji než $x$).

## Vzorec

Mají-li $f,g$ vlastní derivaci v $x$:

| pravidlo | vzorec |
|---|---|
| konstantní násobek | $(c f)'=c f'$ |
| součet, rozdíl | $(f\pm g)'=f'\pm g'$ |
| součin | $(fg)'=f'g+fg'$ |
| podíl | $\left(\dfrac fg\right)'=\dfrac{f'g-fg'}{g^2}$ |

**Složená funkce:** $\;(f\circ g)'(x)=f'\big(g(x)\big)\cdot g'(x)$ – derivuj vnější, argument (vnitřek) nech být, vynásob derivací vnitřní.

**Inverzní funkce:** je-li $x=f(y)$ spojitá a ryze monotónní a $f'(y_0)\ne0$, pak pro $x_0=f(y_0)$
$$(f^{-1})'(x_0)=\frac1{f'(y_0)}=\frac1{f'(f^{-1}(x_0))}.$$
Pro $f'(y_0)=0$ je $(f^{-1})'(x_0)=+\infty$ ($f$ rostoucí), resp. $-\infty$ ($f$ klesající). Geometricky: graf $f^{-1}$ je souměrný podle $y=x$, tečny se „překlopí“, směrnice se převrátí.

**Vyšší derivace:** $f''=(f')'$, $f^{(n)}=(f^{(n-1)})'$.

## Mini příklad

**Podíl:** $\left(\dfrac{x^2+1}{x^2-1}\right)'=\dfrac{2x(x^2-1)-(x^2+1)2x}{(x^2-1)^2}=\dfrac{-4x}{(x^2-1)^2}$.

**Složená:** $\left(\sqrt{x^2+x}\right)'=\dfrac1{2\sqrt{x^2+x}}\cdot(2x+1)$; $\;\big((x^2+x)^2\big)'=2(x^2+x)(2x+1)=4x^3+6x^2+2x$ (stejné jako derivace $x^4+2x^3+x^2$).

**Inverzní:** $f(y)=y^3$, $f^{-1}(x)=\sqrt[3]x$. Pak $(\sqrt[3]x)'=\dfrac1{3y^2}=\dfrac1{3\sqrt[3]{x^2}}$.

**Druhá derivace:** $(\sqrt x)''=\left(\tfrac1{2\sqrt x}\right)'=-\dfrac1{4x\sqrt x}$.

## Pozor

> - **Součin a podíl nejsou „derivace po složkách“:** $(fg)'\ne f'g'$, $\left(\frac fg\right)'\ne\frac{f'}{g'}$. U podílu záleží na pořadí v čitateli: $f'g-fg'$ (ne $fg'-f'g$).
> - **Zapomenutá vnitřní derivace** je nejčastější chyba: $(\sin x^2)'=2x\cos x^2$, ne $\cos x^2$.
> - U složené funkce vnější funkci derivuj **v bodě $g(x)$**, ne v $x$.
> - Inverzní derivace: v $\frac1{f'(y_0)}$ se dosazuje $y_0=f^{-1}(x_0)$, ne $x_0$.
> - Podíl s konstantou v čitateli je často lepší psát jako mocninu: $\frac1{g}=g^{-1}$, $(g^{-1})'=-g^{-2}g'$.
> - Vždy $D(f')\subseteq D(f)$: derivace může být definovaná na menší množině (např. $\sqrt x$ na $[0,\infty)$, ale $(\sqrt x)'$ jen na $(0,\infty)$).

## Praxe

Derivuj součiny, podíly a složené funkce a použij větu o inverzní funkci.
