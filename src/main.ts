import { env } from "@/environment";
import { AletheiaClient } from "@/internal/extensions/client";
import "@sapphire/plugin-logger/register";
import { configuration } from "./configuration";

/**
 * The main entrypoint for the bot.
 * @see VasileiaClient
 */
const main = async (): Promise<void> => {
    void new AletheiaClient(configuration).login(env.DISCORD_TOKEN);
};

void main();
