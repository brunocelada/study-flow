import Link from "next/link";
import TaskForm from "@/components/tasks/TaskForm";

export const metadata = {
  title: "New Task | StudyFlow",
};

export default function NewTaskPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6">
      <div className="mb-8">
        <Link href="/tasks" className="text-sm font-medium text-blue-600 hover:text-blue-700">
          ← Back to Tasks
        </Link>

        <h1 className="mt-5 text-3xl font-bold tracking-tight text-slate-900">Create New Task</h1>

        <p className="mt-2 text-slate-500">
          Add a new assignment or academic activity to your workload.
        </p>
      </div>

      <TaskForm mode="create" />
    </main>
  );
}
