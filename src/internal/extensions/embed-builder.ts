import { Colors } from "@/internal/constants/colors";
import { EmbedBuilder as BaseEmbedBuilder } from "discord.js";

export class EmbedBuilder extends BaseEmbedBuilder {
    public constructor() {
        super();

        this.setColor(Colors.primary);
    }

    isErrorEmbed(): this {
        this.setColor(Colors.error);
        return this;
    }

    isSuccessEmbed(): this {
        this.setColor(Colors.success);
        return this;
    }
}
