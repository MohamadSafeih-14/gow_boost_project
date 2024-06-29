import { CircularProgress } from '@nextui-org/react';
import React from 'react'
import Image from 'next/image';
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
import {Progress} from "@nextui-org/react";

interface Props {}

export type Rank = 'Iron' | 'Bronze' | 'Silver' | 'Gold' | 'Platinum' | 'Emerald' | 'Diamond' | 'Master';
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

const ranksWithDivisions = [
  { rank: 'Iron', divisions: ['4', '3', '2', '1'] },
  { rank: 'Bronze', divisions: ['4', '3', '2', '1'] },
  { rank: 'Silver', divisions: ['4', '3', '2', '1'] },
  { rank: 'Gold', divisions: ['4', '3', '2', '1'] },
  { rank: 'Platinum', divisions: ['4', '3', '2', '1'] },
  { rank: 'Emerald', divisions: ['4', '3', '2', '1'] },
  { rank: 'Diamond', divisions: ['4', '3', '2', '1'] },
  { rank: 'Master', divisions: ['4'] },
];


const BoostingProgress = ({starting_rank, starting_division, ending_rank, ending_division, current_rank, current_division}: {starting_rank: Rank, starting_division: number, ending_rank: Rank, ending_division: number, current_rank: Rank, current_division: number}) => {
  
  const ranks = ranksWithDivisions.map(item => item.rank);
  const startRankIndex = ranks.indexOf(starting_rank);
  const currentRankIndex = ranks.indexOf(current_rank);
  if(startRankIndex > currentRankIndex) {
    current_rank = starting_rank
    current_division = starting_division
  }
  const startRankValue = divisionCosts[starting_rank][starting_division]  ;
  const endRankValue = divisionCosts[ending_rank][ending_division];
  const currentRankValue = divisionCosts[current_rank || 'Iron'][current_division || 4]
  const progress = endRankValue - startRankValue;
  const currentProgress = endRankValue - currentRankValue;
  console.log(startRankIndex, currentRankIndex)
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
  // Function to calculate percentage
    function calculatePercentage(currentProgress: number, progress: number) {

        return (currentProgress / progress) * 100;
      }
      const percentage = 100 - (calculatePercentage(currentProgress, progress));

  return <div className='w-full h-full p-8 flex max-lg:justify-center flex-col '>
            <div className='flex w-full h-fit flex-row max-lg:flex-col justify-between'>
          <div className='w-[32%] max-lg:w-full max-lg:my-2 mx-auto text-white h-[300px] max-xl:h-[150px] bg-[#0c122a] rounded-lg flex items-center ustify-center flex-col'>
              <div className='h-[70%] pt-4'>
                <Image src={icons[starting_rank]} width={120} height={120} alt='rank' className='max-2xl:w-[100px] max-2xl:h-[100px] max-xl:w-[80px] max-xl:h-[80px]'/>
              </div>
              <h1 className='text-2xl h-[30%] max-xl:text-lg max-2xl:text-xl'>Starting Rank</h1>
          </div>
          <div className='w-[32%] max-lg:w-full max-lg:my-2 mx-auto text-white h-[300px] max-xl:h-[150px] bg-[#D19638]  rounded-lg flex items-center ustify-center flex-col'>
            <div className='h-[70%] pt-4'>
              <Image src={icons[current_rank]} width={120} height={120} alt='rank' className='max-2xl:w-[100px] max-2xl:h-[100px] max-xl:w-[80px] max-xl:h-[80px]'/>
            </div>
              <h1 className='text-2xl h-[30%] max-xl:text-lg max-2xl:text-xl'>Current Rank</h1>
          </div>
          <div className='w-[32%] max-lg:w-full max-lg:my-2 mx-auto text-white h-[300px] max-xl:h-[150px] bg-[#0c122a] rounded-lg flex items-center ustify-center flex-col'>
            <div className='h-[70%] pt-4'>
              <Image src={icons[ending_rank]} width={120} height={120} alt='rank' className='max-2xl:w-[100px] max-2xl:h-[100px] max-xl:w-[80px] max-xl:h-[80px]'/>
            </div>
              <h1 className='text-2xl h-[30%] max-xl:text-lg max-2xl:text-xl'>Ending Rank</h1>
          </div>
        </div>
        <div className='block w-full pt-5 px-[1%]'>
            <Progress value={percentage} showValueLabel={true} color='success' className='text-white'/>
        </div>
    {/* {percentage < 0 || percentage > 100 || !currentRankValue && !current_rank && !current_division ? <CircularProgress className=' text-white' classNames={{svg: 'w-36 h-36', value: "text-2xl", label: "text-xl"}} color="primary" label={"Order Progress"} value={0} showValueLabel={true} aria-label="Loading..."/> : <CircularProgress className=' text-white' classNames={{svg: 'w-36 h-36', value: "text-2xl", label: "text-xl"}} color="primary" label={"Order Progress"} value={percentage} showValueLabel={true} aria-label="Loading..."/>} */}
    
  </div>
}

export default BoostingProgress