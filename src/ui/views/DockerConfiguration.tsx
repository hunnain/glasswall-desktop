import React, { useState }      from 'react';
import { makeStyles }           from '@material-ui/core/styles';
import SideDrawer               from '../components/SideDrawer';
import Table                    from '@material-ui/core/Table';
import TableBody                from '@material-ui/core/TableBody';
import TableCell                from '@material-ui/core/TableCell';
import TableContainer           from '@material-ui/core/TableContainer';
import TableHead                from '@material-ui/core/TableHead';
import TableRow                 from '@material-ui/core/TableRow';
import Paper                    from '@material-ui/core/Paper';
import CheckCircleIcon          from '@material-ui/icons/CheckCircle';
import CancelIcon               from '@material-ui/icons/Cancel';
import * as Utils               from '../utils/utils'
import * as DockerUtils         from '../components/DockerUtils'
import Loader                   from '../components/Loader';
import Logs                     from '../components/Logs';
const shell                     = require('electron').shell

const useStyles = makeStyles((theme) => ({
    root: {
        display:                    'flex',
    },
    toolbar: {
        display:                    'flex',
        alignItems:                 'center',
        justifyContent:             'flex-end',
        padding:                    theme.spacing(0, 1),
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow:                   1,
    },
    contentArea: {
        minHeight:                  '85.7vh',
        padding:                    theme.spacing(3),
        '& p': {
            fontSize:               '12px',
            fontWeight:             'bold'
        }
    },
    textContainer: {
        margin:                     '20px 0',
        float:                      'left',
        width:                      '100%',
        '& h4': {
            margin:                 '10px 0 0 0'
        },
        '& p': {
            float:                  'left',
            width:                  '100%'
        }
    },
    apiKeyBox: {
        margin:                     '10px 0',
        background:                 '#e7e7e7',
        padding:                    '5px 10px',
        float:                      'left',
        '& input': {
            border:                 'none',
            background:             'transparent',
            float:                  'left',
            minHeight:              '30px',
            minWidth:               '300px',
            '&:focus': {
                border:             '0',
                outline:            '0'
            }
        },
        '& button': {
            border:                 'none',
            background:             'transparent',
            '&:focus': {
                border:             '0',
                outline:            '0'
            }
        }
    },
    table: {
        minWidth:                   '100%',
        '& th':{
            fontWeight:             'bold',
            background:             '#003962',
            color:                  '#fff'
        },
        '& td':{
            paddingTop:             '10px',
            paddingBottom:          '10px'
        }
    },
    healthCheckBtn:{        
        background:                 '#3cb371',
        border:                     'none',
        color:                      '#fff',
        borderRadius:               '3px',
        padding:                    '10px 20px',
        float:                      'right',
        fontSize:                   '12px',
        marginBottom:               '20px'
    },
    installBtn:{
        background:                 '#fff',
        border:                     '2px solid #0c3451',
        color:                      '#0c3451',
        borderRadius:               '3px',
        padding:                    '5px',
        float:                      'left',
        marginRight:                '5px',
        marginLeft:                '5px'
    },
    check:{
        color:                      'green',
        width:                      '18px'
    },
    cancel:{
        color:                      'red',
        width:                      '18px'
    },
    logButton:{
        background:                 '#3cb371',
        border:                     'none',
        color:                      '#fff',
        borderRadius:               '3px',
        padding:                    '10px 20px',
        float:                      'right',
        fontSize:                   '12px',
        marginBottom:               '20px',
        marginLeft:                 '5px'                 
     }
}));

function createData(type:any, status:any, action:any) {
    return { type, status, action };
}

const rows = [
   
];

function DockerConfiguration() {
    const classes = useStyles();    
    const [healthCheckStatus, setHealthCheckStatus] = React.useState(-1);
    const [loader, setShowLoader]                   = useState(false);  
    const [logView, setLogView]                     = useState(false); 
    const [imagePulled, setImagePulled]             = useState(false);      

    var rows = [];

    React.useEffect(() => {
       
        console.log("DockerConfiguration health_chk" + sessionStorage.getItem(Utils.DOCKER_HEALTH_STATUS_KEY))
        var status = healthCheckStatus;
        if(sessionStorage.getItem(Utils.DOCKER_HEALTH_STATUS_KEY) == null){
            status = DockerUtils.health_chk();
            sessionStorage.setItem(Utils.DOCKER_HEALTH_STATUS_KEY, "" + status )
        } else{
            status = Number(sessionStorage.getItem(Utils.DOCKER_HEALTH_STATUS_KEY));
           
        }
        setHealthCheckStatus(status)
    }, []);


    const installDocker=()=>{
       
        shell.openExternal('https://docs.docker.com/engine/install/')

    }

    const startDocker=()=>{
        shell.openExternal('https://docs.docker.com/config/daemon/')

    }

    const pullDockerImage=()=>{
         setShowLoader(true)
         const timer = setTimeout(() => {
            var ouput = DockerUtils.pull_image();
            if(ouput.includes(Utils.GW_DOCKER_IMG_NAME)){
                setHealthCheckStatus(4)
                sessionStorage.setItem(Utils.DOCKER_HEALTH_STATUS_KEY, "" + 4 )
                
                setShowLoader(false)
            }else{
                alert("Failed to pull image")
                setHealthCheckStatus(3)
                sessionStorage.setItem(Utils.DOCKER_HEALTH_STATUS_KEY, "" + 3 )
                setImagePulled(false)
            }
          }, 10);

    }

    const renewLicense=()=>{
        alert("TBD")
    }
    
    const getConfigurationRows =()=>{
         rows = [
            createData('DOCKER INSTALLED', healthCheckStatus == 1, healthCheckStatus == 1 && <button onClick={() =>installDocker()} className={classes.installBtn}>Install</button>),
            createData('DOCKER  STARTED', healthCheckStatus >= 1  && healthCheckStatus <= 2,healthCheckStatus == 2 && <button onClick={() =>startDocker()} className={classes.installBtn}>Start docker</button>),
            createData('GW IMAGE PRESENT', healthCheckStatus >= 1  && healthCheckStatus <= 3,healthCheckStatus == 3 && <button onClick={() =>pullDockerImage()}  className={classes.installBtn}>Pull Image</button>),
            createData('LICENSE VALID', healthCheckStatus >= 1  && healthCheckStatus <= 4, healthCheckStatus == 4 && <button onClick={() =>renewLicense()} className={classes.installBtn}>Renew License</button>),            
        ];

      return (
        <TableBody>
            {rows.map((row) => (
                <TableRow key={row.type}>
                    <TableCell>                 {row.type}          </TableCell>
                     <TableCell align="left">   {row.status?<CancelIcon className={classes.cancel}/>:<CheckCircleIcon className={classes.check}/>}</TableCell>
                    <TableCell align="left">    {row.action}        </TableCell>
                </TableRow>
            ))}
        </TableBody>
      )
    }

    const executeHealthCheck=()=>{
        setShowLoader(true)
        const timer = setTimeout(() => {
            var status = DockerUtils.health_chk();
            sessionStorage.setItem(Utils.DOCKER_HEALTH_STATUS_KEY, "" + status )
            setImagePulled(false)
            setHealthCheckStatus(status)
            
            setShowLoader(false)
          }, 10);
    }

    const openLogView =()=>{
        setLogView(!logView);
    }

    console.log("health loader" + loader)
    return (
        <div className={classes.root}>
            {logView && <Logs content={ localStorage.getItem("healthLogs") || ""} isOpen={logView} handleOpen={openLogView}/>   }                
            <SideDrawer showBack={false} />
            <main className={classes.content}>
            {loader  && <Loader/> }   
                <div className={classes.toolbar} />
                <div className={classes.contentArea}>
                    <h3>Health Check Status</h3>                    
                    <p>Perform a health check of pre-requisites before using docker-rebuild </p>
                    <div className={classes.textContainer}>
                        <button onClick={() =>openLogView()}className={classes.logButton}>Logs</button>
                        <button onClick={() =>executeHealthCheck()} className={classes.healthCheckBtn}>Check Health</button>                        
                        <TableContainer>
                            <Table className={classes.table} size="small" aria-label="a dense table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Type</TableCell>
                                        <TableCell align="left">Status</TableCell>
                                        <TableCell align="left">Action</TableCell>
                                    </TableRow>
                                </TableHead>
                               {getConfigurationRows()}
                            </Table>
                        </TableContainer>
                    </div>
                </div>
            </main>
        </div>


    )
}

export default DockerConfiguration;