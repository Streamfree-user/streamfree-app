'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function UploadPage() {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [loadingPassword, setLoadingPassword] = useState(true);

  // Fetch admin password from Sanity
  useEffect(() => {
    const fetchPassword = async () => {
      try {
        const res = await fetch('/api/admin/settings');
        if (res.ok) {
          const data = await res.json();
          setAdminPassword(data.adminPassword);
        }
      } catch (err) {
        console.error('Error fetching password:', err);
      } finally {
        setLoadingPassword(false);
      }
    };
    fetchPassword();
  }, []);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'action',
    rating: 5,
    duration: 0,
    releaseYear: new Date().getFullYear(),
    videoSource: 'sanity',
    cloudinaryUrl: '',
  });

  const [file, setFile] = useState(null);
  const [fileSize, setFileSize] = useState(0);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [posterFile, setPosterFile] = useState(null);

  // Handle Password
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (password === adminPassword) {
      setAuthenticated(true);
      setPasswordError('');
    } else {
      setPasswordError('❌ Incorrect password');
      setPassword('');
    }
  };

  // Handle Input Changes
  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'number' ? parseInt(value) : value,
    });
  };

  // Handle File Selection
  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileSize(selectedFile.size);

      // Auto-suggest upload method based on file size
      const sizeMB = (selectedFile.size / (1024 * 1024)).toFixed(1);
      if (selectedFile.size > 1024 * 1024 * 1024) {
        setFormData({ ...formData, videoSource: 'cloudinary' });
        setMessage(`⚠️ File is ${sizeMB}MB (exceeds 1GB limit). Please upload to Cloudinary first and paste the URL.`);
      } else {
        setFormData({ ...formData, videoSource: 'sanity' });
        setMessage(`✅ File is ${sizeMB}MB. Ready to upload directly to Sanity (up to 1GB)!`);
      }
    }
  };

  const handlePosterSelect = (e) => {
    setPosterFile(e.target.files[0]);
  };

  // Handle Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      // Validate required fields
      if (!formData.title) {
        throw new Error('Movie title is required');
      }
      if (!posterFile) {
        throw new Error('Poster image is required');
      }
      if (!file) {
        throw new Error('Video file is required');
      }
      
      // Auto-determine video source based on file size
      let uploadSource = 'sanity';
      if (file.size > 1024 * 1024 * 1024) { // 1GB limit
        uploadSource = 'cloudinary';
        if (!formData.cloudinaryUrl) {
          throw new Error('For files larger than 1GB, please upload to Cloudinary first and paste the URL');
        }
      }

      // Create FormData for file upload
      const uploadFormData = new FormData();
      uploadFormData.append('title', formData.title);
      uploadFormData.append('description', formData.description);
      uploadFormData.append('category', formData.category);
      uploadFormData.append('rating', formData.rating);
      uploadFormData.append('duration', formData.duration);
      uploadFormData.append('releaseYear', formData.releaseYear);
      uploadFormData.append('videoSource', uploadSource);
      uploadFormData.append('cloudinaryUrl', formData.cloudinaryUrl);
      uploadFormData.append('posterFile', posterFile);

      if (uploadSource === 'sanity') {
        uploadFormData.append('videoFile', file);
      }

      // Submit to API
      const response = await fetch('/api/movies/upload', {
        method: 'POST',
        body: uploadFormData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Upload failed');
      }

      setMessage(`✅ ${formData.title} uploaded successfully! Redirecting...`);
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        category: 'action',
        rating: 5,
        duration: 0,
        releaseYear: new Date().getFullYear(),
        videoSource: 'sanity',
        cloudinaryUrl: '',
      });
      setFile(null);
      setPosterFile(null);

      // Redirect to home after 2 seconds
      setTimeout(() => {
        router.push('/');
      }, 2000);
    } catch (error) {
      setMessage(`❌ Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Password Login Screen
  if (!authenticated) {
    if (loadingPassword) {
      return (
        <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-4">
          <div className="text-white">Loading...</div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-neutral-900 rounded-lg border border-red-600 p-8">
          <h1 className="text-3xl font-bold text-red-600 mb-2">StreamFree</h1>
          <p className="text-neutral-400 mb-8">Admin Upload Portal</p>

          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter upload password"
                className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-red-600"
                autoFocus
              />
              {passwordError && (
                <p className="text-red-500 text-sm mt-2">{passwordError}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 rounded-lg transition"
            >
              Access Upload Panel
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Upload Form Screen
  return (
    <div className="min-h-screen bg-neutral-950 p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">📽️ Upload Movie</h1>
          <p className="text-neutral-400">Add a new movie to StreamFree</p>
        </div>

        {/* Message */}
        {message && (
          <div className={`mb-6 p-4 rounded-lg ${
            message.includes('✅') 
              ? 'bg-green-900/20 border border-green-600 text-green-400'
              : message.includes('⚠️')
              ? 'bg-yellow-900/20 border border-yellow-600 text-yellow-400'
              : 'bg-red-900/20 border border-red-600 text-red-400'
          }`}>
            {message}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-neutral-900 rounded-lg border border-neutral-800 p-6 space-y-6">
          
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Movie Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="e.g., Inception"
              className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-red-600"
              required
            />
          </div>

          {/* Poster */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Movie Poster (Image) *
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handlePosterSelect}
              className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-red-600 file:bg-red-600 file:text-white file:border-0 file:rounded file:px-3 file:py-1 file:cursor-pointer"
              required
            />
            {posterFile && (
              <p className="text-green-400 text-sm mt-2">✅ {posterFile.name}</p>
            )}
          </div>

          {/* Video File Selection - Always Show */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Video File *
            </label>
            <input
              type="file"
              accept="video/*"
              onChange={handleFileSelect}
              className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-red-600 file:bg-red-600 file:text-white file:border-0 file:rounded file:px-3 file:py-1 file:cursor-pointer"
              required
            />
            {file && (
              <div className="mt-3">
                <p className="text-neutral-400 text-sm">
                  📹 {file.name} ({(fileSize / (1024 * 1024)).toFixed(2)} MB)
                </p>
                {fileSize > 1024 * 1024 * 1024 && (
                  <div className="mt-3 p-3 bg-yellow-900/20 border border-yellow-600 rounded text-yellow-400 text-sm">
                    <p className="font-medium">⚠️ Large File Detected!</p>
                    <p className="mt-1">Your file is larger than 1GB. You'll need to:</p>
                    <ol className="list-decimal ml-5 mt-2 space-y-1">
                      <li>Create a free Cloudinary account at cloudinary.com</li>
                      <li>Upload this video there</li>
                      <li>Copy the video URL and paste it in the Cloudinary URL field below</li>
                    </ol>
                  </div>
                )}
                {fileSize <= 1024 * 1024 * 1024 && (
                  <p className="text-green-400 text-sm mt-2">✅ File size is perfect for direct upload to Sanity!</p>
                )}
              </div>
            )}
          </div>

          {/* Cloudinary URL - Show only for large files */}
          {file && fileSize > 1024 * 1024 * 1024 && (
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Cloudinary Video URL *
              </label>
              <input
                type="url"
                name="cloudinaryUrl"
                value={formData.cloudinaryUrl}
                onChange={handleInputChange}
                placeholder="https://res.cloudinary.com/..."
                className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-red-600"
                required={file && fileSize > 1024 * 1024 * 1024}
              />
              <p className="text-neutral-400 text-xs mt-2">
                Paste the complete Cloudinary video URL (should include /video/ in the path)
              </p>
            </div>
          )}

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Movie plot, synopsis..."
              rows="4"
              className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-red-600"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-red-600"
            >
              <option value="action">🎬 Action</option>
              <option value="comedy">😂 Comedy</option>
              <option value="drama">🎭 Drama</option>
              <option value="thriller">😨 Thriller</option>
              <option value="halal">👨‍👩‍👧‍👦 Halal/Family</option>
              <option value="documentary">📺 Documentary</option>
              <option value="vj">🎤 VJ (Luganda)</option>
              <option value="horror">👻 Horror</option>
              <option value="romance">💕 Romance</option>
              <option value="animation">🎨 Animation</option>
              <option value="scifi">🚀 Sci-Fi</option>
              <option value="anime">⛩️ Anime</option>
              <option value="sports">⚽ Sports</option>
              <option value="kids">🎪 Kids</option>
              <option value="adventure">🏔️ Adventure</option>
              <option value="fantasy">✨ Fantasy</option>
            </select>
          </div>

          {/* Grid for Rating, Duration, Year */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Rating (⭐)
              </label>
              <select
                name="rating"
                value={formData.rating}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-red-600"
              >
                <option value="1">⭐ 1</option>
                <option value="2">⭐⭐ 2</option>
                <option value="3">⭐⭐⭐ 3</option>
                <option value="4">⭐⭐⭐⭐ 4</option>
                <option value="5">⭐⭐⭐⭐⭐ 5</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Duration (min)
              </label>
              <input
                type="number"
                name="duration"
                value={formData.duration}
                onChange={handleInputChange}
                placeholder="120"
                className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-red-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Release Year
              </label>
              <input
                type="number"
                name="releaseYear"
                value={formData.releaseYear}
                onChange={handleInputChange}
                placeholder="2024"
                className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-red-600"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 disabled:bg-neutral-600 text-white font-bold py-3 rounded-lg transition"
          >
            {loading ? '⏳ Uploading...' : '📤 Upload Movie'}
          </button>
        </form>

        {/* Admin Links */}
        <div className="mt-4 flex gap-4">
          <button
            onClick={() => {
              setAuthenticated(false);
              setPassword('');
            }}
            className="text-neutral-400 hover:text-white text-sm transition"
          >
            ← Logout
          </button>
          <a href="/admin" className="text-red-600 hover:text-red-500 text-sm transition">
            ⚙️ Admin Settings
          </a>
        </div>
      </div>
    </div>
  );
}
