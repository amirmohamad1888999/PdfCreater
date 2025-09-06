import React, { useState, useEffect, useRef } from "react";
import Hls from "hls.js";
import { useInView } from "react-intersection-observer";
import ReactPlayer from "react-player";

const HLSPlayerComponent = ({ video }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) setIsLoaded(true);
  }, [inView]);

  return (
    <div className="flex w-full justify-around" ref={ref}>
      {!isLoaded || !video ? (
        <div className="w-full h-52 bg-slate-200 flex justify-center items-center">
          <div className="loader">Loading...</div> {/* استفاده از CSS برای انیمیشن لودر */}
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
