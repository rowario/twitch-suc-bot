import { ChatClient, ChatClientOptions } from "@twurple/chat";
import { BaseCommand } from "./BaseCommand";
import ChatMessage from "./ChatMessage";
import { readdirSync } from "fs";
import path from "path";
import {
    PubSubClient,
    PubSubListener,
    PubSubRedemptionMessage,
} from "@twurple/pubsub";
import { AuthProvider } from "@twurple/auth";
import { getRedemption } from "../repositories/redemptions";
import { BaseAction } from "./BaseAction";

interface ClientOptions extends ChatClientOptions {
    prefix: string;
    commandsFolder: string;
    actionsFolder: string;
}

export default class Client extends ChatClient {
    private commands: BaseCommand[] = [];
    private actions: BaseAction[] = [];
    private pubSubClient: PubSubClient;
    public isActiveHandlers: boolean = true;

    constructor(private options: ClientOptions) {
        super(options);
        this.pubSubClient = new PubSubClient();
    }

    public async onRedemption(
        user: string,
        callback: (message: PubSubRedemptionMessage) => void
    ): Promise<PubSubListener<never>> {
        return this.pubSubClient.onRedemption(user, callback);
    }

    public async registerPubSubListener(
        authProvider: AuthProvider,
        user?: string
    ): Promise<string> {
        return this.pubSubClient.registerUserListener(authProvider, user);
    }

    async loadCommands(): Promise<void> {
        const folderPath = path.join(__dirname, this.options.commandsFolder);
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

    async loadActions(): Promise<void> {
        const folderPath = path.join(__dirname, this.options.actionsFolder);
        readdirSync(folderPath).forEach((fileName) => {
            let file = require(path.join(folderPath, fileName));

            if (typeof file.default === "function") {
                file = file.default;
            }

            if (file.prototype instanceof BaseAction) {
                const action: BaseAction = new file(this);
                this.actions.push(action);
                console.log(`Действие "${action.name}" подключена!`);
            } else {
                console.log(`Файл "${fileName}" не является :(`);
            }
        });
    }

    async tryRunAction(rewardId: string): Promise<void> {
        if (!this.isActiveHandlers) return;
        const redemption = await getRedemption(rewardId);
        if (!redemption) return;

        const action = this.actions.find((x) => {
            if (x.name == redemption.action) {
                return x;
            }
        });
        if (action) {
            await action.run();
        }
    }

    async tryRunCommand(msg: ChatMessage): Promise<void> {
        if (!this.isActiveHandlers) return;
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
