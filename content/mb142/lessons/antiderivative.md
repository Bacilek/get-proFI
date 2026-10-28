## Intuice

Integrování je **derivování pozpátku**: k funkci $f$ hledáme $F$, jejíž derivace je $f$. Taková $F$ je určená jen „až na konstantu“.

## Vzorec / definice

$F$ je **primitivní** k $f$ na intervalu $I$, pokud $F'(x)=f(x)$ pro všechna $x\in I$. Množina všech primitivních funkcí je **neurčitý integrál**:

$$\int f(x)\,\mathrm{d}x = F(x)+C,\quad C\in\mathbb{R}$$

- Je-li $f$ **spojitá** na $I$, primitivní funkce existuje (opačně to neplatí).
- Dvě primitivní funkce na intervalu se liší o konstantu.
- Linearita: $\int (c f \pm g) = c\int f \pm \int g$.

Tabulka (z derivací elementárních funkcí):

| $f(x)$ | $\int f(x)\,\mathrm{d}x$ |
|---|---|
| $x^n,\ n\neq -1$ | $\dfrac{x^{n+1}}{n+1}$ |
| $\dfrac1x$ | $\ln\lvert x\rvert$ |
| $a^x$ | $\dfrac{a^x}{\ln a}$ |
| $\sin x$ / $\cos x$ | $-\cos x$ / $\sin x$ |
| $\dfrac{1}{\cos^2 x}$ / $\dfrac{1}{\sin^2 x}$ | $\operatorname{tg} x$ / $-\operatorname{cotg} x$ |
| $\dfrac{1}{\sqrt{1-x^2}}$ | $\arcsin x$ |
| $\dfrac{1}{a^2+(x-x_0)^2}$ | $\dfrac1a\operatorname{arctg}\dfrac{x-x_0}{a}$ |
| $\dfrac{f'(x)}{f(x)}$ | $\ln\lvert f(x)\rvert$ |

## Mini příklad

$$\int\left(2^x-\frac{2}{x}\right)\mathrm{d}x=\frac{2^x}{\ln 2}-2\ln\lvert x\rvert+C$$

Zkouška: zderivuj výsledek, musíš dostat zadanou funkci.

## Pozor

> - V logaritmu patří **absolutní hodnota**: $\int \frac1x\,\mathrm{d}x=\ln\lvert x\rvert+C$.
> - Nezapomeň na $+C$.
> - $\int \frac{\ln x}{x}\,\mathrm{d}x=\frac12\ln^2x+C$ se dá spočítat elementárně, ale třeba $\int\frac{\sin x}{x}\,\mathrm{d}x$ nebo $\int e^{x^2}\mathrm{d}x$ ne (primitivní funkce existuje, jen není elementární).

## Praxe

Základní tabulkové integrály a pár úloh na primitivní funkci.
