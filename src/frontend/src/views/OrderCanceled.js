import Container from "@material-ui/core/Container"
import Typography from "@material-ui/core/Typography"
import Grid from "@material-ui/core/Grid"
import Button from "@material-ui/core/Button"
//import Box from "@material-ui/core/Box"

import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

export default function OrderSuccess(){
    return(
        <div style={{backgroundColor:'red', color:'white', minWidth:'100vw', minHeight:'100vh'}}>            
            <Grid Container direction="row" justify="center" align="center" style={{minWidth:'100vw', minHeight:'100vh'}}>
                <Grid item>
                    <CheckCircleOutlineIcon style={{width:'100%', fontSize:'7em'}}></CheckCircleOutlineIcon>
                </Grid>
                <Grid item>
                    <Typography variant="h3" align='center'>Operacion cancelada</Typography>                    
                </Grid>                    
                <Grid item >
                    <Button variant="contained" color="lightgreen">Click</Button>
                </Grid>
            </Grid>
        </div>
    )
}