"use client";
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getOrders } from 'src/lib/actions/admin.dashboard.actions';
import FinishedOrder from './order/FinishedOrder';

interface Props {}

const FlaggedAsFinishedOrders = () => {
  const [boosterFinished, setBoosterFinished] = useState<any[]>([]);
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await getOrders();
        if (res?.boosterFinished !== undefined && res?.boosterFinished) {
            let orders: any[] = [];
            res.boosterFinished.map((order) => {
            orders.push(JSON.stringify(order))
            setBoosterFinished(orders);
        })
    } else {
        toast.error('Failed to fetch dropped orders');
    }
      } catch (error) {
        console.error('Error fetching dropped orders:', error);
        toast.error('Failed to fetch dropped orders');
      }
    };

    fetchOrders();
  }, []);

  return <div className='w-full h-fit text-center pb-[100px]'>
       {boosterFinished.map((order: any) => {
        return (
        <FinishedOrder key={JSON.parse(order)._id} order={order} />
      )})}
  </div>
}

export default FlaggedAsFinishedOrders