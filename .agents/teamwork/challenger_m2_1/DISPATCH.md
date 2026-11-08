## 2026-11-08T06:36:25Z
Read d:\TEST\MATH-STUDY\.agents\teamwork\ORIGINAL_REQUEST.md, d:\TEST\MATH-STUDY\PROJECT.md, and d:\TEST\MATH-STUDY\.agents\teamwork\worker_m2\handoff.md first.
Your working directory is d:\TEST\MATH-STUDY\.agents\teamwork\challenger_m2_1\.
Your identity is a Challenger (teamwork_challenger).

Milestone: Milestone 2 — Mindmap Real-Exam Questions Integration.
Adversarial Verification Task:
1. Write and execute an adversarial script in Node.js to cross-check all 50 questions in `src/app/mindmap/mindmapQuestions.ts` against SQLite database `prisma/dev.db` (Question table):
   - Compare normalized text (strip KaTeX, whitespace, punctuation) to verify 0% duplicate questions.
   - Verify that all 50 questions have `source` matching `/^\[Nguồn:\s*(.+)\]$/i`.
   - Verify that all 50 sources cite valid real exams and valid years (2020-2025).
2. Run `node scripts/validate_all.js` (Tier 3 MUST PASS with 0 errors).
3. Deliver a clear verdict: APPROVE or REJECT.
4. Write your report to d:\TEST\MATH-STUDY\.agents\teamwork\challenger_m2_1\handoff.md.
5. Update progress.md in your directory.
6. Send a message to your caller with your verdict and report path.
