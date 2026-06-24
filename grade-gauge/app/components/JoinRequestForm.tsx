"use client";

import { useActionState } from "react";
import { requestToJoin, type JoinRequestState } from "../lib/actions/joinRequests";

const initialState: JoinRequestState = { error: null, alreadyMember: false, alreadyRequested: false };

export default function JoinRequestForm({ classId, code }: { classId: string; code: string }) {
  const [state, formAction, pending] = useActionState(requestToJoin, initialState);

  if (state.alreadyMember || state.alreadyRequested) {
    return (
      <p className="mt-4 text-sm text-emerald-700">
        {state.alreadyMember
          ? "You're already a member of this class."
          : "Request already sent — waiting on the class admin."}
      </p>
    );
  }

  return (
    <form action={formAction} className="mt-4">
      <input type="hidden" name="classId" value={classId} />
      <input type="hidden" name="code" value={code} />
      <button
        type="submit"
        disabled={pending}
        className="rounded-md bg-teal-600 px-4 py-2 text-sm font-medium text-white hover:bg-teal-700 disabled:opacity-60"
      >
        {pending ? "Sending..." : "Request to join"}
      </button>
      {state.error && <p className="mt-2 text-sm text-red-600">{state.error}</p>}
    </form>
  );
}
