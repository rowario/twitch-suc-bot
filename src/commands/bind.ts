import { BaseCommand } from "../client/BaseCommand";
import ChatMessage from "../client/ChatMessage";
import Client from "../client/Client";
import RewardCollector from "../client/RewardCollector";
import {
    createRedemption,
    deleteByRewardOrAction,
} from "../repositories/redemptions";
import { RedemAction } from "../types/common";

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
        let [_, action] = msg.originalText.split(" ") as [string, RedemAction];
        if (!action) {
            return msg.reply(
                `укажите действие! Доступные варианты: ${actions.join(", ")}`
            );
        }

        if (!actions.includes(action)) {
            return msg.reply(
                `такого действия не существует! Доступные варианты: ${actions.join(
                    ", "
                )}`
            );
        }

        const collector = new RewardCollector(this.client, msg.user.userId);
        collector.start(msg.user.userName, async (rewardId) => {
            await deleteByRewardOrAction(rewardId, action);
            await createRedemption(rewardId, action as RedemAction);

            msg.say("Действие успешно привязан к награде!");
        });

        msg.reply("Используйте награду для привязки ее к действию!");
    }
}
