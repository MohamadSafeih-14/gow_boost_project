import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from '@nextui-org/react';
import { setEndRank, setEndDivision } from '../../../store/slices/calculatorSlice';
import Iron from '../../../../public/images/ranks/iron.webp';
import Bronze from '../../../../public/images/ranks/bronze.webp';
import Silver from '../../../../public/images/ranks/silver.webp';
import Gold from '../../../../public/images/ranks/gold.webp';
import Platinum from '../../../../public/images/ranks/platinum.webp';
import Emerald from '../../../../public/images/ranks/emerald.webp';
import Diamond from '../../../../public/images/ranks/diamond.webp';
import Master from '../../../../public/images/ranks/master.webp';
import Image from 'next/image';
import { RootState } from 'src/store/slices/rootReducer';
import { toast } from 'react-toastify';

const EndingRank: React.FC = () => {

  const {
    startRank,
    startDivision,
    endDivision,
    endRank,
    result,
  } = useSelector((state: RootState) => state.calculator);

  
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isEndRankValid, setEndRankValid,] = useState('valid' || "invalid");
  const dispatch = useDispatch();
  type Rank = 'Iron' | 'Bronze' | 'Silver' | 'Gold' | 'Platinum' | 'Emerald' | 'Diamond' | 'Master';
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

  const handleEndRankAndDivisionChange = (selectedRank: string, selectedDivision: string) => {
    const ranks = ranksWithDivisions.map(item => item.rank); // Extract ranks
    const divisions = ranksWithDivisions.map(item => item.divisions);
    const getEndRank = ranks.indexOf(selectedRank); 
    const getStartRank = ranks.indexOf(startRank); 
    if (getEndRank < getStartRank || getEndRank === getStartRank && Number(selectedDivision) >= startDivision) {
      if(getEndRank === getStartRank && Number(selectedDivision) >= startDivision) {

        toast.error("End Division Is Invalid")
      } else {
        toast.error("End Rank Is Invalid")
      }
    } else {
      dispatch(setEndRank(selectedRank));
      dispatch(setEndDivision(parseInt(selectedDivision)));
      setEndRankValid('valid');
      onClose();
    }
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

  const getImageForRank = (rank: Rank): string => {
    return icons[rank];
  };
  
const ranksBorder: Record<Rank, any> = {
  Bronze: 'border-[#7B4844]',
  Silver: 'border-[#57656C]',
  Gold: 'border-[#855F30]',
  Platinum: 'border-[#198468]',
  Emerald: 'border-[#1DAF84]',
  Diamond: 'border-[#3F66E2]',
  Iron: 'border-[#7B4844]',
  Master: 'border-[#5A2BE1]'
}

const ranksBackground: Record<Rank, any> = {
  Bronze: 'bg-[#422826]',
  Silver: 'bg-[#3C3C3C]',
  Gold: 'bg-[#46330E]',
  Platinum: 'bg-[#134C3C]',
  Emerald: 'bg-[#27584A]',
  Diamond: 'bg-[#001aff26]',
  Iron: 'bg-[#422826]',
  Master: 'bg-[#422694]'
}

const border = ranksBorder[endRank as Rank || 'Silver']; // Using 'Iron' as a default if startRank is undefined
const background = ranksBackground[endRank as Rank || 'Gold']; // Using 'Iron' as a default if startRank is undefined
  return (
    <div className="flex flex-col items-center">
      <p className="text-white text-lg mb-2">Select Rank</p>
      <Button onClick={onOpen} className={`uppercase relative border-1 ${border} text-white text-2xl rounded-sm ${background} shadow-buttons h-[45px] mb-[65px]`}>
       {endRank || 'Bronze'} {endRank === 'Master' ? '' : endDivision || '4'} <span className='transform rotate-90 text-[25px] font-light'>&gt;</span>    
      </Button>

      <Modal backdrop="blur" isOpen={isOpen} onClose={onClose} className=''>
        <ModalContent className="bg-[#020512] text-white overflow-hidden max-w-[1600px] max-h-[700px]">
          <ModalHeader className="text-white text-2xl font-bold">Choose Rank and Division  {isEndRankValid === 'invalid' ? <div className='absolute text-red-800 text-lg left-[50%]  z-40 -translate-x-[50%]'>
              desired rank is not valid
            </div>: <></>}</ModalHeader>
          <ModalBody className="flex flex-row justify-between overflow-x-hidden relative">

          {ranksWithDivisions.map(({ rank, divisions }) => (
            <div className="flex flex-row" key={rank}>

              <div className="flex flex-col gap-2">
              <Image
                src={getImageForRank(rank as Rank)}
                alt={`${rank} icon`}
                width={100}
                height={87.5}
                className="  inline-block h-[88px]" // Adjust width and height based on your icon size
              />
                {divisions.map((division) => (
                  <Button
                    key={division}
                    variant="flat"
                    onClick={() => handleEndRankAndDivisionChange(rank, division)}
                    className="capitalize bg-transparent text-white text-xl"
                  >
                    {rank} {rank === 'Master' ? <span className='hidden'>{division}</span> : <>{division}</>}
                  </Button>
                ))}
              </div>
            </div>
          ))}
          </ModalBody>
          <ModalFooter>
            <Button color="warning" variant="light" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default EndingRank;
