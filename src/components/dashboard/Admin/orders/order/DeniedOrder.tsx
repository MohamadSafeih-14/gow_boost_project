"use client";
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { completeOrder, getOrderDetails, sendBackToOrdeList, sendMessage } from 'src/lib/actions/admin.dashboard.actions';
import writeMessage from '../../../../../../public/images/icons8-write-message-48.png';
import editOrderImg from '../../../../../../public/images/icons8-edit-48.png';
import requestDetails from '../../../../../../public/images/icons8-request-service-50.png';
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, cn} from "@nextui-org/react";
import WriteMessage from '../../modals/WriteMessage';
import { editOrder } from 'src/lib/actions/admin.dashboard.actions';
interface Props {
  _id: any,
  customer_id: string,
  booster_id: string,
  orderId: string,
  reason: string,
  type: string,
  current_lp_rank_from_booster: string,
  current_lp_rank_from_customer: string,
  createdAt: any,
}

const DeniedOrder = ({order}: {order: string}) => {
  const [displayModal, setDisplayModal] = useState(false);
  const [displayOrderModal, setDisplayOrderModal] = useState(false);
  const [displayDetailsModal, setDisplayDetailsModal] = useState(false);
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [message, setMessage] = useState('');
  const [startingRank, setStartingRank] = useState('');
  const [startingDivision, setStartingDivision] = useState('');
  const [server, setServer] = useState('');
  const [lp, setLp] = useState('');
  const [price, setPrice] = useState(0);
  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const res = await getOrderDetails(JSON.parse(JSON.stringify(order)), "denied");
        if (res) {
          setOrderDetails(res); // Assuming res is already a plain object
        } else {
          toast.error('Failed to fetch order details');
        }
      } catch (error) {
        console.error('Error fetching order details:', error);
        toast.error('Failed to fetch order details 34');
      }
    };

    fetchOrderDetails();

  }, []); // Include orderId in the dependency array


  const handleSendMessage = async () => {
    if(message !== '') {
      const res = await sendMessage(message, orderDetails.customer_id);
      if(res.status === 200) {
        toast.success(res.message)
        setDisplayModal(false)
      } else {
          toast.error(res.message)
      }
    } else {
      toast.error("Please Make Sure To Fill The Input")
    }
}

  const handleCompleteOrder = async () => {
      const res = await completeOrder(orderDetails.orderId, "denied_order");
      if(res.status === 200) {
        toast.success(res.message)
        setDisplayModal(false)
      } else {
          toast.error(res.message)
      }
}

  const handleEditOrder = async () => {
    if(startingRank !== '' && startingDivision !== '' && price !== 0 && lp !== '' && server !== '') {
      const res = await editOrder(orderDetails.orderId, startingRank, startingDivision, price * 100, server, lp);
      if(res.status === 200) {
        toast.success(res.message)
        setDisplayOrderModal(false)
      } else {
          toast.error(res.message)
      }
    } else {
      toast.error("Please Make Sure To Fill The Input")
    }
}

  const handleSendBackToOrderList = async () => {
    const res = await sendBackToOrdeList(orderDetails.orderId);
    if(res.status === 200) {
      toast.success(res.message)
      setDisplayOrderModal(false)
    } else {
        toast.error(res.message)
    }
  } 
  return (
    <div className='bg-[#060A1B] rounded-xl text-white mt-16 p-10'>
          {displayModal ? <div className='w-[600px] min-h-[400px] bg-[#060912]  fixed z-10 top-[50%] left-[50%] transform -translate-y-[50%] -translate-x-[50%] text-white rounded-xl p-9'>
          <div className='w-full h-full relative'>
              <span className='text-white text-xl cursor-pointer inline-block absolute -top-5 -right-3' onClick={() => setDisplayModal(false)}>x</span>
              <h1 className='text-2xl mb-8'>Write A Message For Customer</h1>
              <textarea className='text-white text-lg border-1 border-gray-600 outline-none w-[80%] bg-transparent p-3' value={message} onChange={(e) => setMessage(e.target.value)}/>
              <Button onClick={handleSendMessage} color="primary" className='mt-[150px]'>Send Message</Button>
          </div>
        </div> : <></>}
        {displayOrderModal ? <div className='w-[600px] min-h-[400px] bg-[#060912]  fixed z-10 top-[50%] left-[50%] transform -translate-y-[50%] -translate-x-[50%] text-white rounded-xl p-9'>
        <span className='text-white text-xl cursor-pointer inline-block absolute top-3 right-5' onClick={() => setDisplayOrderModal(false)}>x</span>
        <h1 className='text-2xl mb-8'>Edit Order</h1>

                <label className='block'>Starting Rank</label>
                <input className='text-white text-medium border-1 m-auto my-3 border-gray-600 outline-none w-[50%] min-h-[30px] bg-transparent p-3' value={startingRank}  onChange={(e) => setStartingRank(e.target.value)}/>

                <label className='block'>Starting Division</label>
                <input className='text-white text-medium border-1 m-auto my-3 border-gray-600 outline-none w-[50%] min-h-[30px] bg-transparent p-3' value={startingDivision}  onChange={(e) => setStartingDivision(e.target.value)}/>

                <label className='block'>Lp</label>
                <input className='text-white text-medium border-1 m-auto my-3 border-gray-600 outline-none w-[50%] min-h-[30px] bg-transparent p-3' value={lp} onChange={(e) => setLp(e.target.value)}/>

                <label className='block'>Server</label>
                <input className='text-white text-medium border-1 m-auto my-3 border-gray-600 outline-none w-[50%] min-h-[30px] bg-transparent p-3' value={server}  onChange={(e) => setServer(e.target.value)}/>

                <label className='block'>price</label>
                <input className='text-white text-medium border-1 m-auto my-3 border-gray-600 outline-none w-[50%] min-h-[30px] bg-transparent p-3' value={price}  onChange={(e) => setPrice(Number(e.target.value))}/>
                <Button onClick={handleEditOrder} className='block mt-5 mx-auto' color="primary">Save Order</Button>
        </div> : <></>}


        {displayDetailsModal ? <div className='w-[600px] min-h-[400px] bg-[#060912]  fixed z-10 top-[50%] left-[50%] transform -translate-y-[50%] -translate-x-[50%] text-white rounded-xl p-9'>
        <span className='text-white text-xl cursor-pointer inline-block absolute top-1 right-5' onClick={() => setDisplayDetailsModal(false)}>x</span>
              <h1 className='text-3xl mb-8 '>Details</h1>
              <label className=' text-gray-600 text-medium'>Reason</label>
              <p className='mb-6 text-cyan-500 text-lg'>{orderDetails.reason}</p>
              <label className=' text-gray-600 text-medium'>Current Rank & Lp From Booster</label>
              <p className='mb-6 text-cyan-500 text-lg'>{orderDetails.current_lp_rank_from_booster || 'no details'}</p>
              <label className=' text-gray-600 text-medium'>Current Rank & Lp From Customer</label>
              <p className='mb-6 text-cyan-500 text-lg'>{orderDetails.current_lp_rank_from_customer || 'no details'}</p>
        </div> : <></>}



      {orderDetails ? (
        <div className='flex flex-col w-full relative'>
              <Dropdown backdrop="blur" className='border-none bg-transparent outline-none text-lg'>
              <DropdownTrigger>
              <Button
                  color="primary"
                  className='absolute top-2 -right-5 px-1 '
                  variant="ghost" 
                >
                  options
                </Button>
              </DropdownTrigger>
              <DropdownMenu variant="faded" aria-label="Static Actions" className='bg-[#0a112f] text-white border-none outline-none p-3 text-lg'>
                <DropdownItem key="new" startContent={<Image src={writeMessage} width={30} height={30} alt='write message'/>} onClick={() => setDisplayModal(true)}>Write Message</DropdownItem>
                <DropdownItem key="copy" className='my-0.5' startContent={<Image src={requestDetails} width={30} height={30} alt='request details' />} onClick={() => setDisplayDetailsModal(true)}>Request Details</DropdownItem>
                <DropdownItem key="edit" startContent={<Image src={editOrderImg} width={30} height={30} alt='edit order'/>} onClick={() => {
                  setStartingRank(orderDetails.starting_rank)
                  setStartingDivision(orderDetails.starting_division)
                  setServer(orderDetails.server)
                  setPrice(orderDetails.price / 100)
                  setLp(orderDetails.lp)
                  setDisplayOrderModal(true)
                  }}>Edit Order</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          {/* row 1 */}
          <div className='flex flex-row flex-nowrap justify-center'>
            <div className='p-3 mx-10 w-[20%] text-center'>
              <img className='w-[70px] h-[70px] block rounded-[100%] mb-2 mx-auto' src={orderDetails.booster_img} alt='booster_img'/>
              <h3 className='text-2xl'>{orderDetails.booster_username}</h3>
              <span className=' text-gray-700 text-medium'>Booster</span>
            </div>
            <div className='p-3 mx-10 w-[20%] text-center'>
            <img className='w-[70px] h-[70px] block rounded-[100%] mb-2 mx-auto' src={orderDetails.customer_img} alt='customer_img'/>
            <h3 className='text-2xl'>{orderDetails.customer_username}</h3>
            <span className=' text-gray-700 text-medium'>Customer</span>
            </div>
          </div>
          {/* row 2 */}
          <div className='flex flex-row flex-nowrap justify-evenly my-10'>
            <div className='w-[30%] m-auto'>
              <h3 className=' text-white text-2xl text-center'>{orderDetails.starting_rank + ' ' + orderDetails.starting_division}</h3>
              <span className=' text-gray-700 text-medium'>Starting Rank</span>
            </div>
            <div className='w-[30%] m-auto'>
            <h3 className=' text-white text-2xl text-center'>{orderDetails.ending_rank + ' ' + orderDetails.ending_division}</h3>
              <span className=' text-gray-700 text-medium'>Ending Rank</span>
            </div>
            <div className='w-[30%] m-auto'>
              <h3 className=' text-white text-2xl text-center'>{orderDetails.orderId}</h3>
              <span className=' text-gray-700 text-medium'>Order Id</span>
            </div>
          </div>
          {/* row 3 */}
          <div className='flex flex-row flex-nowrap justify-evenly my-10'>
            <div className='w-[30%] m-auto'>
              <h3 className=' text-white text-2xl text-center'>{orderDetails.server}</h3>
              <span className=' text-gray-700 text-medium'>Server</span>
            </div>
            <div className='w-[30%] m-auto'>
            <h3 className=' text-white text-2xl text-center'>{orderDetails.lp}</h3>
              <span className=' text-gray-700 text-medium'>Lp</span>
            </div>
            <div className='w-[30%] m-auto'>
            <h3 className=' text-white text-2xl text-center'>{`${orderDetails.server === "EUW" ? "€" : "$"}${orderDetails.price / 100}`}</h3>
              <span className=' text-gray-700 text-medium'>Price</span>
            </div>
          </div>
          <div className=' text-center'>
            <p className=' text-teal-400 text-xl border-teal-400 border-1 p-4 w-fit mb-2 mx-auto'>{orderDetails.openGG}</p>
            <span className='text-gray-700 text-medium'>OpenGG</span>
          </div>
          <div className='w-full flex justify-between'>
            <div className='text-left inline-block w-[20%]'>
              <p className='text-lg text-white'>{orderDetails.createdAt ? new Date(orderDetails.createdAt).toLocaleDateString() : "No date for this order"}</p>
              <span className='text-medium text-gray-600'>Order Date</span>
            </div>
            <Button color="primary" className='mt-5 w-[20%] text-lg' onClick={handleSendBackToOrderList}>Send Back To Order List</Button>
            <Button color="danger" className='mt-5 w-[20%] text-lg' onClick={handleCompleteOrder}>Complete Order</Button>
            <div className='text-right inline-block w-[20%]'>
              <p className='text-lg text-white'>{orderDetails.requestDate ? new Date(orderDetails.requestDate).toLocaleDateString() : "No date for this order"}</p>
              <span className='text-medium text-gray-600'>Finished Date</span>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading order details...</p>
      )}
    </div>
  );
};

export default DeniedOrder;
