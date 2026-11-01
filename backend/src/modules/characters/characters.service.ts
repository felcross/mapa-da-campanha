import type { Prisma } from "@prisma/client";
import type { CharacterData } from "../../../../shared/schemas/character";
import { characterDataSchema } from "../../../../shared/schemas/character";
import type {
  AuthUser,
  CharacterRecord,
  CharacterSummary,
  ListResponse,
} from "../../../../shared/schemas/api";
import { summarizeCharacter } from "../../../../shared/summarize";
import { AppError } from "../../shared/errors";
import { prisma } from "../../shared/prisma";

type CharacterRow = {
  id: string;
  name: string;
  imageUrl: string | null;
  characterData: unknown;
  createdAt: Date;
  updatedAt: Date;
};

function toRecord(row: CharacterRow): CharacterRecord {
  return {
    id: row.id,
    name: row.name,
    imageUrl: row.imageUrl,
    characterData: row.characterData as CharacterData,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

function toSummary(row: CharacterRow): CharacterSummary {
  const summary = summarizeCharacter(row.characterData as CharacterData);
  return {
    id: row.id,
    name: summary.name,
    imageUrl: summary.imageUrl,
    selections: summary.selections,
    updatedAt: row.updatedAt.toISOString(),
  };
}

function parseData(input: unknown): CharacterData {
  return characterDataSchema.parse(input);
}

function normalizeImageUrl(data: CharacterData): string | null {
  const url = data.imageUrl ?? "";
  return url === "" ? null : url;
}

export async function createCharacter(
  user: AuthUser,
  input: unknown,
): Promise<CharacterRecord> {
  const data = parseData(input);
  const row = await prisma.character.create({
    data: {
      userId: user.id,
      name: data.name,
      imageUrl: normalizeImageUrl(data),
      characterData: data as unknown as Prisma.InputJsonValue,
    },
  });
  return toRecord(row);
}

export async function listCharacters(
  user: AuthUser,
  page: number,
  limit: number,
): Promise<ListResponse<CharacterSummary>> {
  const where = { userId: user.id };
  const [total, rows] = await Promise.all([
    prisma.character.count({ where }),
    prisma.character.findMany({
      where,
      orderBy: { updatedAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
  ]);
  return {
    data: rows.map((row) => toSummary(row as CharacterRow)),
    page,
    limit,
    total,
  };
}

export async function getCharacter(
  user: AuthUser,
  id: string,
): Promise<CharacterRecord> {
  const row = await prisma.character.findFirst({ where: { id, userId: user.id } });
  if (!row) throw new AppError("NOT_FOUND", "Personagem não encontrado");
  return toRecord(row as CharacterRow);
}

export async function updateCharacter(
  user: AuthUser,
  id: string,
  input: unknown,
): Promise<CharacterRecord> {
  const data = parseData(input);
  const existing = await prisma.character.findFirst({ where: { id, userId: user.id } });
  if (!existing) throw new AppError("NOT_FOUND", "Personagem não encontrado");

  const row = await prisma.character.update({
    where: { id: existing.id },
    data: {
      name: data.name,
      imageUrl: normalizeImageUrl(data),
      characterData: data as unknown as Prisma.InputJsonValue,
    },
  });
  return toRecord(row as CharacterRow);
}

export async function deleteCharacter(user: AuthUser, id: string): Promise<void> {
  const existing = await prisma.character.findFirst({ where: { id, userId: user.id } });
  if (!existing) throw new AppError("NOT_FOUND", "Personagem não encontrado");
  await prisma.character.delete({ where: { id: existing.id } });
}
