import React, { useState } from 'react'
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link, Textarea} from "@nextui-org/react";
import { toast } from 'react-toastify';
import { denieOrder, pauseOrder } from 'src/lib/actions/customer_dashboard.actions';
import { useRouter } from 'next/navigation';
interface Props {}

const DenieOrder = () => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [reason, setReason] = useState('');
    const router = useRouter()
    const handleDenieOrder = async () => {
        const res = await denieOrder(reason);
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
    <Button className='text-red-700 mx-3 text-xl border-red-700 bg-transparent border-1 p-5 w-[150px]' color="danger" onPress={() => {
            onOpen();
     }}>Denie</Button>
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
                <ModalHeader className="flex flex-col gap-1 text-center text-2xl font-thick text-red-800">Wait!</ModalHeader>
                <ModalBody>
                    <p className='text-lg text-gray-400'>I have not reached my desired rank and request the admins to check the order</p>
                    <label className='text-red-700 text-xl mt-5 font-thick'>Reason for deny:</label>
                    <div className='w-full'>
                    <Textarea
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        autoFocus
                        variant="bordered"
                        placeholder="Type The Reason..."
                        disableAnimation
                        disableAutosize
                        classNames={{
                            base: "max-w-xs mx-auto change-border mb-3",
                            input: "resize-y min-h-[70px] w-[100%] p-1 text-[14px] ",
                        }}
                    />
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" variant="flat" onPress={() => {
                                setReason('')
                                onClose();
                        }} className='bg-transparent border-red-800 text-red-800 border-2 '>
                    Close
                    </Button>
                    <Button color='danger' className={`text-white p-2 px-3 rounded-lg`} onPress={() => {
                            if (reason === '') {
                                toast.error("Please make sure to fill the inputs correctly")
                            } else {
                                handleDenieOrder();
                                setReason('')
                                onClose();
                            }
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

export default DenieOrder