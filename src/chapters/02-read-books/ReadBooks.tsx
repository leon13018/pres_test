import type { CSSProperties } from "react";
import type { ChapterStepProps } from "../../registry/types";
import "./ReadBooks.css";

export default function ReadBooks({ step }: ChapterStepProps) {
  if (step === 0) return <Scene0 />;
  if (step === 1) return <Scene1 />;
  if (step === 2) return <Scene2 />;
  if (step === 3) return <Scene3 />;
  return null;
}

/* ── step 0: 从奠基人著作读起 ────────────────────────────── */
function Scene0() {
  const books: Array<{ h: number; delay: number; hero?: boolean }> = [
    { h: 145, delay: 0 },
    { h: 172, delay: 90 },
    { h: 198, delay: 50 },
    { h: 232, delay: 180, hero: true },
    { h: 196, delay: 120 },
    { h: 168, delay: 250 },
    { h: 148, delay: 310 },
  ];

  return (
    <div className="rb-scene rb-s0">
      <p className="rb-s0-eyebrow">第一类文献</p>
      <div className="rb-shelf">
        {books.map((b, i) => (
          <div
            key={i}
            className={`rb-book${b.hero ? " rb-book--hero" : ""}`}
            style={{
              "--bh": `${b.h}px`,
              animationDelay: `${b.delay}ms`,
            } as CSSProperties}
          />
        ))}
      </div>
      <h2 className="rb-s0-title">
        从<span className="rb-yellow">"奠基人"</span>著作读起
      </h2>
      <div className="rb-s0-tags">
        <span className="rb-tag">学科框架</span>
        <span className="rb-tag-sep">·</span>
        <span className="rb-tag">发展脉络</span>
        <span className="rb-tag-sep">·</span>
        <span className="rb-tag">核心理论</span>
      </div>
    </div>
  );
}

/* ── step 1: 带注释版本 + 导读资料 = 隐形导师 ───────────── */
function Scene1() {
  return (
    <div className="rb-scene rb-s1">
      <p className="rb-s1-lead">读得费力？有个窍门</p>
      <div className="rb-equation">
        <div className="rb-eq-card rb-eq-a">
          <span className="rb-eq-label">带注释版本</span>
        </div>
        <span className="rb-eq-op rb-eq-plus">＋</span>
        <div className="rb-eq-card rb-eq-b">
          <span className="rb-eq-label">导读资料</span>
        </div>
        <span className="rb-eq-op rb-eq-eq">=</span>
        <div className="rb-eq-card rb-eq-result">
          <span className="rb-eq-label rb-yellow">隐形导师</span>
          <span className="rb-eq-sub">理解难点的无形帮手</span>
        </div>
      </div>
    </div>
  );
}

/* ── step 2: 每月至少精读 1 本 ───────────────────────────── */
function Scene2() {
  return (
    <div className="rb-scene rb-s2">
      <div className="rb-s2-hero">
        <span className="rb-s2-num">1</span>
        <div className="rb-s2-unit-group">
          <span className="rb-s2-unit">本</span>
          <span className="rb-s2-per">每月</span>
        </div>
      </div>
      <p className="rb-s2-rule">每月至少精读一本经典著作</p>
      <div className="rb-s2-ticks">
        {Array.from({ length: 12 }, (_, i) => (
          <div
            key={i}
            className="rb-tick"
            style={{ animationDelay: `${320 + i * 55}ms` } as CSSProperties}
          />
        ))}
      </div>
      <p className="rb-s2-caption">长期读书计划 · 全年 12 本</p>
    </div>
  );
}

/* ── step 3: 读书笔记三要素 ──────────────────────────────── */
function Scene3() {
  const items = [
    { label: "重点内容", sub: "方便日后复习回顾" },
    { label: "思考感悟", sub: "记录自己的思维过程" },
    { label: "疑问",    sub: "驱动下一轮深读" },
  ];

  return (
    <div className="rb-scene rb-s3">
      <p className="rb-s3-intro">写读书笔记，记三件事</p>
      <div className="rb-s3-list">
        {items.map((item, i) => (
          <div
            key={item.label}
            className="rb-s3-item"
            style={{ "--i": i } as CSSProperties}
          >
            <span className="rb-s3-num">{i + 1}</span>
            <div className="rb-s3-body">
              <span className="rb-s3-label">{item.label}</span>
              <span className="rb-s3-sub">{item.sub}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
