import * as path from "path";
import * as vscode from "vscode";
import { AbstractDebugAdapterTracker } from "./abstractDebugAdapterTracker";
import { MiCommandTextTransformer } from "./commandTextTransformer";

export class GdbMiDebuggerAdapterTracker extends AbstractDebugAdapterTracker {
    constructor(session: vscode.DebugSession, context: vscode.ExtensionContext) {
        super(session, context, new MiCommandTextTransformer());
    }

    protected async setUpPrettyPrinters(frameId: number, scriptPath: string): Promise<void> {
        await this.executeDebuggerCommand(
            frameId,
            `python sys.path.append('${path.join(scriptPath, "gdb")}')`
        );
        await this.executeDebuggerCommand(frameId, "python import qt6renderer");
        await this.executeDebuggerCommand(
            frameId,
            "python gdb.pretty_printers.append(qt6renderer.qt6_lookup)"
        );
        await this.executeDebuggerCommand(frameId, "set print pretty on");
    }
}
