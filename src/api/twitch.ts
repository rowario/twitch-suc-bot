import { StaticAuthProvider } from "@twurple/auth";
import { PubSubClient } from "@twurple/pubsub";
import ChatMessage from "../client/ChatMessage";
import Client from "../client/Client";

const authProvider = new StaticAuthProvider(
    process.env.TWITCH_CLIENT_ID || "",
    process.env.TWITCH_TOKEN || ""
);

const pubSubAuth = new StaticAuthProvider(
    process.env.TWITCH_CLIENT_ID || "",
    process.env.TWITCH_PUBSUB_TOKEN || ""
);

const pubSubClient = new PubSubClient();

export const client = new Client({
    authProvider,
    channels: [process.env.TWITCH_CHAT || ""],
    prefix: process.env.PREFIX || "!",
    folder: "../commands",
});

client.onJoin(async (channel) => {
    console.log("Успешно подключен к чату: " + channel);

    const userId = await pubSubClient.registerUserListener(pubSubAuth);
    console.log(userId);
    const res = await pubSubClient.onRedemption(userId, (message) => {
        console.log(message.rewardId);
    });
    console.log(res);
});

client.onMessage(async (channel, _, text, message) => {
    try {
        const msg = new ChatMessage(client, text, channel, message);
        await client.tryRunCommand(msg);
    } catch (error) {
        console.log(
            `Получена ошибка при попытке обработать сообщение: "${text}" | Ошибка: ${error}`
        );
    }
});
