import Link from 'next/link';

export default function NewStudySessionPage() {
  return (
    <main className="max-w-2xl mx-auto p-6 space-y-6">
      <Link
        href="/study-sessions"
        className="text-sm font-medium text-blue-600 hover:underline"
      >
        &larr; Back to Study Sessions
      </Link>

      <header>
        <h1 className="text-2xl font-bold text-gray-900">Schedule Study Session</h1>
        <p className="text-sm text-gray-600">
          Set a title, valid time range, and optional linked task.
        </p>
      </header>

      <form className="p-6 bg-white border border-gray-200 rounded-xl space-y-4">
        {/* Validation Error Placeholder (Acceptance Scenario 5) */}
        <div className="p-3 text-sm text-gray-500 bg-gray-50 border border-dashed border-gray-300 rounded-lg">
          [Validation message area: End time must be later than start time]
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Session Title *
          </label>
          <input
            type="text"
            placeholder="e.g., Review Chapter 4"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Start Time *
            </label>
            <input
              type="datetime-local"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              End Time *
            </label>
            <input
              type="datetime-local"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Linked Task (Optional)
          </label>
          <select className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white">
            <option value="">-- No linked task --</option>
          </select>
        </div>

        <div className="pt-2 flex justify-end gap-3">
          <Link
            href="/study-sessions"
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </Link>
          <button
            type="button"
            className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700"
          >
            Save Session
          </button>
        </div>
      </form>
    </main>
  );
}
