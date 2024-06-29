import React from 'react'
import Image from 'next/image'
import background from '../../../public/images/nature_4k_hd_league_of_legends_wild_rift-t2 1.png';
import { Button } from '@nextui-org/react';
import discordIcon from '../../../public/images/icons8-discord-50 (7) 1.png';
import emailIcon from '../../../public/images/icons8-email-50 (2) 1.png';
import supportIcon from '../../../public/images/icons8-message-50.png';
import Link from 'next/link';
interface Props {}

const Page = () => {
  return (
    <div className='h-fit min-h-[100vh] w-full pt-[150px] relative px-[10%] pb-[100px]'>  
          <h1 className='text-center text-white text-[80px] max-sm:text-[60px]'>Contact Us</h1>
          <hr className='border-[#0073B4] border-[2px] w-full absolute left-0'/>
        <div className='w-[1000px] max-md:w-fit h-fit bg-[#0072b413] p-[50px] mt-[50px] text-white relative z-10 mx-auto'>
          <h2 className='text-5xl mb-[60px] max-lg:text-4xl max-md:text-4xl max-sm:text-center max-md:my-[10px] relative'>
            Contact Info
            <hr className='border-[#0073B4] border-[2px] w-[20%] absolute -bottom-6'/>
          </h2>
          <div className='flex flex-row items-center mt-[30px] max-md:my-[20px] max-sm:flex-col'>
            <Image src={emailIcon} alt="email"/>
            <p className='text-3xl ml-[20px] max-lg:text-2xl max-md:text-xl max-sm:text-md max-md:mt-1'>
             gowboostinglol@gmail.com
            </p>
          </div>
          <p className='mb-[60px] mt-[10px] text-[#888888] text-xl max-lg:text-lg  max-md:text-md max-sm:text-center'>
            Got a question that we could not answer on Discord or on our Live Chat? Send us an email and we will reach back to you in less than 24 Hours!
          </p>
          <div className='flex flex-row items-center max-sm:flex-col'>
            <Image src={discordIcon} alt="discord"/>
            <Button className='text-white w-[150px] text-lg max-lg:text-lg ml-3' variant="bordered" color="primary"><Link href="https://discord.gg/wQpHpVeq" target="_blank">Join Discord</Link></Button>
          </div>
          <p className='mb-[60px] mt-[10px] text-[#888888] text-xl max-lg:text-lg  max-md:text-md max-sm:text-center'>
            Join our Discord server where you can open Support Tickets that we respond to almost instantly.
          </p>
          <div className='flex flex-row items-center max-sm:flex-col'>
            <Image width={70} src={supportIcon} alt="support"/>
            <h2 className='inline-block text-white text-4xl ml-3'>24/7</h2>
          </div>
          <p className='mt-[10px] text-[#888888] text-xl max-lg:text-lg  max-md:text-md max-sm:text-center'>
            Did you know that we have a 24/7 live chat where you can ask us anything at any time? Do not hesitate to ask your questions!
          </p>
        </div>
    </div>
  )
}

export default Page