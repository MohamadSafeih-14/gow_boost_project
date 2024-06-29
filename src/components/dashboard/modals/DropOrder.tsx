import React, { useState } from 'react'
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link, Textarea} from "@nextui-org/react";
import { toast } from 'react-toastify';
import { changeBooster } from 'src/lib/actions/customer_dashboard.actions';
import { dropOrder } from 'src/lib/actions/booster_dashboard.actions';

interface Props {}

const DropOrder = () => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [currentRankAndLp, setCurrentRankAndLp] = useState('');
    const [checked, setChecked] = useState(false);
    const [reason, setReason] = useState('');
    const handleChangeBooster = async () => {
        const res = await dropOrder(reason, currentRankAndLp);
        if(res.status !== 200 && res.message) {
            toast.error(res.message)
        } else if (res.status === 200 && res.message) {
            toast.success(res.message)
        }else {
            toast.success('Something Went Wrong...')
        }
}
  return <div> 
    <>
        <li className='my-3 text-red-800 border-1 border-red-800 cursor-pointer'><Button onPress={() => {
            setChecked(false)
            setReason('')
            setCurrentRankAndLp('')
            onOpen();
        }} className='bg-transparent text-red-800 text-xl w-full h-full rounded-none py-3'>Drop Order</Button></li>
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
                <ModalHeader className="flex flex-col gap-1 text-center text-2xl font-thick text-[#02A4FF]">Wait!</ModalHeader>
                <ModalBody>
                    <p className='text-lg text-gray-400'>refrain from dropping an order unless it&#39;s urgent, such as being unable to complete it for any reason, experiencing unexpected delays, being on a loss streak, or feeling uncomfortable with the customer</p>
                    <p className='text-lg text-red-800'>You may only drop one order every 24 hours</p>
                    <label className='text-white text-xl font-thick mt-3'>Reason:</label>
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
                            base: "max-w-xs mx-auto change-border mb-5",
                            input: "resize-y min-h-[70px] w-[100%] p-1 text-[14px] ",
                        }}
                    />
                    <label className='mt-5 text-xl text-white'>Current Rank & LP</label>
                    <Input
                        value={currentRankAndLp}
                        onChange={(e) => setCurrentRankAndLp(e.target.value)}
                        autoFocus
                        variant="bordered"
                        placeholder="Current Rank & LP"
                        disableAnimation
                        classNames={{
                            base: "max-w-xs mx-auto change-border mt-3 rounded-xl",
                            input: "resize-y h-fit w-[100%] p-1 text-[16px] border-none outline-none font-light tracking-wider rounded-xl",
                        }}
                    />
                    </div>
                    <Checkbox checked={checked} color="success" onChange={() => setChecked(!checked)} className='mt-5 ml-7'><p className='text-white '>I fully understand what&#39;s about to happen</p></Checkbox>
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" variant="flat" onPress={() => {
                                setChecked(false)
                                setReason('')
                                setCurrentRankAndLp('')
                                onClose();
                        }} className='bg-transparent border-[#02A4FF] text-[#02A4FF] border-2 '>
                    Close
                    </Button>
                    <Button disabled={!checked} color='primary' className={`text-white p-2 px-3 rounded-lg  ${!checked ? `cursor-not-allowed opacity-30 hover:bg-[#0070f069] text-[#ffffff39]` : ``}`} onPress={() => {
                        if(checked) {
                            if (reason === '' || currentRankAndLp === '') {
                                toast.error("Please make sure to fill the inputs correctly")
                            } else {
                                handleChangeBooster();
                                setChecked(false)
                                setReason('')
                                setCurrentRankAndLp('')
                                onClose();
                            }
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
  </div>
}

export default DropOrder