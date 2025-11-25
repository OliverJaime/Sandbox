import { RatingStars } from '../widgets/RatingStars.tsx';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';

export interface ReviewsProps {
  totalreviews: number;
  totalstars: number;
  overall: string;
  gmburl: string;
  reviews: Review[];
}

type Review = {
  reviewer: string;
  avatar: string;
  date: string;
  rating: number;
  body: string;
  url: string;
  alt: string;
  profileurl: string;
}

export default function Reviews(props: ReviewsProps) {
  return (

    <div id="reviews" className="bg-#00000 py-10">
      <div className="md:flex md:items-center md:container space-y-4">
        <div className="md:w-1/3 flex flex-col items-center space-y-2">
          <p className="font-bold text-2xl leading-none">{props.overall}</p>
          <RatingStars
            p={{
              StarRating: props.totalstars,
            }}
            client:visible
          />
          <p className="">Based on <span className="font-bold">{props.totalreviews} reviews</span></p>
          <a href={props.gmburl} target="_blank"><img src="/img/logo-google.svg" alt="Google" className="h-8 w-auto" /></a>
        </div>

        <div className="relative md:w-2/3 reviews-swiper px-4 md:px-12">
          <div className="absolute inset-0 z-20 flex w-full justify-between items-center pointer-events-none">
            <button className="reviewPrev w-6 h-6 md:w-10 md:h-10 shrink-0 flex items-center justify-center rounded-full pointer-events-auto">
              <svg xmlns="http://www.w3.org/2000/svg" height="40" viewBox="0 -960 960 960" width="40" className="fill-neutral-400">
                <path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z"/>
              </svg>
            </button>
            <button className="reviewNext w-6 h-6 md:w-10 md:h-10 shrink-0 flex items-center justify-center rounded-full pointer-events-auto">
              <svg xmlns="http://www.w3.org/2000/svg" height="40" viewBox="0 -960 960 960" width="40" className="fill-neutral-400">
                <path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z"/>
              </svg>
            </button>
          </div>
          <Swiper
            className="cursor-pointer"
            modules={[Navigation]}
            spaceBetween={10}
            slidesPerView={1}
            breakpoints={{
              320: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 1,
              },
              1024: {
                slidesPerView: 2,
              }
            }}
            navigation={{ nextEl: '.reviewNext', prevEl: '.reviewPrev' }}
          >
            {
              props.reviews.map((review, index) => {
                return (
                  <SwiperSlide key={index}>
                    <div className="block p-2">
                      <a href={review.url}>
                      <div className="bg-white rounded-md shadow-md p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex space-x-4 items-center">
                          <a href={review.profileurl} target="_blank">
                            <img src={review.avatar} className="w-10 h-10 shrink-0" alt={review.alt} />
                          </a>  
                            <div className="space-y-1">
                              <p className="font-bold leading-none">{review.reviewer}</p>
                              <p className="text-xs text-neutral-500">{review.date}</p>
                            </div>
                          </div>
                          <a href={review.profileurl} target="_blank">
                            <img src="/img/logo-g.svg" alt="Google" className="" />
                          </a>
                        </div>
                        <RatingStars
                          p={{
                            StarRating: review.rating,
                          }}
                          client:visible
                        />
                        <p className="text-sm mt-1 mb-2">{review.body}</p>

                        <a href={review.url} target="_blank" className="text-sm text-neutral-500 hover:underline">Read more</a>
                      </div>
                      </a>
                    </div>
                  </SwiperSlide>
                );
              })
            }
          </Swiper>
        </div>
      </div>
    </div>
  );
}