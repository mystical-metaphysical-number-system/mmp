import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

function TheorySvg({className}: {className?: string}) {
  return <img src={useBaseUrl('/img/monad.png')} className={className} style={{objectFit: 'contain'}} />;
}

function ApplicationsSvg({className}: {className?: string}) {
  return <video src={useBaseUrl('/img/dor.webm')} autoPlay muted loop playsInline className={className} style={{objectFit: 'contain'}} />;
}

function ArchaeoSvg({className}: {className?: string}) {
  return <video src={useBaseUrl('/img/thoth-palindrome.webm')} autoPlay muted loop playsInline className={className} style={{objectFit: 'contain'}} />;
}

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Theory',
    Svg: TheorySvg,
    description: (
      <>
      MMP explores number and the nature of the continuum through the lens of length and precision. Leading to rebasing the box maths' collection of empty sets  into knots of the infinite nothingness.
      </>
    ),
  },
  {
    title: 'Archaeo-Arithmetic',
    Svg: ArchaeoSvg,
    description: (
      <>
      MMP was motivated through the geometric perfection of the great pyramid, and postulates the ancients, the direct inheritors of the atlantean tradition, had a more nuanced understanding of how nature absolves itself of incommensurability.
      </>
    ),
  },
  {
    title: 'Applications',
    Svg: ApplicationsSvg,
    description: (
      <>
        Navigate cleanly between pure and applied mathematics — knowing which tool fits which domain. Reframes Bell's inequality, balanced ternary, and the memristor as natural consequences of oriented voids.
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
