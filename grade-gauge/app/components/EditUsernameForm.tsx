"use client";

import { useActionState } from "react";
import { setUsername } from "../lib/actions/profile";

const initialState = { error: null as string | null };

export default function EditUsernameForm({ currentUsername }: { currentUsername: string | null }) {
  const [state, formAction, pending] = useActionState(setUsername, initialState);

  return (
    <form action={formAction} className="flex flex-wrap items-start gap-2">
      <input
        name="username"
        defaultValue={currentUsername ?? ""}
        placeholder="e.g. ben_p"
        required
        minLength={3}
        maxLength={20}
        className="rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-1.5 text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-teal-500 focus:outline-none"
      />
      <button
        type="submit"
        disabled={pending}
        className="rounded-md bg-teal-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-teal-700 disabled:opacity-60"
      >
        {pending ? "Saving..." : "Save"}
      </button>
      {state.error && <p className="w-full text-sm text-red-600 dark:text-red-400">{state.error}</p>}
    </form>
  );
}
