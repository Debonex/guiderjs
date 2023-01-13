import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Guider, { IGuider, Step } from "@guiderjs/react";
// import Guider, { IGuider, Step } from "@site/../packages/react/src/index";
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
          <span className="text-primary">animated</span> library for creating
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
          ✨ You can customize everything in your guide, popover, overlay or
          animation. And you can also create popover with your UI library.
        </Popover>
      ),
    },
    {
      key: "frameworks",
      target: ".row .col:nth-child(2)",
      popover: (
        <Popover title="🏳‍🌈 Support major frameworks">
          ✨ guiderjs supports major frameworks, including{" "}
          <Link to="/docs/react/Get started">React</Link> and{" "}
          <Link to="/docs/vue3/Get started">Vue3</Link>. You can also use
          guiderjs with
          <Link to="/docs/vanilla/Get started">VanillaJS</Link>.
        </Popover>
      ),
    },
    {
      key: "lightweight",
      target: ".row .col:nth-child(3)",
      popover: (
        <Popover title="⚡ Lightweight">
          ✨ guiderjs has no dependency, super lightweight. code size is less
          than 10 KiB (with minified and gzip).
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
