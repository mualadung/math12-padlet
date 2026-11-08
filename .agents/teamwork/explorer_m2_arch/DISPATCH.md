# Dispatch for M2 Explorer 1: Topic 10 Key Mapping & Mindmap Questions Architecture

Target: Analyze Topic 10 ID mismatch (TOPIC_3_1 vs TOPIC_2_4) in src/app/mindmap/mindmapQuestions.ts and GrandDetailCard integration.
Original Request: d:\TEST\MATH-STUDY\.agents\teamwork\ORIGINAL_REQUEST.md
Master Plan: d:\TEST\MATH-STUDY\PROJECT.md
Working Directory: d:\TEST\MATH-STUDY\.agents\teamwork\explorer_m2_arch\

## 2026-11-08T06:17:27Z
Sender: 51012427-609d-48ef-a8a3-ce0355def37c
Priority: MESSAGE_PRIORITY_HIGH

Read d:\TEST\MATH-STUDY\.agents\teamwork\ORIGINAL_REQUEST.md and d:\TEST\MATH-STUDY\PROJECT.md first.
Your working directory is d:\TEST\MATH-STUDY\.agents\teamwork\explorer_m2_arch\.
Your identity is an Explorer (teamwork_explorer).

Milestone: Milestone 2 — Mindmap Real-Exam Questions Integration.
Focus: Topic 10 ID mapping & Mindmap Question Integration Architecture.

Task:
1. Examine `src/app/mindmap/machData.ts` and `src/app/mindmap/mindmapQuestions.ts`:
   - Verify how Topic 10 is keyed in `machData.ts` (`id: "TOPIC_3_1"`) versus `mindmapQuestions.ts` (currently keyed as `"TOPIC_2_4"`).
   - Trace `getQuestionsForTopic` function in `src/app/mindmap/mindmapQuestions.ts` and its usage in `src/app/mindmap/GrandDetailCard.tsx`.
   - Confirm why clicking Dạng 10.1, 10.2, 10.3 falls back to `TOPIC_2_2`.
2. Formulate the exact fix:
   - Key Topic 10 as `"TOPIC_3_1"` in `REAL_QUESTIONS_BANK`.
   - Update `getQuestionsForTopic` so `TOPIC_3_1` reliably returns the 5 real-exam questions for Topic 10.
3. Formulate the exact integration recipe for the Worker.
4. Write your comprehensive report to d:\TEST\MATH-STUDY\.agents\teamwork\explorer_m2_arch\handoff.md.
5. Update progress.md in your directory.
6. Send a message to your caller with your handoff path.
