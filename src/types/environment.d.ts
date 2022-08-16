export {};

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            DATABASE_URL: string;
            PREFIX: string;
            TWITCH_CHAT: string;
            TWITCH_CHAT_ID: number;
            TWITCH_TOKEN: string;
            TWITCH_PUBSUB_TOKEN: string;
            TWITCH_CLIENT_ID: string;
            RCON_PORT: number;
            RCON_PASS: string;
            RCON_IP: string;
        }
    }
}
