import { Button } from '@nextui-org/react'
import Link from 'next/link'
import React from 'react'

interface Props {}

const page = () => {
  return <section className="w-full min-h-[100vh] h-fit text-center pt-[150px] pb-[100px]">
            <h1 className='text-white text-[70px] text-center mb-4'>
                Work With Us
            </h1>
            <hr className='border-[#0073B4] border-[2px] w-[150%] absolute'/>
            <p className='text-white text-center text-2xl mb-[30px] mt-[60px] w-[70%] mx-auto'>Welcome to our Hiring Page! As a newly launched boosting service, we&#39;re excited to grow our team and expand our services. Here you&#39;ll find the latest job openings, with more positions becoming available as we continue to grow. Join us and be part of an innovative and dynamic team dedicated to providing top-notch boosting experiences for our clients.</p>
            <div className='flex flex-row justify-center items-center w-full mt-[90px]'>
            <span className='w-[10%] bg-[#D19638] h-1 inline-block'></span><h1 className='text-white text-center text-[60px] mx-5'>Positions</h1><span className='w-[10%] bg-[#D19638] h-1 inline-block'></span>
            </div>
            <div className='w-full h-fit px-[10%] flex flex-col pt-10'>
              <div className='bg-[#040922] w-[80%] mx-auto min-h-[140px] h-fit mb-10 p-8 px-16 text-white text-left rounded-3xl faq-hover border-1 border-gray-400'>
                <h1 className='text-5xl'>Booster</h1>
                <p className='text-[#8f8f8f] mb-5 mt-2'>Being a booster with us means that you are at least <span className='text-red-600'>Grandmaster</span> and ready to dedicate time to learn and understand the strict rules that we implement.</p>
                <div className='w-full flex justify-center'>
                <Button color='warning' className='mx-auto'><Link className='text-white text-xl mx-auto' href="https://form.jotform.com/240805120995961" target='_blank'>Apply Now!</Link></Button>
                </div>
              </div>
              <div className='bg-[#040922] w-[80%] mx-auto min-h-[140px] h-fit mb-10 p-8 px-16 text-white text-left rounded-3xl faq-hover border-1 border-gray-200'>
                <h1 className='text-5xl'>Customer Service Representive</h1>
                <p className='text-[#8f8f8f] mb-5 mt-2'>Are you great at resolving issues and enjoy helping people? Join our team as a Customer Service Representative and use your excellent communication skills to provide outstanding support to our customers.</p>
                <div className='w-full flex justify-center'>
                <Button color='warning' className='mx-auto'><Link className='text-white text-xl mx-auto' href="" target='_blank'>Apply Now!</Link></Button>
                </div>
              </div>
              <div className='bg-[#040922] w-[80%] mx-auto min-h-[140px] h-fit mb-10 p-8 px-16 text-white text-left rounded-3xl faq-hover border-1 border-gray-200'>
                <h1 className='text-5xl'>TBD</h1>
                <p className='text-[#8f8f8f] mb-5 mt-2'>Coming Soon...</p>
                <div className='w-full flex justify-center'>
                <Button color='warning' className='mx-auto'><Link className='text-white text-xl mx-auto' href="" target='_blank'>Apply Now!</Link></Button>
                </div>
              </div>
            </div>
  </section>
}

export default page