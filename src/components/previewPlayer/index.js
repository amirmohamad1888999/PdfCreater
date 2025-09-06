import React, { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import { useInView } from "react-intersection-observer";
import ReactPlayer from "react-player";

const HLSPlayerComponent = ({ video }) => {
  const videoRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView && video && !isLoaded) {
      setIsLoaded(true);
    }
  }, [inView, video, isLoaded]);

  useEffect(() => {
    if (isLoaded && video) {
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(video);
        hls.attachMedia(videoRef.current);

        hls.on(Hls.Events.ERROR, (event, data) => {
          console.error("HLS Error:", data);
        });
      } else if (videoRef.current.canPlayType("application/vnd.apple.mpegurl")) {
        videoRef.current.src = video;
      }
    }
  }, [isLoaded, video]);

  return (
    <div className="d-flex w-100 justify-content-around" ref={ref}>
      {!isLoaded || !video ? (
        <div className="cover-video">
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEjUlEQVR4nO2aS2wcRRCGBwLhEQRkeXMCiQMoCDgjrkACAQI38zolSi4kloFjMBcuwAkRCZ8srbW70vfP2JLBRgERyxKgmIQELsSOk1NCJB7JAYGJxWNRraulEdp1dnZnH7ZS0kizOz1d9XdXV/1dPVF0WdapAIU4jncA7wFTkuYlXZC07NcF4IQ9szaSniuVSpujfpDR0dFrgVckfSbpH0nVjNffwEFJL09PT1/TdQDAdcDrwLlgFHAROCRpv81MpVJ5wEZ8ZGTkarvs3v7zWXsLmLF3UqB+BIZscLoF4mngdArAEWAncFPWviYmJm6WtEvS0RSgU5K2ddSNJH2UAvCtpCfy6h/YKul4CtCB3GcHuNMNNwB/AK8BG3JVsqJnA7BP0lKY7XK5fEdend/r020dn0iS5MGowyLpIUkLPjOLZkNbHQK3hQ6Bb0ql0q1Rl6RUKm0GvnTdp80r2gmtNXeS9HWxWNwUdVmKxeIm4HBws5bWTFjYnsQKUY9kfHz8lpSbHcgcYsPC7saaaHLNLLlNW7Mku1qesOjUrDLgTWBjOwavJsBgWPxNuZikN0KeyBJiXclCp5LZzMzMVcB3btvgqo2N7xhV8MaPZ1GU5lDA50ZHopwljuOnvP9zq86KkbcQIbIqSYH4LcW93skz2lWr1StSifnFhg1tJL3RzlaBJElyl6SRFBs2MviqGdEuEBNgt/f7aVRPLMQ6rb7YCgEMQFK/H03lIRucWYs+UQ6JUtIy8FddO4HnXekXrSj4PxCT4eHhK202gJ/8uc1S0RhDG1giH5RqHMfP1DPkfVe2Py8gKcUF4EObcW/3i7mIAW1R19vez7v1lE25CzybN5AgcRzf77vJEOGOA49l1YV7DzBZ7+FJe9hq2GwGiIktekkDwBk35l9grFwu351B1xbXN1/v4XnvuNBJIEEmJyevdxf509/93X43s3c3Fu7v/FzPkGUHsrEbQIIA90n6JOVuC3EcP9lE4q7lqnUN5PxacS1WNnz1XWvdLHY8/FoFsFvhFzjWSviV9ELD8BsSohXPsnbcVwkxjuMdDuTQWqEokrY3ImM10mgVwH4ljayQ2xppHBsbu7FRo4OueFe/0nhJe3xgpho2Al5y5Uf7eGN1zHUNXCrRnHWKvGpS6sVWV9J27//MJfONlfZTobHfig/fu569zVbdQ613Xx+Vg4bCYDV9KGSj6i8t5RFp2hXgkRSVyXaUYeXJMAJWtox6JKzwqkW35YNWi9hH3MUO96KIDdwgac5BzLV8zuijMR+OFdrNyBl1F4CvHMSptg98/KAnTO1CkiQP52bt6mti0QfwZKVSuSeXjm00gptZALDaq4XDqDMhdii1sOeSJLk9VyUelkMAqHpBeVuOGdtOi0OeqC3sjp69++lrcLVQtd/dylcMTgD3pGhH1Td4uZ0WNxPRBgOd8csY6Sww7HWnLRa2LUnaZfd2aGSbIm8zG+oEgXZI2tuTLyBMqVXFraCc2jQ1fXn91namAz0BUE+soGy1WNu1AR/72eOv4aMav//BtqfWxto23E9clmjty3/s42PqLk6zeAAAAABJRU5ErkJggg==" />
        </div>
      ) : (
        <ReactPlayer
        url={video}
        controls={true}
        playing={false}
        width="380px"
        height="220px"
        className="react-player"
      />
      

      )}
    </div>
  );
};

export default HLSPlayerComponent;