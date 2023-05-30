'use strict';
const vscode = require("vscode");
const path = require("path");

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
        vscode.workspace.saveAll(false);

        if (fileExt === '.c') {
            const filePath = path.normalize(fileUri.fsPath);
            const fileName = fileUri.path.split("/").pop().split(".")[0];
            let terminal = vscode.window.createTerminal("C /Compile and run");
            terminal.show();
            terminal.sendText(`cd "${filePath.substring(0, filePath.lastIndexOf("\\"))}";`);
            terminal.sendText(`gcc "${filePath}" -o "${fileName}"; ./"${fileName}";`);
        }
        else if (fileExt === '.cpp') {
            const filePath = path.normalize(fileUri.fsPath);
            const fileName = fileUri.path.split("/").pop().split(".")[0];
            let terminal = vscode.window.createTerminal("C++ /Compile and run");
            terminal.show();
            terminal.sendText(`cd "${filePath.substring(0, filePath.lastIndexOf("\\"))}";`);
            terminal.sendText(`g++ "${filePath}" -o "${fileName}"; ./"${fileName}";`);
        }
        else if (fileExt === '.cs') {
            const filePath = path.normalize(fileUri.fsPath);
            let terminal = vscode.window.createTerminal("C# /Compile and run");
            terminal.show();
            terminal.sendText(`cd "${filePath.substring(0, filePath.lastIndexOf("\\"))}";`);
            terminal.sendText(`dotnet run;`);
        }
        else vscode.window.showErrorMessage("No C, C++, C# file found");
    }));
}

function deactivate() { }

module.exports = { activate, deactivate };
