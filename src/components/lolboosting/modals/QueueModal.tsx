import React from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from '@nextui-org/react';
import { setQueueType } from '../../../store/slices/calculatorSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/store/slices/rootReducer';
import { Rank } from '../Calc';

const QueueModal: React.FC = () => {
  // Use NextUI's useDisclosure hook to manage modal state
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const {
    queueType,
    endRank,
  }= useSelector((state: RootState) => state.calculator);
  // Available queueTypes options
  const queueOption = ['Solo/Duo', 'Flex'];

  // Function to handle queueTypes selection
  const handleQueueChange = (selectedQueue: string) => {
    dispatch(setQueueType(selectedQueue)); // Dispatch the selected queueType to Redux store
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

const border = ranksBorder[endRank as Rank || 'Iron']; // Using 'Iron' as a default if startRank is undefined
const background = ranksBackground[endRank as Rank || 'Iron']; // Using 'Iron' as a default if startRank is undefined
  return (
    <div className="flex flex-col items-center">
      {/* Display queueType label */}
      <p className="text-white text-lg mb-1">Queue Type</p>

      {/* Button to open the modal */}
      <Button onClick={onOpen} className={`uppercase relative border-1 ${border} text-white text-2xl rounded-sm ${background} w-[150px] shadow-buttons h-[45px]`}>
        {queueType || 'Solo/Duo'} <span className='transform rotate-90 text-[25px] font-light'>&gt;</span>
      </Button>

      {/* Modal for selecting queueType */}
      <Modal backdrop="blur" isOpen={isOpen} onClose={onClose}>
        <ModalContent className="bg-[#020512] text-white overflow-hidden max-w-[500px] max-h-[350px]">
          {/* Modal header */}
          <ModalHeader className="text-white text-2xl font-bold">Choose Queue Type</ModalHeader>

          {/* Modal body with queueType options */}
          <ModalBody className="flex flex-row gap-2 overflow-x-hidden">
            {queueOption.map(option => (
              <Button
                key={option}
                variant="flat"
                onClick={() => handleQueueChange(option)}
                className="capitalize bg-transparent text-white text-xl"
              >
                {option}
              </Button>
            ))}
          </ModalBody>

          {/* Modal footer with close button */}
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

export default QueueModal;
