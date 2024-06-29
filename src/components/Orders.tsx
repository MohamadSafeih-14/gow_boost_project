'use client'
import { Button } from '@nextui-org/react'
import { redirect, useRouter } from 'next/navigation';
import { totalmem } from 'os';
import React, { useEffect ,useState} from 'react'
import { toast } from 'react-toastify';
import { handleClaimOrder } from 'src/lib/actions/order.actions';
interface Props {}

interface orderDetails {
    _id: string,
    customer_id: string,
    starting_rank: string,
    starting_division: string,
    ending_rank: string,
    ending_division: string,
    server: string,
    lp: string,
    boost_type: string,
    status: string,
    price: string,
}

const Orders =  ({orders}: {orders: any}) => {
    const [isClient, setIsClient] = useState(false)
    const router = useRouter();
    useEffect(() => {
      setIsClient(true)
    }, [])
   
    const handleClaimOrderClient = async (orderId: string) => {
        const res = await handleClaimOrder(orderId);

        if(res.status === 200) {
            toast.success("Your Have Claimed An Order!")
            router.push('/dashboard/booster')
        } else if (res.status === 400) {
            toast.error(res.message)
        } else {
            toast.error(res.message)
        }
    }
  return <div className='w-[80%] flex justify-center flex-col h-fit mx-auto'>
    {orders.map((order: {
            _id: string,
            customer_id: string,
            starting_rank: string,
            starting_division: string,
            ending_rank: string,
            ending_division: string,
            server: string,
            lp: string,
            boost_type: string,
            addons: any,
            status: string,
            price: string,
            createdAt: any,
    }) => {
        return(
            <>
            <div className='bg-[#070b20] text-white w-[50%] mx-auto min-h-[100px] my-[20px] p-[25px] rounded-lg shadow-lg '>
                <div className='w-full h-full flex flex-row'>
                    <div className='w-1/3 h-fit text-center text-white text-lg'>
                        <div className='mb-[10px]'><span className='text-[#D19638] '>Starting Rank</span> <br/> {`${order.starting_rank} ${order.starting_division}`}</div>
                        <div><span className='text-[#D19638] '>Ending Rank</span>  <br/> {`${order.ending_rank} ${order.ending_division}`}</div>
                    </div>
                    <div className='w-1/3 h-fit text-center text-white text-lg'>
                        <div className='mb-[10px]'><span className='text-[#D19638] '>Server</span> <br/> {order.server}</div>
                        <div><span className='text-[#D19638] '>Status</span> <br/> {order.status}</div>
                    </div>
                    <div className='w-1/3 h-fit text-center text-white text-lg'>
                        <div className='mb-[10px]'><span className='text-[#D19638] '>Order Id</span> <br/> {order._id}</div>
                        <div><span className='text-[#D19638] '>Order Cost</span> <br/> {`$${Number(order.price) / 100}`}</div>
                    </div>
                </div>
                <div className='text-left my-2'><span className='text-gray-600 block mb-1 mt-5'>Order Date: </span><p>{order.createdAt && isClient ? order.createdAt.toLocaleDateString() : "No date for this order"}</p></div>
                <div className='w-full flex-col justify-center mx-auto'>
                        <h1 className='text-2xl text-[#D19638] mt-5 text-center block'>Addons: </h1>
                        <div className='block w-full mx-auto'>
                          {order.addons.spells ?  <Button color='warning' variant='ghost' className=' text-white my-4 w-fit mx-2'>Summoner Spells</Button> : <></>}
                          {order.addons.offlineVpn ?  <Button color='warning' variant='ghost' className=' text-white my-4 w-fit mx-2'>Offline Mode & Vpn</Button> : <></>}
                          {order.addons.priorityOrder ?  <Button color='success' variant='ghost' className=' text-white mt-4 w-fit mx-2'>Priority Order</Button> : <></>}
                          {order.addons.queueType ?  <Button color='primary' variant='ghost' className=' text-white mt-4 w-fit mx-2'>Queue Type: {order.addons.queueType}</Button> : <></>}
                        </div>
                 </div>
                <Button onClick={() => handleClaimOrderClient(order._id)} className='w-[100%] bg-[#0073B4] mx-auto rounded-lg text-white text-xl mt-[25px]'>Claim Order</Button>
            </div>
            </>
        )
    })}
  </div>
}

export default Orders