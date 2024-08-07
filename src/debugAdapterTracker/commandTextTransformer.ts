export interface CommandTextTransformer {
    transform(text: string): string;
}

export class DefaultCommandTextTransformer implements CommandTextTransformer {
    transform(text: string): string {
        return text;
    }
}

export class MiCommandTextTransformer implements CommandTextTransformer {
    transform(text: string): string {
        return `-exec ${text}`;
    }
}
