## Intuice

Periodickou funkci lze rozložit na součet „čistých kmitů“ $\sin nx$ a $\cos nx$. Funkce $1,\sin x,\cos x,\sin2x,\cos2x,\dots$ jsou na intervalu délky $2\pi$ navzájem **kolmé** (ortogonální) ve smyslu skalárního součinu $\langle f,g\rangle=\int fg$. Koeficienty se pak počítají jako „průměty“ funkce na tyto kolmé směry.

## Vzorec

Skalární součin $\langle f,g\rangle=\int_a^bfg\,dx$, norma $\|f\|=\sqrt{\int_a^bf^2}$ (pro $f\in L^2$, tj. s konečným $\int f^2$; to platí pro po částech spojité). $f\perp g\Leftrightarrow\langle f,g\rangle=0$.

**Trigonometrický systém** $\{1,\sin x,\cos x,\sin2x,\cos2x,\dots\}$ je ortogonální na každém intervalu délky $2\pi$, přitom $\|1\|=\sqrt{2\pi}$, $\|\sin nx\|=\|\cos nx\|=\sqrt\pi$.

**Fourierova řada** $g$ na $[-\pi,\pi]$:
$$F(x)=\frac{a_0}2+\sum_{n=1}^\infty\big(a_n\cos nx+b_n\sin nx\big),$$
$$a_0=\frac1\pi\int_{-\pi}^{\pi}g,\quad a_n=\frac1\pi\int_{-\pi}^{\pi}g(x)\cos nx\,dx,\quad b_n=\frac1\pi\int_{-\pi}^{\pi}g(x)\sin nx\,dx.$$
(Obecně $c_j=\frac{1}{\|f_j\|^2}\langle g,f_j\rangle$.)

**Obecný interval délky $2L$** ($L=\frac{b-a}2$, délka $b-a=2L$):
$$F(x)=\frac{a_0}2+\sum\Big(a_n\cos\frac{2n\pi x}{b-a}+b_n\sin\frac{2n\pi x}{b-a}\Big),\quad a_n=\frac2{b-a}\int_a^bg(x)\cos\frac{2n\pi x}{b-a}dx,\ \text{(analogicky }a_0,b_n).$$

**Symetrie:** **lichá** funkce ⇒ $a_n=0$ (sinový rozvoj); **sudá** funkce ⇒ $b_n=0$ (kosinový rozvoj). Pro sudou/lichou stačí integrovat přes $[0,\pi]$ a zdvojnásobit.

**Věta o konvergenci (Věta 90).** Je-li $g$ po částech spojitá s po částech spojitou derivací na $[-\pi,\pi]$, pak $F$ konverguje a:
- $F(x_0)=g(x_0)$ v bodech spojitosti $x_0\in(-\pi,\pi)$;
- v bodě nespojitosti uvnitř: $F(x_0)=\frac12\big(g(x_0^+)+g(x_0^-)\big)$ (průměr jednostranných limit);
- v krajních bodech: $F(\pm\pi)=\frac12\big(g(-\pi^+)+g(\pi^-)\big)$.
Součet řady na $\mathbb R$ je **$2\pi$-periodické rozšíření**. Je-li $g$ navíc spojitá, periodická a má po částech spojitou derivaci, konverguje řada **stejnoměrně**.

## Mini příklad

**$g(x)=x$ na $(-\pi,\pi)$** (lichá ⇒ $a_n=0$): per partes
$$b_n=\frac1\pi\int_{-\pi}^\pi x\sin nx\,dx=\frac{2(-1)^{n+1}}n,\qquad F(x)=2\Big(\sin x-\frac{\sin2x}2+\frac{\sin3x}3-\dots\Big).$$
$F(x)=x$ pro $x\in(-\pi,\pi)$, $F(\pm\pi)=\frac12(\pi+(-\pi))=0$, na $\mathbb R$ periodicky ("pilovitá" funkce).

**$g(x)=\operatorname{sgn}x$ na $(-1,1)$** (interval délky $2$, lichá): $b_n=2\int_0^1\sin n\pi x\,dx=\frac{2(1-(-1)^n)}{n\pi}$,
$$F(x)=\frac4\pi\Big(\sin\pi x+\frac{\sin3\pi x}3+\frac{\sin5\pi x}5+\dots\Big),$$
$F(0)=F(\pm1)=0$ (průměr skoku $-1\to1$). Dosazením $x=\frac12$ vyjde $\frac\pi4=1-\frac13+\frac15-\dots$.

## Pozor

> - V rozvoji je **$\frac{a_0}2$**, ale $a_0=\frac1\pi\int g$ (bez $\frac12$ v koeficientu); tj. $\frac{a_0}{2}$ je **průměrná hodnota** $g$.
> - Pro interval délky $b-a$ se místo $nx$ používá $\frac{2n\pi x}{b-a}$ a místo $\frac1\pi$ faktor $\frac2{b-a}$.
> - V bodě nespojitosti řada **nekonverguje k $g(x_0)$**, ale k průměru jednostranných limit. Součet na $\mathbb R$ je periodické rozšíření, ne původní funkce mimo interval.
> - Využij symetrii: u liché funkce nepočítej $a_n$ (jsou nulové), u sudé nepočítej $b_n$.
> - Per partes u $\int x\sin nx$: pozor na znaménko a hodnoty $\cos n\pi=(-1)^n$, $\sin n\pi=0$.

## Praxe

Najdi Fourierovy koeficienty (využij symetrii), napiš řadu a urči její součet v bodech nespojitosti a v krajních bodech.
