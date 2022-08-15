import { StaticAuthProvider } from "@twurple/auth";
import { ChatClient } from "@twurple/chat";

const authProvider = new StaticAuthProvider(
    process.env.TWITCH_CLIENT_ID || "",
    process.env.TWITCH_TOKEN || ""
);
export const twitchClient = new ChatClient({
    authProvider,
	channels: [process.env.TWITCH_CHAT || ""]
});

twitchClient.onJoin((channel) => {
	console.log("Успешно подключен к чату: " + channel);
});

twitchClient.onMessage((channel, user, message) => {
    console.log(channel, user, message);
});
