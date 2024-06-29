import React from 'react'
import TopMenu from './TopMenu'
import Messages from './Messages'
import SendingForm from './SendingForm'

interface Props {}

const Container = ({user, username, booster, boosting_status}: {user: any, username: string, booster: any, boosting_status: string}) => {
  return <div className='w-full h-[620px] p-[5px] mt-[15px] rounded-lg messages'>
        <TopMenu image={booster.imageUrl} username={booster.username} boosting_status={boosting_status}/>
        <Messages user={user}/>
        <SendingForm room_owner={user.username} username={username} />
  </div>
}

export default Container