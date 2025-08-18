---
layout: post
title: Sanely handling PR reviews with a rotation
category: dev
---

Pull request reviews. The term either fills you with something approaching joy, or, more likely, dread. In my experience, PR reviews are one of the best ways to ensure code quality, catch bugs, help engineers learn about the codebase. But they have to be handled with a bit of intentionality.

If you’ve ever worked on a growing engineering team, you might recognize this story. PR reviews start off fine, but as the codebase grows, suddenly one or two people are buried under a mountain of reviews while everyone else is waiting for days to get their code reviewed. Reviewers are stressed, PRs get stale, and no one is happy.

I humbly suggest a simple rotation that I've employed for nearly three years.
## Basics of the rotation

- Each week, one engineer is the primary reviewer, another is the backup.
- PR authors assign their code to be reviewed by those two.
- If you happen to open a PR the same week you’re primary, the backup covers your PR.
- Every Monday morning, the baton passes to the next pair, and the change is announced to the team. [^slackbot]
- The schedule is kept in a public document [^aischedule] and assignments can be traded to account for vacations, illnesses, etc.
## One or two approvals

Small changes? One review is fine. Bigger, riskier ones? Grab two. The idea is proportionality We're not dogmatic about it, but the idea is to get more eyes on changes that could have big negative consequences.

If one of the designated reviewers is unavailable, it's the authors responsibility to grab another teammate for the second review. The process should serve the team, not the other way around.

## What to review

What to review deserves it's own essay, but briefly, these are things I ask my team to review:

- **Functionality:** Use test environments to test the basic functionality.
- **Code Quality:** Check for clean, readable, and maintainable code. [^principles]
- **Variable and Method Naming:** Make sure variable and method names are clear.
- **Performance:** Look for potential performance catastrophes. (That nested loop over API calls. The query that's going to inadvertently scan the entire database.)
- **Security:** Identify any security vulnerabilities or potential risks.
- **Testing:** Ensure appropriate unit or integration tests are included. The goal isn't 100% coverage, but critical paths should be tested so we can make future updates with confidence.
- **Documentation:** Check that any tricky code is well-commented. If you had to think twice to understand a bit of code, future developers will too.

What shouldn't you review? Style. If something works and is logically written, don’t block a PR from being merged just because it isn’t exactly like you would have written it. [^commentandapprove]
## Lessons learned

It's not all wine and roses, some weeks are heavier on reviews than others. Reviewers might have a tough time getting to their scheduled reviews quickly if the rest of their workload is heavy. But I still think this simple system has had a positive effect on the team. PR authors know exactly who to reach out to for reviews, reviewers don't get overwhelmed, and knowledge about the codebase grows naturally on the team.

We’re still tuning the rotation, but it’s the first system that’s made PR reviews feel less like a chore and more like a shared responsibility.

[^slackbot]: I went overboard and wrote a bot that automatically posts the rotation change each Monday.
[^aischedule]: I used AI to generate the rotation about 6 months out. AI can also help slot in new teammates as your team grows and changes.
[^principles]: See my post on [programming principles](/blog/2025/08/human-first-programming-principles/) for more.
[^commentandapprove]: If there are style tweaks I want to suggest, I'll put them in my review, but I'll grant the approval. Then it's up to the PR author if they want to adopt my suggestions or not.