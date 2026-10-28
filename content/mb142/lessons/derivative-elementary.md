## Intuice

Derivace elementárních funkcí je tabulka, kterou musíš umět zpaměti. Všechny vycházejí ze čtyř základních limit ($\frac{\sin h}h\to1$, $\frac{1-\cos h}h\to0$, $\frac{e^h-1}h\to1$, $\frac{\ln(1+h)}h\to1$) a z pravidel skládání, podílu a inverze.

## Vzorec

| $f(x)$ | $f'(x)$ | poznámka |
|---|---|---|
| $x^r$ | $r x^{r-1}$ | $r\in\mathbb R$, jistě pro $x>0$ |
| $\sin x$ | $\cos x$ | |
| $\cos x$ | $-\sin x$ | |
| $\operatorname{tg}x$ | $\dfrac1{\cos^2x}$ | podíl $\frac{\sin}{\cos}$ |
| $\operatorname{cotg}x$ | $-\dfrac1{\sin^2x}$ | |
| $e^x$ | $e^x$ | |
| $a^x$ | $a^x\ln a$ | $a^x=e^{x\ln a}$ |
| $\ln x$ | $\dfrac1x$ | |
| $\log_ax$ | $\dfrac1{x\ln a}$ | |
| $\arcsin x$ | $\dfrac1{\sqrt{1-x^2}}$ | $x\in(-1,1)$ |
| $\arccos x$ | $-\dfrac1{\sqrt{1-x^2}}$ | |
| $\operatorname{arctg}x$ | $\dfrac1{1+x^2}$ | |
| $\operatorname{arccotg}x$ | $-\dfrac1{1+x^2}$ | |

Speciálně $(\sqrt x)'=\frac1{2\sqrt x}$, $(\frac1x)'=-\frac1{x^2}$.

**Cyklometrické** vznikají z věty o inverzi, např. pro $y=\arcsin x$, $x=\sin y$: $\;\frac1{\cos y}=\frac1{\sqrt{1-\sin^2y}}=\frac1{\sqrt{1-x^2}}$.

**Funkce typu $f^g$** (proměnná i v základu i v exponentu): přepiš $f^g=e^{g\ln f}$ a derivuj jako složenou funkci:
$$\big(f^g\big)'=f^g\Big(g'\ln f+g\,\frac{f'}f\Big).$$

**$n$-tá derivace** hledáme z prvních derivací, odhadneme vzorec a ověříme indukcí. Např. $\ln(1+x)^{(n)}=\frac{(-1)^{n-1}(n-1)!}{(1+x)^n}$.

## Mini příklad

$(x^x)'$: $x^x=e^{x\ln x}$, tedy $(x^x)'=e^{x\ln x}\big(\ln x+x\cdot\tfrac1x\big)=x^x(\ln x+1)$.

$\big(x e^x\big)'=e^x+xe^x=(1+x)e^x$.

$\big(\operatorname{arctg}\sqrt x\big)'=\dfrac1{1+x}\cdot\dfrac1{2\sqrt x}$.

## Pozor

> - **Exponenciála × mocnina:** $(e^x)'=e^x$, ale $(x^e)'=e\,x^{e-1}$ a $(a^x)'=a^x\ln a$ (ne $x a^{x-1}$).
> - Znaménka: $(\cos x)'=-\sin x$, $(\operatorname{cotg}x)'$, $(\arccos x)'$, $(\operatorname{arccotg}x)'$ jsou **záporné**.
> - $(\operatorname{tg}x)'=\frac1{\cos^2x}=1+\operatorname{tg}^2x$, ne $\frac1{\cos x}$.
> - $\ln$ v $(\log_ax)'=\frac1{x\ln a}$ je ve **jmenovateli**.
> - Rozlišuj $\sin^2x$ (složená: $(\sin^2x)'=2\sin x\cos x$) a $\sin x^2$ (vnitřní $x^2$).
> - Při $f^g$ nepoužívej pravidlo pro mocninu ani pro exponenciálu zvlášť – vždy přes $e^{g\ln f}$.

## Praxe

Dosazuj do tabulky, kombinuj s pravidly z předchozí lekce a zkus derivovat $f^g$.
