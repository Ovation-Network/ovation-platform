import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const homepageTickerRouter = createTRPCRouter({
  /* Get homepage ticker items - PUBLIC */
  getHomepageTickers: publicProcedure
    .query(async ({ ctx }) => {
      // Get a reference to today's date
      const today = new Date();

      // extract database from ctx
      const { db } = ctx;

      try {
        // get all homepage ticker items that are not yet expired
        const homepageTicker = db.homepageTicker.findMany({
          where: {
            expiresAt: {
              gte: today
            },
          }
        })
  
        return homepageTicker

      } catch (error) {
        console.log(error);
      }

    }),
  /* Add a homepage ticker item - PROTECTED */
  addHomepageTicker: protectedProcedure
    .input(z.object({
      title: z.string(),
      content: z.string(),
      link: z.string().nullable(),
      linkLabel: z.string().nullable(),
      image: z.string().nullable(),
      order: z.number().nullable(),
      expiresAt: z.date()
    }))
    .mutation(({ ctx, input }) => {
      // extract session and databse from ctx
      const { session, db } = ctx;

      // check if user is logged in
      if (!session.user) {
        throw new Error("You must be logged in to add a homepage ticker item");
      }

      // create a new homepage ticker item
      const homepageTicker = db.homepageTicker.create({
        data: {
          title: input.title,
          content: input.content,
          link: input.link,
          linkLabel: input.linkLabel,
          image: input.image,
          order: input.order,
          expiresAt: input.expiresAt
        }
      });

      return homepageTicker;
    }),
  /* Update a homepage ticker item - PROTECTED */
  updateHomepageTicker: protectedProcedure
    .input(z.object({
      id: z.string(),
      title: z.string(),
      content: z.string(),
      link: z.string().nullable(),
      linkLabel: z.string().nullable(),
      image: z.string().nullable(),
      order: z.number().nullable(),
      expiresAt: z.date()
    }))
    .mutation(({ ctx, input }) => {
      // Get database and sessions from ctx
      const { db, session } = ctx;

      // check if user is logged in
      if (!session.user) {
        throw new Error("You must be logged in to update a homepage ticker item");
      }

      // update homepage ticker item
      const homepageTicker = db.homepageTicker.update({
        where: {
          id: input.id
        },
        data: {
          title: input.title,
          content: input.content,
          link: input.link,
          linkLabel: input.linkLabel,
          image: input.image,
          order: input.order,
          expiresAt: input.expiresAt
        }
      });

      return homepageTicker;
    }),
  /* Delete a homepage ticker item - PROTECTED */
  deleteHomepageTicker: protectedProcedure
    .input(z.object({
      id: z.string()
    }))
    .mutation(({ ctx, input }) => {
      // Get database and sessions from ctx
      const { db, session } = ctx;

      // check if user is logged in
      if (!session.user) {
        throw new Error("You must be logged in to delete a homepage ticker item");
      }

      // delete homepage ticker item
      const homepageTicker = db.homepageTicker.delete({
        where: {
          id: input.id
        }
      });

      return homepageTicker;
    })
});