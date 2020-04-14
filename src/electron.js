const { remote, ipcRenderer } = require('electron');
const { FindInPage } = require('electron-find');
const fs = require('fs');
const util = require('util');

window.readFile = util.promisify(fs.readFile);

let findInPage = new FindInPage(remote.getCurrentWebContents(), {
    preload: true,
    offsetTop: 6,
    offsetRight: 10,
    duration: 100
});

ipcRenderer.on('on-find', (e, args) => {
    findInPage.openFindWindow()
});

ipcRenderer.on('on-files-select', (e, args) => {
    window.bus.$emit(window.ON_SELECT_FILE, args);
});


