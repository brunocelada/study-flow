import { NextResponse } from "next/server";
import { getTaskById } from "@/lib/db/tasks";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(_request: Request, { params }: RouteContext) {
  const { id } = await params;

  if (!/^\d+$/.test(id)) {
    return NextResponse.json({ error: "Invalid task ID." }, { status: 400 });
  }

  const taskId = Number(id);

  if (!Number.isSafeInteger(taskId) || taskId <= 0) {
    return NextResponse.json({ error: "Invalid task ID." }, { status: 400 });
  }

  try {
    const task = await getTaskById(taskId);

    if (!task) {
      return NextResponse.json({ error: "Task not found." }, { status: 404 });
    }

    return NextResponse.json(task);
  } catch (error) {
    console.error("Failed to fetch task:", error);

    return NextResponse.json({ error: "Unable to retrieve task." }, { status: 500 });
  }
}
