import { Rcon } from "rcon-client";

export const rconClient = new Rcon({
    host: process.env.RCON_IP || "",
    port: Number(process.env.RCON_PORT || 0),
    password: process.env.RCON_PASS || "",
});

rconClient.on("authenticated", () => {
    rconClient.send("say Ну привет");
});
