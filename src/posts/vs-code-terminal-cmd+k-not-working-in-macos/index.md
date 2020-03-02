---
title: "Visual Studio Code: Cmd+K not working in MacOS"
date: 2020-02-27
---

> Visual Studio Code (VS Code) is awesome 😎 Now that I’ve said that, welcome! 😀

If like me you’ve gotten into the habit of clearing your terminal using the `Cmd+K` shortcut, it becomes a pain when you can’t do that in VS Code.

Before today, I’d re-configure the key mapping to something like `Cmd+Shift+Delete` but that never for once felt natural. Setting up my new MacBook today, I decided that I’d figure out a way to fix that.

After googling, reading related issues on github.com/Microsoft/vscode/issues, and running into different stackoverflow answers, I found something that works.

Here it is!

1. Launch visual studio code and go `Code > Preferences > Keyboard Shortcuts`.
2. Click the icon in the top right corner that says `Open Keyboard Shortcuts (JSON)`
3. Then add the following lines to the array
```json
{
    "key": "Cmd+K",
    "command": "workbench.action.terminal.clear"
}
```
4. If you want the key binding to work only when you’re in the terminal (for cases where you have same key binding for other actions), you can add the following line to that object

```json
{
    ...,
    "when": "terminalFocus"
}
```

> Problem solved! 🎉

### My VS Code Metedata
* Version: 1.42.1
* Commit: c47d83b293181d9be64f27ff093689e8e7aed054
* Date: 2020-02-11T14:44:27.652Z
* Electron: 6.1.6
* Chrome: 76.0.3809.146
* Node.js: 12.4.0
* V8: 7.6.303.31-electron.0
* OS: Darwin x64 19.3.0

Thanks to this [stackoverflow question](https://stackoverflow.com/questions/51377362/shortcut-to-clear-terminal-doesnt-work-in-visual-studio-code-on-macos) that helped clear things up.

_Happy coding, and more bliss!_