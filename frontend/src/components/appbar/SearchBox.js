import React, { useState } from "react";
import { TextField } from '@material-ui/core';
import {
  fade,
  ThemeProvider,
  withStyles,
  makeStyles,
  createMuiTheme,
} from '@material-ui/core/styles';
import './SearchBox.css'
import {
	ListItem,
	Drawer,
	Divider,
	IconButton
} from "@material-ui/core";
import {MdSearch} from "react-icons/md";

const CssTextField = withStyles({
  root: {

    '& .MuiInputBase-root': {
      color: 'white',
    },

    '& label.Mui-focused': {
      color: 'white',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'white',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'white',
      },
      '&:hover fieldset': {
        borderColor: 'white',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'white',
      },
    },
  },
})(TextField);

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing(1),
  },
}));



export default function SearchBox(props) {
  const classes = useStyles();

  const [name, setName] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
    props.history.push(`/search/name/${name}`);
  };

  return (
    <form className={classes.root} onSubmit={submitHandler} noValidate >
        <CssTextField 
            onChange={(e) => setName(e.target.value)} 
            onSubmit={submitHandler}
            className={classes.margin} 
            id="search" 
            size="small" 
            label="Cerca" 
            variant="outlined" 
            InputLabelProps={{
              style: {
                width: '100%',
                color: 'white'
              } }}
            />
           
    </form>
  );
}
