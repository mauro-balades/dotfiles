"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isThemeActivated = exports.promptToReload = exports.getCityLightsIconJSON = exports.getExtensionPath = exports.setThemeConfig = exports.getThemeConfig = exports.setConfig = exports.getConfig = exports.getExtensionConfiguration = void 0;
const vscode = require("vscode");
const path = require("path");
const fs = require("fs");
const reload_1 = require("../messages/reload");
/** Get list of configuration entries of package.json */
exports.getExtensionConfiguration = () => {
    return vscode.extensions.getExtension('theme-it.theme-it-icon-vsc').packageJSON.contributes.configuration.properties;
};
/** Get configuration of vs code */
exports.getConfig = (section) => {
    return vscode.workspace.getConfiguration(section);
};
/** Update configuration of vs code. */
exports.setConfig = (section, value, global = false) => {
    return exports.getConfig().update(section, value, global);
};
/** Get the config of the theme */
exports.getThemeConfig = (section) => {
    return exports.getConfig('theme-it-icons-vsc').inspect(section);
};
/** Update the config of the theme */
exports.setThemeConfig = (section, value, global = false) => {
    return exports.getConfig('theme-it-icons-vsc').update(section, value, global);
};
/** Return the path of the extension in the file system */
exports.getExtensionPath = () => path.join(__dirname, '..', '..');
/** Get the configuration of the icons as JSON Object */
exports.getCityLightsIconJSON = () => {
    return new Promise((resolve, reject) => {
        const iconJSONPath = path.join(__dirname, '../../../icons/theme-it-icon-theme.json');
        fs.readFile(iconJSONPath, 'utf8', (err, data) => {
            if (err)
                reject(err);
            resolve(JSON.parse(data));
        });
    });
};
/** Reload vs code window */
exports.promptToReload = () => {
    return reload_1.showConfirmToReloadMessage().then(result => {
        if (result)
            reloadWindow();
    });
};
const reloadWindow = () => {
    return vscode.commands.executeCommand('workbench.action.reloadWindow');
};
/**
 * Is the theme already activated in the editor configuration?
 * @param{boolean} global false by default
 */
exports.isThemeActivated = (global = false) => {
    return global ? (exports.getConfig().inspect('workbench.iconTheme').globalValue === 'theme-it-icon-vsc-light' || exports.getConfig().inspect('workbench.iconTheme').globalValue === 'theme-it-icon-vsc')
        : (exports.getConfig().inspect('workbench.iconTheme').workspaceValue === 'theme-it-icon-vsc-light' || exports.getConfig().inspect('workbench.iconTheme').globalValue === 'theme-it-icon-vsc');
};
//# sourceMappingURL=index.js.map