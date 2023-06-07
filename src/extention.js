'use strict';
const vscode = require("vscode");
const path = require("path");

function CompileAndRun_Cmd(fPath, fName, fExt) {
    const terminal = vscode.window.createTerminal("Compile and run");
    terminal.show();
    terminal.sendText(`cd "${fPath.substring(0, fPath.lastIndexOf("\\"))}"`);

    if (fExt === '.c') {
        terminal.sendText(`gcc "${fPath}" -o "${fName}"`);
        terminal.sendText(`"${fName}"`);
    } else if (fExt === '.cpp') {
        terminal.sendText(`g++ "${fPath}" -o "${fName}"`);
        terminal.sendText(`"${fName}"`);
    } else if (fExt === '.cs') {
        terminal.sendText(`dotnet run`)
    }
}

function CompileAndRun_Else(fPath, fName, fExt) {
    const terminal = vscode.window.createTerminal("Compile and run");

    let runCommand = `cd "${fPath.substring(0, fPath.lastIndexOf("\\"))}"; `;

    if (fExt === '.c') {
        runCommand = runCommand + `clear; gcc "${fPath}" -o "${fName}"; ./"${fName}"`;
    } else if (fExt === '.cpp') {
        runCommand = runCommand + `clear; g++ "${fPath}" -o "${fName}"; ./"${fName}"`;
    } else if (fExt === '.cs') {
        runCommand = runCommand + 'clear; dotnet run';
    }

    terminal.show();
    terminal.sendText(runCommand);
}
/**
 * @param {vscode.ExtensionContext} context
*/

function activate(context) {

    context.subscriptions.push(vscode.commands.registerCommand("abrar-runccpp.run", function () {

        let editor = vscode.window.activeTextEditor;
        if (!editor) { return; }

        let fileUri = editor.document.uri;
        if (!fileUri) { return; }

        const fileExt = path.extname(fileUri.fsPath).toLowerCase();

        if (fileExt !== '.c' && fileExt !== '.cpp' && fileExt !== '.cs') {
            vscode.window.showErrorMessage("No C, C++, C# file found");
            return;
        }
        
        vscode.workspace.saveAll(false);
        const filePath = path.normalize(fileUri.fsPath);
        const fileName = fileUri.path.split("/").pop().split(".")[0];
        let isCmd = false;

        const platform = process.platform;
        if (platform === 'win32') {
            const shell = vscode.env.shell;
            if (shell.includes('cmd.exe'))
                isCmd = true;
        }

        if (isCmd) {
            vscode.window.showInformationMessage("Command Prompt is not recomanded.");
            CompileAndRun_Cmd(filePath, fileName, fileExt);
        }
        else {
            CompileAndRun_Else(filePath, fileName, fileExt);
        }
    }));
}

function deactivate() { }

module.exports = { activate, deactivate };