import { createClient } from '@sanity/client';

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: true,
  apiVersion: '2025-01-01',
});

// Helper function to get image URL
export function urlForImage(source) {
  if (!source) return null;
  return source;
}

// Helper function to get video URL
export function urlForVideo(videoFile) {
  if (!videoFile) return null;
  return videoFile.asset.url;
}
