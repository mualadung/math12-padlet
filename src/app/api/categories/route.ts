import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const chapter = searchParams.get("chapter");

    const where = chapter ? { chapter } : {};

    const categories = await prisma.mathCategory.findMany({
      where,
      orderBy: { order: "asc" },
      include: {
        _count: {
          select: { questions: true },
        },
      },
    });

    return NextResponse.json({ success: true, count: categories.length, data: categories });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: "Lỗi tải danh mục dạng toán", details: error.message },
      { status: 500 }
    );
  }
}
