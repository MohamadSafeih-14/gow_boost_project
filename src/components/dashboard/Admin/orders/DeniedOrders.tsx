"use client";
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getOrders } from 'src/lib/actions/admin.dashboard.actions';
import DeniedOrder from './order/DeniedOrder';

interface Props {}

const DeniedOrders = () => {
  const [deniedOrders, setDeniedOrders] = useState<any[]>([]);
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await getOrders();
        if (res?.deniedOrders !== undefined && res?.deniedOrders) {
            let orders: any[] = [];
            res.deniedOrders.map((order) => {
            orders.push(JSON.stringify(order))
            setDeniedOrders(orders);
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
      {deniedOrders.map((order: any) => {
        return (
        <DeniedOrder key={JSON.parse(order)._id} order={order} />
      )})}
  </div>
}

export default DeniedOrders