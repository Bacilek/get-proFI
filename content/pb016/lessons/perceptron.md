## Intuice

Perceptron je nejjednodušší „neuron“: spočítá **vážený součet vstupů** a podle toho, zda je ≥ 0, vrátí 1 nebo 0. Geometricky je to **lineární klasifikátor** – dělí prostor přímkou (rovinou, nadrovinou).

> Rozpracováno ze sbírky (kap. 10.3–10.4); slidy přednášky 10 zatím nejsou k dispozici – po jejich nahrání zkontrolovat (perceptronový algoritmus učení).

## Vzorec

Vstup $\vec x=\langle x_1,\dots,x_n\rangle$, **rozšířený vstupní vektor** $\tilde x=\langle1,x_1,\dots,x_n\rangle$, váhy $\vec w=\langle w_0,w_1,\dots,w_n\rangle$ ($w_0$ = práh/bias). Výstup perceptronu:
$$C[\vec w](\vec x)=\begin{cases}1&\text{pokud } w_0+\sum_{i=1}^nw_ix_i=\vec w\cdot\tilde x\ge0\\0&\text{jinak.}\end{cases}$$
**Geometrie:** rovnice $\vec w\cdot\tilde x=0$ je **dělicí nadrovina** (ve 2D přímka $w_0+w_1x_1+w_2x_2=0$); příklady s $\vec w\cdot\tilde x\ge0$ jsou na straně třídy 1 (bod přímo na hranici dostane 1). Perceptron umí jen **lineárně separabilní** úlohy (AND, OR ano; XOR ne).

**Perceptronový algoritmus (online, sbírka 10.4):** perceptron $C[\vec w]$ je **konzistentní** s množinou $D=\{(\vec x_k,c_k)\}$, když $C[\vec w](\vec x_k)=c_k$ pro všechna $k$. Váhy začnou náhodně kolem 0 a příklady se procházejí **cyklicky**, $k=(t\bmod p)+1$:
$$\vec w^{(t+1)}=\vec w^{(t)}-\alpha\,\big(C[\vec w^{(t)}](\vec x_k)-c_k\big)\,\tilde x_k,\qquad 0<\alpha\le1.$$
Správně klasifikovaný příklad váhy nemění. Chybně klasifikovaný se k vahám **přičte** ($\alpha\tilde x_k$, má být 1, vyšlo 0) nebo **odečte** (má být 0, vyšlo 1), čímž se nadrovina „pootočí“ k příkladu.
Příklad: $D=\{(\langle-1,0\rangle,1),(\langle0,1\rangle,1),(\langle3,0\rangle,0)\}$, $\vec w^{(0)}=\langle0,1,-1\rangle$, $\alpha=1$: $\tilde x_1=\langle1,-1,0\rangle$, $\vec w\cdot\tilde x_1=-1\Rightarrow0$ (má být 1) $\Rightarrow\vec w^{(1)}=\langle1,0,-1\rangle$; druhý příklad dobře; třetí: $\tilde x_3=\langle1,3,0\rangle$, výstup 1 (má být 0) $\Rightarrow\vec w^{(3)}=\langle0,-3,-1\rangle$.
**Konvergence:** algoritmus zkonverguje jen pro **lineárně separovatelná** data, jinak cyklí (např. XOR / booleovská ekvivalence). Neseparovatelná je i funkce „aspoň jeden ze dvou vstupů z $\{0,1,2\}$ je 2“: střed úsečky mezi $(2,0)$ a $(0,2)$ je $(1,1)$ třídy 0. Naopak „součet dvou skóre je alespoň 8“ separovatelné je ($\vec w=\langle-8,1,1\rangle$), „skóre kritiků je stejné“ ne.
**Dělicí přímka:** $w_1,w_2$ určují sklon, $w_0$ posun od počátku (bias).

**Lineární regrese (sbírka 10.5):** $R[\vec w](\vec x)=w_0+\sum_iw_ix_i=\vec w\cdot\tilde x$ aproximuje spojitou veličinu. Kvalitu měří **kvadratická chyba** $E(\vec w)=\tfrac12\sum_{k=1}^p\big(\vec w\cdot\tilde x_k-f_k\big)^2$ (alternativa: absolutní chyba). Příklad: $D=\{(43,41),(44,45),(45,49),(46,47),(47,44)\}$, $\vec w=\langle9{,}2;0{,}8\rangle$: čtverce chyb $6{,}76;0{,}36;14{,}44;1;7{,}84$, $E=\tfrac12\cdot30{,}4=15{,}2$; predikce pro $x=40$: $9{,}2+0{,}8\cdot40=41{,}2$. Učení = minimalizace $E$ **gradientním sestupem** (od vah se odečítá násobek gradientu), na rozdíl od perceptronového algoritmu, který opravuje jen chybně klasifikované příklady. S dvěma příklady a dvěma vstupy lze rovinu vést přesně oběma body ($E=0$).

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
