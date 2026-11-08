## 2026-11-08T06:28:15Z
Read d:\TEST\MATH-STUDY\.agents\teamwork\ORIGINAL_REQUEST.md and d:\TEST\MATH-STUDY\PROJECT.md first.
Your working directory is d:\TEST\MATH-STUDY\.agents\teamwork\worker_m2\.
Your identity is an Implementation Worker (teamwork_worker).

Milestone: Milestone 2 — Mindmap Real-Exam Questions Integration.

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Input Artifacts & Explorer Reports:
- d:\TEST\MATH-STUDY\.agents\teamwork\explorer_m2_questions\proposed_mindmapQuestions.ts
- d:\TEST\MATH-STUDY\.agents\teamwork\explorer_m2_questions\handoff.md
- d:\TEST\MATH-STUDY\.agents\teamwork\explorer_m2_arch\handoff.md
- d:\TEST\MATH-STUDY\.agents\teamwork\explorer_m2_sources\handoff.md

Exclusive Owned Files:
- src/app/mindmap/mindmapQuestions.ts

Task:
1. Update `src/app/mindmap/mindmapQuestions.ts`:
   - Incorporate the complete dataset from `d:\TEST\MATH-STUDY\.agents\teamwork\explorer_m2_questions\proposed_mindmapQuestions.ts`.
   - Ensure Topic 10 key is `"TOPIC_3_1"` in `REAL_QUESTIONS_BANK` (and keep `"TOPIC_2_4"` as alias pointing to `REAL_QUESTIONS_BANK["TOPIC_3_1"]`).
   - Ensure `getQuestionsForTopic(topicId: string)` handles `TOPIC_3_1` directly and returns the 5 real-exam questions for Topic 10.
   - Verify that all 50 questions have their `source` formatted strictly as `[Nguồn: ...]` adhering to `explorer_m2_sources` table.
   - Verify zero duplicates exist between `mindmapQuestions.ts` and SQLite `Question` table in `prisma/dev.db`.
2. Verification:
   - Run `node scripts/validate_all.js`.
     * Check Tier 1: Topic 10 mapping error must be 0!
     * Check Tier 2: 50 errors from mindmap must disappear! (Only 55 DB errors remain for M3).
     * Check Tier 3: Duplication between Mindmap and DB must be **0 errors (PASS)**!
     * Check Tier 4: KaTeX Syntax & Conditions must remain **100% PASS**!
   - Run `npm run build` to verify clean compilation with exit code 0.
3. Write your detailed handoff report to d:\TEST\MATH-STUDY\.agents\teamwork\worker_m2\handoff.md following standard format.
4. Update progress.md in your directory.
5. Send a completion message via send_message to your caller.
