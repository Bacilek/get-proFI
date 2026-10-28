## Intuice

Gramatika je **předpis, jak z jednoho symbolu S odvodit všechny platné věty jazyka**. Bezkontextové gramatiky (CFG) popisují stavbu věty ze **jmenné a slovesné fráze** a dávají **syntaktický strom**. Gramatiku hodnotíš tím, kolik správných vět pokryje a kolik špatných vygeneruje.

> Rozpracováno ze sbírky (kap. 9); slidy přednášky 9 (NLP) zatím nejsou k dispozici – po jejich nahrání zkontrolovat (včetně předzpracování dat).

## Vzorec

**Bezkontextová gramatika:** množina **terminálů** (slova), množina **neterminálů** (syntaktické kategorie), kořen $S$ (celá věta), pravidla **neterminál → řetězec**. Zápis: $S\to ab\mid cac$ je zkratka pro dvě pravidla. Pravidla se dělí na **pravidla** mezi kategoriemi a **lexikon** (slova příslušející kategoriím).

Jazyk $L(G)$ = množina vět tvořených terminály, odvoditelných z $S$. Odvození věty = **syntaktický strom** (kořen $S$, listy slova).

**Kvalita gramatiky $G$ vůči zamýšlenému jazyku $L$:**
$$\text{pokrytí}=\frac{|L\cap L(G)|}{|L|},\qquad \text{přesnost}=\frac{|L\cap L(G)|}{|L(G)|}.$$
Pokrytí = podíl vět jazyka, které gramatika vygeneruje. Přesnost = podíl vygenerovaných vět, které do jazyka patří. Cíl: obojí co nejvyšší.

## Mini příklad

$S\to NP\,VP$, $NP\to Noun\mid Adj\,NP$, $VP\to Verb$; Noun → dítě | člověk | kapsa; Adj → starý | cestující | nové; Verb → píše | sedí | mluví.
- „cestující sedí“ – **nelze** (chybí podstatné jméno; NP musí končit Noun).
- „nové nové kapsa píše“ – **lze** (NP → Adj NP → Adj Adj NP → … Noun), ale v češtině je špatně (neshoda v rodě: kapsa ž., nové s.) ⇒ gramatika **přegeneruje** (nízká přesnost).
- „starý člověk mluví“ – lze: $S\Rightarrow NP\,VP\Rightarrow Adj\,NP\,VP\Rightarrow$ starý $Noun\,VP\Rightarrow$ starý člověk $Verb\Rightarrow$ starý člověk mluví.

## Pozor

> - Gramatika může **nepokrýt** věty jazyka (věta 1) i **generovat** věty, které do jazyka nepatří (věta 2).
> - **Pokrytí** se dělí velikostí $L$, **přesnost** velikostí $L(G)$ – nezaměňovat.
> - Velká a malá písmena (neterminály) vs. slova (terminály) – konvence: neterminály s velkým písmenem.
> - Syntaktický strom má v kořeni $S$ a v listech terminály; jedna věta může mít víc stromů (víceznačnost).

## Praxe

Rozhodni, zda gramatika větu vygeneruje, a spočítej pokrytí a přesnost.
