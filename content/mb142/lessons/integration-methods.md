## Intuice

Dvě metody odpovídají dvěma pravidlům derivování: **per partes** je derivace součinu pozpátku, **substituce** je derivace složené funkce pozpátku.

## Vzorec

**Per partes:**
$$\int u'v\,\mathrm{d}x = uv-\int uv'\,\mathrm{d}x$$

Hodí se pro $x^n e^{ax}$, $x^n\sin ax$, $x^n\cos ax$, $x^n\operatorname{arctg}ax$, $x^a\ln^n x$ (za $v$ volíme polynom, resp. $\ln$, $\operatorname{arctg}$; za $u'$ zbytek). U $e^{ax}\sin bx$ se po dvou krocích vrátí původní integrál a vyřeší se jako rovnice.

**Substituce I** ($t=\varphi(x)$, $\mathrm{d}t=\varphi'(x)\,\mathrm{d}x$):
$$\int f(\varphi(x))\,\varphi'(x)\,\mathrm{d}x=\int f(t)\,\mathrm{d}t$$

**Substituce II** ($x=\psi(t)$, $\mathrm{d}x=\psi'(t)\,\mathrm{d}t$, $\psi'\neq0$), po výpočtu vrať $t=\psi^{-1}(x)$. Např. $x=\sin t$ pro $\sqrt{1-x^2}$.

## Mini příklad

Per partes: $\displaystyle\int x\cos x\,\mathrm{d}x$, $u'=\cos x,\ u=\sin x,\ v=x,\ v'=1$:
$$=x\sin x-\int\sin x\,\mathrm{d}x=x\sin x+\cos x+C$$

Substituce: $\displaystyle\int\frac{2x}{(x^2+1)^2}\mathrm{d}x$, $t=x^2+1$, $\mathrm{d}t=2x\,\mathrm{d}x$:
$$=\int t^{-2}\mathrm{d}t=-\frac1t+C=-\frac{1}{x^2+1}+C$$

Typický trik: $\int\ln x\,\mathrm{d}x=\int 1\cdot\ln x\,\mathrm{d}x=x\ln x-x+C$.

## Pozor

> - Po substituci už v integrálu **nesmí zůstat** $x$; nezapomeň i na $\mathrm{d}x\to\mathrm{d}t$.
> - Po výpočtu **vrať původní proměnnou**.
> - Per partes: špatná volba $u'$/$v$ integrál zkomplikuje; zkus to prohodit.
> - Vždy ověř zpětným derivováním.

## Praxe

Per partes i substituce, ve stylu zápočtovky.
