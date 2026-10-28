## Intuice

Prohledávací algoritmy mají otázku „zakódovanou“ v zadání (přechody, cíl). **Logický agent (knowledge-based agent)** místo toho drží **bázi znalostí** (KB) formálních vět a **odvozuje** nové znalosti; může odpovědět v principu na libovolnou otázku, učit se nové znalosti a přizpůsobit se stavu prostředí. Hodí se v **částečně pozorovatelných** prostředích.

## Vzorec

**Dvě části:** báze znalostí (znalosti o doméně: axiomy = *background knowledge*, pozorování) a **inferenční stroj** (algoritmy nezávislé na doméně). Rozhraní: `tell(KB, věta)` přidá znalost, `ask(KB, dotaz)` se ptá.

```
KB-Agent(KB, t, percept):
   tell(KB, make_percept_sentence(percept, t))
   action = ask(KB, make_action_query(t))
   tell(KB, make_action_sentence(action, t))
   return action, t+1
```

**Reprezentace znalostí** (jazyk, syntaxe+sémantika) a **vyvozování znalostí** (inference).

**PEAS (zadání světa agenta):** **P**erformance measure (míra výkonnosti), **E**nvironment (prostředí), **A**ctuators (akční prvky), **S**ensors (senzory). Např. automatické taxi: výkonnost – doprava na místo, bezpečnost, komfort; prostředí – ulice, chodci, počasí; akční prvky – řízení, plyn, brzda; senzory – kamera, GPS, tachometr.

**Wumpusova jeskyně** (mřížka $4\times4$, start $[1,1]$): P: zlato +1000, smrt −1000, −1 za krok, −10 za použití šípu. E: Wumpus (v sousedních místnostech **zápach**), jámy (v sousedních **vánek**), zlato (**třpyt** v téže místnosti). A: otočení vlevo/vpravo, krok vpřed, zvednutí, položení, výstřel (jediný šíp). S: vánek, třpyt, zápach, náraz do zdi, chroptění Wumpuse. Vlastnosti: *částečně pozorovatelné* (jen lokální vnímání), deterministické, *sekvenční*, statické, diskrétní, jeden agent (Wumpus je vlastnost prostředí).
Těžké situace: vánek v $[1,2]$ i $[2,1]$ ⇒ žádná bezpečná akce (pravděpodobnost jámy v $[2,2]$ je 0,86 vs. 0,31 na krajích); zápach v $[1,1]$ ⇒ nelze se pohnout – **donucovací strategie**: vystřel jedním směrem; je-li chroptění, Wumpus je mrtev a je bezpečno; jinak tam Wumpus nebyl.

**Logika** = syntaxe (jaké věty jsou dobře utvořené) + sémantika (pravdivost vět v **možném světě / modelu**). **Důsledek (entailment)** $KB\models\alpha$: vždy když je KB pravdivá, je i $\alpha$ pravdivá. Sémanticky $KB\models\alpha\iff M(KB)\subseteq M(\alpha)$, kde $M(\cdot)$ je množina modelů.
**Dedukční věta:** $KB\models\alpha\iff(KB\Rightarrow\alpha)$ je platný (tautologie).
**Důkaz sporem:** $KB\models\alpha\iff KB\wedge\neg\alpha$ je nesplnitelné.
**Operace zachovávající pravdivost** (odvozování) = logická inference; příklad: z $X+Y=10$, $X-Y=4$ sečtením $X=7$.

## Mini příklad

Wumpus: $R_1:\neg P_{1,1}$; $R_2:\neg B_{1,1}$; $R_3:B_{2,1}$; $R_4:B_{1,1}\Leftrightarrow(P_{1,2}\vee P_{2,1})$; $R_5:B_{2,1}\Leftrightarrow(P_{1,1}\vee P_{2,2}\vee P_{3,1})$.
Z $R_2,R_4$: $\neg B_{1,1}\Rightarrow\neg P_{1,2}\wedge\neg P_{2,1}$ ⇒ políčka $[1,2]$ a $[2,1]$ jsou **bezpečná**. Z $R_3,R_5,R_1$: $P_{2,2}\vee P_{3,1}$ (jáma je někde tam).

Počet modelů: KB $=P\vee Q$ nad symboly $P,Q,R$ má $3\cdot2=6$ modelů (3 přiřazení $(P,Q)$ × 2 hodnoty $R$).

## Pozor

> - **Entailment** je vztah mezi větami (založený na sémantice), ne mezi světy: $KB\models\alpha$ znamená $M(KB)\subseteq M(\alpha)$, nikoli opačně.
> - „Vánek“ ve výrokové logice zapisuj **ekvivalencí** $B_{1,1}\Leftrightarrow(P_{1,2}\vee P_{2,1})$ – samotná implikace (jáma ⇒ vánek) neříká, že **bez jámy vánek není**.
> - Wumpus a jáma jsou **statické** (nehýbou se); prostředí je ale **sekvenční** a jen částečně pozorovatelné.
> - Znalosti zapsané v libovolné syntaxi jsou v agentovi konfigurací; důsledky zajišťuje inference, ne „porozumění“.

## Praxe

Urči PEAS, vlastnosti prostředí, bezpečná políčka ve Wumpusově jeskyni a základní vztahy KB a důsledku.
