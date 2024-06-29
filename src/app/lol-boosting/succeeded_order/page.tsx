"use client";
import Link from 'next/link'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
const Page = () => {
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/dashboard/boosting')
    }, 3000)
    return () => clearTimeout(timer)
  }, [router])

  return (
    <section className='h-[100vh] w-full p-[10%] text-center'>
      <h1 className='text-white text-[40px] mt-20 mb-8'>
        Thanks for choosing our LoL boosting service! Need help? We&#39;re here for you. Happy climbing!
      </h1>
      <Link className='bg-green-500 p-2 text-white' href={'/dashboard/boosting'}>Go to Dashboard</Link>
    </section>
  )
}

export default Page
