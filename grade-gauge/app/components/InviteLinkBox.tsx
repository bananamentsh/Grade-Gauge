"use client";

import { useState } from "react";
import { regenerateInviteCode } from "../lib/actions/classes";

export default function InviteLinkBox({
  classId,
  classSlug,
  inviteCode,
}: {
  classId: string;
  classSlug: string;
  inviteCode: string;
}) {
  const [copied, setCopied] = useState(false);
  const [pending, setPending] = useState(false);

  const url =
    typeof window !== "undefined"
      ? `${window.location.origin}/join/${inviteCode}`
      : `/join/${inviteCode}`;

  async function handleCopy() {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  async function handleRegenerate() {
    setPending(true);
    await regenerateInviteCode(classId, classSlug);
    setPending(false);
  }

  return (
    <div>
      <p className="truncate rounded-md border border-gray-200 bg-gray-50 px-2 py-1.5 text-xs text-gray-600">
        {url}
      </p>
      <div className="mt-2 flex gap-2">
        <button
          onClick={handleCopy}
          className="rounded-md border border-gray-300 px-2.5 py-1 text-xs font-medium text-gray-600 hover:bg-gray-50"
        >
          {copied ? "Copied!" : "Copy link"}
        </button>
        <button
          onClick={handleRegenerate}
          disabled={pending}
          className="rounded-md border border-gray-300 px-2.5 py-1 text-xs font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-60"
        >
          {pending ? "..." : "New link"}
        </button>
      </div>
    </div>
  );
}
