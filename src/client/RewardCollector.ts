import { PubSubListener } from "@twurple/pubsub/lib";
import Client from "./Client";

export default class RewardCollector {
    private pubSubListener?: PubSubListener;
    private messageListener?: { unbind: () => void };
    private inWork = false;

    constructor(
        private client: Client,
        private userId: string,
        private time: number = 30000
    ) {}

    async start(username: string, callback: (rewardId: string) => void) {
        this.client.isActiveHandlers = false;
        this.pubSubListener = await this.client.onRedemption(
            this.userId,
            (message) => {
                if (message.userName !== username) return;
                this.stop();
                callback(message.rewardId);
            }
        );
        this.messageListener = this.client.onMessage((_, user, __, message) => {
            if (user !== username) return;
            const rewardId = message.tags.get("custom-reward-id");
            if (!rewardId) return;
            this.stop();
            callback(rewardId);
        });

        this.inWork = true;

        setTimeout(() => {
            if (this.inWork) this.stop();
        }, this.time);
    }

    async stop() {
        if (this.pubSubListener) await this.pubSubListener.remove();
        if (this.messageListener) this.messageListener.unbind();
        this.client.isActiveHandlers = true;
        this.inWork = false;
    }
}
