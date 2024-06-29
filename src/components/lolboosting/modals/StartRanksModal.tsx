import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setStartRank, setStartDivision, setEndRank, setEndDivision } from '../../../store/slices/calculatorSlice';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from '@nextui-org/react';
import Iron from '../../../../public/images/ranks/iron.webp';
import Bronze from '../../../../public/images/ranks/bronze.webp';
import Silver from '../../../../public/images/ranks/silver.webp';
import Gold from '../../../../public/images/ranks/gold.webp';
import Platinum from '../../../../public/images/ranks/platinum.webp';
import Emerald from '../../../../public/images/ranks/emerald.webp';
import Diamond from '../../../../public/images/ranks/diamond.webp';
import Image from 'next/image';
import { RootState } from 'src/store/slices/rootReducer';
import { toast } from 'react-toastify';

const StartingRank: React.FC = () => {
  const {
    endRank,
    endDivision,
    startRank,
    startDivision,
  } = useSelector((state: RootState) => state.calculator);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [invalid, setInvalid] = useState(false)
  const dispatch = useDispatch();
  type Rank = 'Iron' | 'Bronze' | 'Silver' | 'Gold' | 'Platinum' | 'Emerald' | 'Diamond';
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

  const getAdjustedEndRank = (startRank: string) => {
    const ranks = ranksWithDivisions.map(item => item.rank); // Extract ranks
    const startIndex = ranks.indexOf(startRank); // Find index of start rank
    if (startIndex === -1) {
      return ''; // Invalid start rank
    }
  
    const adjustedIndex = startIndex + 1;
    if(ranks[adjustedIndex]) {
      return ranks[adjustedIndex];
    } else {
      return ranks[startIndex];
    }
  };
  

  const handleStartRankAndDivisionChange = (selectedRank: string, selectedDivision: string) => {
    // ? get the ranks and indexes

    const ranks = ranksWithDivisions.map(item => item.rank); 

    const getEndRank = ranks.indexOf(endRank); 

    const startRankIndex = ranksWithDivisions.findIndex(({ rank }) => rank === selectedRank);
     if (endDivision >= startDivision && startRankIndex === getEndRank) {
        toast.error("Start Division Is Invalid")
     } else {
      // * check if the start rank is higher than end rank apply the logic
      if (startRankIndex > getEndRank) {

        dispatch(setStartRank(selectedRank));

        dispatch(setStartDivision(parseInt(selectedDivision)));

        dispatch(setEndRank(getAdjustedEndRank(selectedRank)));

        dispatch(setEndDivision(4));
    } else {

        dispatch(setStartRank(selectedRank));

        dispatch(setStartDivision(parseInt(selectedDivision)));
    }
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
}

const ranksBackground: Record<Rank, any> = {
    Bronze: 'bg-[#422826]',
    Silver: 'bg-[#3C3C3C]',
    Gold: 'bg-[#46330E]',
    Platinum: 'bg-[#134C3C]',
    Emerald: 'bg-[#27584A]',
    Diamond: 'bg-[#001aff26]',
    Iron: 'bg-[#422826]',
}

const border = ranksBorder[startRank as Rank || 'Iron']; // Using 'Iron' as a default if startRank is undefined
const background = ranksBackground[startRank as Rank || 'Iron']; // Using 'Iron' as a default if startRank is undefined
  return (
    <div className="flex flex-col items-center ">
      <p className="text-white text-lg mb-2">Select Rank</p>
      <Button onClick={onOpen} className={`uppercase relative border-1 ${border} text-white text-2xl rounded-sm ${background} shadow-buttons h-[45px] mb-[40px]`}>
        { startRank || 'Bronze'} {startDivision || 'IV'} <span className='transform rotate-90 text-[25px] font-light'>&gt;</span>
      </Button>

      <Modal backdrop="blur" isOpen={isOpen} onClose={onClose}>
        <ModalContent className="bg-[#020512] text-white overflow-hidden max-w-[1600px] max-h-[700px]">
          <ModalHeader className="text-white text-2xl font-bold">Choose Rank and Division</ModalHeader>
          <ModalBody className="flex flex-row justify-between overflow-x-hidden max-lg:overflow-x-scroll">
          {ranksWithDivisions.map(({ rank, divisions }) => (
            <div className={`${rank === "Master" ? 'hidden' : 'flex flex-row'}`} key={rank}>

              <div className="flex flex-col gap-2">
              <Image
                src={getImageForRank(rank as Rank)}
                alt={`${rank} icon`}
                width={100}
                height={87.5}
                className="  inline-block h-[88px] mx-auto" // Adjust width and height based on your icon size
              />
                {divisions.map((division) => (
                  <Button
                    key={division}
                    variant="flat"
                    onClick={() => handleStartRankAndDivisionChange(rank, division)}
                    className="capitalize bg-transparent text-white text-xl"
                  >
                    {rank} {division}
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

export default StartingRank;
