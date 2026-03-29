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

$$ V_{sphere} = 1 = \frac{4}{3 x r^3} = \frac{4}{3 \frac{3 \phi^3}{4} r^3} = r^3 \phi^3 $$

rather elegant, but perhaps unduely strange is this elegancy extends into the n-sphere

so if you perform this exerciste in 4 or 5th dimension you will find the approximation

$$ V_{unit-n-sphere} = 1 \approx \phi^n r^n $$

this beauty alone motivates the perspective that the royal cubit wasn't some constant that united just the 2d and 3d, but a general perscription

given the royal cubits use as a volumetric relation, the ratio between the volume of the sphere, and the volume of the box that encloses that sphere, and that

$$ V_{unit-n-box} = 1 = r^n $$

we derive

$$\odot = \frac{V_{\text{unit-}n\text{-sphere}}}{V_{\text{unit-}n\text{-box}}} = \frac{\sum_{n=0}^{\infty} \frac{\phi^n}{2^n}}{10} = \frac{\phi^2}{5} \approx \frac{\pi}{6} $$

which cements the theory that it was a multidimensional interrelator beyond just the 2d and 3d with all the fixings of the egyptian mathematical system, the horus powers of two, the golden mean, pi, and a power of 10. phi pi cubit and the metre all in one



![All dressed](/img/all-dressed.png)
Source pyramid k 2019

