import { NextResponse } from "next/server";
import { getKnowledgeItemsSafe } from "@/lib/masterDataLoader";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const chapter = searchParams.get("chapter");

    const items = await getKnowledgeItemsSafe(chapter);

    return NextResponse.json({ success: true, count: items.length, data: items });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: "Lỗi tải kiến thức trọng tâm", details: error.message },
      { status: 500 }
    );
  }
}
