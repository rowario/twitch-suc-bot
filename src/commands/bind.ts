import { BaseCommand } from "../client/BaseCommand";
import ChatMessage from "../client/ChatMessage";
import Client from "../client/Client";
import { createRedemption } from "../repositories/redemptions";
import { RedemAction } from "../types/common";

const actions = ["spawn_mob", "increase_hp", "decrease_hp"];

export default class BindCommand extends BaseCommand {
    constructor(public client: Client) {
        super(client, {
            name: "bind",
            aliases: ["привязать"],
            broadcasterOnly: true,
            redemptionOnly: true,
        });
    }

    async run(msg: ChatMessage): Promise<void> {
        const rewardId = msg.message.tags.get("custom-reward-id");
        if (rewardId) {
            const [_, action] = msg.originalText.split(" ");
            if (!action) {
                return msg.reply("укажите action!");
            }

            if (!actions.includes(action)) {
                return msg.reply("такой action не существует!");
            }

            await createRedemption(rewardId, action as RedemAction);

            msg.reply("награда успешно привязана!");
        }
    }
}
