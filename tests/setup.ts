import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

// `server-only` aruncă eroare în afara unui bundle de server; în teste e neutralizat.
vi.mock("server-only", () => ({}));

afterEach(() => {
  cleanup();
});
