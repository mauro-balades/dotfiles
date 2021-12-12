'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const nimUtils_1 = require("./nimUtils");
const nimSuggestExec_1 = require("./nimSuggestExec");
class NimRenameProvider {
    provideRenameEdits(document, position, newName, token) {
        return new Promise((resolve, reject) => {
            vscode.workspace.saveAll(false).then(() => {
                nimSuggestExec_1.execNimSuggest(nimSuggestExec_1.NimSuggestType.use, document.fileName, position.line + 1, position.character, nimUtils_1.getDirtyFile(document))
                    .then(result => {
                    var references = new vscode.WorkspaceEdit();
                    if (result) {
                        result.forEach(item => {
                            let endPosition = new vscode.Position(item.range.end.line, item.range.end.character + item.symbolName.length);
                            references.replace(item.uri, new vscode.Range(item.range.start, endPosition), newName);
                        });
                        resolve(references);
                    }
                    else {
                        resolve();
                    }
                })
                    .catch(reason => reject(reason));
            });
        });
    }
}
exports.NimRenameProvider = NimRenameProvider;
//# sourceMappingURL=nimRename.js.map