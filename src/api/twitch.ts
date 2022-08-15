import { StaticAuthProvider } from "@twurple/auth";
import { ChatClient } from "@twurple/chat";
import ChatMessage from "../client/ChatMessage";
import { BaseCommand } from "../client/BaseCommand";
import { readdirSync } from "fs";
import path from "path";

const commands = new Map<string, BaseCommand>();
const prefix = process.env.PREFIX || "!";

export const loadCommands = async (folder: string) => {
    const folderPath = path.join(__dirname, folder);
    readdirSync(folderPath).forEach((fileName) => {
        let file = require(path.join(folderPath, fileName));

        console.log(file);

        if (typeof file.default === "function") {
            file = file.default;
        }

        if (file.prototype instanceof BaseCommand) {
            const command: BaseCommand = new file(twitchClient);
            commands.set(command.name, command);
            console.log(`Комманда "${command.name}" подключена!`);
        } else {
            console.log(`Файл "${fileName}" не является коммандой :(`);
        }
    });
};

const authProvider = new StaticAuthProvider(
    process.env.TWITCH_CLIENT_ID || "",
    process.env.TWITCH_TOKEN || ""
);
export const twitchClient = new ChatClient({
    authProvider,
    channels: [process.env.TWITCH_CHAT || ""],
});

twitchClient.onJoin((channel) => {
    console.log("Успешно подключен к чату: " + channel);
});

twitchClient.onMessage((channel, user, message) => {
    try {
        const [possibleCommand] = message.split(" ");
        const msg = new ChatMessage(twitchClient, message, channel, user);

        if (possibleCommand.startsWith(prefix)) {
            const command = commands.get(possibleCommand.replace(prefix, ""));
            if (command) {
                command.run(msg);
            }
        }
    } catch (error) {
        console.log(
            `Получена ошибка при попытке обработать сообщение: "${message}" | Ошибка: ${error}`
        );
    }
});