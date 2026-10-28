## Intuice

Neúplný prostor lze „zaplnit dírami“ – tak z racionálních čísel vzniknou reálná. Obecně každý metrický prostor má **zúplnění**. Důležitý nástroj v úplných prostorech je **Banachova věta o kontrakci**: zobrazení, které body přibližuje, má pevný bod (a lze ho najít iterací). Kompaktnost je „úplnost + konečná aproximovatelnost“.

## Vzorec

**Hustá a řídká množina.** $A\subset X$ je **hustá**, pokud $\bar A=X$ (každá otevřená množina protíná $A$). $A$ je **řídká**, pokud $X\setminus\bar A$ je hustá. Příklad: $\mathbb Q$ je hustá v $\mathbb R$.

**Zúplnění.** Úplný prostor $\tilde X\supset X$ s $\bar X=\tilde X$ a metrikou $\tilde d$ rozšiřující $d$. 

**Věta 92 (o zúplnění).** Každý metrický prostor má zúplnění, jednoznačné až na bijektivní izometrii ($d_2(\varphi(x),\varphi(y))=d_1(x,y)$). Konstrukce je stejná jako $\mathbb Q\to\mathbb R$ (třídy cauchyovských posloupností).

**Příklad neúplnosti:** po částech spojité funkce na $[0,1]$ s $L^p$ normou: $f_n=0$ na $[0,\frac1n)$ a $f_n=\sin\frac1x$ na $[\frac1n,1]$ konvergují k $\sin\frac1x$, která mezi po částech spojité funkce nepatří (má nekonečně mnoho oscilací, není po částech spojitá).

**Kontrakce.** $F:X\to X$ s $d(F(x),F(y))\le C\,d(x,y)$ pro nějaké $0\le C<1$.

**Věta 93 (Banachova).** Kontrakce na **úplném** metrickém prostoru má pevný bod $z=F(z)$ (a je jediný; iterace $x_{n+1}=F(x_n)$ k němu konvergují z libovolného $x_0$).

**Další pojmy.** $\operatorname{diam}A=\sup_{x,y\in A}d(x,y)$ (omezená: $<\infty$); $\operatorname{dist}(A,B)=\inf d(x,y)$; **otevřené pokrytí**; **totálně omezený**: ke každému $\varepsilon$ existuje konečná množina $A$ s $\operatorname{dist}(x,A)<\varepsilon$ pro všechna $x$.

**Věta 94.** Pro metrický prostor $X$ jsou ekvivalentní: (1) $X$ je **kompaktní** (každá posloupnost má konvergentní podposloupnost); (2) každé otevřené pokrytí má konečné podpokrytí; (3) $X$ je úplný a totálně omezený. V $\mathbb R^n$ je kompaktní $\Leftrightarrow$ uzavřená a omezená.

## Mini příklad

$F(x)=\frac x2+1$ na $\mathbb R$: $|F(x)-F(y)|=\frac12|x-y|$, kontrakce s $C=\frac12$, pevný bod z $z=\frac z2+1$ je $z=2$.

$F(x)=\cos x$ na $[0,1]$: $F([0,1])=[\cos1,1]\subset[0,1]$, $|F'|=|\sin x|\le\sin1<1$ ⇒ kontrakce; pevný bod $z\approx0{,}7391$ ($x_{n+1}=\cos x_n$: $1\to0{,}5403\to0{,}8576\to0{,}6543\to\cdots$).

## Pozor

> - Banachova věta vyžaduje **úplný** prostor a $C<1$ **striktně**; $d(F(x),F(y))<d(x,y)$ pro $x\ne y$ samo nestačí.
> - Zobrazení musí zobrazovat prostor **do sebe** ($F:X\to X$): u $\cos$ je nutné ověřit, že $[0,1]$ jde do $[0,1]$.
> - Kontrakce má **právě jeden** pevný bod.
> - Kompaktnost v obecném metrickém prostoru **není** „uzavřená a omezená“ (to platí jen v $\mathbb R^n$).
> - Zúplnění není jediné, ale jednoznačné **až na izometrii**.

## Praxe

Ověř, že zobrazení je kontrakce, najdi pevný bod a odhadni konvergenci iterací; rozhodni o kompaktnosti jednoduchých množin.
