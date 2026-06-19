# Setting Up the Grade Gauge Database in Supabase

This guide walks you through creating the database tables and loading the sample data into your Supabase project. No prior database knowledge required.

---

## What you'll be doing

You have an empty Supabase project. You need to:
1. Create the tables that hold the app's data (classes, assessments, submissions)
2. Load the sample data into those tables

Both steps are done by pasting SQL into Supabase's built-in editor — think of it like a text box where you give the database instructions.

---

## Step 1 — Open the SQL Editor

1. Go to [supabase.com](https://supabase.com) and sign in
2. Click on your project
3. In the left sidebar, click **SQL Editor** (it looks like a `>_` terminal icon)
4. You should see a blank editor area with a green **Run** button

---

## Step 2 — Create the tables (schema.sql)

1. Open the file `supabase/schema.sql` from this project on your computer
2. Select all the text (`Cmd+A` on Mac, `Ctrl+A` on Windows) and copy it
3. Click inside the SQL Editor on Supabase and paste it
4. Click the green **Run** button (or press `Cmd+Enter`)
5. You should see a success message at the bottom — something like "Success. No rows returned"

**What this does:** Creates three empty tables — `classes`, `assessments`, and `submissions` — with the right columns and relationships between them.

If you see a red error message, double-check that you copied the entire file contents.

---

## Step 3 — Load the sample data (seed.sql)

1. Click **New query** at the top of the SQL Editor (this clears the previous query)
2. Open the file `supabase/seed.sql` from this project on your computer
3. Select all, copy, and paste it into the editor
4. Click **Run**
5. You should see another success message

**What this does:** Inserts all the sample classes, assessments, and student submissions into the tables you just created.

---

## Step 4 — Verify it worked

To confirm the data loaded correctly, run these quick checks. Click **New query**, paste each one, and click **Run**:

Check classes loaded (should return 3 rows):
```sql
SELECT * FROM classes;
```

Check assessments loaded (should return 7 rows):
```sql
SELECT * FROM assessments;
```

Check submissions loaded (should return 190 rows):
```sql
SELECT COUNT(*) FROM submissions;
```

---

## Step 5 — Get your project credentials

Your app needs two values to connect to this database:

1. In the Supabase sidebar, click **Project Settings** (the gear icon at the bottom)
2. Click **API** in the settings menu
3. You'll see:
   - **Project URL** — looks like `https://abcdefgh.supabase.co`
   - **anon public key** — a long string of letters and numbers

Copy both of these into your app's `.env.local` file:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

---

## Troubleshooting

**"relation already exists" error**
The tables were already created. Click **New query** and just run `seed.sql` to load the data.

**"duplicate key value" error when running seed.sql**
The data was already inserted. This is fine — the `ON CONFLICT DO NOTHING` at the end of each insert means it won't create duplicates.

**"permission denied" error**
Make sure you're in the SQL Editor, not another section. The SQL Editor runs as the database owner and has full permissions.

**The Run button is greyed out**
Make sure you've pasted some SQL into the editor first.
