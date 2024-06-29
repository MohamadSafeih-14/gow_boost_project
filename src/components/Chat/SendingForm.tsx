'use client'
import React, { useState } from 'react';
import send from '../../../public/images/icons8-send-48.png';
import Image from 'next/image';
import { toast } from 'react-toastify';

interface Props {}

const SendingForm = ({ room_owner, username }: { room_owner: string; username: string }) => {
    const [message, setMessage] = useState('');

    const handleSend = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        const messageContent = message.trim();
        setMessage(''); // Clear the input field

        if (messageContent.length > 0) { // Check if message content is not empty or just spaces
            try {
                const response = await fetch('/api/pusher/send_message', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        message: {
                            content: messageContent,
                            author: username,
                        },
                        channel_name: {
                            name: `${room_owner}_channel`,
                            owner: room_owner.toString(),
                        },
                    }),
                });

                if (!response.ok) {
                    toast.error('Failed to send the message');
                } else {
                    const data = await response.json();
                    if (data.status !== 200) {
                        toast.error('Failed to send the message');
                    }
                }
            } catch (error) {
                // Handle error if needed
            }
        }
    };

    return (
        <form className='w-full h-[50px] text-white text-center bg-[#0c1333] flex chat-form'>
            <input
                className='w-[90%] text-white pl-[15px] bg-transparent border-none outline-none caret-slate-700 h-[40px] my-auto text-lg tracking-widest'
                value={message}
                placeholder='Type Something...'
                onChange={(e) => setMessage(e.target.value)}
            />
            <button className='ml-2 h-full w-[30px] p-0 rounded-[50%] max-2xl:ml-0' onClick={(e) => handleSend(e)}>
                <Image src={send} width={30} height={30} alt='send' />
            </button>
        </form>
    );
};

export default SendingForm;
