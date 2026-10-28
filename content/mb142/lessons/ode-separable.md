## Intuice

Diferenciální rovnice (DR) obsahuje neznámou **funkci** a její derivace; řešením je funkce, ne číslo. Řešení se hledá integrováním, proto v něm zbývají integrační konstanty. Nejjednodušší typ je rovnice, kde jde **oddělit proměnné** $x$ a $y$ na různé strany.

## Vzorec

- **Řád** DR = nejvyšší derivace v rovnici. $y'=F(x,y)$ je rovnice 1. řádu.
- **Obecné řešení** = všechna řešení (počet konstant = počet integrací). **Partikulární řešení** = řešení splňující počáteční podmínku $y(x_0)=y_0$ (konstanta se dopočte).
- Příklad $y'=f(x)$ (obyčejné integrování): $y=\int f\,dx+C$.

**Separované proměnné:** $y'=f(x)\,g(y)$.
$$\frac{dy}{dx}=f(x)g(y)\ \Rightarrow\ \int\frac{1}{g(y)}\,dy=\int f(x)\,dx+C$$
(konstanta jen jedna, např. na pravé straně). Je-li $f,g$ spojité a $g\ne0$, má počáteční úloha právě jedno řešení, dané implicitně tímto vztahem. **Nulové body $g(y_0)=0$ dávají konstantní řešení $y\equiv y_0$**, která se při dělení $g(y)$ ztratí.

**Substituce $u=\frac yx$:** rovnice tvaru $y'=f\!\left(\frac yx\right)$. Pak $y=ux\Rightarrow y'=u'x+u$, tedy
$$u'x+u=f(u)\ \Rightarrow\ \int\frac{du}{f(u)-u}=\int\frac{dx}{x}.$$
Po vyřešení se vrátíme k $y=ux$.

**Existence a jednoznačnost:** pro obecnou $y'=F(x,y)$ (spojité a lipschitzovské v $y$) existuje právě jedno řešení počáteční úlohy, ale jen v malém okolí $x_0$. Bez lipschitzovosti může být řešení více: $y'=3\sqrt[3]{y^2},\ y(0)=0$ má $y=0$ i $y=x^3$.

## Mini příklad

**Separace:** $y'=\dfrac{x^2}{y(1+x^3)}$, $y(0)=2$.
$$y\,dy=\frac{x^2}{1+x^3}\,dx\ \Rightarrow\ \frac{y^2}{2}=\frac13\ln|1+x^3|+C\ \Rightarrow\ y^2=\frac23\ln|1+x^3|+C.$$
Z $y(0)=2$: $4=C$. Řešení $y=\sqrt{\frac23\ln|1+x^3|+4}$ (kladná odmocnina, protože $y(0)>0$).

**Substituce:** $y'=1+\dfrac yx$. Pro $u=\frac yx$ je $u'x+u=1+u\Rightarrow u'x=1\Rightarrow u=\ln|x|+C$, tedy
$$y=x\ln|x|+Cx,\quad C\in\mathbb R.$$

**Bez separace:** $y'=y^2$ má $y=\frac{1}{C-x}$ (na $(-\infty,C)$ a $(C,\infty)$) a navíc $y\equiv0$.

## Pozor

> - Rovnice $y'=x+y$ **není** se separovanými proměnnými (součet, ne součin) – ta je lineární (další lekce).
> - Při dělení $g(y)$ **nezapomenout konstantní řešení** $g(y)=0$ (např. $y\equiv0$ u $y'=y^2$).
> - Konstantu $C$ psát **jen jednou** (po integraci obou stran stačí na jedné). Při úpravách ($e^C\to C$, $\pm e^C\to C$) pozor na to, které hodnoty $C$ jsou dovolené.
> - Substituce $u=\frac yx$: $u=u(x)$ je **funkce**, derivuje se jako součin $y=ux$. Na konci vrať $y=ux$, ne jen $u$.
> - Řešení DR **ověřuj derivováním** – je to jediná jistota.

## Praxe

Rozhodni, zda jde o separovanou rovnici, vyřeš ji (obecně i s počáteční podmínkou) a zvládni substituci $u=\frac yx$.
