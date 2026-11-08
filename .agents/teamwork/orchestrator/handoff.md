# Orchestrator Soft Handoff (State Dump for Successor)

## 1. Observation & Current Progress
- **Project Goal**: Nâng cấp, chuẩn hóa và hoàn thiện học liệu số Ôn tập Toán 12 (Chương I & II) trên ứng dụng Math Study Padlet.
- **Master Plan**: `PROJECT.md` tại thư mục gốc định nghĩa 11 Tính năng (F1-F11) và 6 Cột mốc (E2E Track, M1-M4, Final).
- **Completed Work**:
  1. **Survey Phase**: Đã hoàn thành khảo sát 3 nhánh (Kiến trúc Next.js 14, Nội dung SGK Bài 1-8, Hạ tầng kiểm thử).
  2. **E2E Testing Track**: Đã hoàn thành xuất sắc! `TEST_INFRA.md`, `scripts/validate_all.js`, và `TEST_READY.md` đã sẵn sàng. Lệnh kiểm thử độc lập: `node scripts/validate_all.js`.
  3. **Milestone 1 (Iteration 1)**:
     - Worker M1 đã sửa lỗi escape `\v` -> `\\vec` tại `prisma/seed.js:200` (xóa sổ ký tự điều khiển ASCII `\u000b`).
     - Chuẩn hóa 37/37 phân dạng toán trong `src/app/mindmap/machData.ts` với đầy đủ điều kiện miền xác định.
     - Nâng cấp giao diện `/math-types` theo kiến trúc 2 tầng (37 phân dạng SGK Bài 1-8 + 7 chuyên đề DB) với bộ lọc động.
     - Reviewer 1 (APPROVE), Reviewer 2 (APPROVE), Challenger 2 (APPROVE), Auditor (CLEAN - 0 vi phạm tính toàn vẹn).
     - Challenger 1 (REJECT) phát hiện các lỗi cụ thể: 6 vị trí `$iff` thiếu backslash, 1 vị trí `$min` thiếu backslash, thiếu điều kiện mẫu $\ne 0$ ở Dạng 4.1 & 4.3 và vận tốc khác 0 ở Dạng 10.1 trong `machData.ts`, và câu hỏi `Q38_D4_SA` chứa `$y_{CĐ}$` trong `scripts/seed_deep_expansion.js`.
  4. **Milestone 1 (Iteration 2 Survey)**:
     - 3 Explorers đã hoàn thành và cung cấp đầy đủ drop-in code recipes:
       * Explorer 1 (`.agents/teamwork/explorer_m1_it2_1/handoff.md`): Sửa chính xác dòng 304 (`$\\min$`), dòng 658 (4 vị trí `$\\iff$`), dòng 676 (2 vị trí `$\\iff$`).
       * Explorer 2 (`.agents/teamwork/explorer_m1_it2_2/handoff.md`): Thêm điều kiện $Q(x) \ne 0 \implies D = \{x \in \mathbb{R} \mid Q(x) \ne 0\}$ (Dạng 4.1), $px+q \ne 0 \iff D = \mathbb{R} \setminus \{-q/p\}$ (Dạng 4.3), và $\vec{v}_1, \vec{v}_2 \ne \vec{0}$ (Dạng 10.1).
       * Explorer 3 (`.agents/teamwork/explorer_m1_it2_3/handoff.md`): Sửa `$y_{\text{CĐ}}$`, `$y_{\text{CT}}$` trong `scripts/seed_deep_expansion.js` dòng 159 & 161, và chạy nạp `node scripts/seed_deep_expansion.js`.

## 2. Milestone State
| Milestone | Status | Notes |
|---|---|---|
| E2E Testing Track | **DONE** | `TEST_INFRA.md`, `scripts/validate_all.js`, `TEST_READY.md` ready |
| Milestone 1 (Math Types & KaTeX) | **IN_PROGRESS (Iteration 2 Remediation)** | 3 Explorer reports ready; ready to dispatch Worker M1 It2 |
| Milestone 2 (Mindmap Real-Exam Questions) | **PLANNED** | Fix Topic 10 ID mismatch (`TOPIC_3_1`), replace duplicate questions with 50 distinct real-exam questions with `[Nguồn: ...]` |
| Milestone 3 (Practice Bank $\ge 10$/type & Dual Casio) | **PLANNED** | Expand SQLite to $\ge 70$ questions (>=10/category), wrap `[Nguồn: ...]`, dual Casio fx-580 & fx-880 steps for each question |
| Milestone 4 (Web UI & Build Optimization) | **PLANNED** | Add `.eslintrc.json`, verify dynamic category filters, navigation, mobile responsiveness |
| Final Milestone (100% E2E Pass & Adversarial Hardening) | **PLANNED** | Run `node scripts/validate_all.js` (all 5 Tiers PASS), run `npm run build`, Forensic Audit CLEAN |

## 3. Active Subagents
Tất cả 16 subagents của thế hệ Orchestrator gốc đã hoàn tất báo cáo và đã dừng (0 subagents running).

## 4. Pending Decisions & Key Constraints
- **MANDATORY**: DISPATCH-ONLY. Do NOT write code or run build commands directly.
- **MANDATORY**: Every subagent dispatch must include the path to `d:\TEST\MATH-STUDY\.agents\teamwork\ORIGINAL_REQUEST.md`.
- **MANDATORY**: Include the anti-cheating warning verbatim in every Worker dispatch.
- **MANDATORY**: Forensic Auditor CLEAN verdict is a hard binary veto for every milestone gate.

## 5. Remaining Work (Concrete Next Steps for Successor)
1. **Hoàn thành Milestone 1 Iteration 2**:
   - Spawn **Worker M1 It2** (`teamwork_worker`) để thực thi chính xác các drop-in recipes từ:
     * `.agents/teamwork/explorer_m1_it2_1/handoff.md`
     * `.agents/teamwork/explorer_m1_it2_2/handoff.md`
     * `.agents/teamwork/explorer_m1_it2_3/handoff.md`
   - File sở hữu: `src/app/mindmap/machData.ts` và `scripts/seed_deep_expansion.js`.
   - Worker chạy `node scripts/seed_deep_expansion.js`, `node scripts/validate_all.js`, và `npm run build`.
   - Chạy Gate verification cho M1 It2: Spawn Reviewers, Challengers, Auditor -> Xác nhận ALL PASS -> Đóng Milestone 1.
2. **Triển khai Milestone 2 (Mindmap Real-Exam Questions)**:
   - Sửa ánh xạ Topic 10 trong `src/app/mindmap/mindmapQuestions.ts`: đổi key `"TOPIC_2_4"` $\to$ `"TOPIC_3_1"`.
   - Thay thế các câu hỏi trùng lặp giữa Mindmap và `/practice` bằng các câu hỏi đề thi thật độc lập 100%.
   - Chuẩn hóa toàn bộ trường `source` thành dạng `[Nguồn: ...]`.
3. **Triển khai Milestone 3 (Practice Bank $\ge 10$/type & Dual Casio)**:
   - Bổ sung tối thiểu 10 câu hỏi đề thi thật cho mỗi dạng trong DB (tổng $\ge 70$ câu).
   - 100% câu hỏi có trường `sourceExam` dạng `[Nguồn: ...]`.
   - 100% câu hỏi có hướng dẫn bấm máy chi tiết từng nút cho cả Casio fx-580VN X và fx-880BTG.
4. **Triển khai Milestone 4 (Web UI, Navigation & ESLint)**:
   - Tạo `.eslintrc.json` (`{"extends": "next/core-web-vitals"}`).
   - Kiểm tra bộ lọc động tại `/math-types` và `/practice`.
5. **Final Milestone**:
   - Chạy `node scripts/validate_all.js` xác nhận cả 5 Tiers đều PASS (Exit code 0).
   - Chạy `npm run build` xác nhận không có lỗi.
   - Spawn Forensic Auditor kiểm định tính toàn vẹn độc lập (CLEAN).

## 6. Key Artifacts
- `d:\TEST\MATH-STUDY\PROJECT.md`
- `d:\TEST\MATH-STUDY\TEST_INFRA.md`
- `d:\TEST\MATH-STUDY\TEST_READY.md`
- `d:\TEST\MATH-STUDY\scripts\validate_all.js`
- `d:\TEST\MATH-STUDY\.agents\teamwork\ORIGINAL_REQUEST.md`
- `d:\TEST\MATH-STUDY\.agents\teamwork\orchestrator\BRIEFING.md`
- `d:\TEST\MATH-STUDY\.agents\teamwork\orchestrator\progress.md`
- `d:\TEST\MATH-STUDY\.agents\teamwork\orchestrator\GATE_STATUS.md`
