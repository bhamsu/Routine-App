
// Importing libaries
const {ipcRenderer} = require('electron')
// const ipc = ipcRenderer

const maxResBtn = document.getElementById('maxResBtn')

// Minimize Function
minimizeBtn.addEventListener('click', () => {
  ipcRenderer.send('minimizeApp', '')
})

// Function to Change the icon of Maximize & Restore Buttom
function changeMaxResBtn(isMaximizedApp) {
  if (isMaximized) {
    maxResBtn.title = 'Restore'
    maxResBtn.classList.remove('maximizeBtn')
    maxResBtn.classList.add('restoreBtn')
  } else {
    maxResBtn.title = 'Maximize'
    maxResBtn.classList.remove('restoreBtn')
    maxResBtn.classList.add('maximizeBtn')
  }
}

// Maximize Restore Function
maxResBtn.addEventListener('click', () => {
  ipcRenderer.send('maximizeRestoreApp', '')
})

// Receiving data from main.js, and calling the function
ipcRenderer.on('isMaximized', () => {
  changeMaxResBtn(true)
})
ipcRenderer.on('isRestored', () => {
  changeMaxResBtn(false)
})

// Close Function
closeBtn.addEventListener('click', () => {
  ipcRenderer.send('closeApp', '')
})
