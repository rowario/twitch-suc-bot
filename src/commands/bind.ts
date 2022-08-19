import { BaseCommand } from "../client/BaseCommand";
import ChatMessage from "../client/ChatMessage";
import Client from "../client/Client";

const actions = ["spawn_mob", "increase_hp", "decrease_hp"];

export default class BindCommand extends BaseCommand {
    constructor(public client: Client) {
        super(client, {
            name: "bind",
            aliases: ["привязать"],
            broadcasterOnly: true,
        });
    }

    async run(msg: ChatMessage): Promise<void> {
        const [_, action] = msg.originalText.split(" ");
        if (!action) {
            return msg.reply("укажите action!");
        }

        if (!actions.includes(action)) {
            return msg.reply("такой action не существует!");
        }

        console.log("fsdfds");

        this.client.createCollector(
            msg.channel,
            msg.user.userId,
            (rewardId) => {
                console.log("from collector:", rewardId);
            }
        );
    }
}
