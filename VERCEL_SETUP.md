# 🚀 Vercel Deployment Guide

## Quick Setup (Fresh Install)

### 1. Create New Project
- Go to: https://vercel.com/new
- Select team: **krezzo2**
- Import Git Repository: **stephennewman/ov**
- Click "Import"

### 2. Environment Variables
Add these 3 environment variables:

#### NEXT_PUBLIC_SUPABASE_URL
```
https://qmpogeboufwkyotposyz.supabase.co
```

#### NEXT_PUBLIC_SUPABASE_ANON_KEY
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFtcG9nZWJvdWZ3a3lvdHBvc3l6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI4ODU4OTgsImV4cCI6MjA3ODQ2MTg5OH0.aZkp5KDgO-9nxDdjPMvUXjxJQwbvB6I3EqxmZ_BqoQQ
```

#### NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY
```
pk_dev_MR6FbUQfwlYGqLPGnOuDcDty-0dMVa5RvYFbzYfV2uzdyu4v2ZuMC90liGjVQx5n
```

### 3. Build Settings (Auto-Detected)
- Framework: Next.js
- Build Command: `npm run build`
- Output Directory: `.next`
- Install Command: `npm install`
- Node Version: 20.x

### 4. Deploy
Click "Deploy" and wait ~2 minutes.

---

## Project Details

### GitHub Repository
- **URL:** https://github.com/stephennewman/ov
- **Branch:** main
- **Latest Commit:** 447e781

### Supabase Database
- **Project:** ov1 (qmpogeboufwkyotposyz)
- **URL:** https://qmpogeboufwkyotposyz.supabase.co
- **Region:** us-east-2
- **Status:** ACTIVE_HEALTHY

### Expected URLs After Deploy
- **Production:** https://ov-[hash]-krezzo2.vercel.app
- **Domain:** https://ov-krezzo2.vercel.app
- **Custom:** (can add your own domain)

---

## Troubleshooting

### Build Stuck in "Queued"
This usually means:
- Account quota exceeded
- Multiple builds queued
- **Fix:** Cancel stuck builds from Vercel dashboard

### Environment Variables Not Working
Make sure:
- All 3 variables are added
- Names match exactly (case-sensitive)
- No extra spaces
- **Fix:** Go to Settings → Environment Variables → Edit

### Old Code Deploying
Vercel caches builds. To force fresh:
- Deployments → Find latest
- Click "..." → Redeploy
- **Uncheck** "Use existing Build Cache"

### Wrong Team/Account
Check top-left dropdown:
- Should say **"krezzo2"**
- If not, switch teams first

---

## Post-Deployment Checklist

✅ Site loads at production URL
✅ Homepage shows OutcomeView branding
✅ `/dashboard` shows 4-view switcher
✅ `/login` shows login page
✅ `/test-db` shows database connection test
✅ Real-time cursors work (open 2 tabs)
✅ Dark/light theme toggle works

---

## Updating Environment Variables

1. Go to: https://vercel.com/krezzo2/ov/settings/environment-variables
2. Click variable name to edit
3. Update value
4. Click "Save"
5. **Redeploy** for changes to take effect

---

## Custom Domain Setup

1. Go to: Settings → Domains
2. Add your domain (e.g., `outcomeview.com`)
3. Follow DNS instructions
4. Wait for verification (~5 minutes)
5. SSL auto-configured ✅

---

## Vercel Project Info

- **Project ID:** prj_EEcB5ffwx0u864qEFcIiAjFng2Rw (krezzo2)
- **Team ID:** team_JeIdP0zsf4Qi92tURFFkDEHW
- **Region:** US East (iad1)
- **Framework:** Next.js 16.0.1
- **Node Version:** 20.x

---

*Last Updated: November 11, 2025*

