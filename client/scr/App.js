import React, { useState, useEffect } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import './App.css';

function App() {
  const [streamStatus, setStreamStatus] = useState(null);
  const [isBroadcasting, setIsBroadcasting] = useState(false);
  const [videoElement, setVideoElement] = useState(null);

  useEffect(() => {
    checkStreamStatus();
    const interval = setInterval(checkStreamStatus, 5000);
    return () => clearInterval(interval);
  }, []);

  const checkStreamStatus = async () => {
    try {
      const response = await fetch('/api/stream/status');
      const data = await response.json();
      setStreamStatus(data);
    } catch (error) {
      console.error('Error checking stream status:', error);
    }
  };

  const startBroadcasting = async () => {
    if (streamStatus?.isLive) {
      alert('Live stream is already ongoing.');
      return;
    }

    // In a real app, you would implement OBS or mobile broadcasting setup
    setIsBroadcasting(true);
    try {
      await fetch('/api/stream/start', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ broadcasterId: 'user_' + Date.now() }),
      });
      checkStreamStatus();
    } catch (error) {
      console.error('Error starting stream:', error);
      setIsBroadcasting(false);
    }
  };

  const stopBroadcasting = async () => {
    setIsBroadcasting(false);
    try {
      await fetch('/api/stream/stop', { method: 'POST' });
      checkStreamStatus();
    } catch (error) {
      console.error('Error stopping stream:', error);
    }
  };

  useEffect(() => {
    if (streamStatus?.isLive && !isBroadcasting && !videoElement) {
      const player = videojs('video-player', {
        controls: true,
        autoplay: true,
        preload: 'auto',
        fluid: true,
        sources: [{
          src: 'http://your-server-ip:8080/hls/stream.m3u8',
          type: 'application/x-mpegURL'
        }]
      });
      setVideoElement(player);
    }

    return () => {
      if (videoElement) {
        videoElement.dispose();
        setVideoElement(null);
      }
    };
  }, [streamStatus, isBroadcasting]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
      <header className="py-8 text-center">
        <h1 className="text-4xl font-serif text-rose-800">Welcome to JJ2025 Live Stream Event</h1>
        <p className="text-xl mt-4 text-rose-600">Celebrating the wedding of Joy and Jeffrey!</p>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <section className="text-center mb-12">
          <p className="text-lg mb-8">
            Join us in celebrating the love story of Joy and Jeffrey as they begin their 
            journey together as husband and wife. Witness this magical moment live!
          </p>
          
          {streamStatus?.isLive ? (
            <div className="mt-8">
              <h2 className="text-2xl mb-4 text-rose-700">Live Stream in Progress</h2>
              <div data-vjs-player>
                <video 
                  id="video-player"
                  className="video-js vjs-default-skin vjs-big-play-centered"
                  playsInline
                />
              </div>
              {isBroadcasting && (
                <button
                  onClick={stopBroadcasting}
                  className="mt-4 bg-rose-600 hover:bg-rose-700 text-white font-bold py-3 px-6 rounded-full transition-all"
                >
                  Stop Broadcasting
                </button>
              )}
            </div>
          ) : (
            <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-8 justify-center mt-8">
              <button
                onClick={() => window.location.href = isBroadcasting ? '#' : '/watch'}
                className="bg-rose-600 hover:bg-rose-700 text-white font-bold py-3 px-6 rounded-full transition-all"
              >
                Watch Live Stream
              </button>
              <button
                onClick={startBroadcasting}
                className="bg-rose-400 hover:bg-rose-500 text-white font-bold py-3 px-6 rounded-full transition-all"
                disabled={isBroadcasting}
              >
                {isBroadcasting ? 'Starting Broadcast...' : 'Start Live Stream'}
              </button>
            </div>
          )}
        </section>

        <section className="text-center mt-12 border-t pt-8 border-rose-100">
          <h3 className="text-xl font-serif text-rose-800">Event Details</h3>
          <p className="mt-2">May 31, 2025 • 4:00 PM</p>
          <p className="mt-1">St. Mary's Cathedral, followed by reception at The Grand Ballroom</p>
        </section>
      </main>

      <footer className="py-6 text-center text-sm text-rose-400">
        <p>Created with love for Joy & Jeffrey's special day</p>
      </footer>
    </div>
  );
}

export default App;
