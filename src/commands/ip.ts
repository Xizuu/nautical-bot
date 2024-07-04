import { NauticalCommand } from "@/internal/extensions/command";
import { EmbedBuilder } from "@/internal/extensions/embed-builder";
import { RegisterBehavior } from "@sapphire/framework";
import { type Message, SlashCommandBuilder } from "discord.js";

/**
 * Show information about the Minecraft server IP.
 * @version 1.0.0
 */
export class IpCommand extends NauticalCommand {
    public constructor(context: NauticalCommand.Context, options: NauticalCommand.Options) {
        super(context, {
            name: "ip",
            aliases: ["server", "serverip"],
            description: "Memperlihatkan informasi dan link IP server.",
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

    private IP = "play.nauticalmc.xyz";

    private getMessage(): string {
        return `**${this.IP}**\n\n`;
    }

    public async chatInputRun(interaction: NauticalCommand.ChatInputCommandInteraction) {
        interaction.reply({
            embeds: [new EmbedBuilder().setDescription(this.getMessage())],
        });
    }

    public async messageRun(message: Message) {
        message.reply({
            embeds: [new EmbedBuilder().setDescription(this.getMessage())],
        });
    }
}
