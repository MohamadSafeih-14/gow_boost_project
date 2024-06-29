import React, { useEffect, useState } from 'react'
import {Button, useDisclosure} from "@nextui-org/react";
import { toast } from 'react-toastify';
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Checkbox, Input, Link, Textarea} from "@nextui-org/react";
import { acceptBoosterChange } from 'src/lib/actions/booster_dashboard.actions';
import { useRouter } from 'next/navigation';

interface Props {}

const BoosterChanged = () => {
const {isOpen, onOpen, onOpenChange} = useDisclosure();
const router = useRouter();
const [currentRankAndLp, setCurrentRankAndLp] = useState('');
const [showModal, setShowModal] = useState(false);

const toggleModal = () => {
    setShowModal(!showModal);
};
  
const acceptChange = async () => {
    if(currentRankAndLp === '') {
        toast.error("Please Make Sure To Fill The Input")
    } else {
        const res = await acceptBoosterChange(currentRankAndLp);
        if(res.status === 200) {
            toast.success(res.message)
            router.refresh();
        } else {
            toast.error(res.message)
            setShowModal(!showModal)
        }
    }
}

  return  (
    <div>
      {/* Button to toggle modal */}
      <Button
        onPress={() => onOpen()}
        className="block text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        color='danger'
        type="button"
        data-modal-target="authentication-modal"
        data-modal-toggle="authentication-modal"
      >
        Delete Order
      </Button>
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
                    <p className='text-lg text-gray-400'>Enter The Latest Rank The Account Was Before You got changed (make sure it&#39;s accurate This is very important)</p>
                    <div className='w-full'>
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
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" variant="flat" onPress={() => {
                                setCurrentRankAndLp('')
                                onClose();
                        }} className='bg-transparent border-red-800 text-red-800 border-2 '>
                    Close
                    </Button>
                    <Button color='primary' className={`text-white p-2 px-3 rounded-lg`} onPress={() => {
                            if (currentRankAndLp === '') {
                                toast.error("Please make sure to fill the inputs correctly")
                            } else {
                                acceptChange();
                                setCurrentRankAndLp('')
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
      {/* Main modal */}
      </div>
  );
}

export default BoosterChanged