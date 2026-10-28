## Intuice

**Hornerovo schéma** je rychlý zápis dosazení do polynomu a zároveň dělení kořenovým činitelem $(x-x_0)$. **Parciální zlomky** rozkládají složitý racionální výraz na jednoduché zlomky; podle tvaru jmenovatele je jejich tvar jednoznačně daný.

## Vzorec

**Horner.** Pro $f(x)=a_nx^n+\dots+a_1x+a_0$ a bod $x_0$:
$$b_0=a_n,\quad b_k=x_0\,b_{k-1}+a_{n-k},\quad b_n=f(x_0).$$

| $x_0$ | $a_n$ | $a_{n-1}$ | … | $a_0$ |
|---|---|---|---|---|
| | $b_0$ | $b_1$ | … | $b_n=f(x_0)$ |

Je-li $b_n=0$, je $x_0$ kořen a $f(x)=(x-x_0)\,g(x)$, kde $g=b_0x^{n-1}+b_1x^{n-2}+\dots+b_{n-1}$.

**Parciální zlomky** (pro ryze lomenou $R=\frac PQ$, $\deg P<\deg Q$, bez společného kořene):

- reálný kořen $\alpha$ násobnosti $k$ (činitel $(x-\alpha)^k$):
$$\frac{A_1}{(x-\alpha)^k}+\frac{A_2}{(x-\alpha)^{k-1}}+\dots+\frac{A_k}{x-\alpha}$$
- dvojice komplexních kořenů násobnosti $k$ (činitel $(x^2+px+q)^k$, diskriminant $<0$):
$$\frac{B_1x+C_1}{(x^2+px+q)^k}+\dots+\frac{B_kx+C_k}{x^2+px+q}$$

Koeficienty: převod na společného jmenovatele a porovnání čitatelů, buď **dosazením kořenů** jmenovatele, nebo porovnáním koeficientů u mocnin (soustava rovnic); lze kombinovat.

## Mini příklad

**Horner:** $f(x)=3x^3-2x^2+x-18$.

| $x_0=2$ | 3 | −2 | 1 | −18 |
|---|---|---|---|---|
| | 3 | 4 | 9 | **0** |

Kořen $2$, $f(x)=(x-2)(3x^2+4x+9)$. Pro $x_0=1$ vyjde zbytek $-16=f(1)$, tedy $1$ kořen není.

**Rozklad:** $\dfrac{x+1}{(x-1)(x-2)^2}=\dfrac{A}{x-1}+\dfrac{B}{(x-2)^2}+\dfrac{C}{x-2}$, tedy
$$x+1=A(x-2)^2+B(x-1)+C(x-1)(x-2).$$
$x=1$: $A=2$. $x=2$: $B=3$. $x=0$: $1=4A-B+2C=5+2C\Rightarrow C=-2$.

**Tvar rozkladu** (bez počítání koeficientů): $\dfrac{x^2+7x+1}{x(x-1)^3(x^2+x+1)^2}=\dfrac Ax+\dfrac B{(x-1)^3}+\dfrac C{(x-1)^2}+\dfrac D{x-1}+\dfrac{Ex+F}{(x^2+x+1)^2}+\dfrac{Gx+H}{x^2+x+1}$.

## Pozor

> - Horner potřebuje **všechny** koeficienty včetně nulových (např. $x^3-1$: $1,0,0,-1$).
> - Racionální kořeny celočíselného polynomu hledej mezi děliteli absolutního členu (u normovaného polynomu).
> - Při násobném kořeni zahrň **všechny** mocniny $1,\dots,k$; u kvadratického činitele čitatel $Bx+C$, ne konstantu.
> - Je-li $\deg P\ge\deg Q$, nejdřív **vyděl** (Horner pro dělení $(x-x_0)$ se hodí).
> - Dosazení kořenů neurčí všechny koeficienty vždy, zbytek doplň jinou „pěknou“ hodnotou $x$ nebo porovnáním koeficientů.

## Praxe

Spočítej hodnoty pomocí Hornera a urči tvar rozkladu.
