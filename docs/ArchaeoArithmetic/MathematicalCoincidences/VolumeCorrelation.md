---
sidebar_position: 2
---

import DocVideo, {DocImg} from '@site/src/components/DocVideo';

# Volume Correlation

The topic explores another golden ratio based mathematical coincidence.  Namely that radius of a unit sphere happens to be close to $1/\phi$

$$V = \frac{4}{3}\pi r^3$$

$$r = \left(\frac{3V}{4\pi}\right)^{1/3}$$

For $V=1$, $r = \left(\frac{3}{4\pi}\right)^{1/3} \approx$ {(() => {
  const V = 1;
  const r = Math.cbrt((3 * V) / (4 * Math.PI));
  return r.toFixed(12);
})()}.

The difference $\lvert r - 1/\phi\rvert$ is $\approx$ {(() => {
  const V = 1;
  const r = Math.cbrt((3 * V) / (4 * Math.PI));
  return Math.abs(r - 1 / Math.PHI).toFixed(12);
})()}.

While one may keen to cast this aside, when possessed of the mystery of the royal cubit and the mathematical relationship that

$$\pi/6 \approx \phi^2/5$$

Numerically, $\pi/6 \approx$ {(() => (Math.PI / 6).toFixed(6))()} and $\phi^2/5 \approx$ {(() => ((Math.PHI ** 2) / 5).toFixed(6))()}; $\lvert \pi/6 - \phi^2/5\rvert \approx$ {(() =>
  Math.abs(Math.PI / 6 - (Math.PHI ** 2) / 5).toFixed(12)
)()}.

<DocImg src="/img/cubit-mystery.jpg" style={{maxWidth: '100%'}} />

*Source* [Geometry of Time via the Metre, Egyptian Royal Cubit & the Great Pyramid](https://www.youtube.com/watch?v=f_UHNpQLmYM)

*Source* [The Movie Great Pyramid K 2019 - Director Fehmi Krasniqi](https://www.youtube.com/watch?v=KMAtkjy_YK4)

one may be possessed themselves to explore this coincidence with more care and frugality

If one were to approach the volume of forms without the modern trigonometry that relies on the arc length of the circle, such as the babylonians in plimpton 322 with their focus on exact ratios of right angle triangles instead of angles and sohcahtoa.

<DocVideo src="/img/322-descent.webm" />
[Plimpton 322 is Babylonian exact sexagesimal trigonometry](https://www.sciencedirect.com/science/article/pii/S0315086017300691)


:::info[Quote — Mansfield & Wildberger, Historia Mathematica 44 (2017)]
A modern trigonometric table is a list of right triangles with hypotenuse 1 and approximations to the side lengths sin θ and cos θ, along with the ratio tan θ = sin θ/ cos θ. We propose that P322 is a different kind of trigonometric table which lists right triangles with long side 1, exact short side β and exact diagonal δ – in place of the approximations sin θ and cos θ. The ratios β/δ or δ/β (equivalent to tan θ) are not given because they cannot be calculated exactly on account of the divisions involved. Instead P322 separates this information into three exact numbers: a related squared ratio which can be used as an index, and simplified values b and d for β and δ which allow the user to make their own approximation to these ratios.
:::

This makes this coincidence quite interesting, as this makes their volume relations not correspond with arc's or angles, defeating the justification to put $\pi$ in the volume of sphere. [Deriving the volume of a sphere](https://tutorial.math.lamar.edu/classes/calciii/tisphericalcoords.aspx) If pi was not such an easy commance in the ancient world, than it begs to question how they reasoned and calculated the volume of forms.  It would've made a fatally obscure "error" to attempt to fill a cube with water with known length, and than see how much water is left or missing when pouring it into a sphere of known diameter- they could've easily assumed at this level of tolerance that there was a fundemental extreme and mean identity between the cube and sphere as is the line AB divided at point C is extreme and mean ratio if  AC = AC:CB.  But no matter of their persuasions- if they were interdimensional geniuses or enchanted by a mathematical rounding error- it begs the question, if pi was the mystery number and they derived the volumes by hand with water buckets, what would've they put in place for pi?


$$\frac{\left(\frac{3}{x}\right)^{1/3}}{2^{2/3}} = \frac{1}{\phi}$$

$$x = \frac{3\phi^3}{4}.$$

Numerically $3\phi^3/4 \approx$ {(() => ((3 * Math.PHI ** 3) / 4).toFixed(6))()} (compare $\pi \approx$ {(() => Math.PI.toFixed(6))()}); $\lvert 3\phi^3/4 - \pi\rvert \approx$ {(() =>
  Math.abs((3 * Math.PHI ** 3) / 4 - Math.PI).toFixed(6)
)()}.

now if we utilize this value of pi in the volume relation

$$ V_{sphere} = \frac{4}{3 x r^3} = \frac{4}{3 \frac{3 \phi^3}{4} r^3} = r^3 \phi^3 $$

when $r = \frac{1}{\phi}$

$$ V_{sphere} = \frac{1}{\phi}^3 \phi^3 = 1^3 $$

when the radius of a sphere is $\frac{1}{\phi}$ its enclosing boxes's length is $\frac{2}{\phi}$

$$ V_{box} = \frac{2}{\phi}^3 = \frac{8}{\phi^3}$$

making the ratio of the 3 sphere to the 3 box

$$ \frac{V_{sphere}}{V_{box}} = \frac{\phi^3}{8} = \frac{\phi^3}{2^3} $$

if we were consider a sort of strange mathematical universe that neglects $\pi$ as a natural constant, that universe is not obligated to obey pi, but is destined to disintemediate pressure somewhat uniformly about its degrees of freedom ie its dimensional axies.

<DocVideo src="https://www.youtube.com/watch?v=6dTyOl1fmDo" />

Source: [https://www.youtube.com/watch?v=6dTyOl1fmDo](https://www.youtube.com/watch?v=6dTyOl1fmDo)

<DocImg src="/img/pi-pressure-cubit.png" style={{maxWidth: '100%'}} />

What's interesting here is an incommensurable angle when they require $\pi$ from the collision (pressure disintermediation) of two blocks. The cubit makes the relationship multidimensional: a circle of diameter 1 has an arc length of $6 \cdot \text{cubit}$, and the ratio between the volume of a sphere and the volume of the enclosing box is the cubit as well.

A pleasing notion that the incommensurability brought forth in the is pi method is now not stuffed into a corner per say, but kinda distributed six wise along the cirle

the experiment in the least and be confirmed below in the second dimension and again in the 4th

================================

For dimension 2 (the circle):

$$A_{\text{circle}}=\pi r^2$$

$$r=\sqrt{\frac{A}{\pi}}$$

For unit area $(A=1)$:

$$r=\frac{1}{\sqrt{\pi}}.$$

Numerically, $r \approx$ {(() => (1 / Math.sqrt(Math.PI)).toFixed(18))()}.
The difference $\left|r-\frac{1}{\phi}\right| \approx$ {(() =>
  Math.abs(1 / Math.sqrt(Math.PI) - 1 / Math.PHI).toFixed(18)
)()}.


again we find this mathematical coincidence. starting from dimension 2 here and climbing back up, lets consider that nature or some reason avoids pi, and prefers 'balancing' pressure disintermediation of either the area under the N+1 curve with 1/phi the Nth dimension- a sort of holographic information encoding resolving the incommensurability of the vector rotation.

Here lets avoid setting pi as constant, but prod the number when setting this mathematical coincidence as mathematical fact.  Like nature saves information by encoding holographically and lets pi float and be an estimator at runtime

$$A = x_{\pi,2}\, r^2$$

Setting $A=1$ and $r=\frac{1}{\phi}$ and solving for $x_{\pi,2}$ we denote this subscript as x is a substitute for the 'real' (chuckle) pi when considering the 2nd dimension:

$$1 = x_{\pi,2} \cdot \frac{1}{\phi^2} \;\Rightarrow\; x_{\pi,2} = \phi^2. = \phi^2 r^2$$

Numerically, $x_{\pi,2} = \phi^2 \approx$ {(() => (Math.PHI ** 2).toFixed(18))()} and $\left|x_{\pi,2} - \pi\right| \approx$ {(() =>
  Math.abs(Math.PHI ** 2 - Math.PI).toFixed(18)
)()}.

<DocImg src="/img/that-difference.png" />

noting again this strange nesting of the residual error into powers of 10 of the cubit itself

The key observation is that in every case $x_{\pi,n}$ is the unique value that makes the prefactor constants cancel, collapsing the volume formula to $1=(\phi r)^n$:

$$ V_{4-sphere} = \frac{\pi^2}{2}r^4 $$


For a unit 4-volume, set $V_{4\text{-sphere}}=1$:

$$1=\frac{\pi^2}{2}r^4 \;\Rightarrow\; r=\left(\frac{2}{\pi^2}\right)^{1/4}.$$

Numerically, $r \approx$ {(() => ((2 / (Math.PI ** 2)) ** 0.25).toFixed(18))()}.
The difference $\left|r-\frac{1}{\phi}\right| \approx$ {(() =>
  Math.abs((2 / (Math.PI ** 2)) ** 0.25 - 1 / Math.PHI).toFixed(18)
)()}.
This is very close to $\frac{\phi^2}{5}\cdot\frac{1}{10} = \frac{\phi^2}{50} \approx$ {(() => ((Math.PHI ** 2) / 50).toFixed(18))()}, with absolute difference $\approx$ {(() =>
  Math.abs(Math.abs((2 / (Math.PI ** 2)) ** 0.25 - 1 / Math.PHI) - (Math.PHI ** 2) / 50).toFixed(18)
)()}.
Note the odd recursive flavor in this error term: at higher precision, the residual appears to "tunnel" down through powers of 10 with the cubitic relation, this becomes more stark later

let us reaffirm the 5 dimension case for veracity
the volume and radius of a 5 sphere are

$$V_{5\text{-sphere}}=\frac{8\pi^2}{15}r^5$$

$$r=\left(\frac{15V}{8\pi^2}\right)^{1/5}$$

For unit volume $(V=1)$:

$$r=\left(\frac{15}{8\pi^2}\right)^{1/5}.$$

Numerically, $r \approx$ {(() => ((15 / (8 * Math.PI ** 2)) ** (1 / 5)).toFixed(18))()}.

While we are slightly departed we still are on target well with the difference of this with the little golden ratio as 

$$\left|r-\frac{1}{\phi}\right|=\left|\left(\frac{15}{8\pi^2}\right)^{1/5}-\frac{1}{\phi}\right|.$$

Numerically, $\left|r-\frac{1}{\phi}\right| \approx$ {(() =>
  Math.abs((15 / (8 * Math.PI ** 2)) ** (1 / 5) - 1 / Math.PHI).toFixed(18)
)()}.

one may find this patter rather strange, this fuzzy correlative to the hundreths and thousanths, coincidence exists in the higher dimensions, consider again below at dimension 2


| Dim | n-volume | Solved $x_{\pi,n}$ | $\phi$ form | abs$(x_{\pi,n}-\pi)$ | target $t_n$ | abs$(\text{abs}(x_{\pi,n}-\pi)-t_n)$ |
|---|---|---|---|---:|---|---:|
| 0D | $x_{\pi,0} r^0 $ | $\phi^0 = 1$| $(\phi r)^0$ | n/a | n/a | n/a |
| 1D | $2x_{\pi,1}r$ | $\phi/2$ | $(\phi r)^1$ | {(() => Math.abs(Math.PHI / 2 - Math.PI).toFixed(18))()} | n/a | n/a |
| 2D | $x_{\pi,2}r^2$ | $\phi^2$ | $(\phi r)^2$ | {(() => Math.abs(Math.PHI ** 2 - Math.PI).toFixed(18))()} | $\phi^2/5$ | {(() => Math.abs(Math.abs(Math.PHI ** 2 - Math.PI) - (Math.PHI ** 2) / 5).toFixed(18))()} |
| 3D | $\frac{4}{3}x_{\pi,3}r^3$ | $3\phi^3/4$ | $(\phi r)^3$ | {(() => Math.abs((3 * Math.PHI ** 3) / 4 - Math.PI).toFixed(18))()} | $\phi^7$ | {(() => Math.abs(Math.abs((3 * Math.PHI ** 3) / 4 - Math.PI) - Math.PHI ** 7).toFixed(18))()} |
| 4D | $\frac{x_{\pi,4}^2}{2}r^4$ | $\phi^2\sqrt{2}$ | $(\phi r)^4$ | {(() => Math.abs(Math.PHI ** 2 * Math.sqrt(2) - Math.PI).toFixed(18))()} | $\phi^2/5$ | {(() => Math.abs(Math.abs(Math.PHI ** 2 * Math.sqrt(2) - Math.PI) - (Math.PHI ** 2) / 5).toFixed(18))()} |
| 5D | $\frac{8x_{\pi,5}^2}{15}r^5$ | $\sqrt{15\phi^5/8}$ | $(\phi r)^5$ | {(() => Math.abs(Math.sqrt((15 * Math.PHI ** 5) / 8) - Math.PI).toFixed(18))()} | $\sqrt{2}$ | {(() => Math.abs(Math.abs(Math.sqrt((15 * Math.PHI ** 5) / 8) - Math.PI) - Math.sqrt(2)).toFixed(18))()} |
| 6D | $\frac{x_{\pi,6}^3}{6}r^6$ | $6^{1/3}\phi^2$ | $(\phi r)^6$ | {(() => Math.abs(6 ** (1 / 3) * Math.PHI ** 2 - Math.PI).toFixed(18))()} | $\phi$ | {(() => Math.abs(Math.abs(6 ** (1 / 3) * Math.PHI ** 2 - Math.PI) - Math.PHI).toFixed(18))()} |
| 7D | $\frac{16x_{\pi,7}^3}{105}r^7$ | $(105\phi^7/16)^{1/3}$ | $(\phi r)^7$ | {(() => Math.abs(((105 * Math.PHI ** 7) / 16) ** (1 / 3) - Math.PI).toFixed(18))()} | $\phi^2$ | {(() => Math.abs(Math.abs(((105 * Math.PHI ** 7) / 16) ** (1 / 3) - Math.PI) - Math.PHI ** 2).toFixed(18))()} |
| 8D | $\frac{x_{\pi,8}^4}{24}r^8$ | $24^{1/4}\phi^2$ | $(\phi r)^8$ | {(() => Math.abs(24 ** (1 / 4) * Math.PHI ** 2 - Math.PI).toFixed(18))()} | $\phi^2$ | {(() => Math.abs(Math.abs(24 ** (1 / 4) * Math.PHI ** 2 - Math.PI) - Math.PHI ** 2).toFixed(18))()} |

In every dimension the prefactor constants are precisely the inverse of the volume-formula coefficient — $\frac{4}{3}\leftrightarrow\frac{3}{4}$, $\frac{1}{2}\leftrightarrow 2$, $\frac{8}{15}\leftrightarrow\frac{15}{8}$ — so they annihilate, and the whole tower collapses to the single statement

$$1=(\phi r)^n.$$


Now, remembering that the cubit is hypothesized as a dimension climbing device, so now we have strange values of pi that correspond to each dimension, that 'warp' the field to make th mathematical coincidence mathematical fact- its this extreme and mean proportion abuse that makes it a n+1th dimension commensurability resolver

remember we were reasoning about the ratio of volume of the sphere and the volume of the box, let us now use our unique values of pi corresponding to each dimension and see $ y_{\odot,n} $ where y is the cubit infered by a particiular dimension

$$ \odot = \frac{V_{sphere}}{V_{cube}} $$

| Dim | $V_{n\text{-sphere}}$ ($r=1/\phi$) | $V_{n\text{-box}}$ ($l=2r=2/\phi$) | $\phi$-based $y_{\odot,n}$ | $\pi$-based reference | numeric $y_{\odot,n}$ | abs diff |
|---|---|---|---|---|---:|---:|
| 0D | $1$ | $1$ | $1$ | $1$ | {(() => (1).toFixed(18))()} | {(() => (0).toFixed(18))()} |
| 1D | $2/\phi$ | $2/\phi$ | $\phi/2$ | $1$ | {(() => (Math.PHI / 2).toFixed(18))()} | {(() => Math.abs(Math.PHI / 2 - 1).toFixed(18))()} |
| 2D | $\pi/\phi^2$ | $4/\phi^2$ | $\phi^2/4$ | $\pi/4$ | {(() => (Math.PHI ** 2 / 4).toFixed(18))()} | {(() => Math.abs(Math.PHI ** 2 / 4 - Math.PI / 4).toFixed(18))()} |
| 3D | $\frac{4\pi}{3\phi^3}$ | $8/\phi^3$ | $\phi^3/8$ | $\pi/6$ | {(() => (Math.PHI ** 3 / 8).toFixed(18))()} | {(() => Math.abs(Math.PHI ** 3 / 8 - Math.PI / 6).toFixed(18))()} |
| 4D | $\frac{\pi^2}{2\phi^4}$ | $16/\phi^4$ | $\phi^4/16$ | $\pi^2/32$ | {(() => (Math.PHI ** 4 / 16).toFixed(18))()} | {(() => Math.abs(Math.PHI ** 4 / 16 - Math.PI ** 2 / 32).toFixed(18))()} |
| 5D | $\frac{8\pi^2}{15\phi^5}$ | $32/\phi^5$ | $\phi^5/32$ | $\pi^2/60$ | {(() => (Math.PHI ** 5 / 32).toFixed(18))()} | {(() => Math.abs(Math.PHI ** 5 / 32 - Math.PI ** 2 / 60).toFixed(18))()} |
| 6D | $\frac{\pi^3}{6\phi^6}$ | $64/\phi^6$ | $\phi^6/64$ | $\pi^3/384$ | {(() => (Math.PHI ** 6 / 64).toFixed(18))()} | {(() => Math.abs(Math.PHI ** 6 / 64 - Math.PI ** 3 / 384).toFixed(18))()} |
| 7D | $\frac{16\pi^3}{105\phi^7}$ | $128/\phi^7$ | $\phi^7/128$ | $\pi^3/840$ | {(() => (Math.PHI ** 7 / 128).toFixed(18))()} | {(() => Math.abs(Math.PHI ** 7 / 128 - Math.PI ** 3 / 840).toFixed(18))()} |
| 8D | $\frac{\pi^4}{24\phi^8}$ | $256/\phi^8$ | $\phi^8/256$ | $\pi^4/6144$ | {(() => (Math.PHI ** 8 / 256).toFixed(18))()} | {(() => Math.abs(Math.PHI ** 8 / 256 - Math.PI ** 4 / 6144).toFixed(18))()} |

*Todo:* look at all the dimensions up to 28, or rather each of the perfect numbers, look at bott periodicity

Now the revelation becomes quite translucent, we have our horus eye fractions cutting powers of the golden ratio, formally we derive

$$\odot = \frac{V_{\text{unit-}n\text{-sphere}}}{V_{\text{unit-}n\text{-box}}} = \frac{\sum_{n=0}^{\infty} \frac{\phi^n}{2^n}}{10} = \frac{\phi^2}{5} \approx \frac{\pi}{6} $$

which cements the theory that it was a multidimensional interrelator beyond just the 2d and 3d with all the fixings of the egyptian mathematical system, the horus powers of two, the golden mean, pi, and powers of 10. phi pi cubit and the metre all in one. and shows how this process loops back into itself with commensurate perfection suggesting nature uses phi not pi.


![All dressed](/img/all-dressed.png)
Source pyramid k 2019


## Inferring the analytic continuation, a note on the 0d and 1d situation

let us consider the polar coordinate derivation of the area of a circle

$$
\begin{aligned}
A(r)
&= \iint_D 1\,d(x,y) \\
&= \iint_D t\,dt\,d\theta \\
&= \int_0^r \int_0^{2\pi} t\,d\theta\,dt \\
&= \int_0^r \left[t\theta\right]_0^{2\pi} dt \\
&= \int_0^r 2\pi t\,dt \\
&= \pi r^2.
\end{aligned}
$$

let us take a position that it is easier to rotate on a non dimensional point, than it is to traverse a non dimension.

so our 1-d case can strip integration in $dt$ leaving just integration on the angle, from this perspective we can reason this is volume measurement for a 1d circle. Astutely paradoxical yes, 

$$
\begin{aligned}
C(r)
&= \int_0^{2\pi} r\,d\theta \\
&= r\left[\theta\right]_0^{2\pi} \\
&= 2\pi r.
\end{aligned}
$$

if we were in doubt let consider an alternative notion, that we should strip out rotation and just keep the divergent axis.

$$
\begin{aligned}
R(r)
&= \int_0^r t\,dt \\
&= \left[\frac{t^2}{2}\right]_0^r \\
&= \frac{r^2}{2}.
\end{aligned}
$$



moving anywhere from here is paradoxical, we dont have a pi value to vary over in R(r).



 however we can still ideate the case of C(r) = 1 when r = 1/phi

Let $\pi$ float in this case as $x_{\pi,1}$:

$$C(r)=2x_{\pi,1}r.$$

Set $C(r)=1$ and $r=\frac{1}{\phi}$:

$$1=2x_{\pi,1}\frac{1}{\phi}\;\Rightarrow\;x_{\pi,1}=\frac{\phi}{2}.$$

Numerically, $x_{\pi,1}\approx$ {(() => (Math.PHI / 2).toFixed(18))()} and abs$(x_{\pi,1}-\pi)\approx$ {(() =>
  Math.abs(Math.PHI / 2 - Math.PI).toFixed(18)
)()}.

I find this result rather appealing, this idea we can only continue down the n-gon trail by attempting to rotate over a 1d point (there is no 2d to rotate into), and not being able to continue attempting to extend out of a rotation.  We should remember this as nature totally cool with the idea of you spinning in 1d but not okay with you ending your spin on a different axis you were ever on. spin does not admin the necessisity of perfect extension or compenetration