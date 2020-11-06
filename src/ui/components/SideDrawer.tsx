import React                    from 'react';
import clsx                     from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer                   from '@material-ui/core/Drawer';
import AppBar                   from '@material-ui/core/AppBar';
import Toolbar                  from '@material-ui/core/Toolbar';
import List                     from '@material-ui/core/List';
import CssBaseline              from '@material-ui/core/CssBaseline';
import Divider                  from '@material-ui/core/Divider';
import IconButton               from '@material-ui/core/IconButton';
import MenuIcon                 from '@material-ui/icons/Menu';
import ChevronLeftIcon          from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon         from '@material-ui/icons/ChevronRight';
import ListItem                 from '@material-ui/core/ListItem';
import ListItemIcon             from '@material-ui/core/ListItemIcon';
import ListItemText             from '@material-ui/core/ListItemText';
import ArrowBackIcon            from '@material-ui/icons/ArrowBack';
import { NavLink, Link }        from 'react-router-dom'
import Logo                     from '../assets/images/logo.png'
import Navbar                   from '../components/Navbar'
import RebuildIcon              from '../assets/images/rebuild.png'
import DockerIcon               from '../assets/images/docker.png'
import SettingIcon              from '../assets/images/setting.png'
import HomeIcon                 from '../assets/images/homeIcon.png';
import Tooltip                  from '@material-ui/core/Tooltip';
import dockerIcon               from '../assets/images/docker.png'
import { useLocation }          from 'react-router-dom'

const drawerWidth = 280;

const useStyles = makeStyles((theme) => ({
    root: {
        display:                'flex',
    },

    header: {
        background:             '#0c3451',
        width:                  '100%',
        float:                  'left',
    },
    logoSection: {
        float:                  'left'
    },
    logo: {
        height:                 '60px',
        padding:                '0 20px'
    },
    anchBtn: {
        color:                  '#fff',
        padding:                '20px 10px 20px 20px',
        float:                  'left'
    },    
    icons: {
        width:                  '25px',
        float:                  'left',
        maxWidth:               '100%',
    },
    active: {
        background:             '#144e78 !important',
        width:                  '100%'
    },
    navLink: {
        float:                  'left',
        width:                  '100%',
        paddingLeft:            '10px'
    },
    appBar: {
        color:                  '#fff',   
        background:             '#0c3451',
        zIndex:                 theme.zIndex.drawer + 1,
        transition:             theme.transitions.create(['width', 'margin'], {
            easing:             theme.transitions.easing.sharp,
            duration:           theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        background:             '#0c3451',
        marginLeft:             drawerWidth,
        width:                  `calc(100% - ${drawerWidth}px)`,
        transition:             theme.transitions.create(['width', 'margin'], {
            easing:             theme.transitions.easing.sharp,
            duration:           theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight:            20,
    },
    hide: {
        display:                'none',
    },
    drawer: {
        background:             '#0c3451',
        width:                  drawerWidth,
        flexShrink:             0,
        whiteSpace:             'nowrap',
    },
    drawerOpen: {
        color:                  '#fff',
        background:             '#0c3451',
        width:                  drawerWidth,
        transition:             theme.transitions.create('width', {
            easing:             theme.transitions.easing.sharp,
            duration:           theme.transitions.duration.enteringScreen,            
        }),
        '& button':{
            color:          '#fff'
        }
    },
    drawerClose: {
        background:             '#0c3451',
        transition:             theme.transitions.create('width', {
            easing:             theme.transitions.easing.sharp,
            duration:           theme.transitions.duration.leavingScreen,
        }),
        overflowX:              'hidden',
        width:                  theme.spacing(7) + 1,

        [theme.breakpoints.up('sm')]: {
            width:              theme.spacing(7) + 1,
        },
    },
    toolbar: {
        color:                  '#fff',
        display:                'flex',
        alignItems:             'center',
        justifyContent:         'flex-end',
        padding:                theme.spacing(0, 1),
        ...theme.mixins.toolbar,
    },
    navList:{
        '& a':{
            paddingTop:          '10px',
            paddingBottom:       '10px',
            borderBottom:        '1px solid #ccc',
            position:            'relative',
            '&:hover':{
                background:      '#144e78',        

                '& div':{
                    display:          'block'
                }
            }
        }
    },
    navText:{
        '& span':{
            fontSize:             '15px',
            color:                '#fff'
        }        
    },
    tooltipBox:{
        display:                 'none',
        position:                'fixed',
        background:              '#5ea1e7',
        color:                   '#fff',
        margin:                  '10px',
        padding:                 '20px',
        borderRadius:            '5px',
        left:                    '45px',
        '&::before':{
            content:             '" "',
            height:              '10px',
            width:               '10px',
            position:            'absolute',
            background:          '#5ea1e7',
            left:                '-5px',
            transform:           'rotate(45deg)',
        }
    }
}));
type headerOptions = {
    showBack: boolean
}
function SideDrawer({ showBack }: headerOptions) {
    const location = useLocation();
    //console.log(location.pathname);

    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    // const [openTooltip, setopenTooltip] = React.useState(false);    

    // const handleClose = () => {
    //     setopenTooltip(false);
    // };

    // const handleOpen = () => {
    //     setopenTooltip(true);
    // };

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const navData = [
    {
        navName:    'Home',
        navIcon:    HomeIcon,
        anchLink:   '/home',    
    },
    {
        navName:    'Cloud Rebuild Files',
        navIcon:    RebuildIcon,
        anchLink:   '/rebuildFiles'    
    },
    {
        navName:    'Rebuild Files With Docker',
        navIcon:    DockerIcon,
        anchLink:   '/dockerrebuildFiles'
    },
    {
        navName:    'Configuration',
        navIcon:    SettingIcon,
        anchLink:   '/configure'
    }
]

    return (
        <div>
            <CssBaseline />
            <AppBar
                position=                       "fixed"
                className=                      {clsx(classes.appBar, {
                    [classes.appBarShift]:      open,
                })}
            >
                <Toolbar>
                    <IconButton
                        color=                  "inherit"
                        aria-label=             "open drawer"
                        onClick=                {handleDrawerOpen}
                        edge=                   "start"
                        className=              {clsx(classes.menuButton, {
                            [classes.hide]:     open,
                        })}
                    >
                    <MenuIcon />
                    </IconButton>
                    <div className={classes.header} >
                        {
                            showBack && <Link to="/home"><ArrowBackIcon className={classes.anchBtn} /></Link>}
                        <div className={classes.logoSection}>
                            <img src={Logo} className={classes.logo}></img>
                        </div>
                        <Navbar />
                    </div>
                </Toolbar>
            </AppBar>
            <Drawer
                variant=                            "permanent"
                className=                          {clsx(classes.drawer, {
                    [classes.drawerOpen]:           open,
                    [classes.drawerClose]:          !open,
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]:       open,
                        [classes.drawerClose]:      !open,
                    }),
                }}
            >
                <div className={classes.toolbar}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </div>
                <Divider />
                
                <List className={classes.navList}>
                {navData.map((nav, index) => (
                        // <ListItem key={index} button component={NavLink} to={nav.anchLink} activeClassName={classes.active} selected ={index ==1}>
                        <ListItem key={index} button component={NavLink} to={nav.anchLink} activeClassName={classes.active} selected = {location.pathname == nav.anchLink} >                               
                            <ListItemIcon><img src={nav.navIcon}  className={classes.icons}></img></ListItemIcon>
                            <div className={classes.tooltipBox}>{nav.navName}</div>
                                <ListItemText primary={nav.navName} className={classes.navText}/>
                        </ListItem>
                    ))}
                </List>           
            </Drawer>
        </div>
    );
}

export default SideDrawer;