import { StaticAuthProvider } from "@twurple/auth";
import ChatMessage from "../client/ChatMessage";
import Client from "../client/Client";

const authProvider = new StaticAuthProvider(
    process.env.TWITCH_CLIENT_ID || "",
    process.env.TWITCH_TOKEN || ""
);

export const client = new Client({
    authProvider,
    channels: [process.env.TWITCH_CHAT || ""],
    prefix: process.env.PREFIX || "!",
    folder: "../commands",
});

client.onJoin((channel) => {
    console.log("Успешно подключен к чату: " + channel);
});

client.onMessage((channel, user, message) => {
    try {
        const msg = new ChatMessage(client, message, channel, user);
        client.tryRunCommand(msg);
    } catch (error) {
        console.log(
            `Получена ошибка при попытке обработать сообщение: "${message}" | Ошибка: ${error}`
        );
    }
});
