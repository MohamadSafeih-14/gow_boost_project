"use client";
import React, { FC, useEffect, useState } from 'react'
import { getDetails } from 'src/lib/actions/admin.dashboard.actions';
import { toast } from 'react-toastify';

interface Props {}

const Details = () => {
    const [orders, setOrders] = useState(0);
    const [summoners, setSummoners] = useState(0);
    const [boosters, setBoosters] = useState(0);
    useEffect(() => {
      const details = async () => {
          const res = await getDetails();
          if(res) {
            setOrders(res.orders || 0)
            setSummoners(res.summoners || 0)
            setBoosters(res.boosters || 0)
          } else {
            toast.error('Failed to get the details')
          }
        }
         details()
  }, [])
  return <div className='bg-[#060A1B] my-8 rounded-[25px] h-fit text-white p-10 text-center w-fit'>
        <ul className='flex flex-row flex-nowrap justify-between'>
            <li>
            <div>
                <h3 className='text-xl h-profile'>Orders</h3>
                <span>{orders}</span>
            </div>
            </li>
            <li className='mx-16'>
            <div>
                <h3 className='text-xl h-profile'>Summoners</h3>
                <span>{summoners}</span>
            </div>
            </li>
            <li>
            <div>
                <h3 className='text-xl h-profile'>Boosters</h3>
                <span>{boosters}</span>
            </div>
            </li>
        </ul>
</div>
}

export default Details