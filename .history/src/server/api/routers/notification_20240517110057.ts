import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

import { TRPCError } from "@trpc/server";



export const notificationRouter = createTRPCRouter({
  createNotification: publicProcedure
    .input(z.object({
      supplierId: z.number().nullable(),
      notifier: z.string(),
      details: z.string(),
    }))
    .mutation(async ({ ctx, input }) => {
      // extract session and databse from ctx
      const { db } = ctx;

      // create seasonal offer item related to a supplier based on id
      const notification = await db.notification.create({
        data: {
          name: input.notifier,
          supplierId: input.supplierId!,
          details: input.details,
        },
      });

      return notification;
    }),
  resolveIssue: protectedProcedure
    .input(z.object({
      id: z.number(),
    }))
    .mutation(async ({ ctx, input }) => {
      // extract session and databse from ctx
      const { session, db } = ctx;

      // check if user is logged in
      if (!session.user) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You must be logged in to resolve an issue! :)",
        });
      }

      // update seasonal offer item related to a supplier based on id
      const notification = await db.notification.update({
        where: {
          id: input.id,
        },
        data: {
          isResolved: true,
          resolvedBy: session.user.email!,
        },
      });

      return notification;
    }),
  unresolveIssue: protectedProcedure
    .input(z.object({
      id: z.number(),
    }))
    .mutation(async ({ ctx, input }) => {
      // extract session and databse from ctx
      const { session, db } = ctx;

      // check if user is logged in
      if (!session.user) {
        throw new Error("You must be logged in to add a homepage ticker item");
      }

      // update seasonal offer item related to a supplier based on id
      const notification = await db.notification.update({
        where: {
          id: input.id,
        },
        data: {
          isResolved: false,
          resolvedBy: session.user.email!,
        },
      });

      return notification;
    }),
});