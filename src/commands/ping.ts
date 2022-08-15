import { ChatClient } from "@twurple/chat";
import { BaseCommand } from "../client/BaseCommand";
import ChatMessage from "../client/ChatMessage";

export default class PingCommand extends BaseCommand {
    constructor(client: ChatClient) {
        super(client, {
            name: "ping",
        });
    }

    async run(msg: ChatMessage): Promise<void> {
        msg.reply("pong!");
    }
}
