import type { CSSProperties } from "react";
import type { ChapterStepProps } from "../../registry/types";
import "./ReadPapers.css";

export default function ReadPapers({ step }: ChapterStepProps) {
  if (step === 0) return <Scene0 />;
  if (step === 1) return <Scene1 />;
  if (step === 2) return <Scene2 />;
  if (step === 3) return <Scene3 />;
  if (step === 4) return <Scene4 />;
  if (step === 5) return <Scene5 />;
  if (step === 6) return <Scene6 />;
  return null;
}

/* ── step 0: 第二类 — 学术论文 + 三大平台 ─────────────── */
function Scene0() {
  const platforms = ["知网", "Web of Science", "Google Scholar"];

  return (
    <div className="rp-scene rp-s0">
      <p className="rp-eyebrow">第二类文献</p>
      <h2 className="rp-s0-title">学术论文</h2>
      <p className="rp-s0-sub">研究生阶段的"货币"</p>
      <div className="rp-platforms">
        {platforms.map((name, i) => (
          <span
            key={name}
            className="rp-platform"
            style={{ animationDelay: `${520 + i * 200}ms` } as CSSProperties}
          >
            {name}
          </span>
        ))}
      </div>
      <p className="rp-s0-tip">设关键词 · 定期追踪 · 不脱节</p>
    </div>
  );
}

/* ── step 1: 三类优先（逐条慢揭示） ──────────────────── */
function Scene1() {
  const types = [
    { label: "高被引论文", desc: "代表领域内公认重要的成果" },
    { label: "综述文章",   desc: "一篇摸清一个方向的发展历程" },
    { label: "权威期刊",   desc: "质量与创新性有底线" },
  ];

  return (
    <div className="rp-scene rp-s1">
      <p className="rp-s1-header">看哪些论文？三类优先</p>
      <div className="rp-typelist">
        {types.map((t, i) => (
          <div
            key={t.label}
            className="rp-type-row"
            style={{ animationDelay: `${360 + i * 1200}ms` } as CSSProperties}
          >
            <span className="rp-type-num hero-num">{i + 1}</span>
            <div className="rp-type-body">
              <span className="rp-type-label">{t.label}</span>
              <span className="rp-type-desc">{t.desc}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── step 2: 引入四要素框架 ───────────────────────────── */
function Scene2() {
  return (
    <div className="rp-scene rp-s2">
      <p className="rp-s2-premise">读论文不是逛文章</p>
      <p className="rp-s2-premise rp-s2-line2">
        而是在做<span className="rp-accent">批判性评估</span>
      </p>
      <hr className="rule rp-s2-divider" />
      <p className="rp-s2-hook">
        我盯<span className="rp-accent">四个要素</span>
      </p>
    </div>
  );
}

/* ── step 3: 要素一：研究问题 ─────────────────────────── */
function Scene3() {
  return (
    <div className="rp-scene rp-s-elem">
      <div className="rp-elem-card">
        <span className="rp-elem-num hero-num">1</span>
        <div className="rp-elem-body">
          <span className="rp-elem-label">研究问题</span>
          <span className="rp-elem-q">作者想解决什么？</span>
        </div>
      </div>
    </div>
  );
}

/* ── step 4: 要素二：方法设计 ─────────────────────────── */
function Scene4() {
  return (
    <div className="rp-scene rp-s-elem">
      <div className="rp-elem-card">
        <span className="rp-elem-num hero-num">2</span>
        <div className="rp-elem-body">
          <span className="rp-elem-label">方法设计</span>
          <span className="rp-elem-q">路子合理吗？</span>
        </div>
      </div>
    </div>
  );
}

/* ── step 5: 要素三 + 要素四 ──────────────────────────── */
function Scene5() {
  const items = [
    { n: "3", label: "数据分析", q: "数字严不严谨？" },
    { n: "4", label: "结论讨论", q: "这个结论站得住吗？" },
  ];

  return (
    <div className="rp-scene rp-s5">
      {items.map((item, i) => (
        <div
          key={item.n}
          className="rp-elem-card rp-s5-card"
          style={{ animationDelay: `${i * 500}ms` } as CSSProperties}
        >
          <span className="rp-elem-num rp-s5-num hero-num">{item.n}</span>
          <div className="rp-elem-body rp-s5-body">
            <span className="rp-elem-label rp-s5-label">{item.label}</span>
            <span className="rp-elem-q rp-s5-q">{item.q}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── step 6: 批判性总结 ────────────────────────────────── */
function Scene6() {
  return (
    <div className="rp-scene rp-s6">
      <div className="rp-contrast">
        <div className="rp-c-left">
          <span className="rp-c-word rp-c-stale">逛文章</span>
          <span className="rp-c-tag">被动接收</span>
        </div>
        <span className="rp-c-arrow">→</span>
        <div className="rp-c-right">
          <span className="rp-c-word rp-accent">批判性评估</span>
          <span className="rp-c-tag rp-accent">自己做判断</span>
        </div>
      </div>
      <p className="rp-s6-quote">批判性思维，就是这么练出来的</p>
    </div>
  );
}
