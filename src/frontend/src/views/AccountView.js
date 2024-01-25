import React from "react";
import Container from "@material-ui/core/Container";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from '@material-ui/core/styles';  
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        marginTop: '1em',
        margin: theme.spacing(1),
    },
    userNameClass:{
        marginLeft: '10px',
    },
    large: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
}));

/**
 * Renders the account view component.
 * 
 * @param {Object} props - The component props.
 * @param {Object} props.statefulUserObject - The user object containing user information.
 * @returns {JSX.Element} The rendered account view component.
 */
export default function AccountView(props){
    const classes = useStyles();

    const statefulUserObject = props.statefulUserObject;

    return(
        <div>
            {statefulUserObject ?
                (
                    <div className={classes.root}>                    
                        {statefulUserObject.uid ? (
                            <div>
                                <Container>
                                    <Grid container direction="row" justifycontent="flex-start" alignItems="center">
                                        <Grid item>
                                            <Avatar alt="User profile pic" src={statefulUserObject.photoURL} className={classes.large}>
                                                {statefulUserObject.displayName ? statefulUserObject.displayName[0] : "User anonymous"}
                                            </Avatar>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="h3" className={classes.userNameClass}>{statefulUserObject.displayName}</Typography>
                                        </Grid>
                                    </Grid>
                                </Container>
                                <Container style={{marginTop:"1em"}}>
                                    <Grid container direction="row" justifycontent="flex-start" alignItems="center" spacing={1}>
                                        <Grid item><Typography variant="h6">Email:</Typography></Grid>
                                        <Grid item><Typography variant="h6">{statefulUserObject.email}</Typography></Grid>
                                    </Grid>
                                </Container>
                            </div>
                        )
                        : null}                    
                    </div>
                )
                : <h1>Non-authorized</h1>
            }
        </div>
    )
}
