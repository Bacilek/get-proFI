## Intuice

V predikátové logice nejde rezolvovat, dokud klauzule „nemluví o stejném objektu“: $P(y)$ a $\neg P(f(c))$ se musí **sjednotit** (unifikovat) substitucí $y/f(c)$. Rezoluce v PL1 = rezoluce výroková + **unifikace**. Klauzule jsou ve Skolemově normální formě, $\forall$ se vynechává.

> Zdroj: sbírka (kap. 7.3) – slidy přednášky 7 zatím nejsou k dispozici.

## Vzorec

**Substituce** $\Phi=\{x_1/t_1,\dots,x_n/t_n\}$ (různé proměnné, termy); všechny $t_i$ proměnné ⇒ **přejmenování**. $S\Phi$ = současně nahradit každý výskyt každé $x_i$ termem $t_i$. Např. $\{P(x,y),\neg Q(y,f(x))\}\{x/c,y/b\}=\{P(c,b),\neg Q(b,f(c))\}$. Substituce se aplikuje **současně**: $\{P(x),Q(y)\}\{x/y,y/x\}=\{P(y),Q(x)\}$.

**Unifikátor** množiny literálů $S$: substituce $\Phi$ s $|S\Phi|=1$ (všechny literály splynou). Existuje-li, je $S$ **unifikovatelná**. Hledáme **nejobecnější unifikátor** (mgu).
Postup: porovnej termy zleva; proměnná ↔ term ⇒ substituce (**occurs check**: proměnná se nesmí vyskytovat v termu, kterým ji nahrazuješ); různé konstanty/funkční symboly ⇒ **neunifikovatelné**; stejná funkce ⇒ unifikuj argumenty.

**Rezoluční pravidlo v PL1:** klauzule $\{P(\vec t_1),\dots,P(\vec t_r),L_1,\dots,L_n\}$ a $\{\neg P(\vec t'_1),\dots,\neg P(\vec t'_s),L'_1,\dots,L'_m\}$ **bez společných proměnných** (jinak je přejmenuj!) a $\Phi$ unifikátor množiny všech $P(\vec t_i),P(\vec t'_j)$. Rezolventa: $\{L_1,\dots,L_n,L'_1,\dots,L'_m\}\Phi$. Hrany rezolučního stromu se popisují použitou substitucí.

**Postup důkazu (úlohy z cvičení):**
1. formalizuj předpoklady a závěr v PL1, urči význam predikátů,
2. Skolemizuj a převeď na klauzule (viz lekce o normálních formách PL1),
3. přidej **negaci závěru** (negace $\forall$ → $\exists$ ⇒ Skolemova **konstanta**),
4. rezolvuj do □ (nebo přímo odvoď závěr).

## Mini příklad

Draci: „Existuje drak“ $\{D(a)\}$; „Draci spí nebo loví“ $\{\neg D(x),S(x),L(x)\}$; „Když mají draci hlad, nespí“ $\{\neg D(x),\neg H(x),\neg S(x)\}$. Závěr „Když má drak hlad, loví“: $\forall x\,(D(x)\wedge H(x)\Rightarrow L(x))$; jeho negace $\exists x\,(D\wedge H\wedge\neg L)$ ⇒ $\{D(b)\},\{H(b)\},\{\neg L(b)\}$.
Vyvrácení: $\{\neg D(x),S(x),L(x)\}+\{\neg L(b)\}\ (x/b)\to\{\neg D(b),S(b)\}$; $\{\neg D(x),\neg H(x),\neg S(x)\}+\{H(b)\}\ (x/b)\to\{\neg D(b),\neg S(b)\}$; tyto dvě $\to\{\neg D(b)\}$; $+\{D(b)\}\to\square$.

Unifikace: $\{Q(x,x),Q(y,c)\}$: $\{x/c,y/c\}$. $\{P(z,f(z)),P(f(x),f(f(c)))\}$: $\{z/f(c),x/c\}$. $\{P(x),Q(y)\}$: neunifikovatelné (různé predikáty). $\{P(z,f(z)),P(f(x),f(c))\}$: neunifikovatelné ($z=f(x)$, $f(z)=f(c)\Rightarrow z=c\Rightarrow f(x)=c$ – spor).
Rezolventa $\{P(x),\neg Q(x)\}$ a $\{Q(c)\}$: $\{P(c)\}$, $\Phi=\{x/c\}$.

## Pozor

> - **Před rezolucí přejmenuj** proměnné tak, aby klauzule neměly společné proměnné (např. $x\to x_1$).
> - Substituce $\{x/f(x)\}$ je cyklická – **occurs check** ji zakazuje (např. $\{P(x),P(f(x))\}$ není unifikovatelná).
> - **Unifikuje se celá množina literálů** použitých v kroku; pak se rezolventa vždy aplikuje substitucí na **celou** rezolventu (i na zbylé literály).
> - Nejde unifikovat různé predikátové symboly ani různé konstanty ($c\neq d$).
> - Skolemizace negace závěru dává **konstantu**, závěr s $\forall$ zůstane s proměnnou (viz předchozí lekce).

## Praxe

Unifikuj, hledej rezolventy a proveď rezoluční důkaz.
