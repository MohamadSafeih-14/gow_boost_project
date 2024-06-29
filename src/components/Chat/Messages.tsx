import React, { useEffect, useState, useRef } from 'react';
import { toast } from 'react-toastify';
import { pusherClient } from 'src/lib/pusher/client';


interface MessageItem {
  message: any;
  data: any;
}

const Messages = ({ user }: { user: any}) => {
  const scrollableContainerRef = useRef<HTMLDivElement | null>(null);
  const [messages, setMessages] = useState<MessageItem[]>([]);
  useEffect( () => {
    const getMessages = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/get_messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            customer: user,
          }),
        });
        if (response.ok) {
          const data = await response.json();
          setMessages(data.messages || []); // Assuming your API response contains a 'messages' array
        } else {
          toast.error("Failed To Render The Messages")
        }
      } catch (error) {
        toast.error("An Error Occured While Rendering The Messages")
      }
    };

    getMessages();
  }, [])
  useEffect(() => {
    const channel = pusherClient
    .subscribe(`${user.username}_channel`)
    .bind("evt::message", (data: any) => {
      if(data.message.content !== '') {

        setMessages((prevMessages: any) => [...prevMessages, data]);
      } else {
        toast.error("Invalid Message")
      }
      });
    return () => {
      channel.unbind();
    };
  }, [messages]); // Empty dependency array

  
  const scrollToBottom = () => {
    if (scrollableContainerRef.current) {
      scrollableContainerRef.current.scrollTop = scrollableContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="overflow-y-scroll h-[75%] my-[15px] messages " ref={scrollableContainerRef}>
    {messages.map((message: any, index: number) => {
        const dateObj = new Date(message.date);
        const hours = dateObj.getUTCHours();
        const minutes = dateObj.getUTCMinutes().toString().padStart(2, '0');
        const formattedTime = `${hours}:${minutes}`;
      return (

        <div key={index} className={`w-full flex flex-row flex-nowrap ${ message.message.author !== user.username ? 'justify-end pr-3' : 'justify-start'} `}>
          <div
            key={index}
            className={`p-2 w-fit max-w-[200px] whitespace-normal h-fit mb-[27px] rounded-lg relative ${ message.message.author !== user.username ? 'bg-white text-[#0c1333] text-left' : 'bg-[#0c1333] text-white' }`}
            >
            {message.message.content ? message.message.content : message.message.content}
            <p className={`absolute -bottom-6 text-gray-600 text-sm ${message.message.author !== user.username ? 'right-1' : 'left-1'}`}>
              {formattedTime}
            </p>
          </div>
      </div>
          )
    })}
</div>
  );
};

export default Messages;
