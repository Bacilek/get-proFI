# Formát obsahu kurzu

```
content/<kód>/
  README.md        stav, zdroje (co už bylo zpracováno), otevřené otázky
  course.json      meta, hodnocení, milníky, moduly, pořadí lekcí, prerekvizity
  lessons/<id>.md  jedna lekce (frontmatter + markdown + KaTeX $..$/$$..$$)
  questions/<modul>.json  otázky/cvičení navázané na témata (topics)
```

## Lekce (`lessons/<id>.md`)
Frontmatter: `id`, `title`, `module`, `week` (týden semestru), `prerequisites: [id, nebo "kód:id" pro jiný předmět]`, `topics: [tag]`.
Struktura těla (pořád stejně): **Intuice** (1–3 věty) → **Definice/Vzorec** → **Mini příklad** hned pod vzorcem → **Pozor** (typické chyby) → **Praxe** (odkazy na otázky). Kondenzovat: ven jde důkazy, historie, rozvláčný text; zůstává to, co se píše do sešitu a co jde u zkoušky. Diagramy jako inline SVG/Mermaid.

## Otázky
`{ id, topic, lesson, type: "numeric"|"choice"|"free", prompt, answer, solution, difficulty }`. `free` = sebehodnocení podle řešení.
