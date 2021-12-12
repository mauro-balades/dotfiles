"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
function getTemplate(docstringFormat) {
    switch (docstringFormat) {
        case "google":
            return getTemplateFile("google.mustache");
        case "sphinx":
            return getTemplateFile("sphinx.mustache");
        case "numpy":
            return getTemplateFile("numpy.mustache");
        default:
            return getTemplateFile("default.mustache");
    }
}
exports.getTemplate = getTemplate;
// TODO: handle error case
function getCustomTemplate(templateFilePath) {
    return fs_1.readFileSync(templateFilePath, "utf8");
}
exports.getCustomTemplate = getCustomTemplate;
function getTemplateFile(fileName) {
    const filePath = __dirname + "/templates/" + fileName;
    return fs_1.readFileSync(filePath, "utf8");
}
//# sourceMappingURL=get_template.js.map