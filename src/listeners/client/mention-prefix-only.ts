import { EmbedBuilder } from "@/internal/extensions/embed-builder";
import { NauticalEvents } from "@/internal/types/events";
import { Listener } from "@sapphire/framework";
import type { Message } from "discord.js";

export class MentionPrefixOnlyListener extends Listener {
    public constructor(context: Listener.LoaderContext, options: Listener.Options) {
        super(context, {
            ...options,
            once: false,
            event: NauticalEvents.MentionPrefixOnly,
        });
    }

    public async run(message: Message) {
        return message.reply({
            embeds: [
                new EmbedBuilder()
                    .setDescription(
                        "Gunakan salah satu perintah berikut untuk melihat informasi lebih lanjut:\n\n— **n!ip**, ip server.\n— **n!vote**, link voting.\n— **n!claim**, tutorial claim tanah.\n— **n!player**, jumlah pemain online.",
                    )
                    .setFooter({
                        text: "Dibuat oleh @elizielx | NauticalCraft",
                    }),
            ],
        });
    }
}
