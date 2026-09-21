# Ethan Creator v7 — Ethan ID integration (foundation)

The user-provided Ethan Hub v6.2 ZIP identifies the shared Ethan ID Supabase project. This build uses that same Supabase Auth project for sign-in; **a user may need to sign in again on the Creator domain** because browser sessions are origin-scoped. This is shared identity, NOT a verified seamless SSO ticket integration. Do not copy access tokens between domains or put service-role keys in frontend code.

## Setup
1. Upload extracted files to Ethan Creator's GitHub repository and deploy as a static Vercel site.
2. In the **existing Ethan ID Supabase project**, run `ETHAN-CREATOR-SETUP.sql` to create private per-user project records with RLS. Do not run it in a different Supabase project.
3. Open the deployed HTTPS Creator site and sign in with an existing Ethan ID. Visit **My Projects** to upload project JSON exported from a studio, download it later and import it back into that studio.
4. If Supabase Auth restricts site origins or redirect URLs, allow the deployed Creator URL in the existing Ethan ID project's Auth URL settings. Do not replace the Hub's existing Site URL.

## Implemented vs not implemented
Implemented: existing design/video/website studios; shared Ethan ID credentials via the same Supabase Auth project; private cloud storage of small project JSON documents after SQL setup; browser-side project upload/download. No automatic background syncing or cloud storage of source video files.

Not implemented: seamless Hub-to-Creator SSO handoff, real-time collaboration, AI generation, background removal, licensed media provider, media bucket uploads, one-click website hosting, audio mixing, MP4 rendering. These require provider configuration and additional server-side code; this build does not display them as operational. The Hub ZIP's SSO Edge Function is not safe to copy unchanged for Creator: it returns bearer/refresh tokens without single-use replay protection. Its ticket flow needs hardening before integration.
\n## v8 adjustable canvas workspace\nDesign Studio now includes Fit, 25–200% zoom, slider, +/- controls, scrollable canvas area, and an Expand workspace button that hides both side panels. Canvas pixel dimensions and export resolution do not change with on-screen zoom.\n