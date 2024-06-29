"use client";
import React, {useState, useEffect} from 'react'
import Image from 'next/image';
import buyNow from '../../public/images/Buy_NOW (1).8640dc7dbf6215b1a4c7565d43005064 4.png';
import backgroundBanner from '../../public/images/how_its_done_banner.svg';
import challanger from '../../public/images/challanger.png';
import howItsDone1 from '../../public/images/how_its_done_11.svg';
import howItsDone2 from '../../public/images/how_its_done_2.svg'
import howItsDone3 from '../../public/images/how_its_done_3.svg'
interface Props {}

const Steps = () => {
    const [scrollPosition, setScrollPosition] = useState(0);
  
    useEffect(() => {
      const handleScroll = () => {
        setScrollPosition(window.scrollY);
      };
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);
  
    return (
      <section
        className={`py-[150px] text-center w-full h-fit relative fade-in ${
          scrollPosition > 500 ? 'fade-in-active' : ''
        }`}
      >
  <Image src={challanger} draggable={false} width={650} className='absolute top-[7.5%] left-[50%] transform -translate-x-[50%] z-0 opacity-10' alt='challanger'/>
  <h2 className='text-3xl text-[#D19638] glow-text-yellow relative'><span className='w-[7%] bg-[#D19638] absolute left-[50%] transform -translate-x-[175%] top-4 h-1 inline-block'></span>HOW ITS DONE<span className='w-[7%] bg-[#D19638] absolute right-[50%] transform translate-x-[175%] top-4 h-1 inline-block'></span></h2>
  <h1 className='text-4xl text-white glow-text-white mt-3'>Achieve your desired rank in just 3 easy steps! </h1>
  <div className='flex flex-row flex-wrap justify-center mt-[100px] relative'>
    <span className='w-[40%] mx-auto h-1 absolute top-[50%] -translate-y-[50%] bg-[#D19638]'></span>
    <div className='w-[350px] m-10 h-[450px] relative'>
      <Image src={backgroundBanner} alt='img-background' className='absolute top-0 left-0 w-full h-full z-0'/>
        <div className='absolute -top-5 bg-[#D19638] rounded-[100%] left-[50%] transform -translate-x-[50%] w-[75px] h-[75px] text-white text-4xl p-4'>1</div>
      <div className='z-10 relative w-full h-full'>
        <h3 className='text-white text-3xl mt-[70px] glow-text-white'>Place An Order</h3>
        <Image src={howItsDone1} width={220} alt='' className='mx-auto mt-[15px]'/>
        </div>
      </div>
    <div className='w-[350px] m-10 h-[450px] relative'>
      <Image src={backgroundBanner} alt='img-background' className='absolute top-0 left-0 w-full h-full z-0'/>
        <div className='absolute -top-5 bg-[#D19638] rounded-[100%] left-[50%] transform -translate-x-[50%] w-[75px] h-[75px] text-white text-4xl p-4'>2</div>
      <div className='z-10 relative w-full h-full'>
        <h3 className='text-white text-2xl mt-[70px] glow-text-white'>Complete Payment</h3>
        <Image src={howItsDone2} width={220} alt='' className='mx-auto mt-[25px]'/>
        </div>
      </div>
    <div className='w-[350px] m-10 h-[450px] relative'>
      <Image src={backgroundBanner} alt='img-background' className='absolute top-0 left-0 w-full h-full z-0'/>
        <div className='absolute -top-5 bg-[#D19638] rounded-[100%] left-[50%] transform -translate-x-[50%] w-[75px] h-[75px] text-white text-4xl p-4'>3</div>
      <div className='z-10 relative w-full h-full'>
        <h3 className='text-white text-3xl mt-[70px] glow-text-white'>Track Progress</h3>
        <Image src={howItsDone3} width={220} alt='' className='mx-auto mt-[20px]'/>
      </div>
     </div>
  </div>
</section>
    )
}

export default Steps