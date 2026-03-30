'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { client } from '@/lib/sanity';

const MOVIE_QUERY = `
  *[_type == "movie" && _id == $movieId][0] {
    _id,
    title,
    category,
    "posterUrl": poster.asset->url,
    "videoUrl": videoFile.asset->url,
    _createdAt
  }
`;

export default function WatchPage() {
  const params = useParams();
  const movieId = params.id;
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const data = await client.fetch(MOVIE_QUERY, { movieId });
        if (!data) {
          setError('Movie not found');
        } else {
          setMovie(data);
        }
      } catch (err) {
        console.error('Error fetching movie:', err);
        setError('Failed to load movie');
      } finally {
        setLoading(false);
      }
    };

    if (movieId) {
      fetchMovie();
    }
  }, [movieId]);

  if (loading) {
    return (
      <div className="bg-neutral-950 text-white min-h-screen flex items-center justify-center">
        <p className="text-lg text-neutral-400">Loading movie...</p>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="bg-neutral-950 text-white min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-lg text-red-600">{error || 'Movie not found'}</p>
        <Link href="/">
          <button className="bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700 transition">
            Back to Home
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-neutral-950 text-white min-h-screen">
      {/* Header */}
      <nav className="flex items-center justify-between p-6 bg-black/80 backdrop-blur-md sticky top-0 z-50">
        <Link href="/">
          <h1 className="text-3xl font-black text-red-600 tracking-tighter cursor-pointer hover:scale-105 transition">
            STREAMFREE
          </h1>
        </Link>
      </nav>

      {/* Video Player Section */}
      <section className="w-full bg-black">
        <div className="w-full aspect-video flex items-center justify-center bg-neutral-900">
          {movie.videoUrl ? (
            <video
              key={movie.videoUrl}
              className="w-full h-full"
              controls
              autoPlay
              muted
              crossOrigin="anonymous"
              style={{ backgroundColor: '#000' }}
            >
              <source src={movie.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <div className="flex items-center justify-center text-neutral-500">
              <p>No video available</p>
            </div>
          )}
        </div>
      </section>

      {/* Movie Info */}
      <section className="p-8 max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-5xl font-bold mb-4">{movie.title}</h1>
          
          <div className="flex items-center gap-4 mb-4">
            {movie.category && (
              <span className="bg-red-600 px-3 py-1 rounded-full text-sm font-semibold capitalize">
                {movie.category}
              </span>
            )}
            <p className="text-neutral-400 text-sm">
              Released: {new Date(movie._createdAt).toLocaleDateString()}
            </p>
          </div>

          <p className="text-neutral-300 text-lg leading-relaxed">
            Enjoy this movie in high-quality, ad-supported streaming. No sign-ups required!
          </p>
        </div>

        {/* Ad Space */}
        <div className="my-8 p-6 border border-neutral-800 rounded-lg flex justify-center">
          <ins 
            className="adsbygoogle" 
            style={{ display: 'block', width: '728px', height: '90px' }} 
            data-ad-client={process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID}
            data-ad-slot="1122334455"
            data-ad-format="horizontal"
          />
          {typeof window !== 'undefined' && (window.adsbygoogle = window.adsbygoogle || []).push({})}
        </div>

        {/* Back Button */}
        <Link href="/">
          <button className="mt-8 bg-red-600 text-white px-8 py-3 rounded-full font-bold hover:bg-red-700 transition">
            ← Back to Home
          </button>
        </Link>
      </section>

      {/* Footer */}
      <footer className="mt-16 p-8 border-t border-neutral-900 text-center text-neutral-500">
        <p>&copy; 2025 STREAMFREE. All rights reserved. No login required.</p>
      </footer>
    </div>
  );
}
