# STREAMFREE - Free Movie Streaming Platform

A high-performance, modern movie streaming web application built with **Next.js**, **Sanity.io**, and **Tailwind CSS**. No login required. Direct device uploads. Monetizable with Google AdSense.

## 🚀 Features

- ✅ **No Login Required** - Public access to all movies
- ✅ **Direct Device Uploads** - Upload videos directly from your device via Sanity Admin
- ✅ **Modern Dark UI** - Responsive design with red accents
- ✅ **Video Streaming** - HTML5 video player with full controls
- ✅ **Google AdSense Integration** - Monetize with responsive ad placements
- ✅ **Fast Performance** - Next.js App Router + Static Generation
- ✅ **Mobile Optimized** - Fully responsive design
- ✅ **SEO Ready** - Metadata and Open Graph tags

## 📋 Tech Stack

- **Frontend**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS 3
- **CMS**: Sanity.io (Headless)
- **Video Storage**: Sanity Content Lake
- **Hosting**: Vercel (Free Tier)
- **Monetization**: Google AdSense

## 🛠️ Setup Instructions

### Step 1: Clone or Create the Project

```bash
git clone <your-repo-url> streamfree
cd streamfree
```

### Step 2: Install Dependencies

```bash
npm install
# or
yarn install
```

### Step 3: Set Up Sanity.io

#### Create a Sanity Project (if you don't have one):

1. Go to [sanity.io](https://sanity.io)
2. Sign up or log in
3. Create a new project
4. Choose **Next.js** as the template
5. Select **Production** dataset

#### Copy Your Credentials:

After creating your Sanity project, note down:
- **Project ID** (from project settings)
- **Dataset** (usually `production`)

### Step 4: Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_GOOGLE_ADSENSE_ID=ca-pub-xxxxxxxxxxxxxxxx
```

Replace:
- `your_project_id_here` - Your Sanity Project ID
- `ca-pub-xxxxxxxxxxxxxxxx` - Your Google AdSense Publisher ID (optional for now, add later)

### Step 5: Configure Sanity Schema

1. Navigate to your Sanity project directory (or use Sanity CLI)
2. Copy the `sanity/schemas/movie.js` file to your Sanity schema folder
3. Restart your Sanity Studio

#### Enable Direct Video Uploads in Sanity:

In your Sanity project:
1. Go to **Project Settings** → **CORS Origins**
2. Add your development URL: `http://localhost:3000`
3. Go to **API** → **Tokens** → Create a new token with "Editor" role
4. In your Sanity Studio, ensure the `videoFile` field accepts video uploads

### Step 6: Verify Sanity Configuration

Your Sanity schema should have:
- **title** - Movie title (required)
- **slug** - Auto-generated URL slug
- **poster** - Image with hotspot enabled (required)
- **videoFile** - Video file upload (required)
- **category** - Select from: Action, Comedy, Halal/Family, Drama, Thriller, Documentary
- **description** - Optional movie description
- **releaseYear** - Optional release year

### Step 7: Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to see your app.

### Step 8: Add Test Movies in Sanity

1. Go to your Sanity Studio (usually at `https://<your-project>.sanity.studio`)
2. Click **"Movie Library"** in the left sidebar
3. Click **Create** → **Movie**
4. Fill in:
   - Title
   - Upload a poster image
   - Upload a video file (.mp4)
   - Select a category
5. Click **Publish**

**Note**: Videos may take a few minutes to process in Sanity's Content Lake.

### Step 9: Google AdSense Setup

1. Sign up for [Google AdSense](https://www.google.com/adsense)
2. Get approved (may take 1-2 weeks)
3. Get your **Publisher ID** (format: `ca-pub-xxxxxxxxxxxxxxxx`)
4. Update `.env.local` with your AdSense ID
5. Update `/public/ads.txt`:
   ```
   google.com, pub-xxxxxxxxxxxxxxxx, DIRECT, f08c47fec0942fa0
   ```

### Step 10: Deploy to Vercel

#### Option A: Using Vercel Dashboard

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click **"New Project"**
4. Import your GitHub repository
5. Add environment variables:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET`
   - `NEXT_PUBLIC_GOOGLE_ADSENSE_ID`
6. Click **Deploy**

#### Option B: Using Vercel CLI

```bash
npm install -g vercel
vercel
```

Follow the prompts and set environment variables when asked.

## 📁 Project Structure

```
streamfree/
├── app/
│   ├── layout.js              # Root layout with AdSense script
│   ├── page.js                # Home page with movie grid
│   ├── watch/
│   │   └── [id]/
│   │       └── page.js        # Video player page
│   └── globals.css            # Global styles
├── lib/
│   └── sanity.js              # Sanity client configuration
├── public/
│   └── ads.txt                # AdSense verification file
├── sanity/
│   └── schemas/
│       └── movie.js           # Movie schema definition
├── .env.example               # Environment template
├── next.config.js             # Next.js configuration
├── tailwind.config.js         # Tailwind CSS configuration
└── package.json               # Dependencies
```

## 🎬 Adding Movies

To add movies to your streaming platform:

1. **Upload Poster Image**:
   - Recommended size: 400x600px
   - Hotspot enabled for mobile optimization

2. **Upload Video File**:
   - Format: MP4 (H.264 codec recommended)
   - Resolution: 720p or 1080p
   - Max file size: 5GB (Sanity limit)

3. **Set Category**:
   - Action, Comedy, Halal/Family, Drama, Thriller, Documentary

4. **Publish**:
   - Click Publish to make the movie live

## 🔧 Troubleshooting

### Videos Not Playing
- Check video format (should be MP4)
- Verify video URL is accessible from Sanity CDN
- Check browser console for CORS errors

### Movies Not Showing on Home Page
- Ensure movies are published in Sanity
- Check environment variables are correct
- Verify Sanity Project ID and Dataset

### AdSense Not Showing Ads
- Ensure Publisher ID is correct
- Check ads.txt is in `/public` directory
- Wait for AdSense approval (1-2 weeks)
- Check browser's ad blocker is not enabled

### Build Errors
- Delete `node_modules` and `.next` folder
- Run `npm install` again
- Check Node.js version (require 18+)

## 📱 Responsive Design

- **Mobile**: 2 columns
- **Tablet**: 3 columns
- **Desktop**: 5 columns

## 🎨 Customization

### Change Colors

Edit `tailwind.config.js`:

```js
colors: {
  neutral: { 950: '#0a0a0a' },
  red: { 600: '#dc2626' }, // Change red accent
}
```

### Change Logo

Replace "STREAMFREE" text in `app/page.js` and `app/watch/[id]/page.js`

### Add More Categories

Edit `sanity/schemas/movie.js`:

```js
options: {
  list: [
    { title: 'Your Category', value: 'your-category' },
  ]
}
```

## 📊 Performance Tips

- Images are optimized via Sanity CDN
- Videos stream from Sanity Content Lake (fast delivery)
- Next.js App Router provides fast navigation
- Static site generation (SSG) for home page

## 🔒 Security & Privacy

- **No Authentication**: Public access (as designed)
- **No User Data**: No cookies or tracking (except AdSense)
- **CORS Configured**: Only allow Vercel domain
- **File Uploads**: Limited to video files in Sanity

## 📞 Support

For issues:
1. Check Sanity documentation: https://www.sanity.io/docs
2. Check Next.js documentation: https://nextjs.org/docs
3. Check Vercel documentation: https://vercel.com/docs

## 📄 License

MIT License - Feel free to use and modify

---

**Happy Streaming! 🎬**

For questions or improvements, reach out to your development team.
