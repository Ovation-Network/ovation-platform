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

      // create notification record on db
      try {
        const notification = await db.notification.create({
          data: {
            name: input.notifier,
            supplierId: input.supplierId!,
            details: input.details,
          },
        });

        return notification;
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create notification. Please try again later",
          cause: error,
        });
      }
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

      // mark notification as resolved
      try {
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
      } catch (error) {

        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to resolve issue. Please try again later",
          cause: error,
        });
      }
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
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You must be logged in to resolve an issue! :)",
        });
      }

      // mark notification as unresolved
      try {
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
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to resolve issue. Please try again later",
          cause: error,
        });
      }
    }),
});