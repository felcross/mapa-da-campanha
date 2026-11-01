import type { CharacterData } from "./schemas/character";
import type { CharacterSelectionsSummary } from "./schemas/api";
import { ESTILO_AUTORIDADES, POSTURA_AUTORIDADE } from "./schemas/options";

export interface CharacterSummaryData {
  name: string;
  imageUrl: string | null;
  selections: CharacterSelectionsSummary;
}

/** Deriva o resumo do card a partir de characterData. Função pura — usada pelo backend. */
export function summarizeCharacter(data: CharacterData): CharacterSummaryData {
  const raw = data.imageUrl ?? "";
  return {
    name: data.name,
    imageUrl: raw === "" ? null : raw,
    selections: {
      postura: data.selections.postura,
      estilo: data.selections.estilo,
      manobraEstilo: data.selections.manobraEstilo,
      manobrasEspeciais: [...data.selections.manobrasEspeciais],
    },
  };
}

/**
 * Especialização: a postura escolhida dá +1 Elevação quando casa com
 * uma das autoridades do estilo (regra de posturas-estilos).
 */
export function hasEspecializacao(data: CharacterData): boolean {
  const posturaAttr = POSTURA_AUTORIDADE[data.selections.postura];
  return ESTILO_AUTORIDADES[data.selections.estilo].includes(posturaAttr);
}
