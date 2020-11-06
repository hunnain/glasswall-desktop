import * as React               from 'react';
import {Paper , MenuItem }      from '@material-ui/core';
import { makeStyles }           from '@material-ui/core/styles';
import { NavLink}               from 'react-router-dom'
import gitIcon                  from '../assets/images/git.png'
import desktopApp               from '../assets/images/desktop.png'
import FileDropIcon             from '../assets/images/fileDrop.png'
import Slack                    from '../assets/images/slack.png'
import GWLogo                   from '../assets/images/GWLogo.png'
import jupyter                  from '../assets/images/jupyter.png'
import RebuildIcon              from '../assets/images/rebuild.png'

/** Main view of the application to display all the targeted use cases */
const useStyles = makeStyles((theme) => ({
    root:       {
        flexGrow:       1, 
    },
    container:  {
        display:        'grid',
        gridGap:        theme.spacing(2),
    },
    menuItem:   {
      borderBottom:     '1px solid #ccc',  
      padding:          '0'    
    },
    menuName:      {
      float:            'left',
      width:            '100%'  
    },    
    heading:        {
        marginBottom:   '3px',
        float:          'left',
        width:          '100%',
        lineHeight:     '34px',
        color:          '#333',
        fontSize:       '15px'
    },
    paraContnet:    {
        margin:         '0 0 15px 0',
        fontSize:       '14px',
        lineHeight:     '24px',
        width:          '100%',
        float:          'left',
        whiteSpace:     'break-spaces'
    }, 
    icons:{
        width:          '25px',
        float:          'left',
        marginRight:    '13px',
        maxWidth:       '100%',
    },
    leftImg:{
        float:          'left',
        margin:         '20px 0 20px 5px'                    
    },
    rightGrid:{
        float:          'left',
        marginLeft:     '5px',
        width:          'calc(100% - 50px)'
    },
    active:{
        background:      '#ddd',
        width:           '100%'
    },
    navLink:{
        float:          'left',
        width:          '100%',
        paddingLeft:    '10px'
    }
  }));
  



function MainLayout (){
    const classes = useStyles(); 
    return(
        <Paper>
            <MenuItem className={classes.menuItem}>
                <NavLink to="/home" activeClassName={classes.active} className={classes.navLink}>
                    <div className={classes.menuName}>
                        <div className={classes.leftImg}>
                            <img src={gitIcon} className={classes.icons}></img> 
                        </div>
                        <div className={classes.rightGrid}>
                            <h3 className={classes.heading}> Git Browser</h3>
                        </div>
                    </div>
                </NavLink>
            </MenuItem>
            <MenuItem className={classes.menuItem}>
                <NavLink to="/fileDrop"  activeClassName={classes.active} className={classes.navLink}>
                    <div className={classes.menuName}>
                        <div className={classes.leftImg}>
                            <img src={FileDropIcon} className={classes.icons}></img>
                        </div>
                        <div className={classes.rightGrid}>
                            <h3 className={classes.heading}>  File-drop</h3>
                        </div>
                    </div>
                </NavLink>
            </MenuItem>
            <MenuItem className={classes.menuItem}>
                <NavLink to="/dashboardK8" activeClassName={classes.active} className={classes.navLink}>
                <div className={classes.menuName}> 
                    <div className={classes.leftImg}>                                
                    <img src={desktopApp} className={classes.icons}></img>
                    </div>
                    <div className={classes.rightGrid}>
                        <h3 className={classes.heading}>Dashboard Kubernetes pods</h3>
                    </div>
                </div>
                </NavLink>
            </MenuItem>
            <MenuItem className={classes.menuItem}>
                <NavLink to="/slackBot" activeClassName={classes.active} className={classes.navLink}>
                <div className={classes.menuName}>
                    <div className={classes.leftImg}>     
                        <img src={Slack} className={classes.icons}></img>
                    </div>
                    <div className={classes.rightGrid}>
                        <h3 className={classes.heading}>Slack UI for bots</h3>
                    </div>
                </div>
                </NavLink>
            </MenuItem>
            <MenuItem className={classes.menuItem}>
                <NavLink to="/fw" activeClassName={classes.active} className={classes.navLink}>
                <div className={classes.menuName}>
                    <div className={classes.leftImg}>     
                        <img src={GWLogo} className={classes.icons}></img>
                    </div>
                    <div className={classes.rightGrid}>
                        <h3 className={classes.heading}>Forensic Workbench</h3>
                    </div>
                </div>
                </NavLink>
            </MenuItem>
            <MenuItem className={classes.menuItem}>
                <NavLink to="/jupyterNotebook" activeClassName={classes.active} className={classes.navLink}>
                <div className={classes.menuName}>
                    <div className={classes.leftImg}>     
                        <img src={jupyter} className={classes.icons}></img>
                    </div>
                    <div className={classes.rightGrid}>
                        <h3 className={classes.heading}>Jupyter Notebooks</h3>
                    </div>
                </div>
                </NavLink>
            </MenuItem>
            <MenuItem className={classes.menuItem}>
                <NavLink to="/rebuildFiles" activeClassName={classes.active} className={classes.navLink}>
                <div className={classes.menuName}>
                    <div className={classes.leftImg}>     
                        <img src={RebuildIcon} className={classes.icons}></img>
                    </div>
                    <div className={classes.rightGrid}>
                        <h3 className={classes.heading}>Local Rebuild Files</h3>
                    </div>
                </div>
                </NavLink>
            </MenuItem>
            <MenuItem className={classes.menuItem}>
                <NavLink to="/dockerrebuildFiles" activeClassName={classes.active} className={classes.navLink}>
                <div className={classes.menuName}>
                    <div className={classes.leftImg}>
                        <img src={RebuildIcon} className={classes.icons}></img>
                    </div>
                    <div className={classes.rightGrid}>
                        <h3 className={classes.heading}>Rebuild Files With Docker</h3>
                    </div>
                </div>
                </NavLink>
            </MenuItem>
        </Paper >
    )
}

export default MainLayout;
