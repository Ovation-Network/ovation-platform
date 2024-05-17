import { z } from "zod";
import { TRPCError } from "@trpc/server";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const notificationRouter = createTRPCRouter({
  createNotification: publicProcedure
    .input(z.object({
      supplierId: z.number(),
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
            supplierId: input.supplierId,
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
  getNotifications: protectedProcedure
    .query(async ({ ctx }) => {
      // extract session and databse from ctx
      const { db, session } = ctx;

      // check if user is logged in
      if (!session.user) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You must be logged in to resolve an issue! :)",
        });
      }

      // create notification record on db
      try {
        const notifications = await db.notification.findMany({
          select: {
            id: true,
            name: true,
            supplierId: true,
            details: true,
            isResolved: true,
            // resolvedBy: true,
            createdAt: true,
          },
        });

        return notifications;
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create notification. Please try again later",
          cause: error,
        });
      }
    }),
  getUnresolvedNotifications: protectedProcedure
    .query(async ({ ctx }) => {
      // extract session and databse from ctx
      const { db, session } = ctx;

      // check if user is logged in
      if (!session.user) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You must be logged in to resolve an issue! :)",
        });
      }

      // create notification record on db
      try {
        const notifications = await db.notification.findMany({
          select: {
            id: true,
            name: true,
            supplierId: true,
            details: true,
            isResolved: true,
            // resolvedBy: true,
            createdAt: true,
          },
          where: {
            isResolved: false,
          }
        });

        return notifications;
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

      if (!input.id) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "You need to provide an ID when resolving an issue! :)",
        });
      }

      // mark notification as resolved
      try {
        await db.notification.update({
          where: {
            id: input.id,
          },
          data: {
            isResolved: true,
            resolvedBy: session.user.email!,
          },
        });

        return;
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