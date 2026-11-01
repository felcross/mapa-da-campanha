/** Feature flag da ficha de personagem (login-gate + card + telas). */
export function sheetEnabled(): boolean {
  return import.meta.env.VITE_ENABLE_SHEET_CREATOR === "true";
}
