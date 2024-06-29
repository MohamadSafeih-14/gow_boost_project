import React from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from '@nextui-org/react';
import { setServer1 } from '../../../store/slices/calculatorSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/store/slices/rootReducer';
import { Rank } from '../Calc';
const ServerModal: React.FC = () => {
  // Use NextUI's useDisclosure hook to manage modal state
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const {
    server,
    startRank
  }= useSelector((state: RootState) => state.calculator);
  // Available server options
  const serverOptions = ['EUW', 'NA'];

  // Function to handle server selection
  const handleServerChange = (selectedServer: string) => {
    dispatch(setServer1(selectedServer)); // Dispatch the selected server to Redux store
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
      {/* Display server label */}
      <p className="text-white text-lg">Server</p>

      {/* Button to open the modal */}
      <Button onClick={onOpen} className={`uppercase relative border-1 ${border} text-white text-2xl rounded-sm ${background} w-[110px] shadow-buttons-2 h-[45px]`}>
        {server || 'EUW'} <span className='transform rotate-90 text-[25px] font-light'>&gt;</span>
      </Button>

      {/* Modal for selecting server */}
      <Modal backdrop="blur" isOpen={isOpen} onClose={onClose}>
        <ModalContent className="bg-[#020512] text-white overflow-hidden max-w-[500px] max-h-[350px]">
          {/* Modal header */}
          <ModalHeader className="text-white text-2xl font-bold">Choose Server</ModalHeader>

          {/* Modal body with server options */}
          <ModalBody className="flex flex-row gap-2 overflow-x-hidden">
            {serverOptions.map(option => (
              <Button
                key={option}
                variant="flat"
                onClick={() => handleServerChange(option)}
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

export default ServerModal;
