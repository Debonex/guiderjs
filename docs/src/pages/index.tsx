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
      <div className="container py-2">
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
      key: "welcome",
      popover: (
        <Popover title="Hello guiderjs!">
          😉 Welcome to guiderjs. This is a{" "}
          <span className="text-primary">customable</span> and{" "}
          <span className="text-primary">animated</span> library of creating
          user guide on your website.
        </Popover>
      ),
      popoverPosition: "center",
    },
    {
      key: "customizable",
      target: ".row .col:first-child",
      popover: (
        <Popover title="🔧 Customizable">
          ✨ You can customize everything in your guide, and you can also create
          popover with your UI library.
        </Popover>
      ),
    },
    {
      key: "frameworks",
      target: ".row .col:nth-child(2)",
      popover: (
        <Popover title="🏳‍🌈 Support major frameworks">
          ✨ You can customize everything in your guide, and you can also create
          popover with your UI library.
        </Popover>
      ),
    },
    {
      key: "lightweight",
      target: ".row .col:nth-child(3)",
      popover: (
        <Popover title="⚡ Lightweight">
          ✨ You can customize everything in your guide, and you can also create
          popover with your UI library.
        </Popover>
      ),
    },
  ];

  return (
    <GuiderContext.Provider value={{ guider }}>
      <Layout
        title={`Hello from ${siteConfig.title}`}
        description="guiderjs, a customizable and animated library for building user guide in your website."
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
