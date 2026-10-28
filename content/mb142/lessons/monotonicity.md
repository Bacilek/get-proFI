## Intuice

Znaménko první derivace říká, kam funkce míří: $f'>0$ roste, $f'<0$ klesá. Lokální extrém je tam, kde se tohle znaménko obrátí – tedy ve **stacionárním bodě** ($f'=0$) nebo v bodě, kde $f'$ neexistuje.

## Vzorec

**Monotonie** (z Lagrangeovy věty, $f$ diferencovatelná na intervalu $I$):
- $f'\ge0$ na $I\iff f$ neklesající; $f'\le0\iff$ nerostoucí.
- $f'>0$ na $I\Rightarrow f$ rostoucí; $f'<0\Rightarrow$ klesající.

**Lokální extrémy.** Nutná podmínka: je-li v $x_0$ lokální extrém a $f'(x_0)$ existuje, pak $f'(x_0)=0$. Kandidáti: stacionární body a body, kde $f'$ neexistuje.

**Test podle $f'$** ($f$ spojitá v $x_0$): znaménko $f'$ se mění z $-$ na $+$ ⇒ lokální minimum; z $+$ na $-$ ⇒ lokální maximum; beze změny ⇒ extrém není.

**Test podle $f''$:** $f'(x_0)=0$ a $f''(x_0)>0$ ⇒ ostré lokální minimum; $f''(x_0)<0$ ⇒ ostré lokální maximum; $f''(x_0)=0$ nic neříká. Obecně: první nenulová derivace řádu $k$ – $k$ sudé ⇒ extrém ($>0$ min, $<0$ max), $k$ liché ⇒ není extrém.

**Globální extrémy spojité $f$ na $[a,b]$** (Weierstrass: existují): spočítej $f$ ve stacionárních bodech, v bodech bez $f'$ a v krajních bodech; největší/nejmenší hodnota vyhrává.

## Mini příklad

$f(x)=x^3-3x$: $f'=3(x^2-1)$, stacionární body $\pm1$; $f'>0$ na $(-\infty,-1)$, $<0$ na $(-1,1)$, $>0$ na $(1,\infty)$. Lokální max v $-1$ ($f=2$), lokální min v $1$ ($f=-2$).

Na $[0,2]$: $f(0)=0$, $f(1)=-2$, $f(2)=2$ ⇒ globální max $2$ (v $x=2$), min $-2$ (v $x=1$).

$f(x)=x-1-\sqrt{|x|}$: v $x=0$ derivace neexistuje a je to ostré lokální maximum; ve stacionárním bodě $x=\frac14$ je lokální minimum.

## Pozor

> - $f'(x_0)=0$ **nestačí** na extrém: $x^3$ má $f'(0)=0$, ale extrém ne.
> - Extrém může být i tam, kde derivace **neexistuje** ($|x|$ v $0$) – nezapomeň takové body zkontrolovat.
> - Monotonii zjišťuj po **intervalech** mezi body, kde $f'$ mění znaménko nebo nemá smysl (nuly i body mimo $D(f)$). Funkce $\frac{x}{x^2-6x-16}$ klesá na třech intervalech, ne na celé množině.
> - $f''(x_0)=0$ nerozhoduje ($x^3$, $x^4$): použij znaménko $f'$ nebo vyšší derivaci.
> - Globální extrém na otevřeném/neomezeném intervalu nemusí existovat – Weierstrass vyžaduje $[a,b]$.

## Praxe

Najdi intervaly monotonie, lokální a globální extrémy.
