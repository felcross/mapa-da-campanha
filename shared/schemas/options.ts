// Opções e limites derivados de src/data/categories.ts (As Seis Harmonias).
// Fonte única — nunca derivar de backup/ ou do sistema L5R.

export const DIE_STEPS = ["1d4", "1d6", "1d8", "1d10", "1d12", "1d12+2", "1d12+4"] as const;
export type DieStep = (typeof DIE_STEPS)[number];

export const MANOBRA_DIE_STEPS = ["1d4", "1d6", "1d8", "1d10", "1d12"] as const;
export type ManobraDieStep = (typeof MANOBRA_DIE_STEPS)[number];

export const FAJIN_DIE_STEPS = ["1d4", "1d6", "1d8", "1d10"] as const;
export type FaJinDieStep = (typeof FAJIN_DIE_STEPS)[number];

export const POSTURAS = ["falcao", "tigre", "tartaruga", "serpente"] as const;
export type Postura = (typeof POSTURAS)[number];

export const ESTILOS = [
  "tempestade",
  "fluxo-inversivo",
  "montanha",
  "garra",
  "vortice",
  "muralha",
] as const;
export type Estilo = (typeof ESTILOS)[number];

export const MANOBRAS_ESTILO = ["pular", "rasteira", "fintar"] as const;
export type ManobraEstilo = (typeof MANOBRAS_ESTILO)[number];

export const MANOBRAS_ESPECIAIS = ["corrida-cinetica", "arremessar"] as const;
export type ManobraEspecial = (typeof MANOBRAS_ESPECIAIS)[number];

/** Autoridade (antes: atributo) associada a cada postura. */
export const POSTURA_AUTORIDADE: Record<Postura, "velocidade" | "forca" | "resistencia" | "reflexo"> = {
  falcao: "velocidade",
  tigre: "forca",
  tartaruga: "resistencia",
  serpente: "reflexo",
};

/** Par de autoridades de cada estilo. */
export const ESTILO_AUTORIDADES: Record<
  Estilo,
  readonly ("velocidade" | "forca" | "resistencia" | "reflexo")[]
> = {
  tempestade: ["velocidade", "forca"],
  "fluxo-inversivo": ["velocidade", "reflexo"],
  montanha: ["forca", "resistencia"],
  garra: ["forca", "reflexo"],
  vortice: ["resistencia", "velocidade"],
  muralha: ["resistencia", "reflexo"],
};
