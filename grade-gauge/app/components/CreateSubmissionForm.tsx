"use client";

import { useActionState, useRef, useEffect } from "react";
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

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
    }
  }, [state.success]);

  return (
    <form ref={formRef} action={formAction} className="space-y-4 rounded-lg border border-gray-200 bg-white p-4">
      <h3 className="text-sm font-semibold text-gray-900">Post your submission</h3>

      <input type="hidden" name="classId" value={classId} />
      <input type="hidden" name="classSlug" value={classSlug} />
      <input type="hidden" name="assessmentId" value={assessmentId} />
      <input type="hidden" name="assessmentSlug" value={assessmentSlug} />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div>
          <label htmlFor="score" className="block text-sm font-medium text-gray-700">
            Score (out of {markedOutOf})
          </label>
          <input
            id="score"
            name="score"
            type="number"
            min="0"
            max={markedOutOf}
            required
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label htmlFor="marker" className="block text-sm font-medium text-gray-700">
            Marked by
          </label>
          <input
            id="marker"
            name="marker"
            required
            list="known-markers"
            placeholder="e.g. Ms Smith"
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
          />
          <datalist id="known-markers">
            {knownMarkers.map((marker) => (
              <option key={marker} value={marker} />
            ))}
          </datalist>
        </div>
      </div>

      <div>
        <label htmlFor="responseExcerpt" className="block text-sm font-medium text-gray-700">
          Response text (optional)
        </label>
        <textarea
          id="responseExcerpt"
          name="responseExcerpt"
          rows={3}
          placeholder="Paste a transcript or excerpt of your response"
          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label htmlFor="feedback" className="block text-sm font-medium text-gray-700">
          Feedback received (optional)
        </label>
        <textarea
          id="feedback"
          name="feedback"
          rows={2}
          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label htmlFor="file" className="block text-sm font-medium text-gray-700">
          Attach your submission (optional)
        </label>
        <input id="file" name="file" type="file" className="mt-1 block w-full text-sm text-gray-600" />
      </div>

      <label className="flex items-center gap-2 text-sm text-gray-700">
        <input type="checkbox" name="anonymous" className="h-4 w-4 rounded border-gray-300" />
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
