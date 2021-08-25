
const {app, BrowserWindow} = require('electron')
const {PythonShell} = require('python-shell')


function CreateWindow() {
  const window = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })
  window.loadFile("./gui/home.html")
}

app.whenReady().then(CreateWindow)
