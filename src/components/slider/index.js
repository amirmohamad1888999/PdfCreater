import React, { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/zoom";
import { Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";

export default function Slider({
  slides,
  zoom,
  height,
  rate,
  showInProduct,
  productInfo,
  showHome,
  imgStyle,
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const swiperRef = useRef(null);

  const handlePaginationClick = (index) => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideTo(index);
    }
  };

  const handleSlideClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <>
      <div
        className={`${
          productInfo ? "h-28 w-full" : "h-initial w-full overflow-hidden"
        }`}
      >
        <Swiper
          ref={swiperRef}
          pagination={{
            el: ".swiper-custom-pagination",
            clickable: true,
          }}
          modules={[Autoplay, Pagination]}
          className=""
          // autoplay={{
          //   delay: 3000,
          //   disableOnInteraction: false,
          // }}
        >
          {slides &&
            slides.map((slide, index) => {
              return (
                <SwiperSlide
                  key={index}
                  onClick={() => handleSlideClick(index)}
                  // className="mb-8"
                >
                  {showHome ? (
                    <img
                      className={` ${height} cursor-pointer rounded-[20px]`}
                      src={slide?.slideImage?.fileLink}
                    />
                  ) : (
                    <img
                      className={` ${height} cursor-pointer`}
                      src={slide.fileLink}
                      alt={`Slide ${index}`}
                    />
                  )}
                  {showInProduct && (
                    <>
                      <div className="absolute bottom-2 left-5 z-[999999]">
                        <div className="flex p-1 rounded-md bg-[rgba(255,255,255,0.4)] items-center justify-center gap-1">
                          <div className=" text-xs font-bold text-black justify-center z-50">
                            {rate ? rate : 0}
                          </div>
                          <Image
                            src="/svg/star.svg"
                            alt="filterIcon"
                            width={18}
                            height={18}
                            className="-mt-1"
                          />
                        </div>
                      </div>
                    </>
                  )}
                </SwiperSlide>
              );
            })}
        </Swiper>

        <div className="mt-[8px] swiper-custom-pagination flex justify-center pt-5 pb-3 relative " />
        {slides &&
          slides.map((_, index) => (
            <div
              key={index}
              className="pagination-item"
              onClick={() => handlePaginationClick(index)}
            ></div>
          ))}
      </div>
    </>
  );
}
