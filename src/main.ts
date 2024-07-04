import { env } from "@/environment";
import { NauticalClient } from "@/internal/extensions/client";
import "@sapphire/plugin-logger/register";
import { configuration } from "./configuration";

/**
 * The main entrypoint for the bot.
 * @see NauticalClient
 */
const main = async (): Promise<void> => {
    void new NauticalClient(configuration).login(env.DISCORD_TOKEN);
};

void main();
