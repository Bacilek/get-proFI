## Intuice

Funkce někdy není zadaná vzorcem $y=f(x)$, ale rovnicí $F(x,y)=0$ (kružnice $x^2+y^2=25$). Derivaci $y'$ jde najít i bez vyjádření $y$: **zderivuješ celou rovnici podle $x$**, přičemž $y$ bereš jako funkci $x$.

## Vzorec

1. Zderivuj obě strany podle $x$. Každý výraz s $y$ derivuj jako složenou funkci: $(y^2)'=2yy'$, $(\cos y)'=-\sin y\cdot y'$, $(xy)'=y+xy'$.
2. Z rovnice vyjádři $y'$ (obsahuje $x$ i $y$).
3. Dosaď souřadnice bodu $[x_0,y_0]$.
4. Druhá derivace: derivuj rovnici s $y'$ znovu (součin $y^2y'$ vyžaduje pravidlo součinu) a dosaď za $y'$.

## Mini příklad

Kružnice $x^2+y^2=25$, bod $[-3,4]$: $2x+2yy'=0$, $y'=-\frac xy$, tedy $y'=\frac34$.

$4y=x^3+\cos y$: $4y'=3x^2-\sin y\cdot y'$, $y'=\dfrac{3x^2}{4+\sin y}$ (zde $y$ vyjádřit nelze).

Druhá derivace u $3x^4-4y^3=1$: $12x^3-12y^2y'=0\Rightarrow y'=\frac{x^3}{y^2}$; derivací $x^3-y^2y'=0$ dostaneme $3x^2-2y(y')^2-y^2y''=0$, tedy $y''=\dfrac{3x^2-2y(y')^2}{y^2}$.

## Pozor

> - $y$ **není konstanta**: $(y^2)'=2yy'$, ne $2y$.
> - Výsledek $y'$ obsahuje obecně $x$ **i** $y$; k číselné hodnotě potřebuješ oba souřadnice bodu (a bod musí ležet na křivce).
> - Při druhé derivaci nezapomeň na pravidlo součinu u $y^2y'$ i na člen $(y')^2$.
> - Tečna v bodě je pak $y-y_0=y'(x_0)(x-x_0)$; svislá tečna vychází tam, kde se $y'$ „zlomí“ (jmenovatel $0$).

## Praxe

Spočítej derivace implicitně zadaných funkcí.
