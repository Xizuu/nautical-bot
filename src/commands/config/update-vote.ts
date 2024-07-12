import { updateVoteMessage } from "@/data/handler";
import { DEVELOPERS } from "@/internal/constants/developers";
import { NauticalCommand } from "@/internal/extensions/command";
import { RegisterBehavior } from "@sapphire/framework";
import { type Message, SlashCommandBuilder } from "discord.js";

/**
 * Set Vote command content from message id.
 * @version 1.0.0
 */
export class SetVoteCommand extends NauticalCommand {
    public constructor(context: NauticalCommand.Context, options: NauticalCommand.Options) {
        super(context, {
            name: "setvote",
            description: "Set Vote command content from message id.",
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
                option
                    .setName("messageid")
                    .setDescription("The message id to set the IP command content from.")
                    .setRequired(true),
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

        const messageId: string = interaction.options.getString("messageid", true);

        if (!interaction.channel) {
            return await interaction.reply("This command cannot be used in a context without a channel.");
        }

        try {
            const message: Message = await interaction.channel.messages.fetch(messageId);
            const content: string = message.content;

            updateVoteMessage(messageId, content);

            return await interaction.reply("The vote message has been updated.");
        } catch {
            return await interaction.reply("The message id provided is invalid.");
        }
    }
}
