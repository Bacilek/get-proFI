## Intuice

Derivace v bodě $x_0$ je **směrnice tečny** ke grafu, tj. okamžitá rychlost změny funkce. Vzniká z podílu $\frac{\Delta y}{\Delta x}$ (směrnice sečny), když se druhý bod přiblíží k $x_0$.

## Vzorec

**Definice:**
$$f'(x_0)=\lim_{x\to x_0}\frac{f(x)-f(x_0)}{x-x_0}=\lim_{h\to0}\frac{f(x_0+h)-f(x_0)}{h}$$
Je to vždy limita typu $\frac00$. Funkce musí být definovaná na okolí $x_0$. Značení: $f'(x_0)$, $\frac{df}{dx}(x_0)$.

**Jednostranné derivace** $f'_+(x_0)$, $f'_-(x_0)$ (jednostranné limity téhož podílu): $f'(x_0)$ existuje $\iff$ obě existují a jsou si rovny.

**Tečna** v bodě $[x_0,f(x_0)]$: $\;y-f(x_0)=f'(x_0)(x-x_0)$. **Normála** je kolmá na tečnu: směrnice $a_1a_2=-1$, tedy $a_2=-\frac1{f'(x_0)}$.

**Diferencovatelná na $I$** = vlastní derivace v každém bodě $I$.

**Věta (spojitost):** má-li $f$ v $x_0$ vlastní derivaci, je v $x_0$ spojitá. (Opačně to neplatí.)

**Derivace z definice:** $(x^2)'=2x_0$, $\;(x^3)'=3x_0^2$, $\;(x^n)'=nx_0^{n-1}$, $\;(\tfrac1x)'=-\tfrac1{x_0^2}$, $\;(\sqrt x)'=\tfrac1{2\sqrt{x_0}}$ pro $x_0>0$; $(ax+b)'=a$, $(k)'=0$.

**Fyzika:** $v(t)=s'(t)$ (rychlost = derivace dráhy), $a(t)=v'(t)$ (zrychlení), výkon $P=W'$, proud $I=Q'$.

## Mini příklad

$f(x)=\dfrac1x$, $x_0=2$:
$$f'(2)=\lim_{x\to2}\frac{\frac1x-\frac12}{x-2}=\lim_{x\to2}\frac{2-x}{2x(x-2)}=\lim_{x\to2}\frac{-1}{2x}=-\frac14.$$
Protože $f(2)=\frac12$, tečna je $y-\frac12=-\frac14(x-2)$, tj. $y=-\frac14x+1$.

**$|x|$ v $0$:** $f'_+(0)=\lim_{x\to0+}\frac{x}{x}=1$, $f'_-(0)=\lim_{x\to0-}\frac{-x}{x}=-1$. Jsou různé, takže $f'(0)$ neexistuje (graf má „špičku“, žádnou tečnu).

**$\sqrt x$ v $0$:** $f'_+(0)=\lim_{x\to0+}\frac{\sqrt x}{x}=\lim\frac1{\sqrt x}=+\infty$. Nevlastní derivace = svislá tečna.

## Pozor

> - **Spojitost ≠ derivace.** $|x|$ je spojitá v $0$, ale derivaci nemá. Naopak nespojitá funkce vlastní derivaci mít nemůže (např. $\operatorname{sgn}x$ v $0$ ji nemá).
> - U **nevlastní derivace** pravidlo „derivace ⇒ spojitost“ neplatí: $\sqrt[3]{x}$ má v $0$ derivaci $+\infty$ a je spojitá, ale $\operatorname{sgn}x$ má v $0$ také $f'(0)=\infty$ (obě jednostranné $=+\infty$) a spojitá není.
> - Podíl v definici je $\frac{f(x)-f(x_0)}{x-x_0}$, nikdy ne $\frac{f(x)}{x}$ nebo $f(x)-f(x_0)$ samotné.
> - V krajním bodě definičního oboru existuje jen jednostranná derivace.
> - Směrnice normály je **záporná převrácená** hodnota: $-\frac1{f'(x_0)}$ (pro $f'(x_0)=0$ je normála svislá).

## Praxe

Spočítej derivace z definice, urči směrnice tečen a rozhodni, kdy derivace existuje.
