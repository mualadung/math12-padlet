import { NextResponse } from "next/server";
import { getTeamSummarySafe } from "@/lib/masterDataLoader";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const summary = await getTeamSummarySafe();

    return NextResponse.json({
      success: true,
      groupScoreTarget: 98.0,
      data: summary,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: "Lỗi tải thông tin thành viên nhóm", details: error.message },
      { status: 500 }
    );
  }
}
