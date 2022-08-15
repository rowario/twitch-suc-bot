import { ChatClient } from "@twurple/chat/lib";
import ChatMessage from "./ChatMessage";

export interface CommandOptions {
    name: string;
    aliases: string[];
}

export class BaseCommand {
    public name: string;
    public aliases: string[];
    public constructor(
        private client: ChatClient,
        private options: CommandOptions
    ) {
        this.name = options.name;
        this.aliases = options.aliases;
    }

    async run(msg: ChatMessage): Promise<void> {}
}
