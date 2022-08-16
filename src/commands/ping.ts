import { BaseCommand } from "../client/BaseCommand";
import ChatMessage from "../client/ChatMessage";
import Client from "../client/Client";

export default class PingCommand extends BaseCommand {
    constructor(client: Client) {
        super(client, {
            name: "ping",
            aliases: ["пинг"],
        });
    }

    async run(msg: ChatMessage): Promise<void> {
        await msg.reply("pong!");
    }
}
