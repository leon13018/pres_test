import { Fragment } from "react";
import type { CSSProperties } from "react";
import type { ChapterStepProps } from "../../registry/types";
import "./ReadPlan.css";

export default function ReadPlan({ step }: ChapterStepProps) {
  if (step === 0) return <Scene0 />;
  if (step === 1) return <Scene1 />;
  if (step === 2) return <Scene2 />;
  if (step === 3) return <Scene3 />;
  if (step === 4) return <Scene4 />;
  if (step === 5) return <Scene5 />;
  return null;
}

/* ── step 0: 三阶段时间轴概览 ─────────────────────────── */
function Scene0() {
  const phases = [
    { x: 100, name: "研一上", sub: "打基础" },
    { x: 400, name: "研一下", sub: "聚焦方向" },
    { x: 700, name: "研二+",  sub: "深化研究" },
  ];
  return (
    <div className="rpl-scene rpl-s0">
      <p className="rpl-eyebrow">第三部分 · 怎么规划</p>
      <p className="rpl-s0-title">按阶段规划阅读重点</p>
      <svg className="rpl-s0-svg" viewBox="0 0 800 200">
        <line
          className="rpl-s0-rail"
          x1="100" y1="48" x2="700" y2="48"
        />
        {phases.map((p, i) => (
          <g
            key={p.name}
            className="rpl-s0-node-g"
            style={{ animationDelay: `${220 + i * 260}ms` } as CSSProperties}
          >
            <circle className="rpl-s0-dot" cx={p.x} cy={48} r={10} />
            <text className="rpl-s0-node-name" x={p.x} y={108}>{p.name}</text>
            <text className="rpl-s0-node-sub"  x={p.x} y={148}>{p.sub}</text>
          </g>
        ))}
      </svg>
    </div>
  );
}

/* ── step 1: 研一上 ──────────────────────────────────── */
function Scene1() {
  return (
    <div className="rpl-scene rpl-s1">
      <div className="rpl-phase-hd">
        <span className="rpl-phase-hero">研一上</span>
        <span className="rpl-phase-label">打基础阶段</span>
      </div>
      <div className="rpl-s1-reads">
        {(["理论书籍", "综述文章"] as const).map((t, i) => (
          <span
            key={t}
            className="rpl-s1-read"
            style={{ animationDelay: `${240 + i * 200}ms` } as CSSProperties}
          >
            {t}
          </span>
        ))}
      </div>
      <p className="rpl-s1-goal">搭学科框架，了解领域研究现状，为后续选题做准备</p>
    </div>
  );
}

/* ── step 2: 研一下 ──────────────────────────────────── */
function Scene2() {
  const items = [
    { label: "搭文献体系", note: "形成初步研究设计" },
    { label: "比较方法与结论", note: "横向对比不同研究" },
    { label: "找研究空白", note: "这是你研究的切入口" },
  ];
  return (
    <div className="rpl-scene rpl-s2">
      <div className="rpl-phase-hd">
        <span className="rpl-phase-hero">研一下</span>
        <span className="rpl-phase-label">聚焦方向</span>
      </div>
      <div className="rpl-s2-items">
        {items.map((item, i) => (
          <div
            key={item.label}
            className="rpl-s2-item"
            style={{ animationDelay: `${220 + i * 180}ms` } as CSSProperties}
          >
            <span className="rpl-s2-label">{item.label}</span>
            <span className="rpl-s2-note">{item.note}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── step 3: 研二+ ───────────────────────────────────── */
function Scene3() {
  return (
    <div className="rpl-scene rpl-s3">
      <div className="rpl-phase-hd">
        <span className="rpl-phase-hero">研二+</span>
        <span className="rpl-phase-label">深化研究</span>
      </div>
      <div className="rpl-s3-flow">
        <span className="rpl-s3-node">结合写作需要</span>
        <span className="rpl-s3-arrow">→</span>
        <span className="rpl-s3-node rpl-s3-node--accent">针对精读</span>
      </div>
      <p className="rpl-s3-caption">把方法和结论消化进自己的论文里</p>
    </div>
  );
}

/* ── step 4: 专题式阅读法 ─────────────────────────────── */
const TOPIC_STEPS = [
  { num: "①", label: "设专题", detail: "确定研究方向与范围" },
  { num: "②", label: "列关键词", detail: "智能教学工具\n教育数据挖掘" },
  { num: "③", label: "选文献", detail: "10—20 篇\n跨时期跨方法" },
  { num: "④", label: "纵横对比", detail: "纵向演化\n横向异同" },
  { num: "⑤", label: "写报告", detail: "可转化为开题报告\n或综述的一部分" },
];

function Scene4() {
  return (
    <div className="rpl-scene rpl-s4">
      <p className="rpl-s4-title">专题式阅读法</p>
      <div className="rpl-s4-flow">
        {TOPIC_STEPS.map((s, i) => (
          <Fragment key={s.num}>
            <div
              className="rpl-s4-step"
              style={{ animationDelay: `${140 + i * 150}ms` } as CSSProperties}
            >
              <span className="rpl-s4-num">{s.num}</span>
              <span className="rpl-s4-step-label">{s.label}</span>
              <span className="rpl-s4-detail">{s.detail}</span>
            </div>
            {i < TOPIC_STEPS.length - 1 && (
              <span
                className="rpl-s4-arrow"
                style={{ animationDelay: `${200 + i * 150}ms` } as CSSProperties}
              >
                →
              </span>
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
}

/* ── step 5: 阅读小组 ────────────────────────────────── */
function Scene5() {
  return (
    <div className="rpl-scene rpl-s5">
      <div className="rpl-s5-top">
        <span className="rpl-s5-size">3—5</span>
        <div className="rpl-s5-top-labels">
          <span className="rpl-s5-unit">人</span>
          <span className="rpl-s5-freq">每周一次</span>
        </div>
      </div>
      <div className="rpl-s5-format">
        <div className="rpl-s5-block" style={{ animationDelay: "220ms" } as CSSProperties}>
          <span className="rpl-s5-mins">10</span>
          <span className="rpl-s5-min-label">分钟</span>
          <span className="rpl-s5-role">讲论文内容与亮点</span>
        </div>
        <div className="rpl-s5-plus">+</div>
        <div className="rpl-s5-block" style={{ animationDelay: "380ms" } as CSSProperties}>
          <span className="rpl-s5-mins">10</span>
          <span className="rpl-s5-min-label">分钟</span>
          <span className="rpl-s5-role">集中讨论，发表看法</span>
        </div>
      </div>
      <p className="rpl-s5-quote">一句话，有时能让你重新理解一篇读了三遍的论文</p>
    </div>
  );
}
