
import React from 'react';

import UploadsBuilding from '../views/UploadsBuilding';
import Options from './options';

import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    appContainerClass: {
        minHeight: '100%',
        minHeight: '100vh',
        position: 'relative'
    },
    circularLoad: {
        position: 'absolute',
        top: '30%',
    }
});

let arrayWithAllFilesConfigSettings;
let setArrayWithAllFilesConfigSettings;
let stillLoadingPDFComponentsAfterUserWentBack;
let setStillLoadingPDFComponentsAfterUserWentBack;
let auxMemoizedAlternative;
let showMessageAskToUploadAtLeastOneFile;
let setShowMessageAskToUploadAtLeastOneFile;

/**
 * Renders the DocumentsBuilding component.
 * 
 * @param {Object} props - The component props.
 * @returns {JSX.Element} The rendered component.
 */
export default function DocumentsBuilding(props) {
    const classes = useStyles();

    arrayWithAllFilesConfigSettings = props.arrayWithAllFilesConfigSettings;
    setArrayWithAllFilesConfigSettings = props.setArrayWithAllFilesConfigSettings;
    auxMemoizedAlternative = props.auxMemoizedAlternative;
    showMessageAskToUploadAtLeastOneFile = props.showMessageAskToUploadAtLeastOneFile;
    setShowMessageAskToUploadAtLeastOneFile = props.setShowMessageAskToUploadAtLeastOneFile;

    const [atLeastOneFileUploaded, setAtLeastOneFileUploaded] = React.useState(false);
    const [moreThanOneFileUploaded, setMoreThanOneFileUploaded] = React.useState(false);
    const [atLeastOneFileSelected, setAtLeastOneFileSelected] = React.useState(false);
    const [resetAllFilesConfiguration, setResetAllFilesConfiguration] = React.useState(false);
    const [readResetUserShownCopiesCounter, setResetUserShownCopiesCounter] = React.useState(false);

    stillLoadingPDFComponentsAfterUserWentBack = props.stillLoadingPDFComponentsAfterUserWentBack;
    setStillLoadingPDFComponentsAfterUserWentBack = props.setStillLoadingPDFComponentsAfterUserWentBack;

    const [booleanApplyToAll, setBooleanApplyToAll] = React.useState(false);
    const [copiesCounter, setCopiesCounter] = React.useState(1);
    const [doubleSided, setDoubleSided] = React.useState(true);
    const [color, setColor] = React.useState(false);
    const [paperSize, setPaperSize] = React.useState('A4');
    const [paperThickness, setPaperThickness] = React.useState(80);
    const [paperOrientation, setPaperOrientation] = React.useState('vertical');
    const [paperTurn, setPaperTurn] = React.useState('long');

    let objectWithCurrentUIOptionsShownToUser = {
        readCopies: copiesCounter,
        setCopies: setCopiesCounter,
        readDoubleSided: doubleSided,
        setDoubleSided: setDoubleSided,
        readColor: color,
        setColor: setColor,
        readPaperSize: paperSize,
        setPaperSize: setPaperSize,
        readPaperThickness: paperThickness,
        setPaperThickness: setPaperThickness,
        readPaperOrientation: paperOrientation,
        setPaperOrientation: setPaperOrientation,
        readPaperTurn: paperTurn,
        setPaperTurn: setPaperTurn
    };

    let overlayDivForLoadingScreen = {
        position: 'fixed',
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'rgba(255,255,255)',
        minWidth: '100%',
        minHeight: '100%',
        height: '100%',
        width: '100%',
        zIndex: '900',
    };

    return (
        <Grid container justify="space-evenly">
            {stillLoadingPDFComponentsAfterUserWentBack?(
            <div htmlId="overlayLoading" style={overlayDivForLoadingScreen}>
                <CircularProgress className={classes.circularLoad}></CircularProgress>
            </div>
            )
            :null
        }

        <Hidden smDown="true">
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} spacing={1}>
            
                <Options /* readCurrentFileConfig={filePrintConfig} setCurrentFileConfig={setFilePrintConfig} */ readStatefulUploadedFilesTracker={arrayWithAllFilesConfigSettings} setStatefulUploadedFilesTracker={setArrayWithAllFilesConfigSettings} passedArgumentBooleanApplyToAll={booleanApplyToAll} passedArgumentSetBooleanApplyToAll={setBooleanApplyToAll} globalAtLeastFileUploaded={atLeastOneFileUploaded}
                globalAtLeastOneFileSelected={atLeastOneFileSelected}
                setGlobalAtLeastOneFileSelected={setAtLeastOneFileSelected} passedSetResetUserShownCopiesCounter={setResetUserShownCopiesCounter} passedReadResetUserShownCopiesCounter={readResetUserShownCopiesCounter}
                passedResetAllFilesConfiguration={resetAllFilesConfiguration} passedSetResetAllFilesConfiguration={setResetAllFilesConfiguration}
                passedMoreThanOneFileUploaded={moreThanOneFileUploaded} passedSetMoreThanOneFileUploaded={setMoreThanOneFileUploaded} objectWithCurrentUIOptionsShownToUser={objectWithCurrentUIOptionsShownToUser} showMessageAskToUploadAtLeastOneFile={showMessageAskToUploadAtLeastOneFile} setShowMessageAskToUploadAtLeastOneFile={setShowMessageAskToUploadAtLeastOneFile}
                ></Options>

            </Grid>            
        </Hidden>

        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} >
            {/* <br></br> */}
            <Typography /* style={{position:'sticky'}}  */variant="h6" align="center">Carga tus archivos aquí</Typography>
            
            <Divider></Divider>

            <UploadsBuilding readStatefulUploadedFilesTracker={arrayWithAllFilesConfigSettings} setStatefulUploadedFilesTracker={setArrayWithAllFilesConfigSettings} passedArgumentBooleanApplyToAll={booleanApplyToAll} passedArgumentSetBooleanApplyToAll={setBooleanApplyToAll} globalAtLeastFileUploaded={atLeastOneFileUploaded}
            setGlobalAtLeastFileUploaded={setAtLeastOneFileUploaded} globalAtLeastOneFileSelected={atLeastOneFileSelected} setGlobalAtLeastOneFileSelected={setAtLeastOneFileSelected} passedSetResetUserShownCopiesCounter={setResetUserShownCopiesCounter} passedReadResetUserShownCopiesCounter={readResetUserShownCopiesCounter} passedResetAllFilesConfiguration={resetAllFilesConfiguration} passedSetResetAllFilesConfiguration={setResetAllFilesConfiguration} passedMoreThanOneFileUploaded={moreThanOneFileUploaded} passedSetMoreThanOneFileUploaded={setMoreThanOneFileUploaded} objectWithCurrentUIOptionsShownToUser={objectWithCurrentUIOptionsShownToUser} setStillLoadingPDFComponentsAfterUserWentBack={setStillLoadingPDFComponentsAfterUserWentBack} auxMemoizedAlternative={auxMemoizedAlternative} showMessageAskToUploadAtLeastOneFile={showMessageAskToUploadAtLeastOneFile} setShowMessageAskToUploadAtLeastOneFile={setShowMessageAskToUploadAtLeastOneFile}
            />
        </Grid>
            
        <Hidden mdUp="true">
            
            <Grid item xs={12} sm={12} md={12} lg={6} xl={6} spacing={1} >

            <Options /* readCurrentFileConfig={filePrintConfig} setCurrentFileConfig={setFilePrintConfig} */ readStatefulUploadedFilesTracker={arrayWithAllFilesConfigSettings} setStatefulUploadedFilesTracker={setArrayWithAllFilesConfigSettings} passedArgumentBooleanApplyToAll={booleanApplyToAll} passedArgumentSetBooleanApplyToAll={setBooleanApplyToAll} globalAtLeastFileUploaded={atLeastOneFileUploaded}
            globalAtLeastOneFileSelected={atLeastOneFileSelected}
            setGlobalAtLeastOneFileSelected={setAtLeastOneFileSelected} passedSetResetUserShownCopiesCounter={setResetUserShownCopiesCounter} passedReadResetUserShownCopiesCounter={readResetUserShownCopiesCounter}
             passedResetAllFilesConfiguration={resetAllFilesConfiguration} passedSetResetAllFilesConfiguration={setResetAllFilesConfiguration} passedMoreThanOneFileUploaded={moreThanOneFileUploaded} passedSetMoreThanOneFileUploaded={setMoreThanOneFileUploaded} objectWithCurrentUIOptionsShownToUser={objectWithCurrentUIOptionsShownToUser} showMessageAskToUploadAtLeastOneFile={showMessageAskToUploadAtLeastOneFile} setShowMessageAskToUploadAtLeastOneFile={setShowMessageAskToUploadAtLeastOneFile}></Options>
            
            </Grid>
        </Hidden>          
        </Grid>
    );
}