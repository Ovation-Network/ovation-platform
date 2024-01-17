import { api } from '~/utils/api';
import { useState, useEffect } from 'react';

export const EditSupplierForm: React.FC<{ id: number }> = ({ id }) => {

  // Grab the supplier data from the API
  const { data, isLoading } = api.supplier.getSupplierById.useQuery({id});

  // set states for allowing edits to supplier data by sections
  const [editSupplier, setEditSupplier] = useState<boolean>(false);
  const [editContacts, setEditContacts] = useState<boolean>(false);
  const [editGMs, setEditGMs] = useState<boolean>(false);
  const [editReps, setEditReps] = useState<boolean>(false);


  return (
    <>
    </>
  )
}