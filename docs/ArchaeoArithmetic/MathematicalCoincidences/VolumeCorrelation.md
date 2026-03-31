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










$$ V_{unit-n-sphere} = 1 \approx \phi^n r^n $$

this beauty alone motivates the perspective that the royal cubit wasn't some constant that united just the 2d and 3d, but a general perscription

given the royal cubits use as a volumetric relation, the ratio between the volume of the sphere, and the volume of the box that encloses that sphere, and that

$$ V_{unit-n-box} = 1 = r^n $$

for example, in 4 dimensions

$$ V_{4-sphere} = \frac{\pi^2}{2}r^4$$

what is the imp

we derive

$$\odot = \frac{V_{\text{unit-}n\text{-sphere}}}{V_{\text{unit-}n\text{-box}}} = \frac{\sum_{n=0}^{\infty} \frac{\phi^n}{2^n}}{10} = \frac{\phi^2}{5} \approx \frac{\pi}{6} $$

which cements the theory that it was a multidimensional interrelator beyond just the 2d and 3d with all the fixings of the egyptian mathematical system, the horus powers of two, the golden mean, pi, and a power of 10. phi pi cubit and the metre all in one



![All dressed](/img/all-dressed.png)
Source pyramid k 2019



## Test B Approximations of horus eye fractsion

sum 0..6
sum 0..3