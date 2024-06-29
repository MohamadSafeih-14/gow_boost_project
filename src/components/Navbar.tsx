import React from 'react';
import NavbarItems from './NavbarItems';
import { auth } from '@clerk/nextjs';

const Navbar = () => {
  const { userId } = auth();


  return (
    <header className='h-fit w-full absolute pt-[30px] px-[10%] z-50'>
      <NavbarItems userId={userId || ''} />
    </header>
  );
};

export default Navbar;
