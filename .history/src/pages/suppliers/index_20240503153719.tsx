import { api } from '~/utils/api';
import { InfiniteSupplierScrollContainer } from '~/components/InfiniteSupplierScrollContainer';
import { useSearchParams } from 'next/navigation';
import React from 'react';

export default function Suppliers() {
  // check search params in case user wants to search for specific contact
  const searchParams = useSearchParams();
  const searchBy = searchParams.get('searchBy');
  const value = searchParams.get('value');


  return (
    <div>
      <h1>Suppliers Page</h1>
      <SupplierLists searchBy={searchBy} value={value}/>
    </div>
  );
}

type searchByProps = 'name' | 'id' | 'country' | 'city' | undefined;

const SupplierLists: React.FC<{ searchBy: searchByProps, value: string | null }> = ({ searchBy, value } ) => {

  const searchOptions = {
    searchBy: ,
    value: ''
  };

  if (searchBy && value) {
    searchOptions.searchBy = searchBy;
    searchOptions.value = value;
  }

  const suppliers = api.supplier.infiniteSupplierFeed.useInfiniteQuery(
    searchBy && value ? searchOptions : {},
    { getNextPageParam: (lastPage) => lastPage.nextCursor,
      refetchOnWindowFocus: false
    }
  );
  
  return (
    <InfiniteSupplierScrollContainer
      suppliers={suppliers.data?.pages.flatMap((page) => page.supplier)}
      isError={suppliers.isError}
      isLoading={suppliers.isLoading}
      hasMore={suppliers.hasNextPage}
      fetchNewSuppliers={suppliers.fetchNextPage}
    />
  )
}