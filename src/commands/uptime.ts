import moment from "moment";
import { getApiClient } from "../api/twitch";
import { BaseCommand } from "../client/BaseCommand";
import ChatMessage from "../client/ChatMessage";
import Client from "../client/Client";

export default class UptimeCommand extends BaseCommand {
    constructor(client: Client) {
        super(client, {
            name: "uptime",
            aliases: ["аптайм"],
        });
    }

    async run(msg: ChatMessage): Promise<void> {
        const api = await getApiClient();
        if (!api) {
            msg.reply("не удалось получить информацию о стриме :(");
            return;
        }
        const streamerName = process.env.TWITCH_CHAT || "";
        const stream = await api.streams.getStreamByUserName(streamerName);
        if (!stream) {
            msg.reply("не удалось получить информацию о стриме :(");
            return;
        }

        const duration = moment.duration(
            moment().diff(stream.startDate, "milliseconds")
        );

        await msg.reply(
            `стрим длиться уже: ${duration.hours()}:${duration.minutes()}:${duration.seconds()}`
        );
    }
}
