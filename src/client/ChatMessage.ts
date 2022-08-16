import { ChatClient } from "@twurple/chat";

export default class ChatMessage {
    constructor(
        public client: ChatClient,
        public message: string,
        public channel: string,
        public user: string
    ) {}

    async reply(text: string): Promise<void> {
        await this.client.say(this.channel, `@${this.user}, ${text}`);
    }

    async say(text: string): Promise<void> {
        await this.client.say(this.channel, text);
    }
}
