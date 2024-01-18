import { createTRPCRouter } from "~/server/api/trpc";
import { homepageTickerRouter } from "~/server/api/routers/homepage-ticker"
import { calendarTickerRouter } from "~/server/api/routers/calendar-ticker"
import { supplierRouter } from "~/server/api/routers/supplier";
import { enhancedCommissionsRouter } from "~/server/api/routers/enhanced-commission";
import { seasonalOfferRouter } from "~/server/api/routers/seasonal-offer";
import { notificationRouter } from "~/server/api/routers/notification";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  homepageTicker: homepageTickerRouter,
  calendarTicker: calendarTickerRouter,
  supplier: supplierRouter,
  enhancedCommission: enhancedCommissionsRouter,
  seasonalOffer: seasonalOfferRouter,
  notification: notificationRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
