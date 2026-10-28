## Intuice

Neuronová síť je několik vrstev perceptron-like jednotek. Výpočet jde po vrstvách od vstupu k výstupu (**dopředné šíření**), učení upravuje váhy **proti gradientu chyby** (**zpětné šíření chyby**). Nelineární aktivační funkce umožňují sítím víc než lineární dělení.

> Rozpracováno ze sbírky (kap. 11); slidy přednášky 10–11 zatím nejsou k dispozici – po jejich nahrání zkontrolovat (hluboké učení, konvoluční sítě).

## Vzorec

**Dopředná síť:** vstupní vrstva ($n$ vstupů), skryté vrstvy, výstupní vrstva ($m$ výstupů); vrstvy úplně propojené. Výpočet po vrstvách.
**Vnitřní potenciál** jednotky $i$: $\xi_i=-w_{0,i}+\sum_jw_{j,i}\,a_j$ ($w_{0,i}$ = prahová váha, $a_j$ výstupy předchozí vrstvy). **Výstup** $a_i=g_i(\xi_i)$, $g_i$ je aktivační funkce.

**Aktivační funkce:** prahová $f(x)=1$ pro $x\ge0$, jinak 0; **ReLU** $f(x)=\max(0,x)$; **sigmoida** $\sigma(x)=\dfrac1{1+e^{-x}}$ ($\sigma(0)=0{,}5$, hodnoty v $(0,1)$). **Aktivační funkce musí být nelineární** (kompozice lineárních by byla jedna lineární funkce); pro učení musí být derivovatelná (sigmoida, ReLU skoro všude).

**Učení (backpropagation):** trénovací dvojice $(\vec x,\vec y_{exp})$; **chybová funkce** $E(\vec y,\vec y_{exp})$ (např. kvadratická) s minimem při shodě výstupu a očekávání. Parciální derivace $\partial E/\partial w_i$ říká vliv váhy na chybu; **gradient** $\nabla E=(\partial E/\partial w_1,\dots)$ ukazuje směr nejrychlejšího **růstu** chyby ⇒ váhy upravujeme **opačným směrem**: $w\leftarrow w-\eta\,\nabla E$ ($\eta$ = rychlost učení).

**Softmax** pro klasifikaci do $n$ tříd: $\text{softmax}(x_1,\dots,x_n)=\Big(\dfrac{e^{x_i}}{\sum_je^{x_j}}\Big)_i$ – výstupy jsou kladné a **součet = 1** (pravděpodobnosti). Např. $\text{softmax}(1,2,3)\approx(0{,}090;\,0{,}245;\,0{,}665)$. Žádný výstup není přesně 0 (exponenciála je vždy kladná).

**Doplňky ze sbírky (kap. 11):**
- **Funkce z jednotek:** skládáním funkcí, násobením a přičítáním konstanty a sčítáním (přesně to dělá síť) lze z prahové funkce $P$ nebo ReLU $R$ vyjádřit další funkce, např. $f(x)=P(x)+P(1-x)-1$ (hodnota 1 na $[0,1]$, jinak 0) nebo $g(x)=1-R(x)-R(-x)$. Pomocí $K(a,b,c)(x)=c\,(P(x-a)-P(x-b))$ („schod“ výšky $c$ na $[a,b)$) lze sčítáním schodů aproximovat spojitou funkci na $[0,10]$ s libovolnou přesností (jemnější dělení = přesnější aproximace). Proto stačí jedna skrytá vrstva s dostatkem jednotek.
- **Zpětné šíření chyby (řetězové pravidlo):** pro síť $x_1\xrightarrow{w_1}n_1\xrightarrow{w_2}n_2$ s $a_i=g_i(\xi_i)$, $\xi_2=a_1w_2$, $\xi_1=w_1x_1$ je $\dfrac{\partial E}{\partial w_2}=\dfrac{\partial E}{\partial a_2}\,g_2^{\prime}(\xi_2)\,a_1$ a $\dfrac{\partial E}{\partial w_1}=\dfrac{\partial E}{\partial a_2}\,g_2^{\prime}(\xi_2)\,w_2\,g_1^{\prime}(\xi_1)\,x_1$. Proto má mít aktivační funkce **derivaci**.
- **Význam derivace:** $\partial E/\partial w_i=2$ znamená, že zvýšení $w_i$ o 1 zvýší chybu o ~2, váhu tedy snižujeme. Gradient $\nabla E$ míří ve směru nejrychlejšího růstu chyby. **Online algoritmus:** prochází trénovací příklady a pro každý nastaví $\vec w\leftarrow\vec w-\alpha\nabla E$, kde $\alpha>0$ je učicí konstanta (příliš velká přeskočí minimum, příliš malá učí pomalu).
- **Softmax odhadem:** s $e\approx3$ je $\text{softmax}(1,3,2)\approx(1,9,3)/13$, přesně $(0{,}090;0{,}665;0{,}245)$; $\text{softmax}(1,1,1)=(\tfrac13,\tfrac13,\tfrac13)$; $\text{softmax}(-5,0,0)\approx(0{,}003;0{,}498;0{,}498)$. Složka nikdy není přesně 0.

## Mini příklad

Jednotka 4 s výstupy $a_1=0{,}84$, $a_2=0{,}02$, váhami $w_{1,4}=-0{,}15$, $w_{2,4}=12{,}4$, prahem $w_{0,4}=3{,}8$ a sigmoidou:
$\xi_4=-3{,}8+(-0{,}15)(0{,}84)+12{,}4\cdot0{,}02=-3{,}8-0{,}126+0{,}248=-3{,}678$, $a_4=\sigma(-3{,}678)\approx0{,}025$ (jednotka je téměř neaktivní).

## Pozor

> - V definici vnitřního potenciálu se práh **odečítá**: $-w_{0,i}$ (jinak než u perceptronu s rozšířeným vektorem – sleduj značení zadání).
> - Gradient ukazuje směr **růstu** chyby; při učení se jde **proti** němu.
> - Bez nelineární aktivace by hluboká síť byla jen jeden lineární model.
> - Sigmoida nikdy nedosáhne přesně 0 ani 1; softmax nikdy nevrátí přesně 0.
> - Rychlost učení: příliš velká – přeskakuje minimum, příliš malá – učí se pomalu.

## Praxe

Spočítej výstup jednotky a softmax, odpověz na otázky o aktivačních funkcích a gradientu.
