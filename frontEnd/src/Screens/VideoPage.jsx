import React, { useRef, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import YouTube from 'youtube-player';
import 'video.js/dist/video-js.css'; // Remove if not needed
import Header from './Header';
import Footer from './Footer';

function CoursePage() {
  const playerRef = useRef(null);
  const [videoId, setVideoId] = useState('');
  const location = useLocation();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');

  useEffect(() => {
    // Extract the video URL from query parameters
    const queryParams = new URLSearchParams(location.search);
    const src = queryParams.get('src');
    const title = queryParams.get('title');
    const description = queryParams.get('desc');
    const image = queryParams.get('img');

    setTitle(title);
    setDescription(description);
    setImage(image);
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
    <>
      <Header />
      <main className="bg-gray-950 justify-center py-12 h-full items-center pt-24">
        <center>
          <div className="w-full max-w-4xl">
            <div ref={playerRef} />
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-white mt-3 text-left">{title}</h2>
              <p className="text-gray-300 text-left">Instructor: Siddhartha Mukherjee</p>
            </div>
            <div className="mt-1 space-y-2">
              <p className="text-gray-400 text-left">
                {description}
              </p>
            </div>
          </div>
        </center>
      </main>
      <Footer />
    </>
  );
}

export default CoursePage;
