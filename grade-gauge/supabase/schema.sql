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
