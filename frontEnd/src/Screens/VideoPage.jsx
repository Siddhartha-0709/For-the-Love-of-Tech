import React, { useRef, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import YouTube from 'youtube-player';
import 'video.js/dist/video-js.css'; // Remove if not needed

function CoursePage() {
  const playerRef = useRef(null);
  const [videoId, setVideoId] = useState('');
  const location = useLocation();

  useEffect(() => {
    // Extract the video URL from query parameters
    const queryParams = new URLSearchParams(location.search);
    const src = queryParams.get('src');

    if (src) {
      const url = new URL(src);
      const id = url.searchParams.get('v');
      setVideoId(id);
    }
  }, [location.search]);

  useEffect(() => {
    if (videoId) {
      const player = YouTube(playerRef.current, {
        height: '480',
        width: '100%',
        videoId: videoId,
        playerVars: { autoplay: 1 },
      });

      return () => {
        player.destroy();
      };
    }
  }, [videoId]);

  return (
    <main className="bg-gray-950 justify-center py-12 h-screen items-center">
      <center>
        <div className="w-full max-w-4xl">
          <div ref={playerRef} />
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-white mt-3 text-left">Introduction to Computer Science</h2>
            <p className="text-gray-300 text-left">Instructor: John Doe</p>
          </div>
          <div className="mt-1 space-y-2">
            <p className="text-gray-400 text-left">
              Dive into the fundamental concepts of computer science, including algorithms, data structures, and
              programming languages. This course is designed to provide a solid foundation for aspiring developers and
              tech enthusiasts.
            </p>
          </div>
        </div>
      </center>
    </main>
  );
}

export default CoursePage;
