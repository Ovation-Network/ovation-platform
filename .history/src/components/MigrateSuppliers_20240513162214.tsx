import { suppliers } from '~/utils/data-migration'
import { api } from '~/utils/api'
// import type { RouterInputs } from '~/utils/api'

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