import { api } from '~/utils/api';

export const EditSupplierForm: React.FC<{ id: number }> = ({ id }) => {

  // Grab the supplier data from the API
  const { data, isLoading } = api.supplier.getSupplierById.useQuery({id});


  return (
    <>
    </>
  )
}