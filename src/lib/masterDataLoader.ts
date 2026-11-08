import { prisma } from "./prisma";
import masterData from "../../prisma/master_data.json";

export interface QuestionFilter {
  categoryCode?: string | null;
  difficulty?: string | null;
  questionType?: string | null;
  search?: string | null;
}

export async function getQuestionsSafe(filters: QuestionFilter = {}) {
  const { categoryCode, difficulty, questionType, search } = filters;

  // 1. Thử lấy từ Prisma DB
  try {
    const where: any = {};
    if (categoryCode) where.category = { code: categoryCode };
    if (difficulty) where.difficulty = difficulty;
    if (questionType) where.questionType = questionType;
    if (search) {
      where.OR = [
        { content: { contains: search } },
        { code: { contains: search } },
        { sourceExam: { contains: search } },
      ];
    }

    const dbQuestions = await prisma.question.findMany({
      where,
      orderBy: { code: "asc" },
      include: {
        category: {
          select: { code: true, title: true, chapter: true },
        },
      },
    });

    if (dbQuestions && dbQuestions.length > 0) {
      return dbQuestions;
    }
  } catch (err) {
    console.warn("[DataFallback] Prisma query failed, using master_data.json:", err);
  }

  // 2. Fallback sang master_data.json (Được đóng gói trực tiếp vào Next.js bundle)
  const catMap: Record<string, any> = {};
  masterData.categories.forEach((c: any) => {
    catMap[c.id] = c;
  });

  let list = masterData.questions.map((q: any) => ({
    ...q,
    category: catMap[q.categoryId] || { code: "DANG_1", title: "Dạng toán", chapter: "Chương I" },
  }));

  if (categoryCode) {
    list = list.filter((q: any) => q.category.code === categoryCode);
  }
  if (difficulty) {
    list = list.filter((q: any) => q.difficulty === difficulty);
  }
  if (questionType) {
    list = list.filter((q: any) => q.questionType === questionType);
  }
  if (search) {
    const s = search.toLowerCase();
    list = list.filter((q: any) =>
      q.content.toLowerCase().includes(s) ||
      q.code.toLowerCase().includes(s) ||
      q.sourceExam.toLowerCase().includes(s)
    );
  }

  return list;
}

export async function getTeamSummarySafe() {
  const groupScore = 98.0;

  // 1. Thử lấy từ Prisma DB
  try {
    const dbMembers = await prisma.teamMember.findMany({
      orderBy: { roleCode: "asc" },
      include: {
        reviewsReceived: {
          include: {
            reviewer: {
              select: { name: true, roleName: true },
            },
          },
        },
        reviewsGiven: {
          include: {
            reviewee: {
              select: { name: true, roleName: true },
            },
          },
        },
      },
    });

    if (dbMembers && dbMembers.length > 0) {
      return dbMembers.map((member) => {
        const validReviews = member.reviewsReceived.filter((r) => r.reviewerId !== member.id);
        const totalPeerScore = validReviews.reduce((sum, r) => sum + r.totalScore, 0);
        const peerAvg = validReviews.length > 0 ? Number((totalPeerScore / validReviews.length).toFixed(2)) : 0;
        const calculatedFinalScore = Number((0.7 * groupScore + 0.3 * peerAvg).toFixed(2));

        return {
          ...member,
          validReviewCount: validReviews.length,
          computedPeerAvg: peerAvg,
          computedFinalScore: calculatedFinalScore,
          groupScoreReference: groupScore,
        };
      });
    }
  } catch (err) {
    console.warn("[DataFallback] Prisma team query failed, using master_data.json:", err);
  }

  // 2. Fallback sang master_data.json (8 thành viên, 56 đánh giá chéo)
  return masterData.members.map((member: any) => {
    const reviewsReceived = masterData.reviews
      .filter((r: any) => r.revieweeId === member.id)
      .map((r: any) => ({
        ...r,
        reviewer: masterData.members.find((m: any) => m.id === r.reviewerId) || { name: "Thành viên", roleName: "" },
      }));

    const reviewsGiven = masterData.reviews
      .filter((r: any) => r.reviewerId === member.id)
      .map((r: any) => ({
        ...r,
        reviewee: masterData.members.find((m: any) => m.id === r.revieweeId) || { name: "Thành viên", roleName: "" },
      }));

    const validReviews = reviewsReceived.filter((r: any) => r.reviewerId !== member.id);
    const totalPeerScore = validReviews.reduce((sum: number, r: any) => sum + r.totalScore, 0);
    const peerAvg = validReviews.length > 0 ? Number((totalPeerScore / validReviews.length).toFixed(2)) : 0;
    const calculatedFinalScore = Number((0.7 * groupScore + 0.3 * peerAvg).toFixed(2));

    return {
      ...member,
      reviewsReceived,
      reviewsGiven,
      validReviewCount: validReviews.length,
      computedPeerAvg: peerAvg,
      computedFinalScore: calculatedFinalScore,
      groupScoreReference: groupScore,
    };
  });
}

export async function getCategoriesSafe(chapter?: string | null) {
  try {
    const where = chapter ? { chapter } : {};
    const dbCats = await prisma.mathCategory.findMany({
      where,
      orderBy: { order: "asc" },
      include: {
        _count: {
          select: { questions: true },
        },
      },
    });
    if (dbCats && dbCats.length > 0) {
      return dbCats;
    }
  } catch (err) {
    console.warn("[DataFallback] Prisma category query failed, using master_data.json:", err);
  }

  // Fallback
  let list = masterData.categories.map((c: any) => {
    const count = masterData.questions.filter((q: any) => q.categoryId === c.id).length;
    return {
      ...c,
      _count: { questions: count },
    };
  });

  if (chapter) {
    list = list.filter((c: any) => c.chapter === chapter);
  }

  return list;
}

export async function getKnowledgeItemsSafe(chapter?: string | null) {
  try {
    const where = chapter ? { chapter } : {};
    const items = await prisma.knowledgeItem.findMany({
      where,
      orderBy: { order: "asc" },
    });
    if (items && items.length > 0) {
      return items;
    }
  } catch (err) {
    console.warn("[DataFallback] Prisma knowledge query failed, using master_data.json:", err);
  }

  let list = [...masterData.knowledge];
  if (chapter) {
    list = list.filter((k: any) => k.chapter === chapter);
  }
  return list;
}
