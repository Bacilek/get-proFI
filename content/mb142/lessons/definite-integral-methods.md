## Intuice

Určitý integrál se nepočítá ze součtů, ale přes **primitivní funkci**: stačí rozdíl jejích hodnot v mezích. Per partes i substituce fungují stejně jako u neurčitého integrálu, jen se hned dosazují meze (u substituce se meze **transformují**).

## Vzorec

**Newtonův–Leibnizův vzorec:** $f\in R[a,b]$, $F$ primitivní k $f$ na $(a,b)$ a spojitá na $[a,b]$:
$$\int_a^b f(x)\,\mathrm{d}x=\Big[F(x)\Big]_a^b=F(b)-F(a)$$

**Per partes:** $u,v$ mají spojitou derivaci na $[a,b]$:
$$\int_a^b u'v\,\mathrm{d}x=\Big[uv\Big]_a^b-\int_a^b uv'\,\mathrm{d}x$$

**Substituce:** $f$ spojitá na $[c,d]$, $\varphi$ má integrovatelnou derivaci, $\varphi([a,b])\subseteq[c,d]$:
$$\int_a^b f(\varphi(x))\,\varphi'(x)\,\mathrm{d}x=\int_{\varphi(a)}^{\varphi(b)} f(t)\,\mathrm{d}t$$
Volíme $t=\varphi(x)$, přepíšeme i meze (ve stejném pořadí) a **nevracíme se** k $x$.

## Mini příklad

Per partes: $\displaystyle\int_0^\pi x\cos x\,\mathrm{d}x$, $u'=\cos x$, $v=x$:
$$\Big[x\sin x\Big]_0^\pi-\int_0^\pi\sin x\,\mathrm{d}x=0+\Big[\cos x\Big]_0^\pi=-1-1=-2$$

Substituce: $\displaystyle\int_0^1\sqrt{1-x^2}\,\mathrm{d}x$, $x=\sin t$, $\mathrm{d}x=\cos t\,\mathrm{d}t$; $x=0\Rightarrow t=0$, $x=1\Rightarrow t=\frac\pi2$:
$$\int_0^{\pi/2}\cos^2 t\,\mathrm{d}t=\int_0^{\pi/2}\frac{1+\cos 2t}{2}\,\mathrm{d}t=\Big[\frac t2+\frac{\sin 2t}{4}\Big]_0^{\pi/2}=\frac\pi4$$
(čtvrtina jednotkového kruhu). Stejně vychází obsah kruhu: $P=\pi r^2$ ze substituce $x=r\sin t$.

## Pozor

> - Newtonův–Leibnizův vzorec potřebuje **omezenou integrovatelnou** $f$: $\int_{-1}^{1}\frac{1}{x^2}\,\mathrm{d}x\ne\left[-\frac1x\right]_{-1}^{1}=-2$ (záporný výsledek z kladné funkce je varování; je to nevlastní integrál, který diverguje).
> - U substituce **vždy přepiš meze** (nebo se vrať k $x$ a dosazuj původní meze, ne obojí).
> - $\varphi$ musí být na $[a,b]$ rozumná (spojitá derivace) a obraz musí ležet v oboru $f$; u $x=\sin t$ volit $t\in[-\frac\pi2,\frac\pi2]$, ať je $\cos t\ge0$ a $\sqrt{\cos^2t}=\cos t$.
> - U per partes nezapomeň dosadit meze i do členu $[uv]_a^b$.

## Praxe

Spočti určité integrály. Výsledky na 3 desetinná místa, desetinná čárka je v pořádku.
