# STREAMFREE - Quick Start (5 Minutes)

## 1. Install & Run Locally (2 min)

```bash
cd streamfree-app
npm install
npm run dev
# Open: http://localhost:3000
```

## 2. Get Sanity Project ID (1 min)

1. Go to https://sanity.io
2. Create project → Copy **Project ID**
3. Create `.env.local`:
   ```env
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_id_here
   NEXT_PUBLIC_SANITY_DATASET=production
   ```

## 3. Add Test Movie (1 min)

1. Go to https://<project-id>.sanity.studio
2. Click **Movie Library** → **Create**
3. Upload poster image & video file
4. Click **Publish**
5. Refresh http://localhost:3000 → Movie appears!

## 4. Deploy to Vercel (1 min)

1. Push to GitHub: `git push origin main`
2. Go to https://vercel.com → **New Project**
3. Import your GitHub repo
4. Add environment variables (same as .env.local)
5. Click **Deploy** ✅

## 5. Enable AdSense (Later)

1. Sign up: https://www.google.com/adsense
2. After approval, get your **Publisher ID**
3. Add to Vercel environment variables
4. Update `/public/ads.txt` with your ID

---

**That's it!** Your streaming platform is live! 🎬
