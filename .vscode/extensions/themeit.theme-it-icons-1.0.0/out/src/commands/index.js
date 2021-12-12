'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.commands = void 0;
const vscode = require("vscode");
const folderArrows_1 = require("./folderArrows");
// Toggle the arrows near the folder icons
const hidesExplorerArrowsCommand = vscode.commands.registerCommand('theme-it-icons-vsc.hidesExplorerArrows', () => {
    folderArrows_1.toggleFolderArrows();
});
exports.commands = [
    hidesExplorerArrowsCommand
];
//# sourceMappingURL=index.js.map