import React from 'react'
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import appwriteService from "../appwrite/config"
import {Link} from 'react-router-dom'
// import {useSelector} from 'react-redux'//laterUse

export default function ActionAreaCard({$id, title, featuredImage}) {
  return (
    <Link  to={`/post/${$id}`}>
      <Card >
        <CardActionArea >
          <CardMedia
            component="img"
            className="lg:w-full lg:h-64 h-48 w-40 md:w-full md:h-69 object-cover rounded-xl border-2 border-white"
            image={featuredImage && appwriteService.getFilePreview(featuredImage) || ""}
            alt={title}
          />
          <div
            className="hover:bg-transparent transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-25">
          </div>
        </CardActionArea>
      </Card>
    </Link>
  );
}