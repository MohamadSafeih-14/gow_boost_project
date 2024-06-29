'use client';

import { pusherClient } from "../lib/pusher/client/index";
import { useEffect, useState } from "react";

interface MessageListProps {

}

interface MessageItem {
    message: any;
    data: any;
  }
  
export default function MessageList({ userFromDB }: { userFromDB: any }) {
    const user = JSON.parse(userFromDB);
    const [messages, setMessages] = useState<MessageItem[]>([]);
    const [inputMessage, setInputMessage] = useState('');
    useEffect(() => {
      const channel = pusherClient
      .subscribe(`${user.username}_channel`)
      .bind("evt::message", (data: any) => {
          setMessages((prevMessages) => [...prevMessages, data]);
        });
      return () => {
        channel.unbind();
      };
    }, [messages]); // Empty dependency array
    
    // Check if messages are updated

      
    const handleTestClick = async (message: string) => {
        let data = await fetch('/api/pusher/send_message', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message, channel_name: `${user.username}_channel` })
        })
        let json = await data.json()

    }

    return (
        <div className="flex flex-col pt-[50px]">
            <input onChange={(e) => setInputMessage(e.target.value)} value={inputMessage}/>
            <button
                className="w-[240px] bg-slate-600 hover:bg-slate-500 rounded p-2 m-2"
                onClick={() => {
                    setInputMessage('')
                    handleTestClick(inputMessage)}
                }>
                    Send
            </button>

            <div className="bg-blue-500 text-white border border-black p-4 rounded-lg">
            {messages.map((message, index) => (
                <div key={index} className="mb-2">
                {message.message}
        </div>
      ))}
    </div>
        </div>
    );
};