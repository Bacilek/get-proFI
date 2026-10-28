## Intuice

Ve hře dvou hráčů nezná hráč soupeřovy tahy dopředu, proto hledá **strategii proti nejlepšímu možnému soupeři**. MAX se snaží skóre maximalizovat, MIN minimalizovat; hodnoty se vyhodnocují od listů ke kořeni.

## Vzorec

**Soupeřící prohledávání (adversarial search):** deterministické prostředí, dva střídající se hráči, perfektní informace, výsledek zpravidla vzájemně opačný (hra s nulovým součtem: skóre $s$ pro mě = $-s$ pro soupeře). Typy her:

| | deterministické | s náhodou |
|---|---|---|
| **perfektní znalosti** | šachy, dáma, Go, Othello | backgammon, monopoly |
| **nepřesné znalosti** | – | bridge, poker, scrabble |

**Hra jako prohledávací problém:** počáteční stav (+ kdo je na tahu), přechodová funkce (tah → stav), ukončovací podmínka, **utilitární funkce** (číselné ohodnocení koncových stavů; třeba $+1/0/-1$).

**Minimax strom:** každý uzel je MAX nebo MIN, listy mají hodnoty z $\mathbb R\cup\{\pm\infty\}$.
$$\text{minimax}(n)=\begin{cases}\text{utility}(n)&n\text{ koncový}\\\max_{s\in\text{moves}(n)}\text{minimax}(s)&n\in\text{MAX}\\\min_{s\in\text{moves}(n)}\text{minimax}(s)&n\in\text{MIN}\end{cases}$$
Algoritmus: rekurzivní DFS, `MAX-VALUE` volá `MIN-VALUE` a naopak; MAX si pamatuje i *tah*, který hodnotu dal.

**Vlastnosti:** úplný jen pro konečné stromy; optimální **proti optimálnímu protivníkovi**; čas $O(b^m)$, prostor $O(bm)$. Šachy: $b\approx35$, $m\approx100$ ⇒ přesné řešení nejde. Při $b^m=10^6$ a $b=35$: $m\approx4$ půltahů (nováček), 8 (mistr / typické PC), 12 (Deep Blue).

**Časové omezení:** *cutoff* – ořezávací test (hloubka) nahradí koncový test a **ohodnocovací funkce** (odhad přínosu pozice) nahradí utilitu.

**AND/OR × minimax:** AND/OR graf zná jen výhra/prohra (list splněn/nesplněn); minimax umí **skóre**. Stav „já na tahu“ = MAX (≈ OR), „soupeř na tahu“ = MIN (≈ AND).

**Které hry jde modelovat minimax stromem (sbírka 4.1):**
- **Šachy:** ano, listy $-1/0/1$; konečný strom zaručuje pravidlo 50 tahů (bez tahu pěšce a braní končí remízou, tyto změny nelze vzít zpět). Strom je ale tak velký, že optimální hru neznáme, proto se používá minimax s hloubkovým limitem a ohodnocovací funkcí.
- **Sudoku:** formálně ano (samé MAX uzly, listy 1 pro platné vyplnění), ale není to hra dvou hráčů a minimax se nehodí.
- **Piškvorky na neomezené ploše:** ne, každá úroveň je nekonečně široká a existují nekonečné větve.
- **Kámen-nůžky-papír:** ne, hráči nestřídají tahy, ale volí **současně**, takže hráč nezná stav a strom nelze sestrojit.
- **Tenis:** ne, nekonečně mnoho možností (směrů míče) už v prvním patře.

**Vztahy a vlastnosti:**
- **Složitost** minimaxu je $O(V+E)$ (jde o DFS s konstantní prací v uzlu); každý uzel a hrana se navštíví jednou.
- **Minimax rozšiřuje AND/OR:** AND/OR strom je minimax strom, kde listy mají hodnotu 1 (splněný) nebo 0, AND ↔ MIN, OR ↔ MAX.
- **Střídání typů:** potomka stejného typu jako rodič lze smazat a jeho děti přivěsit k rodiči, takže lze polynomiálně převést strom na střídavý.
- **Podmínka volby tahu:** aby MAX volil levou větev (dvě MIN děti s listy $a,b$ vlevo, $c,d$ vpravo), musí platit $\min(a,b)\ge\min(c,d)$.
- **Nekonečné hry** (pronásledovatel × zloděj, hráči mohou donekonečna střídat pole): strom je nekonečný a minimax (DFS) by padl do nekonečné větve; řeší se omezením počtu kol (pro 3 kola vyjde kořen 2) nebo BFS s doménovou znalostí.

## Mini příklad

MAX → tři MIN uzly $a_1,a_2,a_3$ s listy $(3,12,8)$, $(2,4,6)$, $(14,5,2)$.
MIN: $\min(3,12,8)=3$, $\min(2,4,6)=2$, $\min(14,5,2)=2$.
MAX: $\max(3,2,2)=3$ ⇒ MAX zahraje $a_1$ (hodnota hry **3**).

Piškvorky: listy $+1$ (výhra MAX), $0$ (remíza), $-1$ (prohra). Pokud MAX = kolečka (hraje první), uzly „kolečka na tahu“ jsou MAX.

## Pozor

> - Minimax **předpokládá optimálního soupeře**; proti slabšímu hráči může existovat výhodnější tah.
> - Hodnotu kořene je třeba číst jako *zaručené minimum*, ne očekávání.
> - Minimax funguje jen pro hry, kde „co zvyšuje mé skóre, snižuje soupeřovo“ (nulový součet).
> - **MIN uzly** neznamenají „špatný hráč“ – jsou to uzly, kde je na tahu soupeř a minimalizuje *moje* skóre.
> - Je třeba hlídat, **čí je tah** v kořeni (kdo začíná) – typy uzlů se střídají podle hloubky.

## Praxe

Vyhodnoť minimax stromy a pochop vztah k AND/OR grafům.
