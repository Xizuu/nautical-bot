import { updateIp } from "@/data/handler";
import { DEVELOPERS } from "@/internal/constants/developers";
import { NauticalCommand } from "@/internal/extensions/command";
import { RegisterBehavior } from "@sapphire/framework";
import { SlashCommandBuilder } from "discord.js";

/**
 * Set IP command content from param.
 * @version 1.0.0
 */
export class SetIpCommand extends NauticalCommand {
    public constructor(context: NauticalCommand.Context, options: NauticalCommand.Options) {
        super(context, {
            name: "setip",
            description: "Set IP command content from param.",
            requiredClientPermissions: ["SendMessages"],
            preconditions: ["GuildOnly"],
            ...options,
        });
    }

    public override registerApplicationCommands(registry: NauticalCommand.Registry) {
        const command = new SlashCommandBuilder()
            .setName(this.name)
            .setDescription(this.description)
            .addStringOption((option) =>
                option.setName("domain").setDescription("The Minecraft server domain.").setRequired(true),
            );

        void registry.registerChatInputCommand(command, {
            behaviorWhenNotIdentical: RegisterBehavior.Overwrite,
            guildIds: [],
            idHints: [],
        });
    }

    public async chatInputRun(interaction: NauticalCommand.ChatInputCommandInteraction) {
        if (!DEVELOPERS.includes(interaction.user.id)) {
            return await interaction.reply("You are not authorized to use this command.");
        }

        const domainParam: string = interaction.options.getString("domain", true);

        if (!interaction.channel) {
            return await interaction.reply("This command cannot be used in a context without a channel.");
        }

        try {
            updateIp(domainParam);

            return await interaction.reply("The IP message has been updated.");
        } catch (error) {
            this.container.logger.error(error);
            return await interaction.reply("The domain string provided is invalid.");
        }
    }
}
