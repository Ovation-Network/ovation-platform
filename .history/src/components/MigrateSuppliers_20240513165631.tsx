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
      representativeCompanyBusinessName: z.string().nullable(),
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
      const supplierData = supplierPayload.parse();

      supplierData.name = supplier.supplier_name ?? 'NOT PRESENT';
      supplierData.country = supplier.country ?? 'NOT PRESENT';
      supplierData.city = supplier.city ?? 'NOT PRESENT';
      supplierData.state = supplier.state ?? 'NOT PRESENT';

      // check if supplier.hotel_representative is not null, which will be added to the request
      if (supplier.hotel_representative) {
        supplierData.onsiteContact = true;
        supplierData.onsiteContactName = supplier.hotel_representative.name;
        supplierData.onsiteContactTitle = supplier.hotel_representative.title;
        supplierData.onsiteContactPhone = supplier.hotel_representative.phone;
        supplierData.onsiteContactEmail = supplier.hotel_representative.email;
      }

      // check if supplier.general_manager is not null, which will be added as a generalManager
      if (supplier.general_manager) {
        supplierData.generalManager = true;
        supplierData.generalManagerName = supplier.general_manager.name;
        supplierData.generalManagerTitle = supplier.general_manager.title;
        supplierData.generalManagerPhone = supplier.general_manager.phone;
        supplierData.generalManagerEmail = supplier.general_manager.email;
      }

      // check if supplier.representative_company is not null, which will be added as a representativeCompany
      if (supplier.representative_company) {
        supplierData.representativeCompany = true;
        supplierData.representativeCompanyName = supplier.representative_company.name;
        supplierData.representativeCompanyTitle = supplier.representative_company.title;
        supplierData.representativeCompanyPhone = supplier.representative_company.phone;
        supplierData.representativeCompanyEmail = supplier.representative_company.email;
        supplierData.representativeCompanyBusinessName = supplier.representative_company.company;
      }

      await migrateSupplierAPI.mutateAsync(supplier)
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