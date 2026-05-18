import type { CSSProperties } from "react";
import type { ChapterStepProps } from "../../registry/types";
import "./ReadActive.css";

export default function ReadActive({ step }: ChapterStepProps) {
  if (step === 0) return <Scene0 />;
  if (step === 1) return <Scene1 />;
  if (step === 2) return <Scene2 />;
  if (step === 3) return <Scene3 />;
  if (step === 4) return <Scene4 />;
  return null;
}

/* ── step 0: 读前 — 先提问题 ───────────────────────────── */
function Scene0() {
  const questions = [
    "作者想解决什么问题？",
    "用了什么方法？",
    "我接受这个结论吗？",
  ];
  return (
    <div className="ra-scene ra-s0">
      <p className="ra-eyebrow">第二部分 · 怎么读</p>
      <div className="ra-s0-header">
        <span className="ra-s0-phase">读前</span>
        <span className="ra-s0-vline" />
        <span className="ra-s0-hint">先提 3—5 个问题</span>
      </div>
      <div className="ra-s0-qs">
        {questions.map((q, i) => (
          <div
            key={q}
            className="ra-s0-q"
            style={{ animationDelay: `${260 + i * 200}ms` } as CSSProperties}
          >
            <span className="ra-s0-qnum">{i + 1}</span>
            <span className="ra-s0-qtext">{q}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── step 1: 读中 — 画图 ─────────────────────────────── */
function Scene1() {
  return (
    <div className="ra-scene ra-s1">
      <div className="ra-s1-top">
        <span className="ra-s1-phase">读中</span>
        <span className="ra-s1-desc">画图理顺论证，发现逻辑漏洞</span>
      </div>
      <div className="ra-s1-main">
        <MindMapSvg />
        <div className="ra-s1-types">
          {(["结构图", "逻辑图", "思维导图"] as const).map((t, i) => (
            <span
              key={t}
              className="ra-s1-type"
              style={{ animationDelay: `${560 + i * 160}ms` } as CSSProperties}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function MindMapSvg() {
  const cx = 200, cy = 200;
  const cr = 36;
  const nr = 30;
  const nodes = [
    { x: 80,  y: 80,  label: "引言" },
    { x: 320, y: 80,  label: "方法" },
    { x: 80,  y: 320, label: "结论" },
    { x: 320, y: 320, label: "数据" },
  ];
  return (
    <svg className="ra-s1-svg" viewBox="0 0 400 400">
      {nodes.map((n, i) => {
        const dx = n.x - cx, dy = n.y - cy;
        const len = Math.sqrt(dx * dx + dy * dy);
        const x1 = cx + (dx / len) * cr;
        const y1 = cy + (dy / len) * cr;
        const x2 = n.x - (dx / len) * nr;
        const y2 = n.y - (dy / len) * nr;
        return (
          <line
            key={i}
            className="ra-s1-edge"
            x1={x1} y1={y1} x2={x2} y2={y2}
            style={{ animationDelay: `${180 + i * 120}ms` } as CSSProperties}
          />
        );
      })}
      <circle className="ra-s1-center-circle" cx={cx} cy={cy} r={cr} />
      <text className="ra-s1-center-text" x={cx} y={cy + 6}>核心</text>
      {nodes.map((n, i) => (
        <g
          key={i}
          className="ra-s1-node-g"
          style={{ animationDelay: `${260 + i * 120}ms` } as CSSProperties}
        >
          <circle className="ra-s1-node-circle" cx={n.x} cy={n.y} r={nr} />
          <text className="ra-s1-node-text" x={n.x} y={n.y + 5}>{n.label}</text>
        </g>
      ))}
    </svg>
  );
}

/* ── step 2: 读后 — 反向摘要法 ─────────────────────────── */
function Scene2() {
  const items = [
    { label: "核心观点", hint: "作者主张是什么" },
    { label: "文章结构", hint: "论证怎么展开的" },
    { label: "不足之处", hint: "哪里可以质疑" },
  ];
  return (
    <div className="ra-scene ra-s2">
      <div className="ra-s2-top">
        <span className="ra-s2-phase">读后</span>
        <span className="ra-s2-method">反向摘要法</span>
      </div>
      <p className="ra-s2-rule-text">不看原文，凭记忆写出——</p>
      <div className="ra-s2-cards">
        {items.map((item, i) => (
          <div
            key={item.label}
            className="ra-s2-card"
            style={{ animationDelay: `${300 + i * 220}ms` } as CSSProperties}
          >
            <span className="ra-s2-label">{item.label}</span>
            <span className="ra-s2-hint">{item.hint}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── step 3: 知识管理工具 ──────────────────────────────── */
function Scene3() {
  const tools = ["Endnote", "Zotero", "NoteExpress"];
  const fields = ["摘要", "关键词", "引用句", "个人评价"];
  return (
    <div className="ra-scene ra-s3">
      <p className="ra-s3-title">建立知识管理体系</p>
      <div className="ra-s3-tools">
        {tools.map((t, i) => (
          <span
            key={t}
            className="ra-s3-tool"
            style={{ animationDelay: `${100 + i * 160}ms` } as CSSProperties}
          >
            {t}
          </span>
        ))}
      </div>
      <div className="ra-s3-divider" />
      <div className="ra-s3-fields-row">
        <span className="ra-s3-fields-label">每篇记录</span>
        <div className="ra-s3-fields">
          {fields.map((f, i) => (
            <span
              key={f}
              className="ra-s3-field"
              style={{ animationDelay: `${580 + i * 110}ms` } as CSSProperties}
            >
              {f}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── step 4: 定期回顾 — 知识网络 ──────────────────────── */
function Scene4() {
  return (
    <div className="ra-scene ra-s4">
      <div className="ra-s4-top">
        <span className="ra-s4-freq">每月一次</span>
        <span className="ra-s4-desc">串联文献，形成知识网络</span>
      </div>
      <KnowledgeNet />
    </div>
  );
}

function KnowledgeNet() {
  const nodes = [
    { x: 270, y: 100, label: "理论框架" },
    { x: 460, y: 200, label: "研究方法" },
    { x: 460, y: 340, label: "学术论文" },
    { x: 270, y: 420, label: "案例分析" },
    { x: 80,  y: 340, label: "政策报告" },
    { x: 80,  y: 200, label: "经典著作" },
  ];
  const edges: [number, number][] = [
    [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0],
    [0, 3], [1, 4],
  ];
  return (
    <svg className="ra-s4-svg" viewBox="0 0 540 520">
      {edges.map(([a, b], i) => (
        <line
          key={i}
          className="ra-s4-edge"
          x1={nodes[a]!.x} y1={nodes[a]!.y}
          x2={nodes[b]!.x} y2={nodes[b]!.y}
          style={{ animationDelay: `${280 + i * 80}ms` } as CSSProperties}
        />
      ))}
      {nodes.map((n, i) => (
        <g
          key={i}
          className="ra-s4-node-g"
          style={{ animationDelay: `${80 + i * 100}ms` } as CSSProperties}
        >
          <circle className="ra-s4-node-circle" cx={n.x} cy={n.y} r={44} />
          <text className="ra-s4-node-text" x={n.x} y={n.y + 6}>{n.label}</text>
        </g>
      ))}
    </svg>
  );
}
