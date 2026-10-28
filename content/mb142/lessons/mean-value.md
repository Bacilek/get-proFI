## Intuice

Když se dostaneš z bodu $A$ do bodu $B$ po hladké dráze, někde musíš jet přesně průměrnou rychlostí; a pokud se vrátíš do výchozí výšky, někde musí být tečna vodorovná. To jsou věty o střední hodnotě – z nich plynou skoro všechna tvrzení o monotonii, extrémech i Taylorův zbytek.

## Vzorec

**Rolleova věta.** $f$ spojitá na $[a,b]$, diferencovatelná na $(a,b)$, $f(a)=f(b)$. Pak existuje $c\in(a,b)$ s $f'(c)=0$.

**Lagrangeova věta.** $f$ spojitá na $[a,b]$, diferencovatelná na $(a,b)$. Pak existuje $c\in(a,b)$ s
$$f'(c)=\frac{f(b)-f(a)}{b-a}$$
(tečna v $c$ je rovnoběžná se sečnou přes krajní body).

**Důsledky** (na intervalu $(a,b)$):
- $f'=0\;\Rightarrow\; f$ je konstantní.
- $f'=g'\;\Rightarrow\; f=g+c$ (liší se o konstantu) – základ pro neurčitý integrál.
- $f'>0\Rightarrow f$ roste, $f'<0\Rightarrow f$ klesá (viz lekce o monotonii).

## Mini příklad

$f(x)=x^2$ na $[1,3]$: sklon sečny je $\frac{9-1}{3-1}=4$, $f'(c)=2c=4$, tedy $c=2$.

Odhad: $|\sin a-\sin b|=|\cos c|\,|a-b|\le|a-b|$ pro libovolná $a,b$.

## Pozor

> - Věty jsou **existenční** – říkají, že $c$ existuje, ne jak ho najít (a může jich být víc).
> - Rolle potřebuje **všechny tři** předpoklady: spojitost na uzavřeném, derivaci na otevřeném intervalu a $f(a)=f(b)$. Např. $|x|$ na $[-1,1]$ má $f(-1)=f(1)$, ale v $0$ nemá derivaci a nikde není $f'=0$.
> - Důsledky platí na **intervalu**. Funkce $f(x)=\operatorname{arctg}x+\operatorname{arctg}\frac1x$ má $f'=0$ na celém $D(f)=\mathbb R\setminus\{0\}$, ale je rovna $\frac\pi2$ pro $x>0$ a $-\frac\pi2$ pro $x<0$ – definiční obor není interval, konstanta se nemusí zachovat.
> - Lagrange nedává $f'(c)=0$; to je speciální případ (Rolle).

## Praxe

Najdi body $c$ z vět o střední hodnotě a rozhodni, kdy věty platí.
