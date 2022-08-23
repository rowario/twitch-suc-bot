import { rconClient } from "../api/rcon";
import { BaseAction } from "../client/BaseAction";
import Client from "../client/Client";
import { getRandomMob } from "../data/mobs";

export default class SpawnMob extends BaseAction {
    constructor(client: Client) {
        super(client, {
            name: "spawn_mob",
        });
    }

    async run(): Promise<void> {
        const username = process.env.MINECRAFT_USERNAME || "";
        if (username) return;
        const randomMob = getRandomMob();
        rconClient.send(
            `execute at ${username} run summon ${randomMob.spawnCommand} ~ ~ ~`
        );
    }
}
