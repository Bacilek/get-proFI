## Intuice

Má-li řada **nezáporné členy**, částečné součty jen rostou, takže řada buď konverguje, nebo diverguje k $\infty$ (nikdy neosciluje). Konvergenci pak poznáš porovnáním s řadou, kterou znáš, nebo kritérii podle toho, jak rychle členy klesají.

## Vzorec

Nechť $a_n\ge0$ (podílové kritérium: $a_n>0$).

- **Srovnávací:** $a_n\le b_n$ od nějakého $N$. Konverguje $\sum b_n\Rightarrow$ konverguje $\sum a_n$. Diverguje $\sum a_n\Rightarrow$ diverguje $\sum b_n$.
- **Integrální:** $f\ge0$ nerostoucí na $[N,\infty)$, $f(n)=a_n$:
$$\sum a_n\ \text{konverguje}\iff\int_N^\infty f(x)\,\mathrm{d}x\ \text{konverguje}$$
- **Podílové:** $q=\lim\dfrac{a_{n+1}}{a_n}$. $q<1$ konverguje, $q>1$ diverguje k $\infty$, $q=1$ nelze rozhodnout.
- **Odmocninové:** $q=\lim\sqrt[n]{a_n}$. Stejně: $q<1$ konverguje, $q>1$ diverguje, $q=1$ nelze rozhodnout.

**Etalon (z integrálního kritéria):**
$$\sum_{n=1}^\infty\frac{1}{n^p}\ \text{konverguje}\iff p>1$$
(harmonická řada $p=1$ diverguje). Geometrická $\sum q^n$ konverguje $\iff q<1$ (pro $q\ge0$).

Užitečné limity: $\sqrt[n]{n}\to1$, $\left(1+\frac1n\right)^n\to e$.

## Mini příklad

**Podílové:** $\displaystyle\sum\frac{n!}{n^n}$:
$$\frac{a_{n+1}}{a_n}=\frac{(n+1)!\,n^n}{(n+1)^{n+1}\,n!}=\frac{n^n}{(n+1)^n}=\frac{1}{\left(1+\frac1n\right)^n}\to\frac1e<1\ \Rightarrow\ \text{konverguje}$$

**Odmocninové:** $\displaystyle\sum\Big(\frac{n}{2n+1}\Big)^n$: $\sqrt[n]{a_n}=\frac{n}{2n+1}\to\frac12<1\Rightarrow$ konverguje.

**Srovnávací:** $\dfrac{\ln n}{n}\ge\dfrac1n$ pro $n\ge3$ a $\sum\frac1n$ diverguje $\Rightarrow\sum\frac{\ln n}{n}$ diverguje. Naopak $\dfrac1{n(n+1)}\le\dfrac1{n^2}$ $\Rightarrow$ konverguje.

## Pozor

> - $q=1$ **nic neříká**: $\sum\frac1n$ (diverguje) i $\sum\frac1{n^2}$ (konverguje) dávají $q=1$ v obou kritériích. Pro $\sum\frac{1}{n^p}$ proto použij integrální kritérium / etalon, ne podílové.
> - Srovnání musí jít **správným směrem**: větší konvergentní majoranta $\Rightarrow$ konverguje; menší divergentní minoranta $\Rightarrow$ diverguje. Z $a_n\le b_n$ a $\sum b_n=\infty$ nic neplyne.
> - Odmocninové kritérium je **silnější** než podílové (když funguje podílové, funguje i odmocninové); když podíl $\frac{a_{n+1}}{a_n}$ nemá limitu (členy skáčou), zkus odmocninu.
> - Kritéria jsou jen pro **nezáporné** členy; pro střídavé znaménko viz alternující řady.
> - Je-li $a_n\not\to0$, řada diverguje dřív, než cokoli z kritérií spočítáš.

## Praxe

Rozhodni o konvergenci a spočti limity z kritérií. Výsledky na 3 desetinná místa.
