import React from 'react';
import SignInFirebase from '../views/SignInFirebase';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Container from '@material-ui/core/Container';
import AccountView from '../views/AccountView.js';

/**
 * Custom container component for the account view.
 * @param {Object} props - The component props.
 * @param {boolean} props.showLogInScreen - Flag indicating whether to show the login screen.
 * @param {function} props.setShowLogInScreen - Function to set the showLogInScreen state.
 * @param {Object} props.firebase - The Firebase object.
 * @param {function} props.setOpenSuccessfulLogInNotification - Function to set the openSuccessfulLogInNotification state.
 * @param {function} props.openAuthErrorNotification - Function to open the auth error notification.
 * @param {function} props.setOpenAuthErrorNotification - Function to set the openAuthErrorNotification state.
 * @param {boolean} props.userIsLoggedIn - Flag indicating whether the user is logged in.
 * @param {Object} props.statefulUserObject - The stateful user object.
 * @returns {JSX.Element} - The rendered component.
 */
export default function ContainerOfAccountView(props) {
  const classes = useStyles();

  const {
    showLogInScreen,
    setShowLogInScreen,
    firebase,
    setOpenSuccessfulLogInNotification,
    openAuthErrorNotification,
    setOpenAuthErrorNotification,
    userIsLoggedIn,
    statefulUserObject,
  } = props;

  const signInOptional = false;

  return (
    <div>
      {!userIsLoggedIn ? (
        <SignInFirebase
          signInOptional={signInOptional}
          firebase={firebase}
          showLogInScreen={showLogInScreen}
          setShowLogInScreen={setShowLogInScreen}
          setOpenSuccessfulLogInNotification={setOpenSuccessfulLogInNotification}
          openAuthErrorNotification={openAuthErrorNotification}
          setOpenAuthErrorNotification={setOpenAuthErrorNotification}
        />
      ) : (
        <AccountView statefulUserObject={statefulUserObject} />
      )}
    </div>
  );
}

// Styles for the component
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));
