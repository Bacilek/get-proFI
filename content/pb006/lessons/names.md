## Intuice

**Jméno** zastupuje objekt, **vazba** je spojení jména s objektem a **rozsah** říká, kde je vazba platná. Většina chyb ze „nevím, která proměnná se tady myslí“ se dá vyřešit pravidlem: hledej deklaraci od nejvnitřnějšího bloku ven (statický rozsah).

## Vzorec

**Proměnná** = paměťová oblast + jméno + hodnota, k tomu **typ**, **doba života** a **rozsah**. C: proměnná je paměťová lokace (přiřazení mění hodnotu). Python: proměnná je jméno (přiřazení **přesměruje odkaz**).

**Vazba (binding).** Statická vazba vzniká před během a nemění se; dynamická vzniká/mění se za běhu. Okamžik vzniku: návrh jazyka, implementace jazyka, psaní programu, překlad, sestavení, nahrání, běh. **Dřívější vazba = efektivnější, pozdější = pružnější.**

**Aliasing:** více jmen se vazbou na **stejný objekt** (`b = a` u seznamů v Pythonu, ukazatele, předání odkazem). Zdroj chyb a komplikace pro překladač.

**Rozsah (scope):** (1) oblast programu, kde je vazba aktivní, (2) maximální oblast bez změny vazeb.

| | **statický (lexikální)** | **dynamický** |
|---|---|---|
| vazba závisí na | **struktuře kódu** | **pořadí volání** za běhu |
| určí se | při překladu | až za běhu |
| používají | C, C++, Python, Java, C# | Bash, Perl `local`, TeX, původní Lisp, Emacs Lisp |

**Vnořené rozsahy:** jméno je vidět v rozsahu, kde je deklarováno, i ve všech vnořených, pokud ho nezastíní (**shadowing**) deklarace stejného jména. Hledá se směrem **ven**. Implementace: každý rámec má **statický odkaz** na rámec lexikálně obklopující funkce.

**Python (LEGB):** Local, Enclosing, Global, Built-in. Rozsah zavádí modul, funkce (a třída). `global x` míří na globální rozsah, `nonlocal x` na nejbližší obklopující funkci.

**C a C#:** rozsah zavádí soubor, funkce (v C nelze vnořovat), blok `{ }`. **Deklarace musí předcházet použití.** V C# platí rozsah deklarace od **začátku bloku**, ale použití před deklarací je chyba. V C99/Java od místa deklarace.

**Deklarace vs definice:** deklarace zavede jméno (např. prototyp funkce, umožní vzájemnou rekurzi), definice dodá úplnou informaci včetně těla.

**JavaScript (varování):** `var` má funkční rozsah a **hoisting** (deklarace platí v celé funkci, inicializace ne, čtení před přiřazením dá `undefined`); `let` je blokový, před deklarací nesmí být použit (temporal dead zone); přiřazení do nedeklarované proměnné vytvoří **globální** (zakáže `"use strict"`).

**Doba života (lifetime):** doba vazby a doba života objektu se mohou lišit. C: **static** (celý běh), **automatic** (od začátku do konce bloku), **allocated** (`malloc`…`free`). Uložení: statická paměť, **zásobník** (volání funkcí), **halda** (kdykoli, dražší, fragmentace, **garbage collector**). Python: všechny objekty na haldě. C#: **reference types** na haldě, value types na zásobníku, objekt bez odkazu smí GC odstranit.

**Mutable vs immutable:** seznamy v Pythonu jsou mutable (`id` zůstává), čísla immutable (nová hodnota = nový objekt). V Haskellu je vše immutable.

## Mini příklad

```c
const int b = 5;
int foo() { int a = b + 5; return a; }
int bar() { int b = 2; return foo(); }
```

`foo()` vrací 10. **Statický** rozsah: `b` ve `foo` je globální 5, takže `bar()` vrátí 10. **Dynamický** rozsah: `foo` volané z `bar` vidí `b = 2` z volajícího, takže `bar()` vrátí 7.

Bash: `x=30; f1(){ echo "in f1: $x"; }; f2(){ local x=42; f1; }` → `f1` vypíše 30, `f2` vypíše **42**.

## Pozor

> - V C# je `int i; ... i = 1; int i;` v jednom bloku chyba: `i` je od začátku bloku lokální, použití před deklarací nejde.
> - Python: `c = 42; def foo(): print(c); c = 121` hodí **UnboundLocalError**, protože `c` je ve `foo` lokální (přiřazení se vyhodnotí při překladu funkce).
> - `[Node()] * 3` vytvoří **tři odkazy na tentýž objekt** (aliasing), změna přes jeden se projeví ve všech.
> - `static` lokální proměnná v C má vazbu jen v bloku, ale objekt žije celý běh programu.
> - Rozsah ≠ doba života. Blok ne vždy zavádí rozsah (Python: `if`/`for` nové rozsahy nezavádí).

## Praxe

Scope, vazby, aliasing, doba života. Predikce výstupu je častá zkouškovka.
