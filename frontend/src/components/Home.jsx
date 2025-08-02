import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Card, CardMedia, CardContent, Typography, CardActions, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:3001';

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  const fetchBlogs = () => {
    axios.get(API_URL)
      .then((res) => {
        setBlogs(res.data.reverse()); // Show newest first
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const deleteBlog = (id) => {
    axios.delete(`${API_URL}/delete/${id}`)
      .then(() => {
        alert("Blog deleted successfully");
        fetchBlogs(); // Refresh the blog list
      })
      .catch((err) => console.log(err));
  };

  const updateBlog = (blog) => {
    navigate('/add', { state: { blog } });
  };

  return (
    <Box sx={{ flexGrow: 1, padding: 4 }}>
      <Grid container spacing={4}>
        {blogs.map((blog) => (
          <Grid item xs={12} sm={6} md={4} key={blog._id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia component="img" height="200" image={blog.img_url} alt={blog.title} />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="div">
                  {blog.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {blog.content}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" variant="contained" onClick={() => updateBlog(blog)}>
                  Update
                </Button>
                <Button size="small" variant="contained" color="error" onClick={() => deleteBlog(blog._id)}>
                  Delete
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Home;