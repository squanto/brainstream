// Modules to control application life and create native browser window
const { app, BrowserWindow, session } = require("electron")
const path = require("path")
const url = require("url")

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow() {
  // TODO: make env var spearate + more explicit
  const isDevelopmentEnv = !!process.env.ELECTRON_START_URL

  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    "node-integration": "iframe", // and this line
    webPreferences: {
      "web-security": false,

      // Will be default later, but disable node code running directly in browser
      nodeIntegration: false,
      // Load node code that can run in browser
      preload: path.join(__dirname, "..", "src", "services", "index.js"),
      // Disable devtools in production.
      devTools: isDevelopmentEnv
    }
  })

  // Set CSP, via: https://electronjs.org/docs/tutorial/security
  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        "Content-Security-Policy": ["script-src 'self'"]
      }
    })
  })

  // and load the index.html of the app.
  const startURL =
    process.env.ELECTRON_START_URL ||
    url.format({
      pathname: path.join(__dirname, "..", "./build/index.html"),
      protocol: "file:",
      slashes: true
    })
  mainWindow.loadURL(startURL)

  // Open the DevTools in development mode
  if (isDevelopmentEnv) {
    mainWindow.webContents.openDevTools()
  }

  // Emitted when the window is closed.
  mainWindow.on("closed", function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow)

// Quit when all windows are closed.
app.on("window-all-closed", function() {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit()
  }
})

app.on("activate", function() {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
