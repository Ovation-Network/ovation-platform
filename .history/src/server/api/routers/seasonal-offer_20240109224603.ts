import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";

import type { SeasonalOffer } from "@prisma/client";

export const seasonalOfferRouter = createTRPCRouter({
  addSeasonalOffer: protectedProcedure
    .input(z.object({
      supplierId: z.string(),
      name: z.string(),
      details: z.string().nullable(),
      specialAmenities: z.string().nullable(),
      bookingInstructions: z.string().nullable(),
      startDate: z.date().nullable(),
      endDate: z.string().nullable(),
    }))
    .mutation(async ({ ctx, input }) => {
      // extract session and databse from ctx
      const { session, db } = ctx;

      // check if user is logged in
      if (!session.user) {
        throw new Error("You must be logged in to add a homepage ticker item");
      }

      // create seasonal offer item related to a supplier based on id
      const seasonalOffer = await db.seasonalOffer.create({
        data: {
          name: input.name,
          details: input.details,
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
      }) as SeasonalOffer;

      return seasonalOffer;
    }),
  updateSeasonalOffer: protectedProcedure
    .input(z.object({
      id: z.string(),
      name: z.string(),
      details: z.string().nullable(),
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

      // update seasonal offer item related to a supplier based on id
      const seasonalOffer = db.seasonalOffer.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name,
          details: input.details,
          specialAmenities: input.specialAmenities,
          bookingInstructions: input.bookingInstructions,
          startDate: input.startDate,
          endDate: input.endDate,
        },
      });

      return seasonalOffer;
    }),
  deleteSeasonalOffer: protectedProcedure
    .input(z.object({
      id: z.string(),
    }))
    .mutation(({ ctx, input }) => {
      // extract session and databse from ctx
      const { session, db } = ctx;

      // check if user is logged in
      if (!session.user) {
        throw new Error("You must be logged in to add a homepage ticker item");
      }

      // delete seasonal offer item related to a supplier based on id
      const seasonalOffer = db.seasonalOffer.delete({
        where: {
          id: input.id,
        },
      });

      return seasonalOffer;
    }),
});