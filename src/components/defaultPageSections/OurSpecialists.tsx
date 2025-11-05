import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export interface SpecialistProps {
  headline: string;
  largescreenslides: number;
  specialists: Specialist[];
}

type Specialist = {
  headshot: string;
  name: string;
  cert: string;
  desc: string;
  alt: string;
}

// var large_screen_number_of_slides;

export default function OurSpecialists(props: SpecialistProps) {
  return (

    // large_screen_number_of_slides = props.numberofslideslarge,

    <div id="therapists" className="bg-brand-secondary py-10">
      <h1 className="section-headline mb-8">{props.headline}</h1>

      <div className="specialist-swiper md:container">
        <Swiper
          className="cursor-pointer"
          modules={[Navigation, Pagination]}
          spaceBetween={20}
          slidesPerView={1}
          centeredSlides={props.specialists.length === 1}
          breakpoints={{
            320: {
              spaceBetween: 20,
              slidesPerView: 1,
            },
            768: {
              spaceBetween: 20,
              slidesPerView: 2,
            },
            1024: {
              spaceBetween: 20,
              slidesPerView: props.largescreenslides,
            },
          }}
          navigation={{ nextEl: '.specialistNext', prevEl: '.specialistPrev' }}
          pagination={{ clickable: true }}
        >
          {
            props.specialists.map((specialist, index) => {
              return (
                <SwiperSlide key={index}>
                  <div className={`px-4 pb-12 ${props.specialists.length === 1 ? "flex justify-center" : ""}`}>
                    <div className="bg-white rounded-md shadow-teamcard">
                      <img src={specialist.headshot} alt={specialist.alt} className="mx-auto" />
                      <div className="bg-neutral-50 shadow-innertop rounded-b-md p-4 md:px-6 md:py-5">
                        <p className="text-sm mb-2">{specialist.desc}</p>
                        <p className="font-bold text-xl mb-1">{specialist.name}</p>
                        <p className="font-bold">{specialist.cert}</p>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })
          }
        </Swiper>
        <div className="flex mx-auto justify-between -mt-7 relative px-4 z-20">
          <a id="specialist-previous" href="#">
            <button className="specialistPrev w-4 h-4 shrink-0 flex justify-center rounded-full pointer-events-auto">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="20" viewBox="0 0 8 10" className="fill-neutral-300">
                <path d="M5,0l5,8H0Z" transform="translate(0 10) rotate(-90)"/>
              </svg>
            </button>
          </a>
          <a id="specialist-next" href="#">
            <button className="specialistNext w-4 h-4 shrink-0 flex justify-center rounded-full pointer-events-auto">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="20" viewBox="0 0 8 10" className="fill-neutral-300">
                <path d="M5,0l5,8H0Z" transform="translate(8) rotate(90)"/>
              </svg>
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}