"use client";
import React, { useEffect, useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from '@nextui-org/react';
import Image from 'next/image';
import Iron from '../../../../public/images/ranks/iron.webp';
import Bronze from '../../../../public/images/ranks/bronze.webp';
import Silver from '../../../../public/images/ranks/silver.webp';
import Gold from '../../../../public/images/ranks/gold.webp';
import Platinum from '../../../../public/images/ranks/platinum.webp';
import Emerald from '../../../../public/images/ranks/emerald.webp';
import Diamond from '../../../../public/images/ranks/diamond.webp';
import Master from '../../../../public/images/ranks/master.webp'
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { editProgress } from 'src/lib/actions/booster_dashboard.actions';

interface Props {}

type Rank = 'Iron' | 'Bronze' | 'Silver' | 'Gold' | 'Platinum' | 'Emerald' | 'Diamond' | 'Master';
const divisionCosts: Record<Rank, Record<number, number>> = {
  Iron: { 4: 0, 3: 4, 2: 8, 1: 12, 0: 16 },
  Bronze: { 4: 16, 3: 20.75, 2: 25.5, 1: 30.25, 0: 35 },
  Silver: { 4: 35, 3: 41, 2: 47, 1: 53 , 0: 59 },
  Gold: { 4: 59, 3: 68.5, 2: 78, 1: 87.5 , 0: 97 },
  Platinum: { 4: 97, 3: 113.25, 2: 129.5, 1: 145.75, 0: 162 },
  Emerald: { 4: 162, 3: 181, 2: 203, 1: 227 ,0: 253 },
  Diamond: { 4: 253, 3: 289.24, 2: 335.86, 1: 391.28 , 0: 460 },
  Master: {4: 460},
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

const BoostingProgress = ({ starting_rank, starting_division, ending_rank, ending_division }: { starting_rank: Rank, starting_division: number, ending_division: number, ending_rank: Rank }) => {
  const [newRanks, setNewRanks] = useState<any[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [activeDivision, setActiveDivision] = useState<string>('');
  const [currentRank, setCurrentRank] = useState<string>('');
  const [currentDivision, setCurrentDivision] = useState<string>('');
  const router = useRouter();
  const ranks = ranksWithDivisions.map(item => item.rank);
  const divisions = ranksWithDivisions.map(item => item.divisions);
  const startRankIndex = ranks.indexOf(starting_rank);
  const endRankIndex = ranks.indexOf(ending_rank);
  const getRank = ranks.filter((item, index) => index >= startRankIndex && index <= endRankIndex);
  const getDivisions = divisions.filter((item, index) => index >= startRankIndex && index <= endRankIndex);
  const handleStartRankAndDivisionChange = (rank: string, division: string) => {
    if(activeDivision === rank + division) {
      setActiveDivision('')
    } else {
      setCurrentRank(rank);
      setCurrentDivision(division);
      setActiveDivision(rank + division);
    }
  };


  const handleSendCurrentRankAndDivision = async () => {
    const res = await editProgress(currentRank, currentDivision);
    if(res.status !== 200 && res.message) {
        toast.error(res.message)
    } else if (res.status === 200 && res.message) {
        toast.success(res.message)
        onClose();
        router.refresh()
      }else {
        toast.success('Something Went Wrong...')
    }
  }
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
  const ranksArr: any[] = [];
  getRank.map((item, index) => {
    const rank = {
      rank: item,
      divisions: item === starting_rank ? divisions[index].filter((item) => +item <= starting_division) : item === ending_rank ? divisions[index].filter((item) => +item >= ending_division) : ['4', '3', '2', '1']
    }

    ranksArr.push(rank)
  })

  useEffect(() => {
    setNewRanks(ranksArr)
  }, [])

  return (
    <div className="">
      <li className='my-3 text-green-600 border-1 border-green-600 cursor-pointer'>
        <Button onPress={() => {
          setActiveDivision('');
          setCurrentRank('');
          setCurrentDivision('');
          onOpen();
        }} className='bg-transparent text-green-600 text-xl w-full h-full rounded-none py-3'>
          Edit Order Progress
        </Button>
      </li>

      <Modal backdrop="blur" isOpen={isOpen} onClose={onClose}>
        <ModalContent className="bg-[#020512] text-white overflow-hidden max-w-[1600px] max-h-[700px]">
          <ModalHeader className="text-white text-2xl font-bold">Choose Rank and Division</ModalHeader>
          <ModalBody className="flex flex-row justify-evenly overflow-x-hidden max-lg:overflow-x-scroll">
            {newRanks.map(({ rank, divisions }) => (
              <div className={`${rank === "Master" ? '' : 'flex flex-row'}`} key={rank}>
                <div className="flex flex-col gap-2">
                  <Image
                    src={getImageForRank(rank as Rank)}
                    alt={`${rank} icon`}
                    width={100}
                    height={87.5}
                    className="  inline-block h-[88px] mx-auto" // Adjust width and height based on your icon size
                  />
                  {divisions.map((division: any) => (
                    <Button
                      key={division}
                      variant="flat"
                      onClick={() => handleStartRankAndDivisionChange(rank, division)}
                      className={`capitalize bg-transparent text-white text-xl ${rank + division === activeDivision ? 'text-green-300 bg-green-950' : ''}`}
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
            <Button color="primary" onPress={handleSendCurrentRankAndDivision} isDisabled={activeDivision ? false : true}>
              Confirm
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default BoostingProgress;
