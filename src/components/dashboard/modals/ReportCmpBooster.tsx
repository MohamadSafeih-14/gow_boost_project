"use client"
import React, { useEffect, useState } from 'react'
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Checkbox, Textarea} from "@nextui-org/react";
import { sendReport } from 'src/lib/actions/booster_dashboard.actions';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
interface Props {}

const ReportCmpBooster = ({role}: {role: string}) => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [report, setReport] = useState('');
    const router = useRouter();
    const handleSendReport = async () => {
      if(report !== '') {
        const res = await sendReport(role, report);
        if(res.status !== 200 && res.message) {
            toast.error(res.message)
        } else if (res.status === 200 && res.message) {
            toast.success(res.message)
            router.refresh()
        }else {
            toast.success('Something Went Wrong...')
        }
      } else {
        toast.error("Please Make Sure To Fill The input")
      }
    }
  return (
    <>
      <p className='pl-4'>If you encounter any bugs with the website, feel free to <button onClick={onOpen} className='text-[#D19638]'>Report</button> them to us</p>
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
              <ModalHeader className="flex flex-col gap-1 text-center text-xl font-thin">Report</ModalHeader>
              <ModalBody>
                <textarea name="report" value={report} onChange={(e) => setReport(e.target.value)} autoFocus className='p-4 text-white text-sm bg-transparent h-[200px] w-full' placeholder='Type Your Problem...'></textarea>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose} className='bg-transparent border-red-800 text-red-800 border-2'>
                  Close
                </Button>
                <Button color="warning" className='text-white bg-[#D19638]'onPress={() => {
                    handleSendReport();
                    onClose();
                    }}>
                  Send
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

export default ReportCmpBooster