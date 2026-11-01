import type { CharacterData } from "./character";
import type { Estilo, ManobraEspecial, ManobraEstilo, Postura } from "./options";

export type UserRole = "player" | "admin";

export interface AuthUser {
  id: string;
  email: string;
  role: UserRole;
}

export interface MeResponse {
  user: AuthUser;
  csrfToken: string;
}

export interface VerifyResponse {
  user: AuthUser;
}

export interface RequestEmailResponse {
  ok: true;
}

export interface CharacterSelectionsSummary {
  postura: Postura;
  estilo: Estilo;
  manobraEstilo: ManobraEstilo;
  manobrasEspeciais: ManobraEspecial[];
}

export interface CharacterSummary {
  id: string;
  name: string;
  imageUrl: string | null;
  selections: CharacterSelectionsSummary;
  updatedAt: string;
}

export interface CharacterRecord {
  id: string;
  name: string;
  imageUrl: string | null;
  characterData: CharacterData;
  createdAt: string;
  updatedAt: string;
}

export interface ListResponse<T> {
  data: T[];
  page: number;
  limit: number;
  total: number;
}
