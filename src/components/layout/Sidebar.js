import React from 'react'
import {FaHouseUser} from 'react-icons/fa'
import {BiUser} from 'react-icons/bi'
import {GrUserAdmin} from 'react-icons/gr'
import {HiOutlineUserGroup} from 'react-icons/hi'

const Sidebar = () => {
    const sidebarMenu = [
        {
            name: "Home",
            icon: <FaHouseUser style={{fontSize: '21px'}}/>
        },
        {
            name: "User",
            icon: <BiUser style={{fontSize: '21px'}}/>
        },
        {
            name: "Admin",
            icon: <GrUserAdmin style={{fontSize: '21px'}}/>
        },
        {
            name: "Team",
            icon: <HiOutlineUserGroup style={{fontSize: '21px'}}/>
        },
    ]

  return (
    <>
        <div className='h-full w-1/5 border-2 rounded-lg'>
            <div className='h-1/5 flex items-center justify-center'>Logo</div>
            <div className='p-2'>
                <ul>
                    <button className='w-full'>
                    {sidebarMenu.map((value, index) => (
                        <li key={index} className='my-3 active:bg-red-500 p-2 flex items-center pl-4 hover:bg-indigo-600 hover:text-white hover:rounded-md'>
                            <div className='mr-2'>{value.icon}</div>
                            <div>{value.name}</div>
                        </li>
                    ))}
                    </button>
                </ul>
            </div>
        </div>
    </>
  )
}

export default Sidebar