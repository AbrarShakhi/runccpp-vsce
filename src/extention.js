'use strict';
const vscode = require("vscode");
const path = require("path");

// let statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right);
// statusBarItem.text = "$(play)";
// statusBarItem.tooltip = "Run C/C++/C# file";
// statusBarItem.command = "abrar-runccpp.run";
// statusBarItem.color = "black";

/**
 * @param {vscode.ExtensionContext} context
 */

function activate(context) {
    // statusBarItem.show();

    let runCCpp = vscode.commands.registerCommand("abrar-runccpp.run", function () {

        let editor = vscode.window.activeTextEditor;
        if (!editor) { return; }

        let fileUri = editor.document.uri;
        if (!fileUri) { return; }

        const fileExt = path.extname(fileUri.fsPath).toLowerCase();
        vscode.workspace.saveAll(false);

        if (fileExt === '.c') {
            const filePath = path.normalize(fileUri.fsPath);
            const fileName = fileUri.path.split("/").pop().split(".")[0];
            let terminal = vscode.window.createTerminal("Run C/C++/C#");
            terminal.show();
            terminal.sendText(`cd "${filePath.substring(0, filePath.lastIndexOf("\\"))}";`);
            terminal.sendText(`gcc "${filePath}" -o "${fileName}"; ./"${fileName}";`);
        }
        else if (fileExt === '.cpp') {
            const filePath = path.normalize(fileUri.fsPath);
            const fileName = fileUri.path.split("/").pop().split(".")[0];
            let terminal = vscode.window.createTerminal("Run C/C++/C#");
            terminal.show();
            terminal.sendText(`cd "${filePath.substring(0, filePath.lastIndexOf("\\"))}";`);
            terminal.sendText(`g++ "${filePath}" -o "${fileName}"; ./"${fileName}";`);
        }
        else if (fileExt === '.cs') {
            const filePath = path.normalize(fileUri.fsPath);
            let terminal = vscode.window.createTerminal("Run C/C++/C#");
            terminal.show();
            terminal.sendText(`cd "${filePath.substring(0, filePath.lastIndexOf("\\"))}";`);
            terminal.sendText(`dotnet run;`);
        }
        else {
            vscode.window.showInformationMessage("No C/C++/C# file found");
        }
    });

    context.subscriptions.push(runCCpp);
    // context.subscriptions.push(statusBarItem);
}

function deactivate() {
    // statusBarItem.dispose();
}

module.exports = {
    activate,
    deactivate
};
