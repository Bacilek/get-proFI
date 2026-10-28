## Intuice

Předmět nehledá „nejlepší jazyk“, ale učí **rozebrat jakýkoli jazyk na koncepty** (jména, typy, tok řízení, podprogramy, OOP, výjimky), aby ses nový jazyk naučil rychle a uměl říct, k čemu se hodí. Programuje se v **C#** (příklady i Python a C).

## Vzorec

**Co charakterizuje jazyk:**

| | otázka | kde se učí |
|---|---|---|
| **syntaxe** | jak vypadají správně utvořené programy | překladače, formální jazyky |
| **sémantika** | co programy znamenají, jak se chovají | sémantiky PJ |
| **pragmatika** | jak konstrukce použít v praxi | **tento předmět** |

**Co by měl splňovat dobrý jazyk:** čitelný (syntax, jména), snadný k naučení (**ortogonalita**: málo základních konceptů, které se spolehlivě a bez výjimek kombinují), přenositelný, abstraktní (skrývá detaily řídících a datových struktur), efektivní.

**Kostra C# programu:**

```csharp
using System;
class Program
{
    static int Main(string[] args)
    {
        if (args.Length == 0) { Console.WriteLine("Need an argument."); return 1; }
        int num = int.Parse(args[0]);
        return 0;
    }
}
```

**Základní typy C#:** `byte` 8 b bez znaménka, `sbyte` 8 b, `short`/`ushort` 16 b, `int`/`uint` 32 b, `long`/`ulong` 64 b, `float` 32 b, `double` 64 b, `char` 16 b (Unicode), `bool`, `object` (kořen všech typů), `string`, `DateTime`.

**Řetězce:** `"c:\\dir"` (escape) vs `@"c:\dir"` (verbatim); `new string(charArray)`; `s.Length`, `s.Substring(start, len)`, `s[i]`; formátování `String.Format("{0} má {1}", a, b)`, indexy mohou jít v libovolném pořadí.

**Větvení a cykly:** `if/else`, `switch` (každá větev musí končit `break`, bez propadávání), `for`, `while`, `do ... while`.

**Historie a ekosystém:** C# (Microsoft, A. Hejlsberg, 2002) vznikl spolu s platformou **.NET** a jejím běhovým prostředím **CLR** (Common Language Runtime); inspirace C++, Java a Visual Basic, od verze 2.0 jde vlastní cestou (generika, funkcionální prvky).

**Podmínky předmětu:** zkouška se skládá z **praktické** (počítač) a **teoretické** (papír) části, v každé nutno získat aspoň 50 %; 6 domácích úkolů (psaní kratších C# programů, automaticky hodnoceno), nutné aspoň 2/3 bodů; body nad limit se přičítají ke zkoušce.

## Mini příklad

Hádanka z přednášky: program v **Brainfucku** (Turing-complete, páska čísel, ukazatel, podmíněný skok) tiskne mocniny dvou. Poučení: stejnou práci umí jazyk s jedním konceptem i jazyk s tisíci, ale čitelnost, abstrakce a ortogonalita se liší o řády. **Rezervovaná slova** (nelze použít jako jména) a **klíčová slova** (speciální jen v kontextu) se většinou shodují, ale ne vždy (Fortran dovolí `Integer = 42`, Java `int goto` ne).

## Pozor

> - V C# `switch` bez `break` na konci větve **nejde přeložit** (v C propadá dál).
> - `char` je v C# 16 bitů (Unicode), ne 8 jako v C. `bool` není číslo, `if (1)` neprojde.
> - Pragmatika není syntax: otázka „proč je tohle v jazyce dobrý/špatný nápad“ patří do teoretické části.
> - Domácí úkoly se řeší **samostatně** (ani Copilot, ChatGPT, GitHub), při chybě syntaxe neprojde ani kontrola celého souboru: u neodevzdané úlohy napiš aspoň prázdnou funkci se správnou hlavičkou.

## Praxe

Pojmy z úvodu a základy C#.
