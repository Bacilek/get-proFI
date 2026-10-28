## Intuice

Tečna aproximuje funkci lineárně ($T_1$); Taylorův polynom přidá členy vyšších řádů a tím aproximaci zpřesní. Aproximace je dobrá poblíž středu $x_0$ a **chybu umíme odhadnout** pomocí zbytku.

## Vzorec

**Taylorův polynom** stupně $n$ se středem $x_0$ (existují $f',\dots,f^{(n)}(x_0)$):
$$T_n(x)=\sum_{k=0}^n\frac{f^{(k)}(x_0)}{k!}(x-x_0)^k=f(x_0)+f'(x_0)(x-x_0)+\frac{f''(x_0)}{2!}(x-x_0)^2+\dots$$
$T_0=f(x_0)$ (konstanta), $T_1$ = tečna.

**Zbytek (Lagrangeův tvar).** $f(x)=T_n(x)+R_n(x)$,
$$R_n(x)=\frac{f^{(n+1)}(c)}{(n+1)!}(x-x_0)^{n+1},\quad c\text{ leží mezi }x_0\text{ a }x.$$
Chybu odhadneš tak, že $|f^{(n+1)}(c)|$ shora ohraničíš na intervalu mezi $x_0$ a $x$.

**Maclaurinovy polynomy** ($x_0=0$):
- $e^x$: $1+x+\frac{x^2}{2}+\frac{x^3}{6}+\frac{x^4}{24}+\dots$
- $\sin x$: $x-\frac{x^3}{6}+\frac{x^5}{120}-\dots$ (jen liché mocniny)
- $\cos x$: $1-\frac{x^2}{2}+\frac{x^4}{24}-\frac{x^6}{720}+\dots$ (jen sudé mocniny)
- $\ln(1+x)$: $x-\frac{x^2}{2}+\frac{x^3}{3}-\frac{x^4}{4}+\dots$

## Mini příklad

$\sqrt x$ se středem $4$: $f(4)=2$, $f'(4)=\frac14$, $f''(4)=-\frac1{4x^{3/2}}\big|_{4}=-\frac1{32}$, tedy $T_2(x)=2+\frac14(x-4)-\frac1{64}(x-4)^2$.

Chyba $\cos$ v bodě $\frac\pi4$ pro $T_6$: $R_6=\frac{\sin c}{7!}x^7$, $|\sin c|\le1$, tedy $|R_6(\frac\pi4)|\le\frac1{7!}\left(\frac\pi4\right)^7\approx3{,}7\cdot10^{-5}$.

Pro $e^x$ a $x>0$ je $R_n(x)\le\dfrac{e^x}{(n+1)!}x^{n+1}$ (protože $e^c<e^x$); $R_n\to0$, protože $\frac{x^{n+1}}{(n+1)!}\to0$.

## Pozor

> - Koeficient je $\dfrac{f^{(k)}(x_0)}{k!}$ – nezapomeň na **faktoriál** (a $0!=1$).
> - Střed $x_0\neq0$: mocniny jsou $(x-x_0)^k$, ne $x^k$.
> - Zbytek obsahuje derivaci řádu $n+1$ (o jedna víc než polynom) a $(n+1)!$ ve jmenovateli.
> - Hodnota $c$ je neznámá – proto se odhaduje, ne dosazuje. Odhad musí platit pro všechna $c$ mezi $x_0$ a $x$.
> - $T_n$ aproximuje dobře jen blízko $x_0$; vzdálenější $x$ vyžaduje vyšší $n$.

## Praxe

Sestav Taylorovy polynomy, aproximuj hodnoty a odhadni chybu.
