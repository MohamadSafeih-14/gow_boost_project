import React from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from '@nextui-org/react';
import { setBoostType } from '../../../store/slices/calculatorSlice';
import { useDispatch } from 'react-redux';

const BoostTypeModal: React.FC = () => {
  // Use NextUI's useDisclosure hook to manage modal state
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();

  // Available server options
  const serverOptions = ['Solo', 'Duo'];

  // Function to handle server selection
  const handleBoostTypeChange = (selectedBoostType: string) => {
    dispatch(setBoostType(selectedBoostType)); // Dispatch the selected server to Redux store
    onClose(); // Close the modal after selection
  };

  return (
    <div className="flex flex-col items-center">
      {/* Display boost type label */}
      <p className="text-white text-lg">Boost type</p>

      {/* Button to open the modal */}
      <Button onClick={onOpen} className="capitalize relative border-1 border-[#3F6BF5] text-white text-xl rounded-md bg-[#001aff3b]">
         Boost type
      </Button>

      {/* Modal for selecting boost type */}
      <Modal backdrop="blur" isOpen={isOpen} onClose={onClose}>
        <ModalContent className="bg-[#020512] text-white overflow-hidden max-w-[500px] max-h-[350px]">
          {/* Modal header */}
          <ModalHeader className="text-white text-2xl font-bold">Choose Server</ModalHeader>

          {/* Modal body with boost type options */}
          <ModalBody className="flex flex-row gap-2 overflow-x-hidden">
            {serverOptions.map(option => (
              <Button
                key={option}
                variant="flat"
                onClick={() => handleBoostTypeChange(option)}
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

export default BoostTypeModal;
