## Intuice

UI není jedna věc, ale čtyři pohledy: systém, který **se chová jako člověk**, **myslí jako člověk**, **myslí rozumně** a **chová se rozumně**. PB016 se hlavně točí kolem posledního – **inteligentního agenta**, který něco řeší.

## Vzorec

**Čtyři přístupy k UI**

| | jako člověk | rozumně (ideálně) |
|---|---|---|
| **myšlení** | kognitivní věda (neurologie…) | logika (od Aristotela) |
| **chování** | **Turingův test** | **inteligentní agent** |

**Turingův test (1950).** Hra **tří** hráčů: testovaný stroj (A), člověk (B), rozhodčí (C). Rozhodčí komunikuje s A i B jen textem a má poznat, kdo je stroj. Stroj uspěl, pokud ho rozhodčí spolehlivě nerozezná od člověka.

Ke složení je potřeba: **zpracování přirozeného jazyka** (NLP), **reprezentace znalostí**, **vyvozování znalostí** (reasoning), **strojové učení**. Nepotřebuje se (jen textová komunikace): počítačové vidění, robotika (ty patří do *totálního* Turingova testu).

**Inteligentní agent** – systém, který jedná *za nějakým účelem*, *samostatně*, na základě *vstupů z prostředí*, *delší dobu* a *adaptuje se* na změny.

**Racionální agent a prostředí.** Agent je **racionální**, když volí akci maximalizující *očekávanou* míru výkonnosti (performance measure) vzhledem k dosavadním pozorováním. Racionální neznamená vševědoucí ani neomylný: špatný výsledek způsobený nepředvídatelnou okolností racionalitu nevyvrací. Prostředí se popisuje vlastnostmi: *plně × částečně pozorovatelné*, *deterministické × stochastické* (následující stav je plně určen stavem a akcí), *statické × dynamické*, *diskrétní × spojité*, *jeden × více agentů* (soupeř = další agent).

**Diskuzní pojmy ze sbírky (1.1):**
- **Argument čínského pokoje** (Searle): člověk bez znalosti čínštiny podle knihy pravidel skládá symboly a navenek odpovídá jako rodilý mluvčí, přesto nerozumí. Tvrdí, že správné chování ještě neznamená „mysl“ či porozumění. Vyvrácení argumentu ale automaticky *neznamená*, že vhodně naprogramované počítače mentální stavy mají.
- **Turingův seznam „stroj nikdy nebude…“** (humor, učit se ze zkušenosti, dělat chyby, zamilovat se, vychutnat si jahody se šlehačkou…): učení, chyby i používání správných slov už stroje zvládají, problematické jsou body vyžadující *vědomé mentální stavy*.
- **Evansův program** řeší geometrické analogie. I kdyby v IQ testu dosáhl 200, nebyl by inteligentnější než člověk: IQ test měří úzký výsek schopností a program řeší jen úlohu, pro kterou byl navržen.

**Co UI zahrnuje (EU AI Act, příloha I):** strojové učení (učení s/bez učitele, posilované, hluboké), logické a znalostní přístupy (reprezentace znalostí, expertní systémy, symbolické odvozování), statistické přístupy, Bayes, **prohledávání a optimalizace**.

**Struktura předmětu:** A) řešení problémů (přednášky 1–4: prohledávání, dekompozice/CSP, hry), B) logika (5–8: výrokovka, PL1, inference, reprezentace znalostí), C) aplikace (9–12: NLP, učení a rozhodovací stromy/neurony, hluboké učení, generativní modely).

## Mini příklad

Loebnerova cena (1991–2019): $25\,000$ \$ za složení základního a $100\,000$ \$ za pokročilý Turingův test – **nikdy nebyla vyplacena**. Proto se dnes hledají nové testy (ARC – abstraction and reasoning corpus, měří schopnost generalizace; směr k AGI).

## Pozor

> - V Turingově testu jsou **tři** účastníci (stroj, člověk, rozhodčí) – ne „dva hráči“. Rozhodčí je *třetí osoba*, ne jeden z testovaných.
> - Test **nevyžaduje** vidění ani robotiku – komunikace je jen textová.
> - „Myslí jako člověk“ (kognitivní věda) ≠ „chová se jako člověk“ (Turing) ≠ „jedná rozumně“ (agent). Letadlo také neletí jako pták.

## Praxe

Ověř si základní pojmy z první přednášky a sbírky (typická témata odpovědníku 1).
