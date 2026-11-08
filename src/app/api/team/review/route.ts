import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { reviewerId, revieweeId, criterion1, criterion2, criterion3, criterion4, criterion5, comment } = body;

    if (!reviewerId || !revieweeId) {
      return NextResponse.json(
        { success: false, error: "Thiếu thông tin người chấm hoặc người được chấm" },
        { status: 400 }
      );
    }

    if (reviewerId === revieweeId) {
      return NextResponse.json(
        { success: false, error: "Quy tắc: Không được tự chấm điểm cho chính mình!" },
        { status: 400 }
      );
    }

    const c1 = Number(criterion1) || 0;
    const c2 = Number(criterion2) || 0;
    const c3 = Number(criterion3) || 0;
    const c4 = Number(criterion4) || 0;
    const c5 = Number(criterion5) || 0;

    // Giới hạn điểm theo quy định
    if (c1 > 30 || c2 > 25 || c3 > 20 || c4 > 15 || c5 > 10) {
      return NextResponse.json(
        { success: false, error: "Điểm số các tiêu chí vượt quá giới hạn tối đa cho phép!" },
        { status: 400 }
      );
    }

    const totalScore = Number((c1 + c2 + c3 + c4 + c5).toFixed(2));

    const updatedReview = await prisma.peerReview.upsert({
      where: {
        reviewerId_revieweeId: {
          reviewerId,
          revieweeId,
        },
      },
      update: {
        criterion1: c1,
        criterion2: c2,
        criterion3: c3,
        criterion4: c4,
        criterion5: c5,
        totalScore,
        comment: comment || "",
      },
      create: {
        reviewerId,
        revieweeId,
        criterion1: c1,
        criterion2: c2,
        criterion3: c3,
        criterion4: c4,
        criterion5: c5,
        totalScore,
        comment: comment || "",
      },
    });

    // Cập nhật lại điểm trung bình cho reviewee
    const allReviews = await prisma.peerReview.findMany({
      where: {
        revieweeId,
        reviewerId: { not: revieweeId },
      },
    });

    const sum = allReviews.reduce((acc, r) => acc + r.totalScore, 0);
    const avg = allReviews.length > 0 ? Number((sum / allReviews.length).toFixed(2)) : 0;
    const groupScore = 98.0;
    const finalScore = Number((0.7 * groupScore + 0.3 * avg).toFixed(2));

    await prisma.teamMember.update({
      where: { id: revieweeId },
      data: {
        finalPeerAvg: avg,
        finalScore,
      },
    });

    return NextResponse.json({
      success: true,
      data: updatedReview,
      updatedAvg: avg,
      updatedFinalScore: finalScore,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: "Lỗi cập nhật phiếu chấm chéo", details: error.message },
      { status: 500 }
    );
  }
}
