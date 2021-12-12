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
const path = require("path");
const vscode = require("vscode");
// Gets the config value `clangd.<key>`. Applies ${variable} substitutions.
function get(key) {
    return substitute(vscode.workspace.getConfiguration('clangd').get(key));
}
exports.get = get;
// Like get(), but won't load settings from workspace config unless the user has
// previously explicitly allowed this.
function getSecure(key, workspaceState) {
    var _a;
    const prop = new SecureProperty(key, workspaceState);
    return prop.get((_a = prop.blessed) !== null && _a !== void 0 ? _a : false);
}
exports.getSecure = getSecure;
// Like get(), but won't implicitly load settings from workspace config.
// If there is workspace config, prompts the user and caches the decision.
function getSecureOrPrompt(key, workspaceState) {
    return __awaiter(this, void 0, void 0, function* () {
        const prop = new SecureProperty(key, workspaceState);
        // Common case: value not overridden in workspace.
        if (!prop.mismatched)
            return prop.get(false);
        // Check whether user has blessed or blocked this value.
        const blessed = prop.blessed;
        if (blessed !== undefined)
            return prop.get(blessed);
        // No cached decision for this value, ask the user.
        const Yes = 'Yes, use this setting', No = 'No, use my default', Info = 'More Info';
        switch (yield vscode.window.showWarningMessage(`This workspace wants to set clangd.${key} to ${prop.insecureJSON}.
    \u2029
    This will override your default of ${prop.secureJSON}.`, Yes, No, Info)) {
            case Info:
                vscode.env.openExternal(vscode.Uri.parse('https://github.com/clangd/vscode-clangd/blob/master/docs/settings.md#security'));
                break;
            case Yes:
                yield prop.bless(true);
                return prop.get(true);
            case No:
                yield prop.bless(false);
        }
        return prop.get(false);
    });
}
exports.getSecureOrPrompt = getSecureOrPrompt;
// Sets the config value `clangd.<key>`. Does not apply substitutions.
function update(key, value, target) {
    return vscode.workspace.getConfiguration('clangd').update(key, value, target);
}
exports.update = update;
// Traverse a JSON value, replacing placeholders in all strings.
function substitute(val) {
    if (typeof val === 'string') {
        val = val.replace(/\$\{(.*?)\}/g, (match, name) => {
            var _a;
            // If there's no replacement available, keep the placeholder.
            return (_a = replacement(name)) !== null && _a !== void 0 ? _a : match;
        });
    }
    else if (Array.isArray(val))
        val = val.map((x) => substitute(x));
    else if (typeof val === 'object') {
        // Substitute values but not keys, so we don't deal with collisions.
        const result = {};
        for (let [k, v] of Object.entries(val))
            result[k] = substitute(v);
        val = result;
    }
    return val;
}
// Subset of substitution variables that are most likely to be useful.
// https://code.visualstudio.com/docs/editor/variables-reference
function replacement(name) {
    var _a;
    if (name === 'workspaceRoot' || name === 'workspaceFolder' ||
        name === 'cwd') {
        if (vscode.workspace.rootPath !== undefined)
            return vscode.workspace.rootPath;
        if (vscode.window.activeTextEditor !== undefined)
            return path.dirname(vscode.window.activeTextEditor.document.uri.fsPath);
        return process.cwd();
    }
    const envPrefix = 'env:';
    if (name.startsWith(envPrefix))
        return (_a = process.env[name.substr(envPrefix.length)]) !== null && _a !== void 0 ? _a : '';
    const configPrefix = 'config:';
    if (name.startsWith(configPrefix)) {
        const config = vscode.workspace.getConfiguration().get(name.substr(configPrefix.length));
        return (typeof config === 'string') ? config : undefined;
    }
    return undefined;
}
// Common logic between getSecure and getSecureOrPrompt.
class SecureProperty {
    constructor(key, workspaceState) {
        var _a;
        this.workspaceState = workspaceState;
        const cfg = vscode.workspace.getConfiguration('clangd');
        const inspect = cfg.inspect(key);
        this.secure = (_a = inspect.globalValue) !== null && _a !== void 0 ? _a : inspect.defaultValue;
        this.insecure = cfg.get(key);
        this.secureJSON = JSON.stringify(this.secure);
        this.insecureJSON = JSON.stringify(this.insecure);
        this.blessKey = 'bless.' + key;
    }
    get mismatched() { return this.secureJSON !== this.insecureJSON; }
    get(trusted) {
        return substitute(trusted ? this.insecure : this.secure);
    }
    get blessed() {
        let cache = this.workspaceState.get(this.blessKey);
        if (!cache || cache.json !== this.insecureJSON)
            return undefined;
        return cache.allowed;
    }
    bless(b) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.workspaceState.update(this.blessKey, { json: this.insecureJSON, allowed: b });
        });
    }
}
//# sourceMappingURL=config.js.map