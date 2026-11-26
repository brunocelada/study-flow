import { NextResponse } from "next/server";
import { getTasksByStudentId } from "@/lib/db/tasks";

export async function GET() {
  const studentId = process.env.STUDYFLOW_DEFAULT_STUDENT_ID;

  if (!studentId) {
    return NextResponse.json(
      { error: "Student ID is not configured." },
      { status: 500 },
    );
  }

  try {
    const tasks = await getTasksByStudentId(studentId);
    return NextResponse.json(tasks);
  } catch (error) {
    console.error("Failed to fetch tasks:", error);

    return NextResponse.json(
      { error: "Unable to retrieve tasks." },
      { status: 500 },
    );
  }
}