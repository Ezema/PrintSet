
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { makeStyles } from '@material-ui/core/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

const useStyles = makeStyles({
  root: {
    display:'absolute',
    width: '100%',    
    boxShadow: '0px 1px 3px #3f51b5',
    /* position: 'sticky', */
    position:'fixed',
    bottom: '0',
    /* marginTop: '2em', */
    /* backgroundColor: 'primary', */
    zIndex:'700',
    
  },
});


let showMessageAskToUploadAtLeastOneFile;
let setShowMessageAskToUploadAtLeastOneFile;

export default function NavigationFooter(props) {

  let showLogInScreen = props.showLogInScreen;
  let setShowLogInScreen = props.setShowLogInScreen;
  let firebase = props.firebase;
  let userIsLoggedIn = props.userIsLoggedIn;
  let setUserIsLoggedIn = props.setUserIsLoggedIn;
  
  showMessageAskToUploadAtLeastOneFile = props.showMessageAskToUploadAtLeastOneFile;

  setShowMessageAskToUploadAtLeastOneFile = props.setShowMessageAskToUploadAtLeastOneFile;
  
  function handleButtonPressed(event, newValue){   
  }
  function handleNextStep(){
    let auxCurrentStep = props.objectToControlCurrentView.readCurrentView;
    if(auxCurrentStep==0 || auxCurrentStep==1){
      if(auxCurrentStep==0 && (props.arrayWithAllFilesConfigSettings.length >0)){
        if((auxCurrentStep+1)<=2){
          (auxCurrentStep=auxCurrentStep+1)
        };
        props.objectToControlCurrentView.setCurrentView(auxCurrentStep)
      }
      else if(props.arrayWithAllFilesConfigSettings.length<1){
        setShowMessageAskToUploadAtLeastOneFile(true)
      }
      else if(auxCurrentStep==1 && (props.arrayWithAllFilesConfigSettings.length >0)){
        if(!userIsLoggedIn){
          setShowLogInScreen(true)
        }
        else if(userIsLoggedIn){
          auxCurrentStep=auxCurrentStep+1;
          props.objectToControlCurrentView.setCurrentView(auxCurrentStep);
        }
        
      }
      
    }
  } 
  function handlePreviousStep(){
    let auxCurrentStep = props.objectToControlCurrentView.readCurrentView;
    if(auxCurrentStep>0){
      if((auxCurrentStep-1)>=0){
        (auxCurrentStep=auxCurrentStep-1)
        if(auxCurrentStep==0){
          props.setStillLoadingPDFComponentsAfterUserWentBack(true)

        }
      };
      props.setAuxMemoizedAlternative(true)
      props.objectToControlCurrentView.setCurrentView(auxCurrentStep)
    }
    
  }  
  const classes = useStyles();

  return (

    <BottomNavigation value={null} showLabels={true} className={classes.root}> 
      <BottomNavigationAction disabled={props.objectToControlCurrentView.readCurrentView===0 || props.objectToControlCurrentView.readCurrentView===2} value={0} label="Volver" icon={<ArrowBackIcon />} onClick={handlePreviousStep}></BottomNavigationAction>

      <BottomNavigationAction disabled={props.objectToControlCurrentView.readCurrentView===2} value={1} label="Siguiente" icon={<ArrowForwardIcon />} onClick={handleNextStep}></BottomNavigationAction>)
    </BottomNavigation>
  );
}
