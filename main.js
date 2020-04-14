const { app, BrowserWindow, globalShortcut, Menu, dialog } = require('electron');

let win;

const isMac = process.platform === 'darwin';


function createWindow () {
    // Создаем окно браузера.
    win = new BrowserWindow({
        width: 800,
        height: 600,
        center: true,
        title: 'Поиск текста в файле. Курсовая Гаврилов Р.С.',
        icon: 'app/mainicon.png',
        webPreferences: {
            nodeIntegration: true
        }
    });

    // и загрузить index.html приложения.
    win.loadFile('app/index.html');

    // Раскоментировать, если хотим открыть окно инструментов разработчика.
    //win.webContents.openDevTools();

    // Подписываемся на событие "focus", которе срабатывает при фокусировки окна рендеринг процесса
    // и регистрируем глобальное сочетание клавиш Ctrl + F
    win.on('focus', () => {
        globalShortcut.register('CommandOrControl+F', function () {
            if (win && win.webContents) {
                // межпроцессная отправка соообщения "on-find" в ренеринг процесс.
                win.webContents.send('on-find')
            }
        })
    });

    // Подписываемся на событие "blur", которе срабатывает при потере фокуса окна рендеринг процесса
    // и удаляем глобальную регистрацию сочетания клавиш Ctrl + F
    win.on('blur', () => {
        globalShortcut.unregister('CommandOrControl+F')
    });

}

const template = [
    {
        label: 'Файл',
        submenu: [
            {
                label: 'Открыть',
                click: async () => { // асинхронная функция котрая будет вызвана при клике на меню "Открыть"
                    // вызов системного диалогового окна открытия файла
                    let files = await dialog.showOpenDialog(win,{ properties: ['openFile'] });

                    if (win && win.webContents) {
                        // межпроцессная отправка соообщения "on-files-select" массивом выбранных файлов в ренеринг процесс.
                        await win.webContents.send('on-files-select', files)
                    }
                }
            },

            { type: 'separator' }, // разделитель меню.
            isMac ? { role: 'close' } : { role: 'quit' } // закрытие приложения используя внутренние механизмы Electron
        ]
    },
    {
        label: 'Поиск',
        submenu: [
            {
                label: 'Найти',
                click: async () => { // функция котрая будет вызвана при клике на меню "Найти"
                    if (win && win.webContents) {
                        // межпроцессная отправка соообщения "on-find" в ренеринг процесс.
                        win.webContents.send('on-find')
                    }
                }
            }
        ]
    }
];

app.whenReady().then(function(){
    createWindow();
});

app.on('will-quit', () => {
    // Отменяем регистрацию всех сочетаний.
    globalShortcut.unregisterAll()
});

const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);