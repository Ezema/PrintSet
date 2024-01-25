import React from 'react';
import { Page, pdfjs } from 'react-pdf';
import { Document } from 'react-pdf/dist/esm/entry.webpack';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

pdfjs.GlobalWorkerOptions.workerSrc = 'pdf.worker.min.js';

const useStyles = makeStyles((theme) => ({
    customDivThatShowsDocumentInfo: {
        position: 'absolute',

        display: 'flex',

        width: '100%',
        height: 'auto',
        background: 'rgba(0,0,0,0.4)',
        top: '0',
        right: '0',
        paddingRight: '0.3em',

        //Y AXIS
        alignItems: 'center',
        alignContent: 'center',
        //X AXIS
        justifyContent: 'flex-end',

        /* borderTop: '1px dotted rgba(45,108,206)', */

        textShadow: '1px 1px 5px black',
        color: 'white',
        textAlign: 'justify',
        textJustify: 'right',
        userSelect: 'none',
        overflow: 'hidden',

    },
    customDivThatShowsDocumentSettings: {
        position: 'absolute',

        display: 'flex',

        width: '100%',
        height: '30%',
        background: 'rgba(45,108,206,0.4)',
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
    customPaperUploadFiles: {
        /* WARNING! WIDTH AND HEIGHT IS CONTROLLED FROM PAPER API*/
        maxWidth: '90%',
        maxHeight: '90%',
        minWidth: '90%',
        minHeight: '90%',
        width: '90%',
        height: '90%',

        overflowY: 'hidden',
        overflowX: 'hidden',

        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        position: "relative",

        /* overflowWrap: 'break-word', */
    },
    customDocumentTitleAndTypeWrapper:{
        overflow: "hidden",  
    },
    customTypographyRepresentingDocumentType:{
        /* This typography is a child of --paper-- */        
        /* width:'100%', */        
        color:'#ff0000', 
        userSelect: 'none',
        /* textShadow: '0.5px 0.5px 2px #404040', */
    },
    customTypographyRepresentingDocumentTitle:{
        /* This typography is a child of --paper-- */
        /* position:'absolute', */
        /* width:'100%', */
        color:'#808080', 
        userSelect: 'none',
        maxWidth:'97%',

        /* wordWrap: 'break-word',
        overflowWrap: 'break-word', */
    },
    
}))
export default function ReactPDFComponent(props) {

    const [pdfAfterLoaded, setPdfAfterLoaded] = React.useState(null)

    const classes = useStyles();
    /* console.log(props.passedPropOnLoaded) */
    return (
        <Paper elevation={4} className={props.passedClass/* ,classes.customPaperUploadFiles */} onClick={props.passedPropOnClick}>            
            
            <Document className={classes.customReactPdfErrorMessages} file={props.objectPassed.rawFile} onLoadSuccess={(pdf)=>{setPdfAfterLoaded(pdf);props.passedPropOnLoaded(props.objectPassed);props.objectPassed.pdfNumberOfPages=pdf.numPages;}} error={'Error'} loading={'Cargando'} noDate={'Error'} onPassword={'Error: El PDF require contraseña'} onLoadError={'Error'} onSourceError={'Error'}>
                {props.previewIsEnabled?
                (<Page error={'Error'} loading={'Cargando'} onLoadError={'Error con el archivo'} onRenderError={'Error con el archivo'} pageNumber={1} width={105} scale={0.95}></Page>)
                :
                (<div className={classes.customDocumentTitleAndTypeWrapper}><Typography variant="h6" display="block" align='center' className={classes.customTypographyRepresentingDocumentType} style={{}}>PDF</Typography>
                
                <Typography noWrap='true' variant="body2" /* display='block' */ align="center" className={classes.customTypographyRepresentingDocumentTitle}>{/* <br></br> */}{`${props.objectPassed.rawFile.name}`}</Typography></div>)                
            }
            </Document>            
            <div className={classes.customDivThatShowsDocumentInfo}>
                <Typography>
                    {pdfAfterLoaded?(pdfAfterLoaded.numPages)+' '+'páginas':''}</Typography>
            </div>
            <div className={classes.customDivThatShowsDocumentSettings}>
                <Typography>{props.objectPassed.numberOfCopies > 1 ? ` ${props.objectPassed.numberOfCopies} copias` : `1 copia`} {props.objectPassed.paperSize}<br></br>{props.objectPassed.doubleSided ? 'doble cara' : `una cara`} {props.objectPassed.printInColor ? 'Color' : `B/N`}</Typography>
            </div>
            
        </Paper>
    )
}