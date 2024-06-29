'use client'
import React from 'react'
import Getboosted from './lolboosting/Getboosted'
import store from '../store/store';
import { Provider } from 'react-redux';
const GetBoostedWrapper = () => {
  return (
    <Provider store={store}>
        <div>
          <Getboosted />
        </div>
    </Provider>
  )
}

export default GetBoostedWrapper
