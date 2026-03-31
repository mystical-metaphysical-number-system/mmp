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

Additionally we find its diameter

While one may keen to cast this aside, when possessed of the mystery of the royal cubit and the mathematical relationship that

$$\pi/6 \approx \phi^2/5$$

Numerically, $\pi/6 \approx$ {(() => (Math.PI / 6).toFixed(6))()} and $\phi^2/5 \approx$ {(() => ((Math.PHI ** 2) / 5).toFixed(6))()}; $\lvert \pi/6 - \phi^2/5\rvert \approx$ {(() =>
  Math.abs(Math.PI / 6 - (Math.PHI ** 2) / 5).toFixed(12)
)()}.

<DocImg src="/img/cubit-mystery.jpg" style={{maxWidth: '100%'}} />

*Source* [Geometry of Time via the Metre, Egyptian Royal Cubit & the Great Pyramid](https://www.youtube.com/watch?v=f_UHNpQLmYM)
*Source* [The Movie Great Pyramid K 2019 - Director Fehmi Krasniqi](https://www.youtube.com/watch?v=KMAtkjy_YK4)


If one were to approach the volume of forms without the modern trigonometry that relies on the arc length of the circle, such as the babylonians in plimpton 322 with their focus on exact ratios of right angle triangles instead of angles and sohcahtoa.


<DocVideo src="/img/322-descent.webm" />

[Plimpton 322 is Babylonian exact sexagesimal trigonometry](https://www.sciencedirect.com/science/article/pii/S0315086017300691)


:::info[Quote — Mansfield & Wildberger, Historia Mathematica 44 (2017)]
A modern trigonometric table is a list of right triangles with hypotenuse 1 and approximations to the side lengths sin θ and cos θ, along with the ratio tan θ = sin θ/ cos θ. We propose that P322 is a different kind of trigonometric table which lists right triangles with long side 1, exact short side β and exact diagonal δ – in place of the approximations sin θ and cos θ. The ratios β/δ or δ/β (equivalent to tan θ) are not given because they cannot be calculated exactly on account of the divisions involved. Instead P322 separates this information into three exact numbers: a related squared ratio which can be used as an index, and simplified values b and d for β and δ which allow the user to make their own approximation to these ratios.
:::

This makes this coincidence quite interesting, as this makes their volume relations not correspond with arc's or angles, defeating the justification to put $\pi$ in the volume of sphere. [Deriving the volume of a sphere](https://tutorial.math.lamar.edu/classes/calciii/tisphericalcoords.aspx) If pi was not such an easy commance in the ancient world, than it begs to question how they reasoned and calculated the volume of forms.  It would've made a fatally obscure "error" to attempt to fill a cube with water with known length, and than see how much water is left or missing when pouring it into a sphere of known diameter- they could've easily assumed at this level of tolerance that there was a fundemental extreme and mean identity between the cube and sphere as is the line AB divided at point C is extreme and mean ratio if  AC = AC:CB.  But no matter of their persuasions, it begs the question, if pi was the mystery number and they derived the volumes by hand with water buckets, what would've they put in place for pi?


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

$$ V_{sphere} \over V_{box} = \frac{\phi^3}{8} = \frac{\phi^3}{2^3} $$

to find a pattern amongst the nth dimension we prod the 2 dimensional case in light of these revelations

if we were consider a sort of strange mathematical universe that neglects $\pi$ as a natural constant, that universe is not obligated to obey pi, but is destined to disintemediate pressure somewhat uniformly about its degrees of freedom ie its dimensional axies.

<DocVideo src="https://www.youtube.com/watch?v=6dTyOl1fmDo" />

Source: [https://www.youtube.com/watch?v=6dTyOl1fmDo](https://www.youtube.com/watch?v=6dTyOl1fmDo)

<DocImg src="/img/pi-pressure-cubit.png" style={{maxWidth: '100%'}} />

What's interesting here is an incommensurable angle when they require $\pi$ from the collision (pressure disintermediation) of two blocks. The cubit makes the relationship multidimensional: a circle of diameter 1 has an arc length of $6 \cdot \text{cubit}$, and the ratio between the volume of a sphere and the volume of the enclosing box is the cubit as well.

A pleasing notion that the incommensurability brought forth in the is pi method is now not stuffed into a corner per say, but kinda distributed six wise along the cirle

the experiment in the least and be confirmed below in the second dimension and again in the 4th




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

$$ V_{4-box} = (2r)^4 $$

$$\frac{V_{4\text{-sphere}}}{V_{4\text{-box}}}=\frac{\frac{\pi^2}{2}r^4}{2^4r^4}$$
$$=\frac{\pi^2}{2^5}=\frac{\pi^2}{32}$$

let us aproach the formula blindly again, without a knowledge of pi,  but from a reasoning about the relationship between the 4-sphere and the 4-volume.

$$\odot_4 = \frac{\pi^2}{2}$$

and if we commit to approximate pi with phi

$$ \odot_4 = \frac{\frac{6 \phi^2}{5}^2}{2} $$

So in powers of $\phi$ only:

$$\odot_4 = \frac{18}{25}\phi^4.$$

Numerically, $\odot_4 \approx$ {(() => ((((6 * Math.PHI ** 2) / 5) ** 2) / 2).toFixed(6))()} and $\left|\frac{\pi^2}{2} - \odot_4\right| \approx$ {(() =>
  Math.abs((Math.PI ** 2) / 2 - (((6 * Math.PHI ** 2) / 5) ** 2) / 2).toFixed(6)
)()}.

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

**2D** — $A=x_{\pi,2}r^2$, $x_{\pi,2}=\phi^2$:
$$A=\phi^2 r^2\;\Rightarrow\; 1=(\phi r)^2\checkmark$$

**3D** — $V=\frac{4}{3}x_{\pi,3}r^3$, $x_{\pi,3}=\frac{3\phi^3}{4}$ (note $\frac{4}{3}\cdot\frac{3}{4}=1$):
$$V=\frac{4}{3}\cdot\frac{3\phi^3}{4}r^3=\phi^3 r^3\;\Rightarrow\; 1=(\phi r)^3\checkmark$$

Numerically, $x_{\pi,3}\approx$ {(() => ((3 * Math.PHI ** 3) / 4).toFixed(18))()} and $\left|x_{\pi,3}-\pi\right|\approx$ {(() =>
  Math.abs((3 * Math.PHI ** 3) / 4 - Math.PI).toFixed(18)
)()}.

**4D** — $V=\frac{x_{\pi,4}^2}{2}r^4$, $x_{\pi,4}=\phi^2\sqrt{2}$ (note $\frac{(\phi^2\sqrt{2})^2}{2}=\frac{2\phi^4}{2}=\phi^4$):
$$V=\frac{x_{\pi,4}^2}{2}r^4=\phi^4 r^4\;\Rightarrow\; 1=(\phi r)^4\checkmark$$

Numerically, $x_{\pi,4}\approx$ {(() => (Math.PHI ** 2 * Math.sqrt(2)).toFixed(18))()} and $\left|x_{\pi,4}-\pi\right|\approx$ {(() =>
  Math.abs(Math.PHI ** 2 * Math.sqrt(2) - Math.PI).toFixed(18)
)()}.

**5D** — $V=\frac{8x_{\pi,5}^2}{15}r^5$, $x_{\pi,5}=\sqrt{\frac{15\phi^5}{8}}$ (note $\frac{8}{15}\cdot\frac{15\phi^5}{8}=\phi^5$):
$$V=\frac{8x_{\pi,5}^2}{15}r^5=\phi^5 r^5\;\Rightarrow\; 1=(\phi r)^5\checkmark$$

Numerically, $x_{\pi,5}\approx$ {(() => Math.sqrt((15 * Math.PHI ** 5) / 8).toFixed(18))()} and $\left|x_{\pi,5}-\pi\right|\approx$ {(() =>
  Math.abs(Math.sqrt((15 * Math.PHI ** 5) / 8) - Math.PI).toFixed(18)
)()}.


**6D** — $V=\frac{x_{\pi,6}^3}{6}r^6$, $x_{\pi,6}^3=6\phi^6$ (note $\frac{6}{6}=1$):
$$V=\frac{6\phi^6}{6}r^6=\phi^6 r^6\;\Rightarrow\; 1=(\phi r)^6\checkmark \quad x_{\pi,6}=6^{1/3}\phi^2$$

Numerically, $x_{\pi,6}\approx$ {(() => (6 ** (1/3) * Math.PHI ** 2).toFixed(18))()} and $\left|x_{\pi,6}-\pi\right|\approx$ {(() =>
  Math.abs(6 ** (1/3) * Math.PHI ** 2 - Math.PI).toFixed(18)
)()}.

**7D** — $V=\frac{16x_{\pi,7}^3}{105}r^7$, $x_{\pi,7}^3=\frac{105\phi^7}{16}$ (note $\frac{16}{105}\cdot\frac{105}{16}=1$):
$$V=\phi^7 r^7\;\Rightarrow\; 1=(\phi r)^7\checkmark \quad x_{\pi,7}=\left(\frac{105\phi^7}{16}\right)^{1/3}$$

Numerically, $x_{\pi,7}\approx$ {(() => ((105 * Math.PHI ** 7) / 16) ** (1/3).toFixed(18))()} and $\left|x_{\pi,7}-\pi\right|\approx$ {(() =>
  Math.abs(((105 * Math.PHI ** 7) / 16) ** (1/3) - Math.PI).toFixed(18)
)()}.

**8D** — $V=\frac{x_{\pi,8}^4}{24}r^8$, $x_{\pi,8}^4=24\phi^8$ (note $\frac{24}{24}=1$):
$$V=\phi^8 r^8\;\Rightarrow\; 1=(\phi r)^8\checkmark \quad x_{\pi,8}=24^{1/4}\phi^2$$

Numerically, $x_{\pi,8}\approx$ {(() => (24 ** (1/4) * Math.PHI ** 2).toFixed(18))()} and $\left|x_{\pi,8}-\pi\right|\approx$ {(() =>
  Math.abs(24 ** (1/4) * Math.PHI ** 2 - Math.PI).toFixed(18)
)()}.

In every dimension the prefactor constants are precisely the inverse of the volume-formula coefficient — $\frac{4}{3}\leftrightarrow\frac{3}{4}$, $\frac{1}{2}\leftrightarrow 2$, $\frac{8}{15}\leftrightarrow\frac{15}{8}$ — so they annihilate, and the whole tower collapses to the single statement

$$1=(\phi r)^n.$$


Now, remembering that the cubit is hypothesized as a dimension climbing device, so now we have strange values of pi that correspond to each dimension, that 'warp' the field to make th mathematical coincidence mathematical fact- its this extreme and mean proportion abuse that makes it a n+1th dimension commensurability resolver

remember we were reasoning about the ratio of volume of the sphere and the volume of the box, let us now use our unique values of pi corresponding to each dimension and see $ y_{\odot,n} $

$$y_{\odot,3}=\frac{\phi^3}{8}\approx\frac{\pi}{6}$$
{(() => (Math.PHI**3/8).toFixed(18))()} diff $\left|\phi^3/8-\pi/6\right|\approx$ {(() => Math.abs(Math.PHI**3/8 - Math.PI/6).toFixed(18))()}

$$y_{\odot,4}=\frac{\phi^4}{16}\approx\frac{\pi^2}{32}$$
{(() => (Math.PHI**4/16).toFixed(18))()} diff $\left|\phi^4/16-\pi^2/32\right|\approx$ {(() => Math.abs(Math.PHI**4/16 - Math.PI**2/32).toFixed(18))()}

$$y_{\odot,5}=\frac{\phi^5}{32}\approx\frac{\pi^2}{60}$$
{(() => (Math.PHI**5/32).toFixed(18))()} diff $\left|\phi^5/32-\pi^2/60\right|\approx$ {(() => Math.abs(Math.PHI**5/32 - Math.PI**2/60).toFixed(18))()}

$$y_{\odot,6}=\frac{\phi^6}{64}\approx\frac{\pi^3}{384}$$
{(() => (Math.PHI**6/64).toFixed(18))()} diff $\left|\phi^6/64-\pi^3/384\right|\approx$ {(() => Math.abs(Math.PHI**6/64 - Math.PI**3/384).toFixed(18))()}

$$y_{\odot,7}=\frac{\phi^7}{128}\approx\frac{\pi^3}{840}$$
{(() => (Math.PHI**7/128).toFixed(18))()} diff $\left|\phi^7/128-\pi^3/840\right|\approx$ {(() => Math.abs(Math.PHI**7/128 - Math.PI**3/840).toFixed(18))()}

$$y_{\odot,8}=\frac{\phi^8}{256}\approx\frac{\pi^4}{6144}$$
{(() => (Math.PHI**8/256).toFixed(18))()} diff $\left|\phi^8/256-\pi^4/6144\right|\approx$ {(() => Math.abs(Math.PHI**8/256 - Math.PI**4/6144).toFixed(18))()}


Now the revelation becomes quite translucent, we have our horus eye fractions cutting powers of the golden ratio, formally we derive

$$\odot = \frac{V_{\text{unit-}n\text{-sphere}}}{V_{\text{unit-}n\text{-box}}} = \frac{\sum_{n=0}^{\infty} \frac{\phi^n}{2^n}}{10} = \frac{\phi^2}{5} \approx \frac{\pi}{6} $$

which cements the theory that it was a multidimensional interrelator beyond just the 2d and 3d with all the fixings of the egyptian mathematical system, the horus powers of two, the golden mean, pi, and powers of 10. phi pi cubit and the metre all in one. and shows how this process loops back into itself with commensurate perfection suggesting nature uses phi not pi.

![All dressed](/img/all-dressed.png)
Source pyramid k 2019