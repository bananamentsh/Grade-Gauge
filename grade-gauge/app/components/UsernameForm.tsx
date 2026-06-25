"use client";

import { useActionState } from "react";
import { setUsername } from "../lib/actions/profile";

const initialState = { error: null as string | null };

export default function UsernameForm() {
  const [state, formAction, pending] = useActionState(setUsername, initialState);

  return (
    <div className="rounded-lg border border-amber-200 dark:border-amber-700 bg-amber-50 dark:bg-amber-900/20 p-4">
      <h2 className="text-sm font-semibold text-amber-900 dark:text-amber-200">Pick a username</h2>
      <p className="mt-1 text-sm text-amber-800 dark:text-amber-300">
        Other people will see this when you submit work or request to join a class.
      </p>
      <form action={formAction} className="mt-3 flex flex-wrap items-start gap-2">
        <input
          name="username"
          placeholder="e.g. ben_p"
          required
          minLength={3}
          maxLength={20}
          className="rounded-md border border-amber-300 dark:border-amber-700 bg-white dark:bg-gray-800 px-3 py-1.5 text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-amber-500 focus:outline-none"
        />
        <button
          type="submit"
          disabled={pending}
          className="rounded-md bg-amber-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-amber-700 disabled:opacity-60"
        >
          {pending ? "Saving..." : "Save username"}
        </button>
      </form>
      {state.error && <p className="mt-2 text-sm text-red-600">{state.error}</p>}
    </div>
  );
}
