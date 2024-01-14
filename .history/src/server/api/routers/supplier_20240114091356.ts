import { z } from "zod";

import {
  createTRPCRouter,
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
      country: z.string().nullable(),
      region: z.string().nullable(),
      city: z.string().nullable(),
      state: z.string().nullable(),
      ovationID: z.string().nullable(),
    }))
    .mutation(async ({ ctx, input }) => {
      // extract session and databse from ctx
      const { /* session, */ db } = ctx;

      // check if user is logged in
      // if (!session.user) {
      //   throw new Error("You must be logged in to add a supplier");
      // }

      // create a new supplier
      return await db.supplier.create({
        data: {
          name: input.name,
          type: input.type,
          country: input.country,
          region: input.region,
          city: input.city,
          state: input.state,
          ovationID: input.ovationID,
        }
      });
    }),
  /* Update a supplier - PROTECTED */
  updateSupplier: publicProcedure
    .input(z.object({
      id: z.number(),
      name: z.string(),
      type: z.custom<SupplierType>(),
      country: z.string().nullable(),
      region: z.string().nullable(),
      city: z.string().nullable(),
      state: z.string().nullable(),
    }))
    .mutation(async ({ ctx, input }) => {
      // Get database and sessions from ctx
      const { db, session } = ctx;

      // check if user is logged in
      // if (!session.user) {
        // throw new Error("You must be logged in to update a supplier");
      // }

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
  deleteSupplier: publicProcedure
    .input(z.object({
      id: z.number(),
    }))
    .mutation(async ({ ctx, input }) => {
      // Get database and sessions from ctx
      const { db, session } = ctx;

      // check if user is logged in
      // if (!session.user) {
        // throw new Error("You must be logged in to delete a supplier");
      // }

      // delete supplier
      const supplier = await db.supplier.delete({
        where: {
          id: input.id
        }
      });

      return supplier;
    }),
  /* Add onsite contact - PROTECTED */
  addOnSiteContact: publicProcedure
    .input(
      z.object({
        supplierId: z.number(),
        name: z.string(),
        title: z.string().nullable(),
        phone: z.string().nullable(),
        email: z.string().nullable(),
      }
      ))
    .mutation(async ({ ctx, input }) => {
      // Get database and sessions from ctx
      const { db, session } = ctx;

      // check if user is logged in
      // if (!session.user) {
        // throw new Error("You must be logged in to add a onsite contact");
      // }

      // add onsite contact
      const onsiteContact = await db.onSiteContact.create({
        data: {
          name: input.name,
          title: input.title,
          email: input.email,
          phone: input.phone,
          // supplierId: input.supplierId,
          supplier: {
            connect: {
              id: input.supplierId
            }
          }
        }
      });

      return onsiteContact;
    }),
  /* Update onsite contact - PROTECTED */
  updateOnSiteContact: publicProcedure
    .input(
      z.object({
        id: z.number(),
        name: z.string(),
        title: z.string().nullable(),
        phone: z.string().nullable(),
        email: z.string().nullable(),
      }
      ))
    .mutation(async ({ ctx, input }) => {
      // Get database and sessions from ctx
      const { db, session } = ctx;
      // check if user is logged in
      // if (!session.user) {
        // throw new Error("You must be logged in to update a onsite contact");
      // }

      // update onsite contact
      const onsiteContact = await db.onSiteContact.update({
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

      return onsiteContact;
    }),
  /* Delete onsite contact - PROTECTED */
  deleteOnSiteContact: publicProcedure
    .input(z.object({
      id: z.number(),
    }))
    .mutation(async ({ ctx, input }) => {
      // Get database and sessions from ctx
      const { db, session } = ctx;
      // check if user is logged in
      // if (!session.user) {
        // throw new Error("You must be logged in to delete a onsite contact");
      // }

      // delete onsite contact
      const onsiteContact = await db.onSiteContact.delete({
        where: {
          id: input.id
        }
      });

      return onsiteContact;
    }),
  /* Add a representative company */
  addRepresentativeCompany: publicProcedure
    .input(
      z.object({
        supplierId: z.number(),
        name: z.string(),
        title: z.string().nullable(),
        companyName: z.string().nullable(),
        phone: z.string().nullable(),
        email: z.string().nullable(),
        ovationID: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Get database and sessions from ctx
      const { db, session } = ctx;

      // check if user is logged in
      // if (!session.user) {
        // throw new Error("You must be logged in to add a representative company");
      // }

      // add representative company
      const representativeCompany = await db.representativeCompany.create({
        data: {
          name: input.name,
          title: input.title,
          companyName: input.companyName,
          email: input.email,
          phone: input.phone,
          // supplierId: input.supplierId,
          supplier: {
            connect: {
              ovationID: input.ovationID
            }
          }
        }
      });

      return representativeCompany;
    }),
  /* Update a representative company */
  updateRepresentativeCompany: publicProcedure
    .input(
      z.object({
        id: z.number(),
        name: z.string(),
        title: z.string().nullable(),
        companyName: z.string().nullable(),
        phone: z.string().nullable(),
        email: z.string().nullable(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Get database and sessions from ctx
      const { db, session } = ctx;

      // check if user is logged in
      // if (!session.user) {
        // throw new Error("You must be logged in to add a representative company");
      // }

      // add representative company
      const representativeCompany = await db.representativeCompany.update({
        where: {
          id: input.id
        },
        data: {
          name: input.name,
          title: input.title,
          companyName: input.companyName,
          email: input.email,
          phone: input.phone,
        }
      });

      return representativeCompany;
    }),
  /* Delete a representative company */
  deleteRepresentativeCompany: publicProcedure
    .input(z.object({
      id: z.number(),
    }))
    .mutation(async ({ ctx, input }) => {
      // Get database and sessions from ctx
      const { db, session } = ctx;

      // check if user is logged in
      // if (!session.user) {
        // throw new Error("You must be logged in to delete a representative company");
      // }

      // delete representative company
      const representativeCompany = await db.representativeCompany.delete({
        where: {
          id: input.id
        }
      });

      return representativeCompany;
    }),
  /* Add a general manager */
  addGeneralManager: publicProcedure
    .input(
      z.object({
        supplierId: z.number(),
        name: z.string(),
        title: z.string(),
        phone: z.string().nullable(),
        email: z.string().nullable(),
        ovationID: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Get database and sessions from ctx
      const { db, session } = ctx;

      // check if user is logged in
      // if (!session.user) {
        // throw new Error("You must be logged in to add a general manager");
      // }

      // add general manager by looking up the supplier based on ovationID
      const generalManager = await db.generalManager.create({
        data: {
          name: input.name,
          title: input.title,
          email: input.email,
          phone: input.phone,
          // supplierId: input.supplierId,
          supplier: {
            connect: {
              ovationID: input.ovationID
            }
          }
        }
      });

      return generalManager;
    }),
  /* Update a general manager */
  updateGeneralManager: publicProcedure
    .input(
      z.object({
        id: z.number(),
        name: z.string(),
        title: z.string(),
        phone: z.string().nullable(),
        email: z.string().nullable(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Get database and sessions from ctx
      const { db, session } = ctx;

      // check if user is logged in
      // if (!session.user) {
        // throw new Error("You must be logged in to add a general manager");
      // }

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
    }),
  /* Delete a General Manager */
  deleteGeneralManager: publicProcedure
    .input(z.object({
      id: z.number(),
    }))
    .mutation(async ({ ctx, input }) => {
      // Get database and sessions from ctx
      const { db, session } = ctx;

      // check if user is logged in
      // if (!session.user) {
        // throw new Error("You must be logged in to delete a general manager");
      // }

      // delete general manager
      const generalManager = await db.generalManager.delete({
        where: {
          id: input.id
        }
      });

      return generalManager;
    }),
});