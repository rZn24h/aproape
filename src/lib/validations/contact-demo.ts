import * as v from "valibot";

/** Schemă demonstrativă pentru pagina Design System. Nu salvează date. */
export const contactDemoSchema = v.object({
  name: v.pipe(
    v.string(),
    v.trim(),
    v.nonEmpty("Introdu numele."),
    v.minLength(2, "Numele trebuie să aibă cel puțin 2 caractere."),
  ),
  email: v.pipe(v.string(), v.trim(), v.nonEmpty("Introdu adresa de e-mail."), v.email("Introdu o adresă de e-mail validă.")),
  sellerType: v.picklist(["persoana", "firma"], "Alege tipul de cont."),
  category: v.pipe(v.string(), v.nonEmpty("Alege o categorie.")),
  message: v.pipe(
    v.string(),
    v.trim(),
    v.minLength(10, "Mesajul trebuie să aibă cel puțin 10 caractere."),
    v.maxLength(500, "Mesajul poate avea cel mult 500 de caractere."),
  ),
  terms: v.pipe(
    v.boolean(),
    v.check((value) => value, "Trebuie să accepți termenii pentru a continua."),
  ),
});

export type ContactDemoInput = v.InferInput<typeof contactDemoSchema>;
export type ContactDemoValues = v.InferOutput<typeof contactDemoSchema>;
