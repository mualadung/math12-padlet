# Dispatch for M2 Explorer 3: [Nguồn: ...] Formatting & KaTeX Rigor in Mindmap

Target: Audit source string format across all 50 questions in src/app/mindmap/mindmapQuestions.ts to ensure 100% compliance with `[Nguồn: ...]` format and 100% KaTeX validity under `katex.renderToString({ throwOnError: true })`.
Original Request: d:\TEST\MATH-STUDY\.agents\teamwork\ORIGINAL_REQUEST.md
Master Plan: d:\TEST\MATH-STUDY\PROJECT.md
Working Directory: d:\TEST\MATH-STUDY\.agents\teamwork\explorer_m2_sources\

## 2026-11-08T06:17:39Z
Read d:\TEST\MATH-STUDY\.agents\teamwork\ORIGINAL_REQUEST.md and d:\TEST\MATH-STUDY\PROJECT.md first.
Your working directory is d:\TEST\MATH-STUDY\.agents\teamwork\explorer_m2_sources\.
Your identity is an Explorer (teamwork_explorer).

Milestone: Milestone 2 — Mindmap Real-Exam Questions Integration.
Focus: `[Nguồn: ...]` Formatting & KaTeX Rigor for Mindmap Questions.

Task:
1. Examine all 50 questions in `src/app/mindmap/mindmapQuestions.ts`:
   - Inspect the `source` field of each question. Notice that currently in Tier 2 of `scripts/validate_all.js`, 50 errors are reported because the source string is raw (e.g. `Đề TN THPT 2024 - Mã 101 - Câu 2`) instead of wrapped in brackets `[Nguồn: Đề TN THPT 2024 - Mã 101 - Câu 2]`.
   - Formulate the exact rule to ensure 100% of questions in `mindmapQuestions.ts` have `[Nguồn: Tên Kỳ thi/Sở GD&ĐT/Trường Chuyên - Năm thi - Mã câu/Mã đề]`.
2. KaTeX Rigor check:
   - Validate every formula in `mindmapQuestions.ts` (contents, options, solutions) using `katex.renderToString({ throwOnError: true })`.
   - Ensure domain conditions ($D$, denominators != 0, radicands >= 0, \vec{a} != \vec{0}) are stated in solutions where appropriate.
3. Formulate the exact integration specifications for the Worker.
4. Write your comprehensive report to d:\TEST\MATH-STUDY\.agents\teamwork\explorer_m2_sources\handoff.md.
5. Update progress.md in your directory.
6. Send a message to your caller with your handoff path.
