import React from 'react'
import Image from 'next/image';
import background from '../../../public/images/nature_4k_hd_league_of_legends_wild_rift-t2 1.png';
interface Props {}

const Page = () => {
  return (
    <div className='h-fit min-h-[100vh] w-full pt-[200px] relative px-[10%]'>
      <Image
        src={background}
        draggable={false}
        alt='background'
        className='w-full h-full absolute top-0 left-0 opacity-20 unselectable object-cover'
      />

        <div className='w-fit'>
            <h1 className='text-left text-white text-[80px]'>About Us</h1>
            <hr className='border-[#0073B4] border-[2px] w-full'/>
        </div>
        <p className='text-[#888888] mt-[50px] text-lg w-[70%]'>
        Welcome to GOW BOOST, a distinguished team of seasoned League of Legends enthusiasts dedicated to transforming your gaming experience. We aren&#39;t just a boosting service &#45; we&#39;re a community of passionate players committed to excellence. At GOW BOOST, our skilled team consists of elite players, each chosen for their expertise, integrity, and love for the game.

        As avid gamers ourselves, we understand the challenges and aspirations that come with the competitive landscape of League of Legends. GOW BOOST was founded with a vision to provide personalized and reliable services to help players not only climb the ranks but also enhance their skills and understanding of the game.

        What defines us at GOW BOOST is our unwavering commitment to integrity, security, and customer satisfaction. We prioritize the confidentiality and security of your account, ensuring a safe and trustworthy boosting experience. Our team of professional boosters not only excels in gameplay but also upholds ethical standards, fostering a positive environment for our clients.

        Discover a range of specialized services at GOW BOOST, including division boosts, placement matches, and Duo Boost.  read testimonials from our satisfied clients who have experienced the GOW BOOST difference.

        Join our community and embark on a transformative journey with a team that understands the nuances of League of Legends. GOW BOOST is not just about reaching new ranks; it&#39;s about fostering a supportive environment where players can thrive and elevate their gameplay. Unleash your full potential with GOW BOOST &#45; where passion meets performance!
        </p>
    </div>
  )
}

export default Page