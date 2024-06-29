"use client";
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getOrders } from 'src/lib/actions/admin.dashboard.actions';
import DroppedOrder from './order/DroppedOrder';

const DroppedOrders = () => {
  const [droppedOrders, setDroppedOrders] = useState<any[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await getOrders();
        if (res?.droppedOrders !== undefined && res?.droppedOrders) {
            let orders: any[] = [];
            res.droppedOrders.map((order) => {
            orders.push(JSON.stringify(order))
            setDroppedOrders(orders);
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

  return (
    <div className='w-full h-fit text-center pb-[100px]'>
      {droppedOrders.map((order: any) => {
        return (
        <DroppedOrder key={JSON.parse(order)._id} order={order} />
      )})}
    </div>
  );
};

export default DroppedOrders;
