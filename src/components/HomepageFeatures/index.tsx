import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

function NumberSvg({className}: {className?: string}) {
  return <video src="/img/equation.webm" autoPlay muted loop playsInline className={className} style={{objectFit: 'contain'}} />;
}

function ArchaeoSvg({className}: {className?: string}) {
  return <video src="/img/dor.webm" autoPlay muted loop playsInline className={className} style={{objectFit: 'contain'}} />;
}

function BoxSvg({className}: {className?: string}) {
  return <video src="/img/thoth-palindrome.webm" autoPlay muted loop playsInline className={className} style={{objectFit: 'contain'}} />;
}

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Number',
    Svg: NumberSvg,
    description: (
      <>
        Length and precision, physical and metaphysical, the boundary paradox,
        and the infinite nothingness.
      </>
    ),
  },
  {
    title: 'ArchaeoArithmetic',
    Svg: ArchaeoSvg,
    description: (
      <>
        The Great Pyramid, the cubit, π through φ, precession and the Great Year —
        ancient mathematics through an MMP lens.
      </>
    ),
  },
  {
    title: 'Box Math',
    Svg: BoxSvg,
    description: (
      <>
        Arithmetic founded on the infinite nothingness, not the empty box.
        Numbers as knots. Encodes directly to computation.
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
