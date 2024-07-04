import type { AletheiaClientOptions } from "@/internal/extensions/client";
import { LogLevel } from "@sapphire/framework";
import { ActivityType, GatewayIntentBits } from "discord.js";

export const configuration: AletheiaClientOptions = {
    overrideApplicationCommandsRegistries: true,
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
    loadMessageCommandListeners: true,
    loadSubcommandErrorListeners: true,
    loadDefaultErrorListeners: true,
    defaultPrefix: "aletheia.",
    presence: {
        activities: [
            {
                type: ActivityType.Playing,
                name: "with reality, the manifested. ✨",
            },
        ],
        status: "dnd",
    },
    typing: true,
    logger: {
        level: LogLevel.Debug,
    },
};
