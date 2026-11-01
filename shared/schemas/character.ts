import { z } from "zod";
import {
  DIE_STEPS,
  ESTILOS,
  FAJIN_DIE_STEPS,
  MANOBRAS_ESPECIAIS,
  MANOBRAS_ESTILO,
  MANOBRA_DIE_STEPS,
  POSTURAS,
} from "./options";

function isWellFormedUrl(value: string): boolean {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
}

const dieStep = z.enum(DIE_STEPS);
const manobraDie = z.enum(MANOBRA_DIE_STEPS);
const faJinDie = z.enum(FAJIN_DIE_STEPS);

const resourceSchema = z
  .object({
    current: z.number().int().min(0),
    max: z.number().int().min(0),
  })
  .refine((r) => r.current <= r.max, {
    message: "current não pode exceder max",
    path: ["current"],
  });

export const imageUrlSchema = z
  .string()
  .trim()
  .max(2048)
  .refine((v) => v === "" || (v.startsWith("https://") && isWellFormedUrl(v)), {
    message: "imageUrl deve ser uma URL https válida",
  });

export const characterDataSchema = z.object({
  schemaVersion: z.literal(1),
  name: z.string().trim().min(1).max(80),
  imageUrl: imageUrlSchema.optional(),
  autoridades: z.object({
    velocidade: dieStep,
    forca: dieStep,
    resistencia: dieStep,
    reflexo: dieStep,
    movimento: dieStep,
    yin: dieStep,
    yang: dieStep,
  }),
  resources: z.object({
    chi: resourceSchema,
    prana: resourceSchema,
    vida: resourceSchema,
  }),
  selections: z.object({
    postura: z.enum(POSTURAS),
    estilo: z.enum(ESTILOS),
    manobraEstilo: z.enum(MANOBRAS_ESTILO),
    manobrasEspeciais: z.array(z.enum(MANOBRAS_ESPECIAIS)),
  }),
  diceProgression: z.object({
    manobraEstilo: manobraDie,
    manobraEspecial: manobraDie,
    faJin: faJinDie,
  }),
  notes: z.string().max(2000).optional(),
});

export type CharacterData = z.infer<typeof characterDataSchema>;
