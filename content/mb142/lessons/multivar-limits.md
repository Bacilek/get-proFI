## Intuice

Funkce $f:M\subseteq\mathbb R^n\to\mathbb R$ má více vstupů. Limita se definuje stejně jako v jedné proměnné (okolí = koule), ale k bodu se můžeme blížit **nekonečně mnoha směry a křivkami**, takže limita existuje jen tehdy, když dá **všude stejný** výsledek. L'Hospitalovo pravidlo zde není.

## Vzorec

- Graf: $\mathrm{Gr}(f)=\{[x_1,\dots,x_n,y]:\ y=f(x_1,\dots,x_n)\}\subseteq\mathbb R^{n+1}$.
- Limita, součet/součin/podíl, věta o dvou strážnících a limita složené funkce fungují jako v 1D (pro $f\circ g$ s $f$ spojitou v $L$).
- **Spojitost** v bodě: $\lim_{x\to x^*}f(x)=f(x^*)$.
- **Weierstrass:** spojitá $f$ na uzavřené a omezené (kompaktní) $M$ je omezená a nabývá maxima i minima.
- **Bolzano:** $f$ spojitá na otevřené souvislé $M$ nabývá všech hodnot mezi $f(x_1)$ a $f(x_2)$.

**Jak ukázat, že limita neexistuje:** dosazení přímek $y=kx$ (příp. parabol $y=kx^2$, …), vyjde-li závislost na $k$ nebo různé hodnoty, limita **neexistuje**.

**Jak ukázat, že limita existuje (= $L$):** odhad/strážníci, nebo **polární souřadnice** $x=x_0+r\cos\varphi,\ y=y_0+r\sin\varphi$: pokud $|f-L|\le g(r)\to0$ nezávisle na $\varphi$, je limita $L$. Typicky $r\cdot(\text{omezená funkce }\varphi)\to0$.

## Mini příklad

$\displaystyle\lim_{[x,y]\to[0,0]}\frac{xy}{x^2+y^2}$: pro $y=kx$ vyjde $\frac{k}{1+k^2}$, závisí na $k$ ⇒ **neexistuje**.

$\displaystyle\lim\frac{x^2y}{x^4+y^2}$: po přímkách $y=kx$ vyjde $0$, ale po parabolách $y=kx^2$ vyjde $\frac{k}{1+k^2}\ne0$ ⇒ **neexistuje**. (Samotné přímky nestačí!)

$\displaystyle\lim\frac{x^3+y^3}{x^2+y^2}=\lim_{r\to0^+}r\,(\cos^3\varphi+\sin^3\varphi)=0$ (omezená funkce krát $r\to0$).

$\displaystyle\lim_{[x,y]\to[0,0]}\frac{x^2+y^2}{\sqrt{x^2+y^2+1}-1}=\lim\big(\sqrt{x^2+y^2+1}+1\big)=2$ (usměrnění).

## Pozor

> - Stejná limita po všech **přímkách** ještě **nestačí**, existenci musíš dokázat (polární souřadnice, odhad).
> - Dvě různé hodnoty po dvou různých křivkách ⇒ limita neexistuje; to je nejrychlejší důkaz neexistence.
> - V polárních souřadnicích musí odhad záviset jen na $r$ (stejnoměrně vůči $\varphi$).
> - Weierstrass vyžaduje **kompaktní** množinu (uzavřená + omezená).

## Praxe

Rozhodni, zda limity existují, a spočítej je.
