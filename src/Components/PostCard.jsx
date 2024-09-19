import React, { useEffect ,useState} from 'react'
import appwriteService from "../appwrite/config"
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'//laterUse

function PostCard({$id, title, featuredImage}) {
  const currentDate = new Date();
  const monthIndex = currentDate.getMonth();
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const monthName = months[monthIndex];
  const day = currentDate.getDate();
  return (
    <Link to={`/post/${$id}`}>
        <div className="rounded overflow-hidden shadow-lg">
          <div className="relative">
            <img className="w-full"
              src={featuredImage && appwriteService.getFilePreview(featuredImage) || ""} alt={title}/>
            <div
                className="hover:bg-transparent transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-25">
            </div>
            <div
                className="text-sm absolute top-0 right-0 bg-indigo-600 px-4 text-white rounded-full h-16 w-16 flex flex-col items-center justify-center mt-3 mr-3 hover:bg-white hover:text-indigo-600 transition duration-500 ease-in-out">
                <span class="font-bold">{day}</span>
                <small>{monthName}</small>
            </div>
          </div>
          <div className="px-6 py-4">
            <p 
                className="font-semibold text-lg inline-block text-indigo-600 transition duration-500 text-lg-center ease-in-out">{title}
            </p>
          </div>
        </div>
    </Link>
  )
}
export default PostCard