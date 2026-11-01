import { pino } from "pino";
import { env } from "../config/env";

const EMAIL_PATTERN = /([^\s@]+)@([^\s@]+\.[^\s@]+)/g;

export function maskEmail(email: string): string {
  return email.replace(EMAIL_PATTERN, (_m, user: string, domain: string) => {
    const head = user.slice(0, 2);
    return `${head}${"*".repeat(Math.max(user.length - 2, 1))}@${domain}`;
  });
}

export const logger = pino({
  level: env.LOG_LEVEL,
  redact: {
    paths: ["req.headers.cookie", "req.headers.authorization", "token", "*.token", "password"],
    censor: "[redacted]",
  },
  transport:
    env.NODE_ENV === "development"
      ? { target: "pino/file", options: { destination: 1 } }
      : undefined,
});
