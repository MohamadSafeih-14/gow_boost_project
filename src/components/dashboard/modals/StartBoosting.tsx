import React, { useState } from 'react'
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link, Textarea} from "@nextui-org/react";
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import pauseIcon from '../../../../public/images/icons8-pause-50 (1).png';
import Image from 'next/image';
import { startBoosting } from 'src/lib/actions/booster_dashboard.actions';
interface Props {}

const StartBoosting = () => {
    const router = useRouter();
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [checked, setChecked] = useState(false);
    const handleStartBoosting = async () => {
        const res = await startBoosting();
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
            <li className='my-3 text-red-800 border-1 border-[#38d187] cursor-pointer'><Button onPress={() => {
            setChecked(false)
            onOpen();
            }} className='bg-transparent max-2xl:text-lg text-[#38d187] text-xl w-full h-full rounded-none py-3 cursor-pointer'>Lock In The Order</Button></li>
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
                <ModalHeader className="flex flex-col gap-1 text-center text-2xl font-thick text-[#38d187]">Wait!</ModalHeader>
                <ModalBody>
                    <p className='text-lg text-center text-white mb-5'>The Customer Has provided me with his Username/Password and they work fine</p>
                    <Checkbox color="success" checked={checked} onChange={() => setChecked(!checked)}  className='mt-5 ml-7'><p className='text-white '>I Agree</p></Checkbox>
                </ModalBody>
                <ModalFooter>
                    <Button variant="bordered" onPress={() => {
                                setChecked(false)
                                onClose();
                        }} className='bg-transparent border-2 border-[#38d187] text-[#38d187]'>
                    Close
                    </Button>
                    <Button disabled={!checked} color='primary' className={`text-white p-2 px-3 rounded-lg  ${!checked ? `cursor-not-allowed opacity-30 hover:bg-[#0070f069] text-[#ffffff39]` : ``}`} onPress={() => {
                        if(checked) {
                              setChecked(false);
                              handleStartBoosting();
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

export default StartBoosting