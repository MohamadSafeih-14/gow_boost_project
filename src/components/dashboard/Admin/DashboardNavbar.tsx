"use client";
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import logo from '../../../../public/images/G_5 3.png';
import profilePicture from '../../../../public/images/yoriichi.jpg';
import { getOrders } from 'src/lib/actions/admin.dashboard.actions';
import { Badge } from '@nextui-org/react';
import Orders from 'src/components/Orders';
import { resolve } from 'path';
import { toast } from 'react-toastify';
interface Props {}

interface droppedOrders {
  _id: any,
  customer_id: string,
  booster_id: string,
  orderId: string,
  reason: string,
  type: string,
  current_lp_rank_from_booster: string,
  createdAt: any,
  updatedAt: any,
  __v: number,
}
interface boosterFinished {
  _id: any,
  customer_id: string,
  booster_id: string,
  orderId: string,
  reason: string,
  type: string,
  current_lp_rank_from_booster: string,
  createdAt: any,
  updatedAt: any,
  __v: number,
}
interface boosterChanged {
  _id: any,
  customer_id: string,
  booster_id: string,
  orderId: string,
  reason: string,
  type: string,
  current_lp_rank_from_booster: string,
  createdAt: any,
  updatedAt: any,
  __v: number,
}
interface deniedOrders {
  _id: any,
  customer_id: string,
  booster_id: string,
  orderId: string,
  reason: string,
  type: string,
  current_lp_rank_from_booster: string,
  createdAt: any,
  updatedAt: any,
  __v: number,
}

interface completedOrders {
  _id: any,
  customer_id: string,
  booster_id: string,
  orderId: string,
  reason: string,
  type: string,
  current_lp_rank_from_booster: string,
  createdAt: any,
  updatedAt: any,
  __v: number,
}

interface reports {
  _id: any,
  author_name: string,
  author_id: string,
  role: string,
  report: string,
  createdAt: any,
}

const DashboardNavbar = () => {
  const [droppedOrders, setDroppedOrders] = useState<droppedOrders[]>([]);
  const [boosterChanged, setBoosterChanged] = useState<boosterChanged[]>([]);
  const [boosterFinished, setBoosterFinished] = useState<boosterFinished[]>([]);
  const [deniedOrders, setDeniedOrders] = useState<deniedOrders[]>([]);
  const [reports, setReports] = useState<reports[]>([]);
  const [completedOrders, setCompletedOrders] = useState<completedOrders[]>([]);
  useEffect(() => {
    const orders = async () => {
        const res = await getOrders();
        if(res) {
          setDroppedOrders(res.droppedOrders);
          setBoosterChanged(res.boosterChanged);
          setBoosterFinished(res.boosterFinished)
          setDeniedOrders(res.deniedOrders)
          setReports(res.reports)
          setCompletedOrders(res.completedOrders)
        } else {
          toast.error('Failed to get the orders')
        }
      }
       orders()
}, [])
  return (
    <div className='w-[20%] bg-[#060A1B] mr-[70px] min-h-[100vh] h-full pt-[80px]'>
    <div className='mx-auto w-full text-center flex justify-center flex-col items-center'>
      <div >
        <Image src={logo} width={80} alt="" className='inline-block'/>
        <span className='inline-block h-profile text-3xl glow-text align-middle font-thin'>BOOST</span>
        </div>
        <Image src={profilePicture} width={150} alt="" className='rounded-[50%] mt-[30px] border-3 border-[#00C8F4] border-solid light-blue-glow'/>
        <h1 className='text-white text-3xl text-center mt-[40px]'>Mr Gonzo</h1>
        <span className='text-center text-[#605C5C] '>#The Boss</span>
        </div>
        <div>
        <ul className='text-[#e3e3e3] text-center text-xl flex flex-col mt-[40px] font-extralight'>
            <li className='my-3'><Link href='/dashboard/admin'>Home</Link></li>
            <li className='my-3 relative'><div className='relative w-fit m-auto'><span className='text-white bg-red-700 absolute -top-2 -right-4 text-sm rounded-full w-5 h-5'>{droppedOrders.length}</span><Link href='/dashboard/admin/dropped-orders'>Dropped</Link></div></li>
            <li className='my-3 relative'><div className='relative w-fit m-auto'><span className='text-white bg-red-700 absolute -top-2 -right-4 text-sm rounded-full w-5 h-5'>{boosterChanged.length}</span><Link href='/dashboard/admin/booster-changed'>Booster Changed</Link></div></li>
            <li className='my-3 relative'><div className='relative w-fit m-auto'><span className='text-white bg-red-700 absolute -top-2 -right-4 text-sm rounded-full w-5 h-5'>{boosterFinished.length}</span><Link href='/dashboard/admin/flagged-finished'>Flagged As Finished</Link></div></li>
            <li className='my-3 relative'><div className='relative w-fit m-auto'><span className='text-white bg-red-700 absolute -top-2 -right-4 text-sm rounded-full w-5 h-5'>{deniedOrders.length}</span><Link href='/dashboard/admin/denied-orders'>Denied</Link></div></li>
            <li className='my-3 relative'><div className='relative w-fit m-auto'><span className='text-white bg-red-700 absolute -top-2 -right-4 text-sm rounded-full w-5 h-5'>{reports.length}</span><Link href='/dashboard/admin/reports'>Reports</Link></div></li>
            <li className='my-3 relative'><div className='relative w-fit m-auto'><span className='text-white bg-red-700 absolute -top-2 -right-4 text-sm rounded-full w-5 h-5'>{completedOrders.length}</span><Link href='/dashboard/admin/completed-orders'>Completed</Link></div></li>
        </ul>
        </div>
    </div>
  )
}

export default DashboardNavbar