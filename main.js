const electron = require('electron');
const url = require('url');
const path = require('path');
const { Menu } = require('electron');

const {app,BrowserWindow,ipcMain}  = electron;

let mainWindow ;
let addWindow;
//Listen to tjhe app at ready
app.on('ready',function(){

//create new window
mainWindow = new BrowserWindow({});

//load the html to the window
mainWindow.loadURL(url.format({
    pathname: path.join(__dirname,'welcome.html'),
    protocol : 'file:',
    slashes : true
}));

//close the window
mainWindow.on('closed',function(){
    app.quit();
});

const menu = Menu.buildFromTemplate(menutemplate);

Menu.setApplicationMenu(menu);

});

//new function to add item

function createAddWindow(){
    
//create new window
addWindow = new BrowserWindow({
    width:300,height:150
});

//load the html to the window
addWindow.loadURL(url.format({
    pathname: path.join(__dirname,'addWindow.html'),
    protocol : 'file:',
    slashes : true
}));

addWindow.on('close',function(){
    addWindow = null;
})

}

ipcMain.on('item:add',function(e,item){
mainWindow.webContents.send('item:add',item);
addWindow.close();
});

const menutemplate = [{
    label : "file",
    submenu :[{
        label :'add item',
        click(){createAddWindow();}
    },{
        label:'quit',
        accelerator : process.platform =='darwin' ? 'command+Q':'ctrl+Q',
        click(){
            app.quit();
        }
    }]
},{
    label:'Developer Tools',
    submenu :[{
        label:'Toogle Tools',
        click(item,focusedWindow){
            focusedWindow.toggleDevTools();
        }
    }]
}
]