import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from '@nextui-org/react';
import { setLpRange } from '../../../store/slices/calculatorSlice'; // Import your setLpRange action creator
import { RootState } from '../../../store/slices/rootReducer';
import { Rank } from '../Calc';
const LPsModal: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const lpOptions = ['0 - 20', '21 - 40', '41 - 60', '61 - 80', '81 - 100'];
  const {
    lpRange,
    startRank
  } = useSelector((state: RootState) => state.calculator);
  const handleLpRangeChange = (selectedLpRange: string) => {
    dispatch(setLpRange(selectedLpRange)); // Dispatch the selected LP range to Redux store
    onClose(); // Close the modal after selection
  };
  

  const ranksBorder: Record<Rank, any> = {
    Bronze: 'border-[#7B4844]',
    Silver: 'border-[#57656C]',
    Gold: 'border-[#855F30]',
    Platinum: 'border-[#198468]',
    Emerald: 'border-[#1DAF84]',
    Diamond: 'border-[#3F66E2]',
    Iron: 'border-[#7B4844]',
    Master: 'border-[#7B4844]'
  }
  const ranksBackground: Record<Rank, any> = {
    Bronze: 'bg-[#2D1B1A]',
    Silver: 'bg-[#333333]',
    Gold: 'bg-[#34260B]',
    Platinum: 'bg-[#0B3429]',
    Emerald: 'bg-[#193B31]',
    Diamond: 'bg-[#001aff26]',
    Iron: 'bg-[#422826]',
    Master: 'border-[#7B4844]'
  }

  const border = ranksBorder[startRank as Rank || 'Iron']; // Using 'Iron' as a default if startRank is undefined
  const background = ranksBackground[startRank as Rank || 'Iron']; // Using 'Iron' as a default if startRank is undefined
  return (
    <div className="flex flex-col items-center">
      <p className="text-white text-lg">Current LP</p>
      <Button onClick={onOpen} className={`uppercase relative border-1 ${border} text-white text-2xl rounded-sm ${background} w-[110px] shadow-buttons-2 h-[45px]`}>
      {lpRange || '0 - 20'} <span className='transform rotate-90 text-[25px] font-light'>&gt;</span>
      </Button>

      <Modal backdrop="blur" isOpen={isOpen} onClose={onClose}>
        <ModalContent className="bg-[#020512] text-white overflow-hidden max-w-[500px] max-h-[350px]">
          <ModalHeader className="text-white text-2xl font-bold">Choose LPs</ModalHeader>
          <ModalBody className="flex flex-row gap-2 overflow-x-hidden">
            {lpOptions.map((option) => (
              <Button
                key={option}
                variant="flat"
                onClick={() => handleLpRangeChange(option)} // Handle LP range change on click
                className="capitalize bg-transparent text-white text-xl"
              >
                {option}
              </Button>
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

export default LPsModal;
