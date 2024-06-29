// components/Accordion.tsx
'use client'
import Link from 'next/link';
import { useState } from 'react';

interface AccordionProps {
  title: string;
  description: string;
}

const AccordionJob: React.FC<AccordionProps> = ({ title, description }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-transparent relative z-10 w-[800px] max-xl:w-[600px] max-lg:w-[400px] max-md:w-[300px] mb-5 border-b border-white unselectable">
      <div
        className="cursor-pointer flex items-center justify-between p-4 transition-all duration-300 ease-in-out"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center">
          <span className="text-3xl text-white mr-2 w-[15px] max-xl:text-2xl">{isOpen ? '-' : '+'}</span>
          <h2 className="text-2xl text-white whitespace-nowrap max-xl:whitespace-normal max-xl:text-xl max-md:text-lg">{title}</h2>
        </div>
        <svg
          className={`w-6 h-6 transform hidden ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </div>
      <div
        className={`transition-all duration-300 ease-in-out ${
          isOpen
            ? 'opacity-100 max-h-[500px] py-4'
            : 'opacity-0 max-h-0 py-0'
        }`}
        style={{ overflow: 'hidden' }}
      >
        {isOpen && (
          <div className=" ml-[50px] h-fit min-h-[50px] mb-[10px] w-fit">
            <p className="text-[#888888] border-l-1 border-[#0073B4] text-[20px] max-xl:text-[16px] max-md:text-[13px] pl-[20px] align-middle pt-1 w-fit">{description} Go to <a href='https://docs.google.com/forms/d/1LQ2Wfcaad2hFooNTNthLq1pPb5L6ZRlcS_Yl9HVCbwQ/edit' target='_blank' className='underline'>Job</a> for more information.(Job is a button too)</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccordionJob;
