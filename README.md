# Run C/C++/C#


## how to run?
First open a `C`, `C++` file or `C#` project
- use shortcut Ctrl+Alt+C
- right click the Text Editor and then click `Compile and run` in editor context menu
- click `Compile and run` button in editor title menu

----

## Demo

![demo](media/screenshots/demo.gif)

----

! this is the code that is executed in the terminal
``` js
let runCommand = `cd "${fPath.substring(0, fPath.lastIndexOf("\\"))}"; `;

if (fExt === '.c') {
    runCommand = runCommand + `gcc "${fPath}" -o "${fName}"; clear; ./"${fName}"`;
} else if (fExt === '.cpp') {
    runCommand = runCommand + `g++ "${fPath}" -o "${fName}"; clear; ./"${fName}"`;
} else if (fExt === '.cs') {
    runCommand = runCommand + 'clear; dotnet run';
}

terminal.show();
terminal.sendText(runCommand);
```

----

I made this extention to run my own C/C++/C# file. You can install it too.
report bugs/issues here [github](https://github.com/AbrarShakhi/runccpp-vsce/issues)