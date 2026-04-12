import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';
import {BlockMath} from 'react-katex';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className={clsx('hero__title', styles.heroTitle)}>
          MMP
        </Heading>
        <p className={styles.heroSubtitle}>{siteConfig.title}</p>
        <p className={clsx('hero__subtitle', styles.heroTagline)}>{siteConfig.tagline}</p>
        <div className={styles.foundationalIdentity}>
          <BlockMath math={String.raw`(\infty \circlearrowright 0) \circlearrowright (0 \circlearrowright \infty) = \{\}_- \circlearrowright \{\}_+ = \{\{\}\}_+ = 0^0 = 1`} />
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title="Home"
      description={siteConfig.tagline}>
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
