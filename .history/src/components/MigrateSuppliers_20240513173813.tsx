import { suppliers } from '~/utils/data-migration'
import { api } from '~/utils/api'
import { z } from 'zod'
// import type { RouterInputs } from '~/utils/api'
import type { SupplierType } from '@prisma/client'

const supplierPayload = z.object({
      name: z.string().default(''),
      type: z.custom<SupplierType>().default('OTHER'),
      region: z.string().nullable().default(null),
      country: z.string().nullable().default(null),
      city: z.string().nullable().default(null),
      state: z.string().nullable().default(null),
      onsiteContact: z.boolean().default(false),
      onsiteContactName: z.string().nullable().default(null),
      onsiteContactTitle: z.string().nullable().default('Listed Contact'),
      onsiteContactPhone: z.string().nullable().default(null),
      onsiteContactEmail: z.string().nullable().default(null),
      generalManager: z.boolean().default(false),
      generalManagerName: z.string().nullable().default(null),
      generalManagerTitle: z.string().nullable().default(null),
      generalManagerPhone: z.string().nullable().default(null),
      generalManagerEmail: z.string().nullable().default(null),
      representativeCompany: z.boolean().default(false),
      representativeName: z.string().nullable().default(null),
      representativeCompanyName: z.string().nullable().default(null),
      representativeCompanyTitle: z.string().nullable().default(null),
      representativeCompanyPhone: z.string().nullable().default(null),
      representativeCompanyEmail: z.string().nullable().default(null),
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
      const supplierData = supplierPayload.parse({});

      supplierData.name = supplier.supplier_name ?? 'NOT PRESENT';
      supplierData.country = supplier.country ?? 'NOT PRESENT';
      supplierData.city = supplier.city ?? 'NOT PRESENT';
      supplierData.state = supplier.state ?? 'NOT PRESENT';

      if (supplier.supplier_type === 'Hotel') {
        supplierData.type = 'HOTEL';
      } else if (supplier.supplier_type === 'DMC') {
        supplierData.type = 'DMC';
      } else if (supplier.supplier_type === 'Transportation') {
        supplierData.type = 'CHAUFFEUR_SERVICES';
      } else if (supplier.supplier_type === 'Cruise') {
        supplierData.type = 'CRUISE';
      } else if (supplier.supplier_type === 'Representation Company') {
        supplierData.type = 'REPRESENTATION_COMPANY';
      } else if (supplier.supplier_type === 'Train' || supplier.supplier_type === 'Rail') {
        supplierData.type = 'RAIL';
      }

      // check if supplier.hotel_representative is not null, which will be added to the request
      if (supplier.hotel_representative) {
        supplierData.onsiteContact = true;
        supplierData.onsiteContactName = supplier.hotel_representative.name;
        supplierData.onsiteContactTitle = supplier.hotel_representative.title;
        supplierData.onsiteContactPhone = supplier.hotel_representative.phone;
        supplierData.onsiteContactEmail = supplier.hotel_representative.email;
      } else {
        supplierData.onsiteContact = false;
      }

      // check if supplier.general_manager is not null, which will be added as a generalManager
      if (supplier.general_manager) {
        supplierData.generalManager = true;
        supplierData.generalManagerName = supplier.general_manager.name;
        supplierData.generalManagerTitle = supplier.general_manager.title;
        supplierData.generalManagerPhone = supplier.general_manager.phone;
        supplierData.generalManagerEmail = supplier.general_manager.email;
      } else {
        supplierData.generalManager = false;
      }

      // check if supplier.representative_company is not null, which will be added as a representativeCompany
      if (supplier.representative_company) {
        supplierData.representativeCompany = true;
        supplierData.representativeName = supplier.representative_company.name;
        supplierData.representativeCompanyName = supplier.representative_company.company;
        supplierData.representativeCompanyTitle = supplier.representative_company.title;
        supplierData.representativeCompanyPhone = supplier.representative_company.phone;
        supplierData.representativeCompanyEmail = supplier.representative_company.email;
      } else {
        supplierData.representativeCompany = false;
      }

      await migrateSupplierAPI.mutateAsync(supplierData)
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