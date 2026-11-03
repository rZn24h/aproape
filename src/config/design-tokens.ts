/** Oglindă TypeScript a tokenurilor de culoare din globals.css (folosită pe pagina Design System). */
export const brandColors = [
  { token: "primary-700", hex: "#137F70", usage: "Butoane și linkuri principale" },
  { token: "primary-500", hex: "#18A88F", usage: "Accente și iconografie" },
  { token: "mint-100", hex: "#E8F7F2", usage: "Suprafețe subtile și selecții" },
  { token: "ink-900", hex: "#172B35", usage: "Text și titluri" },
  { token: "canvas", hex: "#F6F8F8", usage: "Fundal general" },
  { token: "highlight", hex: "#F4B544", usage: "Promovări și accente speciale" },
] as const;

export const derivedColors = [
  { token: "primary-800", hex: "#0F6A5D", usage: "Hover primar; text pe mint-100" },
  { token: "primary-900", hex: "#0B5047", usage: "Stare apăsată" },
  { token: "ink-700", hex: "#33454F", usage: "Text secundar, navigație" },
  { token: "ink-500", hex: "#56656E", usage: "Meta, placeholder, ajutor" },
  { token: "line", hex: "#E2E8F0", usage: "Borduri carduri" },
  { token: "line-strong", hex: "#8A979F", usage: "Borduri controale" },
  { token: "surface-sunken", hex: "#EEF2F3", usage: "Skeleton, placeholder foto" },
  { token: "danger-700", hex: "#B42318", usage: "Erori" },
] as const;

export const spacingScale = [4, 8, 12, 16, 24, 32, 48, 64] as const;

export const radii = [
  { token: "radius-sm", px: 8, usage: "Controale mici" },
  { token: "radius-md", px: 12, usage: "Butoane și inputuri" },
  { token: "radius-lg", px: 16, usage: "Carduri" },
  { token: "radius-2xl", px: 24, usage: "Secțiuni mari" },
] as const;
