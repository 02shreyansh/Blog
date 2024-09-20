import * as React from 'react';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import appwriteService from "../appwrite/config";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import Button from "../Components/Button"; 
import parse from "html-react-parser";

export default function ActionAreaCard() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();
  
  const userData = useSelector((state) => state.auth.userData);
  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) setPost(post);
        else navigate("/");
      });
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  return post ? (
    <Card sx={{ maxWidth: 2000, margin: 6 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={appwriteService.getFilePreview(post.featureImage)}
          alt={post.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {post.title}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', maxHeight: '400px', overflowY: 'auto' }}>
            {parse(post.content || '')} 
          </Typography>
        </CardContent>
      </CardActionArea>
      {isAuthor && (
        <div style={{ position: 'absolute', right: '55px', top: '120px' }}>
          <Link to={`/edit-post/${post.$id}`}>
            <Button bgColor="bg-green-500" className="mr-3">
              Edit
            </Button>
          </Link>
          <Button bgColor="bg-red-500" onClick={deletePost}>
            Delete
          </Button>
        </div>
      )}
    </Card>
  ) : null;
}