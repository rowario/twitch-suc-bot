import { loadCommands, twitchClient } from "./api/twitch";
import { rconClient } from "./api/rcon";

export const bootstrap = async () => {
    await twitchClient
        .connect()
        .then(() => {
            loadCommands("../commands");
        })
        .catch((error) => {
            console.log(`Произошла критичиская ошибка: `, error);
            process.exit(0);
        });
    await rconClient.connect().catch(() => {
        console.log("Не удалось подключиться к RCON серверу!");
    });

    console.log("Бот запущен!");
};
