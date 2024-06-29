import React, { useState } from 'react';
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link, Textarea} from "@nextui-org/react";
import { toast } from 'react-toastify';
import { finishOrder } from 'src/lib/actions/booster_dashboard.actions';
import { useRouter } from 'next/navigation';
interface Props {}

const FinishOrder = () => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [currentRankAndLp, setCurrentRankAndLp] = useState('');
    const router = useRouter();
    const handleFinishOrder = async () => {
        const res = await finishOrder(currentRankAndLp);
        if(res.status !== 200 && res.message) {
            toast.error(res.message)
        } else if (res.status === 200 && res.message) {
            toast.success(res.message);
            router.refresh();
        }else {
            toast.success('Something Went Wrong...')
        }
    }
  return <>
        <li className='my-3 text-[#02A4FF] border-1 border-[#02A4FF] cursor-pointer'>
                <Button onPress={() => {
                    setCurrentRankAndLp('')
                    onOpen();
                }} className='bg-transparent text-[#02A4FF] text-xl w-full h-full rounded-none p-3'>Finish Order</Button>
        </li>

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
            <ModalHeader className="flex flex-col gap-1 text-center text-2xl font-thick text-green-600">Wait!</ModalHeader>
            <ModalBody>
                <p className='text-lg text-gray-400'>You confirm that you have achieved the desired rank of the customer</p>
                <div className='w-full'>
                <label className='mt-5 text-xl text-white'>Current Rank & LP</label>
                <Input
                    value={currentRankAndLp}
                    onChange={(e) => setCurrentRankAndLp(e.target.value)}
                    autoFocus
                    variant="bordered"
                    placeholder="Current Rank & LP"
                    disableAnimation
                    classNames={{
                        base: "max-w-xs mx-auto change-border mt-3",
                        input: "resize-y h-fit w-[100%] p-1 text-[16px] border-none outline-none font-light tracking-wider",
                    }}
                />
                </div>
            </ModalBody>
            <ModalFooter>
                <Button color="success" variant="flat" onPress={() => {
                            setCurrentRankAndLp('')
                            onClose();
                    }} className='bg-transparent border-green-600 text-green-600 border-2 '>
                Close
                </Button>
                <Button color='success' className={`text-white p-2 px-3 rounded-lg`} onPress={() => {
                        if (currentRankAndLp === '') {
                            toast.error("Please make sure to fill the input correctly")
                        } else {
                            handleFinishOrder();
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

export default FinishOrder