import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const enhancedCommissionsRouter = createTRPCRouter({
  /* Connect enhanced commissions by ovationID */
  connectEnhancedCommissionByOvationID: publicProcedure
    .input(z.object({
      ovationID: z.string(),
      name: z.string(),
      commission: z.string().nullable(),
      specialAmenities: z.string().nullable(),
      bookingInstructions: z.string().nullable(),
      startDate: z.date().nullable(),
      endDate: z.string().nullable(),
    }))
    .mutation(({ ctx, input }) => {
      // extract session and databse from ctx
      const { db } = ctx;

      // create enhanced commission item related to a supplier based on ovationID
      const enhancedCommission = db.enhancedCommission.create({
        data: {
          name: input.name,
          commission: input.commission,
          specialAmenities: input.specialAmenities,
          bookingInstructions: input.bookingInstructions,
          startDate: input.startDate,
          endDate: input.endDate,
          supplier: {
            connect: {
              ovationID: input.ovationID,
            },
          },
        },
      });

      return enhancedCommission;
    }),
  addEnhancedCommission: protectedProcedure
    .input(z.object({
      supplierId: z.number(),
      name: z.string(),
      commission: z.string().nullable(),
      specialAmenities: z.string().nullable(),
      bookingInstructions: z.string().nullable(),
      startDate: z.date().nullable(),
      endDate: z.string().nullable(),
    }))
    .mutation(({ ctx, input }) => {
      // extract session and databse from ctx
      const { session, db } = ctx;

      // check if user is logged in
      if (!session.user) {
        throw new Error("You must be logged in to add a homepage ticker item");
      }

      // create enhanced commission item related to a supplier based on id
      const enhancedCommission = db.enhancedCommission.create({
        data: {
          name: input.name,
          commission: input.commission,
          specialAmenities: input.specialAmenities,
          bookingInstructions: input.bookingInstructions,
          startDate: input.startDate,
          endDate: input.endDate,
          supplier: {
            connect: {
              id: input.supplierId,
            },
          },
        },
      });

      return enhancedCommission;
    }),
  updateEnhancedCommission: protectedProcedure
    .input(z.object({
      id: z.number(),
      name: z.string(),
      commission: z.string().nullable(),
      specialAmenities: z.string().nullable(),
      bookingInstructions: z.string().nullable(),
      startDate: z.date().nullable(),
      endDate: z.string().nullable(),
    }))
    .mutation(({ ctx, input }) => {
      // extract session and databse from ctx
      const { session, db } = ctx;

      // check if user is logged in
      if (!session.user) {
        throw new Error("You must be logged in to add a homepage ticker item");
      }

      // update enhanced commission item related to a supplier based on id
      const enhancedCommission = db.enhancedCommission.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name,
          commission: input.commission,
          specialAmenities: input.specialAmenities,
          bookingInstructions: input.bookingInstructions,
          startDate: input.startDate,
          endDate: input.endDate,
        },
      });

      return enhancedCommission;
    }),
  deleteEnhancedCommission: protectedProcedure
    .input(z.object({
      id: z.number(),
    }))
    .mutation(({ ctx, input }) => {
      // extract session and databse from ctx
      const { session, db } = ctx;

      // check if user is logged in
      if (!session.user) {
        throw new Error("You must be logged in to add a homepage ticker item");
      }

      // delete enhanced commission item related to a supplier based on id
      const enhancedCommission = db.enhancedCommission.delete({
        where: {
          id: input.id,
        },
      });

      return enhancedCommission;
    }),
});