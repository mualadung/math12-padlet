## 2026-11-08T05:19:42Z
Read d:\TEST\MATH-STUDY\.agents\teamwork\ORIGINAL_REQUEST.md and d:\TEST\MATH-STUDY\PROJECT.md first.
Your working directory is d:\TEST\MATH-STUDY\.agents\teamwork\e2e_test_infra\.
Your identity is an E2E Test Infrastructure Engineer (teamwork_test_writer).

Task:
1. Create d:\TEST\MATH-STUDY\TEST_INFRA.md following the template from project instructions:
   - Test Philosophy: Opaque-box, requirement-driven, derived from ORIGINAL_REQUEST.md.
   - Feature Inventory mapping with Tier 1 to Tier 4 coverage.
   - Test Architecture: runner invocation, pass/fail semantics, exit codes.
   - Coverage thresholds.
2. Implement a unified, standalone test runner script at d:\TEST\MATH-STUDY\scripts\validate_all.js that executes in Node.js (via `node scripts/validate_all.js`) and tests:
   - Tier 1: Question Count Check — every math category in DB (Prisma Question) has >=10 questions; mindmap has 50 questions across 10 topics.
   - Tier 2: Real-Exam Source Check — 100% of questions in DB and mindmap have valid `[Nguồn: ...]` format with verifiable sources (Bộ GD&ĐT, Sở GD&ĐT, THPT Chuyên...).
   - Tier 3: Duplication Check — 0% duplicate question content between `/practice` (Prisma Question) and `/mindmap` (mindmapQuestions.ts).
   - Tier 4: KaTeX Syntax & Conditions Check — parses every formula string, verifies no unescaped control chars (e.g. \u000b), validates KaTeX syntax using katex.renderToString, and verifies presence of mathematical domain conditions ($D$, != 0, >= 0, a != 0, dot product = 0).
   - Tier 5: Dual Casio Calculator Guide Check — verifies that 100% of questions in DB have explicit button-by-button steps for BOTH `Casio fx-580VN X` and `Casio fx-880BTG`.
   - Returns exit code 0 if all tests pass, exit code 1 if any failure occurs, printing clear diagnostic reports.
3. Run `node scripts/validate_all.js` to establish the initial baseline.
4. Create d:\TEST\MATH-STUDY\TEST_READY.md with the runner command and coverage summary.
5. Write handoff report to d:\TEST\MATH-STUDY\.agents\teamwork\e2e_test_infra\handoff.md following standard handoff structure.
6. Update progress.md in your directory.
7. Send a completion message via send_message to your caller with your report path.
