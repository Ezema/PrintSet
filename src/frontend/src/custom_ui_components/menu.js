import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Avatar from '@material-ui/core/Avatar';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import SideBar from './SideBar.js';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    position: "sticky",
    zIndex: "1000",
    top: 0,
    width: '100%'
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  avatarSmall: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    color: theme.palette.getContrastText('rgb(255,255,255)'),
    backgroundColor: 'white',
  },
}));

export default function MenuAppBar(props) {
  const classes = useStyles();

  let firebase = props.firebase;
  let statefulUserObject = props.statefulUserObject;
  let setStatefulUserObject = props.setStatefulUserObject;
  let userIsLoggedIn = props.userIsLoggedIn;
  let setUserIsLoggedIn = props.setUserIsLoggedIn;

  let URI = props.URI;
  let setURI = props.setURI;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleSignOut = () => {
    setAnchorEl(null);

    firebase.auth().signOut().then(function () {}, function (error) {});
  };

  function handleChangeUILogIn(event) {
    if (!userIsLoggedIn) {
      if (props.showLogInScreen) {
        props.setShowLogInScreen(false);
      } else {
        props.setShowLogInScreen(true);
      }
    } else if (userIsLoggedIn) {
      setAnchorEl(event.currentTarget);
    }
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <SideBar URI={URI} setURI={setURI}></SideBar>

          <Typography variant="h5" className={classes.title}>
            <Link underline="none" onClick={() => setURI('/')} color="inherit">
              PrintSet
            </Link>
          </Typography>

          {URI === '/' ? (
            <div>
              <IconButton onClick={handleChangeUILogIn} color="inherit">
                {statefulUserObject ? (
                  statefulUserObject.uid ? (
                    <Avatar
                      alt="User"
                      src={statefulUserObject.photoURL}
                      className={classes.avatarSmall}
                    >
                      {statefulUserObject.displayName ? statefulUserObject.displayName[0] : 'User'}
                    </Avatar>
                  ) : null
                ) : (
                  <AccountCircle />
                )}
              </IconButton>

              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                keepMounted
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={open}
                onClose={() => setAnchorEl(null)}
              >
                <MenuItem onClick={handleSignOut}>Cerrar Sesión</MenuItem>
              </Menu>
            </div>
          ) : null}
        </Toolbar>
      </AppBar>
    </div>
  );
}
