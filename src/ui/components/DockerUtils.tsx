var {spawnSync, exec}                   = require('child_process');
import * as Utils                       from '../utils/utils'
const UUID                              = require('pure-uuid');
const fs                                = require('fs-extra')
const path                              = require('path');
import axios                            from "axios";
const shell                             = require('shelljs');
const resolve                           = require('path').resolve
const fixPath                           = require('fix-path');

fixPath();

const getPayload = (data: any) => {
    let buffer = Buffer.from(data.content, 'base64');
    let size_of_file = buffer.length / 1000000;
    console.log("File Size (MB) : " + size_of_file);
    var json = {
            fileSize : size_of_file,
            Base64 : data.content
        };
    return json;
}

const getAnalysisPayload = (data: any) => {
    let buffer = Buffer.from(data.content, 'base64');
    let size_of_file = buffer.length / 1000000;
    var json = {
            Base64 : data.content,
            fileSize : size_of_file,
        };
        return json;
}

const getLocalUpload = (data: any) => {
    return {"fileName":data.original_file_name,"fileBody":data.content};
}

const decodeBase64Image=(dataString: string) =>{
    let response: any;
    response = dataString.split(';base64,').pop();
    return response;
}

const writeDecodedBase64File = (baseBase64Response: string, xmlReport:string, request: any, sourceFileUrl: string,
    requestId:string, targetFolder: string, resultCallback: Function) => {
   var decodedBase64 = decodeBase64Image(baseBase64Response);   
   //var bs = atob(decodedBase64);
   var bs = new Buffer(decodedBase64, 'base64').toString('utf8')   
   var buffer = new ArrayBuffer(bs.length);
   var ba = new Uint8Array(buffer);
   for (var i = 0; i < bs.length; i++) {
       ba[i] = bs.charCodeAt(i);
   }
   var file = new Blob([ba], { type: request.type });
   var url = window.webkitURL.createObjectURL(file);    
   Utils.addLogLine(request.filename,"Processing complete ");  
   resultCallback({'source':sourceFileUrl, 'url':url, 'filename':request.filename, isError:false, msg:'',
       cleanFile:decodedBase64, xmlResult: xmlReport, id:requestId, targetDir:targetFolder, original:request.content, path:request.path})
   
}

const writeBinaryFile = (bytes: any,  xmlReport:string, request: any, sourceFileUrl: string, requestId: string,
    targetFolder:string, resultCallback: Function) => {
   var bs = bytes;
   var buffer = new ArrayBuffer(bs.length);
   var ba = new Uint8Array(buffer);
   for (var i = 0; i < bs.length; i++) {
       ba[i] = bs.charCodeAt(i);
   }
   var file = new Blob([ba], { type: request.type });
   var url = window.webkitURL.createObjectURL(file);
   resultCallback({'source':sourceFileUrl,  'url':url, 'filename':request.filename, isError: false, msg:'',
     cleanFile:buffer, xmlResult: xmlReport, id:requestId, targetDir:targetFolder, original:request.content,path:request.paths })
  
}

const getBase64 = (file: File) => {
   let res = new Promise(resolve => {
       var reader = new FileReader();
       reader.onload = function (event: any) {
           resolve(event.target.result);
       };
       reader.readAsDataURL(file);
   });
   return res;
}

export const makeRequest = (request: any, sourceFileUrl: string, requestId: string, folderId: string,
      resultCallback: Function) => {
    let payload: string | any;
    let url : string;
    url = Utils.REBUILD_ENGINE_URL;

    payload = getPayload(request)
    var fileSize = payload.fileSize;

    
    if(fileSize < 6){
        const rebuiltBase64 = docker_exec_rebuild(payload,request.filename);
        if(rebuiltBase64 == -1 ){
            Utils.addLogLine(request.filename,"Docker Daemon is not started");
            resultCallback({'source':sourceFileUrl, 'url':'TBD', 'filename':request.filename, isError:true,
                msg:'Docker Daemon is not started', id:requestId, targetDir:folderId, original:request.content});
                return;
        }
        if(rebuiltBase64 == -2 ){
            Utils.addLogLine(request.filename,"Docker not installed");
            resultCallback({'source':sourceFileUrl, 'url':'TBD', 'filename':request.filename, isError:true,
                msg:'Docker not installed', id:requestId, targetDir:folderId, original:request.content});
                return;
        }
        if(rebuiltBase64 == null){
            Utils.addLogLine(request.filename,"File rebuild failed");
            resultCallback({'source':sourceFileUrl, 'url':'TBD', 'filename':request.filename, isError:true,
                msg:'File could not be rebuilt', id:requestId, targetDir:folderId, original:request.content});
                return;
        }
        
        try{
            Utils.addLogLine(request.filename,"Rebuild succesfull. Starting analysis");
            getAnalysisResult(false, rebuiltBase64, request, sourceFileUrl, requestId, folderId, resultCallback);
        }
        catch(err:any){
            console.log("3:" + JSON.stringify(err));
            Utils.addLogLine(request.filename,"Analysis Error "+err.message);
            if(err.message.indexOf('422') > -1){
                resultCallback({'source':sourceFileUrl, 'url':'TBD', 'filename':request.filename, isError:true,
             msg:'File of this type cannot be processed - '+err.message, id:requestId, targetDir:folderId, original:request.content})
            }
            else{
                resultCallback({'source':sourceFileUrl, 'url':'TBD', 'filename':request.filename, isError:true,
                  msg:err.message, id:requestId, targetDir:folderId, original:request.content})
            }
        }        
    }
    else{
        Utils.addLogLine(request.filename,"File size > 6 MB. Unprocessable");
        resultCallback({'source':sourceFileUrl, 'url':'TBD', 'filename':request.filename, isError:true,
             msg:'File too big. 4 bytes to 6 MB file size bracket', id:requestId, targetDir:folderId, original:request.content})
    }
}

export const getAnalysisResult = (isBinaryFile: boolean, reBuildResponse: any, request: any, sourceFile: string,
     requestId: string, targetFolder: string, resultCallback: Function)=>{

    let payload: string | any;
    let url : string;
    url = Utils.REBUILD_ANALYSIS_URL;

    payload = getAnalysisPayload(request)
    var fileSize = payload.fileSize;
    
    if(fileSize < 6){
        try{
               var xml = docker_exec_analysis(payload,request.filename);                              
               writeDecodedBase64File(reBuildResponse, xml, request, sourceFile, requestId,
                         targetFolder, resultCallback)               
            }
        catch(err: any){
            Utils.addLogLine(request.filename,"Analysis error "+err.message);
            console.log("11" + err.message);
            console.log("11" + err.stack);
            resultCallback({'source':sourceFile, 'url':'TBD', 'filename':request.filename, isError:true,
                 msg:err.message, id:requestId, targetDir:targetFolder, original:request.content})
        }
    }
    else{
        resultCallback({'source':sourceFile, 'url':'TBD', 'filename':request.filename, isError:true,
             msg:'File too big. 4 bytes to 6 MB file size bracket', id:requestId, targetDir:targetFolder, original:request.content})
    }
}


export const getFile = (file: any) => {

    return getBase64(file).then((result: any) => {
        var encodedImage = result;
        var data = {type:file.type, filename:file.name, originalFileSize:file.size, content:null, path:file.path};
        if (file.type === "image/jpeg" || file.type === "image/jpg" || file.type === "image/png")
            data.content = encodedImage.replace(/^data:image\/\w+;base64,/, "");
        else
            data.content = encodedImage.replace(/^data:.*?;base64,/, "")
        return data;
    });

}

export const docker_exec_rebuild = (payload: any,fileName:string) => {
    const id = new UUID(4).format();
    const directory = path.join(Utils.getAppDataPath() +  Utils.getPathSep() + 'temp', id);
    const inputDir = path.join(directory,'input');
    const outputDir = path.join(directory,'output');
    shell.mkdir('-p', directory);    
    fs.mkdirSync(inputDir);
    fs.mkdirSync(outputDir);
    console.log('payload '+JSON.stringify(payload));    
    console.log('fileName '+fileName);
    console.log('inputDir '+inputDir);
    console.log('outputDir '+outputDir);
    var base64Data = payload.Base64.replace(/^data:image\/png;base64,/, "");
    fs.writeFileSync(path.join(inputDir,fileName),base64Data,{encoding:"base64"});
    console.log("Created rebuild dirs in "+directory+", inputDir "+inputDir+", outputDir"+outputDir);
    var options={"timeout":5000, "shell":false};
    var totalOutput : any;    
    totalOutput = "";
    // Run container 
    options={"timeout":10000, "shell":false};   
    var spawned = spawnSync('docker', [ 'run',
                                        '--rm',
                                        '-v', resolve(inputDir)+':/input',
                                        '-v', resolve(outputDir)+':/output',
                                        Utils.GW_DOCKER_IMG_NAME], options);
    console.log("Got response "+String(spawned))             
     if(spawned.hasOwnProperty("output")){
        console.log("Spawned length "+spawned["output"].length);
        for(var i=0;i<spawned["output"].length;i++){
            var output = spawned["output"][i];
            console.log("Spawned output"+output);
            if(output != null && output != ""){
                totalOutput = totalOutput+output;
            }            
        }
        console.log("Rebuild output = "+totalOutput);
        if(totalOutput.indexOf("error during connect") > -1){
            return -1;
        }
        if (fs.existsSync(path.join(outputDir,'Managed'))) {
            const outFile = path.join(outputDir,'Managed',fileName);
            if(fs.existsSync(outFile)){
                const contents = fs.readFileSync(outFile, {encoding: 'base64'});     
                return contents;
            }
            else{
                console.log('File failed rebuild, Managed dir was there but not the rebuilt file');
                return null;
            }
        }
        else{
            console.log('File failed rebuild');
            return null;
        }
     }
     else{
        console.log("Does not have output property");
     }
     // TODO : Cleanup temp
     return null;
}

export const docker_exec_analysis = (payload: any,fileName:string) => {
    const id = new UUID(4).format();
    const directory = path.join(Utils.getAppDataPath() + Utils.getPathSep() +  'temp', id);
    const inputDir = path.join(directory,'input');
    const outputDir = path.join(directory,'output');
    shell.mkdir('-p', directory);    
    fs.mkdirSync(inputDir);
    fs.mkdirSync(outputDir);
    console.log('<docker_exec_analysis> payload '+JSON.stringify(payload));    
    console.log('<docker_exec_analysis> fileName '+fileName);
    console.log('<docker_exec_analysis> inputDir '+inputDir);
    console.log('<docker_exec_analysis> outputDir '+outputDir);
    var base64Data = payload.Base64.replace(/^data:image\/png;base64,/, "");
    fs.writeFileSync(path.join(inputDir,fileName),base64Data,{encoding:"base64"});
    console.log("<docker_exec_analysis> Created analysis dirs in "+directory+", inputDir "+inputDir+", outputDir"+outputDir);
    var options={"timeout":5000, "shell":false};
    var totalOutput : any;    
    totalOutput = "";
    // Run container        
    let configDir = resolve(Utils.getAppDataPath() + Utils.getPathSep() + 'config');
    if (!fs.existsSync(configDir)){
        fs.mkdirSync(configDir);
    }
    fs.openSync(path.join(configDir,"config.ini"),'w');
    fs.openSync(path.join(configDir,"config.xml"),'w');
    fs.writeFileSync(path.join(configDir,"config.ini"),Utils.CONFIG_INI);
    fs.writeFileSync(path.join(configDir,"config.xml"),Utils.CONFIG_XML);    
    console.log('Config dir - '+(configDir));
    options={"timeout":10000, "shell":false};
    var spawned = spawnSync('docker', [ 'run',
                                        '--rm',
                                        '-v', configDir+':/home/glasswall',
                                        '-v', resolve(inputDir)+':/input',
                                        '-v', resolve(outputDir)+':/output',
                                        Utils.GW_DOCKER_IMG_NAME], options);
    console.log("<docker_exec_analysis> Got response "+String(spawned))             
     if(spawned.hasOwnProperty("output")){
        console.log("<docker_exec_analysis> Spawned length "+spawned["output"].length);
        for(var i=0;i<spawned["output"].length;i++){
            var output = spawned["output"][i];
            console.log("<docker_exec_analysis> Spawned output"+output);
            if(output != null && output != ""){
                totalOutput = totalOutput+output;
            }            
        }
        console.log("<docker_exec_analysis> Analysis output = "+totalOutput);
        if (fs.existsSync(path.join(outputDir,'Managed'))) {
            const outFile = path.join(outputDir,'Managed',fileName+'.xml');
            if(fs.existsSync(outFile)){
                const contents = fs.readFileSync(outFile);    
                console.log('XML content - '+contents); 
                Utils.addLogLine(fileName,"Analysis successful.");
                return contents;
            }
            else{
                console.log('<docker_exec_analysis> File failed analysis, Managed dir was there but not the rebuilt file');
                Utils.addLogLine(fileName,"File analysis failed.");
                return null;
            }
        }
        else{
            Utils.addLogLine(fileName,"File analysis failed.");
            console.log('<docker_exec_analysis> File failed analysis');
            return null;
        }
     }
     else{
        Utils.addLogLine(fileName,"File analysis failed.");
        console.log("<docker_exec_analysis> Does not have output property");
     }
     // TODO : Cleanup temp
     return null;
}


const new_guid = () => {
        return new UUID(4).format()
}

/****
 * Returns
 * 0 - All ok
 * 1 - Docker not installed
 * 2 - Docker not running
 * 3 - Image not present
 * 4 - License invalid
 * 5,6,7 - Unknown Error
 */
export const health_chk = () => {     
    var oldLogs = "";    
    localStorage.setItem("healthLogs",oldLogs);       
    const id = new UUID(4).format();
    const directory = path.join(Utils.getAppDataPath() +  Utils.getPathSep() + 'temp', id);
    const inputDir = path.join(directory,'input');
    const outputDir = path.join(directory,'output');
    shell.mkdir('-p', directory);    
    fs.mkdirSync(inputDir);
    fs.mkdirSync(outputDir);    
    console.log('inputDir '+inputDir);
    console.log('outputDir '+outputDir);
    var base64Data = Utils.HEALTH_CHK_PNG_BASE64;
    var fileName = Utils.HEALTH_CHK_PNG_NAME;
    fs.writeFileSync(path.join(inputDir,fileName),base64Data,{encoding:"base64"});
    console.log("Created rebuild dirs in "+directory+", inputDir "+inputDir+", outputDir"+outputDir);
    var options={"timeout":5000, "shell":false};
    var totalOutput : string;
    totalOutput = "";
    // Check if image there
    var checkResponse = spawnSync('docker', ['images'],options); 
    console.log(JSON.stringify(checkResponse));  
    if(checkResponse.hasOwnProperty("error")){
        let error =  checkResponse["error"];
        if(error.hasOwnProperty("errno")){
            let errno =  error["errno"];
            if(errno.indexOf("ENOENT") > -1 ){
                // Docker not installed
                oldLogs += "\n"+Utils.getLogTime()+" - ERROR \n DOCKER NOT INSTALLED - "+checkResponse;                
                localStorage.setItem("healthLogs",oldLogs);
                return 1;
            }                            
        }
        
    } 
    oldLogs += "\n"+Utils.getLogTime()+" - INFO \n DOCKER IS INSTALLED ";                            
    if(checkResponse.hasOwnProperty("output")){        
        for(var i=0;i<checkResponse["output"].length;i++){
            var output = checkResponse["output"][i];            
            if(output != null && output != ""){
                totalOutput = totalOutput+output;
            }            
        }
    }
    console.log("Image check output = "+totalOutput);     
    if(totalOutput.indexOf("error during connect") > -1 || totalOutput.indexOf("Error response from daemon") > -1){
        oldLogs += "\n"+Utils.getLogTime()+" - ERROR \n DOCKER NOT RUNNING - "+totalOutput        
        localStorage.setItem("healthLogs",oldLogs);       
        return 2;
    }   
    else if (totalOutput.indexOf(Utils.GW_DOCKER_IMG_TAG) == -1){
        // Image not present
        oldLogs += "\n"+Utils.getLogTime()+" - ERROR \n GW IMAGE MISSING - "+totalOutput        
        localStorage.setItem("healthLogs",oldLogs);       
        return 3;
    }
    else{
        oldLogs += "\n"+Utils.getLogTime()+" - INFO \n GW IMAGE PRESENT"
    }
    totalOutput = "";
    // Run container 
    options={"timeout":10000, "shell":false};   
    var spawned = spawnSync('docker', [ 'run',
                                        '--rm',
                                        '-v', resolve(inputDir)+':/input',
                                        '-v', resolve(outputDir)+':/output',
                                        Utils.GW_DOCKER_IMG_NAME], options);
    console.log("Got response "+String(spawned))             
     if(spawned.hasOwnProperty("output")){
        console.log("Spawned length "+spawned["output"].length);
        for(var i=0;i<spawned["output"].length;i++){
            var output = spawned["output"][i];
            console.log("Spawned output"+output);
            if(output != null && output != ""){
                totalOutput = totalOutput+output;
            }            
        }
        console.log("Rebuild output = "+totalOutput);
        if(totalOutput.indexOf("error during connect") > -1){
            // Docker not started
            oldLogs += "\n"+Utils.getLogTime()+" - ERROR \n DOCKER NOT RUNNING - "+totalOutput;
            localStorage.setItem("healthLogs",oldLogs);       
            return 2;
        }
        else{
            oldLogs += "\n"+Utils.getLogTime()+" - INFO \n DOCKER RUNNING";            
        }
        if (fs.existsSync(path.join(outputDir,'Managed'))) {
            const outFile = path.join(outputDir,'Managed',fileName);
            if(fs.existsSync(outFile)){
                oldLogs += "\n"+Utils.getLogTime()+" - INFO \n GW LICENSE OK";                
                localStorage.setItem("healthLogs",oldLogs);       
                return 0;
            }
            else{
                console.log('File failed rebuild, Managed dir was there but not the rebuilt file');
                // License not valid
                oldLogs += "\n"+Utils.getLogTime()+" - ERROR \n GW LICENSE HAS EXPIRED - "+totalOutput;   
                localStorage.setItem("healthLogs",oldLogs);                    
                return 4;
            }
        }
        else{
            console.log('File failed rebuild');
            localStorage.setItem("healthLogs",oldLogs);       
            return 5;
        }
     }
     else{
        console.log("Does not have output property");
        localStorage.setItem("healthLogs",oldLogs);       
        return 6;
     }     
     return 7;
}


export const pull_image = () =>{
    var oldLogs = localStorage.getItem("healthLogs") || "";    
    var options={"timeout":5000, "shell":false};
    var totalOutput : any;    
    // Pull    
    totalOutput = "";
    var options={"timeout":120000, "shell":false};
    var pullResponse = spawnSync('docker', [ 'pull',Utils.GW_DOCKER_IMG_NAME], options);
    if(pullResponse.hasOwnProperty("output")){            
        for(var i=0;i<pullResponse["output"].length;i++){
            var output = pullResponse["output"][i];        
            if(output != null && output != ""){
                totalOutput = totalOutput+output;
            }            
        }
    console.log("<docker_exec_analysis> PullResponse output = "+totalOutput);        
    }
    oldLogs += "\n"+Utils.getLogTime()+" - INFO \n IMAGE PULL LOGS - "+totalOutput;
    localStorage.setItem("healthLogs",oldLogs);  
    return totalOutput; 
} 