'use client'
import { useState, useEffect } from 'react';
import text from '../../../public/reviews/DwayneV12_3_Days_Ago.svg';
import text1 from '../../../public/reviews/DwayneV12_3_Days_Ago_1.svg';
import text2 from '../../../public/reviews/DwayneV12_3_Days_Ago_2.svg';
import text3 from '../../../public/reviews/DwayneV12_3_Days_Ago_3.svg';
import text4 from '../../../public/reviews/DwayneV12_3_Days_Ago_4.svg';
import text5 from '../../../public/reviews/DwayneV12_3_Days_Ago_5.svg';
import text6 from '../../../public/reviews/DwayneV12_3_Days_Ago_6.svg';
import text7 from '../../../public/reviews/DwayneV12_3_Days_Ago_7.svg';
import text8 from '../../../public/reviews/DwayneV12_3_Days_Ago_8.svg';
import text9 from '../../../public/reviews/DwayneV12_3_Days_Ago_9.svg';
import text10 from '../../../public/reviews/DwayneV12_3_Days_Ago_10.svg';
import Image from 'next/image';
const images = [
  text, 
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
    <div className="relative w-[450px] h-[73px] mt-[10px] max-lg:mx-auto  max-md:w-[300px] max-md:mx-auto">
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute top-0 left-0 w-full h-full transform transition duration-500 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <Image src={image} alt={`Slide ${index}`} className="w-full h-fit " draggable={false}/>
        </div>
      ))}
      <button className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white text-xl" onClick={prevSlide}>
        {'<'}
      </button>
      <button className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white text-xl" onClick={nextSlide}>
        {'>'}
      </button>
    </div>
  );
};

export default Carousel;
