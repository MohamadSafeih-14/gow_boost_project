"use client";
import { Button } from '@nextui-org/react';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { acceptReport, getUserImage } from 'src/lib/actions/admin.dashboard.actions';
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Checkbox, Input, Link, Textarea} from "@nextui-org/react";

interface Props {}
interface reports {
    _id: any,
    author_name: string,
    author_id: string,
    role: string,
    report: string,
    createdAt: any,
  }
  
const Report = ({report}: {report: any}) => {
  report = JSON.parse(report)
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [userImage, setUserImage] = useState("");
  const [message, setMessage] = useState('');
  useEffect(() => {
    const handleGetUserImage = async () => {
      const res = await getUserImage(report.author_clerkId);
      console.log(res.image)
      if(res.status !== 200 && res.message) {
        toast.error(res.message)
      } else {
        setUserImage(res?.image || '');
      }
   }
   handleGetUserImage();
  }, [])

  const handleAcceptReport = async () => {
    const res = await acceptReport(report._id, message);
    if(res.status !== 200 && res.message) {
        toast.error(res.message)
    } else if (res.status === 200 && res.message) {
        toast.success(res.message)
    }else {
        toast.success('Something Went Wrong...')
    }
  }
  return <div className=' text-white text-lg bg-[#060A1B] rounded-xl mt-16 p-10'>
    <div className='flex flex-col flex-nowrap justify-center'>
            <div className='p-3 mx-10 w-[100%] text-center'>
              <img className='w-[70px] h-[70px] block rounded-[100%] mb-2 mx-auto' src={`${userImage}`} alt='img'/>
                <h3 className='text-2xl inline-block pr-2 capitalize text-gray-600'>{report.role} : </h3>
                <h3 className='text-2xl inline-block'>{report.author_name}</h3>
            </div>
            <div className='w-full p-3 mx-10'>
                <h1 className='text-white text-xl block text-center mb-3'>
                  Reason: 
                </h1>
                <p className='text-gray-400 border-2 text-left border-gray-800 p-2 pl-5'>
                  {report.report}
                </p>
                <h3 className='mt-4 text-left'>
                  <span className='text-gray-600'>Report Date: </span>
                  <span className='text-white'>{report.createdAt ? new Date(report.createdAt).toLocaleDateString() : "No date for this report"}</span>
                </h3>
            <Button onClick={() => {
             setMessage('');
             onOpen();
            }
            } color='danger' className='text-lg px-10 mx-auto mt-5'>Accept Report</Button>
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
                    <Textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        autoFocus
                        variant="bordered"
                        placeholder="Type The Message..."
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
                                setMessage('')
                                onClose();
                        }} className='bg-transparent border-red-800 text-red-800 border-2 '>
                    Close
                    </Button>
                    <Button color='primary' className={`text-white p-2 px-3 rounded-lg text-medium`} onPress={() => {
                            if (message === '') {
                                toast.error("Please make sure to fill the inputs correctly")
                            } else {
                                handleAcceptReport();
                                setMessage('')
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
    </div>
  </div>
}

export default Report 