import { Button } from '@nextui-org/react';
import React from 'react'
import { resumeOrder } from 'src/lib/actions/customer_dashboard.actions';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import resumeIcon from '../../../../public/images/icons8-start-50.png';
import Image from 'next/image';
interface Props {}

const ResumeOrder = () => {
    const router = useRouter();
    const handleResumeOrder = async () => {
        const res = await resumeOrder();
        if(res.status !== 200 && res.message) {
            toast.error(res.message)
        } else if (res.status === 200 && res.message) {
            toast.success(res.message);
            router.refresh()
        }else {
            toast.success('Something Went Wrong...')
        }
    }
  return <>
  <li className='my-3 border-2 border-green-600 cursor-pointer rounded-lg'>
        <Button onPress={() => {
            handleResumeOrder();
        }} className='bg-transparent max-2xl:text-lg text-green-600 text-xl w-full h-full rounded-none py-3 cursor-pointer font-bold'><Image src={resumeIcon} height={25} width={25} alt="resume icon"/>Resume Order</Button>
        
  </li>
  </>
}

export default ResumeOrder