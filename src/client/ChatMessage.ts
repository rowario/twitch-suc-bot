import { ChatClient } from "@twurple/chat";

export default class ChatMessage {
    constructor(
        public client: ChatClient,
        public message: string,
        public channel: string,
        public user: string
    ) {}

    async reply(text: string) {
        this.client.say(this.channel, `@${this.user}, ${text}`);
    }
}
