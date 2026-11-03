import { defineCloudflareConfig } from "@opennextjs/cloudflare";

// Fără cache incremental remote (R2) în această etapă: nu există încă
// pagini ISR/date reale. Se va activa odată cu bucket-ul R2 aprobat.
export default defineCloudflareConfig({});
