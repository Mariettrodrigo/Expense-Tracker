import React, {useContext } from 'react';
import { UserContext } from '../../context/usercontext';
import Navbar from './Navbar';
import SideMenu from './SideMenu';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const DashboardLayout = ({children, activeMenu}) => {
    const {user} = useContext(UserContext)
  return (
    <div className=''>
        <Navbar activeMenu = {activeMenu} />

        {user && (
            <div className='flex'>
                
                <div className='grow mx-5'>{children}</div>
            </div>
        )}

        <ToastContainer
        position='top-center'
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        />
        </div>
  )
}

export default DashboardLayout
