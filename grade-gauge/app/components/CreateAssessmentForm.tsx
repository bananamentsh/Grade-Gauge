"use client";

import { useActionState, useId, useRef, useState } from "react";
import { createAssessment, type CreateAssessmentState } from "../lib/actions/assessments";

const TYPE_SUGGESTIONS = ["Hand in", "In-class test", "Paper", "Video", "Presentation"];

const DEFAULT_GRADES = ["A", "B", "C", "D", "F"];

interface GradeRow {
  key: string;
  name: string;
  min: string;
  max: string;
  description: string;
}

let rowCounter = 0;
function newRow(name = ""): GradeRow {
  rowCounter += 1;
  return { key: `grade-${rowCounter}`, name, min: "", max: "", description: "" };
}

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
  const [gradeRows, setGradeRows] = useState<GradeRow[]>(() => DEFAULT_GRADES.map((g) => newRow(g)));
  const [attachmentName, setAttachmentName] = useState<string | null>(null);
  const fileInputId = useId();
  const fileInputRef = useRef<HTMLInputElement>(null);

  function updateRow(key: string, field: keyof GradeRow, value: string) {
    setGradeRows((rows) => rows.map((row) => (row.key === key ? { ...row, [field]: value } : row)));
  }

  function addRow() {
    setGradeRows((rows) => [...rows, newRow()]);
  }

  function removeRow(key: string) {
    setGradeRows((rows) => rows.filter((row) => row.key !== key));
  }

  return (
    <form action={formAction} className="space-y-5">
      <input type="hidden" name="classId" value={classId} />
      <input type="hidden" name="classSlug" value={classSlug} />

      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Assessment name
        </label>
        <input
          id="title"
          name="title"
          required
          className="mt-1 w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm"
          placeholder="e.g. Topic 4 Test"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="type" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Type
          </label>
          <input
            id="type"
            name="type"
            required
            list="type-suggestions"
            className="mt-1 w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm"
            placeholder="e.g. In-class test"
          />
          <datalist id="type-suggestions">
            {TYPE_SUGGESTIONS.map((t) => (
              <option key={t} value={t} />
            ))}
          </datalist>
        </div>

        <div>
          <label htmlFor="topic" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Topic
          </label>
          <input
            id="topic"
            name="topic"
            required
            className="mt-1 w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm"
            placeholder="e.g. Calculus"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div>
          <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Due date
          </label>
          <input
            id="dueDate"
            name="dueDate"
            type="date"
            className="mt-1 w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label htmlFor="weighting" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Weighting
          </label>
          <input
            id="weighting"
            name="weighting"
            className="mt-1 w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm"
            placeholder="e.g. 20%"
          />
        </div>
        <div>
          <label htmlFor="markedOutOf" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Marked out of
          </label>
          <input
            id="markedOutOf"
            name="markedOutOf"
            type="number"
            min="1"
            required
            className="mt-1 w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm"
            placeholder="e.g. 50"
          />
        </div>
      </div>

      <div>
        <label htmlFor="passThreshold" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Pass threshold (marks)
        </label>
        <input
          id="passThreshold"
          name="passThreshold"
          type="number"
          min="0"
          required
          className="mt-1 w-full max-w-[200px] rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm"
          placeholder="e.g. 25"
        />
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          Used to calculate pass rate and the score distribution chart.
        </p>
      </div>

      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
          <input
            type="checkbox"
            name="usesLetterGrades"
            checked={usesLetterGrades}
            onChange={(e) => setUsesLetterGrades(e.target.checked)}
            className="h-4 w-4 rounded border-gray-300 dark:border-gray-600"
          />
          Uses letter grades
        </label>

        {usesLetterGrades && (
          <div className="mt-3 space-y-2 rounded-md border border-gray-200 dark:border-gray-700 p-3">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Name each grade and set its mark range. Add or remove grades as you like — call them
              A/B/C, Pass/Fail, or anything else.
            </p>

            <div className="space-y-2">
              {gradeRows.map((row) => (
                <div key={row.key} className="grid grid-cols-[5rem_1fr_1fr_2fr_auto] items-center gap-2">
                  <input
                    name="gradeName"
                    value={row.name}
                    onChange={(e) => updateRow(row.key, "name", e.target.value)}
                    placeholder="Name"
                    required
                    className="rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-2 py-1.5 text-sm font-semibold"
                  />
                  <input
                    name="gradeMin"
                    value={row.min}
                    onChange={(e) => updateRow(row.key, "min", e.target.value)}
                    type="number"
                    placeholder="Min"
                    required
                    className="rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-2 py-1.5 text-sm"
                  />
                  <input
                    name="gradeMax"
                    value={row.max}
                    onChange={(e) => updateRow(row.key, "max", e.target.value)}
                    type="number"
                    placeholder="Max"
                    required
                    className="rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-2 py-1.5 text-sm"
                  />
                  <input
                    name="gradeDesc"
                    value={row.description}
                    onChange={(e) => updateRow(row.key, "description", e.target.value)}
                    placeholder="Description (optional)"
                    className="rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-2 py-1.5 text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => removeRow(row.key)}
                    aria-label={`Remove ${row.name || "grade"}`}
                    className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-900/30"
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 7h12M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2m2 0-1 13a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1L6 7h12Z"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={addRow}
              className="mt-1 rounded-md border border-dashed border-gray-300 dark:border-gray-600 px-3 py-1.5 text-sm font-medium text-teal-700 dark:text-teal-400 hover:bg-teal-50 dark:hover:bg-teal-900/30"
            >
              + Add grade
            </button>
          </div>
        )}
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Notes (optional)
        </label>
        <textarea
          id="description"
          name="description"
          rows={3}
          className="mt-1 w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm"
          placeholder="Anything else members should know"
        />
      </div>

      <div>
        <span className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Attach the question / notification (optional)
        </span>
        <div className="mt-1 flex items-center gap-3">
          <label
            htmlFor={fileInputId}
            className="inline-flex shrink-0 cursor-pointer items-center gap-2 rounded-md bg-gray-100 dark:bg-gray-700 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v12m0 0-4-4m4 4 4-4M4 20h16" />
            </svg>
            Choose file
          </label>
          <input
            id={fileInputId}
            ref={fileInputRef}
            name="attachment"
            type="file"
            className="sr-only"
            onChange={(e) => setAttachmentName(e.target.files?.[0]?.name ?? null)}
          />
          <span className="truncate text-sm text-gray-500 dark:text-gray-400">
            {attachmentName ?? "No file chosen"}
          </span>
        </div>
      </div>

      {state.error && <p className="text-sm text-red-600 dark:text-red-400">{state.error}</p>}

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
