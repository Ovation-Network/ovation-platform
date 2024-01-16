import { createTRPCRouter, createTRPCContext } from "~/server/api/trpc";
import { homepageTickerRouter } from "~/server/api/routers/homepage-ticker"
import { calendarTickerRouter } from "~/server/api/routers/calendar-ticker"
import { supplierRouter } from "~/server/api/routers/supplier";
import { enhancedCommissionsRouter } from "~/server/api/routers/enhanced-commission";
import { seasonalOfferRouter } from "~/server/api/routers/seasonal-offer";

import * as trpcNext from '@trpc/server/adapters/next';

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
});

// export type definition of API
export type AppRouter = typeof appRouter;

// export API handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: createTRPCContext,
  responseMeta({ ctx, paths, type, errors }) {
    // assuming you have all your public routes with the keyword `public` in them
    console.log('Here are all the paths requested: ', paths)
    const allPublic = paths?.every((path) => path.includes('public'));
    // checking that no procedures errored
    const allOk = errors.length === 0;
    // checking we're doing a query request
    const isQuery = type === 'query';
    if ( ctx?.res && allPublic && allOk && isQuery) {
      // cache request for 1 day + revalidate once every second
      const ONE_DAY_IN_SECONDS = 60 * 60 * 24;
      return {
        headers: {
          'Cache-Control': `s-maxage=1, stale-while-revalidate=${ONE_DAY_IN_SECONDS}`,
        },
      };
    } else {
      console.error('Error while trying to set cache headers to response.... line 160 - trpc.ts')
      console.log('was not able to manually set the cache control headers for the response.')
    }
    return {};
  },
});
