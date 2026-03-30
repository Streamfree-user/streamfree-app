# STREAMFREE - Deployment Checklist

## Pre-Deployment ✓

### Code & Repository
- [ ] Code committed to GitHub
- [ ] All files in `.gitignore` are excluded
- [ ] No sensitive data in code (no API keys)
- [ ] Package.json has all dependencies

### Sanity.io Setup
- [ ] Sanity project created
- [ ] Project ID copied
- [ ] Dataset set to "production"
- [ ] Movie schema deployed
- [ ] At least 1 test movie published
- [ ] Video fully processed (wait 2+ minutes)

### Environment Variables
- [ ] `.env.local` created locally
- [ ] `NEXT_PUBLIC_SANITY_PROJECT_ID` set
- [ ] `NEXT_PUBLIC_SANITY_DATASET` = "production"
- [ ] `NEXT_PUBLIC_GOOGLE_ADSENSE_ID` placeholder (optional)

### Local Testing
- [ ] `npm run dev` starts without errors
- [ ] Home page loads
- [ ] Movies display in grid
- [ ] "Watch Now" button works
- [ ] Video player loads and plays
- [ ] Responsive design works on mobile

### Build Test
- [ ] `npm run build` completes successfully
- [ ] No build errors or warnings
- [ ] `.next` folder created

---

## Vercel Deployment ✓

### Create Vercel Project
- [ ] Vercel account created (vercel.com)
- [ ] GitHub connected to Vercel
- [ ] Project imported from GitHub repo

### Environment Variables in Vercel
- [ ] `NEXT_PUBLIC_SANITY_PROJECT_ID` added
- [ ] `NEXT_PUBLIC_SANITY_DATASET` added
- [ ] `NEXT_PUBLIC_GOOGLE_ADSENSE_ID` added (if available)
- [ ] Variables match local `.env.local`

### Deployment
- [ ] Click "Deploy" in Vercel
- [ ] Build completes (2-5 minutes)
- [ ] Deployment successful
- [ ] Live URL provided (e.g., streamfree.vercel.app)

### Post-Deployment Testing
- [ ] Visit live URL
- [ ] Home page loads
- [ ] Movies from Sanity display
- [ ] Video player works on live site
- [ ] Mobile responsive

---

## Sanity CORS Configuration ✓

- [ ] Go to Sanity Project Settings
- [ ] Find CORS Origins section
- [ ] Add `http://localhost:3000` (local dev)
- [ ] Add `https://streamfree.vercel.app` (production)
- [ ] Save

---

## Google AdSense Setup ✓

### Approval Process
- [ ] Google AdSense account created
- [ ] Application submitted
- [ ] Waiting for approval (1-2 weeks)
- [ ] Approval email received

### Configuration
- [ ] Publisher ID copied (ca-pub-...)
- [ ] `/public/ads.txt` updated with Publisher ID
- [ ] `NEXT_PUBLIC_GOOGLE_ADSENSE_ID` added to Vercel
- [ ] Ads.txt accessible: `yourdomain.com/ads.txt`

### Ad Verification
- [ ] Wait 24-48 hours after setup
- [ ] Check if ads appear on site
- [ ] Monitor AdSense dashboard for impressions
- [ ] Check earnings report

---

## Monitoring & Maintenance ✓

### Vercel Analytics
- [ ] Monitor page performance
- [ ] Check error logs
- [ ] Set up alerts for failures
- [ ] Monitor bandwidth usage

### Sanity Admin
- [ ] Regular content updates
- [ ] Monitor video processing times
- [ ] Check API usage stats
- [ ] Backup important content

### AdSense
- [ ] Monitor daily earnings
- [ ] Check for policy violations
- [ ] Review traffic sources
- [ ] Optimize ad placements

---

## Domain Setup (Optional) ✓

- [ ] Purchase domain (e.g., streamfree.com)
- [ ] Update DNS to point to Vercel
- [ ] Add custom domain in Vercel settings
- [ ] Verify SSL certificate (auto)
- [ ] Update Sanity CORS with custom domain

---

## Security Checklist ✓

- [ ] No hardcoded API keys in code
- [ ] Environment variables used for secrets
- [ ] CORS properly configured
- [ ] No user data collection (except AdSense)
- [ ] ads.txt file in place
- [ ] No authentication bypass issues
- [ ] Video URLs protected by Sanity (CDN)

---

## Final Verification ✓

### Functionality
- [ ] All movies load correctly
- [ ] Video playback works smoothly
- [ ] No console errors
- [ ] Ads display properly
- [ ] Mobile layout responsive

### Performance
- [ ] Page loads in <3 seconds
- [ ] Video streams without buffering
- [ ] Images optimized (Sanity CDN)
- [ ] No memory leaks

### SEO (Optional)
- [ ] Meta tags set in layout
- [ ] Open Graph tags for sharing
- [ ] Sitemap generated
- [ ] robots.txt configured

---

## Launch Ready! 🚀

If all checkboxes are marked, your STREAMFREE platform is ready to launch.

### Post-Launch Tasks
1. Share live URL with users
2. Monitor analytics for first week
3. Fix any reported bugs
4. Add more movies regularly
5. Optimize based on user feedback

---

**Congratulations! Your streaming platform is live! 🎬**
