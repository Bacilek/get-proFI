## Intuice

Neuronová síť je několik vrstev perceptron-like jednotek. Výpočet jde po vrstvách od vstupu k výstupu (**dopředné šíření**), učení upravuje váhy **proti gradientu chyby** (**zpětné šíření chyby**). Nelineární aktivační funkce umožňují sítím víc než lineární dělení.

> Rozpracováno ze sbírky (kap. 11); slidy přednášky 10–11 zatím nejsou k dispozici – po jejich nahrání zkontrolovat (hluboké učení, konvoluční sítě).

## Vzorec

**Dopředná síť:** vstupní vrstva ($n$ vstupů), skryté vrstvy, výstupní vrstva ($m$ výstupů); vrstvy úplně propojené. Výpočet po vrstvách.
**Vnitřní potenciál** jednotky $i$: $\xi_i=-w_{0,i}+\sum_jw_{j,i}\,a_j$ ($w_{0,i}$ = prahová váha, $a_j$ výstupy předchozí vrstvy). **Výstup** $a_i=g_i(\xi_i)$, $g_i$ je aktivační funkce.

**Aktivační funkce:** prahová $f(x)=1$ pro $x\ge0$, jinak 0; **ReLU** $f(x)=\max(0,x)$; **sigmoida** $\sigma(x)=\dfrac1{1+e^{-x}}$ ($\sigma(0)=0{,}5$, hodnoty v $(0,1)$). **Aktivační funkce musí být nelineární** (kompozice lineárních by byla jedna lineární funkce); pro učení musí být derivovatelná (sigmoida, ReLU skoro všude).

**Učení (backpropagation):** trénovací dvojice $(\vec x,\vec y_{exp})$; **chybová funkce** $E(\vec y,\vec y_{exp})$ (např. kvadratická) s minimem při shodě výstupu a očekávání. Parciální derivace $\partial E/\partial w_i$ říká vliv váhy na chybu; **gradient** $\nabla E=(\partial E/\partial w_1,\dots)$ ukazuje směr nejrychlejšího **růstu** chyby ⇒ váhy upravujeme **opačným směrem**: $w\leftarrow w-\eta\,\nabla E$ ($\eta$ = rychlost učení).

**Softmax** pro klasifikaci do $n$ tříd: $\text{softmax}(x_1,\dots,x_n)=\Big(\dfrac{e^{x_i}}{\sum_je^{x_j}}\Big)_i$ – výstupy jsou kladné a **součet = 1** (pravděpodobnosti). Např. $\text{softmax}(1,2,3)\approx(0{,}090;\,0{,}245;\,0{,}665)$. Žádný výstup není přesně 0 (exponenciála je vždy kladná).

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
