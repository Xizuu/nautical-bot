import { updateVersion } from "@/data/handler";
import { DEVELOPERS } from "@/internal/constants/developers";
import { NauticalCommand } from "@/internal/extensions/command";
import { RegisterBehavior } from "@sapphire/framework";
import { SlashCommandBuilder } from "discord.js";

/**
 * Set Version command content from message id.
 * @version 1.0.0
 */
export class SetVersionCommand extends NauticalCommand {
    public constructor(context: NauticalCommand.Context, options: NauticalCommand.Options) {
        super(context, {
            name: "setversion",
            description: "Set Version command content from message id.",
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
                option.setName("bedrock").setDescription("The bedrock version.").setRequired(true),
            )
            .addStringOption((option) => option.setName("java").setDescription("The java version.").setRequired(true));

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

        const bedrock: string = interaction.options.getString("bedrock", true);
        const java: string = interaction.options.getString("java", true);

        if (!interaction.channel) {
            return await interaction.reply("This command cannot be used in a context without a channel.");
        }

        try {
            updateVersion(bedrock, java);

            return await interaction.reply("The version message has been updated.");
        } catch {
            return await interaction.reply("The message id provided is invalid.");
        }
    }
}
