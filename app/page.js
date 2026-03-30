'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { client } from '@/lib/sanity';

const MOVIES_QUERY = `
  *[_type == "movie"] | order(_createdAt desc) {
    _id,
    title,
    slug,
    category,
    rating,
    "posterUrl": poster.asset->url,
    "videoUrl": videoFile.asset->url,
    cloudinaryVideoUrl,
    videoSource,
    _createdAt
  }
`;

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [featured, setFeatured] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await client.fetch(MOVIES_QUERY);
        setMovies(data);
        if (data.length > 0) {
          setFeatured(data[0]);
        }
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="bg-neutral-950 text-white min-h-screen font-sans selection:bg-red-600">
      {/* 1. Header & Ads */}
      <nav className="flex items-center justify-between p-6 bg-black/80 backdrop-blur-md sticky top-0 z-50">
        <h1 className="text-3xl font-black text-red-600 tracking-tighter">STREAMFREE</h1>
        
        {/* Google Ads Placeholder - Top Banner */}
        <div className="hidden md:block w-72 h-10 bg-neutral-800 border border-neutral-700 text-[10px] text-center pt-2 text-neutral-500">
          <ins className="adsbygoogle" style={{ display: 'block', width: '300px', height: '40px' }} data-ad-client={process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID} data-ad-slot="1234567890" data-ad-format="horizontal"></ins>
          {typeof window !== 'undefined' && (window.adsbygoogle = window.adsbygoogle || []).push({})}
        </div>
      </nav>

      {/* 2. Hero Section */}
      {featured && (
        <section 
          className="relative h-[70vh] flex items-end p-8 bg-gradient-to-t from-neutral-950 to-transparent bg-cover bg-center"
          style={{
            backgroundImage: featured.posterUrl ? `url(${featured.posterUrl})` : 'none',
            backgroundBlendMode: 'overlay',
          }}
        >
          <div className="max-w-3xl space-y-4">
            <span className="bg-red-600 px-2 py-1 text-xs font-bold rounded inline-block">NEW RELEASE</span>
            <h2 className="text-5xl md:text-7xl font-bold">{featured.title}</h2>
            <p className="text-neutral-300 text-lg">Experience high-quality streaming directly in your browser. No sign-ups. No fees.</p>
            <Link href={`/watch/${featured._id}`}>
              <button className="bg-white text-black px-8 py-3 rounded-full font-bold hover:scale-105 transition">
                Watch Now ▶
              </button>
            </Link>
          </div>
        </section>
      )}

      {/* 3. Movie Grid */}
      <main className="p-8">
        <h3 className="text-2xl font-bold mb-8 border-l-4 border-red-600 pl-4">Recently Added</h3>
        
        {loading ? (
          <div className="flex justify-center items-center h-96">
            <p className="text-neutral-400 text-lg">Loading movies...</p>
          </div>
        ) : movies.length === 0 ? (
          <div className="flex justify-center items-center h-96">
            <p className="text-neutral-400 text-lg">No movies found. Add some movies in Sanity Admin.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {movies.map((movie) => (
              <Link key={movie._id} href={`/watch/${movie._id}`}>
                <div className="group cursor-pointer">
                  <div className="relative aspect-[2/3] overflow-hidden rounded-xl bg-neutral-900 shadow-2xl transition-transform duration-300 group-hover:scale-95">
                    {movie.posterUrl ? (
                      <img 
                        src={movie.posterUrl} 
                        alt={movie.title}
                        className="w-full h-full object-cover transition-opacity"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-neutral-800 to-neutral-900">
                        <span className="text-neutral-500 text-center px-4">{movie.title}</span>
                      </div>
                    )}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/40 transition-opacity duration-300">
                      <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-xl">▶</div>
                    </div>
                  </div>
                  <p className="mt-3 font-medium text-sm text-neutral-300 truncate">{movie.title}</p>
                  <div className="flex items-center justify-between mt-1">
                    {movie.category && (
                      <p className="text-xs text-neutral-500 capitalize">{movie.category}</p>
                    )}
                    {movie.rating && (
                      <p className="text-xs text-yellow-400">{'⭐'.repeat(Math.round(movie.rating))}</p>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>

      {/* 4. Bottom Ad Space */}
      <footer className="p-10 flex justify-center border-t border-neutral-900">
        <div className="w-full max-w-4xl flex justify-center">
          <ins className="adsbygoogle" style={{ display: 'block', width: '728px', height: '90px' }} data-ad-client={process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID} data-ad-slot="0987654321" data-ad-format="horizontal"></ins>
          {typeof window !== 'undefined' && (window.adsbygoogle = window.adsbygoogle || []).push({})}
        </div>
      </footer>
    </div>
  );
}
