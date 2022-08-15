import { twitchClient } from "./api/twitch";
import { rconClient } from "./api/rcon";

export const bootstrap = async () => {
    await twitchClient.connect();
    await rconClient.connect();

	console.log("Бот запущен!");
};

