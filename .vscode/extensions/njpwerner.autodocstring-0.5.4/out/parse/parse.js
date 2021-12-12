"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
// import * as vs from "vscode";
function parse(document, positionLine) {
    // vs.window.showErrorMessage("here");
    const definition = _1.getDefinition(document, positionLine);
    // vs.window.showErrorMessage("here2");
    const body = _1.getBody(document, positionLine);
    // vs.window.showErrorMessage("here3");
    const parameterTokens = _1.tokenizeDefinition(definition);
    const functionName = _1.getFunctionName(definition);
    return _1.parseParameters(parameterTokens, body, functionName);
}
exports.parse = parse;
//# sourceMappingURL=parse.js.map