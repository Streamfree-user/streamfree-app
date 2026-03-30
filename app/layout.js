import './globals.css';

export const metadata = {
  title: 'STREAMFREE - Free Movie Streaming',
  description: 'Watch unlimited movies for free. No sign-ups. No fees. Direct streaming to your browser.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }) {
  const adSenseId = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID;

  return (
    <html lang="en">
      <head>
        {adSenseId && (
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adSenseId}`}
            crossOrigin="anonymous"
          />
        )}
      </head>
      <body className="bg-neutral-950 text-white font-sans antialiased selection:bg-red-600">
        {children}
      </body>
    </html>
  );
}
