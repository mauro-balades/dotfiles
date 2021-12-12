"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utilities_1 = require("./utilities");
function getDocstring(document, lineNum) {
    const lines = document.split(/\r?\n/);
    const startIndex = getDocstringStartIndex(lines, lineNum);
    const endIndex = getDocstringEndIndex(lines, lineNum);
    if (startIndex == undefined || endIndex == undefined) {
        return [];
    }
    let docstringLines = lines.slice(startIndex, endIndex + 1);
    docstringLines = normalizeDocstringIndentation(docstringLines);
    docstringLines = removeDocstringQuotes(docstringLines);
    return docstringLines;
}
exports.getDocstring = getDocstring;
function getDocstringStartIndex(lines, lineNum) {
    const docstringStartPattern = /^\s*("""|''')/;
    if (lineNum == 0) {
        return 0;
    }
    // If the starting line contains only docstring quotes and the previous
    // line is not the function definition we can assume that we are at the
    // end quotes of the docstring and should shift our position back 1
    if (isOnlyDocstringQuotes(lines[lineNum]) && !isFunctionDefinition(lines[lineNum - 1])) {
        lineNum -= 1;
    }
    while (lineNum >= 0) {
        const line = lines[lineNum];
        if (docstringStartPattern.test(line)) {
            return lineNum;
        }
        lineNum--;
    }
    return undefined;
}
function getDocstringEndIndex(lines, lineNum) {
    const docstringEndPattern = /("""|''')\s*$/;
    if (lineNum >= lines.length - 1) {
        return lineNum;
    }
    // If the starting line contains only docstring quotes and the previous
    // line is the function definition we can assume that we are at the
    // start quotes of the docstring and should shift our position forward 1
    if (isOnlyDocstringQuotes(lines[lineNum]) && isFunctionDefinition(lines[lineNum - 1])) {
        lineNum += 1;
    }
    while (lineNum < lines.length) {
        const line = lines[lineNum];
        if (docstringEndPattern.test(line)) {
            return lineNum;
        }
        lineNum++;
    }
    return undefined;
}
/** Line contains only a docstring opening or closing quotes */
function isOnlyDocstringQuotes(line) {
    return /^\s*("""|''')\s*$/.test(line);
}
/** Line contains the last part of a function definition */
function isFunctionDefinition(line) {
    return /(:|(?=[#'"\n]))/.test(line);
}
/** Removes docstring block indentation while keeping relative internal
 * documentation consistent
 */
function normalizeDocstringIndentation(lines) {
    const indentationPattern = /^\s*/;
    let minimumIndentation = " ".repeat(50);
    for (const line of lines) {
        if (utilities_1.blankLine(line)) {
            continue;
        }
        const match = indentationPattern.exec(line);
        if (match[0].length < minimumIndentation.length) {
            minimumIndentation = match[0];
        }
    }
    const minimumIndentationPattern = new RegExp("^" + minimumIndentation);
    lines = lines.map((line) => line.replace(minimumIndentationPattern, ""));
    return lines;
}
/** Remove opening and closing docstring quotes */
function removeDocstringQuotes(lines) {
    lines = lines.map((line) => line.replace(/^\s*("""|''')/, ""));
    lines = lines.map((line) => line.replace(/("""|''')\s*$/, ""));
    return lines;
}
//# sourceMappingURL=get_docstring.js.map