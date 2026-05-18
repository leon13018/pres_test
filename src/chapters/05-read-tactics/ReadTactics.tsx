import { Fragment } from "react";
import type { CSSProperties } from "react";
import type { ChapterStepProps } from "../../registry/types";
import "./ReadTactics.css";

export default function ReadTactics({ step }: ChapterStepProps) {
  if (step === 0) return <Scene0 />;
  if (step === 1) return <Scene1 />;
  if (step === 2) return <Scene2 />;
  if (step === 3) return <Scene3 />;
  if (step === 4) return <Scene4 />;
  if (step === 5) return <Scene5 />;
  return null;
}

/* ── step 0: 精读 vs 泛读 对比 ──────────────────────────── */
function Scene0() {
  return (
    <div className="rt-scene rt-s0">
      <p className="rt-eyebrow">第二部分 · 怎么读</p>
      <div className="rt-s0-compare">
        <div className="rt-s0-side rt-s0-left">
          <span className="rt-s0-label">精读</span>
          <span className="rt-s0-when">适用场景</span>
          <div className="rt-s0-chips">
            <span className="rt-s0-chip">核心理论</span>
            <span className="rt-s0-chip">重点论文</span>
            <span className="rt-s0-chip">准备引用的材料</span>
          </div>
        </div>
        <div className="rt-s0-vline" />
        <div className="rt-s0-side rt-s0-right">
          <span className="rt-s0-label">泛读</span>
          <span className="rt-s0-when">适用场景</span>
          <div className="rt-s0-chips">
            <span className="rt-s0-chip">快速浏览文献</span>
            <span className="rt-s0-chip">获取研究动态</span>
            <span className="rt-s0-chip">构建背景知识</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── step 1: 圈·批·卡·摘 英雄字 ──────────────────────────── */
function Scene1() {
  const items = [
    { char: "圈", sub: "关键概念" },
    { char: "批", sub: "写批注" },
    { char: "卡", sub: "做卡片" },
    { char: "摘", sub: "整理摘录" },
  ];

  return (
    <div className="rt-scene rt-s1">
      <p className="rt-s1-method">精读四步法</p>
      <div className="rt-s1-chars">
        {items.map((item, i) => (
          <Fragment key={item.char}>
            <div
              className="rt-s1-unit"
              style={{ animationDelay: `${80 + i * 180}ms` } as CSSProperties}
            >
              <span className="rt-s1-char">{item.char}</span>
              <span className="rt-s1-sub">{item.sub}</span>
            </div>
            {i < items.length - 1 && (
              <span
                className="rt-s1-dot"
                style={{ animationDelay: `${160 + i * 180}ms` } as CSSProperties}
              >
                ·
              </span>
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
}

/* ── step 2: 四步详解 ────────────────────────────────────── */
function Scene2() {
  const rows = [
    { key: "圈", op: "圈关键概念、重要结论和论证核心语句", purpose: "方便复习回顾" },
    { key: "批", op: "写下理解、疑问、思考或相关联想", purpose: "深入理解，记录思维过程" },
    { key: "卡", op: "整理重要知识点、数据、案例等", purpose: "分类保存，便于查阅" },
    { key: "摘", op: "摘录有启发的段落和语句", purpose: "形成素材库，为写作提供素材" },
  ];

  return (
    <div className="rt-scene rt-s2">
      <p className="rt-s2-title">每一步的意义</p>
      <div className="rt-s2-table">
        {rows.map((r) => (
          <div key={r.key} className="rt-s2-row">
            <span className="rt-s2-key">{r.key}</span>
            <span className="rt-s2-op">{r.op}</span>
            <span className="rt-s2-purpose">{r.purpose}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── SQ3R 共用 ──────────────────────────────────────────── */
type SqrState = "active" | "done" | "pending";

interface SqrStep {
  letter: string;
  word: string;
  desc: string;
  state: SqrState;
}

function SqrFlow({
  steps,
  stepDelays,
  arrowDelays,
}: {
  steps: SqrStep[];
  stepDelays: number[];
  arrowDelays: number[];
}) {
  return (
    <div className="rt-sqr-flow">
      {steps.map((s, i) => (
        <Fragment key={i}>
          <div
            className={`rt-sqr-step rt-sqr-step--${s.state}`}
            style={{ animationDelay: `${stepDelays[i]}ms` } as CSSProperties}
          >
            <div className="rt-sqr-letter">{s.letter}</div>
            <span className="rt-sqr-word">{s.word}</span>
            <span className="rt-sqr-desc">{s.desc}</span>
          </div>
          {i < steps.length - 1 && (
            <span
              className="rt-sqr-arrow"
              style={{ animationDelay: `${arrowDelays[i]}ms` } as CSSProperties}
            >
              →
            </span>
          )}
        </Fragment>
      ))}
    </div>
  );
}

/* ── step 3: SQ3R — Survey + Question ──────────────────── */
function Scene3() {
  const steps: SqrStep[] = [
    { letter: "S", word: "Survey", desc: "浏览标题、摘要\n关键词、小标题", state: "active" },
    { letter: "Q", word: "Question", desc: "针对浏览内容\n提出问题", state: "active" },
    { letter: "R", word: "Read", desc: "", state: "pending" },
    { letter: "R", word: "Recite", desc: "", state: "pending" },
    { letter: "R", word: "Review", desc: "", state: "pending" },
  ];

  return (
    <div className="rt-scene rt-s3">
      <p className="rt-sqr-title">泛读用 SQ3R 法</p>
      <SqrFlow
        steps={steps}
        stepDelays={[120, 380, 680, 680, 680]}
        arrowDelays={[280, 520, 680, 680]}
      />
    </div>
  );
}

/* ── step 4: SQ3R — Read + Recite + Review ──────────────── */
function Scene4() {
  const steps: SqrStep[] = [
    { letter: "S", word: "Survey", desc: "", state: "done" },
    { letter: "Q", word: "Question", desc: "", state: "done" },
    { letter: "R", word: "Read", desc: "带着问题阅读\n重点关注相关内容", state: "active" },
    { letter: "R", word: "Recite", desc: "用自己的语言复述\n检验理解程度", state: "active" },
    { letter: "R", word: "Review", desc: "定期复习\n强化记忆", state: "active" },
  ];

  return (
    <div className="rt-scene rt-s4">
      <p className="rt-sqr-title">泛读用 SQ3R 法</p>
      <SqrFlow
        steps={steps}
        stepDelays={[0, 60, 260, 460, 660]}
        arrowDelays={[60, 140, 360, 560]}
      />
    </div>
  );
}

/* ── step 5: 阅读深度原则 ────────────────────────────────── */
function Scene5() {
  return (
    <div className="rt-scene rt-s5">
      <p className="rt-s5-principle">
        按相关性合理设定<br />阅读深度
      </p>
      <div className="rt-s5-spectrum">
        <span className="rt-s5-end">泛读</span>
        <div className="rt-s5-track">
          <div className="rt-s5-fill" />
          <div className="rt-s5-marker" />
        </div>
        <span className="rt-s5-end">精读</span>
      </div>
      <p className="rt-s5-warning">不要陷入"什么都想精读"的误区</p>
    </div>
  );
}
