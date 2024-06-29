import { Button, Chip, Switch, Tooltip } from '@nextui-org/react'
import Image from 'next/image';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setBoostType, setPriorityOrder, setOfflineVpn, setSpells } from 'src/store/slices/calculatorSlice';
import { RootState } from 'src/store/slices/rootReducer';
import arrow from '../../../public/images/icons8-right-arrow-50.png';
import soloBackground from '../../../public/images/solo_background.png'
import duoBackground from '../../../public/images/duo_background.png'

const Options = ({startRank, startDivision, endRank, endDivision}: {startRank: string, startDivision: number, endRank: string, endDivision: number}) => {
    const { boostType, spells, offlineVpn, priorityOrder } = useSelector((state: RootState) => state.calculator);
    const dispatch = useDispatch();
    const [summonerSpells, setSummonersSpells] = useState(false);
    const [offlineModeAndVpn, setOfflineModeAndVpn] = useState(false);
    const [priorityOrder1, setPriorityOrder1] = useState(false);

    return  (
      <>
        <div className='h-[50px] text-center pt-[30px] mb-[50px]'> 
            <p><span className='text-[#FFA800] text-xl glow-text-yellow uppercase align-middle'>{startRank} {startDivision}</span> <Image draggable={false} className='inline-block unselectable mx-3 h-[40px]' src={arrow} height={5} width={50} alt="right_arrow"/> <span className='text-[#0073B4] text-xl uppercase glow-text align-middle'>{endRank} {endDivision}</span></p>
        </div>
        <div className='text-white text-xl max-md:text-[15px] text-left mb-8 mt-4 px-10 flex justify-between'>
            <span className='align-top whitespace-nowrap'>Choose your Summoner Spells <Chip size='sm' className='text-white text-medium mb-1 ml-1' color='success'>Free</Chip></span>
            <Switch isSelected={summonerSpells} onChange={() => dispatch(setSpells(summonerSpells))} onClick={() => setSummonersSpells(!summonerSpells)} className='sm:block hidden'/>
            <Switch isSelected={summonerSpells} onChange={() => dispatch(setSpells(summonerSpells))} onClick={() => setSummonersSpells(!summonerSpells)} className='sm:hidden block' size='sm'/>
        </div>
        <div className='text-white text-xl max-md:text-[15px] text-left mb-8 px-10 flex justify-between flex-row'>
            <span className='align-top whitespace-nowrap'>Offline Mode + VPN <Chip size='sm' className='text-white text-medium mb-1 ml-1' color='success'>Free</Chip></span>
            <Switch isSelected={offlineModeAndVpn} onChange={() => dispatch(setOfflineVpn(offlineModeAndVpn))} onClick={() => setOfflineModeAndVpn(!offlineModeAndVpn)} className='sm:block hidden'/>
            <Switch className='sm:hidden block' size='sm'/>
        </div>
        <div className='text-white text-xl max-md:text-[15px] text-left mb-[49px] px-10 flex justify-between flex-row'>
            <span className='align-top whitespace-nowrap'>Priority Order <Chip size='sm' className='text-white text-medium mb-1 ml-1' color='warning'>+20%</Chip></span>
            <Switch isSelected={priorityOrder1} onChange={() => dispatch(setPriorityOrder(priorityOrder1))} onClick={() => setPriorityOrder1(!priorityOrder1)} className='sm:block hidden'/>
            <Switch className='sm:hidden block' size='sm'/>
        </div>
        <div className='h-[70px] max-md:h-[50px] w-full flex flex-row flex-nowrap relative'>
            {/* <Image src={soloBackground} className='h-full w-[61%] absolute top-0 left-0 solo' alt='solo'/> */}
            {/* <Image src={duoBackground} className='h-full w-[55%] absolute top-0 right-0 duo' alt='duo'/> */}
            <div className={`w-[10%] h-full top-0 left-0 absolute ${boostType === "Solo" ? 'bg-[#D19638]' : 'bg-[#785512] '} -z-10 block`}></div>
            <div className={`w-[10%] h-full top-0 right-0 absolute ${boostType === "Duo" ? 'bg-blue-600' : 'bg-blue-950'} -z-10 block`}></div>
            <div className={`w-1/2 cursor-pointer text-center text-white text-3xl max-md:text-xl pt-[5px] max-md:pt-[1px] relative solo-hover ${boostType === "Solo" ? 'bg-[#D19638]' : 'bg-[#785512]'} transform skew-x-12 ml-2`}>
                <Tooltip content="Booster Plays On Your Account" color='warning' className='text-white z-0' isOpen={boostType === "Duo" ? true : false}>
                    <Button onClick={() => dispatch(setBoostType("Solo"))} className={`bg-transparent absolute w-full h-full top-0 left-0 z-10 text-white text-3xl ${boostType === "Solo" ? 'text-white' : 'text-[#ffffffb4]'}` }><span className='-skew-x-12 inline-block'>Solo</span></Button>
                </Tooltip>
            </div>
            <div className={`w-1/2 cursor-pointer text-center text-white text-3xl max-md:text-xl pt-[5px] max-md:pt-[1px] relative duo-hover ${boostType === "Duo" ? 'bg-blue-600' : 'bg-blue-950'} transform skew-x-12 mr-2`}>
                <Tooltip content="You Team Up With A Booster" color='primary' className='text-white z-0' isOpen={boostType === "Solo" ? true : false}>
                    <Button onClick={() => dispatch(setBoostType("Duo"))} className={`bg-transparent absolute w-full h-full top-0 left-0 z-10 text-3xl ${boostType === "Duo" ? 'text-white' : 'text-[#ffffff95]'}`}><span className='-skew-x-12 inline-block'>Duo</span></Button>
                </Tooltip>
            </div>
        </div>
      </>
    );
}

export default Options;
