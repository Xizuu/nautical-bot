import { NauticalCommand } from "@/internal/extensions/command";
import { EmbedBuilder } from "@/internal/extensions/embed-builder";
import { RegisterBehavior } from "@sapphire/framework";
import { type Message, SlashCommandBuilder } from "discord.js";

/**
 * Show information about claiming lands in the server.
 * @version 1.0.0
 */
export class ClaimCommand extends NauticalCommand {
    public constructor(context: NauticalCommand.Context, options: NauticalCommand.Options) {
        super(context, {
            name: "claim",
            aliases: ["claimland", "claimlands"],
            description: "Memperlihatkan informasi untuk mengklaim tanah di server.",
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
        message.reply({
            embeds: [
                new EmbedBuilder()
                    .setTitle("Cara Mengklaim Tanah")
                    .setDescription(
                        "1. Untuk melakukan klaim atau mengklaim tanah, langkah pertama yang harus kamu lakukan adalah mengelilingi tanah yang ingin kamu klaim dengan pagar. Jenis pagar apa pun bisa digunakan - seperti yang ditunjukkan pada gambar berikut.",
                    )
                    .setImage(
                        "https://media.discordapp.net/attachments/1209738753355284500/1258370397317890048/image.png?ex=6687cc42&is=66867ac2&hm=70f7df8393f41cc80037ba87f13c93b25650e735f0aea6ea0a9c0049fe1a40fd&=&format=webp&quality=lossless&width=550&height=276",
                    ),
                new EmbedBuilder()
                    .setDescription(
                        "2. Setelah itu, di bagian mana pun dari pagar tersebut, letakkanlah sebuah tanda (sign) dengan teks **'[rp]'** di dalamnya, seperti yang ditunjukkan pada gambar di bawah ini.",
                    )
                    .setImage(
                        "https://media.discordapp.net/attachments/1209738753355284500/1258370508022485103/image.png?ex=6687cc5c&is=66867adc&hm=06164bda8a00deab53143e0c6a2d08d4f3e9a629f1dc158c0bd59e7926b815d3&=&format=webp&quality=lossless&width=550&height=277",
                    ),
                new EmbedBuilder()
                    .setDescription(
                        "3. Jika sudah, teks pada tanda tersebut akan berubah menjadi indikasi sukses dan menampilkan nama region lahan yang diklaim, seperti yang ditunjukkan pada gambar di bawah ini. Perubahan teks tersebut mengindikasikan bahwa lahan di dalam pagar tersebut telah berhasil kamu klaim.",
                    )
                    .setImage(
                        "https://media.discordapp.net/attachments/1209738753355284500/1258370744375836742/image.png?ex=6687cc94&is=66867b14&hm=915ce2681eb15a54e6c1e304f16845ed3d9a04915a5fd6459efa1a2193306569&=&format=webp&quality=lossless&width=550&height=272",
                    ),
            ],
        });
    }
}
