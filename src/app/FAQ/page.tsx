import React from 'react'
import Image from 'next/image';
import background from '../../../public/images/nature_4k_hd_league_of_legends_wild_rift-t2 1.png';
import Accordion from 'src/components/Accordion';
import AccordionContact from 'src/components/AccordionContact';
import AccordionJob from 'src/components/AccordionJob';
import Link from 'next/link';

interface Props {}

const Page = () => {

    return (
    <div className='bg-[#020512] h-fit min-h-[100vh] w-full pt-[140px] py-[50px]'>
    {/* <Image src={background} draggable={false} alt='background' className='w-full h-full absolute top-0 left-0 opacity-[15%] unselectable '/> */}

         <h1 className='text-center text-white text-[70px] mb-[25px]'>Frequently Asked Questions</h1>
         <hr className='border-[#0073B4] border-[2px] w-[150%] absolute'/>
        <div className='w-full flex flex-col px-[10%] pt-[60px]'>
            <div className='bg-[#040922] w-full h-[140px] my-4 p-6 relative flex flex-row rounded-xl max-xl:flex-col max-2xl:h-fit'>
                    <div className='w-[7%] mr-6 xl:flex xl:justify-center xl:items-center'>
                        <div className='w-[70px] h-[70px] rounded-[50%] flex justify-center items-center bg-[#46D702] text-center mb-2' style={{boxShadow: '0px 0px 25px 8px #45d70256'}}>
                            <span className='text-[60px] text-white'>?</span>
                        </div>
                    </div>
                    <div className='w-[93%]'>
                        <h1 className='text-white text-[32px] leading-tight text-left max-md:text-2xl max-md:mb-2 mb-2'>
                            How does ELO boosting work and what can I expect?
                        </h1>
                        <p className='text-[#504D4D] text-medium'>
                        When you place your order, you&#39;ll access your dashboard to link your op.gg and monitor your order&#39;s progress. 
                        Our boosters claim orders on their own, and once a booster accepts yours, you can communicate with them via the same page to proceed. Additionally, you can provide your account details through the dashboard. 
                        </p>
                    </div>
            </div>
            <div className='bg-[#040922] w-full h-[140px] my-4 p-6 relative flex flex-row rounded-xl max-xl:flex-col max-2xl:h-fit'>
                    <div className='w-[7%] mr-6 xl:flex xl:justify-center xl:items-center'>
                        <div className='w-[70px] h-[70px] rounded-[50%] flex justify-center items-center bg-[#F23838] text-center mb-2' style={{boxShadow: '0px 0px 25px 8px #631111'}}>
                            <span className='text-[60px] text-white'>?</span>
                        </div>
                    </div>
                    <div className='w-[93%]'>
                        <h1 className='text-white text-[32px] leading-tight text-left max-md:text-2xl max-md:mb-2 mb-2'>
                            What is the typical completion time for my order?
                        </h1>
                        <p className='text-[#504D4D] text-medium'>
                            You can trust our highly experienced boosters to swiftly and accurately handle your order, eliminating concerns about delays or errors. The duration of a LoL boost varies depending on the service you select and the rank you aim for. Nonetheless, the majority of orders are completed within 1-2 days.
                        </p>
                    </div>
            </div>
            <div className='bg-[#040922] w-full h-[175px] my-4 p-6 relative flex flex-row rounded-xl max-xl:flex-col max-2xl:h-fit'>
                    <div className='w-[7%] mr-6 xl:flex xl:justify-center xl:items-center'>
                        <div className='w-[70px] h-[70px] rounded-[50%] flex justify-center items-center bg-[#FFBC0F] text-center mb-2' style={{boxShadow: '0px 0px 25px 8px #bf931f'}}>
                            <span className='text-[60px] text-white'>?</span>
                        </div>
                    </div>
                    <div className='w-[93%]'>
                        <h1 className='text-white text-[32px] leading-tight text-left max-md:text-2xl max-md:mb-2 mb-2'>
                            Is it safe to get boosted?
                        </h1>
                        <p className='text-[#504D4D] text-medium'>
                            Duo boosting has been reported as entirely safe, with no incidents reported. While solo boosting carries some risks, GOW BOOST takes extensive precautions to minimize them. Our boosters use VPNs to match your region&#39;s IP address, and they can also appear offline to avoid interactions with anyone on your friend list. Despite these efforts, there remains a slight chance of detection, potentially resulting in penalties. While GOW BOOST cannot offer a 100% guarantee of safety, we diligently work to reduce risks and protect your account to the best of our ability. 
                        </p>
                    </div>
            </div>
            <div className='bg-[#040922] w-full h-[140px] my-4 p-6 relative flex flex-row rounded-xl max-xl:flex-col max-2xl:h-fit'>
                    <div className='w-[7%] mr-6 xl:flex xl:justify-center xl:items-center'>
                        <div className='w-[70px] h-[70px] rounded-[50%] flex justify-center items-center bg-[#0496FF] text-center mb-2' style={{boxShadow: '0px 0px 25px 8px #124b73'}}>
                            <span className='text-[60px] text-white'>?</span>
                        </div>
                    </div>
                    <div className='w-[93%]'>
                        <h1 className='text-white text-[32px] leading-tight text-left max-md:text-2xl max-md:mb-2 mb-2'>
                            How do you guarantee that my account won&#39;t get stolen?
                        </h1>
                        <p className='text-[#504D4D] text-medium'>
                        At GOW BOOST, security is paramount, and we&#39;ve never encountered an instance of account theft. We employ VPNs to increase the safety of your account. Moreover, we exclusively hire the most trustworthy and seasoned players in League Of Legends. 
                        </p>
                    </div>
            </div>
            <div className='bg-[#040922] w-full h-[140px] my-4 p-6 relative flex flex-row rounded-xl max-xl:flex-col max-2xl:h-fit'>
                    <div className='w-[7%] mr-6 xl:flex xl:justify-center xl:items-center'>
                        <div className='w-[70px] h-[70px] rounded-[50%] flex justify-center items-center bg-[#BE38FD] text-center mb-2' style={{boxShadow: '0px 0px 25px 8px #630054'}}>
                            <span className='text-[60px] text-white'>?</span>
                        </div>
                    </div>
                    <div className='w-[93%]'>
                        <h1 className='text-white text-[32px] leading-tight text-left max-md:text-2xl max-md:mb-2 mb-2'>
                            Will the booster communicate with my friends during the boost?
                        </h1>
                        <p className='text-[#504D4D] text-medium'>
                        No, the booster will have the option to play offline, preventing any interactions via in-game chat. This also disables the ability for other players to spectate the game using the client. 
                        </p>
                    </div>
            </div>
            <div className='bg-[#040922] w-full h-[140px] my-4 p-6 relative flex flex-row rounded-xl max-xl:flex-col max-2xl:h-fit'>
                    <div className='w-[7%] mr-6 xl:flex xl:justify-center xl:items-center'>
                        <div className='w-[70px] h-[70px] rounded-[50%] flex justify-center items-center bg-[#F18506] text-center mb-2' style={{boxShadow: '0px 0px 25px 8px #875116'}}>
                            <span className='text-[60px] text-white'>?</span>
                        </div>
                    </div>
                    <div className='w-[93%]'>
                        <h1 className='text-white text-[32px] leading-tight text-left max-md:text-2xl max-md:mb-2 mb-2'>
                            How will I know when my order is complete?
                        </h1>
                        <p className='text-[#504D4D] text-medium'>
                            You&#39;ll receive a notification once your order is complete. Additionally, you can always log into your account to check the status of your order at any time. 
                        </p>
                    </div>
            </div>
            <div className='bg-[#040922] w-full h-[140px] my-4 p-6 relative flex flex-row rounded-xl max-xl:flex-col max-2xl:h-fit'>
                    <div className='w-[7%] mr-6 xl:flex xl:justify-center xl:items-center'>
                        <div className='w-[70px] h-[70px] rounded-[50%] flex justify-center items-center bg-[#06f18f] text-center mb-2' style={{boxShadow: '0px 0px 25px 8px #127760'}}>
                            <span className='text-[60px] text-white'>?</span>
                        </div>
                    </div>
                    <div className='w-[93%]'>
                        <h1 className='text-white text-[32px] leading-tight text-left max-md:text-2xl max-md:mb-2 mb-2'>
                            Can I play on my account during the boosting process?
                        </h1>
                        <p className='text-[#504D4D] text-medium'>
                        Yes and no. You&#39;re free to play any queue other than the one you&#39;ve ordered boosting for, as playing in that specific queue would affect the progress of your order. However, if you wish to play using your account, you must pause the order. You can find the pause button on your order page. 
                        </p>
                    </div>
            </div>
            <div className='bg-[#040922] w-full h-[166px] my-4 p-6 relative flex flex-row rounded-xl max-xl:flex-col max-2xl:h-fit'>
                    <div className='w-[7%] mr-6 xl:flex xl:justify-center xl:items-center'>
                        <div className='w-[70px] h-[70px] rounded-[50%] flex justify-center items-center bg-[#4d06f1] text-center mb-2' style={{boxShadow: '0px 0px 25px 8px #430065'}}>
                            <span className='text-[60px] text-white'>?</span>
                        </div>
                    </div>
                    <div className='w-[93%]'>
                        <h1 className='text-white text-[32px] leading-tight text-left max-md:text-2xl max-md:mb-2 mb-2'>
                            What happens if my account gets banned or muted for toxicity?
                        </h1>
                        <p className='text-[#504D4D] text-medium'>
                        While we have strict guidelines in our terms of conditions prohibiting toxicity, in the rare event that your account is muted/banned due to the misuse of your account, we will provide significant compensation in RP. Furthermore, the booster responsible will face a lifetime ban, and we will take proactive measures to ensure they are banned from other boosting platforms as well. 
                        </p>
                    </div>
            </div>
            <div className='bg-[#040922] w-full h-[140px] my-4 p-6 relative flex flex-row rounded-xl max-xl:flex-col max-2xl:h-fit'>
                    <div className='w-[7%] mr-6 xl:flex xl:justify-center xl:items-center'>
                        <div className='w-[70px] h-[70px] rounded-[50%] flex justify-center items-center bg-[#f12106] text-center mb-2' style={{boxShadow: '0px 0px 25px 8px #571107'}}>
                            <span className='text-[60px] text-white'>?</span>
                        </div>
                    </div>
                    <div className='w-[93%]'>
                        <h1 className='text-white text-[32px] leading-tight text-left max-md:text-2xl max-md:mb-2 mb-2'>
                            What if I am dissatisfied with the booster on my account? Can I swap boosters?
                        </h1>
                        <p className='text-[#504D4D] text-medium'>
                        If, for some reason, you are not satisfied with the booster, you can use your order dashboard to request a new one. If we have one available, the order will be instantly transferred. 
                        </p>
                    </div>
            </div>
            <div className='bg-[#040922] w-full h-[140px] my-4 p-6 relative flex flex-row rounded-xl max-xl:flex-col max-2xl:h-fit'>
                    <div className='w-[7%] mr-6 xl:flex xl:justify-center xl:items-center'>
                        <div className='w-[70px] h-[70px] rounded-[50%] flex justify-center items-center bg-[#f106ce] text-center mb-2' style={{boxShadow: '0px 0px 25px 8px #510835'}}>
                            <span className='text-[60px] text-white'>?</span>
                        </div>
                    </div>
                    <div className='w-[93%]'>
                        <h1 className='text-white text-[32px] leading-tight text-left max-md:text-2xl max-md:mb-2 mb-2'>
                            Can I communicate with the booster assigned to my order?
                        </h1>
                        <p className='text-[#504D4D] text-medium'>
                        Absolutely! Once the booster has claimed your order, you can communicate directly with them through the dashboard. Moreover, you have the option to schedule specific times for the booster to play, ensuring it aligns with your preferences and availability.
                        </p>
                    </div>
            </div>
            <div className='bg-[#040922] w-full h-[140px] my-4 p-6 relative flex flex-row rounded-xl max-xl:flex-col max-2xl:h-fit'>
                    <div className='w-[7%] mr-6 xl:flex xl:justify-center xl:items-center'>
                        <div className='w-[70px] h-[70px] rounded-[50%] flex justify-center items-center bg-[#9bf106] text-center mb-2' style={{boxShadow: '0px 0px 25px 8px #45d70256'}}>
                            <span className='text-[60px] text-white'>?</span>
                        </div>
                    </div>
                    <div className='w-[93%]'>
                        <h1 className='text-white text-[32px] leading-tight text-left max-md:text-2xl max-md:mb-2 mb-2'>
                            Can I get a refund for my boosting order?
                        </h1>
                        <p className='text-[#504D4D] text-medium'>
                            If you wish to receive a refund for your boosting service, you may do so in accordance with our refund policy 
                        </p>
                    </div>
            </div>
            <div className='w-full h-[140px] my-4  p-6 relative flex flex-row rounded-xl max-xl:flex-col max-2xl:h-fit'>
                    <div className='w-full'>
                        <h1 className='text-white text-[32px] leading-tight text-center max-md:text-2xl max-md:mb-2 mb-2'>
                            What if I have more questions and can&#39;t find them here?
                        </h1>
                        <p className='text-[#504D4D] text-medium text-center'>
                            You can reach us on <Link href={'/Contact'}><span className='text-white underline mx-1'>Contact Us</span></Link> page
                        </p>
                    </div>
            </div>
        </div>
  </div>
  )
}

export default Page