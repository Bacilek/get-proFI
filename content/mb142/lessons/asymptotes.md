## Intuice

Asymptota je přímka, ke které se graf libovolně přibližuje: svislá poblíž bodu, kde funkce „exploduje“, nebo šikmá/vodorovná v $\pm\infty$.

## Vzorec

**Bez směrnice** (svislá): přímka $x=x_0$, pokud je alespoň jedna jednostranná limita v $x_0$ nevlastní:
$$\lim_{x\to x_0^\pm}f(x)=\pm\infty.$$
Hledej jen v bodech nespojitosti (a v krajích definičního oboru).

**Se směrnicí** $y=ax+b$ v $+\infty$ (analogicky v $-\infty$):
$$a=\lim_{x\to\infty}\frac{f(x)}{x},\qquad b=\lim_{x\to\infty}\bigl[f(x)-ax\bigr].$$
Obě limity musí být **vlastní**. Počítej zvlášť $a^+,b^+$ (pro $+\infty$) a $a^-,b^-$ (pro $-\infty$). Případ $a=0$ je vodorovná asymptota $y=b=\lim f$.

## Mini příklad

$f(x)=\dfrac{(x-2)^3}{(x+2)^2}$:
- svisle: $x=-2$, protože $\lim_{x\to-2^\pm}f=\frac{-64}{+0}=-\infty$;
- $a=\lim\frac{(x-2)^3}{x(x+2)^2}=1$, $b=\lim\frac{(x-2)^3-x(x+2)^2}{(x+2)^2}=\lim\frac{-10x^2+8x-8}{(x+2)^2}=-10$ ⇒ $y=x-10$ v $+\infty$ i v $-\infty$.

$f(x)=\sqrt{x^2+1}$: $a^+=1,\ b^+=0$ ($y=x$), ale $a^-=-1,\ b^-=0$ ($y=-x$) – v $\pm\infty$ jsou různé asymptoty.

## Pozor

> - V $+\infty$ a $-\infty$ se asymptoty **mohou lišit** (nebo existovat jen na jedné straně) – počítej oba směry.
> - Nejdřív $a$, potom $b$. Pokud $a$ je $\pm\infty$ nebo neexistuje, asymptota se směrnicí není.
> - Svislá asymptota je jen v bodě nespojitosti, ale ne každá nespojitost ji dává ($\frac{\sin x}{x}$ v $0$ nemá).
> - Vodorovná asymptota je speciální případ ($a=0$); u racionální funkce záleží na stupních čitatele a jmenovatele.
> - $f(x)=\ln x$ má svislou asymptotu $x=0$ ($0^+$), ale v $\infty$ žádnou ($a=0$, $b=\infty$).

## Praxe

Najdi všechny asymptoty (svislé i se směrnicí).
