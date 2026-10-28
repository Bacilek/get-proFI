## Intuice

**Parciální derivace** podle $x_i$ = derivuj podle $x_i$ a ostatní proměnné ber jako konstanty. Geometricky je to směrnice řezu grafu rovinou rovnoběžnou s osou $x_i$. **Diferenciál** je lineární aproximace funkce v okolí bodu; její graf je **tečná rovina**.

## Vzorec

- Definice: $\dfrac{\partial f}{\partial x}(x,y)=\lim_{h\to0}\dfrac{f(x+h,y)-f(x,y)}{h}$ (analogicky $y$). Značení $f_x,\ f'_x,\ \partial f/\partial x$.
- Vyšší řády: $f_{xx},\ f_{yy}$, smíšené $f_{xy}=(f_x)_y,\ f_{yx}=(f_y)_x$.
- **Schwarzova věta:** jsou-li smíšené derivace $f_{xy},f_{yx}$ v bodě **spojité**, pak $f_{xy}=f_{yx}$.
- **Diferencovatelnost** v $[x_0,y_0]$: existují $A,B$, že
$$\lim_{[h_1,h_2]\to[0,0]}\frac{f(x_0+h_1,y_0+h_2)-f(x_0,y_0)-Ah_1-Bh_2}{\sqrt{h_1^2+h_2^2}}=0.$$
Pak $A=f_x(x_0,y_0)$, $B=f_y(x_0,y_0)$ a **diferenciál** je $\mathrm df=f_xh_1+f_yh_2$.
- Souvislosti: diferencovatelná ⇒ spojitá a existují parciální derivace. **Spojité** $f_x,f_y$ v bodě ⇒ diferencovatelná.
- **Přibližný výpočet:** $f(x_0+h_1,y_0+h_2)\approx f(x_0,y_0)+f_x h_1+f_y h_2$.
- **Tečná rovina** ke grafu v $[x_0,y_0,f(x_0,y_0)]$:
$$z=f(x_0,y_0)+f_x(x_0,y_0)(x-x_0)+f_y(x_0,y_0)(y-y_0).$$

## Mini příklad

$f=\mathrm e^x y^2\sin xy$:
$f_x=y^2\mathrm e^x(\sin xy+y\cos xy)$, $f_y=\mathrm e^x y(2\sin xy+xy\cos xy)$.

$f=\operatorname{arctg}\frac yx$: $f_x=\dfrac{-y}{x^2+y^2}$, $f_y=\dfrac{x}{x^2+y^2}$, $f_{xy}=f_{yx}=\dfrac{y^2-x^2}{(x^2+y^2)^2}$.

**Tečná rovina** $f=x^3+y^3$ v $[1,1,2]$: $f_x=f_y=3$ ⇒ $z-2=3(x-1)+3(y-1)$, tj. $z=3x+3y-4$.

**Přibližně** $\sqrt{2{,}98^2+4{,}05^2}$: $f=\sqrt{x^2+y^2}$, $[x_0,y_0]=[3,4]$, $f_x=\frac35,f_y=\frac45$, $h=(-0{,}02;0{,}05)$:
$\mathrm df=\frac35(-0{,}02)+\frac45(0{,}05)=0{,}028$ ⇒ $\approx5{,}028$.

## Pozor

> - **Existence parciálních derivací neznamená spojitost.** Např. $f=1$ na osách a $0$ jinde má $f_x(0,0)=f_y(0,0)=0$, ale není spojitá v počátku.
> - Pro diferencovatelnost stačí **spojité** parciální derivace (ne naopak).
> - Smíšené derivace zaměňuj jen při spojitosti (Schwarz).
> - Při derivování podle $x$ zacházej s $y$ jako s konstantou — a naopak; pozor na součin a složenou funkci.
> - V bodě, kde derivace nejsou spojité (např. přechod přes počátek), počítej z **definice** (limita podílu).

## Praxe

Spočti parciální derivace, tečné roviny a přibližné hodnoty.
