# QT6 Renderer for Visual Studio Code

The extension for pretty printing [Qt][qt] types by [Visual Studio Code][vscode].

> [!NOTE]
> The extension wraps [Qt6Renderer][qt6renderer]. Bring up any problems there.

## Prerequisites

`Qt6Renderer` does not provide debugging experience itself. Instead, it relies on third-party extensions that offer debugging capabilities and injects pretty printers into a recognized debugging session.

`Qt6Renderer` needs any of the extensions below to work.

* [C/C++ for Visual Studio Code][cpptools]
* [LLDB DAP][lldbdap]

## Qt versions support
* 6.x

## Qt types support
* [See here for gdb][qt6renderer_files_gdb]
* [See here for lldb][qt6renderer_files_lldb]

You can use the [example project][qt6renderer_exmpl] for testsing.

## Debuggers support
See the [third-party extensions](#prerequisites) debugger and operating systems support.

## Operating systems tested on
* Linux
  * LLDB 18 ([LLDB DAP][lldbdap])
  * GDB 15 ([C/C++ for Visual Studio Code][cpptools])
* Windows  
  * GDB 14 ([C/C++ for Visual Studio Code][cpptools])

## Architectures tested on
* x64

## Requirements

See at the [Qt6Renderer](https://github.com/winseros/Qt6Renderer?tab=readme-ov-file#requirements).

## Troubleshooting

See at the [Qt6Renderer](https://github.com/winseros/Qt6Renderer?tab=readme-ov-file#troubleshooting).

[qt]: https://www.qt.io/
[vscode]: https://code.visualstudio.com/
[cpptools]: https://marketplace.visualstudio.com/items?itemName=ms-vscode.cpptools
[lldbdap]: https://marketplace.visualstudio.com/items?itemName=llvm-vs-code-extensions.lldb-dap
[gdb]: https://sourceware.org/gdb/
[lldb]: https://lldb.llvm.org/
[qt6renderer]: https://github.com/winseros/Qt6Renderer
[qt6renderer_files_gdb]: https://github.com/winseros/Qt6Renderer/tree/master/python/gdb/qt6renderer
[qt6renderer_files_lldb]: https://github.com/winseros/Qt6Renderer/tree/master/python/lldb/qt6renderer
[qt6renderer_exmpl]: https://github.com/winseros/Qt6RendererExmpl
[qt6renderer_intlj]: https://github.com/winseros/Qt6RendererIntlj
[qt6renderer_vsc]: https://github.com/winseros/Qt6RendererVscj