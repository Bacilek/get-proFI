## Intuice

Lokální extrém hledáme tam, kde je funkce „ploská“ ve všech směrech: ve **stacionárním bodě**. Zda jde o minimum, maximum nebo sedlo, rozhodne **druhá derivace** (Hessova matice). Globální extrémy na omezené uzavřené množině hledáme uvnitř i na hranici.

## Vzorec

- **Stacionární bod:** všechny $f_{x_i}=0$. **Fermat:** má-li $f$ v bodě lokální extrém a existují parciální derivace, je tam stacionární bod. Extrém může být i tam, kde některá derivace neexistuje, a ve stacionárním bodě extrém být nemusí (sedlo).
- **Funkce dvou proměnných** (spojité 2. derivace): v stacionárním bodě
$$D=f_{xx}f_{yy}-f_{xy}^2$$
  - $D>0,\ f_{xx}>0$ ⇒ **ostré lokální minimum**; $D>0,\ f_{xx}<0$ ⇒ **ostré lokální maximum**;
  - $D<0$ ⇒ **není extrém** (sedlo);
  - $D=0$ ⇒ věta nerozhodne, zkoumej chování funkce v okolí (např. po křivkách).
- **Obecně:** Hessova matice $A=\big(\frac{\partial^2f}{\partial x_i\partial x_j}\big)$, kvadratická forma $P(h)=\langle Ah,h\rangle$: pozitivně definitní ⇒ min, negativně definitní ⇒ max, indefinitní ⇒ není extrém. **Sylvestr:** pozitivně definitní ⇔ všechny vedoucí hlavní minory $>0$; negativně definitní ⇔ minory střídají znaménka počínaje záporným.
- **Absolutní (globální) extrémy** spojité $f$ na kompaktní $M$ (Weierstrass): nastávají v lokálních extrémech uvnitř nebo na hranici. Postup: (1) stacionární body uvnitř $M$; (2) hranici parametrizuj a řeš jako 1D úlohu (včetně krajních bodů/rohů); (3) porovnej hodnoty.

## Mini příklad

$f=x^3+y^3-3xy$: $f_x=3(x^2-y)=0,\ f_y=3(y^2-x)=0$ ⇒ $y=x^2,\ x=y^2$ ⇒ $x(x^3-1)=0$ ⇒ $P_1=[0,0],\ P_2=[1,1]$.
$f_{xx}=6x,\ f_{yy}=6y,\ f_{xy}=-3$, $D=36xy-9$. $D(0,0)=-9<0$ ⇒ sedlo; $D(1,1)=27>0,\ f_{xx}=6>0$ ⇒ **minimum**.

$f=x^4+y^4-x^2-2xy-y^2$: stacionární body $[0,0],[1,1],[-1,-1]$; $D(\pm1,\pm1)=96>0,\ f_{xx}=10>0$ ⇒ minima. V $[0,0]$ je $D=0$: po $y=-x$ je $f=2x^4>0$, po $y=0$ je $f=x^2(x^2-1)<0$ ⇒ **není extrém**.

**Globální extrémy** $f=xy-x^2-y^2+x+y$ na trojúhelníku $x,y\ge0,\ x+y\le4$: uvnitř $[1,1]$ (max, $f=1$); na hranách $x=0$: $-y^2+y$ (extrémy $[0,\frac12]$ s $\frac14$, rohy $0$ a $-12$); $y=0$ analogicky; $y=4-x$: $-3x^2+12x-12$ (max $0$ v $[2,2]$, konce $-12$). **Maximum $1$ v $[1,1]$, minimum $-12$ v $[0,4]$ a $[4,0]$.**

## Pozor

> - Nejdřív **všechny** stacionární body (soustava $f_x=f_y=0$ — pozor na ztracená řešení při krácení).
> - $D>0$ ještě neříká min/max — rozhoduje znaménko $f_{xx}$ (nebo $f_{yy}$).
> - $D=0$: **nic neplyne**; hledej body, kde $f$ nabývá hodnot nad i pod $f(x_0,y_0)$.
> - Globální extrém na omezené uzavřené množině: **nezapomeň hranici a rohy**; porovnávej funkční hodnoty.
> - Extrém bez parciálních derivací existuje (např. $\sqrt{x^2+y^2}$ v počátku, nebo nespojitá funkce) — Fermat jen pro body, kde derivace existují.

## Praxe

Najdi stacionární body, urči jejich typ, pak globální extrémy na množině.
