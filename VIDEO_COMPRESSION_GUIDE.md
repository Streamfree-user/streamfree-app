# 🎬 Video Compression Quick Guide

## 💡 Why Compress Videos?

- **Original 2-hour movie:** ~2-4GB
- **Compressed 2-hour movie:** ~300-600MB
- **Upload time:** Reduced from 1+ hour to 10-20 minutes
- **Streaming quality:** Still looks great! (1080p)

---

## ⚡ Quick Start (Pick One)

### 🔧 Option 1: FFmpeg (Command Line - Advanced)

**Install:**
```bash
# macOS
brew install ffmpeg

# Ubuntu/Linux
sudo apt install ffmpeg

# Windows
# Download from https://ffmpeg.org/download.html
```

**Compress:**
```bash
ffmpeg -i input_movie.mp4 -vcodec libx264 -crf 23 -preset medium \
  -acodec aac -b:a 128k output_compressed.mp4
```

**Time:** 30-60 minutes for 2-hour video

---

### 🖱️ Option 2: HandBrake (GUI - Easiest)

1. **Download:** https://handbrake.fr/
2. **Open** HandBrake
3. **Select video file**
4. **Preset:** Click "Fast 1080p30"
5. **Output folder:** Choose where to save
6. **Start Encode** button
7. ✅ Done! (takes 20-40 minutes)

**Result:** ~40-50% smaller, same quality

---

### 📱 Option 3: Online Tools (Easiest but Slow)
- https://www.freeconvert.com/video-compressor
- Upload your video → select quality → download

⚠️ **Limitation:** Usually max 500MB-1GB files

---

## 📊 Recommended Settings by Device

### For Tablets/Mobile (100-300MB)
```bash
ffmpeg -i input.mp4 -vcodec libx264 -crf 28 -s 1280x720 \
  -acodec aac -b:a 96k output.mp4
```

### For Desktop/Smart TV (300-700MB)
```bash
ffmpeg -i input.mp4 -vcodec libx264 -crf 23 -preset medium \
  -acodec aac -b:a 128k output.mp4
```

### For 4K Archival (500MB-2GB)
```bash
ffmpeg -i input.mp4 -vcodec libx264 -crf 18 -preset slow \
  -acodec aac -b:a 192k output.mp4
```

---

## 🎯 Quality vs File Size

| CRF | Quality | File Size (2h movie) |
|-----|---------|---------------------|
| 18 | High (Best) | 1-1.5GB |
| 23 | Medium (Recommended) | 400-600MB |
| 28 | Lower | 200-400MB |

**CRF 23 is the sweet spot for streaming!**

---

## 🔄 Batch Compress (Multiple Files)

### macOS/Linux:
```bash
for file in *.mp4; do
  ffmpeg -i "$file" -vcodec libx264 -crf 23 -preset medium \
    -acodec aac -b:a 128k "compressed_${file}"
done
```

### Windows (PowerShell):
```powershell
Get-ChildItem *.mp4 | ForEach-Object {
  ffmpeg -i $_.Name -vcodec libx264 -crf 23 -preset medium `
    -acodec aac -b:a 128k "compressed_$($_.Name)"
}
```

---

## ✅ Checklist Before Upload

- [ ] Video compressed (under 1GB)
- [ ] Audio sounds clear
- [ ] Video plays without stuttering (test on your device)
- [ ] File format: MP4 (h264 codec)
- [ ] Resolution: 1080p or higher recommended
- [ ] Ready to upload to Cloudinary!

---

## 🚀 After Compression: Upload to Cloudinary

1. Compressed video ready ✅
2. Go to https://console.cloudinary.com/
3. Click **Media Library** → **Upload**
4. Drag & drop your compressed video
5. Copy the URL
6. Paste into StreamFree Sanity → Publish
7. **Instantly available on your app!** 🎬

---

## 🆘 Troubleshooting

### "No output file generated"
- Check if ffmpeg is installed: `ffmpeg -version`
- Verify input file exists and is correct format

### "Output is very large still"
- Lower CRF value (try 26 or 28)
- Reduce resolution: `-s 1280x720`

### "Video won't play after compression"
- Check codec: `ffmpeg -i output.mp4` (should show h264)
- Try different preset: `-preset slow` for better quality

---

## 📚 Learn More
- FFmpeg Guide: https://ffmpeg.org/documentation.html
- HandBrake Help: https://handbrake.fr/docs/
- Video Codecs: https://www.techsmith.com/blog/codecs/

---

**Happy compressing! 🎥✨**
