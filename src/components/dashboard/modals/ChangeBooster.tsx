import React, { useState } from 'react'
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link, Textarea} from "@nextui-org/react";
import { toast } from 'react-toastify';
import { changeBooster } from 'src/lib/actions/customer_dashboard.actions';
import { useRouter } from 'next/navigation';
import changeIcon from '../../../../public/images/icons8-change-50.png';
import Image from 'next/image';
interface Props {}

const ChangeBooster = () => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [checked, setChecked] = useState(false);
    const [reason, setReason] = useState('');
    const router = useRouter();
    const [currentRankAndLp, setCurrentRankAndLp] = useState('');
    const handleChangeBooster = async () => {
        const res = await changeBooster(reason, currentRankAndLp);
        if(res.status !== 200 && res.message) {
            toast.error(res.message)
        } else if (res.status === 200 && res.message) {
            toast.success(res.message)
            router.refresh()
        }else {
            toast.success('Something Went Wrong...')
        }
}
  return <div>
    <>
        <li className='my-3 text-red-800 border-2 border-red-800 cursor-pointer rounded-lg'><Button onPress={() => {
            setChecked(false)
            setReason('')
            setCurrentRankAndLp('')
            onOpen();
        }} className='bg-transparent max-2xl:text-lg text-red-800 text-xl w-full h-full font-semibold rounded-none py-3'><Image src={changeIcon} height={25} width={25} alt="change icon"/> Change Booster</Button></li>
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
                    <p className='text-lg text-gray-400'>You can change the booster only once</p>
                    <p className='text-lg text-gray-400'>Please consider this option only in severe cases, as it will slow down the process for you and will flag the booster</p>
                    <label className='text-red-700 text-xl mt-5 font-thick'>Reason:</label>
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
                    <label className='mt-5 text-xl text-red-700'>Current Rank & LP</label>
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
                    <Checkbox checked={checked} onChange={() => setChecked(!checked)} color="success" className='mt-5 ml-7'><p className='text-white '>I fully understand what&#39;s about to happen</p></Checkbox>
                </ModalBody>
                <ModalFooter>
                    <Button color="warning" onPress={() => {
                                setChecked(false)
                                setReason('')
                                setCurrentRankAndLp('')
                                onClose();
                        }} className='bg-transparent border-[#D19638] text-[#D19638] border-2 '>
                    Close
                    </Button>
                    <Button disabled={!checked} color='warning' className={`text-white p-2 px-3 rounded-lg  ${!checked ? `cursor-not-allowed opacity-30 hover:bg-[#f0980069] text-[#ffffff39]` : ``}`} onPress={() => {
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

export default ChangeBooster