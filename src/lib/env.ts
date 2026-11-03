import "server-only";

/**
 * Pagina /dev/design-system este disponibilă doar în development sau când
 * testele E2E o activează explicit (ENABLE_DEV_ROUTES=1 pe server, niciodată NEXT_PUBLIC_).
 */
export function areDevRoutesEnabled(): boolean {
  return process.env.NODE_ENV === "development" || process.env.ENABLE_DEV_ROUTES === "1";
}
