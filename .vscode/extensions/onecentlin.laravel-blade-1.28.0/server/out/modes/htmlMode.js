/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHTMLMode = void 0;
var languageModelCache_1 = require("../languageModelCache");
var vscode_html_languageservice_1 = require("vscode-html-languageservice");
function getHTMLMode(htmlLanguageService) {
    var globalSettings = {};
    var htmlDocuments = languageModelCache_1.getLanguageModelCache(10, 60, function (document) { return htmlLanguageService.parseHTMLDocument(document); });
    var completionParticipants = [];
    return {
        getId: function () {
            return 'html';
        },
        configure: function (options) {
            globalSettings = options;
        },
        doComplete: function (document, position, settings) {
            if (settings === void 0) { settings = globalSettings; }
            var options = settings && settings.html && settings.html.suggest;
            var doAutoComplete = settings && settings.html && settings.html.autoClosingTags;
            if (doAutoComplete) {
                options.hideAutoCompleteProposals = true;
            }
            var htmlDocument = htmlDocuments.get(document);
            var offset = document.offsetAt(position);
            var node = htmlDocument.findNodeBefore(offset);
            var scanner = htmlLanguageService.createScanner(document.getText(), node.start);
            var token = scanner.scan();
            while (token !== vscode_html_languageservice_1.TokenType.EOS && scanner.getTokenOffset() <= offset) {
                if (token === vscode_html_languageservice_1.TokenType.Content && offset <= scanner.getTokenEnd()) {
                    completionParticipants.forEach(function (participant) { if (participant.onHtmlContent) {
                        participant.onHtmlContent();
                    } });
                    break;
                }
                token = scanner.scan();
            }
            return htmlLanguageService.doComplete(document, position, htmlDocument, options);
        },
        setCompletionParticipants: function (registeredCompletionParticipants) {
            completionParticipants = registeredCompletionParticipants;
        },
        doHover: function (document, position) {
            return htmlLanguageService.doHover(document, position, htmlDocuments.get(document));
        },
        findDocumentHighlight: function (document, position) {
            return htmlLanguageService.findDocumentHighlights(document, position, htmlDocuments.get(document));
        },
        findDocumentLinks: function (document, documentContext) {
            return htmlLanguageService.findDocumentLinks(document, documentContext);
        },
        findDocumentSymbols: function (document) {
            return htmlLanguageService.findDocumentSymbols(document, htmlDocuments.get(document));
        },
        format: function (document, range, formatParams, settings) {
            if (settings === void 0) { settings = globalSettings; }
            var formatSettings = settings && settings.html && settings.html.format;
            if (formatSettings) {
                formatSettings = merge(formatSettings, {});
            }
            else {
                formatSettings = {};
            }
            if (formatSettings.contentUnformatted) {
                formatSettings.contentUnformatted = formatSettings.contentUnformatted + ',script';
            }
            else {
                formatSettings.contentUnformatted = 'script';
            }
            formatSettings = merge(formatParams, formatSettings);
            return htmlLanguageService.format(document, range, formatSettings);
        },
        doAutoClose: function (document, position) {
            var offset = document.offsetAt(position);
            var text = document.getText();
            if (offset > 0 && text.charAt(offset - 1).match(/[>\/]/g)) {
                return htmlLanguageService.doTagComplete(document, position, htmlDocuments.get(document));
            }
            return null;
        },
        onDocumentRemoved: function (document) {
            htmlDocuments.onDocumentRemoved(document);
        },
        dispose: function () {
            htmlDocuments.dispose();
        }
    };
}
exports.getHTMLMode = getHTMLMode;
function merge(src, dst) {
    for (var key in src) {
        if (src.hasOwnProperty(key)) {
            dst[key] = src[key];
        }
    }
    return dst;
}
