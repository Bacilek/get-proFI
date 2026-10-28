## Intuice

Když kromě hodnot předepíšeme i **derivace**, dostaneme Hermitovu interpolaci (graf navazuje hladce). Když derivace nemáme, spojíme body **po částech kubickými polynomy** tak, aby na sebe navazovaly hodnoty, první i druhé derivace – to je **kubický splajn**, standard v praxi (méně osciluje než jeden polynom vysokého stupně).

## Vzorec

**Hermitova interpolace.** Pro různé $x_0,\dots,x_m$ předepíšeme $y_i$ i $y_i'$. To je $2m+2$ podmínek, hledáme polynom stupně $n=2m+1$ (soustava má nenulový determinant, řešení je jediné). Tvar $f(x)=\sum a_kx^k$, podmínky $f(x_i)=y_i$ a $f'(x_i)=y_i'$.

- Jeden bod ($m=0$, stupeň $1$): $f(x)=f(x_0)+f'(x_0)(x-x_0)$ – tečna.
- Dva body $x_0=0$, $x_1=1$ (stupeň $3$):
$$f(x)=(2y_0-2y_1+y_0'+y_1')x^3+(-3y_0+3y_1-2y_0'-y_1')x^2+y_0'x+y_0.$$

**Kubický interpolační splajn.** Body $x_0<\dots<x_n$, hodnoty $y_i$. $S$ je na každém $[x_{i-1},x_i]$ kubický polynom $S_i$ a platí
$$S_i(x_{i-1})=y_{i-1},\ S_i(x_i)=y_i,\quad S_i'(x_i)=S_{i+1}'(x_i),\quad S_i''(x_i)=S_{i+1}''(x_i)\ \ (i=1,\dots,n-1).$$
Neznámých je $4n$, podmínek $4n-2$ ⇒ zbývají **dva volné parametry**: dodají se okrajové podmínky, nejčastěji **přirozený splajn** $S''(x_0)=S''(x_n)=0$ (nebo hodnoty $S'$ v krajích – úplný splajn). Matice soustavy je trojdiagonální, počítá se v čase úměrném $n$.

## Mini příklad

**Hermite:** $P(1)=0,\ P'(1)=1,\ P(2)=3,\ P'(2)=3$, stupeň $3$. Ze soustavy
$$a_3+a_2+a_1+a_0=0,\ \ 8a_3+4a_2+2a_1+a_0=3,\ \ 3a_3+2a_2+a_1=1,\ \ 12a_3+4a_2+a_1=3$$
vyjde $P(x)=-2x^3+10x^2-13x+5$.

**Tečna:** $P(1)=2$, $P'(1)=3$: $P(x)=2+3(x-1)=3x-1$.

**„Smoothstep“:** $y_0=0,y_1=1,y_0'=y_1'=0$ ⇒ $f(x)=-2x^3+3x^2$.

## Pozor

> - Hermite: pro $m+1$ uzlů s hodnotou **i** derivací je stupeň $2m+1$ (ne $m$).
> - Splajn **není** jeden polynom: každý úsek má vlastní koeficienty (celkem $4n$) a v uzlech navazují $S$, $S'$ i $S''$.
> - Počet podmínek: $2n$ (hodnoty na krajích úseků) $+\,2(n-1)$ (spojitost $S'$, $S''$) $=4n-2$; proto dvě okrajové podmínky.
> - Přirozený splajn má nulovou **druhou** derivaci na krajích (ne první).
> - Hermitův polynom má v uzlech předepsanou **derivaci**, splajn jen spojitou (neznámou).

## Praxe

Sestav soustavu pro Hermitův polynom, použij vzorec na $[0,1]$ a spočítej počet podmínek a volných parametrů splajnu.
