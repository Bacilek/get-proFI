## Intuice

Jazykový model říká, **jak pravděpodobné je další slovo vzhledem k předchozím**. N-gramový model zjednodušuje kontext na posledních $n-1$ slov a pravděpodobnosti **odhaduje z počtů v korpusu**. Kvalitu modelu měří **perplexita** (čím menší, tím lépe).

> Rozpracováno ze sbírky (kap. 12); slidy přednášky 12 zatím nejsou k dispozici – po jejich nahrání zkontrolovat (etika AI, generativní modely, transformery).

## Vzorec

**Jazykový model:** $P(w\mid w_1,\dots,w_{i-1})$. **Greedy generování:** $w_i=\arg\max_wP(w\mid w_1,\dots,w_{i-1})$ (deterministické).
**$n$-gramový model:** $P(w_i\mid w_1..w_{i-1})\approx P(w_i\mid w_{i-n+1}..w_{i-1})$. Pravděpodobnost věty: $P(W)\approx\prod_{i=1}^kP(w_i\mid w_{i-n+1..i-1})$; začátek věty se doplní speciálními symboly. $n=2$ bigram, $n=3$ trigram.
**Odhad z korpusu (bigram):** $P(w_n\mid w_{n-1})=\dfrac{C(w_{n-1}w_n)}{C(w_{n-1})}$ ($C$ = počet výskytů; `<s>` začátek, `</s>` konec věty).
**Perplexita** testovací sekvence $W=w_1\dots w_N$: $\text{perplexity}(L,W)=P(w_1,\dots,w_N)^{-1/N}=\sqrt[N]{\dfrac1{P(w_1,\dots,w_N)}}$; pro bigram $\sqrt[N]{\prod_i\dfrac1{P(w_i\mid w_{i-1})}}$. Model s vyšší pravděpodobností testovacího textu (nižší perplexitou) je lepší; normalizace délkou je nutná, protože delší text má menší pravděpodobnost.

**Etické aspekty moderní AI (sbírka 12.1, diskuzní příklady bez klíče):**
- **Zaujatost:** klasické i generativní modely kopírují **předsudky z trénovacích dat**; generativní je prohlubují.
- **Nové riziky generativních modelů:** **dezinformace** (např. klonování hlasu) a **autorská práva**. Služba na klonování hlasu proto potřebuje ověření souhlasu a toho, že nahrávka patří dané osobě. Otevřené otázky: porušují natrénované váhy modelu autorská práva a komu patří výstupy modelu natrénovaného na cizích dílech?
- **Opakování chyb z dat:** asistent trénovaný na veřejném kódu reprodukuje zastaralé knihovny a zranitelnosti (SQL injection), protože jsou ve vzorcích časté; model je třeba usměrnit (filtrace dat, učení s lidskou zpětnou vazbou, kontrola výstupu).
- **Optimalizace jediné metriky:** RL řízení semaforů minimalizující průměrnou dobu v zácpě může trvale zablokovat vedlejší ulice. Řešení: odměna zahrnující **spravedlnost** (např. omezení maximální čekací doby na ulici) vedle průměru.
- **Interpretovatelnost × přesnost:** průhledný model (90 %) × přesnější black box (95 %), např. v medicíně; jde o kompromis mezi důvěryhodností a výkonem.

**Markovův předpoklad a greedy generování (sbírka 12.2):** plná podmíněná pravděpodobnost $P(w\mid w_1,\dots,w_{i-1})$ je pro výpočet příliš složitá (potřebovala by obrovské množství dat), proto se předpokládá, že další slovo závisí jen na **několika posledních slovech** (n-gram). Greedy volba $\arg\max$ po krocích **nemusí** dát nejpravděpodobnější celou posloupnost: je-li $P(a\mid{<}s{>})=0{,}6$ s $P(x\mid a)=P(y\mid a)=0{,}5$ a $P(b\mid{<}s{>})=0{,}4$ s $P(x\mid b)=0{,}9$, greedy zvolí $a$ (výsledek $0{,}6\cdot0{,}5=0{,}3$), ale věta $b\,x$ má $0{,}36$. Příklad bigramu: $P(\text{pes})=0{,}4$, $P(\text{běží}\mid\text{pes})=0{,}3$ dává $P(\text{pes běží})=0{,}12$ a greedy po „pes“ vybere „štěká“ (0,5).

## Mini příklad

Bigramový model: $P(\text{pes})=0{,}4$, $P(\text{běží}\mid\text{pes})=0{,}3$, $P(\text{štěká}\mid\text{pes})=0{,}5$, $P(\text{spí}\mid\text{pes})=0{,}2$. $P(\text{pes běží})=0{,}4\cdot0{,}3=0{,}12$; v kontextu „pes“ greedy vygeneruje **štěká**.

Korpus: `<s> Pes je velký </s>`, `<s> Velký je pes </s>`, `<s> Pes obvykle nebývá fialový </s>`.
$P(\text{pes}\mid\text{<s>})=\frac23$, $P(\text{velký}\mid\text{<s>})=\frac13$, $P(\text{je}\mid\text{pes})=\frac13$, $P(\text{je}\mid\text{velký})=\frac12$, $P(\text{</s>}\mid\text{velký})=\frac12$ (velký je v korpusu 2×: jednou před `</s>`, jednou před „je“).
Perplexita: sekvence se čtyřmi kroky, každý s pravděpodobností 0,5: $P=0{,}5^4=0{,}0625$, perplexita $=(0{,}0625)^{-1/4}=2$ (jako by model při každém kroku volil z 2 stejně pravděpodobných slov).

## Pozor

> - Pravděpodobnost sekvence je **součin** podmíněných pravděpodobností, ne součet.
> - **Perplexita se zmenšuje**, když je model lepší (vyšší pravděpodobnost testu); ideální model = 1.
> - V odhadu se **dělí počtem kontextu** $C(w_{n-1})$, ne velikostí korpusu.
> - Greedy generování je deterministické – nemusí produkovat nejpravděpodobnější *větu* jako celek.
> - N-gramové modely **nepokryjí** nevídané n-gramy (pravděpodobnost 0) bez vyhlazování.

## Praxe

Spočítej pravděpodobnost věty, bigramové pravděpodobnosti z korpusu a perplexitu.
