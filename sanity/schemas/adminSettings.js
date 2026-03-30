export default {
  name: 'adminSettings',
  title: 'Admin Settings',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      initialValue: 'StreamFree Admin',
      readOnly: true,
    },
    {
      name: 'adminPassword',
      title: 'Admin Password',
      type: 'string',
      description: 'Password required to access the upload page',
      validation: (Rule) => Rule.required().min(6),
    },
    {
      name: 'siteOwner',
      title: 'Site Owner Name',
      type: 'string',
      description: 'Your name - displayed in admin panel',
    },
    {
      name: 'siteDescription',
      title: 'Site Description',
      type: 'string',
      description: 'Brief description of your streaming service',
    },
    {
      name: 'totalUploads',
      title: 'Total Movies Uploaded',
      type: 'number',
      readOnly: true,
      initialValue: 0,
    },
    {
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      readOnly: true,
    },
  ],
}
