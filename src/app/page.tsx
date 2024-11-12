'use client'

import { useState } from 'react';

export default function Home() {
  const [url, setUrl] = useState('');
  const [alias, setAlias] = useState('');
  const [message, setMessage] = useState('');
  const [shortUrl, setShortUrl] = useState('');

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/shorten', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, alias }),
      });
      const data = await res.json();
      if (res.ok) {
        setShortUrl(`${window.location.origin}/${alias}`);
        setMessage('');
      } else {
        setMessage(data.error);
        setShortUrl('');
      }
    } catch {
      setMessage('An error occurred');
      setShortUrl('');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">URL Shortener</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Enter URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
          />
          <input
            type="text"
            placeholder="Enter Alias"
            value={alias}
            onChange={(e) => setAlias(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
          />
          <button 
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Shorten
          </button>
        </form>

        {message && (
          <p className="text-red-500 text-center mt-4">{message}</p>
        )}
        {shortUrl && (
          <div className="mt-6 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
            <p className="text-gray-700">Your short URL:</p>
            <a 
              href={shortUrl}
              className="text-blue-600 hover:text-blue-800 break-all"
            >
              {shortUrl}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
