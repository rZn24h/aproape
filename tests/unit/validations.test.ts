import * as v from "valibot";

import { contactDemoSchema } from "@/lib/validations/contact-demo";
import { searchSchema } from "@/lib/validations/search";

const validContact = {
  name: "Ana",
  email: "ana@exemplu.ro",
  sellerType: "persoana",
  category: "diverse",
  message: "Mesaj suficient de lung.",
  terms: true,
};

describe("validări Valibot", () => {
  it("searchSchema elimină spațiile și acceptă localitate goală", () => {
    expect(v.parse(searchSchema, { query: "  frigider ", location: "" })).toEqual({ query: "frigider", location: "" });
  });

  it("searchSchema respinge termeni prea scurți", () => {
    const result = v.safeParse(searchSchema, { query: "a", location: "" });
    expect(result.success).toBe(false);
    expect(result.issues?.[0]?.message).toBe("Scrie cel puțin 2 caractere.");
  });

  it("contactDemoSchema acceptă date valide", () => {
    expect(v.safeParse(contactDemoSchema, validContact).success).toBe(true);
  });

  it("contactDemoSchema raportează mesaje în română", () => {
    const result = v.safeParse(contactDemoSchema, { ...validContact, email: "ana@", terms: false });
    expect(result.success).toBe(false);
    const messages = result.issues?.map((i) => i.message);
    expect(messages).toContain("Introdu o adresă de e-mail validă.");
    expect(messages).toContain("Trebuie să accepți termenii pentru a continua.");
  });
});
