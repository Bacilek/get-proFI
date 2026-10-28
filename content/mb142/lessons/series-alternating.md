## Intuice

U řady se střídavými znaménky se členy navzájem ruší, takže konverguje i mnohem hůř než řada s nezápornými členy. Podstatný rozdíl je mezi řadou, která konverguje **jen díky střídání znamének** (relativně), a takovou, která by konvergovala i bez něj (absolutně): jen absolutně konvergentní řadu smíš libovolně přerovnávat.

## Vzorec

**Alternující řada:** $\sum(-1)^na_n$ s $a_n\ge0$.

**Leibnizovo kritérium:** $(a_n)$ **nerostoucí** posloupnost kladných čísel. Potom
$$\sum_{n=0}^\infty(-1)^na_n\ \text{konverguje}\iff\lim a_n=0$$

**Odhad chyby:** pro součet $A$ platí $|A-s_n|\le a_{n+1}$ (první nezahrnutý člen) a zbytek $A-s_n$ má jeho znaménko. $A$ leží vždy mezi $s_n$ a $s_{n+1}$.

**Absolutní konvergence:** $\sum|a_n|$ konverguje $\Rightarrow$ konverguje i $\sum a_n$ (**absolutně**).
Konverguje $\sum a_n$, ale $\sum|a_n|$ diverguje $\Rightarrow$ konverguje **relativně**.

**Přerovnání:** absolutně konvergentní řadu lze přerovnat libovolně (součet se nezmění). U relativně konvergentní jde přerovnáním dosáhnout libovolného součtu, $\pm\infty$ i oscilace.

## Mini příklad

$\displaystyle\sum_{n=1}^\infty\frac{(-1)^{n-1}}{n}$ (alternující harmonická): $\frac1n$ klesá k $0$, takže konverguje (Leibniz). $\sum\frac1n=\infty$, proto jde o **relativní** konvergenci.

$\displaystyle\sum_{n=1}^\infty\frac{(-1)^{n-1}}{n^2}$: $\sum\frac1{n^2}$ konverguje, tedy **absolutně**.

Chyba: $\sum_{n=0}^\infty\left(-\frac12\right)^n=\frac23$. Pro $s_7=1-\frac12+\dots-\frac1{128}=\frac{85}{128}$ je $|A-s_7|\le a_8=\frac1{256}\approx0{,}0039$ (skutečná chyba $\frac1{384}$, znaménko $+$ jako $(-1)^8a_8$).

## Pozor

> - Leibniz vyžaduje, aby $a_n$ **klesalo** (neroste). Bez toho $a_n\to0$ nestačí; $\lim a_n=0$ je zároveň nutné.
> - $\lim a_n\neq0\Rightarrow$ řada diverguje (např. $\sum(-1)^n\frac{n}{n+1}$).
> - Neplést: Leibnizovo kritérium rozhoduje o **konvergenci**, absolutní konvergenci musíš zvlášť ověřit přes $\sum|a_n|$ a kritéria pro nezáporné členy.
> - Konverguje-li $\sum a_n$ i $\sum b_n$, řada součinů $\sum a_nb_n$ konvergovat **nemusí** ($a_n=b_n=\frac{(-1)^{n-1}}{\sqrt n}$ dává $\sum\frac1n$).
> - Relativně konvergentní řadu **nepřerovnávej** ani nesčítej po částech kladných/záporných (obě částečné řady $\sum a_n^+$, $\sum a_n^-$ divergují).

## Praxe

Posuď konvergenci (absolutní, relativní, divergence) a odhadni chyby částečných součtů.
