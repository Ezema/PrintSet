import React, { createContext, setState } from 'react';
import { useRef } from 'react';
/* import { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles'; */

/* Import material UI components */
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Icon from '@material-ui/core/Icon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
/* import ListSubheader from '@material-ui/core/ListSubheader'; */
import Switch from '@material-ui/core/Switch';
import Collapse from '@material-ui/core/Collapse';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Typography } from '@material-ui/core';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Hidden from '@material-ui/core/Hidden';

/* Import material UI Lab components */

import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import ToggleButton from '@material-ui/lab/ToggleButton';

/* Import material UI Icons */

import FileCopyIcon from '@material-ui/icons/FileCopy';
import PaletteIcon from '@material-ui/icons/Palette';
import PrintIcon from '@material-ui/icons/Print';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import LineWeightIcon from '@material-ui/icons/LineWeight';
import Rotate90DegreesCcwIcon from '@material-ui/icons/Rotate90DegreesCcw';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

/* Import custom classes*/
import DummyReactFunction from '../styles/customGlobalStyles.js'


let showMessageAskToUploadAtLeastOneFile;
let setShowMessageAskToUploadAtLeastOneFile;

export default function (props){

    let customClasses = DummyReactFunction();

    const [showMore, setShowMore] = React.useState([false]);
    const [showMoreIcon, setShowMoreIcon] = React.useState(<KeyboardArrowDownIcon></KeyboardArrowDownIcon>);
    const [dynamicPlaceholder, setDynamicPlaceholder] = React.useState("mostrar");    
    const [warningOpen, setWarningOpen] = React.useState(false);

    const [enableAllOptions, setEnableAllOptions] = React.useState(true);
    /* const [showMessageAskToUploadAtLeastOneFile, setShowMessageAskToUploadAtLeastOneFile] = React.useState(false); */

    showMessageAskToUploadAtLeastOneFile = props.showMessageAskToUploadAtLeastOneFile;
    setShowMessageAskToUploadAtLeastOneFile = props.setShowMessageAskToUploadAtLeastOneFile;


    function resetUIoptionsToOriginalState(){
      props.passedArgumentSetBooleanApplyToAll(false)
      props.objectWithCurrentUIOptionsShownToUser.setCopies(1);
      props.objectWithCurrentUIOptionsShownToUser.setDoubleSided(true);
      props.objectWithCurrentUIOptionsShownToUser.setColor(false);
      props.objectWithCurrentUIOptionsShownToUser.setPaperSize('A4');
      props.objectWithCurrentUIOptionsShownToUser.setPaperThickness(80);
      props.objectWithCurrentUIOptionsShownToUser.setPaperOrientation('vertical');
      props.objectWithCurrentUIOptionsShownToUser.setPaperTurn('long');
    }


    function askUserToUploadAtLeastOneFile(){
      setShowMessageAskToUploadAtLeastOneFile(true)
    }

    function handleUserAnswerToUploadAtLeastOneFile(){
      setShowMessageAskToUploadAtLeastOneFile(false);
      /* setEnableAllOptions(false); */
    }

    /* functions that handle "boolean apply to all files" */
    function handleApplyToAll(){
      if(props.passedArgumentBooleanApplyToAll){
        resetUIoptionsToOriginalState()
        
        //Remember set above is async and only affects content inside JSX. The value of props is the 'old' value
        let valueForDocumentSelected = !props.passedArgumentBooleanApplyToAll
        resetAllFilesConfigurationToOriginalState(valueForDocumentSelected)

      }else{
        setWarningOpen(true);
      }
    }
    function handleWarningAnswer(answer){      
      if(answer==1){
        props.passedArgumentSetBooleanApplyToAll(true)
        applyCurrentUIValuesToAllFiles()
        setWarningOpen(false);
      }
      else if(answer==0){
        props.passedArgumentSetBooleanApplyToAll(false)
        setWarningOpen(false);
      }
    }    

    function resetAllFilesConfigurationToOriginalState(valueForDocumentSelected){
      let auxArray = [...props.readStatefulUploadedFilesTracker];
      
      for(let i=0; i<auxArray.length;i++){
        auxArray[i].numberOfCopies = 1;
        auxArray[i].doubleSided = true;
        auxArray[i].printInColor = false;
        auxArray[i].paperSize = 'A4';
        auxArray[i].paperOrientation = 'vertical';
        auxArray[i].turnDoubleSidedPrintBy = 'long';
        auxArray[i].documentIsSelected = valueForDocumentSelected;
      }
      props.setStatefulUploadedFilesTracker(auxArray);
      
    }

    function applyCurrentUIValuesToAllFiles(valueForDocumentSelected){      
      let auxArray = [...props.readStatefulUploadedFilesTracker];
      
      for(let i=0; i<auxArray.length;i++){
        auxArray[i].numberOfCopies = props.objectWithCurrentUIOptionsShownToUser.readCopies;
        auxArray[i].doubleSided = props.objectWithCurrentUIOptionsShownToUser.readDoubleSided;
        auxArray[i].printInColor = props.objectWithCurrentUIOptionsShownToUser.readColor;
        auxArray[i].paperSize = props.objectWithCurrentUIOptionsShownToUser.readPaperSize;
        auxArray[i].paperWeight = props.objectWithCurrentUIOptionsShownToUser.readPaperThickness;
        auxArray[i].paperOrientation = props.objectWithCurrentUIOptionsShownToUser.readPaperOrientation;
        auxArray[i].turnDoubleSidedPrintBy = props.objectWithCurrentUIOptionsShownToUser.readPaperTurn;
        auxArray[i].documentIsSelected = true;
      }
      props.setStatefulUploadedFilesTracker(auxArray);
    }
      

    function handleIncrement (){      
      if(!props.globalAtLeastFileUploaded && props.readStatefulUploadedFilesTracker.length<1){
        askUserToUploadAtLeastOneFile()
      }
      if(props.readStatefulUploadedFilesTracker.length>0){        
        if(props.passedArgumentBooleanApplyToAll){
          let newCopiesCounter = props.objectWithCurrentUIOptionsShownToUser.readCopies
          newCopiesCounter = newCopiesCounter + 1
          props.objectWithCurrentUIOptionsShownToUser.setCopies(newCopiesCounter)

          let auxArray = [...props.readStatefulUploadedFilesTracker];
          for(let i=0;i<props.readStatefulUploadedFilesTracker.length;i++){
            auxArray[i].numberOfCopies = newCopiesCounter;                    
          }
          props.setStatefulUploadedFilesTracker(auxArray);
        }
        else{
          let atLeastOneIsSelected = false
          for(let i=0;i<props.readStatefulUploadedFilesTracker.length;i++){
            if(props.readStatefulUploadedFilesTracker[i].documentIsSelected){
              
              atLeastOneIsSelected = true;
              
              let newCopiesCounter = props.objectWithCurrentUIOptionsShownToUser.readCopies
              newCopiesCounter = newCopiesCounter + 1
              props.objectWithCurrentUIOptionsShownToUser.setCopies(newCopiesCounter)
              
              let auxArray = [...props.readStatefulUploadedFilesTracker];
              auxArray[i].numberOfCopies = newCopiesCounter;
              props.setStatefulUploadedFilesTracker(auxArray);
            }
          }
          if(!atLeastOneIsSelected){
            if(props.readStatefulUploadedFilesTracker.length>1){
              if(!props.passedArgumentBooleanApplyToAll){
                handleApplyToAll();
                if(props.passedArgumentBooleanApplyToAll){
                  let newCopiesCounter = props.objectWithCurrentUIOptionsShownToUser.readCopies
                  newCopiesCounter = newCopiesCounter + 1
                  props.objectWithCurrentUIOptionsShownToUser.setCopies(newCopiesCounter)
  
                  let auxArray = [...props.readStatefulUploadedFilesTracker];
                  for(let i=0;i<props.readStatefulUploadedFilesTracker.length;i++){
                    auxArray[i].numberOfCopies = newCopiesCounter;                    
                  }
                  props.setStatefulUploadedFilesTracker(auxArray);
                }
              }
              else{
                let newCopiesCounter = props.objectWithCurrentUIOptionsShownToUser.readCopies
                newCopiesCounter = newCopiesCounter + 1
                props.objectWithCurrentUIOptionsShownToUser.setCopies(newCopiesCounter)
  
                for(let i=0;i<props.readStatefulUploadedFilesTracker.length;i++){
                  let auxArray = [...props.readStatefulUploadedFilesTracker];
                  auxArray[i].numberOfCopies = newCopiesCounter;
                  props.setStatefulUploadedFilesTracker(auxArray);
                }
              }
            }
            else{
              let newCopiesCounter = props.objectWithCurrentUIOptionsShownToUser.readCopies
              newCopiesCounter = newCopiesCounter + 1
              props.objectWithCurrentUIOptionsShownToUser.setCopies(newCopiesCounter)
  
              props.readStatefulUploadedFilesTracker[0].numberOfCopies = newCopiesCounter
              let auxArray = [...props.readStatefulUploadedFilesTracker];        
              props.setStatefulUploadedFilesTracker(auxArray);
            }
          }          
        }
      }
    }

    function handleDecrement (){
      if(!props.globalAtLeastFileUploaded && props.readStatefulUploadedFilesTracker.length<1){
        askUserToUploadAtLeastOneFile()
      }
      if(props.readStatefulUploadedFilesTracker.length>0){        
        if(props.passedArgumentBooleanApplyToAll){
          let newCopiesCounter = props.objectWithCurrentUIOptionsShownToUser.readCopies
          newCopiesCounter = (newCopiesCounter - 1>0)?(newCopiesCounter - 1):(1);
          props.objectWithCurrentUIOptionsShownToUser.setCopies(newCopiesCounter)

          let auxArray = [...props.readStatefulUploadedFilesTracker];
          for(let i=0;i<props.readStatefulUploadedFilesTracker.length;i++){
            auxArray[i].numberOfCopies = newCopiesCounter;                    
          }
          props.setStatefulUploadedFilesTracker(auxArray);
        }
        else{
          let atLeastOneIsSelected = false
          for(let i=0;i<props.readStatefulUploadedFilesTracker.length;i++){
            if(props.readStatefulUploadedFilesTracker[i].documentIsSelected){
              
              atLeastOneIsSelected = true;
              
              let newCopiesCounter = props.objectWithCurrentUIOptionsShownToUser.readCopies
              newCopiesCounter = (newCopiesCounter - 1>0)?(newCopiesCounter - 1):(1);
              props.objectWithCurrentUIOptionsShownToUser.setCopies(newCopiesCounter)
              
              let auxArray = [...props.readStatefulUploadedFilesTracker];
              auxArray[i].numberOfCopies = newCopiesCounter;
              props.setStatefulUploadedFilesTracker(auxArray);
            }
          }
          if(!atLeastOneIsSelected){
            if(props.readStatefulUploadedFilesTracker.length>1){
              if(!props.passedArgumentBooleanApplyToAll){
                handleApplyToAll();
                if(props.passedArgumentBooleanApplyToAll){
                  let newCopiesCounter = props.objectWithCurrentUIOptionsShownToUser.readCopies
                  newCopiesCounter = (newCopiesCounter - 1>0)?(newCopiesCounter - 1):(1);
                  props.objectWithCurrentUIOptionsShownToUser.setCopies(newCopiesCounter)

                  let auxArray = [...props.readStatefulUploadedFilesTracker];
                  for(let i=0;i<props.readStatefulUploadedFilesTracker.length;i++){
                    auxArray[i].numberOfCopies = newCopiesCounter;                    
                  }
                  props.setStatefulUploadedFilesTracker(auxArray);
                }
              }
              else{
                let newCopiesCounter = props.objectWithCurrentUIOptionsShownToUser.readCopies
                newCopiesCounter = (newCopiesCounter - 1>0)?(newCopiesCounter - 1):(1);
                props.objectWithCurrentUIOptionsShownToUser.setCopies(newCopiesCounter)

                for(let i=0;i<props.readStatefulUploadedFilesTracker.length;i++){
                  let auxArray = [...props.readStatefulUploadedFilesTracker];
                  auxArray[i].numberOfCopies = newCopiesCounter;
                  props.setStatefulUploadedFilesTracker(auxArray);
                }
              }
            }
            else{
              let newCopiesCounter = props.objectWithCurrentUIOptionsShownToUser.readCopies
              newCopiesCounter = (newCopiesCounter - 1>0)?(newCopiesCounter - 1):(1);
              props.objectWithCurrentUIOptionsShownToUser.setCopies(newCopiesCounter)

              props.readStatefulUploadedFilesTracker[0].numberOfCopies = newCopiesCounter
              let auxArray = [...props.readStatefulUploadedFilesTracker];        
              props.setStatefulUploadedFilesTracker(auxArray);
            }
          }          
        }
      }      
    }

    function handleDoubleSided(){
      if(!props.globalAtLeastFileUploaded && props.readStatefulUploadedFilesTracker.length<1){
        askUserToUploadAtLeastOneFile()
      }
      if(props.readStatefulUploadedFilesTracker.length>0){        
        if(props.passedArgumentBooleanApplyToAll){
          let newDoubleSided = props.objectWithCurrentUIOptionsShownToUser.readDoubleSided
          newDoubleSided = !newDoubleSided
          props.objectWithCurrentUIOptionsShownToUser.setDoubleSided(newDoubleSided)

          let auxArray = [...props.readStatefulUploadedFilesTracker];
          for(let i=0;i<props.readStatefulUploadedFilesTracker.length;i++){
            auxArray[i].doubleSided = newDoubleSided;                    
          }
          props.setStatefulUploadedFilesTracker(auxArray);
        }
        else{
          let atLeastOneIsSelected = false
          for(let i=0;i<props.readStatefulUploadedFilesTracker.length;i++){
            if(props.readStatefulUploadedFilesTracker[i].documentIsSelected){
              
              atLeastOneIsSelected = true;
              
              let newDoubleSided = props.objectWithCurrentUIOptionsShownToUser.readDoubleSided
              newDoubleSided = !newDoubleSided
              props.objectWithCurrentUIOptionsShownToUser.setDoubleSided(newDoubleSided)
              
              let auxArray = [...props.readStatefulUploadedFilesTracker];
              auxArray[i].doubleSided = newDoubleSided;
              props.setStatefulUploadedFilesTracker(auxArray);
            }
          }
          if(!atLeastOneIsSelected){
            if(props.readStatefulUploadedFilesTracker.length>1){
              if(!props.passedArgumentBooleanApplyToAll){
                handleApplyToAll();
                if(props.passedArgumentBooleanApplyToAll){
                  let newDoubleSided = props.objectWithCurrentUIOptionsShownToUser.readDoubleSided
                  newDoubleSided = !newDoubleSided
                  props.objectWithCurrentUIOptionsShownToUser.setDoubleSided(newDoubleSided)

                  let auxArray = [...props.readStatefulUploadedFilesTracker];
                  for(let i=0;i<props.readStatefulUploadedFilesTracker.length;i++){
                    auxArray[i].doubleSided = newDoubleSided;                    
                  }
                  props.setStatefulUploadedFilesTracker(auxArray);
                }
              }
              else{
                let newDoubleSided = props.objectWithCurrentUIOptionsShownToUser.readDoubleSided
                newDoubleSided = !newDoubleSided
                props.objectWithCurrentUIOptionsShownToUser.setDoubleSided(newDoubleSided)

                for(let i=0;i<props.readStatefulUploadedFilesTracker.length;i++){
                  let auxArray = [...props.readStatefulUploadedFilesTracker];
                  auxArray[i].doubleSided = newDoubleSided;
                  props.setStatefulUploadedFilesTracker(auxArray);
                }
              }
            }
            else{
              let newDoubleSided = props.objectWithCurrentUIOptionsShownToUser.readDoubleSided
              newDoubleSided = !newDoubleSided
              props.objectWithCurrentUIOptionsShownToUser.setDoubleSided(newDoubleSided)

              props.readStatefulUploadedFilesTracker[0].doubleSided = newDoubleSided
              let auxArray = [...props.readStatefulUploadedFilesTracker];        
              props.setStatefulUploadedFilesTracker(auxArray);
            }
          }          
        }
      }
      
    }    

    function handleColor(){
      if(!props.globalAtLeastFileUploaded && props.readStatefulUploadedFilesTracker.length<1){
        askUserToUploadAtLeastOneFile()
      }
      if(props.readStatefulUploadedFilesTracker.length>0){        
        if(props.passedArgumentBooleanApplyToAll){
          let newColor = props.objectWithCurrentUIOptionsShownToUser.readColor
          newColor = !newColor
          props.objectWithCurrentUIOptionsShownToUser.setColor(newColor)

          let auxArray = [...props.readStatefulUploadedFilesTracker];
          for(let i=0;i<props.readStatefulUploadedFilesTracker.length;i++){
            auxArray[i].printInColor = newColor;                    
          }
          props.setStatefulUploadedFilesTracker(auxArray);
        }
        else{
          let atLeastOneIsSelected = false
          for(let i=0;i<props.readStatefulUploadedFilesTracker.length;i++){
            if(props.readStatefulUploadedFilesTracker[i].documentIsSelected){
              
              atLeastOneIsSelected = true;
              
              let newColor = props.objectWithCurrentUIOptionsShownToUser.readColor
              newColor = !newColor
              props.objectWithCurrentUIOptionsShownToUser.setColor(newColor)
              
              let auxArray = [...props.readStatefulUploadedFilesTracker];
              auxArray[i].printInColor = newColor;
              props.setStatefulUploadedFilesTracker(auxArray);
            }
          }
          if(!atLeastOneIsSelected){
            if(props.readStatefulUploadedFilesTracker.length>1){
              if(!props.passedArgumentBooleanApplyToAll){
                handleApplyToAll();
                if(props.passedArgumentBooleanApplyToAll){
                  let newColor = props.objectWithCurrentUIOptionsShownToUser.readColor
                  newColor = !newColor
                  props.objectWithCurrentUIOptionsShownToUser.setColor(newColor)

                  let auxArray = [...props.readStatefulUploadedFilesTracker];
                  for(let i=0;i<props.readStatefulUploadedFilesTracker.length;i++){
                    auxArray[i].printInColor = newColor;                    
                  }
                  props.setStatefulUploadedFilesTracker(auxArray);
                }
              }
              else{
                let newColor = props.objectWithCurrentUIOptionsShownToUser.readColor
                newColor = !newColor
                props.objectWithCurrentUIOptionsShownToUser.setColor(newColor)

                for(let i=0;i<props.readStatefulUploadedFilesTracker.length;i++){
                  let auxArray = [...props.readStatefulUploadedFilesTracker];
                  auxArray[i].printInColor = newColor;
                  props.setStatefulUploadedFilesTracker(auxArray);
                }
              }
            }
            else{
              let newColor = props.objectWithCurrentUIOptionsShownToUser.readColor
              newColor = !newColor
              props.objectWithCurrentUIOptionsShownToUser.setColor(newColor)

              props.readStatefulUploadedFilesTracker[0].printInColor = newColor
              let auxArray = [...props.readStatefulUploadedFilesTracker];        
              props.setStatefulUploadedFilesTracker(auxArray);
            }
          }          
        }
      }
      
    }
  
    function handlePaperSize (event, newPaperSize){
      if(newPaperSize!== null){
        if(!props.globalAtLeastFileUploaded && props.readStatefulUploadedFilesTracker.length<1){
          askUserToUploadAtLeastOneFile()
        }
        if(props.readStatefulUploadedFilesTracker.length>0){        
          if(props.passedArgumentBooleanApplyToAll){
            let auxPaperSize = props.objectWithCurrentUIOptionsShownToUser.readPaperSize
            auxPaperSize = newPaperSize
            props.objectWithCurrentUIOptionsShownToUser.setPaperSize(auxPaperSize)

            let auxArray = [...props.readStatefulUploadedFilesTracker];
            for(let i=0;i<props.readStatefulUploadedFilesTracker.length;i++){
              auxArray[i].paperSize = auxPaperSize;                    
            }
            props.setStatefulUploadedFilesTracker(auxArray);
          }
          else{
            let atLeastOneIsSelected = false
            for(let i=0;i<props.readStatefulUploadedFilesTracker.length;i++){
              if(props.readStatefulUploadedFilesTracker[i].documentIsSelected){
                
                atLeastOneIsSelected = true;
                
                let auxPaperSize = props.objectWithCurrentUIOptionsShownToUser.readPaperSize
                auxPaperSize = newPaperSize
                props.objectWithCurrentUIOptionsShownToUser.setPaperSize(auxPaperSize)
                
                let auxArray = [...props.readStatefulUploadedFilesTracker];
                auxArray[i].paperSize = auxPaperSize;
                props.setStatefulUploadedFilesTracker(auxArray);
              }
            }
            if(!atLeastOneIsSelected){
              if(props.readStatefulUploadedFilesTracker.length>1){
                if(!props.passedArgumentBooleanApplyToAll){
                  handleApplyToAll();
                  if(props.passedArgumentBooleanApplyToAll){
                    let auxPaperSize = props.objectWithCurrentUIOptionsShownToUser.readPaperSize
                    auxPaperSize = newPaperSize
                    props.objectWithCurrentUIOptionsShownToUser.setPaperSize(auxPaperSize)

                    let auxArray = [...props.readStatefulUploadedFilesTracker];
                    for(let i=0;i<props.readStatefulUploadedFilesTracker.length;i++){
                      auxArray[i].paperSize = auxPaperSize;                    
                    }
                    props.setStatefulUploadedFilesTracker(auxArray);
                  }
                }
                else{
                  let auxPaperSize = props.objectWithCurrentUIOptionsShownToUser.readPaperSize
                  auxPaperSize = newPaperSize
                  props.objectWithCurrentUIOptionsShownToUser.setPaperSize(auxPaperSize)

                  for(let i=0;i<props.readStatefulUploadedFilesTracker.length;i++){
                    let auxArray = [...props.readStatefulUploadedFilesTracker];
                    auxArray[i].paperSize = auxPaperSize;
                    props.setStatefulUploadedFilesTracker(auxArray);
                  }
                }
              }
              else{
                let auxPaperSize = props.objectWithCurrentUIOptionsShownToUser.readPaperSize
                auxPaperSize = newPaperSize
                props.objectWithCurrentUIOptionsShownToUser.setPaperSize(auxPaperSize)

                props.readStatefulUploadedFilesTracker[0].paperSize = auxPaperSize
                let auxArray = [...props.readStatefulUploadedFilesTracker];        
                props.setStatefulUploadedFilesTracker(auxArray);
              }
            }          
          }
        }
      }
    };

    function handlePaperThickness (event, newPaperThickness){
      if(newPaperThickness!== null){
        if(!props.globalAtLeastFileUploaded && props.readStatefulUploadedFilesTracker.length<1){
          askUserToUploadAtLeastOneFile()
        }
        if(props.readStatefulUploadedFilesTracker.length>0){        
          if(props.passedArgumentBooleanApplyToAll){
            let auxPaperThickness = props.objectWithCurrentUIOptionsShownToUser.readPaperThickness
            auxPaperThickness = newPaperThickness
            props.objectWithCurrentUIOptionsShownToUser.setPaperThickness(auxPaperThickness)

            let auxArray = [...props.readStatefulUploadedFilesTracker];
            for(let i=0;i<props.readStatefulUploadedFilesTracker.length;i++){
              auxArray[i].paperWeight = auxPaperThickness;                    
            }
            props.setStatefulUploadedFilesTracker(auxArray);
          }
          else{
            let atLeastOneIsSelected = false
            for(let i=0;i<props.readStatefulUploadedFilesTracker.length;i++){
              if(props.readStatefulUploadedFilesTracker[i].documentIsSelected){
                
                atLeastOneIsSelected = true;
                
                let auxPaperThickness = props.objectWithCurrentUIOptionsShownToUser.readPaperThickness
                auxPaperThickness = newPaperThickness
                props.objectWithCurrentUIOptionsShownToUser.setPaperThickness(auxPaperThickness)
                
                let auxArray = [...props.readStatefulUploadedFilesTracker];
                auxArray[i].paperWeight = auxPaperThickness;
                props.setStatefulUploadedFilesTracker(auxArray);
              }
            }
            if(!atLeastOneIsSelected){
              if(props.readStatefulUploadedFilesTracker.length>1){
                if(!props.passedArgumentBooleanApplyToAll){
                  handleApplyToAll();
                  if(props.passedArgumentBooleanApplyToAll){
                    let auxPaperThickness = props.objectWithCurrentUIOptionsShownToUser.readPaperThickness
                    auxPaperThickness = newPaperThickness
                    props.objectWithCurrentUIOptionsShownToUser.setPaperThickness(auxPaperThickness)

                    let auxArray = [...props.readStatefulUploadedFilesTracker];
                    for(let i=0;i<props.readStatefulUploadedFilesTracker.length;i++){
                      auxArray[i].paperWeight = auxPaperThickness;                    
                    }
                    props.setStatefulUploadedFilesTracker(auxArray);
                  }
                }
                else{
                  let auxPaperThickness = props.objectWithCurrentUIOptionsShownToUser.readPaperThickness
                  auxPaperThickness = newPaperThickness
                  props.objectWithCurrentUIOptionsShownToUser.setPaperThickness(auxPaperThickness)

                  for(let i=0;i<props.readStatefulUploadedFilesTracker.length;i++){
                    let auxArray = [...props.readStatefulUploadedFilesTracker];
                    auxArray[i].paperWeight = auxPaperThickness;
                    props.setStatefulUploadedFilesTracker(auxArray);
                  }
                }
              }
              else{
                let auxPaperThickness = props.objectWithCurrentUIOptionsShownToUser.readPaperThickness
                auxPaperThickness = newPaperThickness
                props.objectWithCurrentUIOptionsShownToUser.setPaperThickness(auxPaperThickness)

                props.readStatefulUploadedFilesTracker[0].paperWeight = auxPaperThickness
                let auxArray = [...props.readStatefulUploadedFilesTracker];        
                props.setStatefulUploadedFilesTracker(auxArray);
              }
            }          
          }
        }
      }
    };  
  
    function handlePaperOrientation (event, newPaperOrientation){
      if(newPaperOrientation!== null){
        if(!props.globalAtLeastFileUploaded && props.readStatefulUploadedFilesTracker.length<1){
          askUserToUploadAtLeastOneFile()
        }
        if(props.readStatefulUploadedFilesTracker.length>0){        
          if(props.passedArgumentBooleanApplyToAll){
            let auxPaperOrientation = props.objectWithCurrentUIOptionsShownToUser.readPaperOrientation
            auxPaperOrientation = newPaperOrientation
            props.objectWithCurrentUIOptionsShownToUser.setPaperOrientation(auxPaperOrientation)

            let auxArray = [...props.readStatefulUploadedFilesTracker];
            for(let i=0;i<props.readStatefulUploadedFilesTracker.length;i++){
              auxArray[i].paperOrientation = auxPaperOrientation;                    
            }
            props.setStatefulUploadedFilesTracker(auxArray);
          }
          else{
            let atLeastOneIsSelected = false
            for(let i=0;i<props.readStatefulUploadedFilesTracker.length;i++){
              if(props.readStatefulUploadedFilesTracker[i].documentIsSelected){
                
                atLeastOneIsSelected = true;
                
                let auxPaperOrientation = props.objectWithCurrentUIOptionsShownToUser.readPaperOrientation
                auxPaperOrientation = newPaperOrientation
                props.objectWithCurrentUIOptionsShownToUser.setPaperOrientation(auxPaperOrientation)
                
                let auxArray = [...props.readStatefulUploadedFilesTracker];
                auxArray[i].paperOrientation = auxPaperOrientation;
                props.setStatefulUploadedFilesTracker(auxArray);
              }
            }
            if(!atLeastOneIsSelected){
              if(props.readStatefulUploadedFilesTracker.length>1){
                if(!props.passedArgumentBooleanApplyToAll){
                  handleApplyToAll();
                  if(props.passedArgumentBooleanApplyToAll){
                    let auxPaperOrientation = props.objectWithCurrentUIOptionsShownToUser.readPaperOrientation
                    auxPaperOrientation = newPaperOrientation
                    props.objectWithCurrentUIOptionsShownToUser.setPaperOrientation(auxPaperOrientation)

                    let auxArray = [...props.readStatefulUploadedFilesTracker];
                    for(let i=0;i<props.readStatefulUploadedFilesTracker.length;i++){
                      auxArray[i].paperOrientation = auxPaperOrientation;                    
                    }
                    props.setStatefulUploadedFilesTracker(auxArray);
                  }
                }
                else{
                  let auxPaperOrientation = props.objectWithCurrentUIOptionsShownToUser.readPaperOrientation
                  auxPaperOrientation = newPaperOrientation
                  props.objectWithCurrentUIOptionsShownToUser.setPaperOrientation(auxPaperOrientation)

                  for(let i=0;i<props.readStatefulUploadedFilesTracker.length;i++){
                    let auxArray = [...props.readStatefulUploadedFilesTracker];
                    auxArray[i].paperOrientation = auxPaperOrientation;
                    props.setStatefulUploadedFilesTracker(auxArray);
                  }
                }
              }
              else{
                let auxPaperOrientation = props.objectWithCurrentUIOptionsShownToUser.readPaperOrientation
                auxPaperOrientation = newPaperOrientation
                props.objectWithCurrentUIOptionsShownToUser.setPaperOrientation(auxPaperOrientation)

                props.readStatefulUploadedFilesTracker[0].paperOrientation = auxPaperOrientation
                let auxArray = [...props.readStatefulUploadedFilesTracker];        
                props.setStatefulUploadedFilesTracker(auxArray);
              }
            }          
          }
        }
      }
    };
  
    function handlePaperTurn (event, newPaperTurn){
      if(newPaperTurn!== null){
        if(!props.globalAtLeastFileUploaded && props.readStatefulUploadedFilesTracker.length<1){
          askUserToUploadAtLeastOneFile()
        }
        if(props.readStatefulUploadedFilesTracker.length>0){        
          if(props.passedArgumentBooleanApplyToAll){
            let auxPaperTurn = props.objectWithCurrentUIOptionsShownToUser.readPaperTurn
            auxPaperTurn = newPaperTurn
            props.objectWithCurrentUIOptionsShownToUser.setPaperTurn(auxPaperTurn)

            let auxArray = [...props.readStatefulUploadedFilesTracker];
            for(let i=0;i<props.readStatefulUploadedFilesTracker.length;i++){
              auxArray[i].turnDoubleSidedPrintBy = auxPaperTurn;                    
            }
            props.setStatefulUploadedFilesTracker(auxArray);
          }
          else{
            let atLeastOneIsSelected = false
            for(let i=0;i<props.readStatefulUploadedFilesTracker.length;i++){
              if(props.readStatefulUploadedFilesTracker[i].documentIsSelected){
                
                atLeastOneIsSelected = true;
                
                let auxPaperTurn = props.objectWithCurrentUIOptionsShownToUser.readPaperTurn
                auxPaperTurn = newPaperTurn
                props.objectWithCurrentUIOptionsShownToUser.setPaperTurn(auxPaperTurn)
                
                let auxArray = [...props.readStatefulUploadedFilesTracker];
                auxArray[i].turnDoubleSidedPrintBy = auxPaperTurn;
                props.setStatefulUploadedFilesTracker(auxArray);
              }
            }
            if(!atLeastOneIsSelected){
              if(props.readStatefulUploadedFilesTracker.length>1){
                if(!props.passedArgumentBooleanApplyToAll){
                  handleApplyToAll();
                  if(props.passedArgumentBooleanApplyToAll){
                    let auxPaperTurn = props.objectWithCurrentUIOptionsShownToUser.readPaperTurn
                    auxPaperTurn = newPaperTurn
                    props.objectWithCurrentUIOptionsShownToUser.setPaperTurn(auxPaperTurn)

                    let auxArray = [...props.readStatefulUploadedFilesTracker];
                    for(let i=0;i<props.readStatefulUploadedFilesTracker.length;i++){
                      auxArray[i].turnDoubleSidedPrintBy = auxPaperTurn;                    
                    }
                    props.setStatefulUploadedFilesTracker(auxArray);
                  }
                }
                else{
                  let auxPaperTurn = props.objectWithCurrentUIOptionsShownToUser.readPaperTurn
                  auxPaperTurn = newPaperTurn
                  props.objectWithCurrentUIOptionsShownToUser.setPaperTurn(auxPaperTurn)

                  for(let i=0;i<props.readStatefulUploadedFilesTracker.length;i++){
                    let auxArray = [...props.readStatefulUploadedFilesTracker];
                    auxArray[i].turnDoubleSidedPrintBy = auxPaperTurn;
                    props.setStatefulUploadedFilesTracker(auxArray);
                  }
                }
              }
              else{
                let auxPaperTurn = props.objectWithCurrentUIOptionsShownToUser.readPaperTurn
                auxPaperTurn = newPaperTurn
                props.objectWithCurrentUIOptionsShownToUser.setPaperTurn(auxPaperTurn)

                props.readStatefulUploadedFilesTracker[0].turnDoubleSidedPrintBy = auxPaperTurn
                let auxArray = [...props.readStatefulUploadedFilesTracker];        
                props.setStatefulUploadedFilesTracker(auxArray);
              }
            }          
          }
        }
      }
    };
  
    const listItemRef = useRef()
  
    function handleShowMoreIcon(){      
      if(showMore){
        setShowMoreIcon(<KeyboardArrowUpIcon></KeyboardArrowUpIcon>)
        setDynamicPlaceholder("ocultar")
  
      }
      else {
        setShowMoreIcon(<KeyboardArrowDownIcon></KeyboardArrowDownIcon>)
        setDynamicPlaceholder("mostrar")
      }
    }
  
    /* JSX returned*/
    return (
      
        <Container className={customClasses.customContainerXsScreens}>

          <Dialog
          open={showMessageAskToUploadAtLeastOneFile}
          onClose={()=>handleUserAnswerToUploadAtLeastOneFile(0)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          >

            <DialogTitle id="alert-dialog-title">{"Adjunta al menos un archivo"}</DialogTitle>

            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Carga al menos un archivo para poder configurarlo 
                </DialogContentText>
            </DialogContent>

            <DialogActions>
                {/* <Button onClick={()=>handleUserAnswerToUploadAtLeastOneFile(0)} color="primary">
                Cancelar
                </Button> */}
                <Button onClick={()=>handleUserAnswerToUploadAtLeastOneFile(1)} color="primary" autoFocus>
                De acuerdo!
                </Button>
            </DialogActions>
          
          </Dialog>

            {/* BOOLEAN SECTION*/}

            <List className={customClasses.customListXsScreens}>        
              <ListItem alignItems='center' className={customClasses.customListItemParentXsScreens}>
                <ListItemText className={customClasses.customTextBooleanApplyToAllFiles}>Aplicar la misma configuracion para todos los archivos</ListItemText>                 
                <ListItemSecondaryAction className={customClasses.smallScreenCustomDivBooleanOption}>
                  <Switch checked={props.passedArgumentBooleanApplyToAll} edge="end" color="primary" onChange={handleApplyToAll}>                  
                  </Switch>
                </ListItemSecondaryAction>          
              </ListItem>
                
              <Dialog
              open={warningOpen}
              onClose={()=>handleWarningAnswer(0)}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              >

                  <DialogTitle id="alert-dialog-title">{"Confirma tu seleccion"}</DialogTitle>

                  <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                      Estas seguro de que quieres aplicar la misma configuracion para todos los archivos?. Si activas esta opcion perderas los cambios de configuracion que hayas hecho para cada archivo individual.
                      </DialogContentText>
                  </DialogContent>

                  <DialogActions>
                      <Button onClick={()=>handleWarningAnswer(0)} color="primary">
                      Cancelar
                      </Button>
                      <Button onClick={()=>handleWarningAnswer(1)} color="primary" autoFocus>
                      Confirmar
                      </Button>
                  </DialogActions>
              
              </Dialog>
            </List>


            {/* REQUIRED OPTIONS*/}

            <Container className={customClasses.customContainerXsScreens}>
              <List className={customClasses.customListRequiredOptionsXsScreens}>                    
                <ListItem  alignItems='center' className={customClasses.customListItemRequiredOptionsStyle}>                    
                  <ListItemIcon className={customClasses.customListIconRequiredOptionsStyle}>
                      <PrintIcon></PrintIcon>
                  </ListItemIcon>                    
                  <ListItemText id="listCopies" primary="Copias" className={customClasses.customListItemTextRequiredOptionsStyle}/>
                  <ListItemSecondaryAction className={customClasses.customListItemSecondaryActionRequiredOptionsStyle}>
                      <ButtonGroup size="small">
                      <Button onClick={handleDecrement} disabled={!enableAllOptions}>-</Button>
                      <Button>{props.objectWithCurrentUIOptionsShownToUser.readCopies}</Button>          
                      <Button disabled={!enableAllOptions} onClick={handleIncrement} >+</Button>
                      </ButtonGroup>
                  </ListItemSecondaryAction>
                </ListItem>
                
                <ListItem alignItems='center' className={customClasses.customListItemRequiredOptionsStyle}>
                  <ListItemIcon className={customClasses.customListIconRequiredOptionsStyle}>
                      <FileCopyIcon></FileCopyIcon>
                  </ListItemIcon>
                  <ListItemText id="listDoubleSided" primary="Impresion a doble cara" className={customClasses.customListItemTextRequiredOptionsStyle}/>
                  <ListItemSecondaryAction className={customClasses.customListItemSecondaryActionRequiredOptionsStyle}>
                      <Switch
                      checked={props.objectWithCurrentUIOptionsShownToUser.readDoubleSided}
                      edge="end"
                      onChange={handleDoubleSided}
                      /* inputProps={{ 'aria-labelledby': 'switch-list-label-bluetooth' }} */
                      />
                  </ListItemSecondaryAction>
                </ListItem>

                <ListItem alignItems='center' className={customClasses.customListItemRequiredOptionsStyle}>
                  <ListItemIcon className={customClasses.customListIconRequiredOptionsStyle}>
                      <PaletteIcon></PaletteIcon>
                  </ListItemIcon>
                  <ListItemText id="listColorPrint" primary="Impresion a color" className={customClasses.customListItemTextRequiredOptionsStyle}/>
                  <ListItemSecondaryAction className={customClasses.customListItemSecondaryActionRequiredOptionsStyle}>
                      <Switch
                      checked={props.objectWithCurrentUIOptionsShownToUser.readColor}
                      edge="end"
                      onChange={handleColor}
                      /*inputProps={{ 'aria-labelledby': 'switch-list-label-bluetooth' }} */
                      />
                  </ListItemSecondaryAction>
                </ListItem>

                
                
                {/* ADVANCED OPTIONS*/}
                
                
                <Collapse in={!(showMore)}>

                  <Hidden xsDown="true">

                    <ListItem>
                      <ListItemIcon className={customClasses.bigScreenCustomListItemIcon}>
                          <InsertDriveFileIcon></InsertDriveFileIcon>
                      </ListItemIcon>
                      <ListItemText id="listPaperSize" primary="Tamaño del papel" />
                      <ListItemSecondaryAction>
                        <ToggleButtonGroup value={props.objectWithCurrentUIOptionsShownToUser.readPaperSize} size="small" exclusive="true" onChange={handlePaperSize} className={customClasses.bigScreenCustomToggleButtonGroup}>
                          <ToggleButton className={customClasses.bigScreenCustomToggleButtonChildTypeNumber} value='A6'>A6</ToggleButton>
                          <ToggleButton value='A5' className={customClasses.bigScreenCustomToggleButtonChildTypeNumber}>A5</ToggleButton>
                          <ToggleButton value='A4' className={customClasses.bigScreenCustomToggleButtonChildTypeNumber}>A4</ToggleButton>
                          <ToggleButton value='A3' className={customClasses.bigScreenCustomToggleButtonChildTypeNumber}>A3</ToggleButton>
                        </ToggleButtonGroup>
                      </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem>
                      <ListItemIcon className={customClasses.bigScreenCustomListItemIcon}>
                          <LineWeightIcon></LineWeightIcon>
                      </ListItemIcon>
                      <ListItemText id="listPaperThickness" primary="Grosor del papel" />                      
                      <ListItemSecondaryAction>
                        <ToggleButtonGroup value={props.objectWithCurrentUIOptionsShownToUser.readPaperThickness} size="small" exclusive="true" onChange={handlePaperThickness} className={customClasses.bigScreenCustomToggleButtonGroup}>
                          <ToggleButton value={80} className={customClasses.bigScreenCustomToggleButtonChildTypeNumber}>80</ToggleButton>
                          <ToggleButton value={175} className={customClasses.bigScreenCustomToggleButtonChildTypeNumber}>175</ToggleButton>
                          <ToggleButton value={250} className={customClasses.bigScreenCustomToggleButtonChildTypeNumber}>250</ToggleButton>
                          <ToggleButton value={300} className={customClasses.bigScreenCustomToggleButtonChildTypeNumber}>300</ToggleButton>
                        </ToggleButtonGroup>
                      </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem>
                      <ListItemIcon className={customClasses.bigScreenCustomListItemIcon}>
                          <Rotate90DegreesCcwIcon></Rotate90DegreesCcwIcon>
                      </ListItemIcon>
                      <ListItemText id="listPaperOrientation" primary="Orientación" />
                      <ListItemSecondaryAction>
                        <ToggleButtonGroup value={props.objectWithCurrentUIOptionsShownToUser.readPaperOrientation} size="small" exclusive="true" onChange={handlePaperOrientation} className={customClasses.bigScreenCustomToggleButtonGroup}>
                          <ToggleButton value="vertical" className={customClasses.bigScreenCustomToggleButtonChildTypeText}>vertical</ToggleButton>
                          <ToggleButton value="horizontal" className={customClasses.bigScreenCustomToggleButtonChildTypeText}>horizontal</ToggleButton>
                        </ToggleButtonGroup>
                      </ListItemSecondaryAction>
                    </ListItem>
                    {(props.objectWithCurrentUIOptionsShownToUser.readDoubleSided) ? (<ListItem>
                      <ListItemIcon className={customClasses.bigScreenCustomListItemIcon}>
                          <NavigateNextIcon></NavigateNextIcon>
                      </ListItemIcon>
                      <ListItemText id="listPaperTurn" primary="Voltear página por lado " />
                      <ListItemSecondaryAction>
                        <ToggleButtonGroup value={props.objectWithCurrentUIOptionsShownToUser.readPaperTurn} size="small" exclusive="true" onChange={handlePaperTurn} className={customClasses.bigScreenCustomToggleButtonGroup}>
                          <ToggleButton value="long" className={customClasses.bigScreenCustomToggleButtonChildTypeText}>largo</ToggleButton>
                          <ToggleButton value="short" className={customClasses.bigScreenCustomToggleButtonChildTypeText}>corto</ToggleButton>
                        </ToggleButtonGroup>
                      </ListItemSecondaryAction>
                    </ListItem>) : null}

                  </Hidden>

                  <Hidden smUp="true"> 

                    <div className={customClasses.customDivIconAndTitle}>
                      <InsertDriveFileIcon className={customClasses.customIcon}></InsertDriveFileIcon>
                      <Typography id="listPaperSize" align="center" className={customClasses.customTitle}>Tamaño del papel</Typography>                    
                    </div>
                    <div className={customClasses.customDivSecondaryAction}>                    
                      <ToggleButtonGroup value={props.objectWithCurrentUIOptionsShownToUser.readPaperSize} size="small" exclusive="true" onChange={handlePaperSize} className={customClasses.customToggleButtonGroup}>
                        <ToggleButton className={customClasses.customToggleButtonChildTypeNumber} value="A6">A6</ToggleButton>
                        <ToggleButton className={customClasses.customToggleButtonChildTypeNumber} value="A5">A5</ToggleButton>
                        <ToggleButton className={customClasses.customToggleButtonChildTypeNumber} value="A4">A4</ToggleButton>
                        <ToggleButton className={customClasses.customToggleButtonChildTypeNumber} value="A3">A3</ToggleButton>
                      </ToggleButtonGroup>
                    </div>
                  
                    <div className={customClasses.customDivIconAndTitle}>
                      <LineWeightIcon className={customClasses.customIcon}></LineWeightIcon>
                      <Typography align="center" className={customClasses.customTitle}>Grosor del papel</Typography>
                    </div>
                    
                    <div className={customClasses.customDivSecondaryAction}>
                      <ToggleButtonGroup value={props.objectWithCurrentUIOptionsShownToUser.readPaperThickness} size="small" exclusive="true" onChange={handlePaperThickness} className={customClasses.customToggleButtonGroup}>
                          <ToggleButton className={customClasses.customToggleButtonChildTypeNumber} value={80}>80</ToggleButton>
                          <ToggleButton className={customClasses.customToggleButtonChildTypeNumber} value={175}>175</ToggleButton>
                          <ToggleButton className={customClasses.customToggleButtonChildTypeNumber} value={250}>250</ToggleButton>
                          <ToggleButton className={customClasses.customToggleButtonChildTypeNumber} value={300}>{/* <label className={{fontSize:'5px'}}>300</label> */}300</ToggleButton>
                        </ToggleButtonGroup>                    
                    </div>
                    
                    
                    <div className={customClasses.customDivIconAndTitle}>
                        <Rotate90DegreesCcwIcon className={customClasses.customIcon}></Rotate90DegreesCcwIcon>
                        <Typography id="listPaperOrientation" align="center" className={customClasses.customTitle}>Orientación</Typography>
                    </div>
                    <div className={customClasses.customDivSecondaryAction}>                    
                        <ToggleButtonGroup value={props.objectWithCurrentUIOptionsShownToUser.readPaperOrientation} size="small" exclusive="true" onChange={handlePaperOrientation} className={customClasses.customToggleButtonGroup}>
                          <ToggleButton className={customClasses.customToggleButtonChildTypeText} value="vertical">vertical</ToggleButton>
                          <ToggleButton className={customClasses.customToggleButtonChildTypeText} value="horizontal">horizontal</ToggleButton>
                        </ToggleButtonGroup>
                    </div>


                    {(props.objectWithCurrentUIOptionsShownToUser.readDoubleSided) ? (
                    <Container disableGutters="true" className={customClasses.customContainerXsScreens}>
                      <div className={customClasses.customDivIconAndTitle}>
                        <NavigateNextIcon></NavigateNextIcon>
                        <Typography id="listPaperTurn" className={customClasses.customTitle}>Voltear página por lado</Typography>
                      </div>
                      <div className={customClasses.customDivSecondaryAction}>
                        <ToggleButtonGroup value={props.objectWithCurrentUIOptionsShownToUser.readPaperTurn} size="small" exclusive="true" onChange={handlePaperTurn} className={customClasses.customToggleButtonGroup}>
                          <ToggleButton value="long" className={customClasses.customToggleButtonChildTypeText}>largo</ToggleButton>
                          <ToggleButton value="short" className={customClasses.customToggleButtonChildTypeText}>corto</ToggleButton>
                        </ToggleButtonGroup>
                      </div>
                    </Container>): null}
                    
                  </Hidden>

                </Collapse>
                <br></br>

                <Button style={{marginBottom:'45px'}} variant="contained" size="large" fullWidth="true" startIcon={showMoreIcon} onClick={()=> {setShowMore(!showMore); handleShowMoreIcon(); listItemRef.current.scrollIntoView()}}>
                    {dynamicPlaceholder} opciones avanzadas
                </Button>
                <ListItem ref={listItemRef}></ListItem>
              </List>        
            </Container>
        </Container>
    );

    
}

