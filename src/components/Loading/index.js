import React from "react";

const Loading = () => {
  return (
    <div className="flex left-0 right-0 justify-center items-center w-full top-0 h-[100%] bg-opacity-75 bg-white fixed z-[9999999999]">
      <div className="relative w-[70px] h-[70px]">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute top-1/2 left-[30%] right-[30%]"
            style={{
              transform: `rotate(${i * 45}deg) translate(30px)`,
            }}
          >
            <span
              className="block w-4 h-4 bg-purple rounded-full opacity-0 animate-spinner-dot"
              style={{
                animationDelay: `${i * 0.1}s`,
              }}
            ></span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Loading;