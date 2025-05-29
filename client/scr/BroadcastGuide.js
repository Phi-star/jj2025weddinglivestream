import React from 'react';

export default function BroadcastGuide() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
        <h1 className="text-3xl font-serif text-rose-800 mb-6">Broadcasting Guide</h1>
        
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-rose-700 mb-2">1. Download a Broadcasting App</h2>
            <p>We recommend using <strong>Larix Broadcaster</strong> (iOS/Android) or <strong>OBS Camera</strong> (iOS/Android).</p>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-rose-700 mb-2">2. Configure the Stream</h2>
            <p>Use these settings:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li><strong>URL:</strong> rtmp://your-server-ip/live</li>
              <li><strong>Stream Key:</strong> stream</li>
              <li><strong>Orientation:</strong> Landscape (hold phone horizontally)</li>
              <li><strong>Camera:</strong> Back camera only</li>
            </ul>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-rose-700 mb-2">3. Start Broadcasting</h2>
            <p>Press the "Start Broadcast" button in your app. Make sure you're in a stable WiFi or 4G/5G network.</p>
            <p className="mt-2 text-sm text-rose-600">Note: Only one broadcast can be active at a time.</p>
          </div>
          
          <div className="pt-4">
            <a href="/" className="inline-block bg-rose-600 hover:bg-rose-700 text-white font-bold py-2 px-4 rounded transition-all">
              Back to Home
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
