# 나 보려고 만든 메뉴얼.
- 종료 메시지 인터셉트.
    프로그램에 기본으로 구현되는 X버튼은 구현한 browserwindow를 따라감.
    x클릭 시 상호작용을 처리하지 않을 경우에는 해당 구문을 app의 before-quit에서 구현하여 처리할 수 있다.

    let closeWindow = false;    
    if(closeWindow == false) {
        let response = dialog.showMessageBoxSync(BrowserWindow.getAllWindows()[0], {
            type: 'question',
            buttons: ['예', '아니오'],
            defaultId: 1,
            title: '종료 확인!',
            message: '프로그램을 종료하시겠습니까?'
        });

        if(response == 0) {
            closeWindow = true;
            app.quit();
        } else {
            closeWindow = false;
            ev.preventDefault();
        }
    } else {
        app.quit();
    }
    
    browserwindow까지 커버할 경우에는 app 기동시, browserwindow의 close 이벤트에 구현한다.
    

- 메뉴 커스텀 방법.
    setApplicationMenu 를 사용하여 템플릿을 지정해 메뉴를 만들 경우.

    role을 사용할 경우 미리 지정된 단축키가 있다. 커스텀 할 경우 미리 지정된 단축키 외의 단축키를 넣어야 동작함.
    지정된 단축키가 아니라면 마음대로 accelerator에 추가하여 사용할 수 있음.
    globalShortcut을 사용할 경우 앱의 ready 단계에서 호출. 단, globalShortcut을 사용할 경우 OS에 추가가 되기 때문에 
    app이 켜져만 있다면 비활성화 상태에서도 인식해 버림. 어지간하면 쓰지 않는 것을 추천하나, 기능 추가를 위해 사용할 경우 
    globalShortcut쪽이 구현 난이도가 쉽다.
    globalShortcut.register('단축키', function(){구현부});
    단축키 형식은 +로 조합함.

 : 예제 1) setApplicationMenu
    const template = [
        {
            label: '시스템',
            submenu: [
                //role을 사용할 경우 미리 지정된 단축키가 있다. 커스텀 할 경우 미리 지정된 단축키 외의 단축키를 넣어야 동작함.
                //지정된 단축키가 아니라면 마음대로 accelerator에 추가하여 사용할 수 있음.
                /*
                    globalShortcut을 사용할 경우 앱의 ready 단계에서 호출. 단, globalShortcut을 사용할 경우 OS에 추가가 되기 때문에 
                    app이 켜져만 있다면 비활성화 상태에서도 인식해 버림. 어지간하면 쓰지 않는 것을 추천하나, 기능 추가를 위해 사용할 경우 
                    globalShortcut쪽이 구현 난이도가 쉽다.
                    globalShortcut.register('단축키', function(){구현부});
                    단축키 형식은 +로 조합함.
                */
                {
                    label: '끝내기',
                    accelerator: 'Alt+F4',
                    role: isMac ? 'close' : 'quit'
                },
                /*
                {
                    role: 'custom',
                    click: () => {
                        //동작구현. 내부 함수 호출시는 iPC 사용함.
                    }
                }
                */
            ]
        }
    ];

    const menu = Menu.buildFromTemplate(template); 
    Menu.setApplicationMenu(menu);

 : 예제 2) globalShortcut
    app.whenReady().then(() => {
        globalShortcut.register('단축키', function(){구현부});
    });
    