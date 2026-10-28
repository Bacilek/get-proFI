## Intuice

**Typ** = množina hodnot + operace nad nimi. Typový systém chytá chyby (`znak + struktura`), dokumentuje kód a dává operacím kontext. Zkouška se ptá hlavně na: jmenná × strukturální ekvivalence, implicitní × explicitní konverze, silné/slabé a statické/dynamické typování, value × reference typy a **unifikaci typů**.

## Vzorec

**Typový systém** = vestavěné typy + mechanismy pro nové typy + pravidla pro **rovnost**, **kompatibilitu** a **odvozování** typů.

**Primitivní** (bool, int, float, char) × **složené** (pole, záznamy, ...). String je složený v C (pole znaků zakončené 0), primitivní v Pythonu, třída v Javě/C#.

**Hodnotové typy** (proměnná obsahuje data): vše v C, v C# `int`, `bool`, `enum`, `struct`. **Odkazové typy** (proměnná obsahuje odkaz): vše v Pythonu, v C# `class`, `string`, `object`, interface, pole, delegát. V C# jsou i `int`, `bool`, `double` struktury.

**Čísla:** reálná dle IEEE 754 (`0.1` nejde přesně), **decimální** typy pro přesná čísla (C# `decimal`, literál `389.5m`, 128 b, 28-29 číslic). Python `int` je neomezený; C# `byte/short/int/long` přesně 1/2/4/8 B; C jen minimální velikosti. `bool`: C89 žádný, Python `bool` je podtyp `int`, C# `bool` bez konverzí. **Enum:** v C podtyp `int`, v C# nejde bez přetypování na číslo, `enum Color : long { Red, Blue = 42 }`.

**Klasifikace jazyků:** *silně* typované (nedovolí operaci na neurčeném typu) × *slabě*; *staticky* (kontrola při překladu) × *dynamicky* (za běhu).
- silně statické: Java, Haskell, C#
- silně dynamické: Python, Ruby
- slabě statické: C, C++
- slabě dynamické: Perl, PHP, JavaScript

**Typová rovnost:** *jmenná* (stejné jméno/deklarace: Pascal, Ada, Java, C#) × *strukturální* (stejná struktura: Algol, ML). C míchá: jmenná pro `struct/union/enum`, strukturální jinak (`typedef` je jen alias, `int[10]` ≠ `int[5]`). *Striktní* jmenná (`new` v Adě) dělá z aliasu nový typ, *volná* ho bere za stejný.

**Konverze:**
- *explicitní* (cast): programátor vynutí; různé reprezentace (int/float) = skutečná konverze, jinak „zadarmo“.
- *nekonvertující* (type punning, `union`): bity se jen přeinterpretují.
- *implicitní* (**koerce**): u kompatibilních typů, **oslabuje typový systém**. C má *integer promotions* (menší než `int` → `int`) a pravidla pro signed/unsigned. Python jen v aritmetice (int → float → complex). C# má dlouhou kapitolu ve standardu.

**Složené typy:** záznam/`struct` (C#: hodnotový typ), n-tice (C# `(double Sum, int Count) t`, hodnotový, mutable, porovnává se po složkách bez ohledu na jména), `union` (sdílená paměť, type-unsafe), *discriminated/tagged union* (Haskell `data IntFloat = IntValue Int | FloatValue Float`, pattern matching).

**Pole:** indexování od 0 (C a odvozené), kontrola mezí v moderních jazycích, **obdélníkové** `int[,] m = new int[4, 2]` × **schodovité (jagged)** `int[][]` (pole odkazů na řádky), uložení po řádcích (*row major*) × po sloupcích (Fortran).

**Seznamy:** buď prázdný, nebo hlava + zbytek. Haskell: `1 : (2 : [])`, `head`, `tail`, `++`, homogenní; Lisp: `cons` bloky (`car`, `cdr`), heterogenní. *List comprehension*: `[i*i | i <- [1..100], i `mod` 2 == 1]`, Python `[i*i for i in range(1,100) if i % 2 == 1]`.

**Typové odvozování (inference):** typy se dopočítají. C# `var i = 5;` (musí být inicializace), Python vše odvozuje. Postup: (1) každému podvýrazu nová typová proměnná, (2) typová pravidla dají **rovnosti**, (3) vyřeší se **unifikací**. Výsledek: jedno řešení, žádné (typová chyba), nebo více (**polymorfismus**, `id :: a -> a`). Algoritmus Hindley-Milner.

**Unifikace** typových výrazů (konstruktory `[T]`, `T1 -> T2`, n-tice; proměnné `a, b`):
- `Unify(T1, T2)`: jsou-li stejné, hotovo; je-li jeden proměnná, `UnifyVar`; stejné konstruktory → unifikuj složky; jinak selhání.
- `UnifyVar(v, T)`: má-li `v` vazbu, unifikuj ji s `T`; má-li vazbu `T` (proměnná), unifikuj `v` s ní; jinak **occurs check** (`v` se nesmí vyskytovat v `T`), pak `v := T`.
- Hledá se **nejobecnější unifikátor**: `[a] = [[b]]` → `a = [b]`, `b` volná.

**Ukazatele a odkazy:** ukazatel = adresa (+ `null`), dereference `*p`, `p->x`, aritmetika `*(p+i) == p[i]`, `void *`. **Visící ukazatel** (dangling): ukazuje na dealokované. **Ztracená proměnná** (lost): na haldě bez přístupu, *memory leak* (řešení: garbage collection). **Reference** (Java, C#, Python): bez aritmetiky, automatická dereference, často implementována ukazatelem.

**Nullable (C#):** `int? x = 42;`, `x.HasValue`, `x.Value`, výchozí `null`, do `int` nelze přiřadit přímo, nutno `int z = x ?? -1;`.

## Mini příklad

```c
int a = 5, b = 2;
float r  = a / b;           // 2.0   (celočíselné dělení, pak konverze)
float r1 = (float) a / b;   // 2.5   (cast se týká jen a)
float r2 = (float)(a / b);  // 2.0   (cast až na výsledek)
```

Unifikace: `[b] = [a]`, `a -> b = c`, `c -> Bool = (Bool -> Bool) -> Bool` → `b = a`, `c = a -> b`, z posledního `c = Bool -> Bool`, tedy `a = Bool`, `b = Bool`, `c = Bool -> Bool`.

Odvození typu: `add [] = 0; add (x:xs) = x + add xs` → `0 :: Int`, `+ :: Int -> Int -> Int`, argument je seznam, tedy `add :: [Int] -> Int`.

## Pozor

> - V C# není `string` hodnotový typ, je **odkazový a neměnný** (immutable); v C `char[]` je měnitelné.
> - `typedef` v C vytváří jen **alias**, `struct A` a `struct B` se stejnými položkami jsou různé typy (jmenná ekvivalence).
> - Koerce: `unsigned a = 1; int b = -2; a + b > 0` je v C **pravda** (b se převede na unsigned). U `unsigned short` je to nepravda (promotion na `int`).
> - `[a] = b -> b` nemá řešení (různé konstruktory), `[a] = b, [b] = a` nemá **konečné** řešení (occurs check).
> - `var` v C# není dynamický typ: typ je odvozen při překladu a už se nemění. Bez inicializace `var x;` nejde.
> - `bool` v Pythonu je podtyp `int` (`True + True == 2`), v C# ne.

## Praxe

Typy, konverze, unifikace a ukazatele. Bez spouštění kódu: čti a odvozuj.
