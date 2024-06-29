"use client"
import React, { FC, useEffect } from 'react';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import arrowImage from '../../../public/images/icons8-left-arrow-50.png'
import iconMenu from '../../../public/images/icons8-menu-100.png';
import Container from '../Chat/Container';
import iconClose from '../../../public/images/icons8-close-50.png'
import warning from '../../../public/images/icons8-warning-50.png'
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Checkbox, Tooltip} from "@nextui-org/react";
import ReportCmp from './modals/ReportCmp';
import { acceptMessage } from 'src/lib/actions/customer_dashboard.actions';
import { toast } from 'react-toastify';
import OpenGG from './modals/OpenGG';
import WarningMessage from './modals/WarningMessage';
import ChangeBooster from './modals/ChangeBooster';
import PauseOrder from './modals/PauseOrder';
import ResumeOrder from './modals/ResumeOrder';
import ConfirmOrder from './modals/ConfirmOrder';
import DenieOrder from './modals/DenieOrder';
import BoostingProgress from './BoostingProgress';
const Boosting =  ({user, order, booster, userfromDB}: {user: any, order: any, booster: any, userfromDB: any}) => {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [report, setReport] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);

  if(user) user = JSON.parse(user);
  if(order) order = JSON.parse(order)
  if(userfromDB) userfromDB = JSON.parse(userfromDB);
  if(booster) booster = JSON.parse(booster)
  useEffect(() => {
    if (user && userfromDB) {
      toast.success(`Welcome To Your Dashboard`, {
        autoClose: 1000,
        theme: 'colored',
      })
    } else if (!user && booster && userfromDB) {
      toast.error("Error!")
    } else if (!booster && user && userfromDB.orderId) {
      toast.error("Failed To Render Booster!")
    } else if (!userfromDB && booster && user) {
      toast.error("Failed To Render Your Personal Details!")
    } else if (!order && userfromDB.orderId && user) {
      toast.error("Failed To Load Your Order!");
    } else {
      toast.error("Oops! Something went wrong... Try Again!")
    }
    if (userfromDB.message !== '' && userfromDB.message !== undefined && userfromDB.message !== null) {
      onOpen(); // Open the modal when user exists
    }
  }, []); // Run this effect whenever user changes
  
  const handleMenuToggle = () => {
    setMenuOpen(!isMenuOpen);
  };
  
  const handleAcceptMessage = async (id: any) => {
   await acceptMessage(id);
  }
  return (
    <div className={`h-fit min-h-[130vh] w-full bg-[#020512] boosting animate-fadeIn ${isMenuOpen ? 'menu-open' : ''}`}>
      <div className='flex xl:hidden fixed top-0 left-0 p-10 cursor-pointer z-50' onClick={handleMenuToggle}>
        {isMenuOpen ? <Image src={iconClose} width={40} alt='Menu Bar'/> : <Image src={iconMenu} width={40} alt='Menu Bar'/>}
      </div>
      {isMenuOpen && (
          <div className='w-[50%] bg-[#0A0E1B] mr-[70px] h-full pt-[80px] xl:hidden fixed top-0 left-0 px-[30px] shadow-lg shadow-[#D19638] max-md:w-full z-30'>
                <div className='mx-auto w-full text-center flex justify-center flex-col items-center'>
                  <Link className='text-white mt-[40px] text-center inline-block w-full hover:bg-[#0d1126] bg-[#10152d] rounded-xl' href={'/'}>
                    <Image src={arrowImage} height={25} width={50} alt='arrow_to_left' className='inline-block mr-1 mx-auto'/> <span className='align-middle'>Back To Hompage</span>
                  </Link>
                  <div>
                  </div>
                  <img src={`${user.imageUrl}`} width={150} alt="" className='rounded-[50%] mt-[30px] border-3 border-[#D19638] border-solid '/>
                  <h1 className='text-white text-3xl text-center mt-[40px] capitalize'>{user.username}</h1>
                  <span className='text-center text-[#605C5C] '>#The Summoner</span>
                </div>
                <div>
                  <ul className='text-[#e3e3e3] text-center text-xl flex flex-col mt-[40px] font-extralight'>
                  {!order.change_booster && order.change_booster !== "waiting" && order.change_booster !== "changed" && order.status === "In Progress" && order ? <ChangeBooster /> : <></>}
                      {order.status !== 'pending' && order.status === 'In Progress' && order?  <PauseOrder /> : <></>}
                     
                     {order.status === "paused" && order ? <ResumeOrder /> : <></>}
                  </ul>
                </div>
           </div>
        )}
          <div className='w-full h-fit min-h-[140vh] flex flex-row flex-nowrap'>
              <div className='w-[20%] bg-[#060A1B] mr-[70px] max-xl:hidden px-[30px]'>
                <Link className='text-white mt-[40px] text-center inline-block w-full hover:bg-[#0d1126] bg-[#10152d] rounded-xl' href={'/'}>
                  <Image src={arrowImage} height={25} width={50} alt='arrow_to_left' className='inline-block mr-1 mx-auto'/> <span className='align-middle'>Back To Hompage</span>
                </Link>
                  <div className='mx-auto w-full text-center flex justify-center flex-col items-center pt-[80px]'>
                    <img src={`${user.imageUrl}`} height={150} width={150} alt="" className='rounded-[50%] mt-[30px] border-3 border-[#D19638] border-solid'/>
                    <h1 className='text-white text-3xl text-center mt-[40px] capitalize'>{user.username}</h1>
                    <span className='text-center text-[#605C5C] '>#The Summoner</span>
                  </div>
                  <div>
                    <ul className='text-[#e3e3e3] text-center text-xl flex flex-col mt-[40px] font-extralight'>
                      {!order.change_booster && order.change_booster !== "waiting" && order.change_booster !== "changed" && order.status === "In Progress" && order ? <ChangeBooster /> : <></>}
                      
                      {/* <li className='my-3 text-[#D19638] p-3 border-1 border-[#D19638] cursor-pointer'><Link href=''>Pause Order</Link></li> */}
                      {order.status !== 'pending' && order.status === 'In Progress' && order?  <PauseOrder /> : <></>}
                     
                      {order.status === "paused" && order ? <ResumeOrder /> : <></>}
                    </ul>
                  </div>
              </div>

              {/* dashboard */}
              <div className='w-[80%] pr-[10%] max-xl:w-full max-xl:mx-auto max-xl:pr-0 pt-[50px] pb-[100px]'>
                <div className='text-white flex flex-row justify-between items-center '>
                <h1 className='text-white text-[80px] max-xl:w-full max-xl:text-center max-xl:py-5 max-md:text-[50px] max-sm:text-[30px] inline-block'>Dashboard </h1>
                </div>
              {order && order.openGG !== undefined && order.openGG !== '' ? (
                <>
                  <WarningMessage />
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
                <div className=' w-full max-xl:w-full max-xl:flex max-xl:flex-col max-xl:items-center max-xl:px-[10%]'>
                  {/* div1 */}
                    <div className='bg-[#060A1B] rounded-[25px] h-fit text-white p-10 text-center w-full mb-[50px]'>
                      <ul className='w-full flex flex-row flex-nowrap justify-between max-md:items-center max-xl:flex-wrap max-xl:justify-center mb-[30px] max-md:flex-col max-md:mb-[10px] max-md:pt-[20px] max-md:border-t-2 border-slate-800'>
                      <Tooltip content={order.status === "pending" ? "Your Order is in the boosters' order list. This process takes anywhere between Less than an Hour up to 16 Hours to ensure that we assign the perfect booster for your account!" : order.status === "waiting" ? "The booster is waiting for you to provide your League of Legends Username/Password. Please note that your account is safe with us, as every step of the process is being carefully monitored by our security team. " : order.status === "In Progress" ? "The boost has begun! Keep an eye on the circle-shaped icon at the top of the messaging box to see when the booster is in-game or offline. Happy climbing!" : order.status === "paused" ? "The booster will not play on your account until you resume the order" : order.status === "reviewing" ? "Our team is looking into your order to make any necessary updates. This process usually takes only a few hours to complete, but for now, stay prepared." : order.status === "waiting for booster to confirm" ? "To ensure that no mistakes were made, we need the booster's statement regarding the most recent details of your order." : order.status === "done" ? 'The booster has marked your order as "Done." If you have achieved your desired rank, please confirm by clicking the "Confirm" button below. If not, click "Deny" and fill in the required fields.' : " "} className={`text-white p-2 w-[350px] ${order.status === "pending" ? "bg-[#858585]" : order.status === "waiting" ? " bg-[#D19638]" : order.status === "paused" ? 'bg-[#D19638]': order.status === "In Progress" ? "bg-[#1cb655]" : order.status === "reviewing" ? "bg-[#80002d]" : order.status === "waiting for booster to confirm" ? "bg-[#ff6200]" : order.status === "done" ? "bg-[#0095ff]" : "bg-[#D19638]"}`}><li className='w-1/3 min-w-[100px] text-center max-md:w-full'>
                          <div className={`text-center max-xl:my-3 px-8 whitespace-nowrap relative mx-auto cursor-pointer w-fit rounded-lg py-1 ${order.status === "pending" ? "bg-[#858585]" : order.status === "waiting" ? " bg-[#D19638]" : order.status === "paused" ? "bg-[#D19638]" : order.status === "In Progress" ? "bg-[#1cb655]" : order.status === "reviewing" ? "bg-[#800000]" : order.status === "waiting for booster to confirm" ? "bg-[#ff6200]" : order.status === "done" ? "bg-[#0095ff]" : ''} `}>
                            <h3 className='text-xl text-white relative'><span className=''>Status</span> <Tooltip content="HELlo Brav" color="success"></Tooltip></h3>
                            <span className='relative'>{order ? order.status : 'No order yet'}</span>
                            <span className="absolute -top-11 -right-10 z-10 text-white text-[15px] cursor-pointer w-fit flex items-center justify-center flex-col-reverse text-center h-fit">
                            <span className="rounded-full w-5 h-5 absolute top-5 block bg-rose-700 mt-3">!</span>
                            <span className="block bg-rose-700 mb-2 px-2 relative animate-float">
                              Hover Here
                              <span className="w-[0px] border-[15px] border-r-transparent border-b-transparent border-l-transparent border-t-rose-700 absolute -bottom-[100%] transform -translate-x-[50%] left-[50%] h-[0px] "></span>
                            </span>
                          </span>
                          </div>
                        </li>
                      </Tooltip>
                        <li className='w-1/3 min-w-[100px] text-center max-md:w-full'>
                          <div className='text-center max-xl:my-3 mx-3 whitespace-nowrap'>
                            <h3 className='text-xl text-[#D19638]'>Server</h3>
                            <span>{order ? order.server : 'No order yet'}</span>
                          </div>
                        </li>
                        <li className='w-1/3 min-w-[100px] text-center max-md:w-full'>
                          <div className='text-center max-xl:my-3 mx-3 whitespace-nowrap'>
                            <h3 className='text-xl text-[#D19638]'>Order Id</h3>
                            <span>{order ? order._id : 'No order yet'}</span>
                          </div>
                        </li>
                      </ul>
                      <ul className='w-full flex flex-row flex-nowrap justify-between max-md:items-center max-xl:flex-wrap max-xl:justify-center mb-[30px] max-md:flex-col max-md:mb-[10px] max-md:pt-[20px] max-md:border-t-2 border-slate-800'>
                        <li className='w-1/3 min-w-[100px] text-center max-md:w-full'>
                          <div className='text-center max-xl:my-3 mx-3 whitespace-nowrap'>
                            <h3 className='text-xl text-[#D19638]'>Starting Rank</h3>
                            <span>{order ? `${order.starting_rank} ${order.starting_division}` : 'No order yet'}</span>
                          </div>
                        </li>
                        <li className='w-1/3 min-w-[100px] text-center max-md:w-full'>
                          <div className='text-center max-xl:my-3 mx-3 whitespace-nowrap'>
                            <h3 className='text-xl text-[#D19638]'>Ending Rank</h3>
                            <span>{order ? `${order.ending_rank} ${order.ending_division}` : 'No order yet'}</span>
                          </div>
                        </li>
                        <li className='w-1/3 min-w-[100px] text-center max-md:w-full'>
                          <div className='text-center max-xl:my-3 mx-3 whitespace-nowrap'>
                            <h3 className='text-xl text-[#D19638]'>Lp</h3>
                            <span>{order ? order.lp : 'No order yet'}</span>
                          </div>
                        </li>
                      </ul>
                      <ul className='w-full flex flex-row flex-nowrap justify-between max-md:items-center max-xl:flex-wrap max-xl:justify-center max-md:flex-col max-md:pt-[20px] max-md:border-t-2 border-slate-800'>
                        <li className='w-1/3 min-w-[100px] text-center max-md:w-full'>
                          <div className='text-center min-w-[100px] mx-3 whitespace-nowrap'>
                            <h3 className='text-xl text-[#D19638]'>Boost Type</h3>
                            <span>{order ? order.boost_type : 'No order yet'}</span>
                          </div>
                        </li >
                        <li className='w-1/3 min-w-[100px] text-center max-md:w-full'>
                          <div className='text-center min-w-[100px] mx-3 whitespace-nowrap'>
                            <h3 className='text-xl text-[#D19638]'>Price</h3>
                            <span>{order ? `${order.server === "EUW" ? "€" : "$"}${order.price / 100}` : 'No order yet'}</span>
                          </div>
                        </li>
                        <li className='w-1/3 min-w-[100px] text-center max-md:w-full'>
                          <div className='text-center min-w-[100px] mx-3 whitespace-nowrap max-md:whitespace-wrap '>
                            <h3 className='text-xl text-[#D19638]'>OP.GG Link</h3>
                            <span>{order ? order.openGG : 'No Link Found'}</span>
                          </div>
                        </li>
                      </ul>
                      <div className='w-full flex-col justify-center'>
                        <h1 className='text-2xl text-[#D19638] mt-5 text-center block'>Addons: </h1>
                        <div className='block w-full mx-auto'>
                          {order.addons.spells ?  <Button color='warning' variant='ghost' className=' text-white my-4 w-fit mx-2'>Summoner Spells</Button> : <></>}
                          {order.addons.offlineVpn ?  <Button color='warning' variant='ghost' className=' text-white my-4 w-fit mx-2'>Offline Mode & Vpn</Button> : <></>}
                          {order.addons.priorityOrder ?  <Button color='success' variant='ghost' className=' text-white mt-4 w-fit mx-2'>Priority Order</Button> : <></>}
                          {order.addons.queueType ?  <Button color='primary' variant='ghost' className=' text-white mt-4 w-fit mx-2'>Queue Type: {order.addons.queueType}</Button> : <></>}
                        </div>
                      </div>
                    </div>
                    <div className='w-full flex flex-row  max-xl:w-full max-xl:h-fit max-lg:flex-col max-lg:justify-center justify-between'>
                      {order.status === "reviewing" && order.change_booster === "changed" ? <div className='w-full text-center mb-10'>
                              <h1 className='text-4xl w-full text-red-800 text-center'>Your Request Is Being Reviewed By The Admins</h1>
                      </div>
                      : order.status === 'done' ? 
                          <div className='w-full text-center'>
                            <h1 className='mb-5 text-3xl text-yellow-600 border-yellow-600 border-1 p-5 w-fit text-center mx-auto'>The Booster Has Finished Your Order</h1>
                            <ConfirmOrder />
                            <DenieOrder />
                          </div>
                      :
                      <>
                          <div className='bg-[#060A1B] rounded-3xl py-[14px] px-[20px] max-xl:h-full h-fit w-[45%] max-lg:w-full inline-block mr-5'>
                          <h2 className='text-[#D19638] text-center text-3xl max-md:text-2xl max-sm:text-xl'>
                            Chat With Booster
                          </h2>
                          {order.status === "In Progress" || order.status === "paused" || order.status === "waiting" ? <Container user={user} username={user.username} booster={booster} boosting_status={order.boosting_status}/>  : <><p className='text-white text-center my-[30px]'>The Chat Is Locked Until Any Booster Claims The Order</p> <div>
                            </div></>}
                          
                        </div>
                        <div className='bg-[#060A1B] rounded-3xl h-fit max-xl:h-full w-[55%] max-lg:w-full max-lg:mx-auto max-lg:mt-[25px]'>
                        <h1 className='text-[#D19638] text-3xl pb-10 text-center pt-5'>Order Progress</h1>
                          <BoostingProgress starting_rank={order.starting_rank} starting_division={order.starting_division} ending_rank={order.ending_rank} ending_division={order.ending_division} current_rank={order.current_rank} current_division={order.current_division}/>
                     </div>
                     </>
                      }


                  </div>
                  <div className='w-full h-[50px] mt-[50px] text-white text-lg'>
                          <ReportCmp role='customer'/>
                  </div>
              </div>
                </>
              ) : !order ? (
                <>
                  <h1 className='text-red-700 text-center text-4xl mt-[100px]'>You Don&#39;t Have An Order</h1>
                  <div className='w-full h-fit flex justify-center mt-5'>
                  <Button color="primary" className='text-center text-white mx-auto'><Link href={'/lol-boosting'}>Get An Order Now!</Link></Button>
                  </div>
                </>
              ) : (
                  <OpenGG />

              )}                  
          </div>
      </div>

    </div>
  )
}





export default Boosting
