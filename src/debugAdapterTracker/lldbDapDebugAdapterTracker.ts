import * as vscode from "vscode";
import { AbstractLldbDebugAdapterTracker } from "./abstractLLdbDebugAdaperTracker";
import { DefaultCommandTextTransformer } from "./commandTextTransformer";

export class LldbDapDebuggerAdapterTracker extends AbstractLldbDebugAdapterTracker {
    constructor(session: vscode.DebugSession, context: vscode.ExtensionContext) {
        super(session, context, new DefaultCommandTextTransformer());
    }
}
