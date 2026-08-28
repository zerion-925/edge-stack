import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

const getEnv = (runtimeEnv: Env) =>
  createEnv({
    emptyStringAsUndefined: true,
    runtimeEnv: { APP_ENV: runtimeEnv.APP_ENV },
    server: { APP_ENV: z.enum(["development", "test", "production"]) },
  });
const worker = {
  queue(batch: MessageBatch<{ itemId: string }>, env: Env): void {
    getEnv(env);
    for (const message of batch.messages) {
      message.ack();
    }
  },
  scheduled(
    _controller: ScheduledController,
    env: Env,
    ctx: ExecutionContext
  ): void {
    getEnv(env);
    ctx.waitUntil(Promise.resolve());
  },
} satisfies ExportedHandler<Env, { itemId: string }>;
export default worker;
