import * as vscode from "vscode";
import {
    GdbMiDebuggerAdapterTracker,
    LldbDapDebuggerAdapterTracker,
    LldbMiDebuggerAdapterTracker
} from "./debugAdapterTracker";

interface CppDebugConfiguration extends vscode.DebugConfiguration {
    MIMode: string;
}

const isCppConfiguration = (
    configuration: vscode.DebugConfiguration
): configuration is CppDebugConfiguration =>
    "MIMode" in configuration && typeof configuration.MIMode === "string";

export const activate = (context: vscode.ExtensionContext) => {
    context.subscriptions.push(
        vscode.debug.registerDebugAdapterTrackerFactory("cppdbg", {
            createDebugAdapterTracker(session) {
                if (isCppConfiguration(session.configuration)) {
                    switch (session.configuration.MIMode.toLowerCase()) {
                        case "gdb":
                            return new GdbMiDebuggerAdapterTracker(session, context);
                        case "lldb":
                            return new LldbMiDebuggerAdapterTracker(session, context);
                        default:
                            console.warn(
                                `[${session.configuration.MIMode}] is an unsupported MiMode value`
                            );
                            return null;
                    }
                }
            }
        })
    );
    context.subscriptions.push(
        vscode.debug.registerDebugAdapterTrackerFactory("lldb-dap", {
            createDebugAdapterTracker(session) {
                return new LldbDapDebuggerAdapterTracker(session, context);
            }
        })
    );
};
