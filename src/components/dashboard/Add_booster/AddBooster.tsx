"use client";
import React from 'react'
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { handleBoosterSubmit } from 'src/lib/actions/user.actions'
interface Props {}

const AddBooster = () => {
    const router = useRouter()
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [massage, setMessage] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
       await handleBoosterSubmit(name, email).then(e => {
        if (e.message && !e.status) {
            setMessage(e.message)
        } else if (e.message && e.status === 200) {
            setSuccess("The Booster Has Been Added!");
            setMessage('');
            router.refresh()
        } else {
            setMessage('')
        }
       }
    );
    }
  return <div className='w-full h-[100vh] pt-[350px] flex  flex-col'>
    <form onSubmit={(e) => handleSubmit(e)} className='w-[50%] flex flex-col mx-auto'>
        <input className='w-[50%] my-[10px] mx-auto h-[40px] p-2 text-xl' onChange={(e) => setEmail(e.target.value)}/>
        <input className='w-[50%] my-[10px] mx-auto h-[40px] p-2 text-xl' onChange={(e) => setName(e.target.value)}/>
        <button className='w-[50%] mx-auto bg-[#0094FF] text-white text-center text-2xl mt-[20px]' type='submit'>add booster</button>
    </form>
    {massage ? <p className='text-red-600 text-center text-xl mt-[50px]'>{massage}</p>: <div></div>}
    {success ? <p className='text-green-600 text-center text-xl mt-[50px]'>{success}</p>: <div></div>}
  </div>
}

export default AddBooster