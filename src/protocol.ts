import * as vscode from "vscode";

export interface DebugProtocolMessage extends vscode.DebugProtocolMessage {
    type: string;
}

interface _DebugProtocolEvent extends DebugProtocolMessage {
    event: string;
}

export type DebugProtocolEvent<T = unknown> = unknown extends T
    ? _DebugProtocolEvent
    : _DebugProtocolEvent & { body: T };

export interface StoppedEventBody {
    reason: string;
    description?: string;
    threadId?: number;
    preserveFocusHint?: boolean;
    text?: string;
    allThreadsStopped?: boolean;
    hitBreakpointIds?: number[];
}

const isDebugProtocolMessage = (message: unknown): message is DebugProtocolMessage =>
    message !== null &&
    typeof message === "object" &&
    "type" in message &&
    typeof message.type === "string";

const isDebugProtocolEvent = (message: unknown): message is DebugProtocolEvent =>
    isDebugProtocolMessage(message) && message.type === "event";

export const isStoppedEvent = (message: unknown): message is DebugProtocolEvent<StoppedEventBody> =>
    isDebugProtocolEvent(message) && message.event === "stopped";

export interface EvaluateResponseBody {
    result: string;
    type?: string;
    presentationHint?: unknown;
    variablesReference: number;
    namedVariables?: number;
    indexedVariables?: number;
    memoryReference?: string;
}
