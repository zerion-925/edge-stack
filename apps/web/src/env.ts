import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";
export const env = createEnv({
  client: { VITE_APP_NAME: z.string().min(1).default("Edge Stack") },
  clientPrefix: "VITE_",
  emptyStringAsUndefined: true,
  runtimeEnv: import.meta.env,
});
