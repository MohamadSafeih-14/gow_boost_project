"use client";
import { Button } from '@nextui-org/react';
import React, { FC, useEffect, useState } from 'react'
import { editWallet, getBoosterDetails } from 'src/lib/actions/admin.dashboard.actions';
import { toast } from 'react-toastify';
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Checkbox, Input, Link, Textarea} from "@nextui-org/react";
import { useRouter } from 'next/navigation';
interface booster {
    username: string,
    wallet: string,
}

const Booster = ({booster_id}: {booster_id: string}) => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [booster, setBooster] = useState<booster>();
    const [boosterImage, setBoosterImage] = useState("");
    const [wallet, setWallet] = useState('');
    const router = useRouter();
    useEffect(() => {
        const getDetails = async () => {
            const res = await getBoosterDetails(booster_id);
            if(res) {
              setBooster(res.booster || {});
              setBoosterImage(res.boosterImage || "");
            } else {
              toast.error('Failed to get the details')
            }
        }
        getDetails();
    }, [])

    const handleEditWallet = async () => {
        const res = await editWallet(booster_id, wallet);
        if(res.status === 200 && res.message) {
            toast.success(res.message)
            router.refresh()
        } else {
            toast.error(res.message)
        }
      }
  return <div className='w-full p-5 flex flex-row flex-nowrap justify-between text-white'>
        <img className='w-[50px] rounded-[100%]' src={boosterImage}/>
        <h2 className='text-xl align-middle pt-3'>{booster ? booster.username : 'Booster'}</h2>
        <Button className='bg-transparent text-white text-lg' onPress={() => {
            setWallet(booster ? booster.wallet : "$0")
            onOpen();
        }}>{booster ? booster.wallet : 0}</Button>
        <>
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
                    <label className='text-white text-xl mt-5 font-thick'>Message:</label>
                    <div className='w-full'>
                    <Input
                        value={wallet}
                        onChange={(e) => setWallet(e.target.value)}
                        autoFocus
                        variant="bordered"
                        placeholder="Type The Message..."
                        disableAnimation
                        classNames={{
                            base: "max-w-xs mx-auto change-border mb-3",
                            input: "resize-y min-h-[70px] w-[100%] p-1 text-[14px] ",
                        }}
                    />
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" variant="flat" onPress={() => {
                                onClose();
                        }} className='bg-transparent border-red-800 text-red-800 border-2 '>
                    Close
                    </Button>
                    <Button color='primary' className={`text-white p-2 px-3 rounded-lg text-medium`} onPress={() => {
                                if(wallet.indexOf("$") !== 0) {
                                    toast.error("Please Maksure To Add $ Sign")
                                } else {
                                    handleEditWallet();
                                    onClose();
                                }
                    }}>
                        Send
                    </Button>
                </ModalFooter>
                </>
            )}
            </ModalContent>
        </Modal>
  </>
  </div> 
}

export default Booster