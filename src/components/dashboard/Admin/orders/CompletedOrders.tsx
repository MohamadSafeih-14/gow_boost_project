"use client";
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getOrders } from 'src/lib/actions/admin.dashboard.actions';
import CompletedOrder from './order/CompletedOrder';

const CompletedOrders = () => {
  const [completedOrders, setCompletedOrders] = useState<any[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await getOrders();
        if (res?.completedOrders !== undefined && res?.completedOrders) {
            let orders: any[] = [];
            res.completedOrders.map((order) => {
            orders.push(JSON.stringify(order))
            setCompletedOrders(orders);
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
      {completedOrders.map((order: any) => {
        return (
        <CompletedOrder key={JSON.parse(order)._id} order={order} />
      )})}
    </div>
  );
};

export default CompletedOrders;
