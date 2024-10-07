/* eslint-disable no-unused-vars */
import React from 'react'
import Search from './Search'

function Hero() {
  return (
    <div>
        <div className='flex flex-col items-center p-10 py-20
         gap-6 h-[650px] w-full bg-[#eef0fc]'>
            <h2 className='text-lg'>Reduce, Reuse, Recycle, Recover</h2>
            <h2 className='text-[60px] font-bold'>4R For Better Earth</h2>
            
            <Search/>
            <img src='/bin.png' className='mt-10' />
        </div>
    </div>
  )
}

export default Hero