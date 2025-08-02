import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:3001';

const Add = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [inputs, setInputs] = useState({ title: '', content: '', img_url: '' });
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    if (location.state && location.state.blog) {
      setInputs(location.state.blog);
      setIsUpdate(true);
    }
  }, [location]);

  const inputHandler = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const submitData = () => {
    const url = isUpdate ? `${API_URL}/update/${inputs._id}` : `${API_URL}/add`;
    const method = isUpdate ? 'put' : 'post';

    axios[method](url, inputs)
      .then((res) => {
        alert(res.data.message);
        navigate('/');
      })
      .catch((err) => console.log(err));
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
      <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '60%', maxWidth: '700px', p: 3, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h4" component="h1" color="secondary">
          {isUpdate ? 'Update Blog' : 'Add New Blog'}
        </Typography>
        <TextField variant="outlined" label="Title" name="title" value={inputs.title} onChange={inputHandler} fullWidth />
        <TextField variant="outlined" label="Content" name="content" value={inputs.content} onChange={inputHandler} multiline rows={6} />
        <TextField variant="outlined" label="Image URL" name="img_url" value={inputs.img_url} onChange={inputHandler} />
        <Button variant="contained" color="secondary" onClick={submitData}>
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default Add;