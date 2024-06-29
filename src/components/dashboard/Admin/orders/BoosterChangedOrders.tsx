"use client";
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getOrders } from 'src/lib/actions/admin.dashboard.actions';
import BoosterChanged from './order/BoosterChanged';

interface Props {}

const BoosterChangedOrders = () => {
  const [boosterChanged, setBoosterChanged] = useState<any[]>([]);
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await getOrders();
        if (res?.boosterChanged !== undefined && res?.boosterChanged) {
            let orders: any[] = [];
            res.boosterChanged.map((order) => {
            orders.push(JSON.stringify(order))
            setBoosterChanged(orders);
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
        {boosterChanged.map((order: any) => {
        return (
        <BoosterChanged key={JSON.parse(order)._id} order={order} />
      )})}
  </div>
}

export default BoosterChangedOrders