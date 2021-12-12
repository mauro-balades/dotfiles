"use strict";
var vscode = require('vscode');
function activate(context) {
    context.subscriptions.push(new LineTrimmer());
}
exports.activate = activate;
function deactivate() {
}
exports.deactivate = deactivate;
var LineTrimmer = (function () {
    function LineTrimmer() {
        this._lines = new WeakMap();
        this._disposable = vscode.window.onDidChangeTextEditorSelection(this.onChangeSelection, this);
    }
    LineTrimmer.prototype.onChangeSelection = function (e) {
        var editor = vscode.window.activeTextEditor;
        var doc = editor.document;
        var lines = new Set(e.selections.map(function (sel) { return sel.active.line; }));
        var previousLines = this._lines.get(doc);
        if (previousLines) {
            previousLines.forEach(function (lineNum) {
                if (!lines.has(lineNum) && doc.lineCount > lineNum) {
                    var line_1 = doc.lineAt(lineNum);
                    if (!line_1) {
                        return;
                    }
                    if (doc.languageId === 'markdown' && line_1.text.match(/[^ ]  $/)) {
                        return;
                    }
                    var text_1 = line_1.isEmptyOrWhitespace ? '' :
                        line_1.text.replace(/[ \t]+$/, '');
                    if (line_1.text !== text_1) {
                        editor.edit(function (ed) { return ed.replace(line_1.range, text_1); });
                    }
                }
            });
        }
        this._lines.set(doc, lines);
    };
    LineTrimmer.prototype.dispose = function () {
        this._disposable.dispose();
    };
    return LineTrimmer;
}());
//# sourceMappingURL=extension.js.map