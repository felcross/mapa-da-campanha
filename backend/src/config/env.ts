import { config } from "dotenv";
import { z } from "zod";
import { resolve } from "node:path";

config({ path: resolve(import.meta.dirname, "../../.env") });

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().int().positive().default(3001),
  DATABASE_URL: z.string().min(1, "DATABASE_URL é obrigatória"),
  WEB_URL: z.string().url("WEB_URL deve ser uma URL válida"),
  LOG_LEVEL: z
    .enum(["fatal", "error", "warn", "info", "debug", "trace", "silent"])
    .default("info"),
  SMTP_HOST: z.string().min(1, "SMTP_HOST é obrigatório"),
  SMTP_PORT: z.coerce.number().int().positive().default(1025),
  SMTP_FROM: z.string().min(1, "SMTP_FROM é obrigatório"),
  SMTP_USER: z.string().optional(),
  SMTP_PASS: z.string().optional(),
});

export type Env = z.infer<typeof envSchema>;

function loadEnv(): Env {
  const parsed = envSchema.safeParse(process.env);
  if (!parsed.success) {
    console.error("Variáveis de ambiente inválidas:");
    for (const issue of parsed.error.issues) {
      console.error(`  ${issue.path.join(".")}: ${issue.message}`);
    }
    process.exit(1);
  }
  return parsed.data;
}

export const env: Env = loadEnv();
