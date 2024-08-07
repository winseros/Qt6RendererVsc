import * as vscode from "vscode";
import { AbstractLldbDebugAdapterTracker } from "./abstractLLdbDebugAdaperTracker";
import { MiCommandTextTransformer } from "./commandTextTransformer";

export class LldbMiDebuggerAdapterTracker extends AbstractLldbDebugAdapterTracker {
    constructor(session: vscode.DebugSession, context: vscode.ExtensionContext) {
        super(session, context, new MiCommandTextTransformer());
    }
}
