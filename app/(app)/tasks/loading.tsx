export default function TasksLoading() {
  return (
    <main
      className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8"
      aria-label="Loading tasks"
    >
      <div className="mb-8 flex flex-col gap-3">
        <div className="h-4 w-32 animate-pulse rounded bg-slate-200" />
        <div className="h-9 w-48 animate-pulse rounded bg-slate-200" />
        <div className="h-5 w-80 max-w-full animate-pulse rounded bg-slate-200" />
      </div>

      <div className="space-y-4">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="h-36 animate-pulse rounded-xl border border-slate-200 bg-white"
          />
        ))}
      </div>
    </main>
  );
}