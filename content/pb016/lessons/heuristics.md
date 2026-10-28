## Intuice

Dobrá heuristika je **přípustná** a zároveň co nejblíž skutečné ceně. Jak ji vymyslet? **Zjednoduš (zrelaxuj) problém** – cena jeho optimálního řešení je automaticky přípustnou heuristikou původního problému. Kvalitu pak měříš efektivním faktorem větvení.

## Vzorec

**Relaxace posunovačky** (původně: dlaždici lze z $A$ na $B$, pokud $A$ sousedí s $B$ **a** $B$ je prázdné):
- (a) dlaždice se může přesunout z $A$ na $B$, pokud $A$ sousedí s $B$ → $h_2$ = součet **manhattanských** vzdáleností,
- (b) pokud $B$ je prázdné → Gaschnigova heuristika,
- (c) kamkoliv → $h_1$ = počet dlaždic mimo svou pozici.

**Pravidlo:** cena optimálního řešení relaxovaného problému (méně omezení na akce) je přípustná heuristika původního problému (optimální řešení původního je i řešením relaxovaného).

**Dominance:** $h_2$ **dominuje** $h_1$, pokud $h_2(n)\ge h_1(n)$ pro všechna $n$ (obě přípustné). A\* s $h_2$ nikdy nerozšíří víc uzlů než s $h_1$.

**Efektivní faktor větvení $b^*$:** A\* vygeneroval $N$ uzlů, řešení v hloubce $d$. Idealizovaný strom má $N+1=1+b^*+(b^*)^2+\dots+(b^*)^d$. Čím blíž **1**, tím lepší heuristika.

8-posunovačka (průměr přes testovací sady):

| $d$ | IDS | A\*($h_1$) | A\*($h_2$) | $b^*$ IDS | $b^*(h_1)$ | $b^*(h_2)$ |
|---|---|---|---|---|---|---|
| 6 | 680 | 20 | 18 | 2,73 | 1,34 | 1,30 |
| 12 | 3 644 035 | 227 | 73 | 2,78 | 1,42 | 1,24 |

**Rozvrh procesorů** (úlohy $t_i$ s dobou $D_i$, $m$ procesorů, precedence; minimalizuj celkový čas): stav = (nezařazené, běžící s časy dokončení, čas). Heuristika
$h=\max\!\big(0,\ \tfrac{\sum_i D_i+\sum_j F_j}{m}-\text{Fin}\big)$, kde $\text{Fin}=\max_j F_j$ – ideální rozložení práce bez prostojů a bez precedence (relaxace) ⇒ přípustná.

## Mini příklad

Stav 8-posunovačky (cíl `1 2 3 / 4 5 6 / 7 8 _`):

```
7 2 4
5 _ 6
8 3 1
```

Mimo místo je 6 dlaždic (7, 4, 5, 8, 3, 1; dlaždice 2 a 6 sedí) ⇒ $h_1=6$. Manhattan (dlaždice: vzdálenost): $7{:}2,\ 2{:}0,\ 4{:}3,\ 5{:}1,\ 6{:}0,\ 8{:}1,\ 3{:}3,\ 1{:}4$ ⇒ $h_2=14$ (platí $h_1\le h_2\le h^*=20$).

## Pozor

> - Heuristika $h_1$ **nepočítá** mezeru (prázdné políčko) – počítají se jen dlaždice 1–8.
> - $h_2$ může být nanejvýš $h^*$; vyšší **přípustná** heuristika je lepší (méně uzlů), ale dražší na výpočet.
> - Maximum z více přípustných heuristik je zase přípustná a dominuje všem.
> - Relaxace musí zachovat *všechna* řešení původního problému; jinak heuristika nemusí být přípustná.

## Praxe

Vypočítej $h_1$, $h_2$, vyber relaxace a odhadni efektivní faktor větvení.
