import { rconClient } from "../api/rcon";
import { BaseAction } from "../client/BaseAction";
import Client from "../client/Client";

export default class DecreaseHp extends BaseAction {
    constructor(client: Client) {
        super(client, {
            name: "increase_hp",
        });
    }

    async run(): Promise<void> {
        const username = process.env.MINECRAFT_USERNAME || "";
        if (username) return;
        rconClient.send(`effect give ${username} minecraft:instant_health`);
    }
}
