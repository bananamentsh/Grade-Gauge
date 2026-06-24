"use client";

import { useActionState, useState } from "react";
import { createAssessment, type CreateAssessmentState } from "../lib/actions/assessments";

const TYPE_SUGGESTIONS = ["Hand in", "In-class test", "Paper", "Video", "Presentation"];
const GRADES = ["A", "B", "C", "D", "E", "0"] as const;

const initialState: CreateAssessmentState = { error: null };

export default function CreateAssessmentForm({
  classId,
  classSlug,
}: {
  classId: string;
  classSlug: string;
}) {
  const [state, formAction, pending] = useActionState(createAssessment, initialState);
  const [usesLetterGrades, setUsesLetterGrades] = useState(false);

  return (
    <form action={formAction} className="space-y-5">
      <input type="hidden" name="classId" value={classId} />
      <input type="hidden" name="classSlug" value={classSlug} />

      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Assessment name
        </label>
        <input
          id="title"
          name="title"
          required
          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
          placeholder="e.g. Topic 4 Test"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="type" className="block text-sm font-medium text-gray-700">
            Type
          </label>
          <input
            id="type"
            name="type"
            required
            list="type-suggestions"
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
            placeholder="e.g. In-class test"
          />
          <datalist id="type-suggestions">
            {TYPE_SUGGESTIONS.map((t) => (
              <option key={t} value={t} />
            ))}
          </datalist>
        </div>

        <div>
          <label htmlFor="topic" className="block text-sm font-medium text-gray-700">
            Topic
          </label>
          <input
            id="topic"
            name="topic"
            required
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
            placeholder="e.g. Calculus"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div>
          <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">
            Due date
          </label>
          <input
            id="dueDate"
            name="dueDate"
            type="date"
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label htmlFor="weighting" className="block text-sm font-medium text-gray-700">
            Weighting
          </label>
          <input
            id="weighting"
            name="weighting"
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
            placeholder="e.g. 20%"
          />
        </div>
        <div>
          <label htmlFor="markedOutOf" className="block text-sm font-medium text-gray-700">
            Marked out of
          </label>
          <input
            id="markedOutOf"
            name="markedOutOf"
            type="number"
            min="1"
            required
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
            placeholder="e.g. 50"
          />
        </div>
      </div>

      <div>
        <label htmlFor="passThreshold" className="block text-sm font-medium text-gray-700">
          Pass threshold (marks)
        </label>
        <input
          id="passThreshold"
          name="passThreshold"
          type="number"
          min="0"
          required
          className="mt-1 w-full max-w-[200px] rounded-md border border-gray-300 px-3 py-2 text-sm"
          placeholder="e.g. 25"
        />
        <p className="mt-1 text-xs text-gray-500">
          Used to calculate pass rate and the score distribution chart.
        </p>
      </div>

      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <input
            type="checkbox"
            name="usesLetterGrades"
            checked={usesLetterGrades}
            onChange={(e) => setUsesLetterGrades(e.target.checked)}
            className="h-4 w-4 rounded border-gray-300"
          />
          Uses letter grades
        </label>

        {usesLetterGrades && (
          <div className="mt-3 space-y-2 rounded-md border border-gray-200 p-3">
            <p className="text-xs text-gray-500">
              Define the mark range for each grade you want to use. Leave a row blank to skip it.
            </p>
            {GRADES.map((grade) => (
              <div key={grade} className="grid grid-cols-[2rem_1fr_1fr_2fr] items-center gap-2">
                <span className="text-sm font-semibold text-gray-700">{grade}</span>
                <input
                  name={`grade_${grade}_min`}
                  type="number"
                  placeholder="Min"
                  className="rounded-md border border-gray-300 px-2 py-1.5 text-sm"
                />
                <input
                  name={`grade_${grade}_max`}
                  type="number"
                  placeholder="Max"
                  className="rounded-md border border-gray-300 px-2 py-1.5 text-sm"
                />
                <input
                  name={`grade_${grade}_desc`}
                  placeholder="Description (optional)"
                  className="rounded-md border border-gray-300 px-2 py-1.5 text-sm"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Notes (optional)
        </label>
        <textarea
          id="description"
          name="description"
          rows={3}
          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
          placeholder="Anything else members should know"
        />
      </div>

      <div>
        <label htmlFor="attachment" className="block text-sm font-medium text-gray-700">
          Attach the question / notification (optional)
        </label>
        <input
          id="attachment"
          name="attachment"
          type="file"
          className="mt-1 block w-full text-sm text-gray-600"
        />
      </div>

      {state.error && <p className="text-sm text-red-600">{state.error}</p>}

      <button
        type="submit"
        disabled={pending}
        className="rounded-md bg-teal-600 px-4 py-2 text-sm font-medium text-white hover:bg-teal-700 disabled:opacity-60"
      >
        {pending ? "Creating..." : "Create assessment"}
      </button>
    </form>
  );
}
