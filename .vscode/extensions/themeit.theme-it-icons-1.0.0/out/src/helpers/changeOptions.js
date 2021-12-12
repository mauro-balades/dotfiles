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
exports.changeOptions = void 0;
const fs = require("fs");
const path = require("path");
const merge = require("lodash.merge");
const bb = require("bluebird");
exports.changeOptions = (updatedConfigs, updatedJSONConfig) => __awaiter(void 0, void 0, void 0, function* () {
    const jsonFiles = ['theme-it-icon-theme-light', 'theme-it-icon-theme']
        .map(name => path.join(__dirname, `../../../icons/${name}.json`));
    jsonFiles.forEach(file => {
        bb.promisify(fs.readFile)(file)
            .then(data => JSON.parse(data.toString()))
            .then(json => {
            const options = merge({}, json, updatedJSONConfig, { options: updatedJSONConfig });
            return JSON.stringify(options, undefined, 2);
        }).then(jsonString => bb.promisify(fs.writeFile)(file, jsonString));
    });
});
//# sourceMappingURL=changeOptions.js.map