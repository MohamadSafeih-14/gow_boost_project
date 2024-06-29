'use client' // Error components must be Client Components
 
import { Button } from '@nextui-org/react'
import { useEffect } from 'react'
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])
 
  return (
    <div className='bg-[#020512] w-full h-[100vh] py-[100px] text-center pt-[200px]'>
      <h2 className='text-white text-4xl mt-[50px] mb-[25px]'>Something went wrong!</h2>
      <Button color="primary" className='mx-auto'
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </Button>
    </div>
  )
}