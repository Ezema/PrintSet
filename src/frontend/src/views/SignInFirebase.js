import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import CancelIcon from '@material-ui/icons/Cancel';

/*Import firebase react UI*/
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

let firebase;

const useStyles = makeStyles((theme) => ({
    quasiPaper: {
      /* marginTop: theme.spacing(8), */
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.primary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    mainCointainer: {
      backgroundColor: 'rgba(255,255,255,0.9)',
      backdropFilter: 'blur(3px)',
      position: 'fixed',
      paddingTop: '5vh',
      /* display: 'flex',
      alignItems: 'center',
      alignContent: 'center', */
      minWidth: '100%',
      minHeight: '100%',
      zIndex: '900',
    },
    secondaryContainer: {
      display: 'flex',
      alignSelf:'flex-end',
      justifyContent: 'flex-end',
      padding: '0em 3em',
    }

  }));

export default function SignInFirebase(props){    
    let showLogInScreen = props.showLogInScreen;
    let setShowLogInScreen = props.setShowLogInScreen;
    firebase = props.firebase;
    let setOpenSuccessfulLogInNotification = props.setOpenSuccessfulLogInNotification;
    const signInOptional = props.signInOptional

    const classes = useStyles();
    
        
    firebase.auth().useDeviceLanguage();

    // Configure FirebaseUI.
    const uiConfig = {
        // Popup signin flow rather than redirect flow.
        signInFlow: 'popup',
        // We will display Google and Facebook as auth providers.
        signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        ],
        callbacks: {
        // Avoid redirects after sign-in.
        signInSuccessWithAuthResult: ()=>{setOpenSuccessfulLogInNotification(true)},
        /* signInSuccessWithAuthResult: () => false, */
        },
    };

    function closeSignInScreen(){
      if(showLogInScreen){
        setShowLogInScreen(false)
      }      
    }

    return(
        
        <div className={classes.mainCointainer}>   
            <Container component="main" maxWidth="xs">
                <div className={classes.quasiPaper}>
                  {signInOptional?                  
                  (<div className={classes.secondaryContainer}>
                    <IconButton onClick={()=>closeSignInScreen()}>
                      <CancelIcon color='secondary' fontSize='large'></CancelIcon>
                    </IconButton>
                  </div>)
                  :
                  (<div className={classes.secondaryContainer}>                    
                  </div>)
                  }
                  
                  <Avatar className={classes.avatar}>
                      <LockOutlinedIcon />
                  </Avatar>
                  <Typography component="h1" variant="h5">
                      Iniciar sesión
                  </Typography>     
                  <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />                  
                </div>
            </Container>
        </div>
    )
}