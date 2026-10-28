## Intuice

Fourierova řada rozkládá **periodickou** funkci na diskrétní frekvence. Pro funkci na celé přímce (nepériodickou) pošleme periodu $T\to\infty$: diskrétní součet přejde v integrál přes všechny frekvence $\omega$ a vznikne **Fourierova transformace** $\tilde f(\omega)$ – „kolik frekvence $\omega$ v signálu je“. Přitom **derivování** se změní v prosté **násobení** $i\omega$ a **konvoluce** v **součin**.

## Vzorec

**Konvoluce** (vážený průměr $f$ kolem bodu $y$ s vahou $g$):
$$(f*g)(y)=\int_{-\infty}^{\infty}f(x)\,g(y-x)\,dx.$$
Je komutativní, asociativní, lineární, spojitá (pro spojité $f,g$); $|f*g|\le|f|*|g|$.

**Komplexní Fourierova řada:** $e^{i\omega t}=\cos\omega t+i\sin\omega t$. Koeficienty $c_n=\frac1T\int_{-T/2}^{T/2}f(t)e^{-i\omega nt}dt$, $\ \omega=\frac{2\pi}T$, $c_n=\frac12(a_n-ib_n)$, $c_{-n}=\frac12(a_n+ib_n)$, $f(t)=\sum_{n\in\mathbb Z}c_ne^{i\omega nt}$.

**Fourierova transformace** (pro $f$ absolutně integrovatelnou na $\mathbb R$) a její inverze:
$$\tilde f(\omega)=\mathcal F(f)(\omega)=\frac1{\sqrt{2\pi}}\int_{-\infty}^{\infty}f(t)\,e^{-i\omega t}\,dt,\qquad f(t)=\mathcal F^{-1}(\tilde f)(t)=\frac1{\sqrt{2\pi}}\int_{-\infty}^{\infty}\tilde f(\omega)\,e^{i\omega t}\,d\omega.$$

**Vlastnosti:**
- **Derivace:** $\mathcal F(f')(\omega)=i\omega\,\mathcal F(f)(\omega)$, $\ \mathcal F(f'')=-\omega^2\mathcal F(f)$ (per partes; hraniční člen zmizí).
- **Konvoluce:** $\mathcal F(f*g)=\sqrt{2\pi}\,\mathcal F(f)\cdot\mathcal F(g)$, $\ \mathcal F(f\cdot g)=\frac1{\sqrt{2\pi}}\mathcal F(f)*\mathcal F(g)$.
- **Dekonvoluce:** z pozorování $h=f*g$ a znalosti jádra $g$ obnovíme $f=\mathcal F^{-1}\!\left(\dfrac{\mathcal F(h)}{\sqrt{2\pi}\,\mathcal F(g)}\right)$.
- **Obdélník:** $f=\mathbf 1_{[-a,a]}$ má $\tilde f(\omega)=\sqrt{\tfrac2\pi}\dfrac{\sin a\omega}{\omega}$ (a naopak transformace obdélníku $\mathbf 1_{[-w,w]}$ dá $f(t)=\sqrt{\tfrac2\pi}\dfrac{\sin wt}{t}$).
- Lokalizované $f$ (úzký signál) má rozprostřenou $\tilde f$ a naopak.
- **Doplněk (standardní fakt):** $e^{-t^2/2}$ má při této normalizaci transformaci $e^{-\omega^2/2}$ (Gauss se zobrazí sám na sebe).

## Mini příklad

**Konvoluce:** $f(x)=(1-x^2)\mathbf 1_{[-1,1]}$, $g=\mathbf 1_{[-1,1]}$. Pro $y\in(0,2)$ překrývají nosiče $x\in(y-1,1)$:
$$(f*g)(y)=\int_{y-1}^{1}(1-x^2)\,dx=\frac{y^3}3-y^2+\frac43,$$
celkově $(f*g)(y)=\dfrac{|y|^3}3-y^2+\dfrac43$ pro $|y|<2$ a $0$ jinak (sudost ⇒ symetrie, v $y=\pm2$ vyjde $0$).

**Transformace obdélníku** $f=\mathbf 1_{[-1,1]}$: $\tilde f(\omega)=\frac1{\sqrt{2\pi}}\int_{-1}^1e^{-i\omega t}dt=\frac1{\sqrt{2\pi}}\cdot\frac{2\sin\omega}{\omega}=\sqrt{\tfrac2\pi}\frac{\sin\omega}\omega$.

**Derivace:** je-li $\tilde f(\omega)$ známá, má $f'$ transformaci $i\omega\tilde f(\omega)$; DR $y''+y=h$ se přepíše na $(1-\omega^2)\tilde y=\tilde h$, tj. algebraickou rovnici.

## Pozor

> - U konvoluce hlídej **nosiče**: $f(x)g(y-x)\ne0$ jen pro $x$ z průniku nosiče $f$ a posunutého/zrcadleného nosiče $g$; podle polohy $y$ se mění meze (po částech definovaný výsledek).
> - Normalizace $\frac1{\sqrt{2\pi}}$ **v obou směrech** (zde symetrická volba); jiné texty mají $\frac1{2\pi}$ jen u inverze – konstanty ve vzorcích o konvoluci se pak liší ($\sqrt{2\pi}$ v $\mathcal F(f*g)$ plyne z této volby).
> - V $\mathcal F(f')=i\omega\mathcal F(f)$ je **$+i\omega$** (znaménko plyne z $e^{-i\omega t}$ v definici).
> - Transformace existuje pro $f$ s $\int|f|<\infty$; konstantní funkce či $\sin$ takové nejsou.
> - $\frac{\sin\omega}{\omega}$ je v $\omega=0$ dodefinováno hodnotou $1$.

## Praxe

Spočti konvoluci jednoduchých funkcí (po částech), Fourierovu transformaci obdélníkového pulzu a využij vlastnosti pro derivaci a konvoluci.
