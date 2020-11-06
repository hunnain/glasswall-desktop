import  React, {useState}       from 'react';
import { makeStyles }           from '@material-ui/core/styles';
import SideDrawer               from '../components/SideDrawer';
import VisibilityIcon           from '@material-ui/icons/Visibility';

const useStyles = makeStyles((theme) => ({
    root:       {   
        display:                    'flex', 
    },    
    toolbar: {
        display:                   'flex',
        alignItems:                'center',
        justifyContent:            'flex-end',
        padding:                   theme.spacing(0, 1),
        ...theme.mixins.toolbar,
    },
    content: {
       flexGrow:       1,
   },
   contentArea:{
        minHeight:                 '85.7vh',
        padding:                   theme.spacing(3),
        '& p':{
            fontSize:              '12px',
            fontWeight:            'bold'
        }
   },
   textContainer:{
        margin:                    '20px 0',
        float:                     'left',
        '& h4':{
            margin:                '10px 0 0 0'
        },
        '& p':{
            float:                 'left',
            width:                 '100%'
        }
   },
   apiKeyBox:{
        margin:                    '10px 0',
        background:                '#e7e7e7',
        padding:                   '5px 10px', 
        float:                     'left',
        '& input':{
            border:                'none',
            background:            'transparent',
            float:                 'left',
            minHeight:             '30px',
            minWidth:              '300px',
            '&:focus':{
                border:            '0',
                outline:           '0'
            }
        },
        '& button':{
            border:                'none',
            background:            'transparent',
            '&:focus':{
                border:            '0',
                outline:           '0'
            }
        }
   }
 }));



function settings(){
    const classes = useStyles(); 
    const [showApiCode, setApiCode] = useState('password');

   const showCode = ()=> {
    setApiCode('text')
   }

    return(
        <div className={classes.root}> 
            <SideDrawer showBack={false}/>
            <main className={classes.content}>
                <div className={classes.toolbar} />  
                <div className={classes.contentArea}>             
                    <h3>Account Info</h3>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry </p>
                    <div className={classes.textContainer}>
                        <h4>API Key</h4>
                        <div className={classes.apiKeyBox}>
                            <input type={showApiCode} value="Lorem Ipsum is simply dummy text"/>
                            <button onClick={showCode}><VisibilityIcon/></button>
                        </div>                                       
                    </div>
                </div>   
            </main>   
        </div>
       
        
    )
}

export default settings;