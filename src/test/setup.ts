import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterAll, afterEach, beforeAll, beforeEach, vi } from "vitest";
import { server } from "src/test/server";
import { transactions } from "src/mocks/data/handlers/constants";

vi.mock("msw", async (importOriginal) => ({
  ...(await importOriginal<typeof import("msw")>()),
  delay: () => Promise.resolve(),
}));

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

class ResizeObserverMock {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
}

vi.stubGlobal("ResizeObserver", ResizeObserverMock);

const originalGetBoundingClientRect = Element.prototype.getBoundingClientRect;
const chartRect = {
  width: 800,
  height: 400,
  top: 0,
  right: 800,
  bottom: 400,
  left: 0,
  x: 0,
  y: 0,
  toJSON: () => ({}),
} satisfies DOMRect;

Element.prototype.getBoundingClientRect = vi.fn(function (this: Element) {
  return this.classList.contains("recharts-responsive-container")
    ? chartRect
    : originalGetBoundingClientRect.call(this);
});

Element.prototype.hasPointerCapture = vi.fn();
Element.prototype.setPointerCapture = vi.fn();
Element.prototype.releasePointerCapture = vi.fn();
Element.prototype.scrollIntoView = vi.fn();

beforeAll(() => {
  server.listen({ onUnhandledRequest: "error" });
});

beforeEach(() => {
  transactions.length = 0;
});

afterEach(() => {
  cleanup();
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});
