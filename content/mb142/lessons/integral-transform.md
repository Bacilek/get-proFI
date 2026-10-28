## Intuice

Substituce v jedné proměnné $x=\varphi(t)$ přidá faktor $\varphi'(t)$. Ve více proměnných ho nahrazuje **Jacobián** (determinant matice parciálních derivací), který říká, jak transformace lokálně mění plochu/objem. Souřadnice volíme podle **tvaru množiny** (kruh → polární, koule → sférické, válec → cylindrické).

## Vzorec

**Věta o transformaci.** Je-li $g:(u,v)\mapsto(x(u,v),y(u,v))$ prosté s spojitými parciálními derivacemi, $J\ne0$ a omezený,
$$\iint_{g(M)}f(x,y)\,dx\,dy=\iint_Mf\big(x(u,v),y(u,v)\big)\,|J(u,v)|\,du\,dv,\qquad J=\begin{vmatrix}x_u&x_v\\y_u&y_v\end{vmatrix}.$$
(**Absolutní hodnota** Jacobiánu.) Analogicky v $\mathbb R^3$ s determinantem $3\times3$.

**Polární souřadnice** ($\mathbb R^2$): $x=\rho\cos\varphi,\ y=\rho\sin\varphi$, $\rho\ge0$, $\varphi\in[0,2\pi]$, $J=\rho$.

**Válcové (cylindrické):** $x=\rho\cos\varphi,\ y=\rho\sin\varphi,\ z=z$, $J=\rho$.

**Sférické (kulové):** $x=\rho\cos\varphi\sin\vartheta,\ y=\rho\sin\varphi\sin\vartheta,\ z=\rho\cos\vartheta$, $\rho\ge0$, $\varphi\in[0,2\pi]$, $\vartheta\in[0,\pi]$ (úhel od osy $z$), $|J|=\rho^2\sin\vartheta$.

**Hypersférické** v $\mathbb R^n$: $|J|=\rho^{n-1}\cdot(\text{součin mocnin sinů úhlů})$, $\sum x_i^2=\rho^2$.

**Obsah v polárních souřadnicích:** $P=\dfrac12\displaystyle\int_{\varphi_1}^{\varphi_2}\rho^2(\varphi)\,d\varphi$ (z dvojného integrálu $\iint\rho\,d\rho\,d\varphi$).

**Kružnice posunutá do $(a,0)$:** $(x-a)^2+y^2\le a^2\Leftrightarrow x^2+y^2\le2ax\Leftrightarrow\rho\le2a\cos\varphi$, $\varphi\in[-\frac\pi2,\frac\pi2]$.

## Mini příklad

**Obsah** $M:\ x^2+y^2\le2x,\ y\ge0$ (půlkruh o poloměru $1$ se středem $(1,0)$):
$$m(M)=\int_0^{\pi/2}\!\!\int_0^{2\cos\varphi}\rho\,d\rho\,d\varphi=\int_0^{\pi/2}2\cos^2\varphi\,d\varphi=\int_0^{\pi/2}(1+\cos2\varphi)\,d\varphi=\frac\pi2.$$

**Půlměsíc mezi dvěma kružnicemi:** $(x-1)^2+y^2\ge1$ a $(x-2)^2+y^2\le4$: $\rho\in[2\cos\varphi,4\cos\varphi]$, symetrie podle osy $x$, takže
$$m=2\int_0^{\pi/2}\!\!\int_{2\cos\varphi}^{4\cos\varphi}\rho\,d\rho\,d\varphi=\int_0^{\pi/2}12\cos^2\varphi\,d\varphi=3\pi$$
(kontrola: $4\pi-\pi=3\pi$, obsah velkého kruhu bez malého).

**Gaussův integrál** přes čtvrtinu roviny: $I^2=\displaystyle\int_0^{\pi/2}\!\!\int_0^\infty e^{-\rho^2}\rho\,d\rho\,d\varphi=\frac\pi2\cdot\frac12=\frac\pi4$, tedy $\int_0^\infty e^{-x^2}dx=\frac{\sqrt\pi}2$.

**Objem koule** poloměru $R$: $\displaystyle\int_0^{2\pi}\!\!\int_0^\pi\!\!\int_0^R\rho^2\sin\vartheta\,d\rho\,d\vartheta\,d\varphi=2\pi\cdot2\cdot\frac{R^3}3=\frac43\pi R^3.$

## Pozor

> - **Nezapomeň Jacobián!** V polárních souřadnicích je $dx\,dy=\rho\,d\rho\,d\varphi$ (ne $d\rho\,d\varphi$). Ve sférických $\rho^2\sin\vartheta$.
> - Do integrandu **dosaď transformaci** ($x^2+y^2=\rho^2$) i do mezí; meze $\rho,\varphi$ odvoď z obrázku.
> - Používej $|J|$ (absolutní hodnotu); u sférických souřadnic vyjde $-\rho^2\sin\vartheta$, bere se $\rho^2\sin\vartheta\ge0$.
> - Úhel $\vartheta$ ve sférických souřadnicích je od **osy $z$** a leží v $[0,\pi]$ (ne v $[0,2\pi]$).
> - Polární souřadnice používat, když se v zadání objeví $x^2+y^2$ nebo kruh/výseč; jinak zvaž, zda se nezkomplikuje oblast.

## Praxe

Převeď množinu a integrand do polárních, válcových nebo sférických souřadnic, urči meze a spočti obsah/objem či integrál.
