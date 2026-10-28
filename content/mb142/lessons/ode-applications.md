## Intuice

Tři typické slovní úlohy vedou na lineární DR 1. řádu: **rozpad** (rychlost změny je úměrná množství), **ochlazování** (úměrná rozdílu teplot) a **mísení roztoku** (přítok − odtok). Postup je pokaždé stejný: sestavit rovnici ze slovního popisu, vyřešit, z dat určit konstanty.

## Vzorec

**Radioaktivní rozpad:** $Q'=-rQ$ ($r>0$), $Q(t)=Q_0e^{-rt}$. Poločas $T_{1/2}$: $Q_0/2=Q_0e^{-rT_{1/2}}\Rightarrow r=\dfrac{\ln2}{T_{1/2}}$.

**Newtonův zákon ochlazování:** $\Theta'=-k(\Theta-T)$, $k>0$, $T$ = teplota okolí. Řešení
$$\Theta(t)=T+Ce^{-kt},\quad C=\Theta(0)-T.$$
(Je-li $\Theta<T$, těleso se ohřívá, je-li $\Theta>T$, ochlazuje.)

**Mísení roztoku:** nádrž o objemu $L$, přítok roztoku o koncentraci $c$ rychlostí $v$, odtok (promíchané směsi) stejnou rychlostí $v$:
$$Q'=\underbrace{c\,v}_{\text{přítok soli}}-\underbrace{\frac{Q}{L}\,v}_{\text{odtok soli}},\qquad Q(t)=cL+(Q_0-cL)\,e^{-\frac vL(t-t_0)},\quad Q\to cL.$$
**Odtok pomalejší** ($w<v$): objem roste, $L(t)=L+(v-w)(t-t_0)$ a
$$Q'=cv-\frac{Q}{L+(v-w)(t-t_0)}\,w,$$
což je opět lineární rovnice (integrační faktor je mocnina lineárního výrazu).

## Mini příklad

**Rozpad:** Ra-226, $T_{1/2}=1620$ let, kdy zbude $\frac34$? $r=\frac{\ln2}{1620}$, $\frac34=e^{-rt}\Rightarrow t=\frac{\ln(4/3)}{r}=1620\cdot\frac{\ln(4/3)}{\ln2}\approx672{,}4$ let.

**Ochlazování:** tělo $26{,}6\,^\circ$C, za 3 h $21{,}1\,^\circ$C, okolí $18{,}3\,^\circ$C. $\Theta=18{,}3+8{,}3e^{-kt}$, z $e^{-3k}=\frac{2{,}8}{8{,}3}$ je $k\approx0{,}362$. Čas smrti: $\Theta=37\Rightarrow e^{-kt}=\frac{18{,}7}{8{,}3}\Rightarrow t\approx-2{,}24$ h, tedy smrt ≈ 2 h 15 min před nalezením.

**Mísení:** $L=1000$ l, $c=50$ g/l, $v=20$ l/min, $Q_0=0$: $Q'=1000-0{,}02Q$, $Q(t)=50\,000\,(1-e^{-0{,}02t})$, $Q\to50\,000$ g (koncentrace $50$ g/l).

## Pozor

> - **Jednotky času** musí být konzistentní (roky/hodiny/minuty) – $r$ a $k$ mají jednotku $1/\text{čas}$.
> - Poločas dává $r$ z $\frac12=e^{-rT_{1/2}}$, tedy $r=\frac{\ln 2}{T_{1/2}}$. Podíl zbývajícího množství $p$ (např. $\frac34$) dává čas $t=-\frac{\ln p}{r}$.
> - U ochlazování **dva neznámé parametry** ($C$, $k$) = dvě podmínky; $C$ plyne z počáteční teploty, $k$ z druhého měření.
> - U mísení pozor, zda se **mění objem** (různé rychlosti přítoku a odtoku): koncentrace v odtoku je $Q/L(t)$, ne $Q/L$.
> - Záporný čas ve výsledku znamená „před počátkem měření“ (smrt před nalezením).

## Praxe

Sestav rovnici ze slovní úlohy, vyřeš ji a dopočti konstanty z dat.
