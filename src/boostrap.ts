import { rconClient } from "./api/rcon";
import { loadTwitchTokens } from "./api/twitch";
import { app } from "./common/authServer";

export const bootstrap = async () => {
    if (!(await loadTwitchTokens())) {
        app.listen(16057);
        console.log("Авторизуйтесь с двух аккаунтов и перезапустите бота!");
        return;
    }
    await rconClient.connect().catch(() => {
        console.log("Не удалось подключиться к RCON серверу!");
    });

    console.log("Бот запущен!");
};
