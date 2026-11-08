import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { studentName, schoolOrClass, answers, questionIds } = body;

    if (!studentName || !answers || !Array.isArray(questionIds) || questionIds.length === 0) {
      return NextResponse.json(
        { success: false, error: "Thiếu thông tin người làm bài hoặc danh sách câu hỏi" },
        { status: 400 }
      );
    }

    // Lấy danh sách câu hỏi để chấm điểm
    const questions = await prisma.question.findMany({
      where: { id: { in: questionIds } },
    });

    let correctCount = 0;
    const evaluationResults: Record<string, any> = {};

    for (const q of questions) {
      const studentAns = answers[q.id];
      let isCorrect = false;

      if (q.questionType === "MULTIPLE_CHOICE") {
        isCorrect = studentAns === q.correctAnswer;
      } else if (q.questionType === "SHORT_ANSWER") {
        const studentClean = String(studentAns || "").trim().replace(",", ".");
        const correctClean = String(q.correctAnswer).trim().replace(",", ".");
        isCorrect = Math.abs(parseFloat(studentClean) - parseFloat(correctClean)) < 0.01;
      } else if (q.questionType === "TRUE_FALSE") {
        try {
          const correctObj = JSON.parse(q.correctAnswer);
          const studentObj = typeof studentAns === "string" ? JSON.parse(studentAns) : studentAns;
          isCorrect =
            correctObj.a === studentObj?.a &&
            correctObj.b === studentObj?.b &&
            correctObj.c === studentObj?.c &&
            correctObj.d === studentObj?.d;
        } catch {
          isCorrect = false;
        }
      }

      if (isCorrect) correctCount++;
      evaluationResults[q.id] = {
        isCorrect,
        correctAnswer: q.correctAnswer,
        studentAnswer: studentAns,
        explanation: q.explanation,
        casioGuide: q.casioGuide,
        distractorAnalysis: q.distractorAnalysis,
      };
    }

    const totalQuestions = questions.length;
    const score = Number(((correctCount / totalQuestions) * 10).toFixed(2));

    const attempt = await prisma.quizAttempt.create({
      data: {
        studentName,
        schoolOrClass: schoolOrClass || "Học sinh ôn tập",
        score,
        totalQuestions,
        correctCount,
        answersJson: JSON.stringify(answers),
      },
    });

    return NextResponse.json({
      success: true,
      attemptId: attempt.id,
      score,
      correctCount,
      totalQuestions,
      results: evaluationResults,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: "Lỗi xử lý bài thi", details: error.message },
      { status: 500 }
    );
  }
}
