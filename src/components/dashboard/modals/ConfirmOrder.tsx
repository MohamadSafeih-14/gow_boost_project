import React, { useState } from 'react'
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link, Textarea} from "@nextui-org/react";
import { toast } from 'react-toastify';
import { confirmOrder, pauseOrder } from 'src/lib/actions/customer_dashboard.actions';
import { useRouter } from 'next/navigation';
interface Props {}

const ConfirmOrder = () => {
    const router = useRouter();
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [checked, setChecked] = useState(false);
    const handleConfirmOrder = async () => {
        const res = await confirmOrder();
        if(res.status !== 200 && res.message) {
            toast.error(res.message)
        } else if (res.status === 200 && res.message) {
            toast.success(res.message)
            router.refresh()
        }else {
            toast.success('Something Went Wrong...')
        }
}
  return <>
    <Button className='text-green-700 mx-3 text-xl border-green-700 bg-transparent border-1 p-5 w-[150px]' color="success" onPress={() => {
            setChecked(false)
            onOpen();
            }}>Confirm</Button>
    <Modal 
            isOpen={isOpen} 
            onOpenChange={onOpenChange}
            placement="top-center"
            className=' border-none'
            classNames={
            {
                body: "py-8 min-h-[200px] text-center text-gray-400 bg-[#060A1B] text-white border-1 border-slate-600", 
                header: "bg-[#060A1B] text-white border-1 border-slate-600 ",
                footer: "bg-[#060A1B] text-white border-1 border-slate-600",

            }
            }
            >
            <ModalContent >
            {(onClose) => (
                <>
                <ModalHeader className="flex flex-col gap-1 text-center text-2xl font-thick text-green-700">Wait!</ModalHeader>
                <ModalBody>
                    <p className='text-lg text-white'>I have reached my desired rank and wish to close the order</p>
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" variant="flat" onPress={() => {
                                onClose();
                        }} className='bg-transparent border-red-800 text-red-800 border-2 '>
                    Close
                    </Button>
                    <Button color='success' className={`text-white p-2 px-3 rounded-lg cursor-pointer`} onPress={() => {
                              handleConfirmOrder();
                              onClose();
                    }}>
                        Confirm
                    </Button>
                </ModalFooter>
                </>
            )}
            </ModalContent>
        </Modal>
    </>
}

export default ConfirmOrder