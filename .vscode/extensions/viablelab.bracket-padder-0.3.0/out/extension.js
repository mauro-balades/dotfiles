'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const vsc = require("vscode");
const smartActions_1 = require("./smartActions");
function activate(context) {
    const disposables = [
        vsc.workspace.onDidChangeTextDocument(event => {
            try {
                const change = event.contentChanges[0];
                if (change.rangeLength === 0 && change.text === ' ') {
                    smartActions_1.smartSpace(change);
                    return;
                }
                if (change.rangeLength === 1 && change.text === '') {
                    smartActions_1.smartBackspace(change);
                    return;
                }
                smartActions_1.smartClose(change);
            }
            catch (err) {
                // Ignore
            }
        }),
    ];
    context.subscriptions.concat(disposables);
}
exports.activate = activate;
function deactivate() {
    // ..
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map