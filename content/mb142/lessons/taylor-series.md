## Intuice

Taylorova řada je „nekonečný Taylorův polynom“: z derivací funkce v bodě $x_0$ postavíme mocninnou řadu. Ptáme se, **kde konverguje** a hlavně **zda konverguje právě k $f$**. Maclaurinova řada je speciální případ $x_0=0$.

## Vzorec

**Taylorova řada** funkce $f$ (s derivacemi všech řádů) se středem $x_0$:
$$\sum_{n=0}^\infty\frac{f^{(n)}(x_0)}{n!}(x-x_0)^n=f(x_0)+f'(x_0)(x-x_0)+\frac{f''(x_0)}{2!}(x-x_0)^2+\dots$$
Pro $x_0=0$ je to **Maclaurinova řada** $\sum\frac{f^{(n)}(0)}{n!}x^n$. Koeficienty jsou tedy $a_n=\frac{f^{(n)}(x_0)}{n!}$ a polynom je její částečný součet.

**Konvergence k $f$:** řada konverguje v $x_0$ vždy (k $f(x_0)$), ale ke $f(x)$ jen tehdy, když $R_n(x)\to0$ (Taylorův zbytek). Postačí, že $|f^{(n)}(x)|\le M$ pro všechna $n$ a $x\in I$.
Protipříklad: $f(x)=e^{-1/x^2}$, $f(0)=0$, má všechny derivace v $0$ nulové, Maclaurinova řada je $0$, a tedy se $f$ rovná jen v $x=0$.

**Rozvoje, které je nutné znát** (Maclaurin):
$$e^x=\sum_{n=0}^\infty\frac{x^n}{n!},\quad \sin x=\sum_{n=0}^\infty\frac{(-1)^nx^{2n+1}}{(2n+1)!},\quad \cos x=\sum_{n=0}^\infty\frac{(-1)^nx^{2n}}{(2n)!}\qquad x\in\mathbb R$$
$$\ln(1+x)=\sum_{n=1}^\infty\frac{(-1)^{n-1}x^n}{n}\ (x\in(-1,1]),\quad \frac1{1-x}=\sum_{n=0}^\infty x^n,\quad \frac1{1+x}=\sum_{n=0}^\infty(-1)^nx^n\ (x\in(-1,1))$$
Polynom je svým vlastním Maclaurinovým rozvojem.

**Nové rozvoje počítáme algebrou**: sčítání, násobení, substituce a derivace/integrace člen po členu uvnitř intervalu konvergence (nepočítáme znovu derivace).

**Aplikace:** přibližné hodnoty funkcí, primitivní funkce „neelementárních“ integrálů, limity.

## Mini příklad

**Rozvoj substitucí a násobením:**
$$x\sin x=x^2-\frac{x^4}{3!}+\frac{x^6}{5!}-\dots=\sum_{n=0}^\infty\frac{(-1)^nx^{2n+2}}{(2n+1)!},\qquad e^{-x^2}=\sum_{n=0}^\infty\frac{(-1)^nx^{2n}}{n!}=1-x^2+\frac{x^4}{2!}-\dots$$
(v $e^t$ je $t=-x^2$). Obě platí pro $x\in\mathbb R$.

**Limita:** $\dfrac{\sin x}{x}=1-\dfrac{x^2}{3!}+\dfrac{x^4}{5!}-\dots\to1$ pro $x\to0$.

**Primitivní funkce:** $\displaystyle\int e^{-x^2}dx=\sum_{n=0}^\infty\frac{(-1)^n}{n!(2n+1)}x^{2n+1}+C=x-\frac{x^3}{3}+\frac{x^5}{5\cdot2!}-\dots+C$ pro $x\in\mathbb R$ (integrace člen po členu, $R$ se nemění).

**Taylorova řada se středem $x_0\ne0$:** $f(x)=\frac1x$, $x_0=2$. Je $f^{(n)}(x)=(-1)^nn!\,x^{-(n+1)}$, tedy $a_n=\frac{(-1)^n}{2^{n+1}}$ a
$$\frac1x=\sum_{n=0}^\infty\frac{(-1)^n}{2^{n+1}}(x-2)^n\quad\text{pro }|x-2|<2,\ \text{tj. }x\in(0,4)$$
(geometrická řada s $a=\frac12$, $q=-\frac{x-2}{2}$, součet $\frac{1/2}{1+(x-2)/2}=\frac1x$).

## Pozor

> - Taylorova řada **nemusí konvergovat k $f$** (příklad $e^{-1/x^2}$). Na intervalu konvergence k $f$ konverguje u elementárních funkcí z přehledu; jinak se ověřuje $R_n\to0$.
> - Koeficient je $\frac{f^{(n)}(x_0)}{n!}$ – **nezapomenout dělit $n!$**. Rozvoj $\sin x$ a $\cos x$ má faktoriály jmenovatele $(2n+1)!$, resp. $(2n)!$, a střídavá znaménka.
> - U substituce se **mění obor**: $e^{-x^2}$ platí pro všechna $x$ (protože $e^t$ pro všechna $t$), ale $\frac1{1+x^2}$ jen pro $|x|<1$.
> - Při násobení $x\sin x$ se **posouvá exponent i index** v součtu ($x^{2n+1}\to x^{2n+2}$), jmenovatel zůstává $(2n+1)!$.
> - $\ln(1+x)$ má koeficient $\frac1n$ (ne $\frac1{n!}$): $f^{(n)}(0)=(-1)^{n-1}(n-1)!$, takže $\frac{(n-1)!}{n!}=\frac1n$.
> - Rozvoj $\frac{\sin x}{x}$ platí pro $x\neq0$ (po dodefinování hodnotou $1$ i v $0$).

## Praxe

Spočítej koeficienty, najdi rozvoje pomocí známých řad a použij je na přibližný výpočet.
