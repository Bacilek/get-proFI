## Intuice

Perceptron je nejjednodušší „neuron“: spočítá **vážený součet vstupů** a podle toho, zda je ≥ 0, vrátí 1 nebo 0. Geometricky je to **lineární klasifikátor** – dělí prostor přímkou (rovinou, nadrovinou).

> Rozpracováno ze sbírky (kap. 10.3–10.4); slidy přednášky 10 zatím nejsou k dispozici – po jejich nahrání zkontrolovat (perceptronový algoritmus učení).

## Vzorec

Vstup $\vec x=\langle x_1,\dots,x_n\rangle$, **rozšířený vstupní vektor** $\tilde x=\langle1,x_1,\dots,x_n\rangle$, váhy $\vec w=\langle w_0,w_1,\dots,w_n\rangle$ ($w_0$ = práh/bias). Výstup perceptronu:
$$C[\vec w](\vec x)=\begin{cases}1&\text{pokud } w_0+\sum_{i=1}^nw_ix_i=\vec w\cdot\tilde x\ge0\\0&\text{jinak.}\end{cases}$$
**Geometrie:** rovnice $\vec w\cdot\tilde x=0$ je **dělicí nadrovina** (ve 2D přímka $w_0+w_1x_1+w_2x_2=0$); příklady s $\vec w\cdot\tilde x\ge0$ jsou na straně třídy 1 (bod přímo na hranici dostane 1). Perceptron umí jen **lineárně separabilní** úlohy (AND, OR ano; XOR ne).

## Mini příklad

$\vec w=\langle1,1,2.5,0,-1\rangle$, tedy $w_0=1$ a čtyři vstupy s váhami $w_1=1$, $w_2=2{,}5$, $w_3=0$, $w_4=-1$.
- $\vec x_1=\langle0,1,1,2\rangle$: $1+0+2{,}5+0-2=1{,}5\ge0\Rightarrow$ **1**.
- $\vec x_2=\langle-1,1{,}5,3,4\rangle$: $1-1+3{,}75+0-4=-0{,}25<0\Rightarrow$ **0**.
- $\vec x_3=\langle-3,1,3,0{,}5\rangle$: $1-3+2{,}5+0-0{,}5=0\Rightarrow$ **1** (leží na hranici).
Aby $\vec x_4=\langle-2,1,2{,}5,3\rangle$ (součet $-1{,}5$) dal 1, stačí změnit $w_4$ z $-1$ na $-0{,}5$ (poslední vstup je největší, $3\cdot0{,}5=1{,}5$).

AND: $\vec w=\langle-1{,}5,1,1\rangle$ dá 1 jen pro $(1,1)$.

## Pozor

> - **$w_0$ se násobí jedničkou** (rozšířený vektor), ne vstupem.
> - Hranice $\vec w\cdot\tilde x=0$ patří do třídy **1** (≥ 0).
> - Perceptron nezvládne XOR (lineárně neseparabilní) – k tomu jsou vícevrstvé sítě.
> - Nejmenší změna váhy: vyber váhu s největší „pákou“ (největší $|x_i|$ u vstupu s vhodným znaménkem).

## Praxe

Vyhodnoť perceptron, najdi váhy pro logické funkce.
