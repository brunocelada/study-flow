"use client";

import { useEffect, useState } from "react";

import TaskCard from "@/components/tasks/TaskCard";
import Card from "@/components/ui/Card";
import ButtonLink from "@/components/ui/ButtonLink";

import type { Task, TaskStatus } from "@/types/task";

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionError, setActionError] = useState("");

  const [busyTaskId, setBusyTaskId] = useState<Task["id"] | null>(null);

  // FETCH TASKS
  useEffect(() => {
    const controller = new AbortController();

    async function loadTasks() {
      try {
        const response = await fetch("/api/tasks", {
          cache: "no-store",
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Unable to load tasks.");
        }

        const data: unknown = await response.json();

        if (!Array.isArray(data)) {
          throw new Error("Invalid tasks response.");
        }

        setTasks(data as Task[]);
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") {
          return;
        }

        setError(err instanceof Error ? err.message : "Something went wrong.");
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    void loadTasks();

    return () => controller.abort();
  }, []);

  // CHANGE TASK STATUS
  async function handleStatusChange(id: Task["id"], status: TaskStatus) {
    setActionError("");
    setBusyTaskId(id);

    try {
      const response = await fetch(`/api/tasks/${encodeURIComponent(String(id))}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        throw new Error("Unable to update task.");
      }

      setTasks((currentTasks) =>
        currentTasks.map((task) => (task.id === id ? { ...task, status } : task)),
      );
    } catch (err) {
      setActionError(err instanceof Error ? err.message : "Unable to update task.");
    } finally {
      setBusyTaskId(null);
    }
  }

  // DELETE TASK
  async function handleDelete(id: Task["id"]) {
    const confirmed = window.confirm("Are you sure you want to delete this task?");

    if (!confirmed) return;

    setActionError("");
    setBusyTaskId(id);

    try {
      const response = await fetch(`/api/tasks/${encodeURIComponent(String(id))}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Unable to delete task.");
      }

      setTasks((currentTasks) => currentTasks.filter((task) => task.id !== id));
    } catch (err) {
      setActionError(err instanceof Error ? err.message : "Unable to delete task.");
    } finally {
      setBusyTaskId(null);
    }
  }

  // LOADING STATE
  if (isLoading) {
    return (
      <div className="space-y-4" aria-label="Loading tasks">
        {[1, 2, 3].map((item) => (
          <Card key={item}>
            <div className="space-y-3 animate-pulse">
              <div className="h-5 w-32 rounded bg-slate-200" />
              <div className="h-6 w-64 max-w-full rounded bg-slate-200" />
              <div className="h-4 w-48 rounded bg-slate-200" />
            </div>
          </Card>
        ))}
      </div>
    );
  }

  // ERROR STATE
  if (error) {
    return (
      <Card className="border-red-200 bg-red-50">
        <div role="alert">
          <h2 className="font-semibold text-red-700">Something went wrong</h2>

          <p className="mt-1 text-sm text-red-600">{error}</p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* ACTION ERROR */}
      {actionError && (
        <p
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600"
        >
          {actionError}
        </p>
      )}

      {/* EMPTY STATE */}
      {tasks.length === 0 ? (
        <Card className="border-dashed px-6 py-12 text-center">
          <h2 className="text-lg font-semibold text-slate-900">No tasks yet</h2>

          <p className="mt-2 text-sm text-slate-500">
            Create your first task to start organizing your academic work.
          </p>

          <ButtonLink href="/tasks/new" className="mt-5">
            Create your first task
          </ButtonLink>
        </Card>
      ) : (
        <>
          {/* TASK COUNT */}
          <p className="text-sm text-slate-500">
            {tasks.length} {tasks.length === 1 ? "task" : "tasks"}
          </p>

          {/* TASK CARDS */}
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onStatusChange={handleStatusChange}
              onDelete={handleDelete}
              disabled={busyTaskId === task.id}
            />
          ))}
        </>
      )}
    </div>
  );
}
