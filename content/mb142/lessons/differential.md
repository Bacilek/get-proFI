## Intuice

Blízko bodu $x_0$ se hladká funkce chová skoro jako svoje **tečna**. Tečnu umíme spočítat snadno, funkci často ne, takže hodnotu $f(x_0+h)$ **odhadneme** po tečně.

## Vzorec

$$f(x_0 + h) \approx f(x_0) + f'(x_0)\cdot h, \qquad \mathrm{d}f = f'(x_0)\,\mathrm{d}x$$

Přesnost je dobrá, když je $h$ malé. Postup:

1. Zvol $f$ a $x_0$ tak, aby šlo $f(x_0)$ a $f'(x_0)$ spočítat zpaměti a $x_0$ bylo blízko hledanému bodu.
2. Spočti $h = x - x_0$.
3. Dosaď do vzorce.

## Mini příklad

Odhadněte $\sqrt{26}$. Volíme $f(x)=\sqrt{x}$, $x_0=25$, $h=1$, tedy $f'(x)=\frac{1}{2\sqrt{x}}$, $f'(25)=\frac{1}{10}$.

$$\sqrt{26} \approx 5 + \frac{1}{10}\cdot 1 = 5{,}1$$

(skutečně $5{,}0990\ldots$)

## Pozor

> - $x_0$ musí být bod, kde znáš $f$ **přesně** (např. $\pi/4$, $25$, $27$, $0$).
> - Úhly pro derivaci goniometrických funkcí musí být v **radiánech** ($61^\circ = \frac{\pi}{3}+\frac{\pi}{180}$).
> - Funkce dvou proměnných: $f(x,y)\approx f(x_0,y_0)+f_x\,\mathrm{d}x+f_y\,\mathrm{d}y$.

## Praxe

Níže jsou tři úlohy ve stylu zápočtovky.
