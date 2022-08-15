import { ChatClient } from "@twurple/chat";

export default class ChatMessage {
    constructor(
        public client: ChatClient,
        private message: string,
        private channel: string,
        private user: string
    ) {}

    async reply(text: string) {
        this.client.say(this.channel, `@${this.user}, ${text}`);
    }
}
