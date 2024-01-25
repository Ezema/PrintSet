import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
}));

const stepsArray = ['Sube tus archivos', 'Revisa tu pedido', 'Finaliza tu compra'];

export default function Steps(props) {
  const classes = useStyles();  
  return (
    <div className={classes.root}>
        <Stepper activeStep={props.objectToControlCurrentView.readCurrentView}>
            {stepsArray.map((label) => {                
                return (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                );
            })}
        </Stepper>    
    </div>
  );
}
