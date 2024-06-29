import Image from 'next/image'
import React from 'react'

interface Props {}
// {userImage, username}: {userImage: string, username: string}
const TopMenu = ({image, username}: {image: string, username: string}) => {
  return <div className='flex flex-row w-full h-[70px] justify-between  border-b-3 border-[#0d1124] py-[20px]'>
    <div className='flex flex-row items-center'>
        <img src={`${image}`} width={25} height={25} alt='user_image' className='w-[50px] rounded-[50%]'/>
        <h3 className='text-xl text-white inline-block ml-[10px] align-middle tracking-wide'>{username}</h3>
    </div>
  </div>
}

export default TopMenu