import React from 'react'
import {useDispatch} from 'react-redux'
import authService from '../../appwrite/auth'
import {logout} from '../../store/AuthSlice'

function LogoutBtn() {
    const dispatch = useDispatch()
    const logoutHandler = () => {
        authService.logout().then(() => {
          dispatch(logout())
        })
    }
  return (
    <button
    className='text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm-2xl px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none mt-1 text-xl'
    onClick={logoutHandler}
    >Logout</button>
  )
}

export default LogoutBtn
