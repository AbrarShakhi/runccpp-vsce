'use strict';
const vscode = require('vscode');
const path = require('path');


function getTerminal() {
    const terminalName = "Compile and run";
    const terminals = vscode.window.terminals;
    for (let i = 0; i < terminals.length; i++)
        if (terminals[i].name === terminalName)
            return terminals[i];
    return vscode.window.createTerminal(terminalName);
}

const cCompiler = "gcc"
const cppCompiler = "g++"
const javaCompiler = "javac"
const pythonCompiler = "python"
const cSharpCompiler = "dotnet"

/**
 * @param {string} fPath
 * @param {string} fName
 * @param {string} fExt
 */
function CompileAndRun_Cmd(fPath, fName, fExt) {
    if (fExt !== '.c' && fExt !== '.cpp'
        && fExt !== '.cs' && fExt !== '.java'
        && fExt !== '.py') {
        vscode.window.showErrorMessage("No C, C++, java, python, C# file found");
        return;
    }

    const terminal = getTerminal();

    const location = fPath.substring(0, fPath.lastIndexOf("\\"));

    terminal.show();
    terminal.sendText('cls');
    terminal.sendText(`cd "${location}"`);

    if (fExt === '.c') {
        terminal.sendText(`${cCompiler} "${fPath}" -o "${fName}"`);
        terminal.sendText(`"${fName}"`);
    } else if (fExt === '.cpp') {
        terminal.sendText(`${cppCompiler} "${fPath}" -o "${fName}"`);
        terminal.sendText(`"${fName}"`);
    } else if (fExt === '.cs') {
        terminal.sendText(`${cSharpCompiler} run`)
    } else if (fExt === '.java') {
        terminal.sendText(`${javaCompiler} "${fPath}"`);
        terminal.sendText(`java "${fName}"`);
    } else if (fExt === '.py') {
        terminal.sendText(`${pythonCompiler} "${fPath}"`);
    }
}


/**
 * @param {string} fPath
 * @param {string} fName
 * @param {string} fExt
 */
function CompileAndRun_Else(fPath, fName, fExt) {
    const location = fPath.substring(0, fPath.lastIndexOf("\\"));

    let runCommand = `cd "${location}"; `;

    if (fExt === '.c') {
        runCommand = runCommand + `clear; ${cCompiler} "${fPath}" -o "${fName}"; ./"${fName}"`;
    } else if (fExt === '.cpp') {
        runCommand = runCommand + `clear; ${cppCompiler} "${fPath}" -o "${fName}"; ./"${fName}"`;
    } else if (fExt === '.cs') {
        runCommand = runCommand + `clear; ${cSharpCompiler} run`;
    } else if (fExt === '.java') {
        runCommand = runCommand + `clear; ${javaCompiler} "${fPath}"; java "${fName}"`;
    } else if (fExt === '.py') {
        runCommand = runCommand + `clear; ${pythonCompiler} "${fPath}"`;
    } else {
        vscode.window.showErrorMessage("No C, C++, java, python, C# file found");
        return;
    }

    const terminal = getTerminal();
    terminal.show();
    terminal.sendText('');
    terminal.sendText(runCommand);
}


/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

    context.subscriptions.push(vscode.commands.registerCommand("abrar-runccpp.run", function () {

        let editor = vscode.window.activeTextEditor;
        let fileUri = editor.document.uri;
        if (!editor || !fileUri) { return; }

        const fileExt = path.extname(fileUri.fsPath).toLowerCase();

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


module.exports = {
    activate,
    deactivate
}