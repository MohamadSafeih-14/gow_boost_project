"use client";
import React, { FC } from 'react'
import Image from 'next/image';
import { useState } from 'react';
import { Link, Button } from '@nextui-org/react';
import gowLogo from '../../public/images/G_5 3.png';
import menuBar from '../../public/images/icons8-burger-bar-64.png';
import NavbarMobileButton from './NavbarDesktopButton';
import { usePathname } from 'next/navigation'
import NavbarDesktopButton from './NavbarDesktopButton';
import { UserButton } from "@clerk/nextjs";


const NavbarItems = ({userId}: {userId: string}) => {
  

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const handleMenuToggle = () => {
      setIsMenuOpen(prevState => !prevState);
    };

    const pathname  = usePathname();
    // Check if the pathname includes "/dashboard/boosting"
    const isBoostingPage = pathname.includes('/dashboard');
    if (isBoostingPage) {
      return null; // Return null to hide the navbar
    }
    const MenuItems = () => (
        <ul className='flex justify-center text-white text-xl pt-[25px] ml-[150px] max-2xl:ml-[100px] max-xl:hidden'>
          <li className='cursor-pointer'>
            <Link href='/' className='text-white text-xl'>
              Home
            </Link>
          </li>
          <li className='cursor-pointer mx-[40px]'>
            <Link href='/FAQ' className='text-white text-xl'>
              FAQ
            </Link>
          </li>
          <li className='cursor-pointer '>
            <Link href='/lol-boosting' className='text-white text-xl'>
              Get Boosted
            </Link>
          </li>
        </ul>
      );
    
      const MobileMenu = () => (
        <ul className='max-xl:absolute -z-10 max-xl:block pt-[150px] hidden top-0 left-0 text-white text-xl h-[100vh] w-full bg-[#020512] text-center'>
          <li className='w-full h-[90px] cursor-pointer'>
            <Link href='/' className='text-white text-xl'>
              Home
            </Link>
          </li>
          <li className='cursor-pointer w-full h-[90px]'>
            <Link href='/FAQ' className='text-white text-xl'>
              FAQ
            </Link>
          </li>
          <li className='cursor-pointer w-full h-[90px]'>
            <Link href='/lol-boosting' className='text-white text-xl'>
              Get Boosted
            </Link>
          </li>
          <li>
            <div className='mt-[20px] max-md:block hidden'>
              {userId ? 
              <a className='w-[150px] h-[40px] block mx-auto mb-6'><UserButton afterSignOutUrl='/sign-in'/></a>
               : 
                  <Link href='/sign-in'>
                  <Button className='text-xl text-white bg-[#0073B4] w-[150px] max-sm:w-[100px] max-sm:text-lg blue-glow mb-5'>
                      login
                  </Button>
              </Link>}
              {userId ? <Link href='/dashboard'>
                <Button className='text-xl text-white bg-[#FFA800] w-[150px] max-sm:w-[100px] max-sm:text-lg yellow-glow'>
                  Dashboard
                </Button>
              </Link> :  <Link href='/contact'>
                <Button className='text-xl text-white bg-[#FFA800] w-[150px] max-sm:w-[100px] max-sm:text-lg yellow-glow'>
                  Contact
                </Button>
              </Link>}

            </div>
          </li>
        </ul>
      );
      
    
      return (

          <nav className='flex justify-between'>
            <Link href='/'>
              <div className=''>
                <Image
                  className='inline-block unselectable'
                  src={gowLogo}
                  width={80}
                  height={80}
                  draggable={false}
                  alt='gowboost logo'
                />
                <span className='text-[30px] glow-text text-[#00C8F4] font-thin align-middle inline-block'>
                  BOOST
                </span>
              </div>
            </Link>
    
            {/* Desktop Menu */}
            <MenuItems />
    
            {/* Mobile Menu */}
            {isMenuOpen && <MobileMenu />}
    
            <div className='flex flex-row items-end '>
              {/* Contact and Discord buttons for mobile */}
              <div className='mt-[20px] max-md:hidden flex flex-row items-end h-fit'>
                {userId ? <Link href='/dashboard/' className='mb-2'>
                <Button className='text-xl text-white bg-[#FFA800] w-[150px] yellow-glow mr-5'>
                  dashboard
                </Button>
              </Link> : 
                  <Link href='/Contact' className='mb-2'>
                  <Button className='text-xl text-white bg-[#FFA800] w-[150px] yellow-glow mr-5'>
                    Contact
                  </Button>
                </Link>
              }
              {userId ? <a className='w-[150px] inline-block'><UserButton afterSignOutUrl='/sign-in'/></a>  : <Link href='/sign-in' className='mb-2'>
                <Button className='text-xl text-white bg-[#0073B4] w-[150px] blue-glow '>
                  Login
                </Button>
              </Link>
            }
      </div>
    
              {/* Menu toggle button */}
              <button
                className={`menu-toggle max-xl:flex hidden bg-transparent mt-[24px] ml-[20px] ${
                  isMenuOpen ? 'open' : ''
                }`}
                onClick={handleMenuToggle}
              >
                <span className='line'></span>
                <span className='line'></span>
                <span className='line'></span>
              </button>
            </div>
          </nav>
      );
    };

export default NavbarItems
