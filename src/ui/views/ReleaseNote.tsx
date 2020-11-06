import * as React               from 'react';
import { Grid }                 from '@material-ui/core';
import { makeStyles }           from '@material-ui/core/styles';
import * as Utils               from '../utils/utils';


const useStyles = makeStyles((theme) => ({
    root:       {
        flexGrow:       1, 
    },
    webAnchor:{
        color:              '#3c6c90',        
        fontFamily:         'Nunito Sans',
        width:              '100%',
        textAlign:          'center',
        margin:             '20px',
        fontSize:           '18px'
    },
    releaseNoteContainer:{
        maxWidth:           '100%',
        borderBottom:      '1px solid #ccc',
        paddingBottom:      '10px',
        marginBottom:       '15px',
    },
    releaseHeading:{        
        borderBottom:       '1px solid #a3a3a3',
        paddingBottom:      '5px',
        margin:             '20px 0 15px 0',
        width:              '100%'
    },
    releaseGrid:{
        float:              'left',
        width:              '100%'
    },
    releaseList:{

    },
    releaseVersion:{
        background:         '#0d334f',
        color:              '#fff',
        fontFamily:         'Nunito Sans',
        width:              '50px',
        float:              'left',
        textAlign:          'center',
        borderRadius:       '2px',
        fontSize:           '12px',
        padding:            '4px 0',
        marginRight:        '10px'
    },
    releaseDate:{
        fontFamily:         'Nunito Sans',
        float:              'left',
        width:              'calc(100% - 60px)',
        margin:             '0 0 10px 0'
    },
    releaseContent:{
        fontFamily:         'Nunito Sans',
        float:              'left',
        paddingLeft:        '55px',
        width:              '100%',
        boxSizing:          'border-box'
    },
    releaseStatusFixed:{
        background:         '#4194f2',
        color:              '#fff',
        fontFamily:         'Nunito Sans',
        fontSize:           '11px',
        padding:            '2px 5px',
        borderRadius:       '2px',
        float:              'left'
    },
    releaseText:{
        color:              '#717171',
        fontSize:           '14px',
        width:              'calc(100% - 45px)',
        float:              'left',
        margin:             '0 0 0 5px',
        lineHeight:         '18px'
    },
    webHeading:{
        color:              '#3c6c90',        
        fontFamily:         'Nunito Sans',
        textDecoration:     'none'
    }
 }));


function ReleaseNote(){
    const classes = useStyles(); 
    return(  
        <Grid container>   
            <a className={classes.webAnchor} href={Utils.WEBSITE_URL} title="k8-proxy-desktop">Glasswall Desktop</a>
            <h3 className={classes.releaseHeading}> <a className={classes.webHeading} href={Utils.RELEASE_URL}> Realease Note</a></h3>
            {
                Utils.RELEAE_NOTES.map((issue, index)=>{
                    return  <Grid key ={index} className={classes.releaseNoteContainer}>                    
                    <div className={classes.releaseGrid}>
                        <div className={classes.releaseList}>                            
                            <div className={classes.releaseVersion}>{Utils.VERSION}</div>
                            <h4 className={classes.releaseDate}>{issue.date} </h4>
                        </div>
                        <div className={classes.releaseContent}>
                            <span className={classes.releaseStatusFixed}>Fixed</span>
                            <p className={classes.releaseText}>{issue.desc}</p>
                        </div>
                    </div>
                </Grid>
                })
            }
        </Grid>
        
    )
    
}

export default ReleaseNote;