import Image from 'next/image';
import React from 'react';
import logo from '../../public/images/G_5 3.png';
import Link from 'next/link';
const Footer: React.FC = () => {
  return (
    <footer className='w-full h-fit min-h-[50vh] bg-[#0B0F1C] px-[10%] pt-[100px] pb-6'>
        <div className='flex flex-row flex-nowrap w-full h-full max-lg:flex-col max-lg:justify-center max-lg:items-center max-lg:text-center'>
            <Image src={logo} alt='logo' width={200} height={150} className='max-w-[200] max-h-[200px]'/>
            <ul className='text-white lg:ml-[100px] max-lg:mx-auto max-lg:text-center max-lg:my-5'>
                <li className='text-[#02A4FF] text-3xl'>Pages</li>
                <li className='text-lg my-1'><Link href='/'>Home</Link></li>
                <li className='text-lg my-1'><Link href='/lol-boosting'>Get Boosted</Link></li>
                <li className='text-lg my-1'><Link href='/dashboard'>Dashboard</Link></li>
                <li className='text-lg my-1'><Link href='/FAQ'>FAQ</Link></li>
                <li className='text-lg my-1'><Link href='/sign-in'>Sign In</Link></li>
            </ul>
            <ul className='text-white lg:ml-[100px] max-lg:mx-auto max-lg:text-center max-lg:my-5'>
                <li className='text-[#02A4FF] text-3xl'>Contact</li>
                <li className='text-lg my-1'><Link href='/Jobs'>Work With Us</Link></li>
                <li className='text-lg my-1'><Link href='/Contact'>Contact Us</Link></li>
            </ul>
            <ul className='text-white lg:ml-[100px] max-lg:mx-auto max-lg:text-center max-lg:my-5'>
                <li className='text-[#02A4FF] text-3xl'>Legal</li>
                <li className='text-lg my-1'><Link href='/PrivacyPolicy'>Privacy Policy</Link></li>
                <li className='text-lg my-1'><Link href='/RefundPolicy'>Refund Policy</Link></li>
                <li className='text-lg my-1'><Link href='/TermsOfServices'>Terms Of Services</Link></li>
            </ul>
        </div>
        <p className='text-[#888888] text-center lg:mt-[190px] max-lg:mt-14 p-3 text-sm w-[1225px] mx-auto max-2xl:w-fit'>
    LEAGUE OF LEGENDS IS A REGISTERED TRADEMARK OF RIOT GAMES, INC. WE ARE IN NO WAY AFFILIATED WITH, ASSOCIATED WITH OR ENDORSED BY RIOT GAMES, INC.
    BY USING THIS WEBSITE YOU CONSTITUTE ACCEPTANCE TERMS OF SERVICE AND PRIVACY POLICY. ALL COPYRIGHTS, TRADE MARKS, SERVICE MARKS BELONG TO THE CORRESPONDING OWNERS.
    COPYRIGHT OF © gowboost.com 2023 ALL RIGHTS RESERVED</p>
    </footer>
  )
}

export default Footer
