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