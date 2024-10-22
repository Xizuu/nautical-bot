import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
    server: {
        DISCORD_TOKEN: z.string().min(1),
        NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
    },
    runtimeEnv: process.env,
});
