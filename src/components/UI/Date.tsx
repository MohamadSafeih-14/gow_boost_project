import React from 'react'

interface Props {}

const Date = ({order}: {order: any}) => {
  return <div className='text-left my-2'><span className='text-gray-600 block mb-1 mt-5'>Order Date: </span><span>{order.createdAt ? order.createdAt.toLocaleDateString() : "No date for this order"}</span></div>

}

export default Date