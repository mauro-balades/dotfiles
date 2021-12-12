"use strict";
// This file implements the client side of the proposed inlay hints
// extension to LSP. The proposal is based on the one at
// https://github.com/microsoft/language-server-protocol/issues/956,
// with some modifications that reflect discussions in that issue.
// The feature allows the server to provide the client with inline
// annotations to display for e.g. parameter names at call sites.
// The client-side implementation is adapted from rust-analyzer's.
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
const vscode = require("vscode");
const vscodelc = require("vscode-languageclient/node");
const clangd_context_1 = require("./clangd-context");
function activate(context) {
    const feature = new InlayHintsFeature(context);
    context.client.registerFeature(feature);
}
exports.activate = activate;
// Currently, only one hint kind (parameter hints) are supported,
// but others (e.g. type hints) may be added in the future.
var InlayHintKind;
(function (InlayHintKind) {
    InlayHintKind["Parameter"] = "parameter";
    InlayHintKind["Type"] = "type";
})(InlayHintKind || (InlayHintKind = {}));
var InlayHintsRequest;
(function (InlayHintsRequest) {
    InlayHintsRequest.type = new vscodelc.RequestType('clangd/inlayHints');
})(InlayHintsRequest || (InlayHintsRequest = {}));
const parameterHintStyle = createHintStyle('before');
const typeHintStyle = createHintStyle('after');
function createHintStyle(position) {
    const fg = new vscode.ThemeColor('clangd.inlayHints.foreground');
    const bg = new vscode.ThemeColor('clangd.inlayHints.background');
    return {
        decorationType: vscode.window.createTextEditorDecorationType({
            [position]: {
                color: fg,
                backgroundColor: bg,
                fontStyle: 'normal',
                fontWeight: 'normal',
                textDecoration: ';font-size:smaller'
            }
        }),
        toDecoration(hint, conv) {
            return {
                range: conv.asRange(hint.range),
                renderOptions: { [position]: { contentText: hint.label } }
            };
        }
    };
}
class InlayHintsFeature {
    constructor(context) {
        this.context = context;
        this.enabled = false;
        this.sourceFiles = new Map(); // keys are URIs
        this.disposables = [];
    }
    fillClientCapabilities(_capabilities) { }
    fillInitializeParams(_params) { }
    initialize(capabilities, _documentSelector) {
        const serverCapabilities = capabilities;
        if (serverCapabilities.clangdInlayHintsProvider) {
            this.enabled = true;
            this.startShowingHints();
        }
    }
    onDidChangeVisibleTextEditors() {
        if (!this.enabled)
            return;
        const newSourceFiles = new Map();
        // Rerender all, even up-to-date editors for simplicity
        this.context.visibleClangdEditors.forEach((editor) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const uri = editor.document.uri.toString();
            const file = (_a = this.sourceFiles.get(uri)) !== null && _a !== void 0 ? _a : {
                document: editor.document,
                cachedDecorations: null,
                inlaysRequest: null
            };
            newSourceFiles.set(uri, file);
            // No text documents changed, so we may try to use the cache
            if (!file.cachedDecorations) {
                const hints = yield this.fetchHints(file);
                if (!hints)
                    return;
                file.cachedDecorations = this.hintsToDecorations(hints);
            }
            this.renderDecorations(editor, file.cachedDecorations);
        }));
        // Cancel requests for no longer visible (disposed) source files
        this.sourceFiles.forEach((file, uri) => {
            var _a;
            if (!newSourceFiles.has(uri)) {
                (_a = file.inlaysRequest) === null || _a === void 0 ? void 0 : _a.cancel();
            }
        });
        this.sourceFiles = newSourceFiles;
    }
    onDidChangeTextDocument({ contentChanges, document }) {
        if (!this.enabled || contentChanges.length === 0 ||
            !clangd_context_1.isClangdDocument(document))
            return;
        this.syncCacheAndRenderHints();
    }
    dispose() { this.stopShowingHints(); }
    startShowingHints() {
        vscode.window.onDidChangeVisibleTextEditors(this.onDidChangeVisibleTextEditors, this, this.disposables);
        vscode.workspace.onDidChangeTextDocument(this.onDidChangeTextDocument, this, this.disposables);
        // Set up initial cache shape
        this.context.visibleClangdEditors.forEach(editor => this.sourceFiles.set(editor.document.uri.toString(), {
            document: editor.document,
            inlaysRequest: null,
            cachedDecorations: null
        }));
        this.syncCacheAndRenderHints();
    }
    stopShowingHints() {
        this.sourceFiles.forEach(file => { var _a; return (_a = file.inlaysRequest) === null || _a === void 0 ? void 0 : _a.cancel(); });
        this.context.visibleClangdEditors.forEach(editor => this.renderDecorations(editor, { parameterHints: [], typeHints: [] }));
        this.disposables.forEach(d => d.dispose());
    }
    renderDecorations(editor, decorations) {
        editor.setDecorations(parameterHintStyle.decorationType, decorations.parameterHints);
        editor.setDecorations(typeHintStyle.decorationType, decorations.typeHints);
    }
    syncCacheAndRenderHints() {
        this.sourceFiles.forEach((file, uri) => this.fetchHints(file).then(hints => {
            if (!hints)
                return;
            file.cachedDecorations = this.hintsToDecorations(hints);
            for (const editor of this.context.visibleClangdEditors) {
                if (editor.document.uri.toString() == uri) {
                    this.renderDecorations(editor, file.cachedDecorations);
                }
            }
        }));
    }
    hintsToDecorations(hints) {
        const decorations = { parameterHints: [], typeHints: [] };
        const conv = this.context.client.protocol2CodeConverter;
        for (const hint of hints) {
            switch (hint.kind) {
                case InlayHintKind.Parameter: {
                    decorations.parameterHints.push(parameterHintStyle.toDecoration(hint, conv));
                    continue;
                }
                case InlayHintKind.Type: {
                    decorations.typeHints.push(typeHintStyle.toDecoration(hint, conv));
                    continue;
                }
                // Don't handle unknown hint kinds because we don't know how to style
                // them. This may change in a future version of the protocol.
            }
        }
        return decorations;
    }
    fetchHints(file) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            (_a = file.inlaysRequest) === null || _a === void 0 ? void 0 : _a.cancel();
            const tokenSource = new vscode.CancellationTokenSource();
            file.inlaysRequest = tokenSource;
            const request = { textDocument: { uri: file.document.uri.toString() } };
            return this.context.client.sendRequest(InlayHintsRequest.type, request, tokenSource.token);
        });
    }
}
//# sourceMappingURL=inlay-hints.js.map