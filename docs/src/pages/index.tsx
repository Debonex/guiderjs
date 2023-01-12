import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Guider, { IGuider, Step } from "@guiderjs/react";
import HomepageFeatures from "@site/src/components/HomepageFeatures";
import GuiderContext from "@site/src/misc/GuiderContext";
import Layout from "@theme/Layout";
import clsx from "clsx";
import React, { useContext, useRef } from "react";
import Popover from "@site/src/components/Popover";

import styles from "./index.module.css";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  const { guider } = useContext(GuiderContext);
  return (
    <header className={clsx("hero hero--primary", styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={clsx(styles.buttons, "gap-4")}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro"
          >
            Get started
          </Link>
          <div
            className="button button--secondary button--lg"
            onClick={() => guider.current.start()}
          >
            Preview
          </div>
        </div>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  const guider = useRef<IGuider>();

  const guiderSteps: Step[] = [
    {
      key: "hero",
      target: ".hero .container",
      popover: <Popover title="Hello world!" content="Welcome to guiderjs." />,
      popoverPosition: "center",
    },
  ];

  return (
    <GuiderContext.Provider value={{ guider }}>
      <Layout
        title={`Hello from ${siteConfig.title}`}
        description="guiderjs, a customizable and animated library for building guide in your website."
      >
        <HomepageHeader />
        <main>
          <HomepageFeatures />
        </main>
        <Guider steps={guiderSteps} ref={guider} />
      </Layout>
    </GuiderContext.Provider>
  );
}
