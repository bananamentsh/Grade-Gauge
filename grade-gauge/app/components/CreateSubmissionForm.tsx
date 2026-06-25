"use client";

import { useActionState, useId, useRef, useState, useEffect } from "react";
import { createSubmission, type CreateSubmissionState } from "../lib/actions/submissions";

const initialState: CreateSubmissionState = { error: null, success: false };

export default function CreateSubmissionForm({
  classId,
  classSlug,
  assessmentId,
  assessmentSlug,
  markedOutOf,
  knownMarkers = [],
}: {
  classId: string;
  classSlug: string;
  assessmentId: string;
  assessmentSlug: string;
  markedOutOf: number;
  knownMarkers?: string[];
}) {
  const [state, formAction, pending] = useActionState(createSubmission, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputId = useId();

  // Derived-state-during-render pattern (React's recommended alternative to
  // setState-in-effect): clear the filename the moment we notice the action
  // just succeeded, tracked with state (not a ref — refs can't be read
  // during render) so it only fires once per success.
  const [lastSuccess, setLastSuccess] = useState(false);
  if (state.success !== lastSuccess) {
    setLastSuccess(state.success);
    if (state.success) {
      setFileName(null);
    }
  }

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
    }
  }, [state.success]);

  return (
    <form ref={formRef} action={formAction} className="space-y-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4">
      <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Post your submission</h3>

      <input type="hidden" name="classId" value={classId} />
      <input type="hidden" name="classSlug" value={classSlug} />
      <input type="hidden" name="assessmentId" value={assessmentId} />
      <input type="hidden" name="assessmentSlug" value={assessmentSlug} />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div>
          <label htmlFor="score" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Score (out of {markedOutOf})
          </label>
          <input
            id="score"
            name="score"
            type="number"
            min="0"
            max={markedOutOf}
            required
            className="mt-1 w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label htmlFor="marker" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Marked by
          </label>
          <input
            id="marker"
            name="marker"
            required
            list="known-markers"
            placeholder="e.g. Ms Smith"
            className="mt-1 w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 text-sm"
          />
          <datalist id="known-markers">
            {knownMarkers.map((marker) => (
              <option key={marker} value={marker} />
            ))}
          </datalist>
        </div>
      </div>

      <div>
        <label htmlFor="responseExcerpt" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Response text (optional)
        </label>
        <textarea
          id="responseExcerpt"
          name="responseExcerpt"
          rows={3}
          placeholder="Paste a transcript or excerpt of your response"
          className="mt-1 w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label htmlFor="feedback" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Feedback received (optional)
        </label>
        <textarea
          id="feedback"
          name="feedback"
          rows={2}
          className="mt-1 w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 text-sm"
        />
      </div>

      <div>
        <span className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Attach your submission (optional)
        </span>
        <div className="mt-1 flex items-center gap-3">
          <label
            htmlFor={fileInputId}
            className="inline-flex shrink-0 cursor-pointer items-center gap-2 rounded-md bg-gray-100 dark:bg-gray-700 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v12m0 0-4-4m4 4 4-4M4 20h16" />
            </svg>
            Choose file
          </label>
          <input
            id={fileInputId}
            name="file"
            type="file"
            className="sr-only"
            onChange={(e) => setFileName(e.target.files?.[0]?.name ?? null)}
          />
          <span className="truncate text-sm text-gray-500 dark:text-gray-400">{fileName ?? "No file chosen"}</span>
        </div>
      </div>

      <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
        <input type="checkbox" name="anonymous" className="h-4 w-4 rounded border-gray-300 dark:border-gray-600" />
        Post anonymously
      </label>

      {state.error && <p className="text-sm text-red-600">{state.error}</p>}
      {state.success && <p className="text-sm text-emerald-600">Submission posted.</p>}

      <button
        type="submit"
        disabled={pending}
        className="rounded-md bg-teal-600 px-4 py-2 text-sm font-medium text-white hover:bg-teal-700 disabled:opacity-60"
      >
        {pending ? "Posting..." : "Post submission"}
      </button>
    </form>
  );
}
