import { exchangeCode } from "@twurple/auth";
import bodyParser from "body-parser";
import express, { Request, Response } from "express";
import { TokenType } from "../types/common";
import { saveToken } from "./auth";

export const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

interface AuthData {
    code?: string;
}

const exchangeAndSave = async (
    type: TokenType,
    code: string,
    res: Response
): Promise<void> => {
    try {
        const clientId = process.env.TWITCH_CLIENT_ID || "";
        const clientSecret = process.env.TWITCH_CLIENT_SECRET || "";
        const auth = await exchangeCode(
            clientId,
            clientSecret,
            code,
            `http://localhost:16057/auth_${type}`
        );

        await saveToken(type, auth);

        console.log("Токен успешно установлен!");
        res.send("Токен успешно установлен!").status(200);
    } catch (e) {
        res.send("Unauthorized!").status(401);
    }
};

app.get("/auth_bot", async (req: Request<{}, {}, {}, AuthData>, res) => {
    const { code } = req.query;
    if (code) {
        await exchangeAndSave("bot", code, res);
    } else {
        res.send("Bad request!").status(400);
    }
});

app.get("/auth_user", async (req: Request<{}, {}, {}, AuthData>, res) => {
    const { code } = req.query;
    if (code) {
        await exchangeAndSave("user", code, res);
    } else {
        res.send("Bad request!").status(400);
    }
});
