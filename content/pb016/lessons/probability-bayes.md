## Intuice

Když o světě víme jen neúplně, používáme **pravděpodobnost**: číslo $\in[0,1]$ udávající míru jistoty. **Bayesova věta** obrací podmíněnou pravděpodobnost („z příznaku na příčinu“), **Bayesovská síť** kompaktně popisuje závislosti mezi náhodnými proměnnými.

> Rozpracováno ze sbírky (kap. 8.3–8.4); slidy přednášky 8 zatím nejsou k dispozici – po jejich nahrání zkontrolovat.

## Vzorec

**Pravděpodobnostní prostor:** $\Omega$ = množina elementárních jevů (hod kostkou $\{1,\dots,6\}$), jev = podmnožina $\Omega$. Pravděpodobnost $P:2^\Omega\to[0,1]$, $P(\Omega)=1$, $P(A\cup B)=P(A)+P(B)$ pro disjunktní $A,B$.
**Náhodná proměnná** $X:\Omega\to\mathbb R$ (booleovská: 0/1, píšeme $a$, $\neg a$). **Rozdělení** $P(X)$: pravděpodobnosti všech hodnot, součet = 1. **Složené rozdělení** $P(X_1,\dots,X_n)$ obsahuje všechna přiřazení (atomické události); pravděpodobnost jevu = součet pravděpodobností atomických událostí, které jej splňují.

**Podmíněná pravděpodobnost:** $P(A\mid B)=\dfrac{P(A\cap B)}{P(B)}$, $P(B)\neq0$.
**Nezávislost:** $P(A\cap B)=P(A)\,P(B)$ (⇔ $P(A\mid B)=P(A)$).
**Bayesova věta:** $P(A\mid B)=\dfrac{P(B\mid A)\,P(A)}{P(B)}$; jmenovatel často $P(B)=P(B\mid A)P(A)+P(B\mid\neg A)P(\neg A)$.

**Bayesovská síť:** acyklický orientovaný graf; uzly = náhodné proměnné; hrana $A\to B$: $A$ je **rodič** (přímý vliv na) $B$; u každého uzlu tabulka $P(X_i\mid\text{Parents}(X_i))$. Konstrukce: uzly se přidávají postupně, pro nový uzel se hledá **minimální** množina rodičů z dosavadních uzlů s $P(X_i\mid\text{Parents})=P(X_i\mid X_1,\dots,X_{i-1})$. Pořadí je libovolné, ale **příčiny před následky** dávají kompaktnější síť. Společné rozdělení: $P(X_1,\dots,X_n)=\prod_iP(X_i\mid\text{Parents}(X_i))$.

## Mini příklad

Nemoc má prevalenci 1 %, test je pozitivní u 90 % nemocných a u 5 % zdravých. $P(\text{nemoc}\mid+)=\dfrac{0{,}9\cdot0{,}01}{0{,}9\cdot0{,}01+0{,}05\cdot0{,}99}=\dfrac{0{,}009}{0{,}0585}\approx0{,}154$ – i po pozitivním testu je pravděpodobnost jen ≈ 15 %.

Kostka: $P(\text{sudé}\mid\ge4)=\dfrac{P(\{4,6\})}{P(\{4,5,6\})}=\dfrac{2/6}{3/6}=\dfrac23$.

## Pozor

> - $P(A\mid B)\neq P(B\mid A)$ – Bayes je převádí; zanedbání **apriorní** pravděpodobnosti $P(A)$ je častá chyba (viz test).
> - Nezávislost jevů ≠ disjunktnost jevů (disjunktní jevy s nenulovou pravděpodobností jsou **závislé**).
> - Hrany Bayesovy sítě vyjadřují přímou závislost, ne nutně kauzalitu, ale příčiny→následky bývá přirozené.
> - Součet **rozdělení** je 1; součet podmíněných $P(X\mid\text{rodiče})$ přes hodnoty $X$ pro pevné rodiče je také 1.

## Praxe

Spočítej podmíněné pravděpodobnosti, použij Bayesovu větu a posuď nezávislost.
