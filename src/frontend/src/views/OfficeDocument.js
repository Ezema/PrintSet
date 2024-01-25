import React from 'react';

import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    customTypographyRepresentingDocumentType:{
        /* This typography is a child of --paper-- */
        userSelect: 'none', 
        position: 'absolute', 
        top:'15%',
        /* textShadow: '0.5px 0.5px 2px #404040', */
    },
    customTypographyRepresentingDocumentTitle:{
        /* This typography is a child of --paper-- */
        color:'#808080', 
        userSelect: 'none', 
        position: 'absolute', 
        top:'40%', 
        maxWidth:'97%'
    },
    
    customDivThatShowsDocumentInfo: {
        position: 'absolute',

        display: 'flex',

        width: '100%',
        height: '30%',
        background: 'rgba(45,108,206,0.6)',
        bottom: '0',

        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',

        /* borderTop: '1px dotted rgba(45,108,206)', */

        textShadow: '1px 1px 5px black',
        color: 'white',
        textAlign: 'center',
        userSelect: 'none',
    },    
}));

export default function OfficeDocumentRender (props){
    const classes = useStyles();

    if(props.documentType.includes('word')){
        return(
            <Paper elevation={4} className={props.passedClass} onClick={props.passedPropOnClick}>                                        
                <Typography variant="h6" display="block" align='center' className={classes.customTypographyRepresentingDocumentType} style={{ color: "#00a2ed"}}>Word</Typography>
                <Typography variant="body2" align="center" className={classes.customTypographyRepresentingDocumentTitle}>{`${props.objectPassed.rawFile.name}`}</Typography>
                
                <div className={classes.customDivThatShowsDocumentInfo}>
                    <Typography>{props.objectPassed.numberOfCopies > 1 ? ` ${props.objectPassed.numberOfCopies} copias` : `1 copia`} {props.objectPassed.paperSize}<br></br>{props.objectPassed.doubleSided ? 'doble cara' : `una cara`} {props.objectPassed.printInColor ? 'Color' : `B/N`}</Typography>
                </div>
            </Paper>
        )
    }
    else if(props.documentType.includes('powerpoint')){
        return(
            <Paper elevation={4} className={props.passedClass} onClick={props.passedPropOnClick}>                                        
                <Typography variant="h6" display="block" align='center' className={classes.customTypographyRepresentingDocumentType} style={{ color: "#FF4500"}}>PowerPoint</Typography>
                <Typography variant="body2" align="center" className={classes.customTypographyRepresentingDocumentTitle}>{`${props.objectPassed.rawFile.name}`}</Typography>
                
                <div className={classes.customDivThatShowsDocumentInfo}>
                    <Typography>{props.objectPassed.numberOfCopies > 1 ? ` ${props.objectPassed.numberOfCopies} copias` : `1 copia`} {props.objectPassed.paperSize}<br></br>{props.objectPassed.doubleSided ? 'doble cara' : `una cara`} {props.objectPassed.printInColor ? 'Color' : `B/N`}</Typography>
                </div>
            </Paper>
        )
    }
}