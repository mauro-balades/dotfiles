"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const vs = require("vscode");
const docstring_factory_1 = require("./docstring/docstring_factory");
const get_template_1 = require("./docstring/get_template");
const parse_1 = require("./parse");
const constants_1 = require("./constants");
const logger_1 = require("./logger");
class AutoDocstring {
    constructor(editor) {
        this.editor = editor;
    }
    generateDocstring() {
        if (this.editor == undefined) {
            throw new Error("Cannot process this document. It is either too large or is not yet supported.");
        }
        const position = this.editor.selection.active;
        const document = this.editor.document.getText();
        logger_1.logInfo(`Generating Docstring at line: ${position.line}`);
        const docstringSnippet = this.generateDocstringSnippet(document, position);
        logger_1.logInfo(`Docstring generated:\n${docstringSnippet.value}`);
        const insertPosition = position.with(undefined, 0);
        logger_1.logInfo(`Inserting at position: ${insertPosition.line} ${insertPosition.character}`);
        const success = this.editor.insertSnippet(docstringSnippet, insertPosition);
        success.then(() => logger_1.logInfo("Successfully inserted docstring"), (reason) => {
            throw new Error("Could not insert docstring: " + reason.toString());
        });
        return success;
    }
    generateDocstringSnippet(document, position) {
        const config = this.getConfig();
        const docstringFactory = new docstring_factory_1.DocstringFactory(this.getTemplate(), config.get("quoteStyle").toString(), config.get("startOnNewLine") === true, config.get("includeExtendedSummary") === true, config.get("includeName") === true, config.get("guessTypes") === true);
        const docstringParts = parse_1.parse(document, position.line);
        const defaultIndentation = parse_1.getDefaultIndentation(this.editor.options.insertSpaces, this.editor.options.tabSize);
        const indentation = parse_1.getDocstringIndentation(document, position.line, defaultIndentation);
        const docstring = docstringFactory.generateDocstring(docstringParts, indentation);
        return new vs.SnippetString(docstring);
    }
    getTemplate() {
        const config = this.getConfig();
        let customTemplatePath = config.get("customTemplatePath").toString();
        if (customTemplatePath === "") {
            const docstringFormat = config.get("docstringFormat").toString();
            return get_template_1.getTemplate(docstringFormat);
        }
        if (!path.isAbsolute(customTemplatePath)) {
            customTemplatePath = path.join(vs.workspace.rootPath, customTemplatePath);
        }
        return get_template_1.getCustomTemplate(customTemplatePath);
    }
    getConfig() {
        return vs.workspace.getConfiguration(constants_1.extensionID);
    }
}
exports.AutoDocstring = AutoDocstring;
//# sourceMappingURL=generate_docstring.js.map