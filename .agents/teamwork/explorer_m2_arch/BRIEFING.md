# BRIEFING — 2026-11-08T06:25:00Z

## Mission
Investigate Topic 10 ID mismatch (TOPIC_3_1 vs TOPIC_2_4) in machData.ts and mindmapQuestions.ts, trace getQuestionsForTopic and GrandDetailCard fallback, and formulate exact fix and worker integration recipe.

## 🔒 My Identity
- Archetype: explorer
- Roles: investigation, synthesis
- Working directory: d:\TEST\MATH-STUDY\.agents\teamwork\explorer_m2_arch
- Original parent: 51012427-609d-48ef-a8a3-ce0355def37c
- Milestone: Milestone 2 — Mindmap Real-Exam Questions Integration

## 🔒 Key Constraints
- Read-only investigation — do NOT implement
- Analyze Topic 10 ID mapping & Mindmap Question Integration Architecture
- Verify how Topic 10 is keyed in machData.ts vs mindmapQuestions.ts
- Trace getQuestionsForTopic and its usage in GrandDetailCard.tsx
- Confirm fallback mechanism causing TOPIC_2_2 fallback
- Formulate exact fix and worker integration recipe

## Current Parent
- Conversation ID: 51012427-609d-48ef-a8a3-ce0355def37c
- Updated: 2026-11-08T06:20:00Z

## Investigation State
- **Explored paths**:
  - `src/app/mindmap/machData.ts` (Lines 518-804): Verified Chapter 2 Topic 10 is keyed with `"id": "TOPIC_3_1"`, containing Dạng 10.1 (`MT_3_1_1`), 10.2 (`MT_3_1_2`), 10.3 (`MT_3_1_3`).
  - `src/app/mindmap/mindmapQuestions.ts` (Lines 760-852): Discovered Topic 10 bank is keyed as `"TOPIC_2_4"`, and `getQuestionsForTopic` falls back to `REAL_QUESTIONS_BANK["TOPIC_2_2"]` for any non-Ch1 key that doesn't match.
  - `src/app/mindmap/page.tsx` (Lines 566-665): Traced click handler `handleSelectMathType` passing `t.id` (`"TOPIC_3_1"`) to `grandDetail` node.
  - `src/app/mindmap/GrandDetailCard.tsx` (Lines 34-455): Verified `GrandDetailCard` receives `topicId: "TOPIC_3_1"` and calls `getQuestionsForTopic(topicId)`.
  - `scripts/validate_all.js` (Tier 1 lines 327-340): Confirmed exact check failing: `[Mindmap Mapping Lỗi] Chủ đề TOPIC_3_1 không tìm thấy trong REAL_QUESTIONS_BANK!`.
- **Key findings**:
  - Root cause of bug: Key mismatch (`"TOPIC_3_1"` in `machData.ts` vs `"TOPIC_2_4"` in `mindmapQuestions.ts`).
  - Root cause of fallback: In `getQuestionsForTopic`, `"TOPIC_3_1"` does not exist in `REAL_QUESTIONS_BANK`, does not start with `"TOPIC_1"`, and thus hits `return REAL_QUESTIONS_BANK["TOPIC_2_2"];`.
  - Side observation: `GrandDetailCard` lacks `useEffect` to reset question index and answers when changing MathType.
- **Unexplored areas**: None regarding Topic 10 mapping and mindmap question architecture.

## Key Decisions Made
- Key Topic 10 in `REAL_QUESTIONS_BANK` strictly as `"TOPIC_3_1"`.
- Update `getQuestionsForTopic` with direct lookup, legacy alias check for `"TOPIC_2_4"`, `"TOPIC_3"` prefix support, `"TOPIC_1"` fallback, and default `"TOPIC_2_2"` fallback.
- Created patch files: `topic10_id_fix.patch` and `granddetail_state_reset.patch`.

## Artifact Index
- `DISPATCH.md` — Incoming parent tasks and context
- `BRIEFING.md` — Situational awareness and state
- `progress.md` — Liveness heartbeat
- `test_eval.js` — Verification script reproducing key mismatch and fallback
- `test_fix.js` — Verification script confirming 100% resolution
- `topic10_id_fix.patch` — Unified diff patch for `mindmapQuestions.ts`
- `granddetail_state_reset.patch` — Recommended patch for `GrandDetailCard.tsx`
- `handoff.md` — 5-component comprehensive handoff report
