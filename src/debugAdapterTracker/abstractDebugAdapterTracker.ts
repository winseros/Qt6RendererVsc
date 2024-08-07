import * as path from "path";
import * as vscode from "vscode";
import { CommandTextTransformer } from "./commandTextTransformer";
import { isDefined } from "../util";
import { isStoppedEvent } from "../protocol";

export abstract class AbstractDebugAdapterTracker implements vscode.DebugAdapterTracker {
    private readonly _session: vscode.DebugSession;
    private readonly _context: vscode.ExtensionContext;

    private readonly _commandTextTransformer: CommandTextTransformer;

    private _initialized = false;

    constructor(
        session: vscode.DebugSession,
        context: vscode.ExtensionContext,
        commandTextTransformer: CommandTextTransformer
    ) {
        this._session = session;
        this._context = context;
        this._commandTextTransformer = commandTextTransformer;
    }

    async onDidSendMessage(message: unknown) {
        if (!this._initialized && isStoppedEvent(message)) {
            if (isDefined(message.body.threadId)) {
                try {
                    await this.initialize(message.body.threadId);
                    this._initialized = true;
                } catch (err) {
                    console.error("Error when initializing the pretty printer.", err);
                }
            } else {
                console.warn(
                    "The extension won`t initalize. The DebuggerAdapterProtocol 'stopped' event has no threadId."
                );
            }
        }
    }

    protected abstract setUpPrettyPrinters(frameId: number, scriptPath: string): Promise<void>;

    private async initialize(threadId: number) {
        const scriptPath = path.join(this._context.extensionPath, "qt6renderer", "python");
        const frameId = await this.getCurrentFrameId(threadId);
        await this.setUpPrettyPrinters(frameId, scriptPath);
    }

    private async getCurrentFrameId(threadId: number) {
        const result = (await this._session.customRequest("stackTrace", { threadId })) as {
            stackFrames: Array<{ id: number }>;
        };
        return result.stackFrames[0].id;
    }

    protected async executeDebuggerCommand(frameId: number, text: string) {
        const expression = this._commandTextTransformer.transform(text);

        await this._session.customRequest("evaluate", {
            expression,
            frameId,
            context: "repl"
        });
    }
}
