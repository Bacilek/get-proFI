## Intuice

Derivace je rychlost změny, takže se hodí na tečny a normály i na slovní úlohy o „rychlosti, s jakou se mění veličina“. Postup vždy stejný: pojmenuj veličiny jako funkce času, najdi rovnici, která je spojuje, **zderivuj ji podle $t$** a dosaď.

## Vzorec

**Tečna** ke grafu $f$ v $[x_0,f(x_0)]$: $\;y-f(x_0)=f'(x_0)(x-x_0)$.
**Normála:** $\;y-f(x_0)=-\dfrac1{f'(x_0)}(x-x_0)$ (pro $f'(x_0)\neq0$).

**Související rychlosti (slovní úlohy):**
1. Zvol proměnné (včetně jednotek) a zapiš, co je dáno a co se hledá (derivace podle času).
2. Najdi vztah mezi veličinami (objem válce $V=\pi r^2h$, Pythagoras $s^2=x^2+y^2$, podobnost trojúhelníků...).
3. Derivuj podle $t$ (složená funkce: $(s^2)'=2s\,s'$).
4. Dosaď hodnoty pro daný okamžik. **Znaménko:** veličina, která se zmenšuje, má zápornou derivaci.

## Mini příklad

**Tečna a normála:** $f(x)=x^4$, $x_0=1$: $f'(1)=4$, $f(1)=1$. Tečna $y=4x-3$, normála $y-1=-\frac14(x-1)$, tj. $y=-\frac14x+\frac54$.

**Hladina v nádrži:** válcová nádrž s poloměrem $r$, výtok $3\,\mathrm{m^3/min}$. Je $V=\pi r^2h$, tedy $V'=\pi r^2h'$ a $h'=\dfrac{V'}{\pi r^2}=-\dfrac3{\pi r^2}$ (m/min). Pro $r=1$ m klesá hladina rychlostí $\frac3\pi\approx0{,}95$ m/min.

**Policejní auto:** $s^2=x^2+y^2$, $\;s s'=xx'+yy'$. Pro $x=0{,}8$, $y=0{,}6$ ($s=1$), $s'=40$, $y'=-120$: $x'=\dfrac{ss'-yy'}{x}=\dfrac{40+72}{0{,}8}=140$ km/h.

## Pozor

> - Tečna a normála procházejí **bodem dotyku** $[x_0,f(x_0)]$ – spočítej si i $f(x_0)$, ne jen $f'(x_0)$.
> - **Dosazuj až po derivování.** Pokud dosadíš konkrétní hodnotu (např. $x=0{,}8$) před derivací podle $t$, veličina se „zafixuje“ a derivace se ztratí.
> - Veličiny, které **klesají** (vzdálenost auta ke křižovatce), mají zápornou derivaci; hledaná rychlost může vyjít záporná = pokles.
> - U slovních úloh hlídej jednotky ($\mathrm{l}\to\mathrm{m^3}$, min vs. s, cm vs. m).
> - Rychlost $v=s'$ je **se znaménkem**; velikost rychlosti je $|v|$.

## Praxe

Napiš rovnice tečen a normál a vyřeš související rychlosti.
