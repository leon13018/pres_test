import type { CSSProperties } from "react";
import type { ChapterStepProps } from "../../registry/types";
import "./Hook.css";

export default function Hook({ step }: ChapterStepProps) {
  if (step === 0) return <Scene0 />;
  if (step === 1) return <Scene1 />;
  if (step === 2) return <Scene2 />;
  return null;
}

/* ── step 0: 文献堆成山 ──────────────────────────────────── */
function Scene0() {
  const docs: Array<{ dx: number; dy: number; rot: number; delay: number }> = [
    { dx: -30, dy:  8,  rot: -9,  delay:   0 },
    { dx:  22, dy: -6,  rot:  5,  delay: 100 },
    { dx: -14, dy: 16,  rot: -6,  delay: 200 },
    { dx:  28, dy:  4,  rot:  9,  delay: 290 },
    { dx:  -4, dy: -12, rot: -3,  delay: 370 },
    { dx:  16, dy: 12,  rot:  7,  delay: 450 },
    { dx: -24, dy: -2,  rot: -12, delay: 520 },
  ];

  return (
    <div className="hk-scene hk-s0">
      <h1 className="hk-s0-title">研一第一个月</h1>
      <p className="hk-s0-sub">大概每个人都会撞上同一件事</p>
      <div className="hk-s0-pile">
        {docs.map((d, i) => (
          <div
            key={i}
            className="hk-doc"
            style={{
              "--dx": `${d.dx}px`,
              "--dy": `${d.dy}px`,
              "--rot": `${d.rot}deg`,
              animationDelay: `${d.delay}ms`,
            } as CSSProperties}
          />
        ))}
      </div>
      <p className="hk-s0-punch">
        导师扔来一堆文献——<span className="hk-yellow">根本看不完</span>
      </p>
    </div>
  );
}

/* ── step 1: 本科 vs 研究生 ──────────────────────────────── */
function Scene1() {
  return (
    <div className="hk-scene hk-s1">
      <div className="hk-s1-compare">
        {/* 左：本科 */}
        <div className="hk-s1-side hk-s1-left">
          <span className="hk-s1-era">本科</span>
          <div className="hk-s1-flow">
            <span className="hk-s1-arrow">←</span>
            <span className="hk-s1-flow-text">知识送上门</span>
          </div>
          <span className="hk-s1-tag">被动接收</span>
        </div>

        {/* 中：分隔 */}
        <div className="hk-s1-mid">
          <div className="hk-s1-vline" />
          <span className="hk-s1-vs">VS</span>
          <div className="hk-s1-vline" />
        </div>

        {/* 右：研究生 */}
        <div className="hk-s1-side hk-s1-right">
          <span className="hk-s1-era hk-yellow">研究生</span>
          <div className="hk-s1-flow">
            <span className="hk-s1-flow-text">主动生产知识</span>
            <span className="hk-s1-arrow hk-yellow">→</span>
          </div>
          <span className="hk-s1-tag hk-yellow">主动创造</span>
        </div>
      </div>

      {/* article 信息池：原文名句 */}
      <blockquote className="hk-s1-quote">
        "从知识的浅滩，迈向学术的深海"
      </blockquote>
    </div>
  );
}

/* ── step 2: 三件事预告 ──────────────────────────────────── */
function Scene2() {
  const items = ["读什么", "怎么读", "怎么规划"] as const;

  return (
    <div className="hk-scene hk-s2">
      <p className="hk-s2-intro">今天聊三件事</p>
      <div className="hk-s2-row">
        {items.map((label, i) => (
          <div
            key={label}
            className="hk-s2-item"
            style={{ "--i": i } as CSSProperties}
          >
            <span className="hk-s2-num hero-num">{i + 1}</span>
            <hr className="hk-s2-tick rule" />
            <span className="hk-s2-label">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
