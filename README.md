# Run C/C++/C#

- `ctrl+alt+C` to run
- or go to `Command Pallette` search `Run C/C++/C#` then click it.

I made this extention to run my own C/C++/C# file. You can install it too.
report bugs/issues here [github](https://github.com/AbrarShakhi/runccpp-vsce/issues)

! Extention runs some command in terminal

* Those are the command
``` js
if (fileExt === '.c') {
    terminal.show();
    terminal.sendText(`cd "${filePath.substring(0, filePath.lastIndexOf("\\"))}";`);
    terminal.sendText(`gcc "${filePath}" -o "${fileName}"; ./"${fileName}";`);
}
else if (fileExt === '.cpp') {
    terminal.show();
    terminal.sendText(`cd "${filePath.substring(0, filePath.lastIndexOf("\\"))}";`);
    terminal.sendText(`g++ "${filePath}" -o "${fileName}"; ./"${fileName}";`);
}
else if (fileExt === '.cs') {
    terminal.show();
    terminal.sendText(`cd "${filePath.substring(0, filePath.lastIndexOf("\\"))}";`);
    terminal.sendText(`dotnet run;`);
}
```