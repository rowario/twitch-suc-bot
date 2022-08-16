import { ChatClient, ChatUser, PrivateMessage } from "@twurple/chat";

export default class ChatMessage {
    constructor(
        public client: ChatClient,
        public originalText: string,
        public channel: string,
        public message: PrivateMessage
    ) {}

    get user(): ChatUser {
        return this.message.userInfo;
    }

    async reply(text: string): Promise<void> {
        await this.client.say(this.channel, `@${this.user.userName}, ${text}`);
    }

    async say(text: string): Promise<void> {
        await this.client.say(this.channel, text);
    }
}
