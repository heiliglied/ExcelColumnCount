const { app, BrowserWindow, Menu, nativeTheme, dialog} = require('electron');
const path = require('path');
const { electron } = require('process');
const isMac = process.platform === 'darwin';
let closeWindow = false;

const template = [
    {
        label: '시스템',
        submenu: [
            /*
            {
                // 구현한 browserwindow를 바꾸려면 CSS도 변경 해야함.
                label: '다크모드:토글',
                accelerator: 'Crtl+Shift+D',
                click: () => {
                    if (nativeTheme.shouldUseDarkColors) {
                        nativeTheme.themeSource = 'light';
                    } else {
                        nativeTheme.themeSource = 'dark';
                    }
                }
            },
            */
            {
                label: '끝내기',
                accelerator: 'Alt+F4',
                role: isMac ? 'close' : 'quit'
            },
        ]
    }
];

const menu = Menu.buildFromTemplate(template); 
Menu.setApplicationMenu(menu);

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 300, height: 200,
        webPreferences: {
            // --- !! IMPORTANT !! ---
            // Disable 'contextIsolation' to allow 'nodeIntegration'
            // 'contextIsolation' defaults to "true" as from Electron v12
            contextIsolation: true,
            nodeIntegration: false
        }
    });

    mainWindow.loadFile('index.html');
    
    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
    });

    //메인 윈도우에서 구현해야 X 버튼 클릭에도 대응함.
    mainWindow.on('close', (ev) => {
        if(closeWindow == false) {
            let response = dialog.showMessageBoxSync(mainWindow, {
                type: 'question',
                buttons: ['예', '아니오'],
                defaultId: 1,
                title: '종료 확인!',
                message: '프로그램을 종료하시겠습니까?'
            });
    
            if(response == 0) {
                closeWindow = true;
                this.closeWindow;
            } else {
                closeWindow = false;
                ev.preventDefault();
            }
        } else {
            this.closeWindow;
        }
    });
}

app.whenReady().then(() => {
    createWindow();
 
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('window-all-closed', (ev) => {
    closeWindow = true;
    app.quit();
});

app.on('before-quit', (ev) => {
    
});
