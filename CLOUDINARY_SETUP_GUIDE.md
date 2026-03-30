# 🎬 StreamFree: Cloudinary Integration Guide

## 📋 Overview

This guide explains how to set up **Cloudinary** for uploading large video files (1GB+) to your StreamFree app. Cloudinary provides:
- ✅ Support for videos up to 500GB
- ✅ Free tier: 25GB storage
- ✅ Automatic video optimization & adaptive streaming
- ✅ Fast CDN delivery worldwide
- ✅ Easy integration with Sanity.io

---

## 🚀 Step 1: Create Cloudinary Account (5 minutes)

1. Go to: https://cloudinary.com/users/register/free
2. Sign up with your email: `omunakuwekampala@gmail.com`
3. Verify your email
4. Log in to Dashboard: https://console.cloudinary.com/

---

## 📁 Step 2: Get Your Cloudinary URL

Once logged in:
1. Click on **Settings** ⚙️
2. Go to **Account** tab
3. Copy your **Cloud Name** (looks like: `dxxxxxxxx`)
   - Example: `dm4xyzabc`
4. Keep this for later

---

## 📤 Step 3: Upload Videos to Cloudinary

### Option A: Web Upload (Easy)
1. In Cloudinary Dashboard, click **Media Library**
2. Click **Upload** button
3. Drag & drop your video file (up to 1GB or larger)
4. After upload completes, click the video to view it
5. In the **Details** panel, copy the **URL** (looks like):
   ```
   https://res.cloudinary.com/YOUR_CLOUD_NAME/video/upload/v1234567890/video_name.mp4
   ```

### Option B: Programmatic Upload (Advanced)
Use cURL or Python script to upload directly from terminal:

```bash
curl -F "file=@/path/to/video.mp4" \
  -F "resource_type=video" \
  https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/video/upload
```

---

## 🎯 Step 4: Add Video to StreamFree

1. Go to your **Sanity Admin Panel**:
   - URL: https://manage.sanity.io (then select your project)
   - OR use the new web console directly
2. Create a new **Movie**:
   - **Title**: Movie name
   - **Poster**: Upload movie poster image
   - **Category**: Select category
   - **Video Source**: Select "Cloudinary URL (for large files)"
   - **Cloudinary Video URL**: Paste the URL from Step 3.5
   - Click **Publish**

3. **Instantly** appears on your app! 🎉

---

## 🎥 Step 5: Video Compression Guide (Optional but Recommended)

For better performance, compress videos before uploading:

### Using FFmpeg (Best)

```bash
ffmpeg -i input_video.mp4 -vcodec libx264 -crf 23 -preset medium \
  -acodec aac -b:a 128k output_compressed.mp4
```

**Explanation:**
- `-crf 23`: Quality (0-51, lower = better. 23 is balanced)
- `-preset medium`: Speed (fast/medium/slow)
- `-b:a 128k`: Audio bitrate (128k is good)

### Using HandBrake (GUI - Easy)
1. Download: https://handbrake.fr/
2. Open your video
3. Preset: **Fast 1080p30** (pre-configured)
4. Click **Start Encode**
5. Output will be 30-50% smaller

### Expected Results:
- **Original:** 2GB (2-hour 4K movie)
- **Compressed:** 400-600MB (1080p quality)
- **Compression time:** 30-60 minutes (depending on video length)

---

## 📊 Cloudinary Video Optimization Features

Once uploaded, Cloudinary automatically:
- ✅ Creates adaptive bitrate versions (480p, 720p, 1080p)
- ✅ Optimizes for mobile vs desktop
- ✅ Generates thumbnails
- ✅ Delivers via CDN for fast loading

**Your videos play instantly worldwide!** 🌍

---

## 🔐 Security: Protect Uploads

To prevent unauthorized uploads to your Cloudinary account:

1. In Cloudinary Dashboard → **Settings** → **Upload**
2. Scroll to **Upload presets**
3. Create a new preset with:
   - Name: `streamfree_videos`
   - Type: **Unsigned** (for web uploads)
   - Allowed formats: `mp4, webm, mkv`
   - Max file size: `1GB` (or as needed)

---

## 🎬 Advanced: Direct Integration (API)

For automated uploads, create an API integration:

**Upload to Cloudinary via API:**
```bash
curl -F "file=@/path/to/video.mp4" \
  -F "cloud_name=YOUR_CLOUD_NAME" \
  -F "upload_preset=streamfree_videos" \
  https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/video/upload
```

---

## 📱 Usage in StreamFree

In Sanity, when you select "Cloudinary URL" as video source:
1. Paste Cloudinary video URL
2. App automatically detects it
3. Player streams from Cloudinary CDN
4. Supports adaptive streaming (auto quality based on connection)

---

## 💰 Cloudinary Pricing

- **Free Tier:** 25GB storage, 25GB bandwidth/month
- **Paid:** $99/month + overage (25GB-150GB storage)
- **Enterprise:** Custom pricing

**StreamFree on free tier can store ~15-20 full-length movies!**

---

## 🆘 Troubleshooting

### Video URL not working
- ✅ Check URL format includes `cloudinary.com`
- ✅ Verify video is public (not restricted)
- ✅ Copy full URL including `v1234567890` timestamp

### Upload fails
- ✅ File format supported? (mp4, webm, mkv, avi, mov)
- ✅ File size under limit?
- ✅ Check your internet connection

### Poor video quality on app
- ✅ Try lower bitrate compression before uploading
- ✅ Cloudinary will auto-optimize delivery

---

## 📚 Quick Reference

| Task | How To |
|------|--------|
| Create account | https://cloudinary.com/users/register/free |
| Upload video | Cloudinary Dashboard → Media Library → Upload |
| Get video URL | Click video → Copy URL from Details |
| Add to StreamFree | Sanity → Create Movie → Paste URL → Publish |
| Compress video | Use FFmpeg or HandBrake (see above) |
| Manage videos | https://console.cloudinary.com/media_library |

---

## ✨ You're All Set!

Your StreamFree app now supports:
- ✅ Small files: Upload directly to Sanity (<250MB)
- ✅ Large files: Upload to Cloudinary, paste URL
- ✅ Huge files: Compress with FFmpeg, then upload to Cloudinary
- ✅ Global delivery via Cloudinary CDN

**Happy streaming!** 🎬🍿
