import { createTRPCRouter } from "~/server/api/trpc";
import { supplierRouter } from "~/server/api/routers/supplier";
import { notificationRouter } from "~/server/api/routers/notification";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  supplier: supplierRouter,
  notification: notificationRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
