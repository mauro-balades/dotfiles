"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const os = require("os");
const path = require("path");
const vscode = require("vscode");
/**
 * @returns The path that corresponds to llvm::sys::path::user_config_directory.
 */
function getUserConfigDirectory() {
    switch (os.platform()) {
        case 'win32':
            if (process.env.LocalAppData)
                return process.env.LocalAppData;
            break;
        case 'darwin':
            if (process.env.HOME)
                return path.join(process.env.HOME, 'Library', 'Preferences');
            break;
        default:
            if (process.env.XDG_CONFIG_HOME)
                return process.env.XDG_CONFIG_HOME;
            if (process.env.HOME)
                return path.join(process.env.HOME, '.config');
            break;
    }
    return undefined;
}
function getUserConfigFile() {
    const dir = getUserConfigDirectory();
    if (!dir)
        return undefined;
    return path.join(dir, 'clangd', 'config.yaml');
}
function openConfigFile(path) {
    return __awaiter(this, void 0, void 0, function* () {
        let p = path;
        try {
            yield vscode.workspace.fs.stat(path);
        }
        catch (_a) {
            // File doesn't exist, create a scratch file.
            p = path.with({ scheme: 'untitled' });
        }
        vscode.workspace.openTextDocument(p).then((a => {
            vscode.languages.setTextDocumentLanguage(a, 'yaml');
            vscode.window.showTextDocument(a);
        }));
    });
}
function activate(context) {
    // Create a command to open the project root .clangd configuration file.
    context.subscriptions.push(vscode.commands.registerCommand('clangd.projectConfig', () => {
        var _a;
        if ((_a = vscode.workspace.workspaceFolders) === null || _a === void 0 ? void 0 : _a.length) {
            const folder = vscode.workspace.workspaceFolders[0];
            openConfigFile(vscode.Uri.joinPath(folder.uri, '.clangd'));
        }
        else {
            vscode.window.showErrorMessage('No project is open');
        }
    }));
    context.subscriptions.push(vscode.commands.registerCommand('clangd.userConfig', () => {
        const file = getUserConfigFile();
        if (file) {
            openConfigFile(vscode.Uri.file(file));
        }
        else {
            vscode.window.showErrorMessage('Couldn\'t get global configuration directory');
        }
    }));
}
exports.activate = activate;
//# sourceMappingURL=open-config.js.map