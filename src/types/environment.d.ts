export {};

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            DATABASE_URL: string;
            TWITCH_CHAT: string;
            TWITCH_TOKEN: string;
            TWITCH_REFRESH_TOKEN: string;
            TWITCH_CLIENT_ID: string;
            RCON_PORT: number;
            RCON_PASS: string;
            RCON_IP: string;
        }
    }
}
