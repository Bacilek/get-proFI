## Intuice

Minimax často vyhodnocuje větve, které už **nemohou ovlivnit výsledek**. Alfa-beta si pamatuje, co už je zaručeno oběma hráčům, a takové větve **neprozkoumá (odřízne)**. Výsledek kořene je stejný jako u minimaxu, jen rychleji.

## Vzorec

- $\alpha$ – doposud **nejlepší (nejvyšší) hodnota zaručená pro MAX** na cestě ke kořeni,
- $\beta$ – doposud **nejlepší (nejnižší) hodnota zaručená pro MIN**,
- počáteční okno $\langle\alpha,\beta\rangle=\langle-\infty,+\infty\rangle$.

```
MAX-VALUE(state, α, β):                MIN-VALUE(state, α, β):
  if terminal: return utility            if terminal: return utility
  v = -∞                                 v = +∞
  for child in moves(state):             for child in moves(state):
     v = max(v, MIN-VALUE(child,α,β))       v = min(v, MAX-VALUE(child,α,β))
     if v ≥ β: break      # řez β           if v ≤ α: break      # řez α
     α = max(α, v)                           β = min(β, v)
  return v                               return v
```
Pravidlo řezu: ukonči prohledávání následníků, jakmile **$\beta\le\alpha$** (resp. $v\ge\beta$ v MAX, $v\le\alpha$ v MIN).

**Vlastnosti:** výsledek **kořene = minimax** (prořezávání ho neovlivní; hodnoty vnitřních uzlů se mohou lišit – jen odhad ≤/≥). Efektivita závisí na **uspořádání tahů**: v nejlepším případě $O(b^{m/2})$ ⇒ lze prohledat **dvojnásobnou hloubku** (šachy: hloubka 8 je běžně dosažitelná). V nejhorším případě $O(b^m)$.

**Vylepšení:** prohledávání do klidných stavů (*quiescence search*), efekt horizontu (zvraty za hranicí hloubky), dopředné ořezávání (heuristické zahazování stavů).

## Mini příklad

Strom z minimaxu: $a_1:(3,12,8)$, $a_2:(2,4,6)$, $a_3:(14,5,2)$, kořen MAX.
- $a_1$: všechny listy → hodnota 3, $\alpha=3$.
- $a_2$: první list 2 ≤ $\alpha=3$ ⇒ **řez** (4 a 6 se neprohledají).
- $a_3$: 14, 5 (β = 5 > α), 2 ≤ α ⇒ hodnota ≤ 2.
Kořen = 3. Navštívené listy: $3,12,8,2,14,5,2$ (7 z 9).

Hlubší strom: MAX → $A$ (MIN) → $A_1$ (MAX: 3, 5), $A_2$ (MAX: 6, 9); $B$ (MIN) → $B_1$ (MAX: 1, 2), $B_2$ (MAX: 0, −1).
Navštíveno: $3,5,6,1,2$ (odříznuto $9,0,-1$). $A_2$: list 6 ≥ $\beta=5$ ⇒ řez; $B$: po $B_1=2\le\alpha=5$ ⇒ celý $B_2$ se přeskočí. Kořen = 5.

## Pozor

> - Řez v MIN uzlu je podle **$\alpha$** (MAX má už něco lepšího), řez v MAX uzlu podle **$\beta$**. Neplést.
> - Alfa-beta **nemění** hodnotu kořene, ale vnitřní uzly mohou mít jen odhad ($\le$ / $\ge$).
> - Úspora závisí na pořadí tahů – nejlepší tahy zkoušej první.
> - Při prořezávání se $\alpha$, $\beta$ **předávají dolů** a aktualizují jen „vlastním“ hráčem: MAX zvyšuje $\alpha$, MIN snižuje $\beta$.

## Praxe

Projdi alfa-beta ručně, urči odříznuté listy a výslednou hodnotu.
