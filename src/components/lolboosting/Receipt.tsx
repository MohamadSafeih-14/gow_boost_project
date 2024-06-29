import React, { FC } from 'react'
import {Button, Switch} from "@nextui-org/react";
import skew from '../../../public/images/skew.png';
import Image from 'next/image';
import { handleCheckout } from 'src/actions/checkoutStripe';
import getUser from 'src/actions/auth';
import PaymentForm from './PaymentForm';
import Options from './Options';


interface orderDetails {
  startRank: string,
  startDivision: number,
  endRank: string,
  endDivision: number,
  server: string,
  lpRange: string,
  boostType: string,
  spells: boolean,
  offlineVpn: boolean,
  priorityOrder: boolean,
  queueType: string,
  result: number,
}
const Receipt: FC<orderDetails> = ({startRank, startDivision, endRank, endDivision, server, lpRange,boostType, spells, offlineVpn, priorityOrder, queueType ,result}) => {

  return (
    <div className='h-[580px] w-[450px]  relative z-10 max-lg:mx-auto max-md:h-[490px] max-md:w-[350px] max-md:mb-[20px] max-sm:w-[300px]'>
      <div className='h-full w-full absolute top-0 left-0 bg-[#020512] -z-20 opacity-70 box-shadow'></div>
        <div className='flex flex-col w-full relative'>
            <Options startRank={startRank} startDivision={startDivision} endRank={endRank} endDivision={endDivision}/>   

            <div className='p-[30px] w-full flex flex-row justify-between max-md:p-[15px] max-md:px-[25px]'>
              <div className='text-white text-3xl'>Total Amount</div> <div className='text-white text-2xl flex flex-col flex-nowrap'><span>{server === "EUW" ? '€': '$'}{result > 0 && result ? result.toFixed(2) : 0}</span><span className='text-gray-600 text-medium line-through'>${(result > 0 && result ? Number(result / 0.9).toFixed(2)  : null) ||  0 } </span></div>
            </div>
            
            <PaymentForm 
                    startRank={startRank}
                    startDivision={startDivision}
                    endRank={endRank}
                    endDivision={endDivision}
                    server={server}
                    lpRange={lpRange}
                    boostType={boostType}
                    spells={spells}
                    offlineVpn={offlineVpn}
                    priorityOrder={priorityOrder}
                    queueType={queueType}
                    result={result!}
            />
        </div>
    </div>
  )
}

export default Receipt;
