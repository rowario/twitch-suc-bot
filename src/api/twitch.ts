import ChatMessage from "../client/ChatMessage";
import Client from "../client/Client";
import { getAuthProvider, getAuthLink } from "../common/auth";

export const loadTwitchTokens = async (): Promise<boolean> => {
    const [userAuthProvider, botAuthProvider] = await Promise.all([
        getAuthProvider("user"),
        getAuthProvider("bot"),
    ]);

    if (!userAuthProvider || !botAuthProvider) {
        if (!userAuthProvider) {
            console.log(
                `Пользовательский токен не установлен, для установки перейдите по ссылке ниже:`
            );
            console.log(getAuthLink("user"));
        }
        if (!botAuthProvider) {
            console.log(
                `Бот токен не установлен, для установки перейдите по ссылке ниже:`
            );
            console.log(getAuthLink("bot"));
        }
        return false;
    }

    const chatClient = new Client({
        authProvider: botAuthProvider,
        channels: [process.env.TWITCH_CHAT || ""],
        prefix: process.env.PREFIX || "!",
        folder: "../commands",
    });

    chatClient.onMessage(async (channel, _, text, message) => {
        try {
            const msg = new ChatMessage(chatClient, text, channel, message);
            await chatClient.tryRunCommand(msg);
        } catch (error) {
            console.log(
                `Получена ошибка при попытке обработать сообщение: "${text}" | Ошибка: ${error}`
            );
        }
    });

    await chatClient
        .connect()
        .then(() => {
            chatClient.loadCommands();
        })
        .catch(() => {
            console.log("Не удалось подключиться к серверу twitch!");
        });

    await chatClient.registerPubSubListener(userAuthProvider);

    return true;
};
