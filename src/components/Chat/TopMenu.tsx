import { CircularProgress, Tooltip } from '@nextui-org/react'
import Image from 'next/image'
import React from 'react'

interface Props {}
// {userImage, username}: {userImage: string, username: string}
const TopMenu = ({image, username, boosting_status}: {image: string, username: string, boosting_status: string}) => {
  return <div className='flex flex-row w-full h-[80px] justify-between  border-b-3 border-[#0d1124] py-[25px]'>
    <div className='flex flex-row items-center justify-between w-full pr-5'>
        <div className='flex flex-row items-center'>
        <img src={`${image}`} width={25} height={25} alt='user_image' className='w-[50px] rounded-[50%]'/>
        <h3 className='text-xl text-white inline-block ml-[10px] align-middle tracking-wide'>{username}</h3>
        </div>
        <div className='text-center'>
          {boosting_status === "on" ? <Tooltip className='text-white' content="The booster is currently playing in your account" color="success" ><CircularProgress className='text-white cursor-pointer' color="success"/></Tooltip> : <Tooltip className='text-white' content="The booster is not playing in your account currently" color="danger" ><CircularProgress className='text-white cursor-pointer' color='danger' value={0}/></Tooltip>}
          <span className='text-white text-[12px]'>{boosting_status === "on" ? "Active" : "Inactive"}</span>
        </div>
    </div>
  </div>
}

export default TopMenu