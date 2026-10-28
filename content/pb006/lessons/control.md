## Intuice

Tok řízení určuje, **v jakém pořadí se věci vykonají**: pořadí vyhodnocení výrazu (priorita, asociativita, vedlejší efekty), větvení, cykly a iterátory. Zkouška často chce „vyhodnoť výraz“, „co vypíše tento kód“ a „napiš generátor/iterátor“.

## Vzorec

**Mechanismy řízení:** sekvence, větvení, iterace, procedury, rekurze, souběžnost, výjimky, nedeterminismus. **Böhm-Jacopini (1966):** stačí volba mezi dvěma větvemi a smyčka s podmínkou, `goto` není nutné (Dijkstra: *goto considered harmful*). `goto` nemají Java, Python; mají C, C#, Fortran. Náhrady: `return`, `break`/`continue`, výjimky.

**Výraz** = konstanty, proměnné, aplikace operátorů/funkcí, závorky. Pořadí určuje **priorita** (kdo „víc svazuje“) a **asociativita** (jak se sdružují stejně prioritní: zleva/zprava).

**Priorita v C#** (od nejvyšší): primární (`x.y f(x) a[x] x++ new`), unární (`+ - ! ~ ++x (T)x`), `* / %`, `+ -`, posuny, relační (`< > <= >= is as`), `== !=`, `&`, `^`, `|`, `&&`, `||`, `??`, `?:`, přiřazení. Přiřazení a `?:` a `??` asociují **zprava**, ostatní binární zleva. Pozor: aritmetické > relační > logické (v Pascalu `and` svazuje víc než `<`). Python: `**` je nad unárním minus, `not` > `and` > `or`. Haskell: priorita a asociativita se dají definovat (`infixl 7 *`, `infixr 8 ^`).

**Pořadí vyhodnocení operandů** priorita neurčuje. C: **nedefinované**, C#/Java: **zleva doprava**. `a = a + foo()` při `foo` měnícím `a` dá v C#: levý operand `a` se přečte první (1), pak `foo()` nastaví `a = 2` a vrátí 3, výsledek **4**.

**Zkrácené (líné) vyhodnocení:** `&&`, `||` (C, C#, Python, ML; Ada `and then`, `or else`); `a && b` nevyhodnotí `b`, když `a` je nepravda. Užitečné (`index < len && list[index] != key`), pozor na vedlejší efekty v pravém operandu. Nezkrácené v C#: `&` a `|` nad `bool`.

**Přetěžování operátorů** (C++, C#): jeden operátor více operací (`A*B+C*D`); problémy čitelnosti (`&` jako adresa/bitový součin, unární/binární `-`).

**Přiřazení:** složené (`a += b`; u indexů s vedlejším efektem **správné**: `A[index(i)] += 1`), vícenásobné (`a, b = b, a`), přiřazení jako výraz (`while ((c = getchar()) != EOF)`, past `if (x = y)`). `++`/`--`: prefix `++x` ≡ `x += 1`, postfix vrací **starou** hodnotu. **Vedlejší efekt** = změna mimo lokální prostředí; funkcionální jazyky jsou **referenčně průhledné** (výraz lze nahradit hodnotou).

**Větvení:** `else` patří k nejbližšímu nespárovanému `if` (nebo se řeší odsazením/závorkami/koncem `if`). C `switch` propadá, C# vyžaduje `break`/`return`/`goto` a větví i podle `string`.

**Cykly:** s čítačem (`for`), s logickou podmínkou (`while`, `do-while` provede tělo aspoň jednou), kombinované (`for (int i = a; i <= b; i += s)` ≈ `while`), `break`, `continue`, přes kolekce (`foreach`). Rozsah čítače omezit na cyklus.

**Iterátory:** vrací vždy jeden prvek a pamatují si pozici (oddělené „vlákno“ řízení prokládané s cyklem).
- *Python:* iterovatelný objekt `iter()` → iterátor, `next()`, na konci `StopIteration`. Vlastní třída: `__iter__()` + `__next__()`. **Generátor** = funkce s `yield`; běh se pozastaví na `yield` a pokračuje při dalším `next()`; `yield from` deleguje na podgenerátor.
- *C#:* metoda vracející `IEnumerable<T>`/`IEnumerator<T>` s `yield return`; `foreach` je cukr nad `GetEnumerator()`, `MoveNext()`, `Current` (před prvním `MoveNext()` je `Current` neplatný). Vlastní kolekce implementuje `IEnumerable`.

## Mini příklad

```csharp
static IEnumerable<int> EvenSequence(int first, int last)
{
    for (int n = first; n <= last; n++)
        if (n % 2 == 0)
            yield return n;
}
// foreach (int x in EvenSequence(5, 18)) -> 6 8 10 12 14 16 18
```

Strom s `yield from` (Python): `yield self.key` a pak `yield from self.left.preorder()`, `yield from self.right.preorder()` dává preorder průchod bez ručního cyklu.

## Pozor

> - V C# je pořadí operandů **zleva doprava**, v C **nedefinované** (`i = i++ + i` je v C UB).
> - `x++` jako výraz vrací starou hodnotu: `int a = 5; int b = a++;` dá `b == 5`, `a == 6`.
> - `a || (b++ / 3)`: pokud je `a` pravda, `b++` se **vůbec nevyhodnotí**.
> - Dangling else: `if (a) if (b) x; else y;` patří `else` k vnitřnímu `if`.
> - Generátor se při volání jen vytvoří: žádný kód těla neběží, dokud se nezavolá `next()`/`MoveNext()`.
> - `a + - b + c` je v C ok, jiné jazyky ho zakazují. Závorky nikdy neškodí.

## Praxe

Pořadí výpočtu, líné vyhodnocení, iterátory a generátory.
