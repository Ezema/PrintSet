import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { Grid } from '@material-ui/core';

export default function Contact(){
    return(
        <Container style={{marginTop:'1em'}}>            
            <Typography variant="h4">Contacto</Typography>
            <div id="map-container-google-11">

                <iframe title='maps' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.9997818299425!2d2.2920969268153337!3d48.858214550718344!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e2964e34e2d%3A0x8ddca9ee380ef7e0!2sTorre%20Eiffel!5e0!3m2!1ses!2ses!4v1706193793519!5m2!1ses!2ses" style={{border:'0', marginTop:'1em'}}
                frameborder="0" allowfullscreen loading="lazy" width="100%" height="400px" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>
            </div>
            <Container style={{marginTop:"1em"}}>
                <Grid container direction="row" justifycontent="flex-start" alignItems="center" spacing={1}>
                    <Grid item><Typography variant="h6">Email:</Typography></Grid>
                    <Grid item><Link href="mailto:contact@mail.com"><Typography variant="h6">contact@mail.com</Typography></Link></Grid>
                </Grid>
                <Grid container direction="row" justifycontent="flex-start" alignItems="center" spacing={1}>
                    <Grid item><Typography variant="h6">Tel.:</Typography></Grid>
                    <Grid item><Link href="tel:+34645645645"><Typography variant="h6">645 64 56 45</Typography></Link></Grid>
                </Grid>
            </Container>
            
        </Container>
    )
}