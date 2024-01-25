import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
//import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
//import InboxIcon from '@material-ui/icons/MoveToInbox';
//import MailIcon from '@material-ui/icons/Mail';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import LocalPrintshopIcon from '@material-ui/icons/LocalPrintshop';
import ArchiveIcon from '@material-ui/icons/Archive';
import ChatIcon from '@material-ui/icons/Chat';

import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

export default function SideBar(props) {

  const URI = props.URI;
  const setURI = props.setURI;

  const classes = useStyles();
  const [state, setState] = React.useState({    
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  function handleChangeRoute(route){
    /* window.location.pathname = route */
    window.history.pushState(route, route, route);
    setURI(route)
  }

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: 'left' === 'top' || 'left' === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer('left', false)}
      onKeyDown={toggleDrawer('left', false)}
    >
      <List>      
        <ListItem button selected={URI === '/' ? true : false} component="a" onClick={()=>handleChangeRoute('/')}>        
          <ListItemIcon>
            <LocalPrintshopIcon/>
          </ListItemIcon>
          <ListItemText primary="Imprimir"/>                    
        </ListItem>
        
        <ListItem button selected={URI === '/mis-pedidos' ? true : false} component="a" onClick={()=>handleChangeRoute('/mis-pedidos')}>
          <ListItemIcon>
            <ArchiveIcon/>
          </ListItemIcon>
          <ListItemText primary="Pedidos"/>
        </ListItem>

        <ListItem button selected={URI === '/cuenta' ? true : false} component="a" onClick={()=>handleChangeRoute('/cuenta')}>
          <ListItemIcon>
            <AccountCircleIcon />
          </ListItemIcon>
          <ListItemText primary="Mi cuenta"/>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button selected={URI === '/contacto' ? true : false} component="a" onClick={()=>handleChangeRoute('/contacto')}>
          <ListItemIcon>
            {/* <InboxIcon />  */}
            <ChatIcon />
          </ListItemIcon>
          <ListItemText primary="Contacto"/>
        </ListItem>        
      </List>
    </div>
  );

  return (
    <div>      
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={toggleDrawer('left', true)}>
            <MenuIcon />
          </IconButton>
          <Drawer anchor='left' open={state['left']} onClose={toggleDrawer('left', false)}>
            {list()}
          </Drawer>
    </div>
  );
}
