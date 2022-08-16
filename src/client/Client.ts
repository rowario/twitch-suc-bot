import { ChatClient, ChatClientOptions, ChatUser } from "@twurple/chat";
import { BaseCommand } from "./BaseCommand";
import ChatMessage from "./ChatMessage";
import { readdirSync } from "fs";
import path from "path";

interface ClientOptions extends ChatClientOptions {
    prefix: string;
    folder: string;
}

export default class Client extends ChatClient {
    private commands: BaseCommand[] = [];

    constructor(private options: ClientOptions) {
        super(options);
    }

    async loadCommands(): Promise<void> {
        const folderPath = path.join(__dirname, this.options.folder);
        readdirSync(folderPath).forEach((fileName) => {
            let file = require(path.join(folderPath, fileName));

            if (typeof file.default === "function") {
                file = file.default;
            }

            if (file.prototype instanceof BaseCommand) {
                const command: BaseCommand = new file(this);
                this.commands.push(command);
                console.log(`Комманда "${command.name}" подключена!`);
            } else {
                console.log(`Файл "${fileName}" не является коммандой :(`);
            }
        });
    }

    async tryRunCommand(msg: ChatMessage): Promise<void> {
        const [possibleCommand] = msg.originalText.split(" ");
        if (possibleCommand.startsWith(this.options.prefix)) {
            const parsed = possibleCommand.replace(this.options.prefix, "");
            const command = this.commands.find((x) => {
                if (x.name == parsed) {
                    return x;
                }

                if (x.aliases.includes(parsed)) {
                    return x;
                }
            });
            if (command && command.checkAccess(msg)) {
                await command.run(msg);
            }
        }
    }
}
