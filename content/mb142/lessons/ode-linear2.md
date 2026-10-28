## Intuice

Lineární DR 2. řádu obsahuje $y''$. Obecné řešení má **dvě konstanty** (dvě integrace), a proto se k jednoznačnosti zadávají dvě počáteční podmínky: hodnota $y(x_0)$ a sklon $y'(x_0)$. Ve slidech se ukazuje řešení **mocninnou řadou** – využívá se tím látka z kap. 3.

## Vzorec

$$a(x)y''+b(x)y'+c(x)y=f(x)$$
S počátečními podmínkami $y(x_0)=y_0$, $y'(x_0)=y_1$ existuje právě jedno řešení na celém intervalu spojitosti koeficientů. Nejčastěji se studují rovnice s **konstantními koeficienty** $ay''+by'+cy=f(x)$ (kmitání).

**Řešení mocninnou řadou** (střed $0$): dosadíme $y=\sum a_nx^n$, $y'=\sum (n+1)a_{n+1}x^n$, $y''=\sum (n+2)(n+1)a_{n+2}x^n$. Všechny koeficienty výsledné řady musí být nulové ⇒ **rekurentní vztah** pro $a_n$. Koeficienty $a_0=y(0)$ a $a_1=y'(0)$ zůstávají volné.

**Doplněk (není ve slidech, standardní metoda):** pro homogenní $ay''+by'+cy=0$ s konstantními koeficienty řešíme **charakteristickou rovnici** $a\lambda^2+b\lambda+c=0$:
- dva reálné různé kořeny $\lambda_1,\lambda_2$: $y=C_1e^{\lambda_1x}+C_2e^{\lambda_2x}$,
- dvojný kořen $\lambda$: $y=(C_1+C_2x)e^{\lambda x}$,
- komplexní kořeny $\alpha\pm i\beta$: $y=e^{\alpha x}(C_1\cos\beta x+C_2\sin\beta x)$.

## Mini příklad

**$y''+y=0$ řadou.** Z $a_{n+2}(n+2)(n+1)+a_n=0$ je $a_{n+2}=-\dfrac{a_n}{(n+2)(n+1)}$, tedy
$$a_{2k}=\frac{(-1)^ka_0}{(2k)!},\qquad a_{2k+1}=\frac{(-1)^ka_1}{(2k+1)!}.$$
Součty jsou řady $\cos x$ a $\sin x$ ($R=\infty$): obecné řešení
$$y=C\cos x+D\sin x,\quad C,D\in\mathbb R,\ C=y(0),\ D=y'(0).$$

**Charakteristická rovnice:** $y''-3y'+2y=0$: $\lambda^2-3\lambda+2=0\Rightarrow\lambda=1,2$, $y=C_1e^{x}+C_2e^{2x}$. Pro $y''+y=0$: $\lambda=\pm i$ ($\alpha=0,\beta=1$) ⇒ opět $C\cos x+D\sin x$.

## Pozor

> - Dvě konstanty ⇒ **dvě podmínky** ($y$ a $y'$ ve stejném bodě), ne dvě hodnoty $y$ v různých bodech (to by byla okrajová úloha).
> - Při posunu indexů v řadě $y''$ se **mění začátek sumace** ($n=2\to n=0$) a mocnina ($x^{n-2}\to x^n$); chybné posunutí je nejčastější chyba.
> - Souhlasí-li rekurence jen pro sudé/liché indexy, **řešení se rozpadá na dvě nezávislé řady** (sudá spojená s $a_0$, lichá s $a_1$).
> - Charakteristická metoda je jen pro **konstantní koeficienty**; pro proměnné se používá řada nebo jiné metody.

## Praxe

Najdi rekurentní vztah, první členy řešení řadou a (z doplňku) obecné řešení homogenní rovnice s konstantními koeficienty.
