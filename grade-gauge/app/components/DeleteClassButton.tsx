"use client";

import { useActionState, useState } from "react";
import { deleteClass, type DeleteClassState } from "../lib/actions/classes";

const initialState: DeleteClassState = { error: null };

export default function DeleteClassButton({
  classId,
  classCode,
}: {
  classId: string;
  classCode: string;
}) {
  const [open, setOpen] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const [state, formAction, pending] = useActionState(deleteClass, initialState);

  const canDelete = confirmText.trim() === classCode;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="w-full rounded-md border border-rose-300 dark:border-rose-700 px-3 py-1.5 text-sm font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/30"
      >
        Delete this class
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-sm rounded-lg bg-white dark:bg-gray-800 p-5 shadow-xl">
            <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100">Delete class?</h3>
            <p className="mt-2 text-sm text-rose-600 dark:text-rose-400 font-medium">
              This can&apos;t be undone. Every assessment, submission, and member of {classCode} will
              be permanently deleted.
            </p>
            <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
              Type <span className="font-mono font-semibold text-gray-900 dark:text-gray-100">{classCode}</span> to confirm.
            </p>
            <input
              autoFocus
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              className="mt-2 w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-3 py-2 text-sm"
              placeholder={classCode}
            />

            {state.error && <p className="mt-2 text-sm text-red-600 dark:text-red-400">{state.error}</p>}

            <div className="mt-4 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  setConfirmText("");
                }}
                className="rounded-md border border-gray-300 dark:border-gray-600 px-3 py-1.5 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
              <form action={formAction}>
                <input type="hidden" name="classId" value={classId} />
                <button
                  type="submit"
                  disabled={!canDelete || pending}
                  className="rounded-md bg-rose-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-rose-700 disabled:opacity-40"
                >
                  {pending ? "Deleting..." : "Delete permanently"}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
