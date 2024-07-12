import { readMessages } from "@/data/handler";
import { NauticalCommand } from "@/internal/extensions/command";
import { EmbedBuilder } from "@/internal/extensions/embed-builder";
import { RegisterBehavior } from "@sapphire/framework";
import { type Message, SlashCommandBuilder } from "discord.js";

/**
 * Show information about version compatibility.
 * @version 1.0.0
 */
export class VersionCommand extends NauticalCommand {
    public constructor(context: NauticalCommand.Context, options: NauticalCommand.Options) {
        super(context, {
            name: "version",
            description: "Memperlihatkan informasi kompatabilitas versi Minecraft.",
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

    public async chatInputRun(interaction: NauticalCommand.ChatInputCommandInteraction) {
        const config = await readMessages();

        interaction.reply({
            embeds: [
                new EmbedBuilder().setDescription(`Bedrock: ${config.version.bedrock}\nJava: ${config.version.java}`),
            ],
        });
    }

    public async messageRun(message: Message) {
        const config = await readMessages();

        message.reply({
            embeds: [
                new EmbedBuilder().setDescription(`Bedrock: ${config.version.bedrock}\nJava: ${config.version.java}`),
            ],
        });
    }
}
