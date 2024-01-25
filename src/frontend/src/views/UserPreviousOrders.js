import Skeleton from '@material-ui/lab/Skeleton';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import Container from '@material-ui/core/Container';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';


export default function UserPreviousOrders(props){
    const [loading, setLoading] = React.useState(true)

    const [open, setOpen] = React.useState(false);

    const [previousOrders, setPreviousOrders] = React.useState(null)

    React.useEffect(() => {
        let firebaseUserUid = null
        const firebase = props.firebase
        if (firebase != null){
            firebaseUserUid = firebase.auth().currentUser!=null? firebase.auth().currentUser.uid:null;
        }
        console.log("process.env.REACT_APP_API_GET_ORDERS_URL ",process.env.REACT_APP_API_GET_ORDERS_URL)
        axios.get(process.env.REACT_APP_API_GET_ORDERS_URL,{
            headers:{
                "firebaseUserUid": firebaseUserUid,
            }

        }).then(async (response) => {

              console.log("response", response, "/n");
              console.log("response.data", response.data);


            for (const obj of response.data) {
                function randomDate(start, end) {
                    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
                }
                obj.orderNumber=(Math.random()*(10**6)).toFixed(0)
                obj.date=randomDate(new Date(2018, 0, 1), new Date()).toDateString()
            }

              setPreviousOrders(response.data);
              setLoading(false);
        })      
      }, []);

    return(
        <Container>        
            <Box mt={"1em"}>
                <Typography variant="h4" >
                    Ultimos pedidos
                </Typography>
            </Box>

            {/* <Skeleton variant="text" />
            <Skeleton variant="circle" width={40} height={40} />
            <Skeleton variant="rect" width={210} height={118} /> */}
            {/* <Typography variant="h1">
                {loading ? <Skeleton animation="wave"/> : 'h1'}
            </Typography>
            <Skeleton />
            <Skeleton animation={false} />
            <Skeleton animation="wave" /> */}
            {/* <Paper> */}

            <Box mt={"1em"}> 
                {loading?
                    (<Skeleton variant="rect" width={"100%"} height={118} />)
                    :
                    (
                    <Paper>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>                                        
                                        <TableCell padding='none'style={{maxWidth:"0.5em"}} align="center"/>
                                        <TableCell padding='none'align="center">Pedido numero</TableCell>
                                        <TableCell padding='none'align="center">Fecha</TableCell>
                                        <TableCell padding='none'align="center">Precio</TableCell>
                                        <TableCell padding='none'align="center">Factura</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    
                                    {previousOrders?(previousOrders.map((row)=>(
                                        
                                        <TableRow key={previousOrders.indexOf(row)}>
                                        
                                        {/* {
                                            console.log("key=previousOrders.indexOf(row)", previousOrders.indexOf(row))
                                        } */}
                                        
                                            <TableCell padding='none'style={{maxWidth:"0.5em"}} align="center">
                                                <IconButton
                                                    aria-label="expand row"
                                                    size="small"
                                                    onClick={() => setOpen(!open)}
                                                >
                                                    {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                                </IconButton>
                                            </TableCell>
                                            <TableCell padding='none'align="center">{row.orderNumber}</TableCell>
                                            <TableCell padding='none'align="center">{row.date}</TableCell>
                                            <TableCell padding='none'align="center">{row.pricePerDocument.toFixed(2)}</TableCell>
                                            <TableCell padding='none'align="center">
                                                <IconButton>
                                                <FileDownloadIcon></FileDownloadIcon>
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))):(
                                        <TableRow>
                                            Sin pedidos
                                        </TableRow>
                                    )
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                    )
                }
            </Box>
            

            
        </Container>
    )
}