/* eslint-disable @typescript-eslint/consistent-type-imports */
import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
  createTRPCContext
} from "~/server/api/trpc";

import type { inferAsyncReturnType } from "@trpc/server";

import type { Prisma, SupplierType } from "@prisma/client";

export const supplierRouter = createTRPCRouter({
  infiniteSupplierFeed: publicProcedure
    .input(
      z.object({
        name: z.string().optional(),
        country: z.string().optional(),
        city: z.string().optional(),
        limit: z.number().optional(),
        cursor: z.object({ id: z.number(), createdAt: z.date() }).optional(),
      })
    )
    .query(async ({ input: { limit = 50, name, cursor }, ctx }) => {
      return await infiniteSupplierQuery({
        limit,
        ctx,
        cursor,
        whereClause: { name },
      });
    }),
  /* Get all suppliers - PUBLIC */
  getSupplierContacts: publicProcedure
    .query(({ ctx }) => {
      // extract database from ctx
      const { db } = ctx;

      // get all suppliers
      const suppliers = db.supplier.findMany({

        select: {
          id: true,
          name: true,
          type: true,
          country: true,
          region: true,
          city: true,
          state: true,
          contacts: true,
          generalManagers: true,
          representativeCompanies: true,
        }
      });
      return suppliers;
    }),
  /* Add a supplier and create enhance commission - PROTECTED */
  createSupplierAndContacts: publicProcedure
    .input(z.object({
      name: z.string(),
      type: z.custom<SupplierType>(),
      region: z.string().nullable(),
      country: z.string().nullable(),
      city: z.string().nullable(),
      state: z.string().nullable(),
      onsiteContact: z.boolean(),
      onsiteContactName: z.string().nullable(),
      onsiteContactTitle: z.string().nullable(),
      onsiteContactPhone: z.string().nullable(),
      onsiteContactEmail: z.string().nullable(),
      generalManager: z.boolean(),
      generalManagerName: z.string().nullable(),
      generalManagerTitle: z.string().nullable(),
      generalManagerPhone: z.string().nullable(),
      generalManagerEmail: z.string().nullable(),
      representativeCompany: z.boolean(),
      representativeCompanyName: z.string().nullable(),
      representativeCompanyTitle: z.string().nullable(),
      representativeCompanyPhone: z.string().nullable(),
      representativeCompanyEmail: z.string().nullable(),
    }))
    .mutation(async ({ ctx, input }) => {
      // extract session and databse from ctx
      const { db, session } = ctx;

      // check if user is logged in
      /* if (!session.user) {
        throw new Error("You must be logged in to add a supplier");
      } */

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

      // Create OnSiteContact if present in input
      if (input.onsiteContact) {
        await db.onSiteContact.create({
          data: {
            name: input.onsiteContactName!,
            title: input.onsiteContactTitle,
            email: input.onsiteContactEmail,
            phone: input.onsiteContactPhone,
            supplier: {
              connect: {
                id: supplier.id
              }
            }
          }
        });
      }

      // Create GeneralManager if present in input
      if (input.generalManager) {
        await db.generalManager.create({
          data: {
            name: input.generalManagerName!,
            title: input.generalManagerTitle!,
            email: input.generalManagerEmail,
            phone: input.generalManagerPhone,
            supplier: {
              connect: {
                id: supplier.id
              }
            }
          }
        });
      }

      // Create RepresentativeCompany if present in input
      if (input.representativeCompany) {
        await db.representativeCompany.create({
          data: {
            name: input.representativeCompanyName!,
            title: input.representativeCompanyTitle!,
            email: input.representativeCompanyEmail,
            phone: input.representativeCompanyPhone,
            companyName: input.representativeCompanyName!,
            supplier: {
              connect: {
                id: supplier.id
              }
            }
          }
        });
      }

      return supplier;
    }),
  /* Get a supplier by ID- PROTECTED */
  getSupplierById: publicProcedure
    .input(z.object({
      id: z.number(),
    }))
    .query(async ({ ctx, input }) => {
      // extract database from ctx
      const { db } = ctx;

      // get supplier by id
      const supplier = await db.supplier.findUnique({
        where: {
          id: input.id
        },
        select: {
          id: true,
          name: true,
          type: true,
          country: true,
          region: true,
          city: true,
          state: true,
          contacts: true,
          generalManagers: true,
          representativeCompanies: true,
        }
      });

      return supplier;
    }),
  /* Edit a supplier and create enhance commission - PROTECTED */
  editSupplierAndContacts: publicProcedure
    .input(z.object({
      id: z.number(),
      name: z.string(),
      type: z.custom<SupplierType>(),
      region: z.string().nullable(),
      country: z.string().nullable(),
      city: z.string().nullable(),
      state: z.string().nullable(),
      onsiteContact: z.boolean(),
      onsiteContactID: z.number(),
      onsiteContactName: z.string().nullable(),
      onsiteContactTitle: z.string().nullable(),
      onsiteContactPhone: z.string().nullable(),
      onsiteContactEmail: z.string().nullable(),
      generalManager: z.boolean(),
      generalManagerID: z.number(),
      generalManagerName: z.string().nullable(),
      generalManagerTitle: z.string().nullable(),
      generalManagerPhone: z.string().nullable(),
      generalManagerEmail: z.string().nullable(),
      representativeCompany: z.boolean(),
      representativeCompanyID: z.number(),
      representativeCompanyName: z.string().nullable(),
      representativeCompanyTitle: z.string().nullable(),
      representativeCompanyPhone: z.string().nullable(),
      representativeCompanyEmail: z.string().nullable(),
    }))
    .mutation(async ({ ctx, input }) => {
      // extract session and databse from ctx
      const { db, session } = ctx;

      // check if user is logged in
      /* if (!session.user) {
        throw new Error("You must be logged in to add a supplier");
      } */

      // get supplier by id
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

      // update onsite contact if present in input
      if (input.onsiteContact) {
        await db.onSiteContact.update({
          where: {
            id: input.onsiteContactID
          },
          data: {
            name: input.onsiteContactName!,
            title: input.onsiteContactTitle,
            email: input.onsiteContactEmail,
            phone: input.onsiteContactPhone,
          }
        });
      }

      // update GeneralManager if present in input
      if (input.generalManager) {
        await db.generalManager.update({
          where: {
            id: input.generalManagerID
          },
          data: {
            name: input.generalManagerName!,
            title: input.generalManagerTitle!,
            email: input.generalManagerEmail,
            phone: input.generalManagerPhone,
          }
        });
      }

      // Update RepresentativeCompany if present in input
      if (input.representativeCompany) {
        await db.representativeCompany.update({
          where: {
            id: input.representativeCompanyID
          },
          data: {
            name: input.representativeCompanyName!,
            title: input.representativeCompanyTitle!,
            email: input.representativeCompanyEmail,
            phone: input.representativeCompanyPhone,
            companyName: input.representativeCompanyName!,
          }
        });
      }

      return supplier;
    }),
  /* Add a supplier - PROTECTED */
  addSupplier: protectedProcedure
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
      const { session, db } = ctx;

      // check if user is logged in
      if (!session.user) {
        throw new Error("You must be logged in to add a supplier");
      }

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
  /* Add a supplier and create enhance commission - PROTECTED */
  addSupplierAndEnhancedCommission: protectedProcedure
    .input(z.object({
      name: z.string(),
      type: z.custom<SupplierType>(),
      region: z.string().nullable(),
      country: z.string().nullable(),
      city: z.string().nullable(),
      state: z.string().nullable(),
      ovationID: z.string().nullable(),
      commission: z.string().nullable(),
      specialAmenities: z.string().nullable(),
      bookingInstructions: z.string().nullable(),
      startDate: z.date().nullable(),
      endDate: z.date().nullable(),
    }))
    .mutation(async ({ ctx, input }) => {
      // extract session and databse from ctx
      const { db, session } = ctx;

      // check if user is logged in
      if (!session.user) {
        throw new Error("You must be logged in to add a supplier");
      }

      // create a new supplier
      const supplier = await db.supplier.create({
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

      // create enhanced commission item related to a supplier based on id
      await db.enhancedCommission.create({
        data: {
          name: input.name,
          commission: input.commission,
          specialAmenities: input.specialAmenities,
          bookingInstructions: input.bookingInstructions,
          startDate: input.startDate,
          endDate: input.endDate,
          supplier: {
            connect: {
              id: supplier.id
            }
          }
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
      country: z.string().nullable(),
      region: z.string().nullable(),
      city: z.string().nullable(),
      state: z.string().nullable(),
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
        email: z.string().nullable(),
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
  /* Update onsite contact - PROTECTED */
  updateOnSiteContact: protectedProcedure
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
      if (!session.user) {
        throw new Error("You must be logged in to update a onsite contact");
      }

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
  deleteOnSiteContact: protectedProcedure
    .input(z.object({
      id: z.number(),
    }))
    .mutation(async ({ ctx, input }) => {
      // Get database and sessions from ctx
      const { db, session } = ctx;
      // check if user is logged in
      if (!session.user) {
        throw new Error("You must be logged in to delete a onsite contact");
      }

      // delete onsite contact
      const onsiteContact = await db.onSiteContact.delete({
        where: {
          id: input.id
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
        email: z.string().nullable(),
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
  /* Update a representative company */
  updateRepresentativeCompany: protectedProcedure
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
      if (!session.user) {
        throw new Error("You must be logged in to add a representative company");
      }

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
  deleteRepresentativeCompany: protectedProcedure
    .input(z.object({
      id: z.number(),
    }))
    .mutation(async ({ ctx, input }) => {
      // Get database and sessions from ctx
      const { db, session } = ctx;

      // check if user is logged in
      if (!session.user) {
        throw new Error("You must be logged in to delete a representative company");
      }

      // delete representative company
      const representativeCompany = await db.representativeCompany.delete({
        where: {
          id: input.id
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
        title: z.string(),
        phone: z.string().nullable(),
        email: z.string().nullable(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Get database and sessions from ctx
      const { db, session } = ctx;

      // check if user is logged in
      if (!session.user) {
        throw new Error("You must be logged in to add a general manager");
      }

      // add general manager by looking up the supplier based on ovationID
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
        title: z.string(),
        phone: z.string().nullable(),
        email: z.string().nullable(),
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
    }),
  /* Delete a General Manager */
  deleteGeneralManager: protectedProcedure
    .input(z.object({
      id: z.number(),
    }))
    .mutation(async ({ ctx, input }) => {
      // Get database and sessions from ctx
      const { db, session } = ctx;

      // check if user is logged in
      if (!session.user) {
        throw new Error("You must be logged in to delete a general manager");
      }

      // delete general manager
      const generalManager = await db.generalManager.delete({
        where: {
          id: input.id
        }
      });

      return generalManager;
    }),
});
/* 
import { Prisma } from "@prisma/client";
import { inferAsyncReturnType } from "@trpc/server";
import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
  createTRPCContext,
} from "~/server/api/trpc";

export const supplierRouter = createTRPCRouter({
  infiniteProfileFeed: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        limit: z.number().optional(),
        cursor: z.object({ id: z.string(), createdAt: z.date() }).optional(),
      })
    )
    .query(async ({ input: { limit = 10, userId, cursor }, ctx }) => {
      return await getInfinitesuppliers({
        limit,
        ctx,
        cursor,
        whereClause: { userId },
      });
    }),
  infiniteFeed: publicProcedure
    .input(
      z.object({
        onlyFollowing: z.boolean().optional(),
        limit: z.number().optional(),
        cursor: z.object({ id: z.string(), createdAt: z.date() }).optional(),
      })
    )
    .query(
      async ({ input: { limit = 10, onlyFollowing = false, cursor }, ctx }) => {
        const currentUserId = ctx.session?.user.id;
        return await getInfinitesuppliers({
          limit,
          ctx,
          cursor,
          whereClause:
            currentUserId == null || !onlyFollowing
              ? undefined
              : {
                user: {
                  followers: { some: { id: currentUserId } },
                },
              },
        });
      }
    ),
  create: protectedProcedure
    .input(z.object({ content: z.string() }))
    .mutation(async ({ input: { content }, ctx }) => {
      const supplier = await ctx.prisma.supplier.create({
        data: { content, userId: ctx.session.user.id },
      });

      void ctx.revalidateSSG?.(`/profiles/${ctx.session.user.id}`);

      return supplier;
    }),
  toggleLike: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input: { id }, ctx }) => {
      const data = { supplierId: id, userId: ctx.session.user.id };

      const existingLike = await ctx.prisma.like.findUnique({
        where: { userId_supplierId: data },
      });

      if (existingLike == null) {
        await ctx.prisma.like.create({ data });
        return { addedLike: true };
      } else {
        await ctx.prisma.like.delete({ where: { userId_supplierId: data } });
        return { addedLike: false };
      }
    }),
}); */

async function infiniteSupplierQuery({
  whereClause,
  ctx,
  limit,
  cursor,
}: {
  whereClause?: Prisma.SupplierWhereInput;
  limit: number;
  cursor: { id: number; createdAt: Date } | undefined;
  ctx: inferAsyncReturnType<typeof createTRPCContext>;
}) {

  const data = await ctx.db.supplier.findMany({
    take: limit + 1,
    cursor: cursor ? cursor : undefined,
    orderBy: [{ createdAt: "desc" }, { updatedAt: "desc" }],
    where: whereClause,
    select: {
      id: true,
      name: true,
      type: true,
      country: true,
      region: true,
      city: true,
      state: true,
      createdAt: true,
      updatedAt: true,
      contacts: true,
      generalManagers: true,
      representativeCompanies: true,
      ovationID: true,
    },
  });

  let nextCursor: typeof cursor | undefined;
  if (data.length > limit) {
    const nextItem = data.pop();
    if (nextItem != null) {
      nextCursor = { id: nextItem.id, createdAt: nextItem.createdAt };
    }
  }

  return {
    supplier: data.map((supplier) => {
      return {
        id: supplier.id,
        createdAt: supplier.createdAt,
        name: supplier.name,
        type: supplier.type,
        country: supplier.country,
        region: supplier.region,
        city: supplier.city,
        state: supplier.state,
        contacts: supplier.contacts,
        generalManagers: supplier.generalManagers,
        representativeCompanies: supplier.representativeCompanies,
        updatedAt: supplier.updatedAt,
        ovationID: supplier.ovationID,
      };
    }),
    nextCursor,
  };
}