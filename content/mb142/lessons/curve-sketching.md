## Intuice

Průběh funkce je sestavení všeho předchozího: definiční obor, limity, monotonie, extrémy, konvexnost, inflexe, asymptoty – a z toho nakreslíš graf. Postup je mechanický, jde jen o pořádek.

## Vzorec

**Checklist (v tomto pořadí):**
1. $D(f)$, spojitost, případně sudost/lichost/periodicita, průsečíky s osami.
2. Limity v krajích $D(f)$ (a v bodech nespojitosti).
3. $f'$: stacionární body, body bez $f'$, **znaménko $f'$** ⇒ intervaly monotonie a lokální extrémy.
4. $f''$: nuly, **znaménko $f''$** ⇒ konvexnost/konkávnost, inflexe.
5. Asymptoty (svislé, se směrnicí v $\pm\infty$).
6. Tabulka hodnot $f$ (a $f'$ pro sklon tečny) v významných bodech – extrémy, inflexe, krajní body.
7. Graf.

## Mini příklad

$f(x)=\dfrac{x}{1+x^2}$: $D=\mathbb R$, lichá, $f(0)=0$.
- $f'=\dfrac{1-x^2}{(1+x^2)^2}$: stacionární body $\pm1$; roste na $[-1,1]$, klesá na $(-\infty,-1]$ a $[1,\infty)$; min $f(-1)=-\frac12$, max $f(1)=\frac12$.
- $f''=\dfrac{2x(x^2-3)}{(1+x^2)^3}$: nuly $0,\pm\sqrt3$, $f''$ mění znaménko ⇒ 3 inflexe.
- $\lim_{x\to\pm\infty}f=0$ ⇒ asymptota $y=0$.

Slidový příklad $f(x)=\frac1x+\ln x$ na $(0,\infty)$: $f'=\frac{x-1}{x^2}$ ⇒ minimum $f(1)=1$; $f''=\frac{2-x}{x^3}$ ⇒ inflexe v $x=2$ (konvexní na $(0,2]$, konkávní na $[2,\infty)$); svislá asymptota $x=0$ ($\lim_{x\to0^+}f=+\infty$, protože $x\ln x\to0$); v $\infty$ je $a=0$, ale $b=\infty$ ⇒ žádná asymptota.

## Pozor

> - Znaménko $f'$ a $f''$ určuj **po intervalech** (dosazením zkušebního bodu), ne jen z nul.
> - Kandidáti na extrémy a inflexe zahrnují i body, kde derivace **neexistuje**, a krajní body $D(f)$.
> - Chyby ve výpočtu derivace se projeví nesmyslným grafem – zkontroluj trendy (limity, hodnoty $f$ v extrémech).
> - Pokud je funkce sudá/lichá, stačí vyšetřit $x\ge0$.
> - Zkoumej oba směry $\pm\infty$ u asymptot.

## Praxe

Projdi checklist pro zadané funkce.
