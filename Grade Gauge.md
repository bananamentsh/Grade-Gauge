__High Level Summary:__

__Problem Statement:__

Students often compare assessment grades\. Students often find inconsistencies in the marking\. Finding an app to compare marks will allow students to better understand marking and hold teachers accountable when inconsistencies do occur\.

__In Scope:__

- Reddit like forum to see assessment pages, submissions, and grades\.
- Accounts
- Anonymity
- Trust \+ random moderation
- Simple opt in unassociated with school
- Class by class basis, created by a student, not intended to be used by schools to maintain accountability, expected to be set up by and for students\. 
- Free, supported by ads \(not now but if ever scaled up\)

__Out of Scope:__

- AI image to text
- AI anything for now
- Teacher involvement
- School involvement
- Analysis of response/alternative grading/regrading

__Technical Details:  
__Regarding technical setup, I am using the following platforms\. What do you suggest for the techstack?

- Database: Supabase
- Hosting: Vercel

I'll be developing with VS code and the Claude Code extension\. 

<a id="_o3x33s3asueh"></a>__Details:__

I am creating a website\. It is designed to be a way for students to compare their assessment submissions and marks\. The main goal is to improve transparency and fairness in marking, specifically in high school\. 

I basically want it to look like reddit or quora\. Instead of a subreddit, you have a class page, instead of questions or posts, you have the assessments, and instead of comments or replies, students post photos or text files of their submissions as well as the mark they got, the teacher who marked it, and any feedback they received\. 

The site may include AI to convert the photo into text automatically to display side by side, it may at some point include AI analysis of responses, but not right now\.

It would be designed so that you need an account to view or post, but posts can be made anonymously\. A class page would need to be created by a member of the class, who would then be a page admin, almost like discord\. There would be no messaging between users and page/site admins could take down any post that they deem inappropriate\.   
  
  
  
__Account/access:__  
A student would require an invite from the page admin to access the page\. They would need to make an account and then get an invite link/be invited through the app\. An account would require an email, any email is fine\. I might add login with google but not now\. A page admin could add any account to the page by looking up the email or username\. The responsibility lies with the page admin to ensure that all people with access to the page are actually in the class

Teachers would not typically be given access\. I guess if the page admin wanted they could post model answers or something but there won’t be a teacher role to give feedback/explain reasoning or anything like that\.   
  
  
  
__Anonymity/Moderation:__  
Anonymity options will be set by the page admin in the setup phase\. Options could potentially include:

- Required: All posts are always anonymous
- Optional: Users have the option to make accounts anonymous
- Blocked: All posts are never anonymous

Admins will not be able to see the users of anonymous accounts by default but may choose to reveal identity to the admin only when undertaking moderation action such as removing a post or warning or removing a user\. Ideally, there would be a way to track the number of moderation actions taken against an account in that class page without revealing the user name\. 

Users could be required to provide their real name on the account so admins know who they are when adding them to the class page, but this would be up to the page admin and would be optional\.   
  
  
  
__Page creation/archivation:  
__A class page can be made by any user\. That user then automatically becomes the page admin\. 

When creating a class page, the creator will be able to customise the page\. Some page settings could include:

- Anonymity \(as above\)
- Who can add assignments

When a page is archived, no new users can be added, everything remains as it was at the time it was decommissioned\. A view only page for everyone who was on it at the time of archivation\. Maybe add a de\-archive function later but not now\.  
  
  
  
__Assignment/Response creation:__  
Page Admin creates an assignment with following details:

- Assessment Name
- Assessment Type \(Hand in, in class test, paper, video, etc\. There would be defaults, page admin could add more types, specific types might only accept certain file formats\)
- Attach the notification or the question or any type of information about the task
- Any notes they wish to add \(Not 100% sure about this but keep for now, simple text box\)

The user responds to the task with their submission\. Their name is automatically on the post unless they choose to make it anonymous \(or the class page has forced anonymity\)\. They upload their submission \(upload a file and optionally add text for a video transcript or a plain text version of the paper or whatever\) and optionally specify who marked it \(could be a dropdown menu or just open text box\)   
  
  
  
__User interaction: __  
No user interaction will be available\. The app is designed to be a tool for specific classes who will have in person or alternate online communication methods\. User interaction requires significantly more moderation than just posts\. There is no liking/disliking or following or anything\.   
  
  
  
__Post/Task editing:__  
You can edit the post, add additional files, remove files, but edits are displayed \(as in anything not in the original post has like an asterisk or smth idk maybe highlighted but differentiable\)\. Same for tasks I guess\. There's not really any protection against griefing et

__Technical Details:__

Given the chosen platforms \(Supabase and Vercel\), the recommended tech stack is:

- __Next\.js \(App Router\)__ — pairs perfectly with Vercel \(zero\-config deploy\), and Supabase has a first\-class Next\.js integration for auth, server components, and row\-level security\.
- __Tailwind CSS__ — fast to build UI with, no config headaches\.
- __Supabase JS client__ — handles auth, database queries, and real\-time updates out of the box\. No separate ORM needed to start\.

Why this stack suits the app:

- Supabase Auth handles accounts and anonymous sessions natively\.
- Row\-Level Security \(RLS\) in Supabase is ideal for “only show your own submissions unless you opt in” logic\.
- Next\.js server components keep sensitive database logic off the client\.
- Vercel automatically creates preview deployments for every code change — useful for a class project\.



__Assessment Statistics:__

Each assessment page displays a class\-wide statistical summary visible to all members: mean score, median score, standard deviation, interquartile range, number of submissions, and pass rate\. Pass rate is calculated against a threshold set by the page admin at assessment creation\. Score distribution is shown as a histogram with 10\-percentage\-point bands above the configured threshold, with all scores below the threshold collapsed into a single band\. If the assessment uses letter grades, they are treated ordinally for statistical computation and all statistics are displayed numerically alongside the grading scale for reference; each user also sees their own letter grade\. Per\-marker breakdowns show the mean, median, standard deviation, and IQR for each marker separately, supporting direct comparison across markers\. Each user can always see their own rank and percentile within the class\. The page admin can toggle visibility of each individual statistic — options are: visible to all, visible to self only, or hidden — with the exception of raw scores/grades, which are always visible to all members, as cross\-student grade comparison is the core purpose of the platform\.\.\.

