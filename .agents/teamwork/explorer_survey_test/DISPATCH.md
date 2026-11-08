# Dispatch for Explorer 3: Build & Testing Infrastructure Survey

Target: Investigate existing package.json scripts, build pipeline, lint/typecheck tools, test runners, validation scripts, and Casio calculator guidance implementation.
Original Request: d:\TEST\MATH-STUDY\.agents\teamwork\ORIGINAL_REQUEST.md
Working Directory: d:\TEST\MATH-STUDY\.agents\teamwork\explorer_survey_test\

## 2026-11-08T05:07:43Z
[Message] timestamp=2026-11-08T05:07:43Z sender=51012427-609d-48ef-a8a3-ce0355def37c priority=MESSAGE_PRIORITY_HIGH
Read d:\TEST\MATH-STUDY\.agents\teamwork\ORIGINAL_REQUEST.md first.
Your working directory is d:\TEST\MATH-STUDY\.agents\teamwork\explorer_survey_test\.
Your identity is an Explorer (teamwork_explorer).

Task:
1. Examine package.json, build scripts, dependencies, testing setup (Jest, Vitest, Playwright, or custom node scripts), TypeScript configuration, ESLint configuration.
2. Check if there are existing test suites or validation scripts (e.g. data validation scripts, KaTeX syntax checkers, question count checkers, duplication checkers).
3. Investigate what tools/scripts can be created or leveraged for automated verification:
   - Validating that every math type in /practice has >=10 questions.
   - Validating that 100% of questions have valid `[Nguồn: ...]` tags.
   - Checking KaTeX syntax integrity across all math datasets.
   - Checking for duplicate questions between math-types, mindmap, and practice.
   - Checking for dual Casio fx-580VN X and fx-880BTG instructions.
   - Validating npm run build behavior and potential TypeScript/ESLint issues.
4. Write your comprehensive report to d:\TEST\MATH-STUDY\.agents\teamwork\explorer_survey_test\handoff.md following standard handoff structure (Observation, Logic Chain, Caveats, Conclusion).
5. Update progress.md in your directory.
6. Send a completion message via send_message to your caller with your key findings and the path to handoff.md.
