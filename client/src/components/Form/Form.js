import React, { useState, useEffect }from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';

import useStyles from './styles';
import { createPost , updatePost} from '../../actions/posts';

const Form = ({ currentId, setCurrentId }) => {


    const [postData, setPostData] = useState({ shop: '', category: '', amount: '', mode: '', selectedFile: '' });
    const post = useSelector((state) => currentId ? state.posts.find((p) => p._id == currentId) : null);
    const classes = useStyles();
    const dispatch = useDispatch();

   
  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);
  
    const clear = () => {
      setCurrentId(null);
       setPostData({ shop: '', category: '', amount: '', mode: '', selectedFile: '' });
      };

      
    const handleSubmit = (e) =>{
        e.preventDefault();

        if (currentId === 0) {
            dispatch(createPost(postData));
            clear();
          } else {
            dispatch(updatePost(currentId, postData));
            clear();
          }
    }
    return (
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit = {handleSubmit}>
            <Typography variant="h6"> {currentId ? 'Editing' : 'Creating'} a Purchase</Typography>
            <TextField name = "shop" variant = "outlined" label = "Shop"fullWidth value = {postData.shop} onChange = {(e) => setPostData({ ...postData, shop: e.target.value })}/>
            <TextField name = "category" variant = "outlined" label = "Category"fullWidth value = {postData.category} onChange = {(e) => setPostData({ ...postData, category: e.target.value })}/>
            <TextField name = "amount" variant = "outlined" label = "Amount"fullWidth value = {postData.amount} onChange = {(e) => setPostData({ ...postData, amount: e.target.value })}/>
            <TextField name = "mode" variant = "outlined" label = "Payment mode, Hashtags"fullWidth value = {postData.mode} onChange = {(e) => setPostData({ ...postData, mode: e.target.value.split(',') })}/>


        <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /></div>
        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
        <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>

            </form>
        </Paper>
    );
}

export default Form;
