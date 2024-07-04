import { NauticalCommand } from "@/internal/extensions/command";
import { EmbedBuilder } from "@/internal/extensions/embed-builder";
import { RegisterBehavior } from "@sapphire/framework";
import {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    type Message,
    SlashCommandBuilder,
    hyperlink,
    inlineCode,
    italic,
} from "discord.js";

/**
 * Show information about voting for the server and some other information.
 * @version 1.0.0
 */
export class VoteCommand extends NauticalCommand {
    public constructor(context: NauticalCommand.Context, options: NauticalCommand.Options) {
        super(context, {
            name: "vote",
            aliases: ["voting"],
            description: "Memperlihatkan informasi dan link voting untuk server.",
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

    private LINK_VOTE_ONE = "https://nauticalmc.xyz/vote1";
    private LINK_VOTE_TWO = "https://nauticalmc.xyz/vote2";

    private getVoteMessage(): string {
        return `\n\n**${hyperlink("Link Vote 1", this.LINK_VOTE_ONE)}** | **${hyperlink("Link Vote 2", this.LINK_VOTE_TWO)}**\n${italic("atau gunakan tombol di bawah ini.")}\n\n— **REWARD**\nPastikan untuk online di server dan memiliki minimal tiga slot kosong di inventory untuk menerima reward.\n\n— **PENTING**\nKhusus untuk pemain Bedrock/MCPE, pastikan nickname atau username kamu harus diawali dengan titik (.) agar bisa vote. Contoh: ${inlineCode(".Velloist_")}`;
    }

    public async chatInputRun(interaction: NauticalCommand.ChatInputCommandInteraction) {
        const voteButtons = new ActionRowBuilder<ButtonBuilder>().addComponents(
            new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel("Vote 1").setURL(this.LINK_VOTE_ONE),
            new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel("Vote 2").setURL(this.LINK_VOTE_TWO),
        );

        interaction.reply({
            embeds: [new EmbedBuilder().setDescription(this.getVoteMessage())],
            components: [voteButtons],
        });
    }

    public async messageRun(message: Message) {
        const voteButtons = new ActionRowBuilder<ButtonBuilder>().addComponents(
            new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel("Vote 1").setURL(this.LINK_VOTE_ONE),
            new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel("Vote 2").setURL(this.LINK_VOTE_TWO),
        );

        message.reply({
            embeds: [new EmbedBuilder().setDescription(this.getVoteMessage())],
            components: [voteButtons],
        });
    }
}
