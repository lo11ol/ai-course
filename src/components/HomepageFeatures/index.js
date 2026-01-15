import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

// 这里定义首页的三个核心卖点
const FeatureList = [
  {
    title: '🤖 AI 效率工具',
    // 如果你有对应的图片，可以放在 static/img/ 并在下面引用
    // Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        不再被工具奴役，而是让 AI 成为你的超级助理。
        收录 ChatGPT、Midjourney 等前沿工具的最佳实践与避坑指南。
      </>
    ),
  },
  {
    title: '💻 全栈开发实战',
    // Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        打破技术壁垒，从零开始搭建属于你的数字资产。
        提供“一键脚本”与保姆级教程，让非程序员也能拥有独立网站。
      </>
    ),
  },
  {
    title: '🌍 全球化视野',
    // Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        立足国内，放眼全球。
        分享 AWS 国际节点配置、多语言内容分发策略，助你连接世界。
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        {/* 如果不想用默认的 SVG 图片，可以暂时注释掉下面这行，或者换成你自己的 */}
        {/* <Svg className={styles.featureSvg} role="img" /> */}
        <div style={{fontSize: '4rem', marginBottom: '1rem'}}>
           {/* 这里用 Emoji 代替 SVG 图片，更简单直接 */}
           {title.includes('效率') ? '🚀' : title.includes('全栈') ? '💻' : '🌍'}
        </div>
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
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
