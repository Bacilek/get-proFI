## Intuice

Metrický prostor je množina s pojmem **vzdálenosti**; stačí k tomu, aby se dalo mluvit o konvergenci, okolích, otevřených a uzavřených množinách – tedy o všem, co známe z $\mathbb R$. Norma je vzdálenost odvozená z „délky vektoru“. Důležitá vlastnost je **úplnost**: každá posloupnost, jejíž členy se k sobě stále víc přibližují, má limitu uvnitř prostoru.

## Vzorec

**Metrika** $d:X\times X\to\mathbb R$:
$$d(x,y)\ge0,\ d(x,y)=0\Leftrightarrow x=y;\qquad d(x,y)=d(y,x);\qquad d(x,z)\le d(x,y)+d(y,z)\ \text{(trojúhelníková nerovnost)}.$$

**Norma** na vektorovém prostoru: $\|x\|\ge0$, $\|x\|=0\Leftrightarrow x=0$; $\|\lambda x\|=|\lambda|\|x\|$; $\|x+y\|\le\|x\|+\|y\|$. Každá norma dává metriku $d(x,y)=\|x-y\|$.

**Posloupnost.** $x_n\to x$, pokud $d(x_n,x)<\varepsilon$ pro všechna $n$ od jistého indexu. $(x_n)$ je **cauchyovská**, pokud $d(x_i,x_j)<\varepsilon$ pro všechna $i,j>N$. Každá konvergentní posloupnost je cauchyovská (trojúhelníková nerovnost: $d(x_i,x_j)\le d(x_i,x)+d(x,x_j)<2\varepsilon$). Prostor, kde platí i opak, se nazývá **úplný**.

**Topologie.** $\varepsilon$-okolí $O_\varepsilon(x)=\{y:d(x,y)<\varepsilon\}$. $U$ je **otevřená**, má-li s každým bodem i nějaké jeho okolí; $W$ je **uzavřená**, je-li $X\setminus W$ otevřená. **Hromadný bod** $A$ je $x$, ke kterému konverguje posloupnost bodů z $A\setminus\{x\}$. Věta 91: $A$ je uzavřená $\Leftrightarrow$ obsahuje všechny své hromadné body. **Vnitřek** $A$ = body s okolím uvnitř $A$; **uzávěr** $\bar A=A\cup\{\text{hromadné body}\}$.

## Mini příklad

- $\mathbb R$ s $d(x,y)=|x-y|$ je úplný; $\mathbb Q$ (racionální čísla) **není**: $x_n=1,\,1{,}4,\,1{,}41,\,1{,}414,\dots\to\sqrt2\notin\mathbb Q$ je cauchyovská bez limity v $\mathbb Q$.
- **Diskrétní metrika** $d(x,y)=1$ pro $x\neq y$, $0$ jinak, je metrika; konvergentní jsou jen posloupnosti stacionární.
- $(0,1)$ je otevřená v $\mathbb R$, $[0,1]$ uzavřená; $\overline{(0,1)}=[0,1]$, vnitřek $[0,1]$ je $(0,1)$.
- $(0,1)$ s $|x-y|$ **není úplný**: $x_n=\frac1n$ je cauchyovská a limita $0\notin(0,1)$.

## Pozor

> - Úplnost je vlastnost **prostoru** i zvolené **metriky**; $(0,1)$ není úplný, $[0,1]$ ano.
> - Konvergentní ⇒ cauchyovská, **ne naopak** (to je právě úplnost).
> - Otevřená a uzavřená se **nevylučují** (ani nemusí být jedna z nich): $[0,1)$ není ani jedno; v $\mathbb R$ jsou $\emptyset,\mathbb R$ obojí.
> - Hromadný bod množiny nemusí patřit do množiny; **izolovaný bod** není hromadný.
> - Trojúhelníková nerovnost je jediná „netriviální“ vlastnost metriky při ověřování.

## Praxe

Ověř axiomy metriky, rozhodni o úplnosti, spočti uzávěr a vnitřek jednoduchých množin.
