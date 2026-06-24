"use client";

import { useActionState } from "react";
import { createClass } from "../lib/actions/classes";

const initialState = { error: null as string | null };

export default function CreateClassForm() {
  const [state, formAction, pending] = useActionState(createClass, initialState);

  return (
    <form action={formAction} className="mt-6 space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Class name
        </label>
        <input
          id="name"
          name="name"
          required
          placeholder="Year 10 Maths"
          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-teal-500 focus:outline-none"
        />
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
          Subject
        </label>
        <input
          id="subject"
          name="subject"
          required
          placeholder="Mathematics"
          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-teal-500 focus:outline-none"
        />
      </div>

      <div>
        <label htmlFor="code" className="block text-sm font-medium text-gray-700">
          Class code
        </label>
        <input
          id="code"
          name="code"
          required
          placeholder="10MAT3"
          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-teal-500 focus:outline-none"
        />
        <p className="mt-1 text-xs text-gray-400">
          Your school/timetable code for the class. Shown on the class page.
        </p>
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description (optional)
        </label>
        <textarea
          id="description"
          name="description"
          rows={3}
          placeholder="What this page is for, ground rules, etc."
          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-teal-500 focus:outline-none"
        />
      </div>

      {state?.error && <p className="text-sm text-red-600">{state.error}</p>}

      <button
        type="submit"
        disabled={pending}
        className="rounded-md bg-teal-600 px-4 py-2 text-sm font-medium text-white hover:bg-teal-700 disabled:opacity-60"
      >
        {pending ? "Creating..." : "Create class"}
      </button>
    </form>
  );
}
