import {makeStyles} from '@material-ui/core/styles';

let customClasses = null;

export default function ReactStyleFunction(){
    const useStyles = makeStyles((theme) => ({


        /* SMscreens: Style applies to boolean option container/div */

        smallScreenCustomDivBooleanOption: {              
            [theme.breakpoints.up('xs')]: {
                justifySelf: 'end',                                
                right: '0',
                margin: '0',
                padding: '0',                
            },   
        },


        /* BIGscreens: Styles below apply to optional options content */

        bigScreenCustomListItemIcon: {              
            [theme.breakpoints.up('xs')]: {
                minWidth: '20px',
                minHeight: '20px',                
                left: '0',
                right: '0',
                margin: '0',
                marginRight: '0.5em',                
            },   
        },

        bigScreenCustomToggleButtonGroup: {   
            /* [theme.breakpoints.between('xs','sm')]: {         
                width: '20vw',
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
                alignContent: 'center',
                left: '0',
                right: '0',
                padding: '0',
                margin: '0',
                minWidth:'50vw',
                marginTop: '0.4em'            
            } */
        },
        bigScreenCustomToggleButtonChildTypeNumber: {
            /* [theme.breakpoints.between('xs','sm')]: {
                width: '100%',
                minWidth: '100%',
                left: '0',
                right: '0',
                padding: '0',
                margin: '0',
                minWidth:'40px'
            } */          
        },
        bigScreenCustomToggleButtonChildTypeText: {
            /* [theme.breakpoints.between('xs','sm')]: {
                width: '100%',
                minWidth: '100%',
                left: '0',
                right: '0',
                padding: '0',
                margin: '0',
                minWidth:'80px',
            } */
        },


        /* XSscreens: Style below apply to boolean apply to all option*/

        customTextBooleanApplyToAllFiles: {
            [theme.breakpoints.up('xs')]: {
                left: '0',
                right: '0',
                margin: '0',
                padding: '0.1em',
                paddingRight: '60px',
                /* maxWidth:'70vw' */
            },
            [theme.breakpoints.down('xs')]: {
                left: '0',
                right: '0',
                margin: '0',
                padding: '0.1em',
                paddingRight: '60px',
                /* maxWidth:'70vw' */
            }
        },        

        /* XSscreens: Styles below apply to standard options content*/


        customListRequiredOptionsXsScreens: {
            [theme.breakpoints.down('xs')]: {
                minWidth: '0',
                minHeight: '0',
                left: '0',
                right: '0',
                margin: '0',
                padding: '0.1em', 
                
            }
        },

        customListItemRequiredOptionsStyle: {
            [theme.breakpoints.down('xs')]: {
                display: 'flex',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                alignContent: 'center',
                minWidth: '0px',
                minHeight: '0px',                
                left: '0',
                right: '0',
                margin: '0',
                padding: '0.1em',     
                marginTop: '0.8em',
                /* paddingBottom: '', */           
            }
        },

        customListIconRequiredOptionsStyle: {
            [theme.breakpoints.up('sm')]: {
                minWidth: '20px',
                minHeight: '20px',                
                left: '0',
                right: '0',
                margin: '0',
                marginRight: '0.5em',                
            },
            [theme.breakpoints.down('sm')]: {
                minWidth: '20px',
                minHeight: '20px',                
                left: '0',
                right: '0',
                margin: '0',
                padding: '0.1em',    
                marginRight: '0.2em',            
            }
        },
        
        customListTextRequiredOptionsStyle: {
            [theme.breakpoints.down('xs')]: {
                minWidth: '20px',
                minHeight: '20px',                
                left: '0',
                right: '0',
                margin: '0',
                padding: '0.1em',                
            }
        },

        

        customListItemIconRequiredOptionsStyle: {
            [theme.breakpoints.down('xs')]: {    
                justifySelf: 'start',            
                left: '0',
                right: '0',
                margin: '0',
                padding: '0.1em',                
                paddingRight: '0.3em',
            },
            [theme.breakpoints.down('sm')]: {    
                justifySelf: 'start',            
                left: '0',
                right: '0',
                margin: '0',
                padding: '0.1em',                
                paddingRight: '0.3em',
            }
        },

        customListItemTextRequiredOptionsStyle: {
            [theme.breakpoints.down('xs')]: {
                justifySelf : 'center',                
                left: '0',
                margin: '0',
                padding: '0.1em',                
                /* paddingLeft: '1em' */
            }
        },

        customListItemSecondaryActionRequiredOptionsStyle: {
            [theme.breakpoints.down('xs')]: {
                justifySelf: 'end',                                
                right: '0',
                margin: '0',
                padding: '0',
            }
        },





        /* XSscreens: Styles below apply to optional options content*/
        customContainerXsScreens: {
            [theme.breakpoints.down('xs')]: {                
                minWidth: '0',
                minHeight: '0',
                left: '0',
                right: '0',
                margin: '0',
                padding: '0.1em',
            }
        },
        customListXsScreens: {
            [theme.breakpoints.down('xs')]: {
                minWidth: '0',
                minHeight: '0',
                left: '0',
                right: '0',
                margin: '0',
                padding: '0.1em', 
            }
        },
        customListItemParentXsScreens: {
            [theme.breakpoints.down('xs')]: {
                left: '0',
                right: '0',
                margin: '0',
                padding: '0.1em',
            }

        },
        customListItemIconXsScreens: {
            [theme.breakpoints.down('xs')]: {
                left: '0',
                right: '0',
                margin: '0',
                padding: '0.1em',
            }
        },
        customListItemTextXsScreens: {
            [theme.breakpoints.down('xs')]: {
                left: '0',
                right: '0',
                margin: '0',
                padding: '0.1em',
            }
        },
        customListItemSecondaryActionXsScreens: {
            [theme.breakpoints.down('xs')]: {
                left: '0',
                right: '0',
                margin: '0',
                padding: '0.1em',
            }
        },
        customDivIconAndTitle: {
            [theme.breakpoints.down('xs')]: {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                alignContent: 'center',
                left: '0',
                right: '0',
                margin: '0',
                padding: '0',
                marginTop:'1em'
            }
        },
        customIcon: {
            [theme.breakpoints.down('xs')]: {
                alignSelf: 'center',
                left: '0',
                right: '0',
                margin: '0',                
                paddingRight: '0.5em',
                minHeight: '30px'
            }
        },
        customTitle: {
            [theme.breakpoints.down('xs')]: {
                alignSelf: 'center',
                left: '0',
                right: '0',                
            }
        },
        customDivSecondaryAction: {
            [theme.breakpoints.down('xs')]: {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                alignContent: 'center',
                left: '0',
                right: '0',
                marginBottom: '0.7em',
                padding: '0',
            }
        },
        customToggleButtonGroup: {
            [theme.breakpoints.down('xs')]: {
                width: '90vw',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                alignContent: 'center',
                left: '0',
                right: '0',
                padding: '0',
                margin: '0',
                minWidth:'80vw',
                paddingTop: '0.4em'
            }
        },
        customToggleButtonChildTypeNumber: {
            [theme.breakpoints.down('xs')]: {
                width: '100%',
                left: '0',
                right: '0',
                padding: '0',
                margin: '0',
                minWidth:'40px',
                fontSize:'1rem'
            }
        },
        customToggleButtonChildTypeText: {
            [theme.breakpoints.down('xs')]: {
                width: '100%',
                left: '0',
                right: '0',
                padding: '0',
                margin: '0',
                minWidth:'100px',
                fontSize:'1rem'
            }
        },
        customNullDivToOverrideDefaultReact2: {
            [theme.breakpoints.down('xs')]: {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                alignContent: 'center',
                left: '0',
                right: '0',
                padding: '0',
                margin: '0',                
            }
        },
        }));
    customClasses = useStyles();
    return customClasses
}

