import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

const config = [
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/ban-ts-comment": "error",
      "no-restricted-imports": [
        "error",
        {
          paths: [
            { name: "zod", message: "Proiectul folosește Valibot, nu Zod." },
            { name: "@hookform/resolvers/zod", message: "Folosește @hookform/resolvers/valibot." },
          ],
        },
      ],
    },
  },
  {
    ignores: [".next/**", ".open-next/**", ".wrangler/**", "node_modules/**", "playwright-report/**", "test-results/**", "next-env.d.ts", "cloudflare-env.d.ts"],
  },
];

export default config;
