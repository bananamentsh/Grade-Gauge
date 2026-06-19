# Grade Gauge — Build Roadmap

---

## How this works

You're building a website. The code lives on your computer, Supabase holds all the data (users, posts, etc.), and Vercel puts it on the internet. You write code → test it locally → push it live.

---

## Phase 1 — Get your environment set up
*You only do this once. It's boring but necessary.*

1. **Install Node.js** — download from nodejs.org. This lets you run JavaScript on your computer.
2. **Create a Supabase account** at supabase.com and create a new project. This is your database.
3. **Create a Vercel account** at vercel.com. This is where your site will live.
4. **Create a GitHub account** (if you don't have one) at github.com. Vercel watches your GitHub and auto-deploys whenever you push code.
5. **Install VS Code** + open a terminal inside it (Terminal → New Terminal).
6. Run this in the terminal to create your Next.js app:
   ```
   npx create-next-app@latest grade-gauge
   ```
   Choose: TypeScript → No, Tailwind → Yes, App Router → Yes, everything else → defaults.
7. Open the new `grade-gauge` folder in VS Code.
8. Connect your project to GitHub and link it to Vercel. Vercel will give you a live URL immediately (it'll just be blank for now).

**You'll know this phase is done when:** you can visit your Vercel URL and see the default Next.js homepage.

---

## Phase 2 — Accounts (sign up / log in)
*Supabase handles almost all of this for you.*

1. In Supabase, go to **Authentication → Providers** and make sure Email is enabled.
2. Install the Supabase library in your project:
   ```
   npm install @supabase/supabase-js @supabase/ssr
   ```
3. Add your Supabase URL and secret key to a `.env.local` file (Supabase dashboard → Project Settings → API).
4. Build three pages:
   - `/signup` — email + password form
   - `/login` — email + password form
   - `/dashboard` — placeholder page that only logged-in users can see
5. If someone tries to visit `/dashboard` without being logged in, redirect them to `/login`.

**You'll know this phase is done when:** you can create an account, log out, and log back in.

---

## Phase 3 — Database structure
*You're designing the "shape" of all your data before writing any more code.*

In Supabase, go to the **Table Editor** and create these tables:

| Table | What it stores |
|---|---|
| `profiles` | One row per user — username, email, display name |
| `class_pages` | One row per class — name, subject, anonymity setting, archived or not |
| `memberships` | Who is in which class, and are they an admin |
| `assignments` | Assignments within a class — name, type, description |
| `submissions` | A student's response to an assignment — files, mark, feedback, who marked it |

Then set up **Row Level Security (RLS)** rules. This is Supabase's way of saying "user X can only read rows they're allowed to see." For example: you can only see submissions in a class if you're a member of that class.

**You'll know this phase is done when:** the tables exist in Supabase and basic RLS rules are in place.

---

## Phase 4 — Class pages
*The core of the app — creating and joining classes.*

1. Build a **Create Class** form: class name, subject, anonymity setting (required / optional / blocked).
2. When submitted, it creates a row in `class_pages` and a row in `memberships` marking you as admin.
3. Build the **Class Page** view (`/class/[id]`) that lists all assignments for that class.
4. Build an **Invite** flow: admin generates an invite link → another user clicks it → they're added to `memberships`.

**You'll know this phase is done when:** you can create a class, send yourself an invite link in another browser, join the class, and see the (empty) class page.

---

## Phase 5 — Assignments
*Admins add assignments; members see them.*

1. Build an **Add Assignment** form (admin only): name, type (test / paper / video / etc.), attach a file (the question or notification), optional notes.
2. Assignments appear on the class page, ordered by date.
3. Build the **Assignment Page** (`/class/[id]/assignment/[id]`) that shows the assignment details and all submissions.

**You'll know this phase is done when:** an admin can create an assignment and anyone in the class can see it.

---

## Phase 6 — Submissions
*The main thing users actually do.*

1. Build a **Submit** form on the assignment page: upload file(s), optional text, mark received, who marked it, optional feedback.
2. Handle **file uploads** — Supabase has built-in file storage (called Storage). Files go there, the URL goes in your `submissions` table.
3. Show all submissions on the assignment page.
4. Handle **anonymity** — check the class page setting and either hide the name, show it, or give the user the choice.
5. Build **edit submission** — show what changed vs. the original (store edit history or just flag edited posts).

**You'll know this phase is done when:** a student can upload their submission and see it alongside others.

---

## Phase 7 — Moderation
*Keeping the class pages clean.*

1. Admins can **remove any post** with a reason.
2. Admins can **remove a user** from the class page.
3. If a post is anonymous, the admin can choose to **reveal the author** (to themselves only) before taking action.
4. Track how many mod actions have been taken against each account (without showing the username to others).

**You'll know this phase is done when:** an admin can remove a post and boot a member.

---

## Phase 8 — Polish and edge cases
*Making it not feel broken.*

- Page archiving — admin can archive a class, making it read-only
- Loading states so buttons don't just sit there
- Error messages that actually explain what went wrong
- Mobile layout (Tailwind makes this mostly painless)
- Email confirmation on signup

---

## Phase 9 — Launch
1. Make sure all your environment variables are set in Vercel (same ones as your `.env.local`).
2. Push to GitHub → Vercel auto-deploys.
3. Share the link.

---

## Rough time estimate (building solo, learning as you go)

| Phase | Time |
|---|---|
| 1 — Setup | 1–2 hours |
| 2 — Auth | 3–5 hours |
| 3 — Database | 2–3 hours |
| 4 — Class pages | 5–8 hours |
| 5 — Assignments | 3–5 hours |
| 6 — Submissions | 8–12 hours |
| 7 — Moderation | 4–6 hours |
| 8 — Polish | 4–8 hours |
| **Total** | **~30–50 hours** |

---

## The one thing that trips most people up

Supabase RLS (Row Level Security). When it's on, your app will silently return empty data if the rules aren't right — it won't throw an error, it'll just look like nothing exists. Whenever something isn't showing up, check your RLS policies first.
