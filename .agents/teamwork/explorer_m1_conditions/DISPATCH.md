## 2026-11-08T05:19:58Z
Read d:\TEST\MATH-STUDY\.agents\teamwork\ORIGINAL_REQUEST.md and d:\TEST\MATH-STUDY\PROJECT.md first.
Your working directory is d:\TEST\MATH-STUDY\.agents\teamwork\explorer_m1_conditions\.
Your identity is an Explorer (teamwork_explorer).

Milestone: Milestone 1 — Math Types & KaTeX Standardization.
Your Focus: Mathematical rigor and explicit domain conditions across all 37 math types.

Task:
1. Examine all 37 math types in `src/app/mindmap/machData.ts` and the core knowledge in `prisma/seed.js`.
2. As identified in preliminary survey, 14/37 types lack strict domain conditions:
   - Tập xác định D
   - Điều kiện liên tục và khả vi
   - Mẫu thức khác 0 (phân thức hữu tỉ, tiệm cận)
   - Biểu thức trong căn bậc hai không âm (hàm chứa căn, độ dài vectơ, khoảng cách)
   - Vectơ khác vectơ-không (\vec{a} \ne \vec{0}, \vec{u} \ne \vec{0})
   - Điều kiện hai vectơ cùng phương (tồn tại k \ne 0), điều kiện 3 điểm thẳng hàng, 4 điểm đồng phẳng
   - Điều kiện vuông góc (\vec{u} \cdot \vec{v} = 0)
   - Công thức tích có hướng [\vec{u}, \vec{v}], diện tích tam giác S = 1/2 |[\vec{AB}, \vec{AC}]|, thể tích tứ diện V = 1/6 |[\vec{AB}, \vec{AC}] \cdot \vec{AD}|
   - Điều kiện phương trình mặt cầu x^2 + y^2 + z^2 - 2ax - 2by - 2cz + d = 0 có R^2 = a^2 + b^2 + c^2 - d > 0.
3. Formulate the precise mathematical text and KaTeX formulas that the Worker must insert into each of the 37 types so that 100% of types have explicit conditions.
4. Write your comprehensive report to d:\TEST\MATH-STUDY\.agents\teamwork\explorer_m1_conditions\handoff.md.
5. Update progress.md in your directory.
6. Send a completion message via send_message to your caller.
