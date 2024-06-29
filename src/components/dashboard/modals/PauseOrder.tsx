import React, { useState } from 'react'
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link, Textarea} from "@nextui-org/react";
import { toast } from 'react-toastify';
import { pauseOrder } from 'src/lib/actions/customer_dashboard.actions';
import { useRouter } from 'next/navigation';
import pauseIcon from '../../../../public/images/icons8-pause-50 (1).png';
import Image from 'next/image';
interface Props {}

const PauseOrder = () => {
    const router = useRouter();
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [checked, setChecked] = useState(false);
    const handlePauseOrder = async () => {
        const res = await pauseOrder();
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
            <li className='my-3 text-red-800 border-2 border-[#D19638] cursor-pointer rounded-lg'><Button onPress={() => {
            setChecked(false)
            onOpen();
            }} className='bg-transparent max-2xl:text-lg text-[#D19638] text-xl w-full h-full rounded-none py-3 cursor-pointer'><Image src={pauseIcon} height={25} width={25} alt="pause icon"/>Pause Order</Button></li>
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
                <ModalHeader className="flex flex-col gap-1 text-center text-2xl font-thick text-[#D19638]">Wait!</ModalHeader>
                <ModalBody>
                    <p className='text-lg text-center text-white mb-5'>You have the option to pause your order anytime, but please remember two important rules:</p>
                    <p className='text-medium text-left pl-4 text-gray-400 font-thin'>1- Kindly inform the booster before pausing.</p>
                    <p className='text-medium text-left pl-4 text-gray-400 font-thin'>2- Avoid playing ranked matches entirely; violating this may lead to order cancellation without refund.</p>
                    <Checkbox color="success" checked={checked} onChange={() => setChecked(!checked)}  className='mt-5 ml-7'><p className='text-white '>I Understand</p></Checkbox>
                </ModalBody>
                <ModalFooter>
                    <Button variant="bordered" onPress={() => {
                                setChecked(false)
                                onClose();
                        }} className='bg-transparent border-2 border-[#D19638] text-[#D19638]'>
                    Close
                    </Button>
                    <Button disabled={!checked} color='warning' className={`text-white p-2 px-3 rounded-lg  ${!checked ? `cursor-not-allowed opacity-30 hover:bg-[#f0980069] text-[#ffffff39]` : ``}`} onPress={() => {
                        if(checked) {
                              setChecked(false);
                              handlePauseOrder();
                              onClose();
                        }
                    }}>
                        Confirm
                    </Button>
                </ModalFooter>
                </>
            )}
            </ModalContent>
        </Modal></>
}

export default PauseOrder