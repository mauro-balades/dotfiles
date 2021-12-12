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
exports.checkThemeStatus = exports.ThemeStatus = void 0;
const semver = require("semver");
const vscode = require("vscode");
const helpers = require("./index");
var ThemeStatus;
(function (ThemeStatus) {
    ThemeStatus[ThemeStatus["neverUsedBefore"] = 0] = "neverUsedBefore";
    ThemeStatus[ThemeStatus["updated"] = 1] = "updated";
    ThemeStatus[ThemeStatus["current"] = 2] = "current";
})(ThemeStatus = exports.ThemeStatus || (exports.ThemeStatus = {}));
/** Check the current status of the theme */
exports.checkThemeStatus = (state) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // get the version from the state
        const stateVersion = yield state.get('theme-it-icon-vsc.version');
        const packageVersion = getCurrentExtensionVersion();
        // check if the theme was used before
        if (stateVersion === undefined) {
            yield updateExtensionVersionInMemento(state);
            return themeIsAlreadyActivated() ? ThemeStatus.updated : ThemeStatus.neverUsedBefore;
        }
        // compare the version in the state with the package version
        else if (semver.lt(stateVersion, packageVersion)) {
            yield updateExtensionVersionInMemento(state);
            return ThemeStatus.updated;
        }
        else {
            return ThemeStatus.current;
        }
    }
    catch (err) {
        console.log(err);
    }
});
/** Check if the theme was used before */
const themeIsAlreadyActivated = () => {
    return helpers.isThemeActivated() || helpers.isThemeActivated(true);
};
/** Update the version number to the current version in the memento. */
const updateExtensionVersionInMemento = (state) => __awaiter(void 0, void 0, void 0, function* () {
    return yield state.update('theme-it-icon-vsc.version', getCurrentExtensionVersion());
});
/** Get the current version of the extension */
const getCurrentExtensionVersion = () => {
    return vscode.extensions.getExtension('theme-it.theme-it-icon-vsc').packageJSON.version;
};
//# sourceMappingURL=versioning.js.map