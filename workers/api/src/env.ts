import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const getEnv = (runtimeEnv: Env) =>
  createEnv({
    emptyStringAsUndefined: true,
    runtimeEnv: { APP_ENV: runtimeEnv.APP_ENV },
    server: { APP_ENV: z.enum(["development", "test", "production"]) },
  });
