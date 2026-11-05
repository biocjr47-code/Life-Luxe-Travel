import { defineConfig } from "@leadconnector/vite-tanstack-config";

/**
 * The LeadConnector preset already wires @tailwindcss/vite,
 * @vitejs/plugin-react, vite-tsconfig-paths and TanStack Start, so
 * none of those belong here — registering them again loads them twice.
 *
 * serverFnErrorLogger is OFF deliberately.
 * That plugin rewrites @tanstack/start-server-core by matching an
 * exact source string, and it throws at SSR time when the installed
 * core does not contain it:
 *
 *   unsupported @tanstack/start-server-core server-functions-handler
 *   transform: expected "const unwrapped = res.result || res.error"
 *
 * It is a diagnostic wrapper, not a runtime requirement — turning it
 * off costs prettier server-function stack traces in the AI Studio
 * sandbox and nothing else. If a future preset release supports this
 * version of start-server-core, delete the flag.
 */
export default defineConfig({
  serverFnErrorLogger: false,
  vite: {
    build: { target: "es2022" },
  },
});
