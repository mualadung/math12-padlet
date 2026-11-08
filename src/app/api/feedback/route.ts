import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const feedbacks = await prisma.feedback.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ success: true, count: feedbacks.length, data: feedbacks });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: "Lỗi tải nhận xét góp ý", details: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { studentName, schoolOrClass, rating, strengths, improvements, quizAttemptId } = body;

    if (!studentName || !strengths || !improvements) {
      return NextResponse.json(
        { success: false, error: "Vui lòng điền đủ tên, điểm mạnh và góp ý cải thiện" },
        { status: 400 }
      );
    }

    const feedback = await prisma.feedback.create({
      data: {
        studentName,
        schoolOrClass: schoolOrClass || "Nhóm bạn học sinh",
        rating: Number(rating) || 5,
        strengths,
        improvements,
        quizAttemptId: quizAttemptId || null,
      },
    });

    return NextResponse.json({ success: true, data: feedback });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: "Lỗi lưu phản hồi", details: error.message },
      { status: 500 }
    );
  }
}
