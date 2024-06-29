'use client'
import React from 'react';
import Image from 'next/image';
import lolIcon from '../../../public/images/lolIcon.png';
import backgroundBoosting from '../../../public/images/edc86a280cdc7ea5294dd584499e0f66 1.jpg';
import BoostingTypes from '../../components/lolboosting/BoostingTypes';
import Receipt from 'src/components/lolboosting/Receipt';
import Carousel from 'src/components/lolboosting/Slider';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store/slices/rootReducer';
interface Props {}

const Getboosted = () => {
  const { 
    startRank,
    startDivision,
    endRank,
    endDivision,
    server,
    lpRange,
    boostType,
    spells,
    offlineVpn,
    priorityOrder,
    queueType,
    result,
  } = useSelector((state: RootState) => state.calculator);
  return    <section className="bg-boosting w-full h-fit px-[11%] pt-[180px] relative max-md:text-center flex flex-row max-[1500px]:flex-col max-xl:h-full justify-between pb-[150px]">
  <Image src={backgroundBoosting} draggable={false} alt='background boosting' className='w-full h-full absolute top-0 left-0  opacity-20 unselectable object-cover'/>
  <div className='relative z-20 w-[60%] max-lg:w-full xl:pr-[0px]'>
    <div className='flex flex-row max-md:justify-center'>
     <Image src={lolIcon} alt='lol icon' height={40} width={40} className='unselectable'/>
     <h1 className='text-3xl text-[#FFA800] align-middle pt-2 pl-2 glow-text-yellow max-md:text-3xl'>LOL Boosting</h1>
    </div>
    <h1 className='text-6xl text-white glow-text-white pt-4 max-md:text-4xl'>Division Boosting</h1>
    <BoostingTypes />
  </div>
  <div className='w-[40%] md:mt-[25px] max-xl:mx-auto max-xl:w-full pt-[50px]'>
    <Receipt 
        startRank={startRank}
        startDivision={startDivision}
        endRank={endRank}
        endDivision={endDivision}
        server={server}
        lpRange={lpRange}
        boostType={boostType}
        spells={spells}
        offlineVpn={offlineVpn}
        priorityOrder={priorityOrder}
        queueType={queueType}
        result={result!}
    />
    <Carousel />
  </div>
</section>
}

export default Getboosted