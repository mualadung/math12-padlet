import { NextResponse } from "next/server";
import { getCategoriesSafe } from "@/lib/masterDataLoader";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const chapter = searchParams.get("chapter");

    const categories = await getCategoriesSafe(chapter);

    return NextResponse.json({ success: true, count: categories.length, data: categories });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: "Lỗi tải danh mục dạng toán", details: error.message },
      { status: 500 }
    );
  }
}
