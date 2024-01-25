import React from 'react';

import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme)=>({    
    
    tableContainer: {
        [theme.breakpoints.down('md')]: {
            maxHeight:'50vh',
            marginBottom:'1em',
            overflowY:'scroll'

        },
        [theme.breakpoints.up('md')]: {
            /* maxHeight:'450px', */
            marginBottom:'1em',

        },
    },
    customDivider: {
        marginBottom:'0.5em'
    },
    parentRow: {
        whiteSpace: "nowrap",
        maxWidth:'10px',
        maxHeight:'5px',
        width:'10px',
        height:'5px',
        overflowX:'hidden',
        overflowY:'hidden',
        display:'relative',
        padding:'1px',
        margin:'1px'
    },
    documentRow: {
        whiteSpace: "nowrap",
        display:'absolute',
        maxWidth:'10px',
        maxHeight:'5px',
        width:'10px',
        height:'5px',
        overflowX:'hidden',
        overflowY:'hidden',
        padding:'1px',
        margin:'1px'
    },
    childRow: {
        whiteSpace: "nowrap",
        display:'absolute',
        maxWidth:'10px',
        maxHeight:'5px',
        width:'10px',
        height:'5px',
        overflowX:'hidden',
        overflowY:'hidden',
        padding:'1px',
        margin:'1px'
    },
    titleDocument: {
        /* whiteSpace: "nowrap", */
        display:'absolute',
        maxWidth:'60px',
        maxHeight:'5px',
        width:'60px',
        height:'5px',
        minWidth:'60px',
        minHeight:'5px',
        overflowX:'hidden',
        overflowY:'hidden',
        padding:'1px',
        margin:'1px'
    },
    titleCopies: {
        /* whiteSpace: "nowrap", */
        display:'absolute',
        maxWidth:'50px',
        maxHeight:'5px',
        width:'50px',
        height:'5px',
        minWidth:'50px',
        minHeight:'5px',
        overflowX:'hidden',
        overflowY:'hidden',
        padding:'1px',
        margin:'1px'
    },
    titleDoubleSided: {
        /* whiteSpace: "nowrap", */
        display:'absolute',
        maxWidth:'50px',
        maxHeight:'5px',
        width:'50px',
        height:'5px',
        minWidth:'50px',
        minHeight:'5px',
        overflowX:'hidden',
        overflowY:'hidden',
        padding:'1px',
        margin:'1px'
    },
    titleColor: {
        /* whiteSpace: "nowrap", */
        display:'absolute',
        maxWidth:'40px',
        maxHeight:'5px',
        width:'40px',
        height:'5px',
        minWidth:'40px',
        minHeight:'5px',
        overflowX:'hidden',
        overflowY:'hidden',
        padding:'1px',
        margin:'1px'
    },
    titleFormat: {
        /* whiteSpace: "nowrap", */
        display:'absolute',
        maxWidth:'55px',
        maxHeight:'5px',
        width:'55px',
        height:'5px',
        minWidth:'55px',
        minHeight:'5px',
        overflowX:'hidden',
        overflowY:'hidden',
        padding:'1px',
        margin:'1px'
    },
    titleWeight: {
        /* whiteSpace: "nowrap", */
        display:'absolute',
        maxWidth:'50px',
        maxHeight:'5px',
        width:'50px',
        height:'5px',
        minWidth:'50px',
        minHeight:'5px',
        overflowX:'hidden',
        overflowY:'hidden',
        padding:'1px',
        margin:'1px'
    },
    titleOrientation: {
        /* whiteSpace: "nowrap", */
        display:'absolute',
        maxWidth:'75px',
        maxHeight:'5px',
        width:'75px',
        height:'5px',
        minWidth:'75px',
        minHeight:'5px',
        overflowX:'hidden',
        overflowY:'hidden',
        padding:'1px',
        margin:'1px'
    },
    titlePaperTurn: {
        /* whiteSpace: "nowrap", */
        display:'absolute',
        maxWidth:'50px',
        maxHeight:'5px',
        width:'50px',
        height:'5px',
        minWidth:'50px',
        minHeight:'5px',
        overflowX:'hidden',
        overflowY:'hidden',
        padding:'1px',
        margin:'1px'
    },

    divEncloseTypogrpahy: {
        display:'flex',
        justifyContent:'space-between',
        overflowX:'hidden',
        overflowY:'hidden',
        padding:'1px',
        margin:'1px'
    },
    typogrpahyLeft: {
        fontWeight: "bold",
    },
    typogrpahyRight: {
        
    },
    customMarginBotton:{
        marginBottom:'2em'
    },
  }));

let arrayWithAllFilesConfigSettings;
let lastIndex;

export default function CartBuilding(props){

    const [loadingOverlay, setLoadingOverlay] = React.useState(true);
    const classes = useStyles();

    arrayWithAllFilesConfigSettings = props.arrayWithAllFilesConfigSettings;

    let overlayDivForLoadingScreen = {
        position: 'fixed',
        display: 'flex',        
        justifyContent: 'center',
        backgroundColor:'rgba(255,255,255)',
        minWidth:'100%',
        minHeight:'100%',
        height:'100%',
        width:'100%',
        zIndex:'999',
    }

    function handleTotalSum(arrayWithAllFilesConfigSettings){
        let totalSum = 0;
        arrayWithAllFilesConfigSettings.map((object)=>(
            totalSum = totalSum + object.pricePerDocument
        ));   
        return totalSum;
    }
        
    let arrayOfPrintingConfigurations = [];
    let auxController = 0;
    let firstPrintingConfiguration = {};

    function handleDocumentPrice(object){        

        /* booleanApplyToAll */
        if(auxController==0){
            firstPrintingConfiguration.doubleSided = object.doubleSided;
            firstPrintingConfiguration.printInColor = object.printInColor;
            firstPrintingConfiguration.paperSize = object.paperSize;
            firstPrintingConfiguration.paperWeight = object.paperWeight;
            firstPrintingConfiguration.paperOrientation = object.paperOrientation;
            firstPrintingConfiguration.turnDoubleSidedPrintBy = object.turnDoubleSidedPrintBy;
            firstPrintingConfiguration.totalPages = (object.pdfNumberOfPages)?object.pdfNumberOfPages:1;

            arrayOfPrintingConfigurations.push(firstPrintingConfiguration);
        }
        else{
            for(let i=0; i<arrayOfPrintingConfigurations.length; i++){
                if(
                    arrayOfPrintingConfigurations[i].doubleSided == object.doubleSided &&
                    arrayOfPrintingConfigurations[i].printInColor == object.printInColor &&
                    arrayOfPrintingConfigurations[i].paperSize == object.paperSize &&
                    arrayOfPrintingConfigurations[i].paperWeight == object.paperWeight &&
                    arrayOfPrintingConfigurations[i].paperOrientation == object.paperOrientation &&
                    arrayOfPrintingConfigurations[i].turnDoubleSidedPrintBy == object.turnDoubleSidedPrintBy                    
                ){
                    arrayOfPrintingConfigurations[i].totalPages=(arrayOfPrintingConfigurations[i].totalPages)+((object.pdfNumberOfPages)?object.pdfNumberOfPages:1);
                }
                else if(
                    arrayOfPrintingConfigurations[i].doubleSided !== object.doubleSided ||
                    arrayOfPrintingConfigurations[i].printInColor !== object.printInColor ||
                    arrayOfPrintingConfigurations[i].paperSize !== object.paperSize ||
                    arrayOfPrintingConfigurations[i].paperWeight !== object.paperWeight ||
                    arrayOfPrintingConfigurations[i].paperOrientation !== object.paperOrientation ||
                    arrayOfPrintingConfigurations[i].turnDoubleSidedPrintBy !== object.turnDoubleSidedPrintBy
                ){
                    let newConfiguration = {};
                    newConfiguration.doubleSided = object.doubleSided;
                    newConfiguration.printInColor = object.printInColor;
                    newConfiguration.paperSize = object.paperSize;
                    newConfiguration.paperWeight = object.paperWeight;
                    newConfiguration.paperOrientation = object.paperOrientation;
                    newConfiguration.turnDoubleSidedPrintBy = object.turnDoubleSidedPrintBy;
                    newConfiguration.totalPages=(object.pdfNumberOfPages)?object.pdfNumberOfPages:1;

                    arrayOfPrintingConfigurations.push(newConfiguration);
                    
                }                                
            }
            
        }
        
        let differencePriceOneSided=(object.doubleSided)?(0):(0.01);
        let differencePriceColor=(object.printInColor)?0.07:0;
        let differencePriceFormat=((object.paperSize=="A4")?(0):((object.paperSize=="A3")?(0.01):((object.paperSize=="A5")?(0):(null))));
        let differencePriceWeight = ((object.paperWeight==80)?(0):((object.paperWeight==125)?(0.02):((object.paperWeight==250)?(0.03):(null))));
        let numberOfPages= (object.pdfNumberOfPages)?object.pdfNumberOfPages:1

        
        let differencePricePerCopy = object.numberOfCopies * numberOfPages *(0.03+differencePriceOneSided+differencePriceColor+differencePriceFormat+differencePriceWeight);

        auxController = auxController + 1;

        return differencePricePerCopy;
    }
    
    arrayWithAllFilesConfigSettings.map((object) => (object.pricePerDocument=handleDocumentPrice(object)));

    let totalSum = handleTotalSum(arrayWithAllFilesConfigSettings);

    /* console.log(arrayOfPrintingConfigurations) */

    return(
        
        <div>
            <Divider className={classes.customDivider}></Divider>
            <TableContainer component={Paper} className={classes.tableContainer}>
                <Table className={{}/* classes.table */} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" className={classes.titleDocument}>Nombre</TableCell>
                            <TableCell align="center" className={classes.titleCopies}>Copias</TableCell>
                            <TableCell align="center" className={classes.titleDoubleSided}>Doble<br/>cara</TableCell>
                            <TableCell align="center" className={classes.titleColor}>Color{/* <br/>/BN */}</TableCell>
                            <TableCell align="center" className={classes.titleFormat}>Formato</TableCell>
                            <TableCell align="center" className={classes.titleWeight}>Grosor</TableCell>
                            <TableCell align="center" className={classes.titleOrientation}>Orientación</TableCell>
                            <TableCell align="center" className={classes.titlePaperTurn}>Voltear</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>         
                                   
                    {arrayWithAllFilesConfigSettings.map((object) => (
                        <TableRow key={object.uniqueKeyForReact} className={classes.ParentRow}>
                            <TableCell component="th" scope="row" className={classes.documentRow}>
                                {object.rawFile.name}
                            </TableCell>
                            <TableCell align="center" size={"small"} className={classes.childRow}>{object.numberOfCopies}</TableCell>
                            <TableCell align="center" size={"small"} className={classes.childRow}>{object.doubleSided?("Si"):("No")}</TableCell>
                            <TableCell align="center" size={"small"} className={classes.childRow}>{object.printInColor?("Color"):("B/N")}</TableCell>
                            <TableCell align="center" size={"small"} className={classes.childRow}>{object.paperSize}</TableCell>                        
                            <TableCell align="center" size={"small"} className={classes.childRow}>{object.paperWeight}</TableCell>
                            <TableCell align="center" size={"small"} className={classes.childRow}>{((object.paperOrientation).includes("vertical"))?"Vertical":"Horizontal"}</TableCell>
                            <TableCell align="center" size={"small"} className={classes.ChildRow}>{
                                (object.doubleSided)?
                                ((object.turnDoubleSidedPrintBy).includes("long"))?"Largo":"Corto":"-"}</TableCell>                        
                        </TableRow>
                        
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>        
            <Divider className={classes.customDivider}></Divider>
            
            {arrayOfPrintingConfigurations.map((object)=>(
                <div className={classes.divEncloseTypogrpahy}>
                    <Typography variant="body2" className={classes.typogrpahyLeft}>
                    {object.totalPages} 
                    </Typography>
                    
                    <Typography variant="body2" className={classes.typogrpahyRight}>
                    {object.doubleSided?"Doble cara":"Una cara"} {object.printInColor?"Color":"B/N"} {((object.paperSize=="A4")?("A4"):((object.paperSize=="A3")?("A3"):((object.paperSize=="A5")?("A5"):("A6"))))} {((object.paperWeight==80)?("80"):((object.paperWeight==125)?("125"):((object.paperWeight==250)?("250"):("300"))))} {object.paperOrientation.includes("vertical")?"Vertical":"Horizontal"} {object.turnDoubleSidedPrintBy.includes("long")?"Lado Largo":"Lado Corto"}</Typography>                
                </div>
                ))
            }
            <Divider className={classes.customDivider}></Divider>            
            
            <Typography variant="h6" align="right" color="textSecondary">
                {(totalSum.toFixed(2)/1.21).toFixed(2)}€
            </Typography>
            <Typography variant="h6" align="right" color="textSecondary">
                IVA {(totalSum.toFixed(2)-(totalSum.toFixed(2)/1.21)).toFixed(2)}€
            </Typography>
            <Typography variant="h4" align="right" className={classes.customMarginBotton}>
                Total {totalSum.toFixed(2)}€
            </Typography>
            
        </div>
    )
}