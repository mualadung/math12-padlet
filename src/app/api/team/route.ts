import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const members = await prisma.teamMember.findMany({
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

    // Tính toán lại điểm trung bình 4 phiếu chấm chéo và điểm cá nhân (70% nhóm + 30% cá nhân)
    // Giả sử điểm sản phẩm nhóm đạt mục tiêu là 98.0 / 100 điểm
    const groupScore = 98.0;

    const summary = members.map((member) => {
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

    return NextResponse.json({
      success: true,
      groupScoreTarget: groupScore,
      data: summary,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: "Lỗi tải thông tin nhóm", details: error.message },
      { status: 500 }
    );
  }
}
