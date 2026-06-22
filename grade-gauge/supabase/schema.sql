-- ============================================================
-- Grade Gauge — Database Schema
-- Run this in Supabase SQL Editor FIRST, before seed.sql
-- ============================================================

-- Classes
CREATE TABLE IF NOT EXISTS classes (
  id            TEXT PRIMARY KEY,
  slug          TEXT NOT NULL UNIQUE,
  name          TEXT NOT NULL,
  subject       TEXT NOT NULL,
  code          TEXT NOT NULL,
  member_count  INTEGER NOT NULL DEFAULT 0,
  description   TEXT,
  accent        TEXT NOT NULL DEFAULT 'blue',
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Assessments
CREATE TABLE IF NOT EXISTS assessments (
  id                  TEXT PRIMARY KEY,
  slug                TEXT NOT NULL,
  class_id            TEXT NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
  title               TEXT NOT NULL,
  type                TEXT NOT NULL,
  topic               TEXT NOT NULL,
  due_date            TEXT,
  weighting           TEXT,
  marked_out_of       INTEGER NOT NULL,
  pass_threshold      INTEGER NOT NULL,
  uses_letter_grades  BOOLEAN NOT NULL DEFAULT FALSE,
  grading_scale       JSONB,
  description         TEXT,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (class_id, slug)
);

-- Submissions
CREATE TABLE IF NOT EXISTS submissions (
  id                TEXT PRIMARY KEY,
  assessment_id     TEXT NOT NULL REFERENCES assessments(id) ON DELETE CASCADE,
  student_name      TEXT NOT NULL,
  anonymous         BOOLEAN NOT NULL DEFAULT FALSE,
  marker            TEXT NOT NULL,
  score             INTEGER NOT NULL,
  grade             TEXT CHECK (grade IN ('A', 'B', 'C', 'D', 'E', '0')),
  feedback          TEXT,
  response_excerpt  TEXT,
  submitted_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes for common queries
CREATE INDEX IF NOT EXISTS idx_assessments_class_id  ON assessments(class_id);
CREATE INDEX IF NOT EXISTS idx_submissions_assessment ON submissions(assessment_id);

-- ============================================================
-- Profiles (one row per auth user)
-- ============================================================
CREATE TABLE IF NOT EXISTS profiles (
  id            UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username      TEXT UNIQUE,
  display_name  TEXT,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- Memberships (who's in which class, and are they an admin)
CREATE TABLE IF NOT EXISTS memberships (
  user_id    UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  class_id   TEXT NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
  is_admin   BOOLEAN DEFAULT FALSE,
  joined_at  TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (user_id, class_id)
);

-- Auto-create a profile row whenever someone signs up
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id) VALUES (NEW.id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();
