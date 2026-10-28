## Intuice

Konvexní funkce se „zatáčí doleva“ (graf je nad tečnami, tvar misky $\cup$), konkávní „doprava“ (graf pod tečnami, $\cap$). Inflexe je místo, kde se zatáčení přepne.

## Vzorec

**Definice.** $f$ s derivací na intervalu $I$ je *konvexní*, pokud je $f'$ neklesající, a *konkávní*, pokud je $f'$ nerostoucí.

**Druhá derivace:** $f''>0$ na $I$ ⇒ konvexní; $f''<0$ na $I$ ⇒ konkávní.

**Inflexní bod** $x_0$: $f$ je v levém okolí konvexní a v pravém konkávní (nebo naopak).
- Existuje-li $f''(x_0)$ a $x_0$ je inflexe, pak $f''(x_0)=0$.
- $f''(x_0)=0$ a $f''$ **mění znaménko** v $x_0$ ⇒ inflexe.
- $f''(x_0)=0$ a $f'''(x_0)\ne0$ ⇒ inflexe.

Postup: najdi nuly $f''$ (a body bez $f''$), vyšetři znaménko $f''$ na intervalech mezi nimi.

## Mini příklad

$f(x)=x^3-6x^2+9x$: $f''=6x-12=0\Rightarrow x=2$; $f''<0$ pro $x<2$ (konkávní), $>0$ pro $x>2$ (konvexní) ⇒ inflexe v $2$, $f(2)=2$.

$f(x)=e^{-x^2}$: $f''=(4x^2-2)e^{-x^2}$, nuly $x=\pm\frac1{\sqrt2}\approx\pm0{,}707$; mezi nimi je $f''<0$ (konkávní), mimo konvexní ⇒ dvě inflexe.

$f(x)=x+\sin x$ na $[0,4\pi]$: $f''=-\sin x$, inflexe v $\pi,2\pi,3\pi$ (v $0,4\pi$ jen krajní body).

## Pozor

> - $f''(x_0)=0$ **nestačí** na inflexi: $x^4$ má $f''(0)=0$, ale $f''=12x^2\ge0$ nemění znaménko ⇒ žádná inflexe.
> - Konvexní ≠ rostoucí. Konvexita je o $f'$, ne o $f$.
> - Pozor na terminologii: v textu $f''>0$ ⇒ „konvexní“ ($\cup$), $f''<0$ ⇒ „konkávní“ ($\cap$).
> - Lineární funkce je konvexní i konkávní zároveň.
> - Inflexní bod hledej i tam, kde $f''$ neexistuje (a $f$ je spojitá), ne jen mezi nulami $f''$.

## Praxe

Urči intervaly konvexnosti a konkávnosti a inflexní body.
