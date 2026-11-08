import { NextResponse } from "next/server";
import { getQuestionsSafe } from "@/lib/masterDataLoader";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const categoryCode = searchParams.get("categoryCode");
    const difficulty = searchParams.get("difficulty");
    const questionType = searchParams.get("questionType");
    const search = searchParams.get("search");

    const questions = await getQuestionsSafe({
      categoryCode,
      difficulty,
      questionType,
      search,
    });

    return NextResponse.json({ success: true, count: questions.length, data: questions });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: "Lỗi tải danh sách câu hỏi", details: error.message },
      { status: 500 }
    );
  }
}
