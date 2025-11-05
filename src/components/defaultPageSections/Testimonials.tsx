import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';

export interface TestimonialsProps {
  videobuttonclass: string;
  headline: string;
  videoTestimonials: VideoTestimonial[];
  textTestimonials: TextTestimonial[];
  gmburl: string; // Assuming gmburl is also passed as a prop
}

type VideoTestimonial = {
  embedURL: string;
  embedID: string;
  buttonLabel: string;
}

type TextTestimonial = {
  testimonial: string;
}

export default function Testimonials(props: TestimonialsProps) {
  const [swiper, setSwiper] = useState<Swiper>();
  // const [modifiedTextTestimonials, setModifiedTextTestimonials] = useState(props.textTestimonials);

  // useEffect(() => {
  //   // const urlParams = new URLSearchParams(window.location.search);
  //   // const utmContent = urlParams.get('utm_content');
  
  //   // if (utmContent === 'lower_back') {
  //   //   const customMessages = [
  //   //     "The robots are truly remarkable and healed issues no doctor has been able to. Highly recommend if you're in any kind of pain.",
  //   //     "For the first time in over a decade. I do not have back pain. I'm so happy I was referred to this place!",
  //   //     "I had severe back pain. My massage therapist recommended RPT. I gave it a try and now have almost 100% mobility."
  //   //   ];
  
  //   //   // Use the original testimonial as a fallback if a custom message doesn't exist for an index
  //   //   const newTextTestimonials = props.textTestimonials.map((testimonial, index) => {
  //   //     const customTestimonial = customMessages[index] ?? testimonial.testimonial; // Use ?? operator to fallback
  //   //     return { ...testimonial, testimonial: customTestimonial };
  //   //   });
  
  //   //   setModifiedTextTestimonials(newTextTestimonials);
  //   // }

  //   // if (utmContent === 'sciatica') {
  //   //   const customMessages = [
  //   //     "The robots are truly remarkable and healed issues no doctor has been able to. Highly recommend if you're in any kind of pain.",
  //   //     "For the first time in over a decade. I do not have sciatica pain. I'm so happy I was referred to this place!",
  //   //     "I had severe sciatica pain. My massage therapist recommended RPT. I gave it a try and now have almost 100% mobility."
  //   //   ];
  
  //   //   // Use the original testimonial as a fallback if a custom message doesn't exist for an index
  //   //   const newTextTestimonials = props.textTestimonials.map((testimonial, index) => {
  //   //     const customTestimonial = customMessages[index] ?? testimonial.testimonial; // Use ?? operator to fallback
  //   //     return { ...testimonial, testimonial: customTestimonial };
  //   //   });
  
  //   //   setModifiedTextTestimonials(newTextTestimonials);
  //   // }

  //   // if (utmContent === 'herniated_disc') {
  //   //   const customMessages = [
  //   //     "The robots are truly remarkable and healed issues no doctor has been able to. Highly recommend if you're in any kind of pain.",
  //   //     "For the first time in over a decade. I do not have a herniated disc. I'm so happy I was referred to this place!",
  //   //     "I had a severe herniated disc. My massage therapist recommended RPT. I gave it a try and now have almost 100% mobility."
  //   //   ];
  
  //   //   // Use the original testimonial as a fallback if a custom message doesn't exist for an index
  //   //   const newTextTestimonials = props.textTestimonials.map((testimonial, index) => {
  //   //     const customTestimonial = customMessages[index] ?? testimonial.testimonial; // Use ?? operator to fallback
  //   //     return { ...testimonial, testimonial: customTestimonial };
  //   //   });
  
  //   //   setModifiedTextTestimonials(newTextTestimonials);
  //   // }

  //   // if (utmContent === 'bulging_disc') {
  //   //   const customMessages = [
  //   //     "The robots are truly remarkable and healed issues no doctor has been able to. Highly recommend if you're in any kind of pain.",
  //   //     "For the first time in over a decade. I do not have a bulging disc. I'm so happy I was referred to this place!",
  //   //     "I had a severe bulging disc. My massage therapist recommended RPT. I gave it a try and now have almost 100% mobility."
  //   //   ];
  
  //   //   // Use the original testimonial as a fallback if a custom message doesn't exist for an index
  //   //   const newTextTestimonials = props.textTestimonials.map((testimonial, index) => {
  //   //     const customTestimonial = customMessages[index] ?? testimonial.testimonial; // Use ?? operator to fallback
  //   //     return { ...testimonial, testimonial: customTestimonial };
  //   //   });
  
  //   //   setModifiedTextTestimonials(newTextTestimonials);
  //   // }

  //   // if (utmContent === 'piriformis') {
  //   //   const customMessages = [
  //   //     "The robots are truly remarkable and healed issues no doctor has been able to. Highly recommend if you're in any kind of pain.",
  //   //     "For the first time in over a decade. I do not have piriformis pain. I'm so happy I was referred to this place!",
  //   //     "I had severe piriformis pain. My massage therapist recommended RPT. I gave it a try and now have almost 100% mobility."
  //   //   ];
  
  //   //   // Use the original testimonial as a fallback if a custom message doesn't exist for an index
  //   //   const newTextTestimonials = props.textTestimonials.map((testimonial, index) => {
  //   //     const customTestimonial = customMessages[index] ?? testimonial.testimonial; // Use ?? operator to fallback
  //   //     return { ...testimonial, testimonial: customTestimonial };
  //   //   });
  
  //   //   setModifiedTextTestimonials(newTextTestimonials);
  //   // }

  //   // Add dependencies to useEffect
  // }, [props.textTestimonials]);


  return (

    <div id="testimonial" className="bg-brand-secondary py-10">
      <h1 className="section-headline text-2xl">{props.headline}</h1>

      <div className="testimonials-swiper md:container">
        <Swiper
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            320: {
              spaceBetween: 20,
              slidesPerView: 1,
            },
            1024: {
              spaceBetween: 20,
              slidesPerView: 3,
            },
          }}
          onSwiper={(swiper) => setSwiper(swiper)}
        >
          {
            props.videoTestimonials.map((VideoTestimonial, index) => {
              return (
                <SwiperSlide key={index}>
                  <div className="px-4 pt-10 pb-2 md:pb-4">
                    <div className="relative w-full max-w-xl aspect-video mx-auto">
                      <iframe src={VideoTestimonial.embedURL} title="Testimonial Video" id={VideoTestimonial.embedID} className="w-full aspect-video border border-neutral-500" allowFullScreen></iframe>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })
          }
        </Swiper>
        
        <div className="lg:hidden container max-w-xl mx-auto grid grid-cols-3 gap-4">
        {
            props.videoTestimonials.map((VideoTestimonial, index) => {
              return (
                <button key={index} className={props.videobuttonclass} onClick={() => swiper.slideTo(index)}>
                  {VideoTestimonial.buttonLabel}
                </button>
              );
            })
          }
        </div>

      </div>
      <div className="md:container md:max-w-5xl">
        <a href={props.gmburl} target="_blank"><img src="/img/google-reviews.svg" alt="Google Reviews" className="md:w-52 md:h-auto mx-auto mb-6 md:mb-10" /></a>
        <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
        {
          props.textTestimonials.map((TextTestimonial, index) => {   
          // modifiedTextTestimonials.map((TextTestimonial, index) => {         
            return (
              <div className="text-center px-4 md:px-8 md:col-span-3 md:odd:last-of-type:col-start-1" key={index}>
                <p className="font-semibold text-sm leading-snug md:text-base md:leading-snug">&ldquo;{TextTestimonial.testimonial}&rdquo;</p>
              </div>
            );
          })
        }
        </div>
      </div>
    </div>
  );
  
}