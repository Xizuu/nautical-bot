import type { NauticalClientOptions } from "@/internal/extensions/client";
import { LogLevel } from "@sapphire/framework";
import { ActivityType, GatewayIntentBits } from "discord.js";

export const configuration: NauticalClientOptions = {
    overrideApplicationCommandsRegistries: true,
    intents: [GatewayIntentBits.MessageContent, GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
    loadMessageCommandListeners: true,
    loadSubcommandErrorListeners: true,
    loadDefaultErrorListeners: true,
    defaultPrefix: "n!",
    presence: {
        activities: [
            {
                type: ActivityType.Playing,
                name: "play.nauticalmc.xyz",
            },
        ],
        status: "dnd",
    },
    typing: true,
    logger: {
        level: LogLevel.Debug,
    },
};
