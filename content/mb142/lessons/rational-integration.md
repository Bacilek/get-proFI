## Intuice

Racionální lomenou funkci $\frac{P}{Q}$ rozložíme na součet jednoduchých zlomků, které umíme integrovat každý zvlášť.

## Vzorec

1. Je-li $\deg P\ge\deg Q$, **vyděl** polynomy: $\frac PQ=\text{polynom}+\frac{\text{zbytek}}{Q}$.
2. Rozlož jmenovatele na kořenové činitele (Horner) a ryze lomenou část na **parciální zlomky**:

| Činitel ve jmenovateli | Parciální zlomky | Integrál |
|---|---|---|
| $(x-x_0)$ | $\dfrac{A}{x-x_0}$ | $A\ln\lvert x-x_0\rvert$ |
| $(x-x_0)^n$ | $\dfrac{A_1}{x-x_0}+\dots+\dfrac{A_n}{(x-x_0)^n}$ | $\dfrac{A}{(1-k)(x-x_0)^{k-1}}$ pro $k\ge2$ |
| $(x-\alpha)^2+\beta^2$ | $\dfrac{Bx+C}{(x-\alpha)^2+\beta^2}$ | $\ln$ + $\operatorname{arctg}$ |

3. Zlomek $\frac{Bx+C}{x^2+px+q}$: doplň na čtverec, rozděl na $\frac{f'}{f}$ ($\to\ln$) a $\frac{1}{t^2+1}$ ($\to\operatorname{arctg}$).

Pro mocniny $\frac{1}{(x^2+1)^n}$ platí rekurence
$$K_{n+1}=\frac{x}{2n(x^2+1)^n}+\frac{2n-1}{2n}K_n,\qquad K_n=\int\frac{\mathrm{d}x}{(x^2+1)^n}$$

## Mini příklad

$$\frac{x^3+x^2}{x^2+1}=x+1-\frac{x+1}{x^2+1}\ \Rightarrow\ \int=\frac{x^2}{2}+x-\frac12\ln(x^2+1)-\operatorname{arctg}x+C$$

Rozklad (z přednášky): $\dfrac{x^3+6x^2+5}{(x+1)^2(x^2+4)}=\dfrac{2}{(x+1)^2}-\dfrac{1}{x+1}+\dfrac{2x+1}{x^2+4}$.

## Pozor

> - **Nejdřív dělení**, pokud stupeň čitatele ≥ stupeň jmenovatele.
> - Vícenásobný kořen potřebuje **všechny** mocniny $1,\dots,n$.
> - Koeficienty $A,B,\dots$ najdeš dosazením kořenů nebo porovnáním koeficientů.
> - Absolutní hodnota v logaritmu u reálných kořenů.

## Praxe

Rozklad na parciální zlomky a integrace.
