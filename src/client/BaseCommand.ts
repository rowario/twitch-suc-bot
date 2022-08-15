import { ChatClient } from "@twurple/chat/lib";
import ChatMessage from "./ChatMessage";

export interface CommandOptions {
    name: string;
}

export class BaseCommand {
    public name: string;
    public constructor(
        private client: ChatClient,
        private options: CommandOptions
    ) {
        this.name = options.name;
    }

    async run(msg: ChatMessage): Promise<void> {}
}
