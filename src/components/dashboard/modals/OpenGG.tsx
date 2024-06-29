"use client"
import React, { useEffect, useState } from 'react'
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Checkbox, Textarea} from "@nextui-org/react";
import {MailIcon} from '../MailIcon';
import {LockIcon} from '../LockIcon';
import { addOpenGGLink } from 'src/lib/actions/customer_dashboard.actions';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

interface Props {}

const OpenGG = () => {
    const router = useRouter();
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [openGGLink, setOpenGGLink] = useState('');

    const handleAddingOpenGGLink = async () => {
        const data = await addOpenGGLink(openGGLink)
        if (data.status === 200) {
            router.refresh()
            return toast.success(data.message)
          } else {
            return toast.error(data.message)
          } 
    }
  return (
    <>
      <div className='w-full text-center flex flex-col justify-center items-center h-[60%]'>
        <h1 className='text-green-800 text-4xl font-bold'>Please add the opengg link to continue</h1>
        <Button className='block bg-[#D19638] text-white mt-[30px]' onPress={onOpen}>Add The Link</Button>
      </div>
      <Modal 
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
        placement="top-center"
        className=' border-none'
        classNames={
         {
            body: "py-8 min-h-[200px] text-center text-gray-400 bg-[#060A1B] text-white border-1 border-slate-600", 
            header: "bg-[#060A1B] text-white border-1 border-slate-600",
            footer: "bg-[#060A1B] text-white border-1 border-slate-600",

         }
        }
        >
        <ModalContent >
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-center text-xl font-thin">OpenGG Link</ModalHeader>
              <ModalBody>
                <input name="opengg" required onChange={(e) => setOpenGGLink(e.target.value)} value={openGGLink} autoFocus className='p-4 text-white bg-transparent h-[50px] w-full border-1 outline-none' placeholder='Add The OpenGG Link...' />
              </ModalBody>
              <ModalFooter>
                <Button color="warning" className='text-white bg-[#D19638]'onPress={() => {
                    if (openGGLink !== '') {
                        handleAddingOpenGGLink()
                        onClose()                 
                    } else {
                        toast.error('please fill the the input')
                    }
                    }}>
                  Add
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

export default OpenGG