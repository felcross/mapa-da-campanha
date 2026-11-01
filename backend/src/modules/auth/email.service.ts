import nodemailer, { type Transporter } from "nodemailer";
import { env } from "../../config/env";

export interface EmailService {
  sendMagicLink(email: string, link: string): Promise<void>;
}

export class NodemailerEmailService implements EmailService {
  private transporter: Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: env.SMTP_HOST,
      port: env.SMTP_PORT,
      secure: env.SMTP_PORT === 465,
      auth:
        env.SMTP_USER && env.SMTP_PASS
          ? { user: env.SMTP_USER, pass: env.SMTP_PASS }
          : undefined,
    });
  }

  async sendMagicLink(email: string, link: string): Promise<void> {
    await this.transporter.sendMail({
      from: env.SMTP_FROM,
      to: email,
      subject: "Seu link de acesso",
      text: `Use este link para entrar (válido por 15 minutos):\n\n${link}\n\nSe você não pediu este acesso, pode ignorar este e-mail.`,
      html: `<p>Use este link para entrar (válido por 15 minutos):</p><p><a href="${link}">${link}</a></p><p>Se você não pediu este acesso, pode ignorar este e-mail.</p>`,
    });
  }
}

export class FakeEmailService implements EmailService {
  readonly sent: { email: string; link: string }[] = [];

  async sendMagicLink(email: string, link: string): Promise<void> {
    this.sent.push({ email, link });
  }
}
