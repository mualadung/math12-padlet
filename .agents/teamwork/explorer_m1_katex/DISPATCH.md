# Dispatch for M1 Explorer 1: KaTeX Syntax & Escape Fixes

Target: Identify and specify exact fixes for all KaTeX syntax errors, escaped character issues (e.g. \v -> \u000b, ^\\circ), across DB seed files and TypeScript data files.
Original Request: d:\TEST\MATH-STUDY\.agents\teamwork\ORIGINAL_REQUEST.md
Master Project Plan: d:\TEST\MATH-STUDY\PROJECT.md
Working Directory: d:\TEST\MATH-STUDY\.agents\teamwork\explorer_m1_katex\

## 2026-11-08T05:19:47Z
Sender: 51012427-609d-48ef-a8a3-ce0355def37c
Read d:\TEST\MATH-STUDY\.agents\teamwork\ORIGINAL_REQUEST.md and d:\TEST\MATH-STUDY\PROJECT.md first.
Your working directory is d:\TEST\MATH-STUDY\.agents\teamwork\explorer_m1_katex\.
Your identity is an Explorer (teamwork_explorer).

Milestone: Milestone 1 — Math Types & KaTeX Standardization.
Your Focus: KaTeX syntax errors, escape sequences, and formula formatting across all files.

Task:
1. Investigate all KaTeX syntax errors identified in preliminary survey:
   - `prisma/seed.js` line 200: unescaped `\v` creating `\u000b` in `$[ ec{u}, ec{v}]$`.
   - `prisma/seed.js` and `seed_additional_questions.js`: unescaped `^\\circ` or `^\circ` issues.
   - Any broken formulas in `src/app/mindmap/machData.ts` and `src/app/mindmap/mindmapQuestions.ts`.
2. Provide exact, line-by-line correction recipes and escaping rules for JavaScript/TypeScript string literals (e.g. `\vec{u}` -> `\\vec{u}`, `^\circ` -> `^\\circ` in template literals vs JSON).
3. Specify verification steps for a Worker to execute.
4. Write your comprehensive report to d:\TEST\MATH-STUDY\.agents\teamwork\explorer_m1_katex\handoff.md.
5. Update progress.md in your directory.
6. Send a completion message via send_message to your caller.
