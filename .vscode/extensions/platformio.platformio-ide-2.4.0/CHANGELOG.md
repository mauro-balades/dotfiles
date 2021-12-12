# Release Notes

## 2.4.0 (2021-11-05)

**Requires VSCode 1.57 or above**

- Added named status bars: "PlatformIO: Toolbar" and "PlatformIO: Project Environment Switcher" (ability to hide them separately) (issue [#2593](https://github.com/platformio/platformio-vscode-ide/issues/2593))
- Added "Verbose Check" project task
- Synchronize VSCode workspaces with PlatformIO Home Projects (requires PlatformIO Core 5.2.3 or above) (issue [#1367](https://github.com/platformio/platformio-vscode-ide/issues/1367))
- Automatically switch to newly created project's environment (issue [#2414](https://github.com/platformio/platformio-vscode-ide/issues/2414))
- Fixed an issue when "Copy to Clipboard" does not work in PlatformIO Home on macOS (requires PlatformIO Core 5.2.3 or above) (issue [#2570](https://github.com/platformio/platformio-vscode-ide/issues/2570))
- PlatformIO IDE Installer
  * Updated installer script to 1.1.0
  * Check global PlatformIO Core installation when built-in is disabled
  * Handle "Could not find distutils module" error on Linux
  * Rebuild project IDE configuration on "platformio.ini" change

## 2.3.4 (2021-10-19)

- Start debugging without firmware uploading using a new ``loadMode`` launch option (see docs for [debug_load_mode](https://docs.platformio.org/en/latest/projectconf/section_env_debug.html#debug-load-mode) for more details).
- PlatformIO IDE Installer
  * Ask the user to install Python manually if the portable version does not work
  * Check compatible Python using the installer script
  * Use pre-built Python 3.7 for Windows 7 and below

## 2.3.3 (2021-08-14)

- Updated PlatformIO Core installer to v1.0.3 ([changes](https://github.com/platformio/platformio-core-installer/releases/tag/v1.0.3)):
  * Fix a bug with "OSError / WinError" when looking for a compatible Python
  * Fixed "UnboundLocalError"

## 2.3.2 (2021-04-13)

- Added a new setting ``platformio-ide.pioHomeServerHttpHost`` to set a custom host for PlatformIO Home (useful for dockerized environments) (issue [#2465](https://github.com/platformio/platformio-vscode-ide/issues/2465))
- Updated PlatformIO Core installer to v1.0.2 ([changes](https://github.com/platformio/platformio-core-installer/releases/tag/v1.0.2)):
  * Do not raise an exception when checking PlatformIO Core for updates and the Internet is off-line (issue [#2398](https://github.com/platformio/platformio-vscode-ide/issues/2398))

## 2.3.1 (2021-03-23)

- Added a new setting ``platformio-ide.autoOpenPlatformIOIniFile`` to control an automatic opening of the `platformio.ini` file from a project when no other editors are opened (issue [#2419](https://github.com/platformio/platformio-vscode-ide/issues/2419))
- Added a new setting ``platformio-ide.activateProjectOnTextEditorChange`` to enable automatic project activation depending on an active opened text editor (issue [#2410](https://github.com/platformio/platformio-vscode-ide/issues/2410))
- Automatically activate project environment opened via "PIO Home > New Project / Open Project" (issue [#2414](https://github.com/platformio/platformio-vscode-ide/issues/2414))
- Do not show "Default" environment when a project does not have any build environments (issue [#2450](https://github.com/platformio/platformio-vscode-ide/issues/2450))
- Fixed an issue "Failed to load symbols from executable file" when debugging native/desktop application
- PlatformIO IDE Installer
  * Updated PlatformIO Core installer to v1.0.1
  * Rebuild project index only when the environment changes
  * Fixed an issue "The 'path' argument must be of type string. Received undefined"

## 2.3.0 (2021-03-03)

**Requires PlatformIO Core 5.1 or above**

- Project management:
  * Show active project in the status bar (issue [#2276](https://github.com/platformio/platformio-vscode-ide/issues/2276))
  * Automatically switch to the latest project on restart (issue [#2365](https://github.com/platformio/platformio-vscode-ide/issues/2365))
  * Automatically restore the latest project environment (issue [#2344](https://github.com/platformio/platformio-vscode-ide/issues/2344))
- Allowed passing custom base URL of the Python Package Index using new `customPyPiIndexUrl` setting
- Open ["platformio.ini" configuration file](https://docs.platformio.org/page/projectconf/index.html) from newly added project (if there are no other active editors) (issue [#2263](https://github.com/platformio/platformio-vscode-ide/issues/2263))
- Updated PlatformIO Core installer to v1.0.0 ([release notes](https://github.com/platformio/platformio-core-installer/releases/tag/v1.0.0))
- Added protection for infinite IntelliSense index rebuilding (issue [#2363](https://github.com/platformio/platformio-vscode-ide/issues/2363))
- Added "OpenAPI (Swagger) Editor" extension to the conflicted list (issue [#2324](https://github.com/platformio/platformio-vscode-ide/issues/2324))
- Fixed issues when the "Upload and Monitor" command didn't terminate the running task and didn't reopen a monitor with delay (issue [#2266](https://github.com/platformio/platformio-vscode-ide/issues/2266), issue [#2319](https://github.com/platformio/platformio-vscode-ide/issues/2319))
- Fixed an issue with broken IntelliSense index rebuilding or tasks loading for big projects (issue [#2321](https://github.com/platformio/platformio-vscode-ide/issues/2321))
- Fixed an issue when a debug breakpoint was not allowed for Assembly files

## 2.2.1 (2020-11-12)

- Fixed a regression bug when a debug breakpoint was not allowed for Assembly files

## 2.2.0 (2020-11-03)

- Refactored "Project Tasks" view
  * Add button (icon) with a project environment switcher
  * Group tasks by project environments
  * Automatically expand selected environment
  * Preload "Platform" tasks from the selected project environment
- Do not reopen device monitor automatically if a project build fails (issue [#2197](https://github.com/platformio/platformio-vscode-ide/issues/2197))
- Do not start PlatformIO Home in the background when there is no PlatformIO project in a workspace (reduce startup time)
- Fixed an issue when selected project environment is not used for regenerating of C/C++ index (issue [#2196](https://github.com/platformio/platformio-vscode-ide/issues/2196))
- Fixed an issue when debugger does not honor selected environment (issue [#2203](https://github.com/platformio/platformio-vscode-ide/issues/2203))
- Fixed an issue when opening a new PlatformIO Core CLI terminal session does not work after the closing

## 2.1.3 (2020-10-17)

- Fixed a regression bug with debugging solution

## 2.1.2 (2020-10-16)

- Do not propagate PlatformIO CLI to a default VSCode's terminal. If you need PlatformIO Core CLI, please open "Left Activity Bar > PlatformIO (icon) > Quick Access > Miscellaneous > PlatformIO Core CLI")
- Fixed a bug with "Cannot find module 'os-tmpdir'"

## 2.1.1 (2020-10-16)

- Do not patch the global environment PATH with PlatformIO (issues [#2045](https://github.com/platformio/platformio-vscode-ide/issues/2045), [#2046](https://github.com/platformio/platformio-vscode-ide/issues/2046))
- Fixed an issue with "Webview is disposed" (issue [#2126](https://github.com/platformio/platformio-vscode-ide/issues/2126))

## 2.1.0 (2020-09-16)

- Added a new setting ``platformio-ide.autoPreloadEnvTasks`` to enable automatic preloading of the project environment tasks (issue [#2004](https://github.com/platformio/platformio-vscode-ide/issues/2004))
- Renamed "PIO Remote" group of tasks to "Remote Development"
- Updated PlatformIO Core installer to [v0.3.5](https://github.com/platformio/platformio-core-installer/releases/tag/v0.3.5)

## 2.0.1 (2020-09-10)

- Moved "Project Tasks" view back to "PlatformIO" activity (you can now drag it to any location)

## 2.0.0 (2020-09-10)

**Requires PlatformIO Core 5.0 or above**
**Requires VSCode 1.44 or above**

- New PlatformIO Task Explorer
  * Instant access to the Project Tasks within the VSCode Explorer
  * Grouped tasks: Generic, Advanced, PIO Remote, Platform, Custom, etc.
  * Support for PlatformIO dev-platform tasks (Program FPGA bitstream, Burn bootloader, Upload to FS, OTA Update, etc). The list of tasks depends on a particular dev-platform
  * Access to [User Custom Targets](https://docs.platformio.org/en/latest/projectconf/advanced_scripting.html#custom-targets)
- New Project Environment Switcher
  * Switch between project environments declared in [platformio.ini](https://docs.platformio.org/en/latest/projectconf/index.html) project configuration file (issue [#544](https://github.com/platformio/platformio-vscode-ide/issues/544))
  * Activate IntelliSense service based on the current environment
  * Automatically generate a debugging configuration for the active environment
- New PlatformIO IDE Installer
  * Added progress information
  * Switched to the cross-platform and portable [get-platformio.py](https://github.com/platformio/platformio-core-installer) installer script
  * Use built-in portable Python 3 on Windows and macOS (it can be disabled with ``platformio-ide.useBuiltinPython`` setting)
- Added support for ``extends`` option in ``platformio.ini`` project configuration file (issue [#1371](https://github.com/platformio/platformio-vscode-ide/issues/1371))
- Contribute PlatformIO Core CLI into VSCode's default Terminal
- Reduced startup time (PlatformIO Core verification process)
- Fixed a bug when hotkeys in PlatformIO Home did not work on macOS (issue [#606](https://github.com/platformio/platformio-vscode-ide/issues/606))

## 1.10.0 (2019-11-20)

- Minimal requirements for PlatformIO Core is >=4.1.0
- Added PIO Check project task
- Added "Inspect" and "Projects & Configuration" items to "Activity Bar > PlatformIO > Quick Access > PIO Home"  (issue [#1302](https://github.com/platformio/platformio-vscode-ide/issues/1302))
- Automatically shutdown PIO Home server after 1-hour inactivity
- Ignore PIO Home from Proxy using `NO_PROXY` environment variable
- PlatformIO Core Installer:
    * Updated default Python installer to 3.7.5
    * Check Python's "urllib" SSL module
    * Skip Python from msys, mingw, emacs installations (issue [#1353](https://github.com/platformio/platformio-vscode-ide/issues/1353))

## 1.9.3 (2019-10-29)

- Handle "openTextDocument" in VSCode from upcoming PIO Home 3.0 and Project Inspect
- Use single PIO Home Server instance per multiple windows/sessions

## 1.9.2 (2019-10-20)

- Fixed an issue with broken PlatformIO Core installation

## 1.9.1 (2019-10-20)

- Added support for Python 3 from Windows Store (issue [#1162](https://github.com/platformio/platformio-vscode-ide/issues/1162))
- Better detecting of user home directory on Windows via `%USERPROFILE%` environment variable
- Fixed an issue "Can not perform a '--user' install" on Linux Manjaro (issue [#1007](https://github.com/platformio/platformio-vscode-ide/issues/1007))
- Other bug-fixes and improvements for PlatformIO Core installer

## 1.9.0 (2019-10-11)

- Python 3 has the highest priority over the Python 2
- Use Python 3.7 as a default installer for Windows
- Fixed an issue when debugger breakpoints are not activated on new debug session start (issue [#623](https://github.com/platformio/platformio-vscode-ide/issues/623))
- Fixed an issue when "breakpoint-hit" was not correctly handled by debugger in multi-threads application (RTOS, etc)

## 1.8.3 (2019-08-31)

 - Fixed an issue with incorrect checking of a valid Python 3 interpreter

## 1.8.2 (2019-08-11)

- Show multi-environment tasks when more than one project `env` is declared
- Temporary workaround for the broken Tasks API in the latest VSCode 1.37 (issue [#957](https://github.com/platformio/platformio-vscode-ide/issues/957))

## 1.8.1 (2019-07-23)

- Added new command "Open PlatformIO Core CLI"
- Fixed an issue with broken Code Disassembly feature of PIO Unified Debugger (issue [#920](https://github.com/platformio/platformio-vscode-ide/issues/920))
- Fixed an issue when when non-multi-environment tasks were listed in Project Tasks (issue [#921](https://github.com/platformio/platformio-vscode-ide/issues/921))
- Fixed "Error: Webview is disposed" when opening PIO Home (issue [#917](https://github.com/platformio/platformio-vscode-ide/issues/917))

## 1.8.0 (2019-07-16)

* Full support for [PlatformIO Core 4.0](http://docs.platformio.org/en/latest/migration.html)
* PlatformIO Core Installer:
    - Added support for Python 3 and its "venv" module
    - Added [PIO Remote](http://docs.platformio.org/en/latest/plus/pio-remote.html) project tasks
    - Added "Fuses" related project tasks
    - Added "Erase" project task for Espressif and Nordic dev/platforms
    - Implemented ProjectConfig parser following PIO Core 4.0 specification
    - Support custom port for PIO Home server
    - Override default `~/.platformio/penv` folder with environment variable `PLATFORMIO_PENV_DIR`
* [PIO Unified Debugger](http://docs.platformio.org/page/plus/debugging.html):
    - Improved memory reading when large size of data were requested (Memory Viewer, Peripheral Registers)
    - Fixed an error "Cannot read property 'getTreeNode' of null" when reading "Generic Registers" (issue [#862](https://github.com/platformio/platformio-vscode-ide/issues/862))
* Added new setting `platformio-ide.pioHomeServerHttpPort` which sets a default HTTP port for PIO Home server (issue [#832](https://github.com/platformio/platformio-vscode-ide/issues/832))
* Added new setting `platformio-ide.disablePIOHomeStartup` which disables showing PIO Home at startup (issue [#888](https://github.com/platformio/platformio-vscode-ide/issues/888))
* Replaced *.png icons with *.svg (issue [#755](https://github.com/platformio/platformio-vscode-ide/issues/755))
* Fixed an issue when PlatformIO Core does not handle disabled "Proxy Strict SSL" (issue [#837](https://github.com/platformio/platformio-vscode-ide/issues/837))
* Fixed an issue with multiple instances of PIO Home when opening new project (issue [#624](https://github.com/platformio/platformio-vscode-ide/issues/624))

## 1.7.1 (2019-04-20)

* PlatformIO Core Installer:
    * Use ".platformio" directory located in the root of disk if it was created before (Windows)
    * Use EnvBinDir as CWD for "runCommand" by default
* Disabled extension recommendations per a workspace (temporary workaround for [Microsoft/vscode/issues/58348](https://github.com/Microsoft/vscode/issues/58348))

## 1.7.0 (2019-04-16)

* Use VSCode's proxy settings by PlatformIO Core (issue [#96](https://github.com/platformio/platformio-vscode-ide/issues/96))

## 1.6.0 (2018-12-12)

* [Custom task for "Build" command](https://docs.platformio.org/en/latest/ide/vscode.html#custom-build-task) which is used by PlatformIO Toolbar and Key Bindings (issue [#116](https://github.com/platformio/platformio-vscode-ide/issues/116))
* Automatically remove previous PlatformIO Core installation when user switches between stable and development versions
* Updated minimal dependency of PlatformIO Core to >=3.6.3
* Fixed spurious project's "Problems" when ARM mbed framework is used (issue [#459](https://github.com/platformio/platformio-vscode-ide/issues/459))

## 1.5.0 (2018-11-29)

* PlatformIO Core Installer:
    * Drop SockJS, switch to native WebSockets
    * Catch errors when upgrading PIP (issue [#436](https://github.com/platformio/platformio-vscode-ide/issues/436))
    * Check for official Python installation on Windows (resolves issue with a static "sys.prefix" and custom Python builds) (issue [#154](https://github.com/platformio/platformio-vscode-ide/issues/154))
* Switched to a stable PlatformIO Core. Do you need development version? Please update VSCode settings to ["platformio-ide.useDevelopmentPIOCore": true](https://docs.platformio.org/en/latest/ide/vscode.html#settings)
* Updated minimal dependency of PlatformIO Core to >=3.6.2

## 1.4.7 (2018-11-28)

* Security Update related to VSCode's issue with dependency on `event-stream` (issue [#434](https://github.com/platformio/platformio-vscode-ide/issues/434))

## 1.4.6 (2018-11-23)

* Warn about using .INO files that leads to the spurious problems with C/C++ IntelliSense service (issue [#400](https://github.com/platformio/platformio-vscode-ide/issues/400))
* Use actual Python path when creating a virtual environment
* Shutdown all PIO Home servers when can't start a new one
* Better explanation about PIP issue on Windows

## 1.4.5 (2018-11-18)

* Reduced startup-time using extension bundling
* Added support for upcoming native WebSockets for PlatformIO Home
* Updated PlatformIO Core installer's `virtualenv` to 16.1.0

## 1.4.4 (2018-10-27)

* Improved PlatformIO Core Installer

## 1.4.3 (2018-10-26)

* Handle "Error: Could not create PIO Core Virtual Environment" and propose user to file an issue (issue [#154](https://github.com/platformio/platformio-vscode-ide/issues/154))

## 1.4.2 (2018-10-26)

* [PIO Unified Debugger](http://docs.platformio.org/page/plus/debugging.html):
    * Shutdown gracefully debugging server on "Stop" command
* Fixed "ImportError: DLL load failed"

## 1.4.1 (2018-10-19)

* [PIO Unified Debugger](http://docs.platformio.org/page/plus/debugging.html):
    * Improved UI/UX for "MEMORY" viewer

## 1.4.0 (2018-10-09)

* [PIO Unified Debugger](http://docs.platformio.org/page/plus/debugging.html):
  - Full support for Assembly based projects (issue [#113](https://github.com/platformio/platformio-vscode-ide/issues/113))
  - Allowed to set breakpoints in UI for Assembly language
  - Added RISC-V and MIPS mnemonics to Assembly grammar
* Notify about conflicted extensions with IntelliSense (issue [#118](https://github.com/platformio/platformio-vscode-ide/issues/118))

## 1.3.1 (2018-10-02)

* Added "Update All (libraries, platforms, and packages)" and "Upgrade PlatformIO Core" tasks to global VSCode Task Manager (issue [#335](https://github.com/platformio/platformio-vscode-ide/issues/335))
* Improvements for [PIO Unified Debugger](http://docs.platformio.org/page/plus/debugging.html):
  - Fixed an issue with empty call stack when initial breakpoint is disabled using [debug_init_break](http://docs.platformio.org/en/latest/projectconf/section_env_debug.html#debug-init-break)

## 1.3.0 (2018-09-21)

* Configure time in milliseconds after which reopen Serial Port Monitor using new option `platformio-ide.reopenSerialMonitorDelay`
* Added "Update All" (platforms, packages, libraries) quick access command to "PlatformIO Activity" (left sidebar) (issue [#335](https://github.com/platformio/platformio-vscode-ide/issues/335))
* Improvements for [PIO Unified Debugger](http://docs.platformio.org/page/plus/debugging.html):
  - Fixed issue when using [BlackMagic Probe](http://docs.platformio.org/en/latest/plus/debug-tools/blackmagic.html) in pair with Atmel SAMD20/SAMD21 based boards
  - Improved running to [debug_init_break](http://docs.platformio.org/en/latest/projectconf/section_env_debug.html#debug-init-break) on startup

## 1.2.0 (2018-09-12)

* Added "table of contents" of PIO Home to "PlatformIO View > Quick Access" (left sidebar)
* Fixed issue when CPP files were detected as Arduino

## 1.1.1 (2018-09-07)

* Show "Project Tasks" before "Quick Access" in PlatformIO Activity Bar
* Reverted back "PlatformIO: Run Task..." button to PlatformIO Toolbar
* Improved performance of Project IntelliSense Indexer
* Fixed PlatformIO Core "ImportError: cannot import name _remove_dead_weakref" (issue [#142](https://github.com/platformio/platformio-vscode-ide/issues/142))
* Fixed PIO Home "[Errno 48] Address already in use" (issue [#313](https://github.com/platformio/platformio-vscode-ide/issues/313))
* Fixed issue when extension does not start after adding new project folder to workspace (issue [#319](https://github.com/platformio/platformio-vscode-ide/issues/319))

## 1.1.0 (2018-08-31)

* New "Debug" group to "Quick Access" view
  - "Start Debugging", will start debug session, activate debug console and focus "Debug" View
  - "Toggle Debug Console", an optional button to show active debug console
* Improved support for Arduino files with `*.ino` extension
* Focus "Explorer" view when adding new project folder to workspace
* Do not shutdown PIO Home server when folder is added to workspace

## 1.0.0 (2018-08-30)

* [Multi-root Workspaces](https://code.visualstudio.com/docs/editor/multi-root-workspaces), work on several related projects at one time (issue [#50](https://github.com/platformio/platformio-vscode-ide/issues/50))
* **PlatformIO Activity Bar**:
  - "Quick Access" to PIO Home and maintenance commands
  - "Project Tasks", refactored Project Task Manager with a support for multiple environments in `platformio.ini`
* Added "verbose" build and upload project tasks
* Added "Update PlatformIO Core packages" command
* Added new configuration option `platformio-ide.disableToolbar` which allows to disabling of PlatformIO Toolbar in a bottom status bar
* Refactored IntelliSense Indexer
* Fixed issue with task runner when French locale is used (issue [#107](https://github.com/platformio/platformio-vscode-ide/issues/107))

## 0.17.5 (2018-08-21)

* Improvements for [PIO Unified Debugger](http://docs.platformio.org/page/plus/debugging.html):
  - Update peripheral register values on group expansion or double click
  - Better support for the complex watching expressions
  - Fixed issue when registers are not updated after loading
  - Fixed setting new value for variable in "Global" scope

## 0.17.4 (2018-07-26)

* Improved PlatformIO Core installer

## 0.17.3 (2018-07-19)

* Fixed "PIP: Command "python setup.py egg_info" failed" (issue [#179](https://github.com/platformio/platformio-vscode-ide/issues/179))
* Fixed "TypeError: Cannot read property 'title' of undefined" (issue [#170](https://github.com/platformio/platformio-vscode-ide/issues/170))

## 0.17.2 (2018-07-11)

- Do not force PIO IDE Terminal to `cmd.exe` on Windows (issue [#76](https://github.com/platformio/platformio-vscode-ide/issues/76))
- [PIO Unified Debugger](http://docs.platformio.org/page/plus/debugging.html): Fixed infinite loading of Peripheral Registers

## 0.17.1 (2018-07-05)

* Improvements for [PIO Unified Debugger](http://docs.platformio.org/page/plus/debugging.html):
  - Do not fetch registers data when Peripherals or Registers views are collapsed
  - Fixed issue with incorrect breakpoint hit in multi-thread environment (RTOS)
* Instruction how to manually create [PIO Core Virtual Environment](http://docs.platformio.org/en/latest/installation.html#virtual-environment)

## 0.17.0 (2018-06-29)

* Improvements for [PIO Unified Debugger](http://docs.platformio.org/page/plus/debugging.html):
  - Set breakpoint while the target is running
  - Show peripheral register description via tooltip (mouse over with delay)
  - Improved debugging for multi thread applications (Espressif ESP32, RTOS-based projects)

## 0.16.2 (2018-06-26)

* Handle PIO Home server errors
* Install `virtualenv` to the global scope if possible
* Skip Python interpreter from MinGW

## 0.16.1 (2018-06-21)

* Fixed an issue with infinite PIO Core installation

## 0.16.0 (2018-06-20)

**Requires VSCode 1.24 or above**

* [Custom Tasks](http://docs.platformio.org/en/latest/ide/vscode.html#custom-tasks) (issue [#89](https://github.com/platformio/platformio-vscode-ide/issues/89))
* Automatically close Serial Port Monitor before uploading/testing (issue [#49](https://github.com/platformio/platformio-vscode-ide/issues/49))
* Added new configuration option `autoCloseSerialMonitor`, which is set to `true` by default
* Added "Report a problem" action/button when error occurs
* Improved PIO Core installer using `pip` as Python module

## 0.15.2 (2018-05-30)

* Reverted back an order of PlatformIO Toolbar (issue [#114](https://github.com/platformio/platformio-vscode-ide/issues/114))
* Fixed issue with customization of built-in PlatformIO tasks (issue [#89](https://github.com/platformio/platformio-vscode-ide/issues/89))

## 0.15.1 (2018-05-26)

* Moved PlatformIO Toolbar to the beginning of the bottom status bar
* Fixed issue when trying to open an opened PIO Home again

## 0.15.0 (2018-05-08)

**Requires VSCode 1.23 or above**

* New UI for [PIO Unified Debugger](http://docs.platformio.org/page/plus/debugging.html):
  - Conditional Breakpoints
  - Expressions and Watchpoints
  - Generic Registers
  - Peripheral Registers
  - Memory Viewer
  - Disassembly
  - Multi-thread support
  - A hot restart of an active debugging session
* Retain PIO Home state when switching between tabs (issue [#32](https://github.com/platformio/platformio-vscode-ide/issues/32))

## 0.14.2 (2018-04-28)

* Fixed "PIP: Could not find a version that satisfies the requirement" (issue [#102](https://github.com/platformio/platformio-vscode-ide/issues/102))

## 0.14.1 (2018-04-09)

* Temporary workaround for urgent VSCode bug in v1.22 with a broken task runner for Windows OS (issue [#97](https://github.com/platformio/platformio-vscode-ide/issues/97))

## 0.14.0 (2018-03-14)

* Initial support for PIO Enterprise
* Speed up the loading of PIO Home [PIO Home](http://docs.platformio.org/page/home/index.html)

## 0.13.2 (2018-03-08)

* Fixed endless loop with installing PIO Core when `platformio-ide.useDevelopmentPIOCore` is set to `false` (issue [#86](https://github.com/platformio/platformio-vscode-ide/issues/86))

## 0.13.1 (2018-03-05)

* Fixed "Cannot read property 'theme' of undefined" when opening [PIO Home](http://docs.platformio.org/page/home/index.html)

## 0.13.0 (2018-03-03)

* Multiple themes (Dark & Light) for [PIO Home](http://docs.platformio.org/page/home/index.html)
* Fixed GitHub's "TLSV1_ALERT_PROTOCOL_VERSION" issue with PIO Core installer (issue [#88](https://github.com/platformio/platformio-vscode-ide/issues/88))

## 0.12.1 (2018-02-05)

* New configuration option `defaultToolbarBuildAction` (default action for 'Build' button on PIO Toolbar), default value is `release`. Possible values are `release` or `pre-debug`.
  To eliminate a full project rebuilding before debugging, please change this value to `pre-debug`

## 0.12.0 (2018-01-30)

* Added a new "Pre-Debug" task and run it before debugging session
* Significantly improved startup time for [PIO Unified Debugger](http://docs.platformio.org/page/plus/debugging.html)

## 0.11.1 (2018-01-23)

* Improved support for PIO Core 3.5.1
* Use a custom HOME environment variable for Windows
* Fixed PIO Core installer when UserName contains a space

## 0.11.0 (2018-01-16)

* Added new option `activateOnlyOnPlatformIOProject` (activate extension only when PlatformIO-based project (with `platformio.ini`) is opened in workspace) (issue [#66](https://github.com/platformio/platformio-vscode-ide/issues/66))
* Changed minimum requirements for Python to 2.7.5+
* Handle correctly conda's virtual environment
* Don't update Terminal configuration with patched PATH environment for non-PlatformIO projects (issue [#64](https://github.com/platformio/platformio-vscode-ide/issues/64))
* Ignore Python interpreter from Cygwin environment (issue [#43](https://github.com/platformio/platformio-vscode-ide/issues/43))

## 0.10.0 (2018-01-11)

* Added PIO Remote & PIO Unit Testing buttons and commands
* Better explanation for "WindowsError: [Error 5]"
* Minor improvements for Project Indexer

## 0.9.1 (2018-01-11)

* Improved support for PIO Core 3.5.1-dev
* Fixed issue with installer (pip, virtualenv) when non-ASCII chars are used in TMPDIR environment variable

## 0.9.0 (2017-12-28)

* Improved support for PIO Core 3.5.0
* Pre-install PIO Home in pair with PIO Core (resolve issue with "timeout")
* Fixed issue with PIO Core update/upgrade commands (issue [#62](https://github.com/platformio/platformio-vscode-ide/issues/62))

## 0.8.2 (2017-12-02)

* Fixed issue with broken PIO Home and user's Python <2.7.9 (Windows). Automatically install compatible Python

## 0.8.1 (2017-11-29)

* New configuration option: "Update Terminal configuration with patched PATH environment", default value is `true`
* Fixed "Expression preceding parentheses of apparent call must have (pointer-to-) function type" for IntelliSense (issue [#54](https://github.com/platformio/platformio-vscode-ide/issues/54))

## 0.8.0 (2017-11-26)

**Requires VSCode 1.18.0 or above**

* Updated PIO Terminal with new VSCode API
* Increased timeout for PIO Home Server

## 0.7.4 (2017-11-03)

* Improved support for non-ASCII locales
* Fixed issue with the missing toolchain includes in `includePath` of IntelliSense

## 0.7.3 (2017-09-09)

* Catch errors when checking PIO Core version (broken PIO Core installation)
* Override LC_ALL only for Darwin platform

## 0.7.2 (2017-09-01)

* Show PIO Home icon on bottom Toolbar even when PIO Project is not opened

## 0.7.1 (2017-09-01)

* Fixed installer issue "Reference Error: atom is not defined" (issue [#38](https://github.com/platformio/platformio-vscode-ide/issues/38))

## 0.7.0 (2017-09-01)

* New in PIO Home:
  - New Project
  - Import Arduino IDE Project
  - Open Project
  - Project Examples
* Migrate to "platformio-node-helpers", a common interface for Node.JS based PlatformIO IDE extensions
* Revert back "Run a task" button on the PIO Toolbar

## 0.6.0 (2017-08-10)

* Integrate new PIO Home 2.0

## 0.5.3 (2017-08-05)

* Ignore broken `node-tar` (3.1.9) package which blocks PIO Core installer

## 0.5.2 (2017-07-27)

* Use dedicated terminal panel per unique PIO Task
* Avoid concurrent "IntelliSense Index Rebuild" processes

## 0.5.1 (2017-07-18)

* Add new Tasks
  - Rebuild C/C++ Project Index
  - Update installed platforms, packages and libraries
  - Upgrade PlatformIO Core
* Use `pio device monitor` command instead of `pio run -t monitor` for "Monitor" task

## 0.5.0 (2017-07-17)

**Requires VSCode 1.13.0 or above**

* Dynamic Tasks (issue [#24](https://github.com/platformio/platformio-vscode-ide/issues/24))
* Custom tasks per project environment based on `platformio.ini` (issue [#16](https://github.com/platformio/platformio-vscode-ide/issues/16))
* Removed "No task is currently running" warning (issue [#26](https://github.com/platformio/platformio-vscode-ide/issues/26))
* Fixed issue with Windows accounts that contain spaces in user name (issue [#27](https://github.com/platformio/platformio-vscode-ide/issues/27))

## 0.4.0 (2017-07-05)

* New `platformio-ide.forceUploadAndMonitor` configuration option which allows to force "Upload and Monitor" task for `platformio-ide.upload` command
* Automatically terminate previous PlatformIO Task before a new (fixes issue with uploading when Serial Monitor is run)

## 0.3.1 (2017-06-28)

* Improved PIO IDE Installer (issue with `virtualenv` and OS temporary directory)
* Added workaround for [Windows command-line string limitation](https://support.microsoft.com/en-us/help/830473/command-prompt-cmd.-exe-command-line-string-limitation)
  (issue [#15](https://github.com/platformio/platformio-vscode-ide/issues/15))

## 0.3.0 (2017-06-05)

* Added default keybindings for the popular commands (Build, Upload, Open Serial Monitor, Initialize New Project, Run Other Tasks)
* Automatically close Serial Monitor before uploading
* Synchronize Installer with the latest version from PIO IDE for Atom
* Don't show PlatformIO Toolbar in non-PlatformIO projects (issue [#6](https://github.com/platformio/platformio-vscode-ide/issues/6))
* Don't replace default terminal with PlatformIO (issue [#9](https://github.com/platformio/platformio-vscode-ide/issues/9))
* Fixed issue with PIO Terminal and Windows PowerShell (issue [#10](https://github.com/platformio/platformio-vscode-ide/issues/10))
* Other improvements and bugfixes

## 0.2.0 (2017-05-29)

* PlatformIO Toolbar in Status Bar (Build, Upload, Clean, Run Tasks, New Project, Serial Monitor, and Terminal)
* Improved auto installer for PIO Core
* Improved C/C++ Code Completion

## 0.1.0 (2017-05-28)

* Initial release
