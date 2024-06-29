import Link from 'next/link'
import React from 'react'

const Page = () => {
  return (
    <section className='h-[100vh] w-full p-[10%] text-center'>
      <h1 className='text-white text-[40px] mt-20 mb-8'>
        Sorry, your order was canceled. Please try again.
      </h1>
      <Link className='bg-red-700 p-2 text-white' href={'/lol-boosting'}>
        Go Back to Get Boosted
      </Link>
    </section>
  )
}

export default Page
