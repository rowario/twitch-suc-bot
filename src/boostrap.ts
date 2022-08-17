import { rconClient } from "./api/rcon";
import { startTwitch } from "./api/twitch";
import { app } from "./common/authServer";

export const bootstrap = async () => {
    const started = await startTwitch();
    if (!started) {
        app.listen(16057);
		console.log("Авторизуйтесь с двух аккаунтов и перезапустите бота!");
		return;
    }
    await rconClient.connect().catch(() => {
        console.log("Не удалось подключиться к RCON серверу!");
    });

    console.log("Бот запущен!");
};
