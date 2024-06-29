'use client'
import React, { FC } from 'react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import arrowImage from '../../../public/images/icons8-left-arrow-50 (1).png'
import iconMenu from '../../../public/images/icons8-menu-100.png';
import Container from '../Chat_booster/Container';
import { toast } from 'react-toastify';
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Checkbox} from "@nextui-org/react";
import iconClose from '../../../public/images/icons8-close-50.png';
import warning from '../../../public/images/icons8-warning-50.png';
import { acceptMessage, activateBoosting, disableBoosting } from 'src/lib/actions/booster_dashboard.actions';
import BoosterChanged from './modals/BoosterChanged';
import { useRouter } from 'next/navigation';
import DropOrder from './modals/DropOrder';
import FinishOrder from './modals/FinishOrder';
import ReportCmpBooster from './modals/ReportCmpBooster';
import BoostingProgress from './modals/BoostingProgress';
import StartBoosting from './modals/StartBoosting';

const BoosterCmp = ({user, order, customer, userfromDB, adminsOrder}: {user: any, order: any, customer: any, userfromDB: any, adminsOrder: any}) => {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [showBoosterCmp, setShowBoosterCmp] = useState(false);

  const handleButtonClick = () => {
      setShowBoosterCmp(true); // Toggle the state when the button is clicked

  };
  if(customer) {customer = JSON.parse(customer)}else{customer = null};
  if(order) {order = JSON.parse(order)}else{order = {}};  
  if(adminsOrder) {adminsOrder = JSON.parse(adminsOrder)}else{adminsOrder = null};  
  if(adminsOrder) {adminsOrder = adminsOrder;}else{adminsOrder = null ;};  
  if(order) { order = order; } else { order = {}; }
  const router = useRouter()
  user = JSON.parse(user);
  userfromDB = JSON.parse(userfromDB);
  useEffect(() => {
    if(user && customer && userfromDB) {
      toast.success(`Welcome To Your Dashboard`, {
        autoClose: 1000,
        theme: 'colored',
      })      
    } else if (!user && customer && userfromDB) {
      toast.error("Error!")
    } else if (!customer && user && userfromDB) {
      toast.error("Failed To Render Customer!")
    } else if (!userfromDB && user && customer) {
      toast.error("Failed To Render Your Personal Details!")
    } else if (!order && userfromDB.orderId !== ""  && user) {
      toast.error("Failed To Get Your Order");
    } else {
      toast.error("Something Went Wrong!")
    }
    if (userfromDB.message !== '' && userfromDB.message !== undefined && userfromDB.message !== null) {
      onOpen(); // Open the modal when user exists
    }
  }, []); // Run this effect whenever user changes
  const [isMenuOpen, setMenuOpen] = useState(false);
  const handleMenuToggle = () => {
    setMenuOpen(!isMenuOpen);
  };

  const handleActivateBoosting = async () => {
    const res = await activateBoosting();
    if(res.status !== 200 && res.message) {
        toast.error(res.message)
    } else if (res.status === 200 && res.message) {
        toast.success(res.message)
        router.refresh()
    }else {
        toast.success('Something Went Wrong...')
    }
  }


  const handleAcceptMessage = async (id: any) => {
    const data = await acceptMessage(id);
    const status = data.status;
    if (data.status === 200) {
      
      return toast.success(data.message)
    } else {
      return toast.error(data.message)
    } 
  }
  
  const handleDisableBoosting = async () => {
    const res = await disableBoosting();
    if(res.status !== 200 && res.message) {
        toast.error(res.message)
    } else if (res.status === 200 && res.message) {
        toast.success(res.message)
        router.refresh()
    }else {
        toast.success('Something Went Wrong...')
    }
  }


  return (
    <div className={`h-fit min-h-[130vh] w-full bg-[#020512] boosting ${isMenuOpen ? 'menu-open' : ''}`}>
      <div className='flex xl:hidden fixed top-0 left-0 p-10 cursor-pointer z-50' onClick={handleMenuToggle}>
      {isMenuOpen ? <Image src={iconClose} width={40} alt='Menu Bar'/> : <Image src={iconMenu} width={40} alt='Menu Bar'/>}
      </div>
      {isMenuOpen && (
          <div className='w-[50%] bg-[#0A0E1B] mr-[70px] h-full pt-[80px] xl:hidden fixed top-0 left-0 px-[30px] shadow-lg max-md:w-full z-30 shadow-[#02A4FF]'>
                <div className='mx-auto w-full text-center flex justify-center flex-col items-center'>
                <Link className='text-white mt-[40px] text-center inline-block w-full hover:bg-[#0d1126] bg-[#10152d] rounded-xl' href={'/'}>
                    <Image src={arrowImage} height={25} width={50} alt='arrow_to_left' className='inline-block mr-1 mx-auto'/> <span className='align-middle'>Back To Hompage</span>
                  </Link>
                  <img src={`${user.imageUrl}`} width={150} alt="" className='rounded-[50%] mt-[30px] border-3 border-solid border-[#02A4FF'/>
                  <h1 className='text-white text-3xl text-center mt-[40px] capitalize'>{user.username}</h1>
                  <span className='text-center text-[#605C5C] '>#The Booster</span>
                </div>
                <div>
                  <ul className='text-[#e3e3e3] text-center text-xl flex flex-col mt-[40px] font-extralight'>
                    {order && order.status === "In Progress" ? <DropOrder /> : <></>}
                    {order && order.status === "In Progress" ? <FinishOrder /> : <></>}
                    {order && order.status === "In Progress" || order.status === "paused" ? <BoostingProgress starting_rank={order.starting_rank} starting_division={Number(order.starting_division)} ending_division={order.ending_division} ending_rank={order.ending_rank} /> :  <></>}
                    {order && order.status === "In Progress" && order.boosting_status === "off" ? <li className='my-3 text-yellow-500 border-1 border-yellow-500 cursor-pointer'><Button className='bg-transparent text-yellow-500 text-xl w-full h-full rounded-none py-3' onPress={handleActivateBoosting}>Start A LoL Game</Button></li> : <></>}
                    {order && order.boosting_status === "on" ? <li className='my-3 text-orange-500 border-1 border-orange-500 cursor-pointer'><Button className='bg-transparent text-orange-500 text-xl w-full h-full rounded-none py-3' onPress={handleDisableBoosting}>Stop The Game</Button></li> : <></>}
                    {order && order.status === "waiting" ? <StartBoosting /> : <></>}
                  </ul>
                </div>
          </div>
        )}
        <div className='w-full h-fit min-h-[140vh] flex flex-row flex-nowrap pb-16'>
            <div className='w-[20%] bg-[#060A1B] mr-[70px] h-[150vh] max-xl:hidden px-[30px]'>
                <Link className='text-white mt-[40px] text-center inline-block w-full hover:bg-[#0d1126] bg-[#10152d] rounded-xl' href={'/'}>
                  <Image src={arrowImage} height={25} width={50} alt='arrow_to_left' className='inline-block mr-1 mx-auto'/> <span className='align-middle'>Back To Hompage</span>
                </Link>
                <div className='mx-auto w-full text-center flex justify-center flex-col items-center pt-[80px]'>
                    <img src={`${user.imageUrl}`} height={150} width={150} alt="" className='rounded-[50%] mt-[30px] border-3 border-[#02A4FF] border-solid'/>
                    <h1 className='text-white text-3xl text-center mt-[40px] capitalize'>{user.username}</h1>
                    <span className='text-center text-[#605C5C] '>#The Booster</span>
                </div>
                <div>
                  <ul className='text-[#e3e3e3] text-center text-xl flex flex-col mt-[40px] font-extralight'>
                  {order && order.status === "In Progress" ? <DropOrder /> : <></>}
                  {order && order.status === "In Progress" ? <FinishOrder /> : <></>}
                  {order && order.status === "In Progress" || order.status === "paused" ? <BoostingProgress starting_rank={order.starting_rank} starting_division={Number(order.starting_division)} ending_division={order.ending_division} ending_rank={order.ending_rank} /> :  <></>}
                  {order && order.status === "In Progress" && order.boosting_status === "off" ? <li className='my-3 text-yellow-500 border-1 border-yellow-500 cursor-pointer'><Button className='bg-transparent text-yellow-500 text-xl w-full h-full rounded-none py-3' onPress={handleActivateBoosting}>Start A LoL Game</Button></li> : <></>}
                  {order && order.boosting_status === "on" ? <li className='my-3 text-orange-500 border-1 border-orange-500 cursor-pointer'><Button className='bg-transparent text-orange-500 text-xl w-full h-full rounded-none py-3' onPress={handleDisableBoosting}>Stop The Game</Button></li> : <></>}
                  {order && order.status === "waiting" ? <StartBoosting /> : <></>}

                  </ul>
                </div>
            </div>
            <>
                <Modal isOpen={isOpen} onOpenChange={onOpenChange}  backdrop={'blur'} 
                    classNames={{
                    body: "py-8 min-h-[200px] text-center text-gray-400",
                    base: "bg-[#060A1B] text-white border-4 border-[#0b112c]",
                    header: "border-b-2 border-red-700",
                    closeButton: "hover:bg-white/5 active:bg-white/10",
                  }}>
                    <ModalContent>
                      {(onClose) => (
                        <>
                          <ModalHeader className=" flex-col text-center gap-1 text-red-700  inline-block">
                            <Image src={warning} height={40} width={30} alt='!' className='inline-block '/>
                            <span className='inline-block align-middle px-1'>
                              System Message
                            </span>
                            <Image src={warning} height={40} width={30} alt='!' className='inline-block '/>
                          </ModalHeader>
                          <ModalBody>
                            <p className='text-lg'> 
                                {userfromDB.message ? userfromDB.message : 
                                <>
                                    Error
                                
                                </>}
                            </p>
                          </ModalBody>
                          <ModalFooter>
                            <Button color="danger" variant="light" onPress={() => {
                              handleAcceptMessage(userfromDB._id)
                              onClose()
                            }}>
                              Close
                            </Button>
                          </ModalFooter>
                        </>
                      )}
                    </ModalContent>
                  </Modal>
            </>
            <div className='w-[80%] pr-[10%] max-xl:w-full max-xl:mx-auto max-xl:pr-0 pt-[50px] pb-[100px] relative'>
              <h1 className='text-white text-[80px] max-xl:w-full max-xl:text-center max-xl:py-5 max-md:text-[50px] max-sm:text-[30px]'>Dashboard</h1>
              {order && userfromDB.orderId !== '' && userfromDB.orderId !== undefined && order.change_booster !== "waiting" ? (
                                <>


                              <div className=' w-full max-xl:w-full max-xl:flex max-xl:flex-col max-xl:items-center max-xl:px-[10%]'>
                                {/* div1 */}
                                  <div className='bg-[#060A1B] rounded-[25px] h-fit text-white p-10 text-center w-full mb-[50px]'>
                                    <ul className='w-full flex flex-row flex-nowrap justify-between max-md:items-center max-xl:flex-wrap max-xl:justify-center mb-[30px] max-md:flex-col max-md:mb-[10px] max-md:pt-[20px] max-md:border-t-2 border-slate-800'>
                                      <li className='w-1/3 min-w-[100px] text-center max-md:w-full'>
                                        <div className='text-center max-xl:my-3 mx-3 whitespace-nowrap'>
                                          <h3 className='text-xl text-[#02A4FF]'>Status</h3>
                                          <span>{order ? order.status : 'No order yet'}</span>
                                        </div>
                                      </li>
                                      <li className='w-1/3 min-w-[100px] text-center max-md:w-full'>
                                        <div className='text-center max-xl:my-3 mx-3 whitespace-nowrap'>
                                          <h3 className='text-xl text-[#02A4FF]'>Server</h3>
                                          <span>{order ? order.server : 'No order yet'}</span>
                                        </div>
                                      </li>
                                      <li className='w-1/3 min-w-[100px] text-center max-md:w-full'>
                                        <div className='text-center max-xl:my-3 mx-3 whitespace-nowrap'>
                                          <h3 className='text-xl text-[#02A4FF]'>Order Id</h3>
                                          <span>{order ? order._id : 'No order yet'}</span>
                                        </div>
                                      </li>
                                    </ul>
                                    <ul className='w-full flex flex-row flex-nowrap justify-between max-md:items-center max-xl:flex-wrap max-xl:justify-center mb-[30px] max-md:flex-col max-md:mb-[10px] max-md:pt-[20px] max-md:border-t-2 border-slate-800'>
                                      <li className='w-1/3 min-w-[100px] text-center max-md:w-full'>
                                        <div className='text-center max-xl:my-3 mx-3 whitespace-nowrap'>
                                          <h3 className='text-xl text-[#02A4FF]'>Starting Rank</h3>
                                          <span>{order ? `${order.starting_rank} ${order.starting_division}` : 'No order yet'}</span>
                                        </div>
                                      </li>
                                      <li className='w-1/3 min-w-[100px] text-center max-md:w-full'>
                                        <div className='text-center max-xl:my-3 mx-3 whitespace-nowrap'>
                                          <h3 className='text-xl text-[#02A4FF]'>Ending Rank</h3>
                                          <span>{order ? `${order.ending_rank} ${order.ending_division}` : 'No order yet'}</span>
                                        </div>
                                      </li>
                                      <li className='w-1/3 min-w-[100px] text-center max-md:w-full'>
                                        <div className='text-center max-xl:my-3 mx-3 whitespace-nowrap'>
                                          <h3 className='text-xl text-[#02A4FF]'>Lp</h3>
                                          <span>{order ? order.lp : 'No order yet'}</span>
                                        </div>
                                      </li>
                                    </ul>
                                    <ul className='w-full flex flex-row flex-nowrap justify-between max-md:items-center max-xl:flex-wrap max-xl:justify-center max-md:flex-col max-md:pt-[20px] max-md:border-t-2 border-slate-800'>
                                      <li className='w-1/3 min-w-[100px] text-center max-md:w-full'>
                                        <div className='text-center min-w-[100px] mx-3 whitespace-nowrap'>
                                          <h3 className='text-xl text-[#02A4FF]'>Boost Type</h3>
                                          <span>{order ? order.boost_type : 'No order yet'}</span>
                                        </div>
                                      </li >
                                      <li className='w-1/3 min-w-[100px] text-center max-md:w-full'>
                                        <div className='text-center min-w-[100px] mx-3 whitespace-nowrap'>
                                          <h3 className='text-xl text-[#02A4FF]'>Order Cost</h3>
                                          <span>{order ? `${order.server === "EUW" ? "€" : "$"}${order.price / 100}` : 'No order yet'}</span>
                                        </div>
                                      </li>
                                      <li className='w-1/3 min-w-[100px] text-center max-md:w-full'>
                                        <div className='text-center min-w-[100px] mx-3 whitespace-nowrap max-md:whitespace-wrap '>
                                          <h3 className='text-xl text-[#02A4FF]'>OpenGG Link</h3>
                                          <span>{order ? order.openGG : 'No Link Found'}</span>
                                        </div>
                                      </li>
                                    </ul>
                                    <div className='w-full flex-col justify-center'>
                                    <h1 className='text-2xl text-[#D19638] mt-5 text-center block'>Addons: </h1>
                                    <div className='block w-full mx-auto'>
                                      {order.addons.spells ?  <Button color='warning' variant='ghost' className=' text-white my-4 w-fit mx-2'>Summoner Spells</Button> : <></>}
                                      {order.addons.offlineVpn ?  <Button color='warning' variant='ghost' className=' text-white my-4 w-fit mx-2'>Offline Mode & Vpn</Button> : <></>}
                                      {order.addons.priorityOrder ?  <Button color='warning' variant='ghost' className=' text-white mt-4 w-fit mx-2'>Priority Order</Button> : <></>}
                                      {order.addons.queueType ?  <Button color='primary' variant='ghost' className=' text-white mt-4 w-fit mx-2'>Queue Type: {order.addons.queueType}</Button> : <></>}
                                    </div>
                                  </div>
                                  </div>
                                  <div className='w-full flex flex-row  max-xl:w-full max-xl:h-fit max-lg:flex-col max-lg:justify-center'>
                                    <div className='bg-[#060A1B] rounded-3xl py-[14px] px-[20px] max-xl:h-full h-fit w-[48%] max-lg:w-full inline-block mr-auto'>
                                      <h2 className='text-[#02A4FF] text-center text-3xl max-md:text-2xl max-sm:text-xl'>
                                        Chat With Customer
                                      </h2>
                                      {order.status === "In Progress" || order.status === "paused" || order.status === "waiting" ? <Container customer={customer} username={user.username} booster={userfromDB}/> : <p className='text-white text-center my-[30px]'>The Chat Is Locked Until You Claim An Order</p>}
                                      
                                    </div>
              
                                    <div className='bg-[#060A1B] rounded-3xl pb-[14px] pt-[25px] px-[40px] max-xl:h-full h-fit w-[48%] inline-block ml-auto max-lg:w-full max-lg:mt-[50px]'>
                                        <h1 className='text-4xl text-left mb-[40px] text-[#02A4FF] max-md:text-2xl'>
                                          From Mr Gonzo:
                                        </h1>
                                        <div className='w-full flex flex-col flex-nowrap'>
                                          <div className='w-full text-left text-white mb-[20px]'>
                                            <h2 className='text-2xl text-left mb-[15px] max-md:text-xl'>1- Finish the order as soon as possible</h2>
                                            <p className='text-gray-500 ml-[50px] max-w-[250px] max-md:text-sm'></p>
                                          </div>
                                          <div className='w-full text-left text-white mb-[20px]'>
                                            <h2 className='text-2xl text-left mb-[15px] text-red-700 max-md:text-xl'>2- Do not drop the order for no clear reason</h2>
                                            <p className='text-gray-500 ml-[50px] max-w-[250px] max-md:text-sm'></p>
                                          </div>
                                          <div className='w-full text-left text-white mb-[20px]'>
                                            <h2 className='text-2xl text-left mb-[15px] text-yellow-500 max-md:text-xl'>3- Make sure to include the LP when writing the rank </h2>
                                            <p className='text-gray-500 ml-[50px] max-w-[250px] max-md:text-sm'></p>
                                          </div>
                                          <div className='w-full text-left text-white mb-[20px]'>
                                            <h2 className='text-2xl text-left mb-[15px] text-green-500 max-md:text-xl'>4- Stay respectful to the customer and enjoy the process</h2>
                                            <p className='text-gray-500 ml-[50px] max-w-[250px] max-md:text-sm'></p>
                                          </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                              </>
              ): order.change_booster !== null && order.change_booster !== undefined && order.change_booster === "waiting" && adminsOrder.booster_id === userfromDB._id && adminsOrder.type === 'change_booster' ? <>
              <div className='flex flex-col justify-center items-center'>
                  <h1 className='text-red-700 text-center text-4xl mt-[100px] mb-[40px]'>The Customer Has Changed You</h1>
                  <BoosterChanged />
                </div></> :
                              
              <div className='flex flex-col justify-center items-center'>
                <p className='text-red-700 text-center text-4xl mt-[100px]'>You Don&#39;t Have An Order</p>
                <Button className='mt-[30px] w-fit' color='primary'><Link href={'/dashboard/orders'}>Go To Orders List</Link></Button>
              </div>
            }
              <div className='w-full h-[50px] mt-[50px] text-white text-lg absolute bottom-[0%]'>
                 <ReportCmpBooster role='booster'/>
              </div>
            </div>
        </div>
    </div>
  )
}

export default BoosterCmp
