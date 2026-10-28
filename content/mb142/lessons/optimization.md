## Intuice

Slovní úlohy „co nejvíc / co nejméně“ se převedou na hledání globálního extrému funkce jedné proměnné: veličinu, kterou optimalizuješ, vyjádříš jako funkci jedné neznámé a najdeš její extrém.

## Vzorec

1. Zvol neznámou, vyjádři optimalizovanou veličinu $F$ a podmínku (vazbu) mezi proměnnými.
2. Z vazby vyjádři jednu proměnnou ⇒ $F=F(x)$; urči **definiční obor** $x$ (co dává smysl fyzikálně/geometricky).
3. Najdi globální extrém:
   - **uzavřený interval** $[a,b]$ a $F$ spojitá: Weierstrass zaručuje extrém ⇒ porovnej hodnoty ve stacionárních bodech a v krajních bodech;
   - **otevřený/neomezený interval:** extrém nemusí existovat; stacionární bod ověř znaménkem $F'$ nebo konvexností/konkávností ($F''>0$ všude ⇒ stacionární bod je globální minimum).
4. Odpověz slovně na to, co se ptali (rozměry, maximum...).

## Mini příklad

**Krabice z čtverce** o straně $54$ cm: vyřízneme v rozích čtverce o straně $x$; $V(x)=(54-2x)^2x$ na $[0,27]$. $V'=12(27-x)(9-x)$ ⇒ stacionární body $9,27$. $V(0)=V(27)=0$, $V(9)=36^2\cdot9=11\,664$ cm³ ⇒ maximum při $x=9$ (krabice $36\times36\times9$).

**Plechovka 1 l** s minimální spotřebou materiálu: $V=\pi r^2h=1000$, $S=2\pi r^2+2\pi rh=2\pi r^2+\frac{2000}r$ na $(0,\infty)$. $S'=4\pi r-\frac{2000}{r^2}=0\Rightarrow r^3=\frac{500}\pi$, $r\approx5{,}42$ cm. $S''=4\pi+\frac{4000}{r^3}>0$ ⇒ $S$ konvexní ⇒ globální minimum. Pak $h=2r$ (výška = průměr).

**Nejbližší bod paraboly $y=x^2$ k $A=[1,2]$:** minimalizujeme čtverec vzdálenosti $g(x)=(x-1)^2+(x^2-2)^2$; $g'=4x^3-6x-2=2(x+1)(2x^2-2x-1)$, kořeny $-1,\frac{1\pm\sqrt3}2$; z geometrie je hledané $x_A=\frac{1+\sqrt3}2\approx1{,}366$.

## Pozor

> - Minimalizuj **čtverec vzdálenosti** místo vzdálenosti – odmocnina zbytečně komplikuje derivaci a extrém je ve stejném bodě.
> - Nezapomeň na **definiční obor**: krajní body ($x=0$, $x=27$) mohou dát extrém, ne vždy stacionární bod.
> - Na otevřeném intervalu nelze použít Weierstrass; ověř, že stacionární bod je opravdu minimum/maximum (znaménko $F'$, $F''$).
> - Jednotky a převody (litr $=1000$ cm³).
> - Odpověz tím, co se ptali: velikost veličiny i rozměry, kterými se dosáhne.

## Praxe

Vyřeš extremální úlohy.
