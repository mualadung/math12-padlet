import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const chapter = searchParams.get("chapter");

    const where = chapter ? { chapter } : {};

    const items = await prisma.knowledgeItem.findMany({
      where,
      orderBy: { order: "asc" },
    });

    return NextResponse.json({ success: true, count: items.length, data: items });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: "Lỗi tải kiến thức trọng tâm", details: error.message },
      { status: 500 }
    );
  }
}
