-- ============================================================
-- Grade Gauge — Seed Data
-- Run this in Supabase SQL Editor AFTER schema.sql
-- ============================================================


-- ============================================================
-- CLASSES
-- ============================================================

INSERT INTO classes (id, slug, name, subject, code, member_count, description, accent) VALUES
  ('class-1', '9eng1',   'Year 9 English - 9ENG1',          'English',     '9ENG1',   27, 'A place for 9ENG1 to compare assessment marks, feedback and submissions. Be nice and keep it about the work.', 'rose'),
  ('class-2', '10mat3',  'Year 10 Maths - 10MAT3',          'Mathematics', '10MAT3',  24, 'Comparing marks and working out where things went sideways on topic tests and assignments.', 'sky'),
  ('class-3', '11chem2', 'Year 11 Chemistry - 11CHEM2',     'Chemistry',   '11CHEM2', 19, 'Practical reports, topic tests and everything in between for 11CHEM2.', 'amber')
ON CONFLICT (id) DO NOTHING;


-- ============================================================
-- ASSESSMENTS
-- ============================================================

INSERT INTO assessments (id, slug, class_id, title, type, topic, due_date, weighting, marked_out_of, pass_threshold, uses_letter_grades, grading_scale, description, created_at) VALUES
  (
    'assess-1',
    'romeo-and-juliet-persuasive-speech',
    'class-1',
    'Romeo and Juliet - Persuasive Speech',
    'Written Persuasive Speech (In-class Task)',
    'Romeo and Juliet',
    'Week 7 - Monday, Periods 6 & 7',
    '25% of total yearly assessment',
    20, 10, TRUE,
    '[
      {"grade":"A","min":17,"max":20,"description":"Highly developed understanding, sophisticated analysis and persuasive language."},
      {"grade":"B","min":13,"max":16,"description":"Developed understanding, thorough analysis and persuasive language."},
      {"grade":"C","min":9,"max":12,"description":"Adequate understanding, some appropriate analysis and persuasive features."},
      {"grade":"D","min":5,"max":8,"description":"Basic understanding, limited analysis and persuasive features."},
      {"grade":"E","min":1,"max":4,"description":"Elementary understanding, inadequate analysis."},
      {"grade":"0","min":0,"max":0,"description":"Non-attempt."}
    ]'::jsonb,
    'Write a persuasive speech about a scene of your choice from Romeo and Juliet, arguing for its inclusion in a workshop or showcase for other students. Assessed against EN5-URA-01, EN5-ECA-01 and EN5-URB-01. 5 minutes planning, 40 minutes writing, 5 minutes extra time. Closed book.',
    '2026-05-04T08:00:00Z'
  ),
  (
    'assess-2',
    'poetry-analysis-essay',
    'class-1',
    'Poetry Analysis Essay - Belonging Anthology',
    'Hand-in Essay',
    'Belonging Poetry Anthology',
    'Week 3 - Friday',
    '20% of total yearly assessment',
    25, 13, FALSE,
    NULL,
    'A 600-800 word analytical essay comparing two poems from the Belonging anthology, focusing on language techniques and how they shape meaning.',
    '2026-03-13T08:00:00Z'
  ),
  (
    'assess-3',
    'macbeth-reading-quiz',
    'class-1',
    'Macbeth Act 1-2 Reading Quiz',
    'In-class Test',
    'Macbeth',
    'Week 9 - Wednesday',
    '5% of total yearly assessment',
    15, 8, FALSE,
    NULL,
    'Short answer quiz covering plot, characters and key quotations from Act 1 and Act 2 of Macbeth.',
    '2026-06-03T08:00:00Z'
  ),
  (
    'assess-4',
    'algebra-topic-test',
    'class-2',
    'Algebra Topic Test - Linear Relationships',
    'In-class Test',
    'Linear Relationships',
    'Week 6 - Thursday',
    '15% of total yearly assessment',
    40, 20, FALSE,
    NULL,
    'Covers gradients, intercepts, simultaneous equations and graphing linear relationships.',
    '2026-05-14T08:00:00Z'
  ),
  (
    'assess-5',
    'statistics-assignment',
    'class-2',
    'Statistics Take-Home Assignment',
    'Hand-in Assignment',
    'Data Analysis & Statistics',
    'Week 10 - Monday',
    '10% of total yearly assessment',
    30, 15, FALSE,
    NULL,
    'A take-home assignment covering measures of centre and spread, box plots and data interpretation.',
    '2026-06-08T08:00:00Z'
  ),
  (
    'assess-6',
    'titration-practical-report',
    'class-3',
    'Acid-Base Titration Practical Report',
    'Practical Report',
    'Acids and Bases',
    'Week 5 - Friday',
    '15% of total yearly assessment',
    20, 10, FALSE,
    NULL,
    'A formal practical report on the acid-base titration experiment, including method, results, discussion and error analysis.',
    '2026-04-24T08:00:00Z'
  ),
  (
    'assess-7',
    'periodic-trends-test',
    'class-3',
    'Periodic Trends Topic Test',
    'In-class Test',
    'Periodic Table & Trends',
    'Week 8 - Tuesday',
    '15% of total yearly assessment',
    35, 18, FALSE,
    NULL,
    'Covers periodicity, atomic structure, ionisation energy and trends across periods and groups.',
    '2026-05-26T08:00:00Z'
  )
ON CONFLICT (id) DO NOTHING;


-- ============================================================
-- SUBMISSIONS — Romeo and Juliet Persuasive Speech (assess-1)
-- ============================================================

INSERT INTO submissions (id, assessment_id, student_name, anonymous, marker, score, grade, feedback, response_excerpt, submitted_at) VALUES
  ('sub-1',  'assess-1', 'Mia R.',       TRUE,  'Ms. Carter',   0,  '0', 'No submission received for this task.', NULL, '2026-05-18T09:00:00Z'),
  ('sub-2',  'assess-1', 'Charlotte L.', TRUE,  'Mr. Thompson', 0,  '0', 'No submission received for this task.', NULL, '2026-05-18T10:12:00Z'),
  ('sub-3',  'assess-1', 'Lachlan A.',   FALSE, 'Ms. Carter',   4,  'E', 'Mostly off-topic. Needs to focus on a single scene and a clear persuasive purpose.', NULL, '2026-05-18T11:24:00Z'),
  ('sub-4',  'assess-1', 'Mia W.',       FALSE, 'Ms. Carter',   4,  'E', 'Minimal evidence of preparation. Let''s work on quotation memorisation together.', NULL, '2026-05-18T12:36:00Z'),
  ('sub-5',  'assess-1', 'Henry T.',     FALSE, 'Mr. Singh',    4,  'E', 'Mostly off-topic. Needs to focus on a single scene and a clear persuasive purpose.', NULL, '2026-05-18T13:48:00Z'),
  ('sub-6',  'assess-1', 'Ryan W.',      FALSE, 'Mr. Singh',    2,  'E', 'Minimal evidence of preparation. Let''s work on quotation memorisation together.', NULL, '2026-05-18T14:00:00Z'),
  ('sub-7',  'assess-1', 'Charlotte M.', TRUE,  'Mr. Thompson', 6,  'D', 'Some relevant points raised, but expression was unclear in places.', 'Act 1 Scene 1 is good because it shows the fight between the Montagues and Capulets at the start. This is important because it shows the audience that the families hate each other. The Prince comes in and says they will be punished if they fight again. I think this scene is good for the workshop because it explains the feud.', '2026-05-18T15:12:00Z'),
  ('sub-8',  'assess-1', 'Hannah R.',    FALSE, 'Ms. Carter',   8,  'D', 'Good attempt at structure, but analysis of language techniques needs more depth.', 'I think Act 3 Scene 5 should be in the workshop. This is when Juliet finds out she has to marry Paris and her dad gets angry. It shows how strict parents were back then. Juliet is really upset and her mum doesn''t help her. This scene has a lot of emotion in it which would be interesting for the students to watch.', '2026-05-18T09:24:00Z'),
  ('sub-9',  'assess-1', 'Joel L.',      FALSE, 'Mr. Singh',    7,  'D', 'Some understanding shown but ideas are underdeveloped. Try to use more evidence from the text.', NULL, '2026-05-18T10:36:00Z'),
  ('sub-10', 'assess-1', 'Grace K.',     FALSE, 'Ms. Carter',   5,  'D', 'Tone wasn''t consistently persuasive. Re-read the sample tasks for guidance on voice.', NULL, '2026-05-18T11:48:00Z'),
  ('sub-11', 'assess-1', 'Ella K.',      TRUE,  'Ms. Carter',   8,  'D', 'Some understanding shown but ideas are underdeveloped. Try to use more evidence from the text.', NULL, '2026-05-18T12:00:00Z'),
  ('sub-12', 'assess-1', 'Tyler B.',     TRUE,  'Ms. Carter',   6,  'D', 'Basic structure present, but persuasive techniques were not used effectively. See feedback in class.', NULL, '2026-05-18T13:12:00Z'),
  ('sub-13', 'assess-1', 'Eva C.',       FALSE, 'Ms. Carter',   8,  'D', 'Basic structure present, but persuasive techniques were not used effectively. See feedback in class.', NULL, '2026-05-18T14:24:00Z'),
  ('sub-14', 'assess-1', 'Bailey H.',    TRUE,  'Mr. Thompson', 8,  'D', 'Limited use of quotations. Revise your quotation table before the next assessment.', NULL, '2026-05-18T15:36:00Z'),
  ('sub-15', 'assess-1', 'Isla T.',      TRUE,  'Ms. Carter',   7,  'D', 'Some understanding shown but ideas are underdeveloped. Try to use more evidence from the text.', NULL, '2026-05-18T09:48:00Z'),
  ('sub-16', 'assess-1', 'Archie A.',    FALSE, 'Mrs. Alvarez', 5,  'D', 'Basic structure present, but persuasive techniques were not used effectively. See feedback in class.', NULL, '2026-05-18T10:00:00Z'),
  ('sub-17', 'assess-1', 'Tyler H.',     FALSE, 'Ms. Carter',   5,  'D', 'Good attempt at structure, but analysis of language techniques needs more depth.', NULL, '2026-05-18T11:12:00Z'),
  ('sub-18', 'assess-1', 'Zoe B.',       FALSE, 'Mr. Thompson', 8,  'D', 'Tone wasn''t consistently persuasive. Re-read the sample tasks for guidance on voice.', NULL, '2026-05-18T12:24:00Z'),
  ('sub-19', 'assess-1', 'Oliver B.',    FALSE, 'Mr. Singh',    7,  'D', 'Limited use of quotations. Revise your quotation table before the next assessment.', NULL, '2026-05-18T13:36:00Z'),
  ('sub-20', 'assess-1', 'Ryan W.',      TRUE,  'Ms. Carter',   5,  'D', 'Some relevant points raised, but expression was unclear in places.', NULL, '2026-05-18T14:48:00Z'),
  ('sub-21', 'assess-1', 'Willow A.',    TRUE,  'Mrs. Alvarez', 9,  'C', 'Persuasive intent was present throughout. Consider a stronger hook in your opening line.', 'Act 3, Scene 1 is a really important scene because it''s when Mercutio and Tybalt fight and Mercutio dies. This changes the whole mood of the play from a comedy to a tragedy. Romeo says "fire-eyed fury be my conduct now" which shows his anger and sets up the rest of the story. I think this scene should be chosen because it has a lot of action and emotion, which would be good for a workshop.', '2026-05-18T15:00:00Z'),
  ('sub-22', 'assess-1', 'Harper T.',    TRUE,  'Mr. Thompson', 12, 'C', 'Adequate use of evidence. Try to integrate quotations more smoothly into your argument.', 'I think Act 2, Scene 2 should be picked for the showcase because it is the most famous scene from the play and everyone knows the balcony scene. Juliet talks about how names don''t matter and Romeo listens from below. This shows their love is strong even though their families hate each other. It would be a good scene for students to study because it has good language techniques like metaphors.', '2026-05-18T09:12:00Z'),
  ('sub-23', 'assess-1', 'Leo W.',       TRUE,  'Mr. Singh',    10, 'C', 'Some persuasive techniques identified well (rhetorical questions, repetition). Keep refining your voice.', NULL, '2026-05-18T10:24:00Z'),
  ('sub-24', 'assess-1', 'Charlie M.',   FALSE, 'Ms. Carter',   10, 'C', 'You showed a clear understanding of the task. Next step is to add more textual evidence.', NULL, '2026-05-18T11:36:00Z'),
  ('sub-25', 'assess-1', 'Jack B.',      TRUE,  'Mrs. Alvarez', 9,  'C', 'Adequate use of evidence. Try to integrate quotations more smoothly into your argument.', NULL, '2026-05-18T12:48:00Z'),
  ('sub-26', 'assess-1', 'Ethan C.',     FALSE, 'Mr. Singh',    12, 'C', 'Solid attempt with some persuasive features used appropriately. Aim to deepen your analysis next time.', NULL, '2026-05-18T13:00:00Z'),
  ('sub-27', 'assess-1', 'James B.',     FALSE, 'Mr. Thompson', 10, 'C', 'Sound work. Some minor expression issues affected clarity in the second half.', NULL, '2026-05-18T14:12:00Z'),
  ('sub-28', 'assess-1', 'Harper M.',    FALSE, 'Mrs. Alvarez', 11, 'C', 'You showed a clear understanding of the task. Next step is to add more textual evidence.', NULL, '2026-05-18T15:24:00Z'),
  ('sub-29', 'assess-1', 'William B.',   TRUE,  'Mr. Thompson', 9,  'C', 'Sound work. Some minor expression issues affected clarity in the second half.', NULL, '2026-05-18T09:36:00Z'),
  ('sub-30', 'assess-1', 'Harper H.',    FALSE, 'Ms. Carter',   9,  'C', 'You showed a clear understanding of the task. Next step is to add more textual evidence.', NULL, '2026-05-18T10:48:00Z'),
  ('sub-31', 'assess-1', 'Max T.',       TRUE,  'Mr. Singh',    10, 'C', 'Solid attempt with some persuasive features used appropriately. Aim to deepen your analysis next time.', NULL, '2026-05-18T11:00:00Z'),
  ('sub-32', 'assess-1', 'Connor B.',    FALSE, 'Mrs. Alvarez', 12, 'C', 'Reasonable analysis of staging ideas, though some points could be expanded further.', NULL, '2026-05-18T12:12:00Z'),
  ('sub-33', 'assess-1', 'Mason K.',     FALSE, 'Mr. Singh',    12, 'C', 'Solid attempt with some persuasive features used appropriately. Aim to deepen your analysis next time.', NULL, '2026-05-18T13:24:00Z'),
  ('sub-34', 'assess-1', 'Lily B.',      FALSE, 'Mr. Thompson', 11, 'C', 'Solid attempt with some persuasive features used appropriately. Aim to deepen your analysis next time.', NULL, '2026-05-18T14:36:00Z'),
  ('sub-35', 'assess-1', 'Layla R.',     FALSE, 'Mrs. Alvarez', 12, 'C', 'Reasonable analysis of staging ideas, though some points could be expanded further.', NULL, '2026-05-18T15:48:00Z'),
  ('sub-36', 'assess-1', 'Cooper W.',    FALSE, 'Mr. Singh',    9,  'C', 'Good understanding of the scene. Work on varying your sentence structures for more impact.', NULL, '2026-05-18T09:00:00Z'),
  ('sub-37', 'assess-1', 'Willow M.',    TRUE,  'Ms. Carter',   9,  'C', 'Some persuasive techniques identified well (rhetorical questions, repetition). Keep refining your voice.', NULL, '2026-05-18T10:12:00Z'),
  ('sub-38', 'assess-1', 'Cooper R.',    FALSE, 'Mr. Singh',    12, 'C', 'Good effort overall - focus on stronger topic sentences for each paragraph.', NULL, '2026-05-18T11:24:00Z'),
  ('sub-39', 'assess-1', 'Tyler M.',     FALSE, 'Mrs. Alvarez', 10, 'C', 'You showed a clear understanding of the task. Next step is to add more textual evidence.', NULL, '2026-05-18T12:36:00Z'),
  ('sub-40', 'assess-1', 'Matilda W.',   FALSE, 'Mr. Thompson', 11, 'C', 'Adequate use of evidence. Try to integrate quotations more smoothly into your argument.', NULL, '2026-05-18T13:48:00Z'),
  ('sub-41', 'assess-1', 'William K.',   TRUE,  'Mr. Thompson', 9,  'C', 'You showed a clear understanding of the task. Next step is to add more textual evidence.', NULL, '2026-05-18T14:00:00Z'),
  ('sub-42', 'assess-1', 'Archie W.',    TRUE,  'Mrs. Alvarez', 12, 'C', 'Clear structure with an introduction, body and conclusion. Push for more sophisticated vocabulary.', NULL, '2026-05-18T15:12:00Z'),
  ('sub-43', 'assess-1', 'Samuel E.',    FALSE, 'Mrs. Alvarez', 11, 'C', 'Adequate use of evidence. Try to integrate quotations more smoothly into your argument.', NULL, '2026-05-18T09:24:00Z'),
  ('sub-44', 'assess-1', 'Riley M.',     FALSE, 'Mr. Singh',    12, 'C', 'Good understanding of the scene. Work on varying your sentence structures for more impact.', NULL, '2026-05-18T10:36:00Z'),
  ('sub-45', 'assess-1', 'Archie S.',    FALSE, 'Ms. Carter',   11, 'C', 'Some persuasive techniques identified well (rhetorical questions, repetition). Keep refining your voice.', NULL, '2026-05-18T11:48:00Z'),
  ('sub-46', 'assess-1', 'Sophie W.',    FALSE, 'Mr. Singh',    9,  'C', 'Sound work. Some minor expression issues affected clarity in the second half.', NULL, '2026-05-18T12:00:00Z'),
  ('sub-47', 'assess-1', 'Isla A.',      FALSE, 'Mr. Singh',    11, 'C', 'Reasonable analysis of staging ideas, though some points could be expanded further.', NULL, '2026-05-18T13:12:00Z'),
  ('sub-48', 'assess-1', 'Zoe H.',       TRUE,  'Ms. Carter',   12, 'C', 'Sound work. Some minor expression issues affected clarity in the second half.', NULL, '2026-05-18T14:24:00Z'),
  ('sub-49', 'assess-1', 'Sophie K.',    TRUE,  'Ms. Carter',   16, 'B', 'Strong work - your analysis of dramatic techniques was a highlight of this response.', 'I want to talk to you about Act 1, Scene 5 - the moment Romeo and Juliet first lay eyes on each other. Shakespeare uses religious imagery throughout this scene, with Romeo calling Juliet a "holy shrine" and himself a "pilgrim". This elevates their love to something sacred, something bigger than the feud between their families. For a Year 11 audience, this scene shows how quickly first impressions can change the course of a whole story, and that''s exactly why it belongs in your showcase.', '2026-05-18T15:36:00Z'),
  ('sub-50', 'assess-1', 'Mia E.',       FALSE, 'Mr. Thompson', 16, 'B', 'Developed and persuasive throughout, with only minor lapses in formality of tone.', 'Consider the Friar''s words in Act 2, Scene 3: "These violent delights have violent ends." This single line predicts the entire tragedy that follows. I believe this scene should be included in your reading series because it gives the audience a warning, almost like a ticking clock, and builds tension for everything that comes after. The Friar''s caution contrasts sharply with the young lovers'' impatience, which makes for a powerful piece of theatre.', '2026-05-18T09:48:00Z'),
  ('sub-51', 'assess-1', 'Tyler B.',     FALSE, 'Mr. Thompson', 15, 'B', 'Strong work - your analysis of dramatic techniques was a highlight of this response.', NULL, '2026-05-18T10:00:00Z'),
  ('sub-52', 'assess-1', 'Sophie A.',    FALSE, 'Mrs. Alvarez', 14, 'B', 'Effective use of rhetorical questions and tripling. Keep working on varied vocabulary choices.', NULL, '2026-05-18T11:12:00Z'),
  ('sub-53', 'assess-1', 'Oliver W.',    TRUE,  'Mr. Thompson', 13, 'B', 'Strong work - your analysis of dramatic techniques was a highlight of this response.', NULL, '2026-05-18T12:24:00Z'),
  ('sub-54', 'assess-1', 'Sophie W.',    TRUE,  'Mrs. Alvarez', 15, 'B', 'Strong work - your analysis of dramatic techniques was a highlight of this response.', NULL, '2026-05-18T13:36:00Z'),
  ('sub-55', 'assess-1', 'Oliver B.',    TRUE,  'Mrs. Alvarez', 16, 'B', 'Well-developed response with thorough analysis of language techniques. Great use of emotive language.', NULL, '2026-05-18T14:48:00Z'),
  ('sub-56', 'assess-1', 'William R.',   TRUE,  'Mr. Thompson', 16, 'B', 'Confident use of quotations and techniques. A more creative staging idea would lift this further.', NULL, '2026-05-18T15:00:00Z'),
  ('sub-57', 'assess-1', 'Sophie B.',    TRUE,  'Mr. Singh',    15, 'B', 'Strong work - your analysis of dramatic techniques was a highlight of this response.', NULL, '2026-05-18T09:12:00Z'),
  ('sub-58', 'assess-1', 'Chloe C.',     FALSE, 'Mr. Thompson', 13, 'B', 'Confident use of quotations and techniques. A more creative staging idea would lift this further.', NULL, '2026-05-18T10:24:00Z'),
  ('sub-59', 'assess-1', 'Noah J.',      FALSE, 'Mrs. Alvarez', 16, 'B', 'Strong work - your analysis of dramatic techniques was a highlight of this response.', NULL, '2026-05-18T11:36:00Z'),
  ('sub-60', 'assess-1', 'Amelia E.',    FALSE, 'Mr. Thompson', 14, 'B', 'Well-developed response with thorough analysis of language techniques. Great use of emotive language.', NULL, '2026-05-18T12:48:00Z'),
  ('sub-61', 'assess-1', 'Lily S.',      TRUE,  'Mrs. Alvarez', 15, 'B', 'Thorough exploration of the scene with appropriate persuasive language. Well done.', NULL, '2026-05-18T13:00:00Z'),
  ('sub-62', 'assess-1', 'Ruby P.',      FALSE, 'Mr. Thompson', 13, 'B', 'Thorough exploration of the scene with appropriate persuasive language. Well done.', NULL, '2026-05-18T14:12:00Z'),
  ('sub-63', 'assess-1', 'Joel B.',      TRUE,  'Mr. Singh',    13, 'B', 'Clear and developed understanding of the scene''s significance. Well structured paragraphs.', NULL, '2026-05-18T15:24:00Z'),
  ('sub-64', 'assess-1', 'Chloe J.',     FALSE, 'Mrs. Alvarez', 15, 'B', 'Effective use of rhetorical questions and tripling. Keep working on varied vocabulary choices.', NULL, '2026-05-18T09:36:00Z'),
  ('sub-65', 'assess-1', 'Sophie W.',    FALSE, 'Mrs. Alvarez', 15, 'B', 'Developed and persuasive throughout, with only minor lapses in formality of tone.', NULL, '2026-05-18T10:48:00Z'),
  ('sub-66', 'assess-1', 'Bailey B.',    TRUE,  'Mr. Singh',    15, 'B', 'Thorough exploration of the scene with appropriate persuasive language. Well done.', NULL, '2026-05-18T11:00:00Z'),
  ('sub-67', 'assess-1', 'Layla N.',     FALSE, 'Mrs. Alvarez', 15, 'B', 'Strong work - your analysis of dramatic techniques was a highlight of this response.', NULL, '2026-05-18T12:12:00Z'),
  ('sub-68', 'assess-1', 'Ava E.',       TRUE,  'Mrs. Alvarez', 15, 'B', 'Strong work - your analysis of dramatic techniques was a highlight of this response.', NULL, '2026-05-18T13:24:00Z'),
  ('sub-69', 'assess-1', 'William B.',   FALSE, 'Mr. Thompson', 15, 'B', 'Strong persuasive voice maintained throughout. Consider adding a counter-argument for extra depth.', NULL, '2026-05-18T14:36:00Z'),
  ('sub-70', 'assess-1', 'James K.',     TRUE,  'Mr. Thompson', 13, 'B', 'Strong persuasive voice maintained throughout. Consider adding a counter-argument for extra depth.', NULL, '2026-05-18T15:48:00Z'),
  ('sub-71', 'assess-1', 'Daniel R.',    TRUE,  'Ms. Carter',   17, 'A', 'A genuinely compelling speech with creative staging ideas. Fantastic work.', 'Picture the marble staircase, bathed in cold light, as Lord Capulet''s voice cracks like a whip through the silence: "Get thee to church o'' Thursday, or never after look me in the face." This is not a father speaking to a daughter - this is a tyrant addressing his property. I stand before you today to argue that Act 3, Scene 5 deserves a place in your workshop, because nowhere else in this play does Shakespeare expose the brutal machinery of patriarchal control with such devastating clarity.', '2026-05-18T09:00:00Z'),
  ('sub-72', 'assess-1', 'Hannah M.',    FALSE, 'Mrs. Alvarez', 18, 'A', 'Sophisticated and persuasive - this read like a professional pitch. Excellent control of tone.', 'Why does Act 2, Scene 2 still matter, four hundred years on? Because love, real love, has always been reckless, urgent, and a little bit ridiculous - and Shakespeare knew it. When Juliet whispers "Romeo, Romeo, wherefore art thou Romeo?" she is not simply asking where he is. She is asking why he must be a Montague at all, why a name should matter more than a heart. I urge you to bring this scene to your students, because it teaches them that vulnerability is not weakness - it is the bravest language we have.', '2026-05-18T10:12:00Z'),
  ('sub-73', 'assess-1', 'Zoe T.',       FALSE, 'Mr. Singh',    18, 'A', 'Outstanding analysis of dramatic techniques, supported by well-integrated quotations.', NULL, '2026-05-18T11:24:00Z'),
  ('sub-74', 'assess-1', 'Joel W.',      TRUE,  'Mrs. Alvarez', 18, 'A', 'Highly developed understanding of character and theme, expressed with real flair.', NULL, '2026-05-18T12:36:00Z'),
  ('sub-75', 'assess-1', 'Ryan K.',      FALSE, 'Ms. Carter',   20, 'A', 'Outstanding analysis of dramatic techniques, supported by well-integrated quotations.', NULL, '2026-05-18T13:48:00Z'),
  ('sub-76', 'assess-1', 'Sophie M.',    FALSE, 'Mr. Singh',    20, 'A', 'Outstanding analysis of dramatic techniques, supported by well-integrated quotations.', NULL, '2026-05-18T14:00:00Z'),
  ('sub-77', 'assess-1', 'Grace E.',     TRUE,  'Mr. Thompson', 20, 'A', 'Highly developed understanding of character and theme, expressed with real flair.', NULL, '2026-05-18T15:12:00Z'),
  ('sub-78', 'assess-1', 'Hudson T.',    FALSE, 'Ms. Carter',   20, 'A', 'Sophisticated and persuasive - this read like a professional pitch. Excellent control of tone.', NULL, '2026-05-18T09:24:00Z'),
  ('sub-79', 'assess-1', 'Tyler S.',     TRUE,  'Mr. Singh',    18, 'A', 'Highly developed understanding of character and theme, expressed with real flair.', NULL, '2026-05-18T10:36:00Z'),
  ('sub-80', 'assess-1', 'Zoe W.',       FALSE, 'Mr. Singh',    18, 'A', 'Excellent response - sophisticated language choices and a highly persuasive tone throughout.', NULL, '2026-05-18T11:48:00Z')
ON CONFLICT (id) DO NOTHING;


-- ============================================================
-- SUBMISSIONS — Poetry Analysis Essay (assess-2)
-- ============================================================

INSERT INTO submissions (id, assessment_id, student_name, anonymous, marker, score, grade, feedback, response_excerpt, submitted_at) VALUES
  ('sub-101-1',  'assess-2', 'Archie W.',  FALSE, 'Mr. Thompson', 14, NULL, 'Sound understanding shown, with some minor errors.', NULL, '2026-05-04T09:00:00Z'),
  ('sub-101-2',  'assess-2', 'Connor K.',  FALSE, 'Ms. Carter',   12, NULL, 'Some understanding shown but needs more revision before the next assessment.', NULL, '2026-05-04T10:15:00Z'),
  ('sub-101-3',  'assess-2', 'Henry N.',   FALSE, 'Ms. Carter',   7,  NULL, 'Please come see me to go over the areas you found tricky.', NULL, '2026-05-04T11:30:00Z'),
  ('sub-101-4',  'assess-2', 'Tyler T.',   FALSE, 'Mr. Thompson', 8,  NULL, 'Some understanding shown but needs more revision before the next assessment.', NULL, '2026-05-04T12:45:00Z'),
  ('sub-101-5',  'assess-2', 'Hudson C.',  FALSE, 'Mr. Thompson', 12, NULL, 'Some understanding shown but needs more revision before the next assessment.', NULL, '2026-05-04T14:00:00Z'),
  ('sub-101-6',  'assess-2', 'Sienna N.',  FALSE, 'Ms. Carter',   10, NULL, 'Needs more preparation time. Revisit the practice questions.', NULL, '2026-05-04T10:15:00Z'),
  ('sub-101-7',  'assess-2', 'Chloe W.',   TRUE,  'Ms. Carter',   2,  NULL, 'Please come see me to go over the areas you found tricky.', NULL, '2026-05-04T10:00:00Z'),
  ('sub-101-8',  'assess-2', 'Hannah B.',  FALSE, 'Mr. Thompson', 7,  NULL, 'Some understanding shown but needs more revision before the next assessment.', NULL, '2026-05-04T11:15:00Z'),
  ('sub-101-9',  'assess-2', 'James K.',   FALSE, 'Mr. Thompson', 19, NULL, 'Excellent work - clear understanding and well-presented throughout.', NULL, '2026-05-04T12:30:00Z'),
  ('sub-101-10', 'assess-2', 'Felix R.',   FALSE, 'Ms. Carter',   10, NULL, 'Needs more preparation time. Revisit the practice questions.', NULL, '2026-05-04T13:45:00Z'),
  ('sub-101-11', 'assess-2', 'Lily W.',    FALSE, 'Ms. Carter',   23, NULL, 'Impressive depth of understanding shown here.', NULL, '2026-05-04T10:00:00Z'),
  ('sub-101-12', 'assess-2', 'Noah B.',    FALSE, 'Mr. Thompson', 16, NULL, 'Sound understanding shown, with some minor errors.', NULL, '2026-05-04T11:15:00Z'),
  ('sub-101-13', 'assess-2', 'William M.', TRUE,  'Mr. Thompson', 17, NULL, 'Good work overall - a couple of areas to revisit.', NULL, '2026-05-04T11:00:00Z'),
  ('sub-101-14', 'assess-2', 'Hudson C.',  FALSE, 'Mr. Thompson', 17, NULL, 'Good work overall - a couple of areas to revisit.', NULL, '2026-05-04T12:15:00Z'),
  ('sub-101-15', 'assess-2', 'Ava E.',     TRUE,  'Ms. Carter',   12, NULL, 'Please come see me to go over the areas you found tricky.', NULL, '2026-05-04T13:30:00Z'),
  ('sub-101-16', 'assess-2', 'Ruby T.',    FALSE, 'Mr. Thompson', 16, NULL, 'Reasonable attempt, see feedback for areas to improve.', NULL, '2026-05-04T09:45:00Z'),
  ('sub-101-17', 'assess-2', 'Noah C.',    FALSE, 'Mr. Thompson', 7,  NULL, 'A few key concepts were missed - let''s work through these together.', NULL, '2026-05-04T11:00:00Z'),
  ('sub-101-18', 'assess-2', 'Thomas E.',  TRUE,  'Ms. Carter',   15, NULL, 'Good work overall - a couple of areas to revisit.', NULL, '2026-05-04T12:15:00Z'),
  ('sub-101-19', 'assess-2', 'Felix H.',   FALSE, 'Ms. Carter',   10, NULL, 'Needs more preparation time. Revisit the practice questions.', NULL, '2026-05-04T12:00:00Z'),
  ('sub-101-20', 'assess-2', 'Ruby B.',    TRUE,  'Ms. Carter',   13, NULL, 'Good work overall - a couple of areas to revisit.', NULL, '2026-05-04T13:15:00Z'),
  ('sub-101-21', 'assess-2', 'Hannah E.',  FALSE, 'Ms. Carter',   9,  NULL, 'A few key concepts were missed - let''s work through these together.', NULL, '2026-05-04T09:30:00Z'),
  ('sub-101-22', 'assess-2', 'Nathan A.',  TRUE,  'Mr. Thompson', 7,  NULL, 'Needs more preparation time. Revisit the practice questions.', NULL, '2026-05-04T10:45:00Z')
ON CONFLICT (id) DO NOTHING;


-- ============================================================
-- SUBMISSIONS — Macbeth Reading Quiz (assess-3)
-- ============================================================

INSERT INTO submissions (id, assessment_id, student_name, anonymous, marker, score, grade, feedback, response_excerpt, submitted_at) VALUES
  ('sub-102-1',  'assess-3', 'Sienna M.',    FALSE, 'Ms. Carter', 7,  NULL, 'Please come see me to go over the areas you found tricky.', NULL, '2026-05-04T09:00:00Z'),
  ('sub-102-2',  'assess-3', 'Cooper P.',    TRUE,  'Ms. Carter', 5,  NULL, 'Needs more preparation time. Revisit the practice questions.', NULL, '2026-05-04T10:15:00Z'),
  ('sub-102-3',  'assess-3', 'Ryan W.',      FALSE, 'Ms. Carter', 3,  NULL, 'Some understanding shown but needs more revision before the next assessment.', NULL, '2026-05-04T11:30:00Z'),
  ('sub-102-4',  'assess-3', 'Eva B.',       FALSE, 'Ms. Carter', 11, NULL, 'Sound understanding shown, with some minor errors.', NULL, '2026-05-04T12:45:00Z'),
  ('sub-102-5',  'assess-3', 'Mason N.',     FALSE, 'Ms. Carter', 2,  NULL, 'A few key concepts were missed - let''s work through these together.', NULL, '2026-05-04T14:00:00Z'),
  ('sub-102-6',  'assess-3', 'James B.',     FALSE, 'Ms. Carter', 9,  NULL, 'Sound understanding shown, with some minor errors.', NULL, '2026-05-04T10:15:00Z'),
  ('sub-102-7',  'assess-3', 'Cooper B.',    TRUE,  'Ms. Carter', 10, NULL, 'Reasonable attempt, see feedback for areas to improve.', NULL, '2026-05-04T10:00:00Z'),
  ('sub-102-8',  'assess-3', 'Ruby M.',      TRUE,  'Ms. Carter', 11, NULL, 'Reasonable attempt, see feedback for areas to improve.', NULL, '2026-05-04T11:15:00Z'),
  ('sub-102-9',  'assess-3', 'Zoe S.',       TRUE,  'Ms. Carter', 6,  NULL, 'Some understanding shown but needs more revision before the next assessment.', NULL, '2026-05-04T12:30:00Z'),
  ('sub-102-10', 'assess-3', 'Chloe B.',     FALSE, 'Ms. Carter', 6,  NULL, 'A few key concepts were missed - let''s work through these together.', NULL, '2026-05-04T13:45:00Z'),
  ('sub-102-11', 'assess-3', 'James H.',     TRUE,  'Ms. Carter', 6,  NULL, 'Please come see me to go over the areas you found tricky.', NULL, '2026-05-04T10:00:00Z'),
  ('sub-102-12', 'assess-3', 'Henry P.',     FALSE, 'Ms. Carter', 8,  NULL, 'Reasonable attempt, see feedback for areas to improve.', NULL, '2026-05-04T11:15:00Z'),
  ('sub-102-13', 'assess-3', 'Amelia M.',    FALSE, 'Ms. Carter', 11, NULL, 'Sound understanding shown, with some minor errors.', NULL, '2026-05-04T11:00:00Z'),
  ('sub-102-14', 'assess-3', 'Liam B.',      TRUE,  'Ms. Carter', 10, NULL, 'Sound understanding shown, with some minor errors.', NULL, '2026-05-04T12:15:00Z'),
  ('sub-102-15', 'assess-3', 'Thomas C.',    FALSE, 'Ms. Carter', 13, NULL, 'Excellent work - clear understanding and well-presented throughout.', NULL, '2026-05-04T13:30:00Z'),
  ('sub-102-16', 'assess-3', 'Amelia J.',    FALSE, 'Ms. Carter', 11, NULL, 'Good work overall - a couple of areas to revisit.', NULL, '2026-05-04T09:45:00Z'),
  ('sub-102-17', 'assess-3', 'Charlotte R.', TRUE,  'Ms. Carter', 8,  NULL, 'Solid effort with a good understanding of most concepts.', NULL, '2026-05-04T11:00:00Z'),
  ('sub-102-18', 'assess-3', 'Lucas W.',     FALSE, 'Ms. Carter', 6,  NULL, 'Needs more preparation time. Revisit the practice questions.', NULL, '2026-05-04T12:15:00Z')
ON CONFLICT (id) DO NOTHING;


-- ============================================================
-- SUBMISSIONS — Algebra Topic Test (assess-4)
-- ============================================================

INSERT INTO submissions (id, assessment_id, student_name, anonymous, marker, score, grade, feedback, response_excerpt, submitted_at) VALUES
  ('sub-103-1',  'assess-4', 'Charlotte H.', FALSE, 'Ms. Iyer',    17, NULL, 'A few key concepts were missed - let''s work through these together.', NULL, '2026-05-04T09:00:00Z'),
  ('sub-103-2',  'assess-4', 'Matilda N.',   FALSE, 'Ms. Iyer',    19, NULL, 'Needs more preparation time. Revisit the practice questions.', NULL, '2026-05-04T10:15:00Z'),
  ('sub-103-3',  'assess-4', 'Grace W.',     FALSE, 'Mr. Davies',  20, NULL, 'Reasonable attempt, see feedback for areas to improve.', NULL, '2026-05-04T11:30:00Z'),
  ('sub-103-4',  'assess-4', 'Daniel E.',    TRUE,  'Ms. Iyer',    21, NULL, 'Reasonable attempt, see feedback for areas to improve.', NULL, '2026-05-04T12:45:00Z'),
  ('sub-103-5',  'assess-4', 'Cooper S.',    FALSE, 'Mrs. Novak',  33, NULL, 'Impressive depth of understanding shown here.', NULL, '2026-05-04T14:00:00Z'),
  ('sub-103-6',  'assess-4', 'Leo E.',       FALSE, 'Mr. Davies',  31, NULL, 'Very thorough and well organised. Keep it up.', NULL, '2026-05-04T10:15:00Z'),
  ('sub-103-7',  'assess-4', 'Joel S.',      TRUE,  'Ms. Iyer',    9,  NULL, 'Needs more preparation time. Revisit the practice questions.', NULL, '2026-05-04T10:00:00Z'),
  ('sub-103-8',  'assess-4', 'Hamish E.',    TRUE,  'Mrs. Novak',  35, NULL, 'Impressive depth of understanding shown here.', NULL, '2026-05-04T11:15:00Z'),
  ('sub-103-9',  'assess-4', 'Jayden W.',    FALSE, 'Mr. Davies',  26, NULL, 'Solid effort with a good understanding of most concepts.', NULL, '2026-05-04T12:30:00Z'),
  ('sub-103-10', 'assess-4', 'Oliver M.',    TRUE,  'Mrs. Novak',  19, NULL, 'Some understanding shown but needs more revision before the next assessment.', NULL, '2026-05-04T13:45:00Z'),
  ('sub-103-11', 'assess-4', 'Daniel N.',    FALSE, 'Mrs. Novak',  24, NULL, 'Sound understanding shown, with some minor errors.', NULL, '2026-05-04T10:00:00Z'),
  ('sub-103-12', 'assess-4', 'Mason W.',     FALSE, 'Ms. Iyer',    17, NULL, 'Some understanding shown but needs more revision before the next assessment.', NULL, '2026-05-04T11:15:00Z'),
  ('sub-103-13', 'assess-4', 'Hudson N.',    FALSE, 'Mr. Davies',  17, NULL, 'Please come see me to go over the areas you found tricky.', NULL, '2026-05-04T11:00:00Z'),
  ('sub-103-14', 'assess-4', 'Henry M.',     FALSE, 'Mr. Davies',  25, NULL, 'Reasonable attempt, see feedback for areas to improve.', NULL, '2026-05-04T12:15:00Z'),
  ('sub-103-15', 'assess-4', 'Tyler W.',     TRUE,  'Mr. Davies',  24, NULL, 'Solid effort with a good understanding of most concepts.', NULL, '2026-05-04T13:30:00Z'),
  ('sub-103-16', 'assess-4', 'Bailey R.',    TRUE,  'Mrs. Novak',  17, NULL, 'Some understanding shown but needs more revision before the next assessment.', NULL, '2026-05-04T09:45:00Z'),
  ('sub-103-17', 'assess-4', 'Liam W.',      FALSE, 'Mr. Davies',  18, NULL, 'Please come see me to go over the areas you found tricky.', NULL, '2026-05-04T11:00:00Z'),
  ('sub-103-18', 'assess-4', 'Henry S.',     FALSE, 'Mr. Davies',  11, NULL, 'Please come see me to go over the areas you found tricky.', NULL, '2026-05-04T12:15:00Z'),
  ('sub-103-19', 'assess-4', 'William B.',   FALSE, 'Mrs. Novak',  20, NULL, 'Reasonable attempt, see feedback for areas to improve.', NULL, '2026-05-04T12:00:00Z'),
  ('sub-103-20', 'assess-4', 'Sophie E.',    FALSE, 'Mrs. Novak',  15, NULL, 'Needs more preparation time. Revisit the practice questions.', NULL, '2026-05-04T13:15:00Z'),
  ('sub-103-21', 'assess-4', 'Bailey T.',    FALSE, 'Mrs. Novak',  18, NULL, 'Some understanding shown but needs more revision before the next assessment.', NULL, '2026-05-04T09:30:00Z'),
  ('sub-103-22', 'assess-4', 'Mason M.',     FALSE, 'Ms. Iyer',    32, NULL, 'Impressive depth of understanding shown here.', NULL, '2026-05-04T10:45:00Z'),
  ('sub-103-23', 'assess-4', 'Leo H.',       FALSE, 'Ms. Iyer',    15, NULL, 'Needs more preparation time. Revisit the practice questions.', NULL, '2026-05-04T12:00:00Z'),
  ('sub-103-24', 'assess-4', 'Leo R.',       FALSE, 'Mr. Davies',  32, NULL, 'Great job, strong grasp of the concepts covered.', NULL, '2026-05-04T13:15:00Z'),
  ('sub-103-25', 'assess-4', 'Harper R.',    FALSE, 'Ms. Iyer',    26, NULL, 'Solid effort with a good understanding of most concepts.', NULL, '2026-05-04T13:00:00Z'),
  ('sub-103-26', 'assess-4', 'Archie E.',    TRUE,  'Ms. Iyer',    24, NULL, 'Reasonable attempt, see feedback for areas to improve.', NULL, '2026-05-04T09:15:00Z')
ON CONFLICT (id) DO NOTHING;


-- ============================================================
-- SUBMISSIONS — Statistics Assignment (assess-5)
-- ============================================================

INSERT INTO submissions (id, assessment_id, student_name, anonymous, marker, score, grade, feedback, response_excerpt, submitted_at) VALUES
  ('sub-104-1',  'assess-5', 'Archie W.',  FALSE, 'Ms. Iyer',   10, NULL, 'Some understanding shown but needs more revision before the next assessment.', NULL, '2026-05-04T09:00:00Z'),
  ('sub-104-2',  'assess-5', 'Hamish N.',  FALSE, 'Ms. Iyer',   19, NULL, 'Sound understanding shown, with some minor errors.', NULL, '2026-05-04T10:15:00Z'),
  ('sub-104-3',  'assess-5', 'Oliver M.',  FALSE, 'Ms. Iyer',   24, NULL, 'Great job, strong grasp of the concepts covered.', NULL, '2026-05-04T11:30:00Z'),
  ('sub-104-4',  'assess-5', 'Ella C.',    TRUE,  'Mr. Davies', 9,  NULL, 'Please come see me to go over the areas you found tricky.', NULL, '2026-05-04T12:45:00Z'),
  ('sub-104-5',  'assess-5', 'Henry L.',   TRUE,  'Ms. Iyer',   15, NULL, 'Good work overall - a couple of areas to revisit.', NULL, '2026-05-04T14:00:00Z'),
  ('sub-104-6',  'assess-5', 'Jayden W.',  FALSE, 'Mr. Davies', 19, NULL, 'Reasonable attempt, see feedback for areas to improve.', NULL, '2026-05-04T10:15:00Z'),
  ('sub-104-7',  'assess-5', 'Hannah R.',  TRUE,  'Ms. Iyer',   24, NULL, 'Great job, strong grasp of the concepts covered.', NULL, '2026-05-04T10:00:00Z'),
  ('sub-104-8',  'assess-5', 'Max A.',     TRUE,  'Mr. Davies', 11, NULL, 'Please come see me to go over the areas you found tricky.', NULL, '2026-05-04T11:15:00Z'),
  ('sub-104-9',  'assess-5', 'William B.', FALSE, 'Mr. Davies', 18, NULL, 'Solid effort with a good understanding of most concepts.', NULL, '2026-05-04T12:30:00Z'),
  ('sub-104-10', 'assess-5', 'Leo H.',     FALSE, 'Mr. Davies', 16, NULL, 'Sound understanding shown, with some minor errors.', NULL, '2026-05-04T13:45:00Z'),
  ('sub-104-11', 'assess-5', 'Amelia K.',  FALSE, 'Ms. Iyer',   24, NULL, 'Great job, strong grasp of the concepts covered.', NULL, '2026-05-04T10:00:00Z'),
  ('sub-104-12', 'assess-5', 'Charlie A.', TRUE,  'Mr. Davies', 10, NULL, 'Needs more preparation time. Revisit the practice questions.', NULL, '2026-05-04T11:15:00Z'),
  ('sub-104-13', 'assess-5', 'Matilda M.', TRUE,  'Mr. Davies', 14, NULL, 'Needs more preparation time. Revisit the practice questions.', NULL, '2026-05-04T11:00:00Z'),
  ('sub-104-14', 'assess-5', 'James S.',   FALSE, 'Ms. Iyer',   18, NULL, 'Solid effort with a good understanding of most concepts.', NULL, '2026-05-04T12:15:00Z'),
  ('sub-104-15', 'assess-5', 'Harper W.',  FALSE, 'Mr. Davies', 20, NULL, 'Sound understanding shown, with some minor errors.', NULL, '2026-05-04T13:30:00Z'),
  ('sub-104-16', 'assess-5', 'Jayden W.',  TRUE,  'Mr. Davies', 15, NULL, 'Sound understanding shown, with some minor errors.', NULL, '2026-05-04T09:45:00Z'),
  ('sub-104-17', 'assess-5', 'Chloe L.',   FALSE, 'Mr. Davies', 11, NULL, 'Needs more preparation time. Revisit the practice questions.', NULL, '2026-05-04T11:00:00Z'),
  ('sub-104-18', 'assess-5', 'Ethan E.',   FALSE, 'Ms. Iyer',   13, NULL, 'Needs more preparation time. Revisit the practice questions.', NULL, '2026-05-04T12:15:00Z'),
  ('sub-104-19', 'assess-5', 'Archie C.',  FALSE, 'Ms. Iyer',   21, NULL, 'Solid effort with a good understanding of most concepts.', NULL, '2026-05-04T12:00:00Z')
ON CONFLICT (id) DO NOTHING;


-- ============================================================
-- SUBMISSIONS — Titration Practical Report (assess-6)
-- ============================================================

INSERT INTO submissions (id, assessment_id, student_name, anonymous, marker, score, grade, feedback, response_excerpt, submitted_at) VALUES
  ('sub-105-1',  'assess-6', 'Sienna B.',  FALSE, 'Ms. Reyes', 12, NULL, 'Reasonable attempt, see feedback for areas to improve.', NULL, '2026-05-04T09:00:00Z'),
  ('sub-105-2',  'assess-6', 'Leo T.',     FALSE, 'Ms. Reyes', 16, NULL, 'Impressive depth of understanding shown here.', NULL, '2026-05-04T10:15:00Z'),
  ('sub-105-3',  'assess-6', 'Max B.',     FALSE, 'Ms. Reyes', 15, NULL, 'Excellent work - clear understanding and well-presented throughout.', NULL, '2026-05-04T11:30:00Z'),
  ('sub-105-4',  'assess-6', 'Leo C.',     TRUE,  'Dr. Foster', 15, NULL, 'Excellent work - clear understanding and well-presented throughout.', NULL, '2026-05-04T12:45:00Z'),
  ('sub-105-5',  'assess-6', 'James J.',   TRUE,  'Ms. Reyes', 10, NULL, 'Reasonable attempt, see feedback for areas to improve.', NULL, '2026-05-04T14:00:00Z'),
  ('sub-105-6',  'assess-6', 'Hamish W.',  TRUE,  'Dr. Foster', 10, NULL, 'Good work overall - a couple of areas to revisit.', NULL, '2026-05-04T10:15:00Z'),
  ('sub-105-7',  'assess-6', 'Daniel R.',  TRUE,  'Dr. Foster', 7,  NULL, 'A few key concepts were missed - let''s work through these together.', NULL, '2026-05-04T10:00:00Z'),
  ('sub-105-8',  'assess-6', 'Lucas K.',   TRUE,  'Dr. Foster', 10, NULL, 'Sound understanding shown, with some minor errors.', NULL, '2026-05-04T11:15:00Z'),
  ('sub-105-9',  'assess-6', 'Mia T.',     TRUE,  'Dr. Foster', 11, NULL, 'Solid effort with a good understanding of most concepts.', NULL, '2026-05-04T12:30:00Z'),
  ('sub-105-10', 'assess-6', 'Tyler L.',   FALSE, 'Dr. Foster', 11, NULL, 'Reasonable attempt, see feedback for areas to improve.', NULL, '2026-05-04T13:45:00Z'),
  ('sub-105-11', 'assess-6', 'Harper R.',  TRUE,  'Ms. Reyes', 13, NULL, 'Sound understanding shown, with some minor errors.', NULL, '2026-05-04T10:00:00Z'),
  ('sub-105-12', 'assess-6', 'Riley C.',   FALSE, 'Ms. Reyes', 11, NULL, 'Good work overall - a couple of areas to revisit.', NULL, '2026-05-04T11:15:00Z'),
  ('sub-105-13', 'assess-6', 'Nathan R.',  FALSE, 'Ms. Reyes', 10, NULL, 'Reasonable attempt, see feedback for areas to improve.', NULL, '2026-05-04T11:00:00Z'),
  ('sub-105-14', 'assess-6', 'William W.', FALSE, 'Ms. Reyes', 5,  NULL, 'Needs more preparation time. Revisit the practice questions.', NULL, '2026-05-04T12:15:00Z'),
  ('sub-105-15', 'assess-6', 'Charlie C.', TRUE,  'Dr. Foster', 8,  NULL, 'Needs more preparation time. Revisit the practice questions.', NULL, '2026-05-04T13:30:00Z'),
  ('sub-105-16', 'assess-6', 'Archie E.',  FALSE, 'Dr. Foster', 11, NULL, 'Reasonable attempt, see feedback for areas to improve.', NULL, '2026-05-04T09:45:00Z'),
  ('sub-105-17', 'assess-6', 'Daniel A.',  FALSE, 'Dr. Foster', 6,  NULL, 'Some understanding shown but needs more revision before the next assessment.', NULL, '2026-05-04T11:00:00Z'),
  ('sub-105-18', 'assess-6', 'Liam R.',    FALSE, 'Dr. Foster', 6,  NULL, 'Please come see me to go over the areas you found tricky.', NULL, '2026-05-04T12:15:00Z'),
  ('sub-105-19', 'assess-6', 'Hamish M.',  TRUE,  'Ms. Reyes', 12, NULL, 'Reasonable attempt, see feedback for areas to improve.', NULL, '2026-05-04T12:00:00Z'),
  ('sub-105-20', 'assess-6', 'Harper K.',  FALSE, 'Ms. Reyes', 11, NULL, 'Solid effort with a good understanding of most concepts.', NULL, '2026-05-04T13:15:00Z'),
  ('sub-105-21', 'assess-6', 'Noah H.',    TRUE,  'Ms. Reyes', 11, NULL, 'Reasonable attempt, see feedback for areas to improve.', NULL, '2026-05-04T09:30:00Z'),
  ('sub-105-22', 'assess-6', 'Hannah C.',  FALSE, 'Dr. Foster', 6,  NULL, 'Needs more preparation time. Revisit the practice questions.', NULL, '2026-05-04T10:45:00Z'),
  ('sub-105-23', 'assess-6', 'Henry K.',   TRUE,  'Ms. Reyes', 11, NULL, 'Good work overall - a couple of areas to revisit.', NULL, '2026-05-04T12:00:00Z'),
  ('sub-105-24', 'assess-6', 'Noah N.',    FALSE, 'Dr. Foster', 11, NULL, 'Good work overall - a couple of areas to revisit.', NULL, '2026-05-04T13:15:00Z')
ON CONFLICT (id) DO NOTHING;


-- ============================================================
-- SUBMISSIONS — Periodic Trends Test (assess-7)
-- ============================================================

INSERT INTO submissions (id, assessment_id, student_name, anonymous, marker, score, grade, feedback, response_excerpt, submitted_at) VALUES
  ('sub-106-1',  'assess-7', 'Charlotte M.', FALSE, 'Dr. Foster', 18, NULL, 'Solid effort with a good understanding of most concepts.', NULL, '2026-05-04T09:00:00Z'),
  ('sub-106-2',  'assess-7', 'Eva W.',       FALSE, 'Dr. Foster', 22, NULL, 'Sound understanding shown, with some minor errors.', NULL, '2026-05-04T10:15:00Z'),
  ('sub-106-3',  'assess-7', 'Charlotte H.', FALSE, 'Dr. Foster', 24, NULL, 'Sound understanding shown, with some minor errors.', NULL, '2026-05-04T11:30:00Z'),
  ('sub-106-4',  'assess-7', 'Mia T.',       FALSE, 'Mr. Cole',   17, NULL, 'Needs more preparation time. Revisit the practice questions.', NULL, '2026-05-04T12:45:00Z'),
  ('sub-106-5',  'assess-7', 'Thomas H.',    FALSE, 'Mr. Cole',   17, NULL, 'Some understanding shown but needs more revision before the next assessment.', NULL, '2026-05-04T14:00:00Z'),
  ('sub-106-6',  'assess-7', 'Mia M.',       TRUE,  'Ms. Reyes',  13, NULL, 'Please come see me to go over the areas you found tricky.', NULL, '2026-05-04T10:15:00Z'),
  ('sub-106-7',  'assess-7', 'Ruby W.',      TRUE,  'Ms. Reyes',  21, NULL, 'Sound understanding shown, with some minor errors.', NULL, '2026-05-04T10:00:00Z'),
  ('sub-106-8',  'assess-7', 'Harper W.',    TRUE,  'Mr. Cole',   10, NULL, 'Some understanding shown but needs more revision before the next assessment.', NULL, '2026-05-04T11:15:00Z'),
  ('sub-106-9',  'assess-7', 'Samuel W.',    FALSE, 'Mr. Cole',   17, NULL, 'Some understanding shown but needs more revision before the next assessment.', NULL, '2026-05-04T12:30:00Z'),
  ('sub-106-10', 'assess-7', 'Isla N.',      TRUE,  'Ms. Reyes',  22, NULL, 'Solid effort with a good understanding of most concepts.', NULL, '2026-05-04T13:45:00Z'),
  ('sub-106-11', 'assess-7', 'Ethan C.',     FALSE, 'Ms. Reyes',  17, NULL, 'Please come see me to go over the areas you found tricky.', NULL, '2026-05-04T10:00:00Z'),
  ('sub-106-12', 'assess-7', 'Nathan B.',    FALSE, 'Dr. Foster', 28, NULL, 'Excellent work - clear understanding and well-presented throughout.', NULL, '2026-05-04T11:15:00Z'),
  ('sub-106-13', 'assess-7', 'Thomas P.',    FALSE, 'Ms. Reyes',  18, NULL, 'Solid effort with a good understanding of most concepts.', NULL, '2026-05-04T11:00:00Z'),
  ('sub-106-14', 'assess-7', 'Hannah K.',    FALSE, 'Ms. Reyes',  19, NULL, 'Good work overall - a couple of areas to revisit.', NULL, '2026-05-04T12:15:00Z'),
  ('sub-106-15', 'assess-7', 'Grace S.',     FALSE, 'Dr. Foster', 16, NULL, 'A few key concepts were missed - let''s work through these together.', NULL, '2026-05-04T13:30:00Z'),
  ('sub-106-16', 'assess-7', 'Cooper N.',    FALSE, 'Mr. Cole',   22, NULL, 'Solid effort with a good understanding of most concepts.', NULL, '2026-05-04T09:45:00Z'),
  ('sub-106-17', 'assess-7', 'Eva M.',       TRUE,  'Dr. Foster', 7,  NULL, 'A few key concepts were missed - let''s work through these together.', NULL, '2026-05-04T11:00:00Z'),
  ('sub-106-18', 'assess-7', 'Mason S.',     TRUE,  'Ms. Reyes',  5,  NULL, 'Needs more preparation time. Revisit the practice questions.', NULL, '2026-05-04T12:15:00Z'),
  ('sub-106-19', 'assess-7', 'Chloe K.',     FALSE, 'Mr. Cole',   17, NULL, 'Some understanding shown but needs more revision before the next assessment.', NULL, '2026-05-04T12:00:00Z'),
  ('sub-106-20', 'assess-7', 'Ryan W.',      TRUE,  'Dr. Foster', 6,  NULL, 'Please come see me to go over the areas you found tricky.', NULL, '2026-05-04T13:15:00Z'),
  ('sub-106-21', 'assess-7', 'Max W.',       FALSE, 'Mr. Cole',   9,  NULL, 'Please come see me to go over the areas you found tricky.', NULL, '2026-05-04T09:30:00Z')
ON CONFLICT (id) DO NOTHING;
