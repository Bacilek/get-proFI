## Intuice

Limita $\lim_{x\to x_0}f(x)=L$ říká, že hodnoty $f(x)$ se libovolně blíží k $L$, když se $x$ blíží k $x_0$ (ale $x\ne x_0$). **Na hodnotě $f(x_0)$ nezáleží**, ta nemusí ani existovat. Bod $x_0$ i $L$ smí být $\pm\infty$.

## Vzorec

**Definice (vlastní limita ve vlastním bodě):**
$$\forall\varepsilon>0\ \exists\delta>0:\ 0<|x-x_0|<\delta\ \Rightarrow\ |f(x)-L|<\varepsilon$$
Pro $x_0=\infty$ se $0<|x-x_0|<\delta$ nahradí podmínkou $x>a$ (pro $-\infty$: $x<b$). Jednostranné limity $x\to x_0^\pm$: bereme jen pravé/levé okolí.

**Existence:** $\displaystyle\lim_{x\to x_0}f(x)=L\iff\lim_{x\to x_0^+}f(x)=L=\lim_{x\to x_0^-}f(x)$. Limita je nejvýše jedna a vlastní limita znamená, že $f$ je v okolí $x_0$ omezená.

**Aritmetika** (pro vlastní $L,M$): limita součtu, součinu, podílu ($M\ne0$) a $|f|$ je součet, součin, podíl a $|L|$.

**Věta o třech limitách:** je-li $g\le f\le h$ na prstencovém okolí $x_0$ a $\lim g=\lim h=L$, pak $\lim f=L$.

**Základní limity** (všechny typu $\frac00$ pro $x\to0$):
$$\frac{\sin x}{x}\to1,\quad \frac{1-\cos x}{x}\to0,\quad \frac{e^x-1}{x}\to1,\quad \frac{\ln(1+x)}{x}\to1,\quad \frac{a^x-1}{x}\to\ln a,\quad \frac{\log_a(1+x)}{x}\to\frac1{\ln a}$$
$$\lim_{x\to\infty}\Bigl(1+\frac ax\Bigr)^x=e^a\qquad(a\in\mathbb R)$$

**Typ limity** zjistíme dosazením $x_0$: $\frac00,\ \frac\infty\infty,\dots$ Ten se pak „odstraní“ úpravou (krácení, rozšíření, základní limity).

## Mini příklad

$\displaystyle\lim_{x\to2}\frac{x^2-4}{x-2}$ je typ $\frac00$: $\ \frac{(x-2)(x+2)}{x-2}=x+2\to4$.

**Rozšíření:** $\displaystyle\lim_{x\to0}\frac{1-\cos x}{x}=\lim\frac{1-\cos^2x}{x(1+\cos x)}=\lim\frac{\sin x}{x}\cdot\sin x\cdot\frac1{1+\cos x}=1\cdot0\cdot\tfrac12=0$.

**Substituce do základní limity:** $\displaystyle\lim_{x\to0}\frac{\sin 5x}{x}=\lim 5\cdot\frac{\sin5x}{5x}=5\cdot1=5$.

**Věta o třech limitách:** $-|x|\le x\sin\frac1x\le|x|$ a $|x|\to0$, tedy $\lim_{x\to0}x\sin\frac1x=0$.

**Z definice:** $\lim_{x\to3}(3x+1)=10$: $|3x+1-10|=3|x-3|<\varepsilon$, stačí $\delta=\varepsilon/3$.

## Pozor

> - Limita **nezávisí na $f(x_0)$** ($x\ne x_0$ v definici). Např. $\frac{x^2-4}{x-2}$ má v $2$ limitu $4$, i když tam není definovaná.
> - Limita **neexistuje**, když: *skok* (jednostranné limity různé, např. $\operatorname{sgn}x$ v $0$), *nevlastní skok* ($\frac1x$ v $0$: $+\infty$ a $-\infty$), *oscilace* ($\sin\frac1x$ v $0$). Funkce $\mathbf 1_{\mathbb Q}$ nemá limitu nikde.
> - Aritmetika platí **jen pro vlastní limity** (nebo nevlastní bez neurčitých výrazů): $\infty-\infty$, $0\cdot\infty$, $\frac00$, $\frac\infty\infty$, $1^\infty$ nejsou „spočítané“, jsou to jen typy.
> - V $\frac{\sin 5x}{x}$ je potřeba **doplnit stejný argument** ve jmenovateli ($5x$), jinak vyjde chybná hodnota (ne $1$, ale $5$).
> - Základní limity platí jen pro $x\to0$ (resp. argument $\to0$): $\frac{\sin x}{x}\to0$ pro $x\to\infty$, ne $1$.
> - Věta o třech limitách se hodí pro „omezená $\times$ nulová“ ($x\sin\frac1x$, $\frac{\cos x}{x}\to0$ v $\infty$).

## Praxe

Spočítej limity (úpravou, základními limitami) a rozhodni, kdy limita existuje.
