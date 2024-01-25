/*Import React and other meta*/
import React from 'react';
import '../styles/index.css';

/* Import own function components*/
import DocumentsBuilding from '../custom_ui_components/documentsBuilding.js';
import Menu from '../custom_ui_components/menu.js';
/* import Hidden from '@material-ui/core/Hidden'; */
import Snackbar from '@material-ui/core/Snackbar';
import CartBuilding from '../views/CartBuilding.js';
import Footer from '../custom_ui_components/footer-nav.js';
import PaymentGateway from '../views/PaymentGateway.js';
import SignInFirebase from '../views/SignInFirebase.js';

import ReactStyleFunction from '../styles/customGlobalStyles.js';

/* Import views*/
import ContainerOfAccountView from '../custom_ui_components/ContainerOfAccountView.js';
import ContainerOfContact from '../custom_ui_components/ContainerOfContact.js';
import ContainerOfPreviousOrders from '../custom_ui_components/ContainerOfPreviousOrders.js';
import OrderCanceled from '../views/OrderCanceled';
import OrderSuccess from '../views/OrderSuccess';

/*Import material UI components*/
import Container from '@material-ui/core/Container';
import {makeStyles} from '@material-ui/core/styles';
import MuiAlert from '@material-ui/lab/Alert';
import Steps from '../custom_ui_components/steps.js';

/*Import react pdf components*/
import {pdfjs} from 'react-pdf';

/*Import firebase*/
// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase";
import firebaseConfig from '../config/firebase_config';

//import { Button } from '@material-ui/core';


// If you enabled Analytics in your project, add the Firebase SDK for Analytics
/* import "firebase/analytics"; */

 // For Firebase JS SDK v7.20.0 and later, measurementId is optional


// Initialize Firebase
/* firebase.initializeApp(firebaseConfig); */

if (!firebase.apps.length) {
   firebase.initializeApp(firebaseConfig);
}else {
   firebase.app(); // if already initialized, use that one
}

firebase.auth().useDeviceLanguage();

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const useStyles = makeStyles({
  notificationClass: {    
    minWidth:'90vw',
    /* minHeight:'3em', */
    marginTop: '150px',
    marginTop: 'max(11em,150px)',
    position:'fixed',
    zIndex: '999',
  },
});


/* let doNotChange = 1;
let useMemoizedVersion = false;
let MemoizedDocumentsBuilding = null; */





export default function MyApp() {


  const classes = useStyles();

  const [URI, setURI] = React.useState(undefined)

  const [currentViewStep, setCurrentViewStep] = React.useState(0)
  const [arrayWithAllFilesConfigSettings, setArrayWithAllFilesConfigSettings] = React.useState([])
  const [stillLoadingPDFComponentsAfterUserWentBack, setStillLoadingPDFComponentsAfterUserWentBack] = React.useState(false);
  const [showMessageAskToUploadAtLeastOneFile, setShowMessageAskToUploadAtLeastOneFile] = React.useState(false);
  
  const [showLogInScreen, setShowLogInScreen] = React.useState(false);
  const [userIsLoggedIn, setUserIsLoggedIn] = React.useState(undefined);
  const [statefulUserObject, setStatefulUserObject] = React.useState({});

  const [openSuccessfulLogInNotification, setOpenSuccessfulLogInNotification] = React.useState(false);
  const [openAuthErrorNotification, setOpenAuthErrorNotification] = React.useState(false);
  const [openServerAuthErrorNotification, setOpenServerAuthErrorNotification] = React.useState(false);
  
  const [statefulUploadProgress, setStatefulUploadProgress] = React.useState(0);
  const serverUploadFlag=false;

  function handleCloseSuccessfulLogInNotification (event, reason){
    if (reason === 'clickaway') {
      return;
    }
    setOpenSuccessfulLogInNotification(false);
  };

  function handleCloseAuthErrorNotification (event, reason){
    if (reason === 'clickaway') {
      return;
    }
    setOpenAuthErrorNotification(false);
  };

  function handleCloseServerAuthErrorNotification (event, reason){
    if (reason === 'clickaway') {
      return;
    }
    setOpenServerAuthErrorNotification(false);
  };

  function Alert(props) {
    return <MuiAlert className={classes.notificationClass} elevation={6} variant="filled" {...props} />;
  }

  /* memoizedAlternative is a flag to disable PDF previews when the user goes back*/
  const [auxMemoizedAlternative, setAuxMemoizedAlternative] = React.useState(false);


  let objectToControlCurrentView = {
    readCurrentView:currentViewStep,
    setCurrentView: setCurrentViewStep,
  }

  {
    firebase.auth().onAuthStateChanged((user) => {
      /* console.log("onAuthStateChange Executed!") */
      if (user) {
        /* console.log("YES a user logged in") */
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        
        setStatefulUserObject(user);
        setUserIsLoggedIn(true);
        if(showLogInScreen){setShowLogInScreen(false)}        
        // ...
      } else if (!user){
        /* console.log("NO user logged in! btw user is", user) */
        // User is signed out
        if(userIsLoggedIn){
          setUserIsLoggedIn(false);
        }
        if(statefulUserObject){
          setStatefulUserObject(null)
        }
        // ...
      }
    });
  }
  
  let customClasses = ReactStyleFunction();

  React.useEffect(() => {
    if(URI==undefined){      
      let fullPath = window.location.pathname+window.location.search
      if((fullPath).localeCompare('/?success=true')==0){
        setURI(fullPath)  
      }
      else if((fullPath).localeCompare('/?canceled=true')==0){
        setURI(fullPath)
      }
      else{
        setURI(window.location.pathname)
      }
    }
  }, [URI]);
  
  return (
    
    <div>          
      
      <Menu showLogInScreen={showLogInScreen} setShowLogInScreen={setShowLogInScreen} firebase={firebase} statefulUserObject={statefulUserObject} setStatefulUserObject={setStatefulUserObject} userIsLoggedIn={userIsLoggedIn} setUserIsLoggedIn={setUserIsLoggedIn} URI={URI} setURI={setURI}/>

      {showLogInScreen?<SignInFirebase firebase={firebase} signInOptional={true} showLogInScreen={showLogInScreen} setShowLogInScreen={setShowLogInScreen} setOpenSuccessfulLogInNotification={setOpenSuccessfulLogInNotification} openAuthErrorNotification={openAuthErrorNotification} setOpenAuthErrorNotification={setOpenAuthErrorNotification}></SignInFirebase>:null}

      <Snackbar open={openSuccessfulLogInNotification} autoHideDuration={6000} onClose={handleCloseSuccessfulLogInNotification} anchorOrigin={{vertical:'top', horizontal:'center'}}>
        <Alert onClose={handleCloseSuccessfulLogInNotification} severity="success">
          Bienvenido {statefulUserObject?
              (statefulUserObject.displayName?statefulUserObject.displayName:statefulUserObject.email?(statefulUserObject.email):null):null
            }
        </Alert>        
      </Snackbar>

      <Snackbar open={openAuthErrorNotification} /* autoHideDuration={6000} */ onClose={handleCloseAuthErrorNotification} anchorOrigin={{vertical:'top', horizontal:'center'}}>
        <Alert onClose={handleCloseAuthErrorNotification} severity="error">
          Ha occurido un error al iniciar sesión
        </Alert>        
      </Snackbar>

      <Snackbar open={openServerAuthErrorNotification} /* autoHideDuration={6000} */ onClose={handleCloseServerAuthErrorNotification} anchorOrigin={{vertical:'top', horizontal:'center'}}>
        <Alert onClose={handleCloseServerAuthErrorNotification} severity="error">
          Ha occurido un error al conectarse con el servidor
        </Alert>
      </Snackbar>

      {
        (URI === "/")?
        (
          <div>
            <Steps objectToControlCurrentView={objectToControlCurrentView} arrayWithAllFilesConfigSettings={arrayWithAllFilesConfigSettings} setArrayWithAllFilesConfigSettings={setArrayWithAllFilesConfigSettings} ></Steps>
            
            <Container id="mainApp" maxWidth="lg" /* className={customClasses.customContainer} */>       

              {currentViewStep==0?(
                <DocumentsBuilding arrayWithAllFilesConfigSettings={arrayWithAllFilesConfigSettings} setArrayWithAllFilesConfigSettings={setArrayWithAllFilesConfigSettings} stillLoadingPDFComponentsAfterUserWentBack={stillLoadingPDFComponentsAfterUserWentBack} setStillLoadingPDFComponentsAfterUserWentBack={setStillLoadingPDFComponentsAfterUserWentBack} auxMemoizedAlternative={auxMemoizedAlternative} showMessageAskToUploadAtLeastOneFile={showMessageAskToUploadAtLeastOneFile} setShowMessageAskToUploadAtLeastOneFile={setShowMessageAskToUploadAtLeastOneFile}></DocumentsBuilding>)
                
                :currentViewStep==1?
                  <CartBuilding arrayWithAllFilesConfigSettings={arrayWithAllFilesConfigSettings} setArrayWithAllFilesConfigSettings={setArrayWithAllFilesConfigSettings}></CartBuilding>

                :currentViewStep==2?
                  <PaymentGateway arrayWithAllFilesConfigSettings={arrayWithAllFilesConfigSettings} setArrayWithAllFilesConfigSettings={setArrayWithAllFilesConfigSettings} statefulUserObject={statefulUserObject} setStatefulUserObject={setStatefulUserObject} firebase={firebase} openServerAuthErrorNotification={openServerAuthErrorNotification} setOpenServerAuthErrorNotification={setOpenServerAuthErrorNotification} statefulUploadProgress={statefulUploadProgress} setStatefulUploadProgress={setStatefulUploadProgress} serverUploadFlag={serverUploadFlag}></PaymentGateway>
                :null
              }
              
            </Container>

            <Footer objectToControlCurrentView={objectToControlCurrentView} arrayWithAllFilesConfigSettings={arrayWithAllFilesConfigSettings} setArrayWithAllFilesConfigSettings={setArrayWithAllFilesConfigSettings} stillLoadingPDFComponentsAfterUserWentBack={stillLoadingPDFComponentsAfterUserWentBack} setStillLoadingPDFComponentsAfterUserWentBack={setStillLoadingPDFComponentsAfterUserWentBack} setAuxMemoizedAlternative={setAuxMemoizedAlternative} showMessageAskToUploadAtLeastOneFile={showMessageAskToUploadAtLeastOneFile} setShowMessageAskToUploadAtLeastOneFile={setShowMessageAskToUploadAtLeastOneFile} showLogInScreen={showLogInScreen} setShowLogInScreen={setShowLogInScreen} firebase={firebase} userIsLoggedIn={userIsLoggedIn} setUserIsLoggedIn={setUserIsLoggedIn}></Footer>
          </div>
        ):null
      }

      {(URI === "/cuenta")?
        (
          <ContainerOfAccountView showLogInScreen={showLogInScreen} setShowLogInScreen={setShowLogInScreen} firebase={firebase} userIsLoggedIn={userIsLoggedIn} setUserIsLoggedIn={setUserIsLoggedIn} setOpenSuccessfulLogInNotification={setOpenSuccessfulLogInNotification} openAuthErrorNotification={openAuthErrorNotification} setOpenAuthErrorNotification={setOpenAuthErrorNotification} statefulUserObject={statefulUserObject}></ContainerOfAccountView>
        ):null
      }
      {(URI === "/mis-pedidos")?
        (
          <ContainerOfPreviousOrders showLogInScreen={showLogInScreen} setShowLogInScreen={setShowLogInScreen} firebase={firebase} userIsLoggedIn={userIsLoggedIn} setUserIsLoggedIn={setUserIsLoggedIn} setOpenSuccessfulLogInNotification={setOpenSuccessfulLogInNotification} openAuthErrorNotification={openAuthErrorNotification} setOpenAuthErrorNotification={setOpenAuthErrorNotification}></ContainerOfPreviousOrders>
        ):null
      }
      {(URI === "/contacto")?
        (
          <ContainerOfContact showLogInScreen={showLogInScreen} setShowLogInScreen={setShowLogInScreen} firebase={firebase} userIsLoggedIn={userIsLoggedIn} setUserIsLoggedIn={setUserIsLoggedIn} setOpenSuccessfulLogInNotification={setOpenSuccessfulLogInNotification} openAuthErrorNotification={openAuthErrorNotification} setOpenAuthErrorNotification={setOpenAuthErrorNotification}></ContainerOfContact>
        ):null
      }

      {(URI === "/?success=true")?
        (
          <OrderSuccess></OrderSuccess>
        ):null
      }

      {(URI === "/?canceled=true")?
        (
          <OrderCanceled></OrderCanceled>
        ):null
      }

      {(URI !== "/contacto" && URI !== "/mis-pedidos" && URI !== "/" && URI !== "/cuenta" && URI !== "/?success=true" && URI !== "/?canceled=true")?
        (
          <h1></h1>          
        ):null
      }



    </div>
    
  );
}