import ChatMessage from "./ChatMessage";
import Client from "./Client";

export interface CommandOptions {
    name: string;
    aliases: string[];
    modOnly?: boolean;
    broadcasterOnly?: boolean;
    redemptionOnly?: boolean;
}

export class BaseCommand {
    public name: string;
    public aliases: string[];
    public redeemId: string | null = null;
    public constructor(public client: Client, public options: CommandOptions) {
        this.name = options.name;
        this.aliases = options.aliases;
    }

    async run(msg: ChatMessage): Promise<void> {}

    checkAccess(msg: ChatMessage): boolean {
        if (this.options.modOnly && !msg.user.isMod) {
            return false;
        }
        if (this.options.broadcasterOnly && !msg.user.isBroadcaster) {
            return false;
        }
        if (this.options.redemptionOnly && !msg.message.isRedemption) {
            return false;
        }
        return true;
    }
}
