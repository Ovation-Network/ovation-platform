import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

import type { SupplierType } from "@prisma/client";

export const supplierRouter = createTRPCRouter({
  /* Get all suppliers - PUBLIC */
  getSupplierContacts: publicProcedure
    .query(({ ctx }) => {
      // extract database from ctx
      const { db } = ctx;

      // get all suppliers
      const suppliers = db.supplier.findMany({
        include: {
          contacts: true,
          generalManagers: true,
          representativeCompanies: true,
        }
      });
      return suppliers;
    }),
  /* Add a supplier - PROTECTED */
  addSupplier: publicProcedure
    .input(z.object({
      name: z.string(),
      type: z.custom<SupplierType>(),
      country: z.string(),
      region: z.string(),
      city: z.string(),
      state: z.string(),
    }))
    .mutation(async ({ ctx, input }) => {
      // extract session and databse from ctx
      const { /* session, */ db } = ctx;

      // check if user is logged in
      // if (!session.user) {
      //   throw new Error("You must be logged in to add a supplier");
      // }

      // create a new supplier
      const supplier = await db.supplier.create({
        data: {
          name: input.name,
          type: input.type,
          country: input.country,
          region: input.region,
          city: input.city,
          state: input.state,
        }
      });

      return supplier;
    }),
  /* Update a supplier - PROTECTED */
  updateSupplier: protectedProcedure
    .input(z.object({
      id: z.number(),
      name: z.string(),
      type: z.custom<SupplierType>(),
      country: z.string(),
      region: z.string(),
      city: z.string(),
      state: z.string(),
    }))
    .mutation(async ({ ctx, input }) => {
      // Get database and sessions from ctx
      const { db, session } = ctx;

      // check if user is logged in
      if (!session.user) {
        throw new Error("You must be logged in to update a supplier");
      }

      // update supplier
      const supplier = await db.supplier.update({
        where: {
          id: input.id
        },
        data: {
          name: input.name,
          type: input.type,
          country: input.country,
          region: input.region,
          city: input.city,
          state: input.state,
        }
      });

      return supplier;
    }),
  /* Delete a supplier - PROTECTED */
  deleteSupplier: protectedProcedure
    .input(z.object({
      id: z.number(),
    }))
    .mutation(async ({ ctx, input }) => {
      // Get database and sessions from ctx
      const { db, session } = ctx;

      // check if user is logged in
      if (!session.user) {
        throw new Error("You must be logged in to delete a supplier");
      }

      // delete supplier
      const supplier = await db.supplier.delete({
        where: {
          id: input.id
        }
      });

      return supplier;
    }),
  /* Add onsite contact - PROTECTED */
  addOnSiteContact: protectedProcedure
    .input(
      z.object({
        supplierId: z.number(),
        name: z.string(),
        title: z.string().nullable(),
        phone: z.string().nullable(),
        email: z.string(),
      }
      ))
    .mutation(async ({ ctx, input }) => {
      // Get database and sessions from ctx
      const { db, session } = ctx;

      // check if user is logged in
      if (!session.user) {
        throw new Error("You must be logged in to add a onsite contact");
      }

      // add onsite contact
      const onsiteContact = await db.onSiteContact.create({
        data: {
          name: input.name,
          title: input.title,
          email: input.email,
          phone: input.phone,
          supplier: {
            connect: {
              id: input.supplierId
            }
          }
        }
      });

      return onsiteContact;
    }),
  /* Add a representative company */
  addRepresentativeCompany: protectedProcedure
    .input(
      z.object({
        supplierId: z.number(),
        name: z.string(),
        title: z.string().nullable(),
        companyName: z.string().nullable(),
        phone: z.string().nullable(),
        email: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Get database and sessions from ctx
      const { db, session } = ctx;

      // check if user is logged in
      if (!session.user) {
        throw new Error("You must be logged in to add a representative company");
      }

      // add representative company
      const representativeCompany = await db.representativeCompany.create({
        data: {
          name: input.name,
          title: input.title,
          companyName: input.companyName,
          email: input.email,
          phone: input.phone,
          supplier: {
            connect: {
              id: input.supplierId
            }
          }
        }
      });

      return representativeCompany;
    }),
  /* Add a general manager */
  addGeneralManager: protectedProcedure
    .input(
      z.object({
        supplierId: z.number(),
        name: z.string(),
        title: z.string() || z.undefined(),
        phone: z.string().nullable(),
        email: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Get database and sessions from ctx
      const { db, session } = ctx;

      // check if user is logged in
      if (!session.user) {
        throw new Error("You must be logged in to add a general manager");
      }

      // add general manager
      const generalManager = await db.generalManager.create({
        data: {
          name: input.name,
          title: input.title,
          email: input.email,
          phone: input.phone,
          supplier: {
            connect: {
              id: input.supplierId
            }
          }
        }
      });

      return generalManager;
    }),
  /* Update a general manager */
  updateGeneralManager: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        name: z.string(),
        title: z.string() || z.undefined(),
        phone: z.string().nullable(),
        email: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Get database and sessions from ctx
      const { db, session } = ctx;

      // check if user is logged in
      if (!session.user) {
        throw new Error("You must be logged in to add a general manager");
      }

      // add general manager
      const generalManager = await db.generalManager.update({
        where: {
          id: input.id
        },
        data: {
          name: input.name,
          title: input.title,
          email: input.email,
          phone: input.phone,
        }
      });

      return generalManager;
    })
});