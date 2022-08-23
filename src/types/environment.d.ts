export {};

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            DATABASE_URL: string;
            PREFIX: string;
            MINECRAFT_USERNAME: string;
            TWITCH_CHAT: string;
            TWITCH_CLIENT_ID: string;
            TWITCH_CLIENT_SECRET: string;
            RCON_PORT: number;
            RCON_PASS: string;
            RCON_IP: string;
        }
    }
}
