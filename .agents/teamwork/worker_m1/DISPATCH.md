## 2026-11-08T05:31:38Z
Read d:\TEST\MATH-STUDY\.agents\teamwork\ORIGINAL_REQUEST.md and d:\TEST\MATH-STUDY\PROJECT.md first.
Your working directory is d:\TEST\MATH-STUDY\.agents\teamwork\worker_m1\.
Your identity is an Implementation Worker (teamwork_worker).

Milestone: Milestone 1 — Math Types (/math-types) Expansion & KaTeX Standardization.

Input Explorer Reports & Data Artifacts:
- d:\TEST\MATH-STUDY\.agents\teamwork\explorer_m1_katex\handoff.md
- d:\TEST\MATH-STUDY\.agents\teamwork\explorer_m1_types\handoff.md
- d:\TEST\MATH-STUDY\.agents\teamwork\explorer_m1_conditions\handoff.md
- d:\TEST\MATH-STUDY\.agents\teamwork\explorer_m1_conditions\validated_37_types.json

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

File Ownership (You exclusively own and may edit these files):
- src/app/mindmap/machData.ts
- prisma/seed.js
- src/app/math-types/page.tsx
- src/app/page.tsx (only KaTeX raw $\to$ text fix)
- src/app/team-admin/page.tsx (only KaTeX raw $\to$ text fix)

Task:
1. Fix all KaTeX syntax and escape issues:
   - In `prisma/seed.js`: fix line 200 `\v` -> `\\vec` in `KnowledgeItem` notes so that `\u000b` is eliminated.
   - Standardize `^{\circ}` and Unicode `$Đ$` -> `$\\text{CĐ}$` or similar per explorer_m1_katex report.
   - Fix raw `$\to$` strings in `src/app/page.tsx` and `src/app/team-admin/page.tsx`.
2. Standardize mathematical domain conditions across all 37 math sub-types in `src/app/mindmap/machData.ts`:
   - Incorporate the validated conditions from `d:\TEST\MATH-STUDY\.agents\teamwork\explorer_m1_conditions\validated_37_types.json` into `src/app/mindmap/machData.ts` so that every one of the 37 types explicitly includes:
     * Tập xác định D
     * Điều kiện khả vi, liên tục
     * Mẫu thức khác 0, căn thức không âm
     * Vectơ khác \vec{0}, điều kiện cùng phương (k != 0), vuông góc (\vec{u} \cdot \vec{v} = 0)
     * Tích có hướng, diện tích tam giác, thể tích tứ diện
     * Điều kiện mặt cầu R^2 > 0.
3. Expand `/math-types` page (`src/app/math-types/page.tsx`) and `prisma/seed.js`:
   - Implement the Two-Tier Hierarchical architecture designed by explorer_m1_types:
     * In `prisma/seed.js`, ensure each `MathCategory` contains rich sub-types data or subTypesJson covering all 37 sub-types organized by Bài 1 -> Bài 8 SGK Toán 12 KNTT.
     * In `src/app/math-types/page.tsx`, update the UI so users can view and filter all 37 math sub-types across Bài 1 to Bài 8 with full: Dấu hiệu nhận biết, Kiến thức nền tảng (với điều kiện toán học đầy đủ), Phương pháp giải từng bước, Cạm bẫy & lỗi sai thường gặp.
     * Ensure the category filter dynamically adapts and is no longer hardcoded to static text.
4. Execute database seed:
   - Run `node prisma/seed.js` to populate the database with the updated clean categories and knowledge items.
5. Verify build and tests:
   - Run `node scripts/validate_all.js` to verify Tier 4 passes with 0 KaTeX errors and conditions intact.
   - Run `npm run build` to verify no compilation or typecheck errors.
6. Write your detailed handoff report to d:\TEST\MATH-STUDY\.agents\teamwork\worker_m1\handoff.md following standard format (Observation, Logic Chain, Caveats, Conclusion, Verification Results).
7. Update progress.md in your directory.
8. Send a completion message via send_message to your caller.
