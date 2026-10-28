## Intuice

Funkce je spojitá v $x_0$, když se dá „nakreslit bez zvednutí tužky“: limita v bodě existuje, funkce tam má hodnotu a obojí se rovná. Spojité funkce mají silné vlastnosti na uzavřeném intervalu (největší/nejmenší hodnota, nulové body) a spojitost umožňuje počítat limity **dosazením**.

## Vzorec

**Spojitost v $x_0$:** $\displaystyle\lim_{x\to x_0}f(x)=f(x_0)$ (limita existuje, $f(x_0)$ existuje, rovnají se). Zprava/zleva: totéž s $x\to x_0^\pm$.

**Spojitost na intervalu** $I$: spojitá v každém vnitřním bodě, v krajním bodě patřícím do $I$ jednostranně. Píšeme $f\in C(I)$.

**Co je spojité:** konstanty, polynomy, racionální lomené funkce na $D(R)$, goniometrické, exponenciální a logaritmické funkce, cyklometrické funkce (vždy tam, kde jsou definované), a součty, součiny, podíly ($g(x_0)\ne0$) a **složení** spojitých funkcí. Spojitá monotónní funkce má spojitou inverzi.

**Věta o záměně limity a funkce:** je-li $\lim g=M$ a $f$ spojitá v $M$, pak $\lim f(g(x))=f(M)$.

**Na uzavřeném omezeném intervalu $[a,b]$, $f\in C[a,b]$:**
- **Weierstrass:** $f$ je omezená a nabývá minima i maxima.
- **Bolzano:** $f$ nabývá všech hodnot mezi minimem a maximem. Speciálně: $f(a)\cdot f(b)<0\Rightarrow$ existuje $c\in(a,b)$ s $f(c)=0$.

**Body nespojitosti $x_0$:**
1. **Odstranitelná** – vlastní $\lim f$ existuje, ale $\ne f(x_0)$ nebo $f(x_0)$ není definováno.
2. **Skok** (1. druhu) – obě jednostranné limity vlastní, ale různé.
3. **2. druhu** – aspoň jedna jednostranná limita je nevlastní nebo neexistuje.

## Mini příklad

$f(x)=\dfrac{x^2-4}{x-2}$ má v $x_0=2$ **odstranitelnou** nespojitost ($f(x)=x+2$ pro $x\ne2$); dodefinováním $f(2)=4$ je spojitá.
$\operatorname{sgn}x$ má v $0$ **skok** ($\pm1$). $\frac1{x^2}$ a $\sin\frac1x$ mají v $0$ nespojitost **2. druhu**.

**Nulový bod (Bolzano):** $f(x)=x^3+x-1$ je spojitá, $f(0)=-1<0$, $f(1)=1>0$, tedy rovnice $f(x)=0$ má řešení v $(0,1)$.

**Parametr:** $f(x)=\begin{cases}x+1,&x<1\\ ax^2,&x\ge1\end{cases}$ je spojitá v $1$, když $\lim_{x\to1^-}=2$ a $f(1)=a$ se rovnají: $a=2$.

## Pozor

> - Spojitost na dvou intervalech **neznamená** spojitost na jejich sjednocení: $f=0$ pro $x<0$, $f=1$ pro $x\ge0$ je spojitá na $(-\infty,0)$ i $[0,\infty)$, ale ne na $\mathbb R$.
> - $\frac1x$ je spojitá na $(-\infty,0)$ i $(0,\infty)$, ale **ne na $\mathbb R$** (v $0$ není definovaná).
> - Weierstrass potřebuje **uzavřený a omezený** interval: $\frac1x$ na $(0,1]$ je neomezená, $x$ na $(0,1)$ nemá minimum ani maximum.
> - Bolzano říká, že řešení **existuje**, ne kolik jich je ani kde přesně.
> - U parametru v definici po částech porovnávej **obě jednostranné limity i hodnotu** $f(x_0)$.
> - Složení: i když $\lim g$ neexistuje, může existovat $\lim f(g(x))$ (např. $(\operatorname{sgn}x)^2\to1$).

## Praxe

Urči typ nespojitosti, dopočítej parametr a použij Bolzanovu větu.
