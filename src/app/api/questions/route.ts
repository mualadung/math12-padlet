import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const categoryCode = searchParams.get("categoryCode");
    const difficulty = searchParams.get("difficulty");
    const questionType = searchParams.get("questionType");
    const search = searchParams.get("search");

    const where: any = {};

    if (categoryCode) {
      where.category = { code: categoryCode };
    }
    if (difficulty) {
      where.difficulty = difficulty;
    }
    if (questionType) {
      where.questionType = questionType;
    }
    if (search) {
      where.OR = [
        { content: { contains: search } },
        { code: { contains: search } },
        { sourceExam: { contains: search } },
      ];
    }

    const questions = await prisma.question.findMany({
      where,
      orderBy: { code: "asc" },
      include: {
        category: {
          select: {
            code: true,
            title: true,
            chapter: true,
          },
        },
      },
    });

    return NextResponse.json({ success: true, count: questions.length, data: questions });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: "Lỗi tải danh sách câu hỏi", details: error.message },
      { status: 500 }
    );
  }
}
