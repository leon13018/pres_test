import type { CSSProperties } from "react";
import type { ChapterStepProps } from "../../registry/types";
import "./ReadCases.css";

export default function ReadCases({ step }: ChapterStepProps) {
  if (step === 0) return <Scene0 />;
  if (step === 1) return <Scene1 />;
  if (step === 2) return <Scene2 />;
  return null;
}

/* ── step 0: 第三类 — 政策报告 + 案例材料 ────────────── */
function Scene0() {
  const categories = [
    { label: "政策报告", sub: "宏观视角 · 趋势研判" },
    { label: "案例材料", sub: "实践素材 · 理论落地" },
  ];

  return (
    <div className="rc-scene rc-s0">
      <p className="rc-eyebrow">第三类文献</p>
      <div className="rc-s0-row">
        {categories.map((cat, i) => (
          <div
            key={cat.label}
            className="rc-s0-card"
            style={{ animationDelay: `${i * 360}ms` } as CSSProperties}
          >
            <span className="rc-s0-label">{cat.label}</span>
            <span className="rc-s0-sub">{cat.sub}</span>
          </div>
        ))}
      </div>
      <p className="rc-s0-scope">工程 · 管理 · 金融等应用型学科必备</p>
    </div>
  );
}

/* ── step 1: 政策报告 → 宏观视角 (SVG 趋势折线) ──────── */
function Scene1() {
  const dots: [number, number][] = [
    [60, 190], [160, 150], [260, 115],
    [360, 85], [460, 55], [560, 35], [660, 20],
  ];

  return (
    <div className="rc-scene rc-s1">
      <p className="rc-s1-source">专业智库 · 研究机构发布</p>
      <svg className="rc-chart" viewBox="0 0 720 240" fill="none">
        <line x1="40" y1="20" x2="40" y2="210" className="rc-axis" />
        <line x1="40" y1="210" x2="700" y2="210" className="rc-axis" />
        <polyline
          className="rc-trend"
          points="60,190 160,150 260,115 360,85 460,55 560,35 660,20"
        />
        {dots.map(([x, y], i) => (
          <circle
            key={i}
            className="rc-dot"
            cx={x}
            cy={y}
            r="6"
            style={{ animationDelay: `${820 + i * 110}ms` } as CSSProperties}
          />
        ))}
      </svg>
      <div className="rc-s1-labels">
        <span className="rc-s1-tag">行业趋势</span>
        <span className="rc-s1-tag">政策走向</span>
        <span className="rc-s1-tag rc-accent-tag">宏观视角</span>
      </div>
      <p className="rc-s1-quote">"翻一份行业报告，直接看出选题方向"</p>
    </div>
  );
}

/* ── step 2: 案例拆解 — 来源→视角→追问 ─────────────── */
function Scene2() {
  const sources = ["项目经验", "新闻事件", "行业报告"];
  const questions = ["用了什么理论？", "问题出在哪？", "解法是什么？"];
  const exTags = ["战略制定", "组织架构", "市场营销"];

  return (
    <div className="rc-scene rc-s2">
      <div className="rc-s2-flow">
        {/* 左：来源 */}
        <div className="rc-s2-col rc-s2-left">
          <p className="rc-s2-colhead rc-s2-colhead-l">案例来源</p>
          <div className="rc-s2-list">
            {sources.map((s, i) => (
              <span
                key={s}
                className="rc-s2-source"
                style={{ animationDelay: `${i * 200}ms` } as CSSProperties}
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* 中：学术视角 */}
        <div className="rc-s2-mid">
          <div className="rc-s2-lens">学术视角</div>
          <span className="rc-s2-arrow">→</span>
        </div>

        {/* 右：逐一追问 */}
        <div className="rc-s2-col rc-s2-right">
          <p className="rc-s2-colhead rc-s2-colhead-r">逐一追问</p>
          <div className="rc-s2-list">
            {questions.map((q, i) => (
              <span
                key={q}
                className="rc-s2-q"
                style={{ animationDelay: `${480 + i * 200}ms` } as CSSProperties}
              >
                {q}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 底部：举例 */}
      <div className="rc-s2-example">
        <span className="rc-s2-ex-label">举例 · 企业管理课</span>
        <div className="rc-s2-ex-tags">
          {exTags.map((t, i) => (
            <span
              key={t}
              className="rc-s2-ex-tag"
              style={{ animationDelay: `${1440 + i * 160}ms` } as CSSProperties}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
