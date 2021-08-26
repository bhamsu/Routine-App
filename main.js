
// Importing the Required libaries
const {app, BrowserWindow, ipcMain} = require('electron')
const path = require('path')
const ipc = ipcMain
const {PythonShell} = require('python-shell')

// const heading1 = document.getElementById('heading1').home

function CreateWindow() {

  // Initilization of the windows credentials
  const window = new BrowserWindow({
    width: 1200,
    height: 600,
    minWidth: 940,
    minHeight: 560,
    frame: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      devTools: true,
      preload: path.join(__dirname, "preload.js")
    }
  })

  // Loading the .html file for the GUI segment
  window.loadFile("./src/home.html")
  window.setBackgroundColor('#343B48')

  // Maximize Restore Window Method
  ipc.on('maximizeRestoreApp', (event, arg) => {
    if (window.isMaximized()) {
      console.log("Clicked onRestore Btn");
      window.restore()
    } else {
      console.log("Clicked onMaximize Btn");
      window.maximize()
    }
  })

  // All the required specifications for Calling the Python script
  var options = {
    scriptPath: "./engine/",   // Path to the Python Script
    args: ["Ramdev."]     // All the required arguments for the Python Script
  }

  // Calling the Python-Shell module
  var pyshell = new PythonShell("demo.py", options);
  pyshell.on("message", function(message) {
    // Reading the data printed in Python Console as message variable
    console.log(message);
    ipc.on('asynchronous-message', (event, arg) => {
        // console.log(arg)
        event.reply('asynchronous-reply', message)
    })
  })

  // Checking, is it Maximized
  window.on('maximize', () => {
    window.webContents.send("isMaximized")
  })
  // Checking, is it Restored
  window.on('unmaximize', () => {
    window.webContents.send("isRestored")
  })

  // Minimize Window Method
  ipc.on('minimizeApp', (event, arg) => {
    console.log("Clicked onMinimize Btn");
    window.minimize()
  })

  // Closing Window Method
  ipc.on('closeApp', (event, arg) => {
    console.log("Clicked onClose Btn");
    window.close()
  })
}

// Launching the GUI window
app.whenReady().then(() => {
  CreateWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      CreateWindow()
    }
  })
})

// Quitting the app when no windows are open on macOS
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})
