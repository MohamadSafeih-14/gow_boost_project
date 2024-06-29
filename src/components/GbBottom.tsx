import { Button } from '@nextui-org/react'
import Link from 'next/link'
import React from 'react'

const GbBottom = () => {
  return (
    <section className='w-full h-fit pt-[75px] pb-[105px]'>
        <h1 className='text-[80px] text-white text-center'>F.A.Q.</h1>
        <hr className='border-[#0073B4] border-[2px] w-[150%] absolute mb-5'/>
        <div className='w-[90%] flex flex-wrap justify-center mx-auto mt-16'>
            <div className='bg-[#040922] w-[400px] h-[250px] mx-4 my-12 p-6 pt-8 relative'>
                <div className='w-[70px] h-[70px] rounded-[50%]  bg-[#F23838] absolute top-0 -translate-y-[65%] left-[10%] text-center yellow-glow' style={{boxShadow: '0px 0px 25px 8px #f238387a'}}>
                    <span className='text-[60px] text-white absolute left-[35%] -top-2'>?</span>
                </div>

                <h1 className='text-white text-[28px] leading-tight text-left max-md:text-2xl max-md:mb-2 mb-2'>
                    How does ELO boosting <br /> work?
                </h1>
                <p className='text-[#676464] text-medium'>
                    When you place an order, you can track its progress on your dashboard by linking your op.gg account. Once a booster accepts your order, you can chat with them directly on the same page. You&#39;ll also provide your account details through the dashboard.
                </p>
                
            </div>
            <div className='bg-[#040922] w-[400px] h-[250px] mx-4 my-12 p-6 pt-8 relative'>
                <div className='w-[70px] h-[70px] rounded-[50%]  bg-[#FFBC0F] absolute top-0 -translate-y-[65%] left-[10%] text-center yellow-glow' >
                    <span className='text-[60px] text-white absolute left-[35%] -top-2'>?</span>
                </div>

                <h1 className='text-white text-[28px] leading-tight text-left max-md:text-2xl max-md:mb-2 mb-2'>
                    Can I play on my account during the boosting? 
                </h1>
                <p className='text-[#676464] text-medium'>
                    You can communicate with our friendly boosters through our built-in messaging system in the dashboard.
                </p>
                
            </div>
            <div className='bg-[#040922] w-[400px] h-[250px] mx-4 my-12 p-6 pt-8 relative'>
                <div className='w-[70px] h-[70px] rounded-[50%] bg-[#0496FF] absolute top-0 -translate-y-[65%] left-[10%] text-center ' style={{boxShadow: '0px 0px 25px 8px #0496ff56'}}>
                    <span className='text-[60px] text-white absolute left-[35%] -top-2'>?</span>
                </div>

                <h1 className='text-white text-[28px] leading-tight text-left max-md:text-2xl max-md:mb-2 mb-2'>
                    How To Communicate with the booster? 
                </h1>
                <p className='text-[#676464] text-medium'>
                    You can communicate with our friendly boosters through our built-in messaging system in the dashboard.
                </p>
                
            </div>
            <div className='bg-[#040922] w-[400px] h-[250px] mx-4 my-12 p-6 pt-8 relative'>
                <div className='w-[70px] h-[70px] rounded-[50%]  bg-[#46D702] absolute top-0 -translate-y-[65%] left-[10%] text-center' style={{boxShadow: '0px 0px 25px 8px #45d70256'}}>
                    <span className='text-[60px] text-white absolute left-[35%] -top-2'>?</span>
                </div>

                <h1 className='text-white text-[28px] leading-tight text-left max-md:text-2xl max-md:mb-2 mb-2'>
                    Can I Duo with the booster from my account? 
                </h1>
                <p className='text-[#676464] text-medium'>
                    Absolutely! All you have to do is select the &#34;Duo&#34; option in the customization menu before making your purchase.
                </p>
                
            </div>
            <div className='bg-[#040922] w-[400px] h-[250px] mx-4 my-12 p-6 pt-8 relative'>
                <div className='w-[70px] h-[70px] rounded-[50%]  bg-[#BE38FD] absolute top-0 -translate-y-[65%] left-[10%] text-center ' style={{boxShadow: '0px 0px 25px 8px #bf38fd52'}}>
                    <span className='text-[60px] text-white absolute left-[35%] -top-2'>?</span>
                </div>

                <h1 className='text-white text-[28px] leading-tight text-left max-md:text-2xl max-md:mb-2 mb-2'>
                    What is the typical completion time for my order? 
                </h1>
                <p className='text-[#676464] text-medium'>
                  You can trust our highly experienced boosters to swiftly handle your orders. The duration of a LoL boost varies depending on the service you select and the rank you aim for. Nonetheless, the majority of orders are completed within 1-2 days.
                </p>
                
            </div>
            <div className='bg-[#040922] w-[400px] h-[250px] mx-4 my-12 p-6 pt-8 relative'>
                <div className='w-[70px] h-[70px] rounded-[50%]  bg-[#F18506] absolute top-0 -translate-y-[65%] left-[10%] text-center ' style={{boxShadow: '0px 0px 25px 8px #f183065d'}} >
                    <span className='text-[60px] text-white absolute left-[35%] -top-2'>?</span>
                </div>

                <h1 className='text-white text-[28px] leading-tight text-left max-md:text-2xl max-md:mb-2 mb-2'>
                    I don&#39;t like the current booster, can I change them? 
                </h1>
                <p className='text-[#676464] text-medium'>
                    Of course! That can be easily done through the dashboard. However, it will harm the booster&#39;s reputation, so reserve this option for severe situations only
                </p>
            </div>
        </div>
        <h1 className='text-white text-center text-[40px] mb-6 mt-2'>Still Have More Questions?</h1>
        <div className='w-full h-fit flex flex-row justify-center text-white items-center'>
            <Button color="warning"><Link href='/FAQ' target='_blank' className='text-white text-xl'>Read More</Link></Button>
            <span className='mx-5 text-xl'>OR</span>
            <Button color="primary"><Link href='/Contact' target='_blank' className='text-white text-xl'>Contact Us</Link></Button>
        </div>
    </section>
  )
}

export default GbBottom
