const DEBUG: boolean = false;

const {
    app,
    BrowserWindow,
    WebContents,
    Certificate,
    Menu,
    Tray,
    globalShortcut,
    ipcMain}                = require('electron');
const remote                = app.remote;
const path                  = require('path')
const shell                 = require('electron').shell
const { dialog }            = require('electron')
const dir                   = path.resolve(__dirname, `..`)
const { autoUpdater }       = require('electron-updater');
const log                   = require('electron-log');

autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'debug';
log.info('App starting...');



function createMenu(){
    var template =[
        {
            label: 'Desktop'
        },
        {
            label: 'Glasswall Desktop',
            submenu: [
                {
                    label: 'Home',
                    click: openMainWindow,
                },
                {
                    type:'separator'
                }, 
                {
                    label:'About Glasswall Desktop',
                    click: async (): Promise<void> => {
                        const { response } = await dialog.showMessageBox({
                        message: `About Glasswall Desktop`,
                        detail: ` Glasswall Desktop is a desktop based applications that provide multi file drag and drop rebuild workflow.`,
                        buttons: [ `Ok`],
                        defaultId: 1,
                        type: `info`,
                        })
                    },
                },
                
                {
                    type:'separator'
                },
                {
                    type:'separator'
                }, 
                {
                    label:'Quit Glasswall Desktop',
                    click: async (): Promise<void> => {
                        //openMainWindow()
                        const { response } = await dialog.showMessageBox({
                        message: `Quit Glasswall Desktop?`,
                        detail: `Do you really want to quit?`,
                        buttons: [`Cancel`, `Quit`],
                        defaultId: 1,
                        type: `question`,
                        })
                
                        if (response === 1) {
                            app.quit()
                        }
                    },
                    accelerator: 'CmdOrCtrl+Q'
                }
            ]
        },
        {
        role: 'help',
        submenu: [
            {
                label: 'Learn More',
                click() { 
                    shell.openExternal(' https://github.com/k8-proxy/glasswall-desktop/blob/main/README.md')
                },
                accelerator: 'CmdOrCtrl+H'
            }
        ]
        }

    ]
    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)

}


function makeWindow(): typeof BrowserWindow {
    
    const tray = new Tray(path.resolve(dir, `assets`, `IconTemplate.png`))
    let window = new BrowserWindow({
        title: `Glasswall Desktop`,
        width: 1200,
        height: 800,
        fullscreenable: false,
        icon:tray,
        trafficLightPosition: { x: 8, y: 18 },
        webPreferences: {
            nodeIntegrationInWorker: true,
            nodeIntegration: true,
            webSecurity: false,
            allowDisplayingInsecureContent: true,
            allowRunningInsecureContent: true,
            enableRemoteModule: true
        }
    })
   
    //to add chrome dev tools 
    if(DEBUG){
      window.webContents.openDevTools();
    }
   
    return window;
}

let mainWindow: typeof BrowserWindow | undefined

function openMainWindow(): void {    
    let url = `file://${__dirname}/../ui/index.html`;

    if (!mainWindow || mainWindow.isDestroyed()) {
      mainWindow = makeWindow()
      mainWindow.loadURL(url)
    } else {
      if (!mainWindow.webContents.getURL()) {
        mainWindow.loadURL(url)
      }else if(!mainWindow.webContents.getURL().endsWith('index.html#/')){
        mainWindow.loadURL(url)
      }
    }
   
  }

app.commandLine.appendSwitch('ignore-certificate-errors', 'true');
app.commandLine.appendSwitch('allow-insecure-localhost', 'true');

app.on('ready', () => {
  createMenu();
  openMainWindow()
  
});


app.on('certificate-error', (event: Event, contents: typeof WebContents, url: String, error: String, certificate:  typeof Certificate, callback: Function) => {
  if (url === 'https://forensic-workbench.com/') {
    event.preventDefault()
    callback(true)
  } else {
    callback(false)
  }
})

app.on('window-all-closed', () => {
  
  app.quit();
})




app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    makeWindow()
  }
})



ipcMain.on('app_version', (event:any) => {
  event.sender.send('app_version', { version: app.getVersion() });
});


autoUpdater.on('update-available', () => {
  log.info("Update available");
  mainWindow.webContents.send('update_available');
});

autoUpdater.on('update-downloaded', () => {
    log.info('update download')
  mainWindow.webContents.send('update_downloaded');
});

autoUpdater.on('checking-for-update', () => {
    log.info('checking for update')
    mainWindow.webContents.send('checking-for-update');
});

autoUpdater.on('error', (err:any) => {
    log.info('Error checking for update')
    log.info(err)
    log.info(err.stack)
});

autoUpdater.on('update-not-available', () => {
    log.info('update-not-available')
    mainWindow.webContents.send('update-not-available');
});

ipcMain.on('restart_app', () => {
  autoUpdater.quitAndInstall();
});

setInterval(() => {
    log.info('Checking for updates')
  autoUpdater.checkForUpdatesAndNotify()
}, 60000)