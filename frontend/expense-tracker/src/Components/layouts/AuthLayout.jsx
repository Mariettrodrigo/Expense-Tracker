import React from 'react'
import CARD2 from "../../assets/Images/card2.jpg"

const AuthLayout = ({children}) => {
  return <div className='flex'>
    <div>
      <div className='w-screen h-screen md:w-[60vw] px-12 pt-8 pb-12'>
        <h2 className='text-log font-medium text-black'>Expense Tracker</h2>
        {children}
      </div>


    <div className='hidden md:block w-[40vw] h-scrren bg-violet-50 bg-auth-bg-img bg-cover bg-no-repeat bg-center overflow-hidden p-8 relative'/>
    <div className='w-48 h-48 rounded-[40px] bg-purple-600 absolute -top-7 -left-5'/>
    <div className='w-48 h-48 rounded-[40px] border-[20px] border-fuchsia-600 absolute top-[30%] -right-0'/>
    <div className=''/>
    
    <img 
    src={CARD2}
    className=''
    />
  </div>
  </div>
}

export default AuthLayout
