import React, { useEffect, useState } from 'react'

interface Props {}

const WriteMessage = () => {
    const [displayModal, setDisplayModal] = useState(true)
    useEffect(() => {
        setDisplayModal(true)
    }, [])
  return (
    <>
    {displayModal ? <div className='w-[600px] min-h-[400px] bg-[#060912] fixed z-10 top-[50%] left-[50%] transform -translate-y-[50%] -translate-x-[50%] text-white rounded-xl p-9'>
    <div className='w-full h-full relative'>
        <span className='text-white text-xl cursor-pointer inline-block absolute -top-5 -right-3' onClick={() => setDisplayModal(false)}>x</span>
        <h1>Hello Brav</h1>
    </div>
  </div> : <></>}
    </>
  )
}

export default WriteMessage