# Missing Features Gap Analysis

Based on the comparison between the updated `prd req` and the current codebase, the following features and logical flows are identified as missing or incomplete:

## 1. Functional Logic & User Flows (Ref: PRD 11)
-   **Entry Flow (Auth & Redirection)**: The current login page is static UI. The logic to authenticate a user and **redirect them based on role** (Learner → Feed, Recruiter → Dashboard) is completely missing.
-   **Recruitment Pipeline Logic**: The "Move to Next Stage" button in the recruitment dashboard exists but is non-functional. There is no logic to actually update a candidate's status (e.g., from "Applied" to "Interview").
-   **Certificate Issuance Logic**: The "System Flow" for automatically adding a certificate to a profile upon 100% course completion is not implemented (currently just mock data).

## 2. Learning Management (Ref: PRD 4.4)
-   **Skill Paths**: The current implementation features "Top Categories" but lacks a dedicated "Skill Path" view.
-   **Course Assessments**: No UI for taking quizzes within the learner view.

## 3. Job Listings (Ref: PRD 4.5)
-   **Company Preview Card**: Interaction to view deeper company details from a job card is missing.

## 4. User Profile (Ref: PRD 4.2)
-   **Privacy Controls**: No UI toggles for public/private section visibility.

## Summary
While the UI is high-fidelity and matches the visual requirements, the **application logic** for the core user flows (Auth Redirection, Pipeline Management, Certificate Automation) is missing. The app is currently a high-quality "static" prototype rather than a fully functional SaaS.
