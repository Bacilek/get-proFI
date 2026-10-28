# Formát obsahu kurzu

```
content/<kód>/
  README.md              stav, zdroje (co už bylo zpracováno), otevřené položky
  course.json            meta, zkouška, milníky, moduly -> lekce (id, title, week, prerequisites, topics), openItems, initialResults
  lessons/<localId>.md   tělo lekce (markdown + KaTeX $..$ / $$..$$), BEZ frontmatteru
  questions/<localId>.json  pole otázek k lekci
```

`course.json` je jediný zdroj metadat lekcí. `<localId>` je část id za dvojtečkou (`mb142:limits` -> `limits`). Prerekvizity: globální id `kurz:lekce` (i z jiného předmětu). `topics` = tagy pro mapu mezer (zatím jedno téma na lekci = id lekce).

## Lekce (markdown)
Pevná struktura: `## Intuice` (1–3 věty) → `## Vzorec` / definice → `## Mini příklad` hned pod vzorcem → `## Pozor` (blockquote s typickými chybami) → `## Praxe` (úvodní věta, otázky se vykreslí pod ní). Kondenzovat: ven jde důkazy, historie, rozvláčný text; zůstává to, co se píše do sešitu a co jde u zkoušky. Diagramy: inline SVG (markdown přes react-markdown nepustí raw HTML – diagramy řešit jako komponenty nebo obrázky v `public/`, doplnit až bude potřeba).

## Otázky (`questions/<localId>.json`)
```json
{ "id": "unikátní v kurzu", "type": "numeric|choice|free", "prompt": "md+KaTeX",
  "answer": 2.926, "tolerance": 0.001,          // numeric (desetinná čárka při zadání se akceptuje)
  "options": ["..."], "answer": 0,              // choice: index správné
  "solution": "md+KaTeX" }                      // free: sebehodnocení po zobrazení řešení
```
V JSON dvojitě escapovat zpětná lomítka (`\sqrt`). Hvězdy: 90 % správně = 3, 70 % = 2, 50 % = 1 (nikdy se neodebírají).
