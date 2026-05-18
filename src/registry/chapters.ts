import type { ChapterDef } from "./types";
import HookChapter from "../chapters/01-hook/Hook";
import { narrations as hookNarrations } from "../chapters/01-hook/narrations";
import ReadBooksChapter from "../chapters/02-read-books/ReadBooks";
import { narrations as readBooksNarrations } from "../chapters/02-read-books/narrations";
import ReadPapersChapter from "../chapters/03-read-papers/ReadPapers";
import { narrations as readPapersNarrations } from "../chapters/03-read-papers/narrations";
import ReadCasesChapter from "../chapters/04-read-cases/ReadCases";
import { narrations as readCasesNarrations } from "../chapters/04-read-cases/narrations";
import ReadTacticsChapter from "../chapters/05-read-tactics/ReadTactics";
import { narrations as readTacticsNarrations } from "../chapters/05-read-tactics/narrations";
import ReadActiveChapter from "../chapters/06-read-active/ReadActive";
import { narrations as readActiveNarrations } from "../chapters/06-read-active/narrations";
import ReadPlanChapter from "../chapters/07-read-plan/ReadPlan";
import { narrations as readPlanNarrations } from "../chapters/07-read-plan/narrations";

/**
 * Order = order of presentation.
 *
 * Each chapter MUST provide a `narrations: Narration[]` array. Its length
 * is the chapter's step count — there is no `totalSteps` to maintain
 * separately. This guarantees the audio synthesis pipeline, the runtime
 * stepper, and the chapter `.tsx` switch on `step` cannot drift apart.
 *
 * Visual styling (color, fonts) comes entirely from the active theme —
 * chapters never hard-code palette / font names. See THEMES.md.
 */
export const CHAPTERS: ChapterDef[] = [
  {
    id: "hook",
    title: "研一第一道坎",
    narrations: hookNarrations,
    Component: HookChapter,
  },
  {
    id: "read-books",
    title: "理论书籍：搭框架",
    narrations: readBooksNarrations,
    Component: ReadBooksChapter,
  },
  {
    id: "read-papers",
    title: "学术论文：找对看透",
    narrations: readPapersNarrations,
    Component: ReadPapersChapter,
  },
  {
    id: "read-cases",
    title: "政策报告与案例：理论落地",
    narrations: readCasesNarrations,
    Component: ReadCasesChapter,
  },
  {
    id: "read-tactics",
    title: "精读与泛读：策略匹配",
    narrations: readTacticsNarrations,
    Component: ReadTacticsChapter,
  },
  {
    id: "read-active",
    title: "主动阅读与知识管理",
    narrations: readActiveNarrations,
    Component: ReadActiveChapter,
  },
  {
    id: "read-plan",
    title: "系统规划：阶段、专题、小组",
    narrations: readPlanNarrations,
    Component: ReadPlanChapter,
  },
];
