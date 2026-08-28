import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { PwaStatus } from "./components/pwa-status";
import { env } from "./env";
import { routeTree } from "./routeTree.gen";
import "@edge-stack/ui/globals.css";

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 1, staleTime: 15_000 } },
});
const router = createRouter({ context: {}, routeTree });
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
document.title = env.VITE_APP_NAME;
const root = document.querySelector("#root");
if (!root) {
  throw new Error("Root element not found");
}
createRoot(root).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <PwaStatus />
    </QueryClientProvider>
  </StrictMode>
);
