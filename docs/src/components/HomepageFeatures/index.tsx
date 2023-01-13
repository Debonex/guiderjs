import Link from "@docusaurus/Link";
import clsx from "clsx";
import React from "react";
import styles from "./styles.module.css";

type FeatureItem = {
  title: string;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: "🔧 Customizable",
    description: (
      <>
        ✨ You can customize everything in your guide, and you can also create
        popover with your UI library.
      </>
    ),
  },
  {
    title: "🏳‍🌈 Support major frameworks",
    description: (
      <>
        ✨ guiderjs supports major frameworks, including{" "}
        <Link to="/docs/react/Get started">React</Link> and{" "}
        <Link to="/docs/vue3/Get started">Vue3</Link>. You can also use guiderjs
        with <Link to="/docs/vanilla/Get started">VanillaJS</Link>.
      </>
    ),
  },
  {
    title: "⚡ Lightweight",
    description: (
      <>
        ✨ guiderjs has no dependency, super lightweight. code size is less than
        10 KiB (with minified and gzip).
      </>
    ),
  },
];

function Feature({ title, description }: FeatureItem) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center padding-horiz--md py-2">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
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
