import React, { useState } from 'react';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Drawer,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import HomeIcon from '@material-ui/icons/HomeOutlined';
import GroupIcon from '@material-ui/icons/Group';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
}));

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [term, setTerm] = useState('');
  const history = useHistory();

  const fetchResult = (term: string) => {
    axios
      .get(
        `https://crafty-sports-league-backend.herokuapp.com/players/search?name=${term}`,
      )
      .then((res) => {
        history.push({ pathname: '/player', state: res.data });
      });
  };

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            Crafty Motorsports League Roster
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search Players…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              value={term}
              onChange={(event) => {
                setTerm(event.target.value);
              }}
            />
            <Button
              onClick={() => {
                fetchResult(term);
              }}
            >
              Search
            </Button>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        open={open}
        onClose={toggleDrawer}
        anchor={'top'}
        style={{ width: 300 }}
      >
        <ListItem>
          <Link to="/">
            <ListItemText>
              <Button color="secondary" onClick={toggleDrawer}>
                <GroupIcon /> Teams
              </Button>
            </ListItemText>
          </Link>
        </ListItem>
        <ListItem>
          <Link to="/players">
            <ListItemText>
              <Button color="secondary" onClick={toggleDrawer}>
                <HomeIcon /> Players
              </Button>
            </ListItemText>
          </Link>
        </ListItem>
        <ListItem>
          <ListItemText>
            <Button color="secondary" onClick={toggleDrawer}>
              <CloseIcon /> Close
            </Button>
          </ListItemText>
        </ListItem>
      </Drawer>
    </div>
  );
};

export default Navbar;
