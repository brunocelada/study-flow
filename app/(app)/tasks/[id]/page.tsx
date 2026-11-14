"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import TaskForm from "@/components/tasks/TaskForm";
import type { Task } from "@/types/task";

export default function TaskDetailsPage() {
  const { id } = useParams<{ id: string }>();

  const [task, setTask] = useState<Task | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function loadTask() {
      try {
        const response = await fetch(`/api/tasks/${encodeURIComponent(id)}`, {
          cache: "no-store",
          signal: controller.signal,
        });

        if (response.status === 404) {
          throw new Error("Task not found.");
        }

        if (!response.ok) {
          throw new Error("Unable to load task.");
        }

        const data: Task = await response.json();
        setTask(data);
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") {
          return;
        }

        setError(
          err instanceof Error ? err.message : "Something went wrong.",
        );
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    void loadTask();

    return () => controller.abort();
  }, [id]);

  if (isLoading) {
    return (
      <main className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6">
        <div className="h-8 w-48 animate-pulse rounded bg-slate-200" />
        <div className="mt-8 h-96 animate-pulse rounded-xl bg-white" />
      </main>
    );
  }

  if (error || !task) {
    return (
      <main className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6">
        <div
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 p-6"
        >
          <h1 className="text-xl font-semibold text-red-700">
            {error || "Task not found"}
          </h1>

          <p className="mt-2 text-sm text-red-600">
            The requested task could not be loaded.
          </p>

          <Link
            href="/tasks"
            className="mt-5 inline-block text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            ← Back to Tasks
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6">
      <div className="mb-8">
        <Link
          href="/tasks"
          className="text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          ← Back to Tasks
        </Link>

        <h1 className="mt-5 text-3xl font-bold tracking-tight text-slate-900">
          Task Details
        </h1>

        <p className="mt-2 text-slate-500">
          View and update your task information.
        </p>
      </div>

      <TaskForm mode="edit" task={task} />
    </main>
  );
}