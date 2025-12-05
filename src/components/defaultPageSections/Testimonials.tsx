import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';

export interface TestimonialsProps {
  videobuttonclass: string;
  headline: string;
  videoTestimonials: VideoTestimonial[];
  textTestimonials: TextTestimonial[];
  gmburl: string;
}

type VideoTestimonial = {
  embedURL: string;
  embedID: string;
  buttonLabel: string;
  location: string;
};

type TextTestimonial = {
  testimonial: string;
  location: string;
};

// Individual Testimonial Component with Read More
function TestimonialText({ testimonial, index }: { testimonial: string; index: number }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const CHAR_LIMIT = 200;
  const needsTruncation = testimonial.length > CHAR_LIMIT;
  const displayText =
    isExpanded || !needsTruncation
      ? testimonial
      : testimonial.slice(0, CHAR_LIMIT) + '...';

  return (
    <div className="text-center px-4 md:px-6 opacity-0 slide-in">
      <p className="font-semibold text-sm leading-relaxed md:text-base text-gray-800">
        &ldquo;{displayText}&rdquo;
      </p>
      {needsTruncation && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-cyan-600 hover:text-cyan-700 font-bold text-sm transition-colors duration-200 flex items-center gap-1 mx-auto mt-3"
        >
          {isExpanded ? (
            <>
              Show Less
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
            </>
          ) : (
            <>
              Read More
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </>
          )}
        </button>
      )}
    </div>
  );
}

export default function Testimonials(props: TestimonialsProps) {
  const [swiper, setSwiper] = useState<any>();

  // 1. Get all unique clinic location names from both text and video sources
  const uniqueLocations = Array.from(
    new Set([
      ...props.textTestimonials.map((t) => t.location),
      ...props.videoTestimonials.map((v) => v.location),
    ]),
  ).filter(Boolean);

  // 2. Sort with Troy first, then Rochester, then any others alphabetically
  const preferredOrder = ['Clarkston','Rochester','Troy'];

  const sortedLocations = uniqueLocations.sort((a, b) => {
    const ia = preferredOrder.indexOf(a);
    const ib = preferredOrder.indexOf(b);

    if (ia === -1 && ib === -1) {
      return a.localeCompare(b, undefined, { sensitivity: 'base' });
    }
    if (ia === -1) return 1;
    if (ib === -1) return -1;
    return ia - ib;
  });

  // 3. Add "All" at the end
  const locations = [...sortedLocations, 'All'];

  // 4. Active tab starts as the first location (Troy)
  const [activeTab, setActiveTab] = useState<string>(locations[0] || 'All');

  // 5. Generate grouped testimonials and videos by location
  const groupedTestimonials: Record<string, TextTestimonial[]> = {};
  const groupedVideos: Record<string, VideoTestimonial[]> = {};

  locations.forEach((loc) => {
    if (loc === 'All') {
      groupedTestimonials[loc] = props.textTestimonials;
      groupedVideos[loc] = props.videoTestimonials;
    } else {
      groupedTestimonials[loc] = props.textTestimonials.filter((t) => t.location === loc);
      groupedVideos[loc] = props.videoTestimonials.filter((v) => v.location === loc);
    }
  });

  // Animate testimonials when tab changes
  useEffect(() => {
    const testimonials = document.querySelectorAll('.tab-content.active .slide-in');
    testimonials.forEach((testimonial, index) => {
      setTimeout(() => {
        testimonial.classList.add('slide-in-active');
      }, index * 100);
    });
  }, [activeTab]);

  return (
    <div id="testimonials" className="bg-brand-secondary py-16">
      <h1 className="section-headline text-2xl mb-8">{props.headline}</h1>

      {/* Location Tabs */}
      <div className="container max-w-7xl mx-auto px-4 mb-8">
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex gap-2 border-b-2 border-gray-300 min-w-max justify-center">
            {locations.map((location) => (
              <button
                key={location}
                onClick={() => setActiveTab(location)}
                className={`
                  px-6 py-3 font-bold text-base transition-all duration-300 whitespace-nowrap relative
                  ${
                    activeTab === location
                      ? 'text-gray-900 border-b-4 border-cyan-600'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 border-b-4 border-transparent hover:border-gray-400'
                  }
                `}
              >
                {location}
                {location !== 'All' && (
                  <span className="ml-2 text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full">
                    {groupedTestimonials[location]?.length || 0}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      {locations.map((location) => (
        <div
          key={location}
          className={`tab-content ${activeTab === location ? 'active' : 'hidden'}`}
        >
          {/* Video Testimonials Slider */}
          {groupedVideos[location] && groupedVideos[location].length > 0 && (
            <div className="testimonials-swiper md:container mb-12">
              <Swiper
                key={location}
                spaceBetween={20}
                slidesPerView={1}
                breakpoints={{
                  320: {
                    spaceBetween: 20,
                    slidesPerView: 1,
                  },
                  1024: {
                    spaceBetween: 20,
                    slidesPerView: Math.min(3, groupedVideos[location].length),
                  },
                }}
                onSwiper={(swiperInstance) => setSwiper(swiperInstance)}
              >
                {groupedVideos[location].map((VideoTestimonial, index) => (
                  <SwiperSlide key={index}>
                    <div className="px-4 pt-10 pb-2 md:pb-4">
                      <div className="relative w-full max-w-xl aspect-video mx-auto">
                        <iframe
                          src={VideoTestimonial.embedURL}
                          title="Testimonial Video"
                          id={VideoTestimonial.embedID}
                          className="w-full aspect-video border border-neutral-500 rounded-lg"
                          allowFullScreen
                        />
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
              {/* Mobile Video Navigation Buttons */}
              {groupedVideos[location].length > 1 && (
                <div className="lg:hidden container max-w-xl mx-auto grid grid-cols-3 gap-4">
                  {groupedVideos[location].map((VideoTestimonial, index) => (
                    <button
                      key={index}
                      className={props.videobuttonclass}
                      onClick={() => swiper?.slideTo(index)}
                    >
                      {VideoTestimonial.buttonLabel}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Google Reviews Logo */}
          <div className="md:container md:max-w-6xl">
            <a href={props.gmburl} target="_blank" rel="noopener noreferrer">
              <img
                src="/img/google-reviews.svg"
                alt="Google Reviews"
                className="md:w-52 md:h-auto mx-auto mb-8"
              />
            </a>
          </div>

          {/* Text Testimonials - Clean 3 Column Layout */}
          <div className="container max-w-7xl mx-auto px-4">
            {groupedTestimonials[location] && groupedTestimonials[location].length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                {groupedTestimonials[location].map((TextTestimonial, index) => (
                  <TestimonialText
                    key={index}
                    testimonial={TextTestimonial.testimonial}
                    index={index}
                  />
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-600 py-8">
                No testimonials available for this location yet.
              </p>
            )}
          </div>
        </div>
      ))}

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .slide-in {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.4s ease-out, transform 0.4s ease-out;
        }
        .slide-in-active {
          opacity: 1;
          transform: translateY(0);
        }
        .tab-content {
          animation: fadeIn 0.3s ease-in-out;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
