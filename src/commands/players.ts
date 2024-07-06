import { NauticalCommand } from "@/internal/extensions/command";
import { EmbedBuilder } from "@/internal/extensions/embed-builder";
import { RegisterBehavior } from "@sapphire/framework";
import { type Message, SlashCommandBuilder } from "discord.js";

interface PocketServersResponse {
    id: string;
    name: string;
    address: string;
    port: string;
    private: string;
    password: string;
    location: string;
    hostname: string;
    is_online: string;
    players: string;
    maxplayers: string;
    version: string;
    platform: null;
    uptime: string;
    score: string;
    rank: string;
    votes: string;
    favorited: string;
    comments: string;
    url: string;
    last_check: string;
    last_online: string;
}

/**
 * Show information about online players count in the server.
 * @version 1.0.0
 */
export class PlayersCommand extends NauticalCommand {
    public constructor(context: NauticalCommand.Context, options: NauticalCommand.Options) {
        super(context, {
            name: "players",
            aliases: ["online"],
            description: "Memperlihatkan informasi tentang jumlah pemain online di server.",
            requiredClientPermissions: ["SendMessages"],
            preconditions: ["GuildOnly"],
            ...options,
        });
    }

    public override registerApplicationCommands(registry: NauticalCommand.Registry) {
        const command = new SlashCommandBuilder().setName(this.name).setDescription(this.description);

        void registry.registerChatInputCommand(command, {
            behaviorWhenNotIdentical: RegisterBehavior.Overwrite,
            guildIds: [],
            idHints: [],
        });
    }

    public async messageRun(message: Message) {
        const link =
            "https://minecraftpocket-servers.com/api/?object=servers&element=detail&key=hwhkAh8l1NBvsXQwd3YzQktwi5902fRXxig";
        const response = await fetch(link);

        const data: PocketServersResponse = await response.json();

        if (data.is_online === "1") {
            message.reply({
                embeds: [new EmbedBuilder().setDescription(`**${data.players}** pemain online.`).toJSON()],
            });
        }

        if (data.is_online === "0") {
            message.reply({
                embeds: [new EmbedBuilder().setDescription("Server sedang offline.").toJSON()],
            });
        }

        return;
    }

    public async chatInputRun(interaction: NauticalCommand.ChatInputCommandInteraction) {
        const link =
            "https://minecraftpocket-servers.com/api/?object=servers&element=detail&key=hwhkAh8l1NBvsXQwd3YzQktwi5902fRXxig";
        const response = await fetch(link);

        const data: PocketServersResponse = await response.json();

        if (data.is_online === "1") {
            interaction.reply({
                embeds: [new EmbedBuilder().setDescription(`**${data.players}** pemain online.`).toJSON()],
            });
        }

        if (data.is_online === "0") {
            interaction.reply({
                embeds: [new EmbedBuilder().setDescription("Server sedang offline.").toJSON()],
            });
        }

        return;
    }
}
