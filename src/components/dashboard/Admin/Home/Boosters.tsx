"use client";
import React, { FC, useEffect, useState } from 'react'
import { getBoosters } from 'src/lib/actions/admin.dashboard.actions';
import { toast } from 'react-toastify';
import Booster from './Booster';
interface Props {}

const Boosters = () => {
    const [boosters, setBoosters] = useState<any[]>([]);
    useEffect(() => {
      const boosters = async () => {
          const res = await getBoosters();
          if(res) {
            setBoosters(res.boosters || [])
          } else {
            toast.error('Failed to get the details')
          }
        }
         boosters()
  }, [])
  return <ul className='w-full h-full flex flex-col'>
    {boosters.map((booster: any, index: number) => {
        return (
            <li key={index}>
                <Booster booster_id={booster._id}/>
            </li>
        )
    })}
  </ul>
}

export default Boosters