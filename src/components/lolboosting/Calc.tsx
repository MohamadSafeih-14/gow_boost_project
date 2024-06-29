import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import LPsModal from './modals/LpModal';
import { useDispatch, useSelector } from 'react-redux';
import { setStartRank, setEndRank, setStartDivision, setEndDivision, setLpRange, setBoostType, setResult } from '../../store/slices/calculatorSlice';
import { RootState } from '../../store/slices/rootReducer';
import StartingRank from './modals/StartRanksModal';
import EndingRank from './modals/EndRanksModal';
import ServerModal from './modals/ServersModal';
import BoostTypeModal from './modals/BoostTypeModal';
import BronzeBanner from '../../../public/images/BronzeBanner.png'
import SilverBanner from '../../../public/images/SilverBanner.png'
import GoldBanner from '../../../public/images/GoldBanner.png'
import PlatinumBanner from '../../../public/images/PlatinumBanner.png'
import EmeraldBanner from '../../../public/images/EmeraldBanner.png'
import DiamondBanner from '../../../public/images/DiamondBanner.png'
import MasterBanner from '../../../public/images/masterBanner.svg'
import Iron from '../../../public/images/ranks/bronze.webp';
import Bronze from '../../../public/images/ranks/bronze.webp';
import Silver from '../../../public/images/ranks/silver.webp';
import Gold from '../../../public/images/ranks/gold.webp';
import Platinum from '../../../public/images/ranks/platinum.webp';
import Emerald from '../../../public/images/ranks/emerald.webp';
import Diamond from '../../../public/images/ranks/diamond.webp'; 
import Master from '../../../public/images/ranks/master.webp'; 
import flag from '../../../public/images/cutted-flag (1) 6.png';
import {CircularProgress, Spinner} from "@nextui-org/react";
import QueueModal from './modals/QueueModal';
export type Rank = 'Iron' | 'Bronze' | 'Silver' | 'Gold' | 'Platinum' | 'Emerald' | 'Diamond' | 'Master';
export type Server = 'EUW' | 'NA';
export type LPRange = '0 - 20' | '21 - 40' | '41 - 60' | '61 - 80' | '81 - 100';
export type BoostType = 'Solo' | 'Duo';


// Division costs for different ranks and divisions
const divisionCosts: Record<Rank, Record<number, number>> = {
  Iron: { 4: 0, 3: 4, 2: 8, 1: 12, 0: 16 },
  Bronze: { 4: 16, 3: 20.75, 2: 25.5, 1: 30.25, 0:35 },
  Silver: { 4: 35, 3: 41, 2: 47, 1: 53 , 0: 59},
  Gold: { 4: 59, 3: 68.5, 2: 78, 1: 87.5 , 0: 97},
  Platinum: { 4: 97, 3: 113.25, 2: 129.5, 1: 145.75, 0: 162},
  Emerald: { 4: 162, 3: 181, 2: 203, 1: 227 ,0: 253},
  Diamond: { 4: 253, 3: 289.24, 2: 335.86, 1: 391.28 , 0: 460  },
  Master: {4: 460  },
};

// Server, LPRange, and BoostType modifiers
export const serverModifiers: Record<Server, number> = {
  EUW: 1,
  NA: 1.2,
};

export const lpModifiers: Record<LPRange, number> = {
  '0 - 20': 1,
  '21 - 40': 1.25,
  '41 - 60': 1.66666,
  '61 - 80': 2.5,
  '81 - 100': 5,
};

export const boostModifiers: Record<BoostType, number> = {
  Solo: 1,
  Duo: 1.4,
};


// Function to calculate the price based on given parameters
export const calculatePrice = (
  startRank: Rank,
  startDivision: number,
  endRank: Rank,
  endDivision: number,
  server: Server,
  lpRange: LPRange,
  boostType: BoostType,
  priorityOrder: Boolean,
): number => {
  // Initialize variables 
  let price = 0;
  const lpMultiplier = lpModifiers[lpRange];
  const serverModifier = serverModifiers[server];
  const boostTyModifier = boostModifiers[boostType];
  const priorityOrModifier = priorityOrder ? 1.2 : 0;
  // Calculate start and end rank values based on division costs and LP range
  const startRankValue = divisionCosts[startRank][startDivision]  ; // ? 74 
  const endRankValue = divisionCosts[endRank][endDivision]; // ? 214

  const startDivisionLp = divisionCosts[startRank][startDivision - 1] - divisionCosts[startRank][startDivision];
  const priceB4lp = (endRankValue - startRankValue) - startDivisionLp;
  const updateStartDivisionLP = startDivisionLp / lpMultiplier;
  const priceAfterLp = priceB4lp + updateStartDivisionLP;
  const priceB4boostType = (endRankValue - startRankValue) * boostTyModifier;  
  const price4boostType = priceB4boostType - (endRankValue - startRankValue);
  const priceB4Server = (endRankValue - startRankValue) * serverModifier;  
  const price4Server = priceB4Server - (endRankValue - startRankValue);
  const priceB4PriorityOrder = (endRankValue - startRankValue) * priorityOrModifier;
  const price4PriorityOrder = priceB4PriorityOrder - (endRankValue - startRankValue);
  const pricePriorityOrder = priorityOrder ? price4PriorityOrder : 0;
  price = priceAfterLp + price4boostType + price4Server + pricePriorityOrder;
  

  return price;
};


const DivisionCalculator: React.FC = () => {
  const {
    startRank,
    startDivision,
    endRank,
    endDivision,
    server,
    lpRange,
    result,
    boostType,
    priorityOrder,
  } = useSelector((state: RootState) => state.calculator);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
  }, [])

  useEffect(() => {
    const calculatedPrice = calculatePrice(
      startRank as Rank,
      startDivision,
      endRank as Rank,
      endDivision,
      server as Server,
      lpRange as LPRange,
      boostType as BoostType,
      priorityOrder,
    );
    dispatch(setResult(calculatedPrice)); // Dispatch the calculated price to Redux store
  }, [endDivision, endRank, startRank, startDivision, server, lpRange, boostType, priorityOrder]);

  const banners: Record<Rank, any> = {
    Iron: BronzeBanner,
    Bronze: BronzeBanner,
    Silver: SilverBanner,
    Gold: GoldBanner,
    Platinum: PlatinumBanner,
    Emerald: EmeraldBanner,
    Diamond: DiamondBanner,
    Master: MasterBanner,
  };

  const icons: Record<Rank, any> = {
    Iron,
    Bronze,
    Silver,
    Gold,
    Platinum,
    Emerald,
    Diamond,
    Master,
  };

  const startRank1 = startRank as Rank || 'Silver';
  const endRank1 = endRank as Rank || 'Gold';

  const handleLoading = () => {
    setLoading(false);
  }
  return (
    <div className='flex flex-row max-md:flex-col md:flex-row max-md:justify-center '>
      {loading && <div className='fixed w-full h-full top-0 left-0 bg-black opacity-80 z-30 flex justify-center items-center'><div className='z-50]'><div className="flex justify-center items-center h-screen">
      <Spinner size='lg' color="primary" className="text-white"/>
</div></div></div>}
      <div className=' relative h-full max-md:mx-auto min-w-[400px] max-md:min-w-[350px] pt-4'>
        <h1 className='text-white absolute top-3 left-[40%] transform -translate-x-[59%] text-2xl'>Starting Rank</h1>
        {/* Banner */}
        <Image onLoad={handleLoading} src={banners[startRank1]} alt={`${startRank1} Banner`} className='w-[400px] relative top-0 -left-12 max-md:-left-4  max-sm:w-[360px]' />
        <Image onLoad={handleLoading} src={flag} alt={`${startRank1} Banner`} className='w-[300px] max-sm:w-[260px] absolute top-[11%] max-md:left-8' />
        <div className='absolute top-5 left-0 w-full h-full'>
          {/* Icon */}
          <Image onLoad={handleLoading}
            src={icons[startRank1]}
            alt={`${startRank1} Icon`}
            width={120}
            height={100}
            className='absolute top-[110px] left-[38%] max-lg:left-[38%] max-md:left-[45%]  transform -translate-x-1/2 -translate-y-1/2 '
          />
          <div className='left-[38%] max-lg:left-[38%] max-md:left-[45%] transform -translate-x-1/2  absolute bottom-[35%]'>
            {/* Modals */}
            <StartingRank />
            <div className='flex flex-row flex-nowrap justify-between w-full mt-[25px]'>
              <LPsModal />
              <span className='w-[30px]'>

              </span>
              <ServerModal />
            </div>
          </div>
        </div>
      </div>
      <div className=' relative h-full max-md:mx-auto min-w-[400px] max-md:min-w-[350px] pt-4'>
        <h1 className='text-white absolute top-3 left-[40%] transform -translate-x-[59%] text-2xl'>Desired Rank</h1>
        {/* Banner */}
        <Image onLoad={handleLoading} src={banners[endRank1]} alt={`${startRank1} Banner`} className='w-[400px] relative top-0 -left-12 max-md:-left-4 max-sm:w-[360px]' />
        <Image onLoad={handleLoading} src={flag} alt={`${startRank1} Banner`} className='w-[300px] max-sm:w-[260px] absolute top-[11%] max-md:left-8' />
        <div className='absolute top-5 left-0 w-full h-full'>
          {/* Icon */}
          <Image onLoad={handleLoading}
            src={icons[endRank1]}
            alt={`${startRank1} Icon`}
            width={120}
            height={100}
            className='absolute top-[110px] left-[38%] max-lg:left-[38%] max-md:left-[45%] transform -translate-x-1/2 -translate-y-1/2'
          />
          <div className='left-[38%] max-lg:left-[38%] max-md:left-[45%] transform -translate-x-1/2 -translate-y-1/2 absolute bottom-[16%]'>
            {/* Modals */}
            
            <EndingRank />
            <QueueModal />

          </div>
        </div>
      </div>
    </div>
  );
};

export default DivisionCalculator;