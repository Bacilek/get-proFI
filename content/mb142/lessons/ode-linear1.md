## Intuice

Lineární DR 1. řádu je lineární v $y$ a $y'$. Řeší se univerzální metodou: vynásobíme **integračním faktorem**, aby se levá strana stala derivací součinu, a pak integrujeme. Tato metoda funguje vždy a je to hlavní nástroj kapitoly.

## Vzorec

Tvar: $y'=a(x)\,y+b(x)$, kde $a,b$ jsou spojité na intervalu.

**Homogenní** ($b\equiv0$): $y'=a(x)y$ je separovaná, řešení
$$y=C\,e^{\int a(x)\,dx},\quad C\in\mathbb R.$$

**Nehomogenní:** integrační faktor $\mu(x)=e^{-\int a(x)dx}$. Z $\big(y\,\mu\big)'=b\,\mu$ plyne
$$y=e^{\int a\,dx}\left(\int b(x)\,e^{-\int a\,dx}\,dx+C\right).$$
Postup v praxi: převeď na $y'+p(x)y=b(x)$, $\mu=e^{\int p\,dx}$, pak $(y\mu)'=b\mu$, $y\mu=\int b\mu\,dx+C$. Počáteční úloha má **právě jedno řešení na celém intervalu** spojitosti $a,b$.

**Trik – převod na lineární:**
- **Bernoulli** $y'=a(x)y+b(x)y^r$ ($r\ne0,1$): substituce $u=y^{1-r}$ dá lineární rovnici pro $u$. Pro $r>0$ je navíc řešení $y\equiv0$.
- **Záměna proměnných:** pokud $y'=\frac{dy}{dx}$ nejde, zkusit $x'=\frac{dx}{dy}=\frac1{y'}$ a hledat $x=x(y)$ (výsledek pak vyjde implicitně / inverzní funkcí).

## Mini příklad

**Integrační faktor:** $y'=-3y+x$, tj. $y'+3y=x$, $\mu=e^{3x}$:
$$(y\,e^{3x})'=x\,e^{3x}\Rightarrow y\,e^{3x}=\tfrac13xe^{3x}-\tfrac19e^{3x}+C\Rightarrow y=\tfrac13x-\tfrac19+Ce^{-3x}.$$
(Integrál $\int xe^{3x}dx$ per partes.)

**Bernoulli:** $y'=3y-xy^2$ ($r=2$). Substituce $u=y^{-1}$, $u'=-y'/y^2$:
$$u'=-\frac{y'}{y^2}=-\frac3y+x=-3u+x\ \Rightarrow\ u=\tfrac13x-\tfrac19+Ce^{-3x},\qquad y=\frac1u.$$
Navíc $y\equiv0$.

**Záměna:** $y'=\frac1{y^2-2x}$ není lineární v $y$, ale $\frac{dx}{dy}=y^2-2x$, tj. $x'+2x=y^2$ je lineární v $x(y)$ s $\mu=e^{2y}$; řešení $x=\frac12y^2-\frac12y+\frac14+Ce^{-2y}$.

## Pozor

> - Před použitím vzorce převeď rovnici na tvar **$y'+p(x)y=b(x)$** a hlídej **znaménko**: $y'=-3y+x$ má $p=+3$, $\mu=e^{+3x}$.
> - **Konstantu $C$ zachovej u celého výrazu** (u $y\mu=\int b\mu+C$ musí $C$ vydělit $\mu$, tedy $Ce^{-3x}$, ne $C$).
> - Bernoulli: $u=y^{1-r}$, **nezapomeň na řešení $y\equiv0$** a vrať se k $y=u^{1/(1-r)}$.
> - Integrační faktor stačí **jakýkoli** (bez konstanty); konstanta se zanese do $C$ až při integraci pravé strany.
> - Řešení vždy ověř zpětným dosazením do rovnice.

## Praxe

Vyřeš lineární rovnice integračním faktorem (i s počáteční podmínkou), rozpoznej Bernoulliho rovnici a rovnici vhodnou k záměně proměnných.
