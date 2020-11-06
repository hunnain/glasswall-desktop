var child_process               = require("child_process");
const path                      = require('path');
var fs                          = require('fs');

export const GW_DOCKER_IMG_NAME         = 'glasswallsolutions/evaluationsdk:1';
export const GW_DOCKER_IMG_TAG          = '9c7002869f36';
export const WEBSITE_URL                = 'https://glasswall-desktop.com';
export const RELEASE_URL                = 'https://github.com/k8-proxy/glasswall-desktop/releases';
export const LICENSE_URL                = 'https://github.com/k8-proxy/glasswall-desktop/blob/master/LICENSE';
export const FW_URL                     = 'https://forensic-workbench.com/';
export const FILE_DROP_URL              = 'https://file-drop.co.uk/';
export const REBUILD_ENGINE_URL         = 'https://8oiyjy8w63.execute-api.us-west-2.amazonaws.com/Prod/api/rebuild/base64';
export const REBUILD_ANALYSIS_URL       = 'https://o7ymnow6vf.execute-api.us-west-2.amazonaws.com/Prod/api/Analyse/base64';
export const REPO_GIT_ISSUE_URL         = "https://github.com/k8-proxy/glasswall-desktop/issues/new";

export const REBUILD_API_KEY            = 'dp2Ug1jtEh4xxFHpJBfWn9V7fKB3yVcv60lhwOAG';
export const VERSION                    = '0.1.4'
export const _PROCESSED_FOLDER          = "processed"
export const _CLEAN_FOLDER              = "clean"
export const _ORIGINAL_FOLDER           = "original"
export const _REPORT_FOLDER             = "report"

export const OUTPUT_DIR_FLAT            = "flat";
export const OUTPUT_DIR_HIERARCY        = "hierarcy";

export const WELCOME_PAGE_VISTIED_KEY   = "visited"
export const WELCOME_PAGE_VISTIED_VAL   = "yes"

export const DOCKER_OUPUT_DIR_KEY       = "DOCKER_OUPUT_DIR"
export const CLOUD_OUPUT_DIR_KEY        = "CLOUD_OUPUT_DIR"
export const DOCKER_HEALTH_STATUS_KEY   = "docker_health_status"


export const DOCKER_RUNNING             =  9; // Docker running;
export const DOCKER_NOT_INSTALLED       =  1; // Docker not installed;
export const DOCKER_NOT_STARTED         =  2; // Docker not started;
export const DOCKER_GW_IMAGE_NOT_PRESENT=  3; // Image not present;
export const LICENSE_NOT_VALID          =  4; // License not valid
export const REBUILD_FAILED             =  5; // File failed rebuild
export const MISSING_OUTPUT_PROPERTY    =  6; //Does not have output property


export const RELEAE_NOTES           =[
                                        {
                                          "date":"October 29th 2020",
                                          "desc":"Processing rebuild locally through Docker after pulling the docker image"
                                        }, 
                                        {
                                          "date":"October 28th 2020",
                                          "desc":"Creating analysis report for rebuilt files locally through Docker."
                                        },
                                        {
                                          "date":"October 27th  2020",
                                          "desc":"Added option for User to rebuild app either locally or through cloud."
                                        }, 
                                        {
                                          "date":"October 26th  2020 ",
                                          "desc":"Fixed MAC Builder: Browse button on Desktop app Browse Output Folder is not working "
                                        },
                                         {
                                          "date":"October 25th  2020 ",
                                          "desc":"Fixed Readonly path issue on MAC"
                                        },
                                        {
                                          "date":"October 25th  2020 ",
                                          "desc":"Other minor issues "
                                        }
                                      ]


export let DOCKER_LOGS = {}; 

export const initLogger = () => {
  DOCKER_LOGS = {}
  localStorage.removeItem("logs")
  localStorage.setItem("logs","")
}


export const addLogLine = (filename:string, sentence:string) => {     
  const logs  = localStorage.getItem("logs");
  if(logs != null){
    var logsCopy = logs;
    logsCopy +=  "\n"+getLogTime()+" - INFO - File-Name - "+filename+" --> "+sentence+"\n" 
    localStorage.setItem("logs",logsCopy)
  }
  else{
    localStorage.setItem("logs","")
    var logsCopy = "\n"+getLogTime()+" - INFO - File-Name - "+filename+" --> "+sentence+"\n" 
    console.log('adding log '+logsCopy)
    localStorage.setItem("logs",logsCopy)
  }
}

export const getLogs = () => {
  return localStorage.getItem("logs");
}

export const getLogTime = () => {
  var date = new Date();
  var str = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " +  date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
  return str;
}

export const sleepDelay = (milliseconds:number) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }

  export const sleep = (delay:number) => {
    var start = new Date().getTime();
    while (new Date().getTime() < start + delay);
}

  const _p8=(s:boolean) =>{

    var p = (Math.random().toString(16)+"000000000").substr(2,8);
    return s ? "-" + p.substr(0,4) + "-" + p.substr(4,4) : p ;
}
 export const guid=()=> {
    return _p8(false);
    
}

export const stipFileExt =(filename: string)=>{
  return filename.split('.').slice(0, -1).join('.')
}

export const getFileHash=(content: string)=> {
  var crypto = require('crypto');
  // change to 'md5' if you want an MD5 hash
  var hash = crypto.createHash('sha1');

  // change to 'binary' if you want a binary hash.
  hash.setEncoding('hex');

  // the text that you want to hash
  hash.write(content);

  // very important! You cannot read from the stream until you have called end()
  hash.end();

  // and now you get the resulting hash
  var sha1sum = hash.read();
  return sha1sum;
}

export const CONFIG_INI   = 
"[GWConfig]\n\
processMode=0\n\
reportMode=0\n\
fileStorageMode=2\n\
fileType=*\n\
inputLocation=/input\n\
useSubfolders=1\n\
outputLocation=/output\n\
createOutputFolders=1\n\
nonConformingDirName= NonConforming\n\
managedDirName= Managed\n\
quarantineNonconforming= 1\n\
writeOutput= 1\n";

export const CONFIG_XML   = 
"<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n\
<config>\n\
<pdfConfig>\n\
<metadata>sanitise</metadata>\n\
<javascript>sanitise</javascript>\n\
<acroform>sanitise</acroform>\n\
<actions_all>sanitise</actions_all>\n\
<embedded_files>sanitise</embedded_files>\n\
<external_hyperlinks>sanitise</external_hyperlinks>\n\
<internal_hyperlinks>sanitise</internal_hyperlinks>\n\
<embedded_images>sanitise</embedded_images>\n\
</pdfConfig>\n\
<wordConfig>\n\
<metadata>sanitise</metadata>\n\
<macros>sanitise</macros>\n\
<embedded_files>sanitise</embedded_files>\n\
<review_comments>sanitise</review_comments>\n\
<internal_hyperlinks>sanitise</internal_hyperlinks>\n\
<external_hyperlinks>sanitise</external_hyperlinks>\n\
<dynamic_data_exchange>sanitise</dynamic_data_exchange>\n\
<embedded_images>sanitise</embedded_images>\n\
</wordConfig>\n\
<pptConfig>\n\
<metadata>sanitise</metadata>\n\
<macros>sanitise</macros>\n\
<embedded_files>sanitise</embedded_files>\n\
<review_comments>sanitise</review_comments>\n\
<internal_hyperlinks>sanitise</internal_hyperlinks>\n\
<external_hyperlinks>sanitise</external_hyperlinks>\n\
<embedded_images>sanitise</embedded_images>\n\
</pptConfig>\n\
<xlsConfig>\n\
<metadata>sanitise</metadata>\n\
<macros>sanitise</macros>\n\
<embedded_files>sanitise</embedded_files>\n\
<internal_hyperlinks>sanitise</internal_hyperlinks>\n\
<external_hyperlinks>sanitise</external_hyperlinks>\n\
<review_comments>sanitise</review_comments>\n\
<dynamic_data_exchange>sanitise</dynamic_data_exchange>\n\
<embedded_images>sanitise</embedded_images>\n\
</xlsConfig>	\n\
<tiffConfig>\n\
<geotiff>sanitise</geotiff>\n\
</tiffConfig>\n\
</config>"; 

export const HEALTH_CHK_PNG_BASE64 = "iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4BAMAAADLSivhAAAAMFBMVEVAoaL///9Hpab4/PxUq6zv9/e43NzX6+ul09ORyclisrPj8fFyubrH4+SAwME/oaJIgbRbAAAEIUlEQVR4Xu3Zf2hbVRQH8LO3LG2y19rT7OU1S1/JWiIgKGayAoNJHooIK9A3BdlESGSiKMI6sYIyyGMVAXSmKAXBjXRMRBmYMBjCABJQBQQxyAQKYiqiKlD694AhL0lf7n3318vLn/YLFE7hk3O593BzIYAjZB/v4xN33rpzKxr++g/w8tDV4fHZb0Bb2tn59/ouJP8cDhtbu0v9jub7RUisDIOr2mWiWgOtHRobnUCr218ly2Fx6WkMxKzda4TDF+PIJFVLhMKZRAHZmM3TIbBxo4G8zOTKarzsIj/nEkpsfo6iVLZVeAuFsXQFttZRnDMtOb6EkmQnpdhYQVnqrhCrY8ZHwFgqjIDnbCk2Hal+UIKNj0Fbl+G6I8YlAIgVZOtuCfEseLFRkrwQdwD2Wmdf2fnnA84aXhXhDPSyjmg0AQD0Nxg83RDgeh9PIC5DN7FyEFstPk4VoU8Qa9CLzpxcno8t2Itr5MBfRSCf8PG0j/MDDMFjP8nHv/lgPDXAkwE8W+DiGvgpFEHU2nK5ODcAbgVErQ2bhy0YxJ4CYevPeHiOwGMZAsdp/DIPTxM4aQGRFQqf4uFHCaw5JF6g8CIP14FIu0pgncIzStyiP4rEaR6+QOJDx0l8kMSWEsePgnDdSjw5A6L9VuNYisLHhsLgFEk8Phx2O1Q5HLYrFN5W4DqFF36iSwVepnCeLicVeIrCY14Za/hT2pDjIxQeP+r9GXyiK8cZCutemRhsxAE5NimspT2y4Z92Qo4RqJh0GVPgIoWfBzptOaZn6k0A7nin+Jgei7s5Go/1gcli9qBf8jG9YxkWs2f1bgBDH/zFxybd2VfUmBjHWMxu92tBvNmbQ5fF7HXwugfYW7DiCDB16Z31AHObmDoKsLU7ANp0EGvdVR8UYWwSfeoeYK7Q2roQE2ChCpztngMU4rQP7i0CExuxEw9gdt1Xvry5UmHxJmbAluDeLj3y3up1YONgUytIcBbEyeNJmEAGi+ZEI8c75pgArhSnCfvDYydK5LOmCjpKMZZ8+8W1H6/ii3v2ezwPsKnAJnUHPIxr3Tr2Lb4NkEQFxjNA5nTqhU+fXNp4BtcA4AklNpqU/s7xwKr3z/tZJcYZoBLb+OVKrbdl59QYnwVuxrI5R43xPM/qTgnaITD+zlqt/Dg84IbBqQ8ZfDmdA9hmMFevBfp+lK6BaEjYbFFzXV7slnZIjM91/BvtqVtY5T7HAIW5fe3G/Pz8zb9/9h8sB3hYndlRsNHFh6NhLI6Cm6PgSlRs/Hq392w4FAFfAGgvR9xt02NTQw0J/c0bPwLc2VbGW3GiOyWt4XEJALQudrlYfUrHPdyI0rmfJIbG7ONuIgKe28N2BJzqW60QGrNPlcMYBRs1z+qFSBitIoDuYDSMxqV3/r8/v+zj/wCkvAtd4Bni/AAAAABJRU5ErkJggg==";
export const HEALTH_CHK_PNG_NAME = "test.png";


export const getPathSep=()=>{
  return path.sep;
}
export const getReportPath =()=>{
  return getAppDataPath() + getPathSep() + _REPORT_FOLDER;
}
export const getCleanPath =()=>{
  return getAppDataPath() + getPathSep() + _CLEAN_FOLDER
  
}
export const getOriginalPath =()=>{
  return getAppDataPath() + getPathSep() + _ORIGINAL_FOLDER
  
}

export const getProcessedPath =()=>{
  return getAppDataPath() + getPathSep() + _PROCESSED_FOLDER
}

export const getAppDataPath =() =>{
  switch (process.platform) {
    case "darwin": {
      return path.join(process.env.HOME, "Library", "Application Support", "glasswall-desktop");
    }
    case "win32": {
      return path.join(process.env.APPDATA, "glasswall-desktop");
    }
    case "linux": {
      return path.join(process.env.HOME, ".glasswall-desktop");
    }
    default: {
      console.log("Unsupported platform!");
      // process.exit(1);
    }
  }
}

 //save base64 file 
 export const saveBase64File = async(content: string, filePath: string, filename: string)=>{
  //console.log("filePath 1" + filePath)
  !fs.existsSync(filePath) && fs.mkdirSync(filePath, { recursive: true })
  fs.writeFile(filePath +  getPathSep() + filename, content, {encoding: 'base64'}, function(err: any) { if (err) {
          console.log('err', err);
      }
  });
}

//save any text file 
export const saveTextFile = async (xmlContent: string, filePath: string, filename: string) =>{
  //console.log("filePath 2" + filePath)
  !fs.existsSync(filePath) && fs.mkdirSync(filePath, { recursive: true })
  fs.writeFile(filePath + getPathSep() + filename, xmlContent, function(err: any) {if (err) {
              console.log('err', err);
      }
  });
}

export const open_file_exp=(fpath: string)=> {
  console.log("open_file_exp" + fpath )
  var command = '';
  switch (process.platform) {
    case 'darwin':
      command = 'open -R ' + "\'" + fpath +"\'";
      break;
    case 'win32':
      if (process.env.SystemRoot) {
        command = path.join(process.env.SystemRoot, 'explorer.exe');
      } else {
        command = 'explorer.exe';
      }
      fpath = fpath.replace(/\//g, '\\');
      command += ' /select, ' + fpath;
      break;
    default:
      fpath = path.dirname(fpath)
      command = 'xdg-open ' + fpath;
  }
  child_process.exec(command, function(stdout:any) {
  });
}
