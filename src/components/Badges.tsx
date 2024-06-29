"use client";
import React, {useState, useEffect} from 'react'
import Image from 'next/image';
import speed from '../../public/images/icons8-speed-60.png';
import helping from '../../public/images/icons8-chevron-up-64.png';
import top from '../../public/images/icons8-rate-64.png';
import support from '../../public/images/icons8-customer-support-64.png';
interface Props {}

const Badges = () => {
  return <section className='pt-[80px] pb-[120px] text-center w-full h-fit bg-[#0A0E1B]'>
  <h1 className='text-white text-6xl spacing tracking-wider mb-5'>
    Our Badges
  </h1>
    <hr className='border-[#FEC557] border-2 w-[400px] mx-auto'/>
  <div className='w-full flex flex-row flex-wrap justify-center pt-[100px]'>
      <div className='relative border-[#FEC557] border-b-5 m-7 w-[200px] h-[230px]'>
        <Image src={speed} alt='icon' width={75} height={75} className='mx-auto'/>
        <h3 className='text-white text-2xl tex-tcenter mt-[60px]'><span className='text-[#D19638]'>Fastest</span> On The Market</h3>
      </div>
      <div className='relative border-[#FEC557] border-b-5 m-7 w-[200px] h-[230px]'>
        <Image src={support} alt='icon' width={75} height={75} className='mx-auto'/>
        <h3 className='text-white text-2xl tex-tcenter mt-[60px]'><span className='text-[#D19638]'>24/7</span> Customer Support</h3>
      </div>
      <div className='relative border-[#FEC557] border-b-5 m-7 w-[200px] h-[230px]'>
        <Image src={helping} alt='icon' width={75} height={75} className='mx-auto'/>
        <h3 className='text-white text-2xl tex-tcenter mt-[60px]'><span className='text-[#D19638]'>751</span> People We have helped</h3>
      </div>
      <div className='relative border-[#FEC557] border-b-5 m-7 w-[200px] h-[230px]'>
        <Image src={top} alt='icon' width={85} height={85} className='mx-auto'/>
        <h3 className='text-white text-2xl tex-tcenter mt-[50px]'>Top <span className='text-[#D19638]'>0.1% </span>Boosters</h3>
      </div>
  </div>
</section>
}

export default Badges