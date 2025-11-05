import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';

export interface LogosProps {
  backgroundclass: string;
  logos: Logo[];
}

type Logo = {
  imagepath: string;
  clickurl: string;
  alt: string;
}

export default function Logos(props: LogosProps) {
  return (

    <div className={props.backgroundclass}>
      <div className="logos-swiper md:container md:max-w-4xl">
        <div className="flex max-w-md mx-auto justify-between relative z-20 pointer-events-none">
          <button className="logoPrev w-4 h-4 shrink-0 flex justify-center rounded-full pointer-events-auto">
            <svg xmlns="http://www.w3.org/2000/svg" width="8" height="10" viewBox="0 0 8 10" className="fill-neutral-300">
              <path d="M5,0l5,8H0Z" transform="translate(0 10) rotate(-90)"/>
            </svg>
          </button>
          <button className="logoNext w-4 h-4 shrink-0 flex justify-center rounded-full pointer-events-auto">
            <svg xmlns="http://www.w3.org/2000/svg" width="8" height="10" viewBox="0 0 8 10" className="fill-neutral-300">
              <path d="M5,0l5,8H0Z" transform="translate(8) rotate(90)"/>
            </svg>
          </button>
        </div>
        <Swiper
          className="-mt-6"
          modules={[Navigation]}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            320: {
              spaceBetween: 0,
              slidesPerView: 3,
            },
            768: {
              spaceBetween: 10,
              slidesPerView: 3,
            },
            1024: {
              spaceBetween: 20,
              slidesPerView: 3, // This changes the amount of images shown in line
            },
          }}
          navigation={{ nextEl: '.logoNext', prevEl: '.logoPrev' }}
          pagination={{ clickable: true }}
        >
          {
            props.logos.map((logo, index) => {
              return (
                <SwiperSlide key={index}>
                  <a href={logo.clickurl} target="_blank" className="flex items-center justify-center px-4">
                    <img src={logo.imagepath} className="w-full max-w-[180px] h-auto" alt={logo.alt} />
                  </a>
                </SwiperSlide>
              );
            })
          }
        </Swiper>
      </div>
    </div>
  );
}