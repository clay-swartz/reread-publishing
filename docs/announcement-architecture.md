# Re:Read — Announcement Website / Launch UX

Status: draft direction for review (not production-approved). Source of truth: October 27 handoff plus subsequent approvals, especially the dark chocolate-marble hero and animated wordmark.

## Audience and actions

| Person | Must learn | Appropriate next step | Launch dependency |
|---|---|---|---|
| First-time reader | Who Re:Read is and what it will publish | Join the free updates list | Real email provider, consent/success states |
| Interested future customer | American Myths and why these editions matter | Follow release news | Actual titles, dates, retail/pricing not yet determined |
| Potential member | What relationship might become available | Join updates for future announcements | Membership offer and terms remain **undecided** |
| Author / rights holder | Editorial interest and current submissions status | Follow for guidelines | Intake policy and working contact channel |
| Designer / illustrator | What kinds of creative work are relevant | Follow for opportunities | Working creative-contact form or published address |
| Curious supporter | How the publishing process works | Read journal notes | Editorial cadence and content publishing workflow |

## Component composition
GlobalHeader (sticky) -> EditorialHero (approved treatment, announcement copy) -> CollectionTeaser (integrated navy) -> EmailCapture (one primary action, preview only) -> EditorialTypes (rediscovered/original) -> PublishingJourney (5 stages, explicit and reusable) -> JournalInvitation (links to original draft note) -> CreativeInvitation (two audience-specific lanes) -> GlobalFooter.

Everything is implemented as semantic HTML and class-based components using shared tokens under src/system. The homepage and journal route use the same header, wordmark and footer. The old photo ribbon and independent process cards are **not present**.

### Design limitations worth preserving
- Do not build fake book imagery, literary titles, or stock 'behind the scenes' imagery without verification.
- Avoid gratuitous eyebrow labels, card grids, arbitrary colored strips, and motion without user value.
- Multiple paths should not compete with the single primary conversion: free email list.
- Newsletter must not falsely claim an email was saved. This review uses client-side validation and reports that signups are not live.
- Do not build a public membership checkout or use 'member' as if it were an existing enrollment.
- Submission policies modeled on Graywolf's clarity but **not copied**; no Re:Read intake criteria are final.

## Content hub decision to make
Option A: **Owned /journal on Re:Read** with on-site posting and independent email platform. Best design control, requires editorial CMS and mail system.
Option B: **Substack publication** as the editorial engine and email platform, with the Re:Read site as the distinct brand home. Official embedding supported but the form appearance is not customizable; use direct links or embed only if the limitation is acceptable. See https://support.substack.com/hc/en-us/articles/360041759232-Can-I-embed-a-signup-form-for-my-Substack-publication
Option C: **beehiiv** for customizable capture; optional separate on-site editorial system. See https://www.beehiiv.com/support/article/12977090590487-creating-an-embedded-subscribe-form

Do not create accounts or enable paid subscriptions without approval. Decide canonical content location, subscriber ownership/export, required styling, cross-posting, analytics, and consent handling first.

## Next launch-critical work
1. Connect newsletter to a real provider before placing signup on production.
2. Define a real route for creators (contact mailbox or moderated creator-interest form). Until then, do not say submissions or inquiries are accepted.
3. Approve exact membership positioning (free newsletter today; potential member offer later only).
4. Confirm actual contact and legal/privacy links.
5. Browser-review and accessibility-test all breakpoints and interaction states.
6. Approve copy and dispatch; only then consider production merge.
