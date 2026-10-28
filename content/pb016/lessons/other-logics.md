## Intuice

Klasická logika (výroková, PL1) je přesná a dvouhodnotová. V reálném světě jsou věci „spíš“ pravdivé („Brno je velké město“), nejisté, vázané na čas nebo na to, kdo co ví. Proto existují **další logiky** – a **znalostní inženýrství** říká, jak z logiky udělat použitelnou bázi znalostí.

## Vzorec

**Vlastnosti logik:** dvouhodnotová (true/false) × vícehodnotová; **extenzionální** (pravdivost závisí jen na pravdivosti složek) × **intenzionální** (i na okolnostech: čas, možný svět). Výroková a PL1 jsou dvouhodnotové extenzionální. PL1 je 1. řádu (kvantifikace objektů), logiky **vyšších řádů** (HOL) kvantifikují i predikáty/funkce: $\exists P\,\forall x\,(\text{člověk}(x)\Rightarrow P(x))$; větší expresivita, ale od 2. řádu neexistuje úplná inference.

| logika | idea | příklad |
|---|---|---|
| **fuzzy** | míra pravdivosti $\in[0,1]$, jazykové subjektivní hodnoty, příslušnost a pravidla | „Brno je velké město“ = 0,7; Praha 0,9 |
| **pravděpodobnost** | hodnoty zůstávají true/false, míra jistoty $\in[0,1]$ z frekvence (objektivní data, statistika) | „Občané ČR považují Brno za velké s pravd. 0,8“ |
| **modální** | operátory *nutně* $\Box\varphi$ a *možná* $\Diamond\varphi$; pravdivost ve vztahu k **možným světům**; zachycuje vědomosti, povinnosti, příčinu | $\Box\varphi\equiv\neg\Diamond\neg\varphi$ |
| **temporální** | čas jako parametr pravdivosti | „P. Pavel je prezident ČR“: 2026 true, 2020 false |
| **intenzionální** | extenze jako hodnoty *intenzí* ve světě a čase; rozlišení *de re*/*de dicto*, postojů | „Vím, že Petr věří, že Země je plochá“ |

**Fuzzy × pravděpodobnost:** fuzzy – *částečná pravdivost*, lingvistické hodnoty, stupně příslušnosti; pravděpodobnost – *náhodnost*, frekvenční data, matematické distribuce.

**Znalostní inženýrství (knowledge engineering):**
1. identifikuj otázky, na které má KB odpovídat;
2. shromáždi znalosti (*knowledge acquisition*);
3. urči slovník predikátů, funkcí a konstant (**ontologii**) – ovlivňuje efektivitu;
4. zakóduj obecné znalosti o doméně;
5. zakóduj popis instance problému;
6. polož dotazy inferenční proceduře a získej odpovědi;
7. ladit a evaluovat KB – lze odvodit nepravdivé / nelze odvodit pravdivé závěry?

**Využití logiky v UI:** strukturní ekvivalence (obvody, kódy), verifikace programů a důkazů, plánování a splňování podmínek, konzistenční diagnóza, rozhodování podle pravidel, neúplné/nejisté znalosti, strojové učení (indukce hypotéz, neuro-symbolické učení).

**Výhody a nevýhody:** výroková – deklarativní, umí částečné/disjunktivní/negované informace, kompoziční, kontextově nezávislá, ale málo expresivní; přirozený jazyk – expresivní, ale víceznačný a závislý na kontextu.

## Mini příklad

Modální: „Lidé jsou smrtelní, tedy neexistuje nesmrtelný člověk“: $(\forall x\,\text{člověk}(x)\Rightarrow\text{smrtelný}(x))\Rightarrow\neg\Diamond(\exists x\,\text{člověk}(x)\wedge\neg\text{smrtelný}(x))$.
Fuzzy pravidlo: „Když je rychlost *příliš pomalá*, přidej plyn“ (rychlost má stupně příslušnosti k množinám *pomalu/optimálně/rychle*).

## Pozor

> - **Fuzzy ≠ pravděpodobnost:** fuzzy říká, *jak moc* tvrzení platí (vágnost), pravděpodobnost *jak je jisté*, že platí.
> - Modální operátory se vyhodnocují vzhledem k **možným světům**, ne jen k jedné interpretaci.
> - HOL mají vysokou expresivitu, ale **není úplná inference** od 2. řádu.
> - Ontologie (výběr predikátů) rozhoduje o efektivitě KB; špatně zvolený slovník komplikuje celé odvozování.

## Praxe

Přiřaď logice správné vlastnosti a seřaď kroky znalostního inženýrství.
