import * as v from "valibot";

/** Valorile trimise de SearchBar. Conectarea la motorul de căutare se face în M03. */
export const searchSchema = v.object({
  query: v.pipe(
    v.string(),
    v.trim(),
    v.minLength(2, "Scrie cel puțin 2 caractere."),
    v.maxLength(100, "Folosește cel mult 100 de caractere."),
  ),
  location: v.pipe(v.string(), v.trim(), v.maxLength(80, "Folosește cel mult 80 de caractere.")),
});

export type SearchInput = v.InferInput<typeof searchSchema>;
export type SearchValues = v.InferOutput<typeof searchSchema>;
