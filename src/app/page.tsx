import background from '../../public/images/0_E6cmgoDR9RzFJZJs 1 10.png';
import { Button } from '@nextui-org/react';
import Image from 'next/image';
import logo from '../../public/images/G_5 3.png';
import Carousel from 'src/components/lolboosting/Carousel';
import discordBackground from '../../public/images/pic-20220422-2048x1208-4550274163 1.png';
import discord from '../../public/images/icons8-discord-400 (2) 1.png'
import Link from 'next/link';
import Steps from 'src/components/Steps';
import Badges from 'src/components/Badges';
export default function Home() {
  const data = [
    { title: 'Card 1', description: 'Description for Card 1' },
    { title: 'Card 2', description: 'Description for Card 2' },
    { title: 'Card 3', description: 'Description for Card 3' },
    { title: 'Card 4', description: 'Description for Card 4' },
  ];



  
  return (
    <section className='h-fit w-full'>
      <Image src={background} draggable={false} alt='background boosting' className='w-full h-full absolute top-0 left-0 opacity-20 unselectable object-cover'/>
      <div className='relative z-10 flex flex-col justify-center h-[100vh]'>
        <Image src={logo} alt='logo' width={175} height={175} className='mx-auto mb-[20px]'/>
        <h1 className='w-full text-5xl text-white text-center mt-[30px]'>
        THE <span className='text-[#D19638]'>FASTEST</span> AND <span className='text-[#0094FF]'>SMOOTHEST</span> ELO BOOST 
        </h1>
        <h1 className='text-white text-[60px] block text-center glow-text-white mb-[20px]'>We Are Hiring Now!</h1>
        <div className='mx-auto '>
          <a className='text-white min-w-[150px] mx-3 text-xl bg-[#0094FF] p-4 rounded-md blue-glow inline-block text-center' href='https://form.jotform.com/240805120995961' target='_blank'>Apply Now!</a>
          <Link href='/lol-boosting' className='text-white min-w-[250px] h-[35px] mx-3 text-xl bg-[#D19638] p-4 rounded-md yellow-glow'>Check The Prices</Link>
        </div>
      </div>

      <Steps />
      <Badges />
      <div className='w-full h-[50px] text-center text-white bg-[#D19638] text-4xl py-1'>
        Don&#39;t just take our word for it
      </div>
      <section className='w-full h-fit text-center py-[150px]'>
        <h1 className='text-white text-6xl spacing tracking-wider mb-5'>
          What Our Customers Say
        </h1>
        <hr className='border-[#FEC557] border-3 w-[500px] mx-auto'/>
        <div className='flex flex-row flex-nowrap justify-between px-[10%] mt-[100px] items-center '>
          {/* <Carousel /> */}
          <Carousel />
        </div>
        
      </section>
      <section className='w-full h-[100vh]  relative' id='discord'>
        <Image src={discordBackground} draggable={false} alt='background boosting' className='w-full h-full absolute top-0 left-0 opacity-20 unselectable object-cover'/>
        <div className='w-full h-full flex flex-col items-center relative z-10'>
          <Image src={discord} alt='discord-img' width={400}/>
          <h1 className='text-white text-7xl glow-text-white text-center'>
            Connect with Us on <br/> Discord!
          </h1>
          <p className='text-white text-center text-xl my-[60px]'>
           Join our vibrant Discord community for exclusive updates, and exceptional customer service. Plus, don&#39;t miss out on our weekly giveaways!
          </p>
          <a href='https://discord.com/invite/KwuUsyEEQb' target='_blank' className='w-[350px] pt-4 h-[70px] text-white text-3xl yellow-glow text-center rounded-[0%] bg-[#D19638] '>Join Our Discord</a>
        </div>
      </section>
      <section className='w-full h-fit min-h-[90vh] py-[5%]'>
      <div className='w-full flex flex-col px-[10%] relative'>
        <h1 className='text-center font-bold text-white text-[70px]'>Frequently Asked Questions</h1>
        <hr className='border-[#0073B4] border-[2px] w-[200%] relative -left-[50%] my-7'/>
            <div className='bg-[#040922] w-full h-[140px] my-4 p-6 relative flex flex-row rounded-xl max-xl:flex-col max-2xl:h-fit faq-hover mt-12'>
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
            <div className='bg-[#040922] w-full h-[140px] my-4 p-6 relative flex flex-row rounded-xl max-xl:flex-col max-2xl:h-fit faq-hover'>
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
            <div className='bg-[#040922] w-full h-[175px] my-4 p-6 relative flex flex-row rounded-xl max-xl:flex-col max-2xl:h-fit faq-hover'>
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
            </div>
            <div className='w-full text-center mt-[50px]'>
              <Button className='mx-auto' color='warning' size='lg'> <Link href={'/FAQ'} className='mx-auto text-white text-xl'>Read More</Link></Button>
            </div>
      </section>
    </section>
  )
}
