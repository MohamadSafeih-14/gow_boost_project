"use client";
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

interface Card {
  title: string;
  description: string;
}

interface CardSliderProps {
  data: Card[];
}

const CardSlider: React.FC<CardSliderProps> = ({ data }) => {
  return (
    <Swiper
      spaceBetween={30}
      slidesPerView={1}
      loop={true}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 2500 }}
    >
      {data.map((item, index) => (
        <SwiperSlide key={index}>
          <div className="bg-gray-200 rounded-md p-4">
            <h2 className="text-lg font-semibold">{item.title}</h2>
            <p className="text-gray-600">{item.description}</p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default CardSlider;
