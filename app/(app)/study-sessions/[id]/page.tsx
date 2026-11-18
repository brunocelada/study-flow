import Link from 'next/link';

interface SessionDetailProps {
  params: Promise<{ id: string }>;
}

export default async function StudySessionDetailPage({ params }: SessionDetailProps) {
  const { id } = await params;

  return (
    <main className="max-w-3xl mx-auto p-6 space-y-6">
      <Link
        href="/study-sessions"
        className="text-sm font-medium text-blue-600 hover:underline"
      >
        &larr; Back to Study Sessions
      </Link>

      <section className="p-6 bg-white border border-gray-200 rounded-xl space-y-6">
        {/* Header + Status */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <span className="inline-block px-2.5 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 rounded-full mb-2">
              [Status Placeholder]
            </span>
            <h1 className="text-2xl font-bold text-gray-900">
              [Session Title Placeholder]
            </h1>
            <p className="text-xs text-gray-400 mt-1">Route ID: {id}</p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2">
            <Link
              href={`/study-sessions/${id}/edit`}
              className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Edit
            </Link>
            <button
              type="button"
              className="px-3 py-1.5 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Mark Completed
            </button>
            <button
              type="button"
              className="px-3 py-1.5 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </div>

        {/* Session Fields */}
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-gray-100 pt-4 text-sm">
          <div>
            <dt className="text-gray-500">Date</dt>
            <dd className="font-medium text-gray-900">[Date Placeholder]</dd>
          </div>
          <div>
            <dt className="text-gray-500">Time</dt>
            <dd className="font-medium text-gray-900">[Start Time – End Time]</dd>
          </div>
          <div>
            <dt className="text-gray-500">Duration</dt>
            <dd className="font-medium text-gray-900">[Duration Placeholder]</dd>
          </div>
          <div>
            <dt className="text-gray-500">Linked Task</dt>
            <dd className="font-medium text-gray-900">
              [Linked Task or &quot;None&quot; Placeholder]
            </dd>
          </div>
        </dl>
      </section>
    </main>
  );
}
