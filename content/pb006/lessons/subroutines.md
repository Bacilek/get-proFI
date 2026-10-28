## Intuice

Podprogram **abstrahuje řízení** (příkaz volá celý výpočet) a hlavně rozhoduje, **jak se komunikuje**: jak se parametry předávají (kopie, odkaz, sdílení, jméno), co to dělá s aliasy a vedlejšími efekty, a jak psát jednu funkci pro víc typů (přetěžování, generika). Na zkoušce jsou typické „co vypíše při předání X“ a psaní generických metod s `ref/out/params`.

## Vzorec

**Pojmy:** *hlavička* (typ, jméno, parametry), *profil parametrů* (počet, pořadí, typy), *protokol* = profil + návratový typ. **Formální** parametry (v definici) × **aktuální** (argumenty při volání). Jediný vstupní bod (výjimka: koprogramy), volající je po dobu běhu pozastaven. Procedura = nový příkaz, funkce = výraz s hodnotou.

**Vazba parametrů:** poziční × pojmenované (`attack(weapon = w, force = f)`; poziční musí být první). **Implicitní hodnoty** (`def pay(income, ex=1, rate=0.20)`): v C# a C++ až na konci. **Proměnný počet:** C `...` (`va_list`), C# `params int[] list` (poslední, stejný typ).

**Sémantické modely:** *in*, *out*, *in-out*. Mechanismy:

| mechanismus | model | co se děje | jazyky |
|---|---|---|---|
| **hodnotou** (by value) | in | kopie hodnoty | C, Java/C# value types |
| **odkazem** (by reference) | in-out | formální = alias aktuálního | C++ `&`, Pascal `var`, C# `ref`, `in`, `out` |
| **výsledkem** (by result) | out | hodnota se při návratu zkopíruje do aktuálního | Ada `out`, C# `out` |
| **hodnotou-výsledkem** | in-out | kopie tam i zpět | Ada `in out`, Swift |
| **jménem** (by name) | in-out | textová náhrada (Algol 60), makra v C; Haskell: call-by-need | |
| **sdílením** (by sharing) | | předá se odkaz na objekt: lze měnit stav, **nelze přesměrovat** původní proměnnou | Java/C# (reference types), Python, Lisp |

**C** předává vždy hodnotou; odkaz se simuluje ukazatelem (`swap(&a, &b)`), pole se předává jako ukazatel. **C#**: výchozí je hodnotou (value types) a sdílením (reference types), obojí se mu říká *call by value*; `ref`/`out`/`in` se píší u formálního **i** aktuálního parametru; `in` je read-only (modifikovat nelze přiřazením, ale lze měnit položky objektu), `ref` musí být inicializován, `out` musí být v metodě přiřazen.

**Aliasy a kolize při odkazu:** `foo(a, a)`, `foo(a[i], a[j])` při `i = j`, `bar(a, a[i])`. U `out` v C#: `Foo(out a, out a)` s `x = 1; y = 2;` dá `a == 2` (pořadí zleva). `Bar(ref j, out list[j])` s `j = 1`: index `list[j]` se vyhodnotí v okamžiku **volání**, mění se `list[1]`.

**Read-only:** C# `in`; C `const T *p` (nelze měnit obsah), `T *const p` (nelze přiřadit do `p`), `const T *const p` (obojí). Typová kontrola parametrů je dnes vždy (Perl, JS, PHP výjimky); vícerozměrné pole v C: `void fun(int m[][10])` (musí znát sloupce).

**Přetěžování (overloading):** stejné jméno, **různý profil** (návratový typ nestačí). Staticky typované jazyky (C++, Java, C#, Ada); v Pythonu ne (platí poslední definice). Problémy: koerce (víc shod), implicitní hodnoty.

**Polymorfismus:** *ad hoc* (přetížení), *parametrický* (jedna implementace pro libovolný typ: Haskell implicitně, C#/Java/C++/Ada explicitně generiky), *podtypový* (OOP: proměnná typu `T` drží objekt podtřídy). **Duck typing** (Python): „chodí jako kachna“, kontrola za běhu (`AttributeError`).

**Generika:** C++ `template <class T>` (kód pro každý typ zvlášť), Java `<T extends Comparable<T>>` (jedna kopie, jen třídy), C# `static void Sort<T>(T[] a) where T : IComparable` (i primitiva, specializovaný kód); typ se odvodí z argumentů (`Foo(17)` volá `Foo<int>`).

**Koprogramy:** více vstupních bodů, **pamatují si stav** mezi aktivacemi, jeden běží v daný okamžik, předávají řízení `resume`. Simula, Modula-2, moderně Ruby (fibers), Lua, Go, Kotlin; **generátor** (`yield`) je jejich zjednodušená forma.

## Mini příklad

```
x := 2;  procedure foo(y) { y := 3; print x };  foo(x); print x
```

hodnotou: vypíše `2 2`; odkazem: `3 3`.

```csharp
static void F(int[] a) { a[0] = 9; a = new int[] { 7 }; }
var arr = new[] { 1, 2 };
F(arr);
Console.WriteLine(arr[0]);   // 9: stav se změnil, ale proměnná arr nebyla přesměrována
```

S `ref`: `static void F(ref int[] a)` a `F(ref arr)` by vypsalo **7**.

## Pozor

> - Sdílení ≠ odkaz: v metodě lze změnit **obsah** objektu, ale přiřazení `a = new ...` se ven **nepromítne** (bez `ref`).
> - `out` parametr se **musí** v metodě přiřadit na všech cestách a před přiřazením se nesmí číst; aktuální parametr musí být proměnná, ne konstanta.
> - Přetížit jen podle návratového typu nejde. V Pythonu přepíše druhá definice první.
> - `params` musí být **poslední** parametr.
> - `const int *p` × `int *const p` × `const int *const p`: čti zprava doleva.
> - Generická metoda s `a > b` nepřeloží (`T` nemá operátor): potřebuje omezení `where T : IComparable<T>`.

## Praxe

Předávání parametrů, přetěžování, generika, koprogramy.
