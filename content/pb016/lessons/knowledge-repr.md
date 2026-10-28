## Intuice

Aby agent mohl s pojmy pracovat, musí je mít popsané: **ontologie** říká, jaké pojmy a vztahy existují, **sémantické sítě a rámce** je ukládají jako graf/strukturu s **dědičností** (podtřída → zdědí vlastnosti nadtřídy, s možností výjimky).

> Rozpracováno ze sbírky (kap. 8.1–8.2); slidy přednášky 8 zatím nejsou k dispozici – po jejich nahrání zkontrolovat.

## Vzorec

**Ontologie** = formální systém popisující svět (nebo jeho část) pomocí **pojmů, vztahů mezi pojmy a axiomů**; konkrétní znalosti se pak vyjadřují v tomto slovníku (v předmětu v predikátové logice).

**Sémantická síť:** graf; **uzly = pojmy**, **hrany = vztahy**. Nejdůležitější vztahy tvoří hierarchii: **instance** (konkrétní objekt – pojem) a **podtřída** (pojem – obecnější pojem); kreslí se **vertikálně**. Další vztahy: vlastnosti (*Barva(červená, beruška)*), část-celek (*Část(noha, kráva)*); kreslí se **horizontálně**. Vlastnosti se **dědí** podél instance/podtřída; konkrétnější uzel může dědictví **přepsat výjimkou**.

**Rámec (frame):** textová struktura se stejnou informací: **objekt** (pojem), **sloty** (vztahy), **hodnoty slotů** (pojmy ve vztahu). Slot s hvězdičkou `*` nese **vzorovou (default) hodnotu**, kterou lze při dědění přepsat. Objekty a hodnoty slotů ↔ uzly sítě, sloty ↔ hrany.

## Mini příklad

Síť: *ovoce* (chuť: sladká; do zmrzliny: ano); *rajče* je podtřída ovoce, s výjimkou *do zmrzliny: ne*; *maliny* jsou podtřída ovoce, *maliny v kuchyni* instance *malin* s barvou červená.
- Je rajče sladké? **Ano** (dědí z ovoce). Je vhodné do zmrzliny? **Ne** (výjimka přepisuje default).
- Maliny v kuchyni: instance malin, ovoce, červené, sladké, vhodné do zmrzliny.

Rámec:
```
ovoce:   *chuť: sladká   *do_zmrzliny: ano
rajče:   podtřída: ovoce   do_zmrzliny: ne
maliny:  podtřída: ovoce
maliny v kuchyni: instance: maliny   *barva: červená
```

## Pozor

> - **Vertikální vztahy** (instance, podtřída) tvoří dědičnost; ostatní jsou horizontální vlastnosti.
> - Hodnota ve **specifičtějším** uzlu přebíjí zděděnou (výjimka), jinak se zdědí z nejbližší nadtřídy.
> - Rámec a sémantická síť jsou ekvivalentní reprezentace (graf vs. text).
> - Rozlišuj **instanci** (objekt) a **podtřídu** (kategorie).

## Praxe

Odvoď vlastnosti z dědičnosti a výjimek.
