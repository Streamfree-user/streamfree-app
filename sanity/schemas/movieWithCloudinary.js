/**
 * Enhanced Movie Schema with Cloudinary Video Support
 * Supports videos up to 500GB
 * Manual upload via Cloudinary → paste URL into Sanity
 */

export default {
  name: 'movie',
  title: 'Movie Library',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Movie Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
    {
      name: 'poster',
      title: 'Movie Poster (Image)',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'videoFile',
      title: 'Upload Movie (Video File)',
      type: 'file',
      options: {
        accept: 'video/*',
      },
      description: 'For small files (<250MB). For larger files, use Cloudinary URL option below.',
    },
    {
      name: 'cloudinaryVideoUrl',
      title: 'Cloudinary Video URL (For Large Files 1GB+)',
      type: 'string',
      description: 'Paste Cloudinary video URL here. Video source will prioritize this URL over uploaded file.',
      validation: (Rule) =>
        Rule.custom((value) => {
          if (!value) return true;
          if (value.includes('cloudinary.com') && value.includes('video')) {
            return true;
          }
          return 'Must be a valid Cloudinary video URL';
        }),
    },
    {
      name: 'videoSource',
      title: 'Video Source',
      type: 'string',
      options: {
        list: [
          { title: 'Sanity Upload (for small files)', value: 'sanity' },
          { title: 'Cloudinary URL (for large files)', value: 'cloudinary' },
        ],
      },
      initialValue: 'sanity',
      validation: (Rule) => Rule.required(),
      description: 'Select where your video is hosted',
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Action', value: 'action' },
          { title: 'Comedy', value: 'comedy' },
          { title: 'Halal/Family', value: 'halal' },
          { title: 'Drama', value: 'drama' },
          { title: 'Thriller', value: 'thriller' },
          { title: 'Documentary', value: 'documentary' },
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
    },
    {
      name: 'releaseYear',
      title: 'Release Year',
      type: 'number',
    },
    {
      name: 'rating',
      title: 'Rating (IMDb)',
      type: 'number',
      options: {
        list: [
          { title: '⭐ (1)', value: 1 },
          { title: '⭐⭐ (2)', value: 2 },
          { title: '⭐⭐⭐ (3)', value: 3 },
          { title: '⭐⭐⭐⭐ (4)', value: 4 },
          { title: '⭐⭐⭐⭐⭐ (5)', value: 5 },
        ],
      },
    },
    {
      name: 'duration',
      title: 'Duration (in minutes)',
      type: 'number',
    },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'poster',
      category: 'category',
      source: 'videoSource',
    },
    prepare(selection) {
      return {
        title: selection.title,
        media: selection.media,
        subtitle: `${selection.category} • Source: ${selection.source === 'cloudinary' ? '☁️ Cloudinary' : '📁 Sanity'}`,
      };
    },
  },
};
