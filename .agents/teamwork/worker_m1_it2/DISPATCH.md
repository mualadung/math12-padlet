## 2026-11-08T06:04:42Z

Read d:\TEST\MATH-STUDY\.agents\teamwork\ORIGINAL_REQUEST.md and d:\TEST\MATH-STUDY\PROJECT.md first.
Your working directory is d:\TEST\MATH-STUDY\.agents\teamwork\worker_m1_it2\.
Your identity is an Implementation Worker (teamwork_worker).

Milestone: Milestone 1 — Iteration 2 Implementation.

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Input Explorer Reports:
- d:\TEST\MATH-STUDY\.agents\teamwork\explorer_m1_it2_1\handoff.md
- d:\TEST\MATH-STUDY\.agents\teamwork\explorer_m1_it2_2\handoff.md
- d:\TEST\MATH-STUDY\.agents\teamwork\explorer_m1_it2_3\handoff.md

Exclusive Owned Files:
- src/app/mindmap/machData.ts
- scripts/seed_deep_expansion.js

Task:
1. Apply KaTeX syntax fixes in `src/app/mindmap/machData.ts` per explorer_m1_it2_1:
   - Line 304 (Dạng 3.4): replace `$min$` with `$\\min$`
   - Line 658 (Dạng 9.1): replace all 4 instances of `$iff` with `$\\iff$`
   - Line 676 (Dạng 9.2): replace all 2 instances of `$iff` with `$\\iff$`
2. Apply domain condition additions in `src/app/mindmap/machData.ts` per explorer_m1_it2_2:
   - Dạng 4.1 (`MT_1_4_1`): update `theory` and `methods` with explicit denominator condition $Q(x) \ne 0 \implies D = \{x \in \mathbb{R} \mid Q(x) \ne 0\}$.
   - Dạng 4.3 (`MT_1_4_3`): update with $px+q \ne 0 \iff D = \mathbb{R} \setminus \{-q/p\}$.
   - Dạng 10.1 (`MT_3_1_1`): update with $\vec{v}_1, \vec{v}_2 \ne \vec{0}$.
3. Apply Unicode math mode fixes in `scripts/seed_deep_expansion.js` per explorer_m1_it2_3:
   - In lines 159 & 161 (Question `Q38_D4_SA`), wrap `$y_{\text{CĐ}}$` and `$y_{\text{CT}}$`.
   - Run `node scripts/seed_deep_expansion.js` to update SQLite `prisma/dev.db`.
4. Verification:
   - Run `node scripts/validate_all.js` (Tier 4 MUST stay 100% PASS).
   - Run `npm run build` (MUST succeed with exit code 0).
5. Write your detailed handoff report to d:\TEST\MATH-STUDY\.agents\teamwork\worker_m1_it2\handoff.md.
6. Update progress.md in your directory.
7. Send a completion message via send_message to your caller.
