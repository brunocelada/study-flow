import Link from 'next/link';

export default function StudySessionsPage() {
  return (
    <main className="max-w-5xl mx-auto p-6 space-y-8">
      {/* Header */}
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Study Sessions</h1>
          <p className="text-sm text-gray-600">
            Plan study time and record your completed activity.
          </p>
        </div>
        <Link
          href="/study-sessions/new"
          className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 text-center"
        >
          + Schedule Session
        </Link>
      </header>

      {/* Planned Sessions Section */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Planned Sessions
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="p-5 bg-white border border-gray-200 rounded-xl flex flex-col justify-between gap-4">
            <div>
              <div className="flex justify-between items-start gap-2">
                <span className="font-semibold text-gray-900">
                  [Session Title Placeholder]
                </span>
                <span className="px-2.5 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                  Planned
                </span>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                [Date &amp; Time Range Placeholder]
              </p>
              <p className="text-xs text-gray-500 mt-1">
                [Optional Linked Task Placeholder]
              </p>
            </div>

            <div className="flex items-center gap-2 pt-3 border-t border-gray-100 text-sm">
              <Link
                href="/study-sessions/sample-id"
                className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50"
              >
                View
              </Link>
              <button
                type="button"
                className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Mark Complete
              </button>
              <button
                type="button"
                className="px-3 py-1 text-red-600 border border-red-200 rounded hover:bg-red-50"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Completed Sessions Section */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Completed Activity
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="p-5 bg-gray-50 border border-gray-200 rounded-xl flex justify-between items-center">
            <div>
              <span className="font-medium text-gray-900">
                [Completed Session Title Placeholder]
              </span>
              <p className="text-xs text-gray-500 mt-1">
                [Completed Date &amp; Duration Placeholder]
              </p>
            </div>
            <span className="px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800 rounded-full">
              Completed
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}
