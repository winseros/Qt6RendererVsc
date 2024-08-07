import * as path from "path";
import { AbstractDebugAdapterTracker } from "./abstractDebugAdapterTracker";

export abstract class AbstractLldbDebugAdapterTracker extends AbstractDebugAdapterTracker {
    protected async setUpPrettyPrinters(frameId: number, scriptPath: string): Promise<void> {
        await this.executeDebuggerCommand(
            frameId,
            `command script import "${path.join(scriptPath, "lldb", "qt6renderer")}"`
        );

        await this.registerSummary(frameId, "QAtomicInt", false);
        await this.registerSummary(frameId, "QBasicAtomicInt", false);
        await this.registerBoth(frameId, "QBitArray", false);
        await this.registerBoth(frameId, "QByteArray", false);
        await this.registerSummary(frameId, "QChar", false);
        await this.registerBoth(frameId, "QDate", false);
        await this.registerBoth(frameId, "QDateTime", false);
        await this.registerBoth(frameId, "QDir", false);
        await this.registerSynth(frameId, "QEvent", false);
        await this.registerBoth(frameId, "QFile", false);
        await this.registerBoth(frameId, "QFileInfo", false);
        await this.registerSummary(frameId, "QFlags", true);
        await this.registerBoth(frameId, "QHash", true);
        await this.registerSummary(frameId, "QHostAddress", false);
        await this.registerBoth(frameId, "QList", true);
        await this.registerSynth(frameId, "QLocale", false);
        await this.registerSynth(frameId, "QMap", true);
        await this.registerBoth(frameId, "QScopedPointer", true);
        await this.registerBoth(frameId, "QSharedPointer", true);
        await this.registerBoth(frameId, "QSharedDataPointer", true);
        await this.registerBoth(frameId, "QString", false);
        await this.registerBoth(frameId, "QTemporaryFile", false);
        await this.registerBoth(frameId, "QTemporaryDir", false);
        await this.registerBoth(frameId, "QTime", false);
        await this.registerBoth(frameId, "QTimeZone", false);
        await this.registerBoth(frameId, "QWeakPointer", true);
        await this.registerBoth(frameId, "QUrl", false);
        await this.registerSummary(frameId, "QUuid", false);
        await this.registerSynth(frameId, "QVariant", false);

        await this.executeDebuggerCommand(frameId, "type category enable Qt");
    }

    private async registerBoth(frameId: number, qtType: string, generic: boolean): Promise<void> {
        await this.registerSummary(frameId, qtType, generic);
        await this.registerSynth(frameId, qtType, generic);
    }

    private async registerSummary(
        frameId: number,
        qtType: string,
        generic: boolean
    ): Promise<void> {
        let command = "type summary add -F qt6renderer.qt6_lookup_summary -e -h";
        if (generic) {
            command += " -x";
        }
        command += ` "${qtType}" --category Qt`;
        await this.executeDebuggerCommand(frameId, command);
    }

    private async registerSynth(frameId: number, qtType: string, generic: boolean): Promise<void> {
        let command = "type synthetic add -l qt6renderer.qt6_lookup_synthetic";
        if (generic) {
            command += " -x";
        }
        command += ` "${qtType}" --category Qt`;
        await this.executeDebuggerCommand(frameId, command);
    }
}
