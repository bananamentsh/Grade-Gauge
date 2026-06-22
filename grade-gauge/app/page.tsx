import { redirect } from "next/navigation";

// Auth is enforced by proxy.ts. Once signed in, the dashboard is the
// real landing page, so "/" just routes there.
export default function Home() {
  redirect("/dashboard");
}
