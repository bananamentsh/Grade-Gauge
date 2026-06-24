import { approveJoinRequest, denyJoinRequest, type PendingJoinRequest } from "../lib/actions/joinRequests";

export default function PendingRequestsList({
  requests,
  classSlug,
}: {
  requests: PendingJoinRequest[];
  classSlug: string;
}) {
  if (requests.length === 0) {
    return <p className="text-sm text-gray-400">No pending requests.</p>;
  }

  return (
    <ul className="space-y-2">
      {requests.map((request) => (
        <li
          key={request.id}
          className="flex items-center justify-between gap-2 rounded-md border border-gray-200 px-2.5 py-2"
        >
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-gray-900">
              {request.username ? `@${request.username}` : request.displayName || "Unnamed user"}
            </p>
            <p className="truncate text-xs text-gray-500">{request.email}</p>
          </div>
          <div className="flex shrink-0 gap-1.5">
            <form action={approveJoinRequest.bind(null, request.id, classSlug)}>
              <button
                type="submit"
                className="rounded-md bg-teal-600 px-2 py-1 text-xs font-medium text-white hover:bg-teal-700"
              >
                Approve
              </button>
            </form>
            <form action={denyJoinRequest.bind(null, request.id, classSlug)}>
              <button
                type="submit"
                className="rounded-md border border-gray-300 px-2 py-1 text-xs font-medium text-gray-600 hover:bg-gray-50"
              >
                Deny
              </button>
            </form>
          </div>
        </li>
      ))}
    </ul>
  );
}
