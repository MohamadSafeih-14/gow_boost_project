import React from 'react'
import TopMenu from './TopMenu'
import Messages from './Messages'
import SendingForm from './SendingForm'

interface Props {}

const Container = ({customer, username,  booster}: {customer: any, username: string, booster: any}) => {
  return <div className='w-full h-[590px] p-[5px] mt-[15px] rounded-lg messages-bst'>
        <TopMenu image={customer.imageUrl} username={booster.username}/>
        <Messages customer={customer} booster={booster}/>
        <SendingForm room_owner={customer.username} username={username}/>
  </div> 
}

export default Container