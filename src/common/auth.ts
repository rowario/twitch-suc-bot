import {
    AccessToken,
    AuthProvider,
    RefreshingAuthProvider,
} from "@twurple/auth";
import { readFile, writeFile } from "fs/promises";
import { TokenType } from "../types/common";

const clientId = process.env.TWITCH_CLIENT_ID || "";
const clientSecret = process.env.TWITCH_CLIENT_SECRET || "";

const authMap = new Map<TokenType, AuthProvider>();

export const getAuthProvider = async (
    type: TokenType
): Promise<AuthProvider | undefined> => {
    try {
        if (authMap.has(type)) {
            return authMap.get(type);
        }
        const authToken = await readFile(`./tokens-${type}.json`, {
            encoding: "utf-8",
        }).then((x) => JSON.parse(x) as AccessToken);

        if (!authToken.accessToken) {
            return undefined;
        }

        authMap.set(
            type,
            new RefreshingAuthProvider(
                {
                    clientId,
                    clientSecret,
                    onRefresh: async (tokenData) => saveToken(type, tokenData),
                },
                authToken
            )
        );

        return authMap.get(type);
    } catch (e) {
        console.log(
            `Не удалось получить данные для "${type}" токена, ошибка: ${e}`
        );
        return undefined;
    }
};

export const saveToken = async (
    type: TokenType,
    tokenData: AccessToken
): Promise<void> => {
    await writeFile(
        `./tokens-${type}.json`,
        JSON.stringify(tokenData, null, 4),
        {
            encoding: "utf-8",
        }
    );
};

export const getAuthLink = (type: TokenType): string => {
    const clientId = process.env.TWITCH_CLIENT_ID || "";

    const scopes = {
        user: "channel:read:redemptions",
        bot: "chat:edit+chat:read",
    };

    const params = [
        ["response_type", "code"],
        ["client_id", clientId],
        ["redirect_uri", `http://localhost:16057/auth_${type}`],
        ["scope", scopes[type]],
        ["force_verify", "true"],
    ]
        .map(([field, value]) => `${field}=${value}`)
        .join("&");
    return `https://id.twitch.tv/oauth2/authorize?${params}`;
};
