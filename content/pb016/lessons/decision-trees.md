## Intuice

Rozhodovací strom klasifikuje příklad posloupností testů na atributy. Strom se učí **rekurzivně**: v každém uzlu vyber atribut, který nejvíc **sníží nejistotu (entropii)** ve třídách – ten s největším **informačním ziskem**.

> Rozpracováno ze sbírky (kap. 10.1–10.2); slidy přednášky 10 zatím nejsou k dispozici – po jejich nahrání zkontrolovat.

## Vzorec

**Rozhodovací strom:** kořenový strom; **vnitřní uzel** = test na atribut, hrany = hodnoty atributu, **list** = třída. Strom je **konzistentní** s datasetem, pokud správně klasifikuje všechny jeho příklady.

**Entropie** datasetu $D$ (třídy $1..n$, $P_i$ = podíl třídy $i$):
$$E(\langle P_1,\dots,P_n\rangle)=-\sum_iP_i\log_2P_i,\qquad 0\cdot\log_2 0:=0.$$
Binární: $E(p)=-p\log_2p-(1-p)\log_2(1-p)$. Čistý dataset (jedna třída): $E=0$; vyrovnaný (50 : 50): $E=1$ (max pro binární).
**Informační zisk** atributu $A$ s hodnotami $1..k$ dělícími $D$ na $D_1..D_k$ ($p,n$ = počet pozitivních a negativních v $D$; $p_i,n_i$ v $D_i$):
$$\text{Gain}(A)=E\!\left(\tfrac{p}{p+n},\tfrac{n}{p+n}\right)-\sum_{i=1}^k\frac{p_i+n_i}{p+n}\,E\!\left(\tfrac{p_i}{p_i+n_i},\tfrac{n_i}{p_i+n_i}\right).$$
**Učení stromu:** rekurzivně od kořene: vyber atribut s max. ziskem, rozděl příklady podle hodnot, pokračuj. **List**, když příklady v uzlu mají jednu třídu (label = třída), nebo když už byly otestovány všechny atributy (label = převládající třída; strom pak nemusí být konzistentní).

## Mini příklad

Dataset (7 příkladů, Tenis: ANO×4, NE×3). $E=-\tfrac47\log_2\tfrac47-\tfrac37\log_2\tfrac37\approx0{,}985$.
Atribut **Počasí**: zataženo (1 ANO, 1 NE), slunečno (3 ANO), déšť (2 NE): $\text{Gain}=0{,}985-\big(\tfrac27\cdot1+\tfrac37\cdot0+\tfrac27\cdot0\big)\approx0{,}699$.
Pro srovnání (stejná data): Vlhkost ≈ 0,592; Větrno ≈ 0,128; Teplota ≈ 0,020 ⇒ **Počasí** je nejlepší kořen; slunečno a déšť už plně určují třídu.

## Pozor

> - Entropie **nezávisí** na tom, kterou třídu je „pozitivní“; $E(p)=E(1-p)$.
> - Vysoká počáteční entropie = vyrovnaný dataset, ne „špatný“ dataset.
> - Informační zisk je heuristika (hladový výběr), nezaručuje nejmenší strom.
> - $\log_2$ (ne přirozený logaritmus) – entropie v bitech.
> - Strom se může přeučit (konzistentní s trénovacími daty, špatně generalizuje).

## Praxe

Spočítej entropii a informační zisk, rozhodni o kořenovém atributu.
