'use client'
import { useState, useEffect } from 'react';
import text1 from '../../../public/images/Review_1_1.svg';
import text2 from '../../../public/reviews/Review_2_2.svg';
import text3 from '../../../public/reviews/Review_3_3.svg';
import text4 from '../../../public/images/Review_4_1.svg';
import text5 from '../../../public/reviews/Review_5_3.svg';
import text6 from '../../../public/images/Review_6_1.svg';
import text7 from '../../../public/reviews/Review_7_3.svg';
import text8 from '../../../public/reviews/Review_8_3.svg';
import text9 from '../../../public/images/Review_9_1.svg';
import text10 from '../../../public/reviews/Review_10_2.svg';
import Image from 'next/image';
const images = [
  text1,
  text2,
  text3,
  text4,
  text5,
  text6,
  text7,
  text8,
  text9,
  text10,
]; // Replace these URLs with your image URLs

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
    }, 3000); // Change slide every 3 seconds (3000ms)

    return () => clearInterval(interval);
  }, [currentSlide]);

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 0 ? images.length - 1 : prevSlide - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
  };

  return (
    <div className="relative w-[1100px] h-[320px] max-lg:mx-auto rounded-lg max-md:w-[300px] mx-auto bg-[#0A0E1B] p-[15px]">
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute top-0 left-0 w-full h-full transform transition duration-500 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <Image src={image} alt={`Slide ${index}`} className="w-[95%] ml-auto h-[100%]  object-cover" />
        </div>
      ))}
      <button className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white text-3xl bg-[#FEC557] pb-1 rounded-[100%] w-[40px] h-[40px]" onClick={prevSlide}>
        {'<'}
      </button>
      <button className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white text-3xl bg-[#FEC557] pb-1 rounded-[100%] w-[40px] h-[40px]" onClick={nextSlide}>
        {'>'}
      </button>
    </div>
  );
};

export default Carousel;
