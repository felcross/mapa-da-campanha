import { createHash, randomBytes } from "node:crypto";
import type { User } from "@prisma/client";
import type { AuthUser } from "../../../../shared/schemas/api";
import { env } from "../../config/env";
import { AppError } from "../../shared/errors";
import { prisma } from "../../shared/prisma";
import type { EmailService } from "./email.service";

const LOGIN_TOKEN_TTL_MS = 15 * 60 * 1000; // 15 minutos
const SESSION_TTL_MS = 30 * 24 * 60 * 60 * 1000; // 30 dias fixos

export function hashToken(raw: string): string {
  return createHash("sha256").update(raw).digest("hex");
}

export function generateRawToken(): string {
  return randomBytes(32).toString("hex");
}

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export function toAuthUser(user: User): AuthUser {
  return { id: user.id, email: user.email, role: user.role };
}

/**
 * Inicia a verificação por magic link. Sempre cria um token novo e
 * invalida os anteriores não consumidos (só o link mais novo funciona).
 */
export async function requestVerification(
  email: string,
  emailService: EmailService,
): Promise<void> {
  const normalized = normalizeEmail(email);
  const rawToken = generateRawToken();

  await prisma.$transaction([
    prisma.loginToken.deleteMany({ where: { email: normalized, usedAt: null } }),
    prisma.loginToken.create({
      data: {
        email: normalized,
        tokenHash: hashToken(rawToken),
        expiresAt: new Date(Date.now() + LOGIN_TOKEN_TTL_MS),
      },
    }),
  ]);

  const link = `${env.WEB_URL}/verify?token=${rawToken}`;
  await emailService.sendMagicLink(normalized, link);
}

/**
 * Confirma o magic link: consome o token (single-use), cria/relaciona o
 * usuário e abre a sessão — tudo em uma única transação.
 */
export async function verifyToken(
  rawToken: string,
): Promise<{ user: User; sessionRawToken: string }> {
  const tokenHash = hashToken(rawToken);

  return prisma.$transaction(async (tx) => {
    const loginToken = await tx.loginToken.findUnique({ where: { tokenHash } });
    if (
      !loginToken ||
      loginToken.usedAt !== null ||
      loginToken.expiresAt.getTime() < Date.now()
    ) {
      throw new AppError("INVALID_TOKEN", "Link inválido, expirado ou já utilizado");
    }

    await tx.loginToken.update({
      where: { id: loginToken.id },
      data: { usedAt: new Date() },
    });

    const email = loginToken.email;
    const existing = await tx.user.findUnique({ where: { email } });
    const user = existing
      ? await tx.user.update({
          where: { email },
          data: { emailVerifiedAt: existing.emailVerifiedAt ?? new Date() },
        })
      : await tx.user.create({ data: { email, emailVerifiedAt: new Date() } });

    const sessionRawToken = generateRawToken();
    await tx.session.create({
      data: {
        tokenHash: hashToken(sessionRawToken),
        userId: user.id,
        expiresAt: new Date(Date.now() + SESSION_TTL_MS),
      },
    });

    return { user, sessionRawToken };
  });
}

export async function getSessionUser(
  sessionRawToken: string,
): Promise<{ user: User; sessionRawToken: string } | null> {
  const session = await prisma.session.findUnique({
    where: { tokenHash: hashToken(sessionRawToken) },
    include: { user: true },
  });
  if (!session || session.expiresAt.getTime() < Date.now()) {
    return null;
  }
  return { user: session.user, sessionRawToken };
}

export async function destroySession(sessionRawToken: string): Promise<void> {
  await prisma.session.deleteMany({ where: { tokenHash: hashToken(sessionRawToken) } });
}
