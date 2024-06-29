import React, { useEffect } from 'react'
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Checkbox, Textarea} from "@nextui-org/react";
import Image from 'next/image';
import warning from '../../../../public/images/icons8-warning-50 (2).png';

interface Props {}

const WarningMessage = () => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    useEffect(() => {
        onOpen();
    }, [])
  return (       
  <>
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}  backdrop={'blur'} 
        classNames={{
        body: "pt-8 min-h-[200px] text-center text-gray-400",
        base: "bg-[#060A1B] text-white border-4 border-[#0b112c]",
        header: "border-b-2 border-[#D19638]",
        closeButton: "hover:bg-white/5 active:bg-white/10",
    }}>
        <ModalContent>
        {(onClose) => (
            <>
            <ModalHeader className=" flex-col text-center gap-1 text-[#D19638]  inline-block">
                <Image src={warning} height={35} width={25} alt='!' className='inline-block '/>
                <span className='inline-block align-middle px-2  text-2xl'>
                    WARNING
                </span>
                <Image src={warning} height={35} width={25} alt='!' className='inline-block '/>
            </ModalHeader>
            <ModalBody>
                <p className='text-lg'>
                 If you play ranked during the process, including while the order is paused, we respectfully reserve the right to cancel your order without the possibility of a refund. 
                </p>
                <p className='text-lg'>
                Additionally, if you provide false details in the order, we would kindly request additional payment accordingly. If you fail to provide the requested payment, we reserve the right to cancel the order without  a refund. 
                </p>
            </ModalBody>
            <ModalFooter>
                <Button color="warning" variant="light" onPress={() => {
                onClose()
                }}>
                Close
                </Button>
            </ModalFooter>
            </>
        )}
        </ModalContent>
    </Modal>
</>
)
}

export default WarningMessage