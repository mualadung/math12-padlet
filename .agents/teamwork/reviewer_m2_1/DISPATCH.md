# Dispatch for Reviewer 1 (M2)

Target: Review Milestone 2 — Mindmap Real-Exam Questions & Source Authenticity
Worker Handoff: d:\TEST\MATH-STUDY\.agents\teamwork\worker_m2\handoff.md
Original Request: d:\TEST\MATH-STUDY\.agents\teamwork\ORIGINAL_REQUEST.md
Master Plan: d:\TEST\MATH-STUDY\PROJECT.md
Working Directory: d:\TEST\MATH-STUDY\.agents\teamwork\reviewer_m2_1\
## 2026-11-08T06:36:06Z
Read d:\TEST\MATH-STUDY\.agents\teamwork\ORIGINAL_REQUEST.md, d:\TEST\MATH-STUDY\PROJECT.md, and d:\TEST\MATH-STUDY\.agents\teamwork\worker_m2\handoff.md first.
Your working directory is d:\TEST\MATH-STUDY\.agents\teamwork\reviewer_m2_1\.
Your identity is a Reviewer (teamwork_reviewer).

Milestone: Milestone 2 — Mindmap Real-Exam Questions Integration.
Focus:
1. Examine all 50 questions in `src/app/mindmap/mindmapQuestions.ts`:
   - Verify 100% of questions have `source` formatted strictly as `[Nguồn: ...]` with valid, verifiable exams (Bộ GD&ĐT, Sở GD&ĐT, THPT Chuyên, 2020-2025).
   - Verify quality of detailed solutions, pedagogical structure, options, and correctness.
2. Verify zero duplication against SQLite `Question` table in `prisma/dev.db`.
3. Run `node scripts/validate_all.js` (Tier 3 MUST be PASS with 0 duplicate errors; Tier 2 errors for Mindmap must be 0).
4. Run `npm run build`.
5. Deliver a clear verdict: APPROVE or REQUEST_CHANGES.
6. Write your report to d:\TEST\MATH-STUDY\.agents\teamwork\reviewer_m2_1\handoff.md.
7. Update progress.md in your directory.
8. Send a message to your caller with your verdict and report path.
