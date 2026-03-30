# 🔧 StreamFree Admin Panel - Complete Guide

## 📊 Your Admin Links

### ✅ **Sanity Admin Console (Main - RECOMMENDED)**
**URL:** https://manage.sanity.io

**Steps:**
1. Go to https://manage.sanity.io
2. Sign in with your email: `omunakuwekampala@gmail.com`
3. Password: Your Sanity password
4. Click on **StreamFree** project
5. You're in! 🎉

---

## 🎯 Adding Your First Movie

### **Step 1: Go to Sanity Admin**
https://manage.sanity.io → Select **StreamFree** project

### **Step 2: Create New Movie**
1. Click **+ Create** button (top-left)
2. Select **Movie** from the list
3. Fill in the form:

**Required Fields:**
- **Movie Title:** e.g., "The Matrix"
- **Poster (Image):** Upload movie poster image
  - Click "Upload"
  - Select image file
  - Enable hotspot for better cropping
- **Category:** Select from dropdown (Action, Comedy, Halal/Family, Drama, Thriller, Documentary)
- **Video Source:** Choose one:
  - "Sanity Upload" (for small files <250MB)
  - "Cloudinary URL" (for large files 1GB+)

### **Step 3: Add Video**

#### **Option A: Small File (Sanity Upload)**
If your video is **under 250MB**:
1. In **Upload Movie (Video File)** field
2. Click **Upload**
3. Select your .mp4 video file
4. Wait for upload to complete ✅

#### **Option B: Large File (Cloudinary - 1GB+)**
If your video is **over 250MB**:
1. Upload to Cloudinary first:
   - Go to https://console.cloudinary.com/
   - Click **Media Library** → **Upload**
   - Drag & drop your video (up to 500GB!)
   - Wait for upload to complete
   - Copy the video URL
2. Back in Sanity:
   - Select **"Cloudinary URL (for large files)"** in Video Source
   - Paste your Cloudinary URL in **Cloudinary Video URL** field
   - Paste example: `https://res.cloudinary.com/YOUR_CLOUD_NAME/video/upload/v1234567890/video.mp4`

### **Step 4: Optional Metadata**
Add extra details (all optional):
- **Description:** About the movie
- **Release Year:** Year published
- **Duration:** Length in minutes (e.g., 120)
- **Rating:** Star rating 1-5 ⭐

### **Step 5: Publish**
1. Click **Publish** button (bottom-right)
2. Confirm: "Yes, publish it"
3. ✅ Done! Movie appears on your app instantly

---

## 🎬 Example: Complete Movie Entry

```
Title:              The Shawshank Redemption
Category:           Drama
Description:        A prisoner and a banker form a bond
Release Year:       1994
Duration:           142
Rating:             5 (⭐⭐⭐⭐⭐)
Poster:             [Image of movie poster]
Video Source:       Cloudinary URL (large file)
Cloudinary URL:     https://res.cloudinary.com/dxxxxx/video/upload/v1234567890/shawshank.mp4
```

---

## 🚀 Quick Workflow for Adding Movies

### **For Small Movies (Sanity Upload)**
```
1. Open Sanity (https://manage.sanity.io)
2. Click + Create → Movie
3. Enter title, upload poster
4. Select "Sanity Upload" as video source
5. Upload video file directly
6. Click Publish
⏱️ Total Time: 3-5 minutes
```

### **For Large Movies (Cloudinary + Sanity)**
```
1. Upload video to Cloudinary (https://console.cloudinary.com/)
   - Click Media Library → Upload
   - Drag & drop your 1GB+ video
   - Copy the URL
2. Open Sanity (https://manage.sanity.io)
3. Click + Create → Movie
4. Enter title, upload poster
5. Select "Cloudinary URL" as video source
6. Paste Cloudinary URL
7. Click Publish
⏱️ Total Time: ~20 minutes (mostly upload time)
```

### **For Very Large Movies (Compress First)**
```
1. Compress video (optional, see COMPRESSION_GUIDE.md)
   - Original: 2GB → Compressed: 500MB
   - Command: ffmpeg -i input.mp4 -vcodec libx264 -crf 23 ...
   - Tool: HandBrake (https://handbrake.fr/)
2. Upload compressed video to Cloudinary
3. Create movie in Sanity with Cloudinary URL
4. Click Publish
⏱️ Total Time: 30-60 minutes (includes compression)
```

---

## 🌐 Managing Your Movies

### **Edit Existing Movie**
1. In Sanity, find the movie
2. Click on it
3. Edit any field
4. Click **Publish** to save changes
5. Changes appear on app instantly! 🚀

### **Delete a Movie**
1. Click on the movie
2. Click **Delete** button (⚠️ careful!)
3. Confirm deletion
4. Removed from your app immediately

### **View Your Movies**
1. In Sanity Dashboard
2. You see a list of all movies
3. Status shows: **Published** or **Draft**
4. Filter/search by title

---

## 🎥 Video Source Comparison

| Feature | Sanity Upload | Cloudinary URL |
|---------|---------------|-----------------|
| Max file size | 250MB | 500GB+ |
| Upload method | Direct to Sanity | Upload to Cloudinary, paste URL |
| Free limit | 50GB/month | 25GB storage |
| Speed | Instant | Optimized for streaming |
| Compression | None | Auto optimizes |
| CDN | Sanity CDN | Cloudinary CDN (faster) |
| Best for | Small files | Large movies, 4K |

**Recommendation:** Use Sanity for trailers (< 250MB), Cloudinary for full movies (1GB+)

---

## 🆘 Troubleshooting

### "Movie not appearing on app"
- ✅ Make sure it's **Published** (not Draft)
- ✅ Check category is selected
- ✅ Refresh app (F5)
- ✅ Check video source is correct (Sanity or Cloudinary)

### "Video won't play on app"
- ✅ Check video file format (should be .mp4)
- ✅ For Cloudinary: Verify URL is correct
- ✅ For Sanity upload: Make sure upload completed
- ✅ Test video on your computer first

### "Upload to Sanity fails"
- ✅ File size under 250MB?
- ✅ Format is .mp4?
- ✅ Internet connection stable?
- ✅ Try uploading to Cloudinary instead

### "Can't find Sanity admin"
- ✅ Go to: https://manage.sanity.io
- ✅ Sign in with: `omunakuwekampala@gmail.com`
- ✅ Select: **StreamFree** project

### "Cloudinary upload taking too long"
- ✅ Normal for large files (1-2 hours for 1GB)
- ✅ Don't close the browser tab
- ✅ Check progress in Cloudinary Media Library
- ✅ Consider compressing video first (see guide)

---

## 📚 Three-Step Movie Addition Cheat Sheet

| Step | Action | Where |
|------|--------|-------|
| 1️⃣ Prepare | Compress video (optional) | HandBrake or FFmpeg |
| 2️⃣ Upload | Upload to Cloudinary OR Sanity | https://console.cloudinary.com or https://manage.sanity.io |
| 3️⃣ Create | Create movie entry with video URL/file | https://manage.sanity.io |

---

## 🔐 Security Notes

- **Keep your Sanity password safe** (don't share)
- **Cloudinary API key** is private
- **Share only the public app link** with viewers
- No login required for viewers (as designed)

---

## 📞 Need Help?

- **Sanity Docs:** https://www.sanity.io/docs/
- **Cloudinary Docs:** https://cloudinary.com/documentation
- **Video Formats:** MP4, WebM, MKV, AVI
- **Poster Formats:** JPG, PNG (16:9 aspect ratio recommended)

---

**You're all set! Start adding movies and building your streaming empire! 🚀🎬**
