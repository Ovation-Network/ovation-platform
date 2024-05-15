import { suppliers } from '~/utils/data-migration'
import { api } from '~/utils/api'
import { z } from 'zod'
// import type { RouterInputs } from '~/utils/api'
import type { SupplierType } from '@prisma/client'

const supplierPayload = z.object({
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
    })

export const MigrateSuppliers = () => {
  const migrateSupplierAPI = api.supplier.createSupplierAndContacts.useMutation({
    onSuccess: async ({supplier}) => {
      console.log('Supplier migrated:', supplier.name, 'with ID', supplier.id)
    },
    onError(error, variables) {
      console.error('Error migrating supplier:', error, 'with name and city', variables.name, variables.city)
    },
  });

  const currentSuppliers = suppliers.slice(0, 250);

  const migrateSuppliers = async () => {
    for (const supplier of currentSuppliers) {
      console.log('Migrating supplier:', supplier.supplier_name, 'with city', supplier.city)



      // check if supplier has an onsite contact, which will be added to the request


      // await migrateSupplierAPI.mutateAsync(supplier)
    }
  }



  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <button
        className="rounded-full px-10 py-3 font-semibold no-underline transition"
        onClick={migrateSuppliers}
      >
        Migrate Suppliers
      </button>
    </div>
  )
}