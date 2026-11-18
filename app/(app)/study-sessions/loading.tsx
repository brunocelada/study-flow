export default function StudySessionsLoading() {
  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6 animate-pulse">
      {/* Header Skeleton */}
      <div className="flex justify-between items-center">
        <div className="h-8 w-48 bg-gray-200 rounded" />
        <div className="h-10 w-40 bg-gray-200 rounded-lg" />
      </div>

      {/* Cards Grid Skeleton */}
      <div className="grid gap-4 md:grid-cols-2">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="p-5 border border-gray-200 rounded-xl space-y-3 bg-white"
          >
            <div className="h-5 w-3/4 bg-gray-200 rounded" />
            <div className="h-4 w-1/3 bg-gray-200 rounded" />
            <div className="h-4 w-1/2 bg-gray-200 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
