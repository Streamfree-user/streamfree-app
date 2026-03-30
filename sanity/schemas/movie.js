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
      validation: (Rule) => Rule.required(),
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
  ],
  preview: {
    select: {
      title: 'title',
      media: 'poster',
      category: 'category',
    },
    prepare(selection) {
      return {
        title: selection.title,
        media: selection.media,
        subtitle: selection.category,
      };
    },
  },
};
