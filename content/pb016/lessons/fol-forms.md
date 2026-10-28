## Intuice

Aby šlo v PL1 mechanicky odvozovat (rezoluce), musí být formule v **normální formě**: bez implikací a $\exists$, jen klauzule. K tomu potřebuješ rozumět **vázaným/volným proměnným**, **substituci** a **Skolemizaci** (existenční kvantifikátor nahradíš novou konstantou/funkcí).

## Vzorec

**Podformule** = souvislá část formule, která je sama formulí. **Výskyt** proměnné $x$ je **vázaný**, leží-li v dosahu kvantifikátoru $\forall x$/$\exists x$; jinak **volný**. Formule bez volných proměnných je **uzavřená (sentence)**. Příklad: v $\exists x\,((\forall y\,P(z))\Rightarrow R(x,y))$ je $x$ vázané, $y$ a $z$ jsou volné (kvantifikátor $\forall y$ se $y$ v $R(x,y)$ netýká).

**Substituce** $\sigma=\{x/t\}$ nahradí **volné** výskyty $x$ termem $t$; $S\sigma$ je výsledek. Term $t$ je **substituovatelný** za $x$, pokud nedojde ke **kolizi**: volné proměnné v $t$ se nesmí stát vázanými. $S=\exists x\,P(x,y)$: $S\{y/z\}$ ✓, $S\{y/f(z,z)\}$ ✓, $S\{y/f(x,x)\}$ ✗ (x by se zavázalo). Lék: přejmenovat vázanou proměnnou.

**Převod do CNF v PL1** (prenexová + Skolemova normální forma):
1. odstraň $\Rightarrow$ ($P\Rightarrow Q\to\neg P\vee Q$);
2. přesuň $\neg$ dovnitř ($\neg\forall x\,P\to\exists x\,\neg P$, $\neg\exists x\,P\to\forall x\,\neg P$, de Morgan);
3. **přejmenuj proměnné** (každý kvantifikátor vlastní proměnná);
4. přesuň kvantifikátory doleva (prenex);
5. **Skolemizace** – odstraň $\exists$:
   - $\exists x\,P(x)\to P(c_1)$ (nová konstanta),
   - $\forall x\,\exists y\,Q(x,y)\to\forall x\,Q(x,f(x))$ (nová funkce závislá na dříve vázaných $\forall$ proměnných);
6. zahoď $\forall$ (všechny zbylé proměnné jsou univerzální);
7. roznásob $\vee$ přes $\wedge$.
Výsledek: konjunkce klauzulí. *Ekvisplnitelné* (ne ekvivalentní) s původní formulí.

**Báze znalostí Wumpus v PL1:** vnímání $\forall v,tr,n,w,t\ \text{Percept}([\text{Zápach},v,tr,n,w],t)\Rightarrow\text{Je\_zápach}(t)$; reflex $\forall t\ \text{Máme\_zlato}(t)\Rightarrow\text{Action}(\text{Zvednutí},t)$ (s vnitřním stavem navíc $\wedge\neg\text{Držím}(\text{Zlato},t)$). Vlastnosti pozice: $\text{Na\_poli}(\text{Agent},x,t)\wedge\text{Je\_zápach}(t)\Rightarrow\text{Zapáchá}(x)$.
**Příčinné** pravidlo (z příčiny na následek): $\text{Jáma}(x)\wedge\text{Vedle}(x,y)\Rightarrow\text{S\_vánkem}(y)$. **Diagnostické** (z následku na příčinu): $\text{S\_vánkem}(y)\Rightarrow\exists x\,(\text{Jáma}(x)\wedge\text{Vedle}(x,y))$. Žádné samo není úplné ⇒ **ekvivalence** $\forall y\,\text{S\_vánkem}(y)\Leftrightarrow[\exists x\,\text{Jáma}(x)\wedge\text{Vedle}(x,y)]$.
`ask(KB,S)` vrací substituce $\sigma$ s $KB\models S\sigma$; situace se spojují funkcí $\text{Result}(a,s)$: odpověď $\{s/\text{Result}(\text{Zvednutí},\text{Result}(\text{Krok},S_0))\}$.

## Mini příklad

$\forall x\,\exists y\,\neg(P(x,y)\Rightarrow\forall z\,R(y))\vee\neg\exists x\,Q(x)$
- $\Rightarrow$: $\neg(\neg P\vee\forall z\,R(y))\vee\neg\exists x\,Q(x)$
- negace dovnitř: $(P(x,y)\wedge\exists z\,\neg R(y))\vee\forall x\,\neg Q(x)$
- přejmenuj: $\forall x_1\exists y\,[(P(x_1,y)\wedge\exists z\,\neg R(y))\vee\forall x_2\,\neg Q(x_2)]$
- prenex: $\forall x_1\exists y\exists z\forall x_2\,[(P(x_1,y)\wedge\neg R(y))\vee\neg Q(x_2)]$
- Skolem ($y\to f_1(x_1)$, $z$ se nevyskytuje v matici, $z\to f_2(x_1)$ nebo se vypustí): $\forall x_1\forall x_2\,[(P(x_1,f_1(x_1))\wedge\neg R(f_1(x_1)))\vee\neg Q(x_2)]$
- CNF: $(P(x_1,f_1(x_1))\vee\neg Q(x_2))\wedge(\neg R(f_1(x_1))\vee\neg Q(x_2))$.

Skolemizace: $\exists x\,\text{Král}(x)\to\text{Král}(c)$; $\forall x\,\exists y\,\text{Otec}(y,x)\to\forall x\,\text{Otec}(f(x),x)$.

## Pozor

> - Skolemova funkce závisí na **všech předchozích $\forall$**; samotná konstanta by ztratila obecnost ($\forall x\exists y\to$ konstanta $c$ je **špatně**).
> - **Přejmenuj proměnné před přesunem kvantifikátorů**, jinak je kolize.
> - Negace převrací kvantifikátor: $\neg\forall\to\exists\neg$, $\neg\exists\to\forall\neg$.
> - Skolemizace **neřeší ekvivalenci**, jen **ekvisplnitelnost** – pro rezoluci stačí.
> - Substituce nahrazuje jen **volné** výskyty a nesmí zavázat volné proměnné termu.

## Praxe

Najdi volné/vázané výskyty, rozhodni o substituci, proveď Skolemizaci a převod do CNF.
