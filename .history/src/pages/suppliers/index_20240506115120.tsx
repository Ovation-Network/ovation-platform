import { api } from '~/utils/api';
import { InfiniteSupplierScrollContainer } from '~/components/InfiniteSupplierScrollContainer';
import { useSearchParams } from 'next/navigation';
import React from 'react';
import Head from "next/head";

type searchByProps = 'name' | 'id' | 'country' | 'city' | undefined;

export default function Suppliers() {
  // check search params in case user wants to search for specific contact
  const searchParams = useSearchParams();
  const searchBy = searchParams.get('searchBy') as unknown as searchByProps;
  const value = searchParams.get('value');


  return (
    <>
      <Head>
        <title>OvationNetwork Contacts Database</title>
        <meta name="description" content="Where to find the contact information of the suppliers that work with The OvationNetwork" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className=" flex min-h-screen flex-col items-center justify-center bg-teal-400">
        <div>
          <h1>Suppliers Page</h1>
          <SupplierLists searchBy={searchBy} value={value}/>
        </div>
      </main>
    </>
  );
}



const SupplierLists: React.FC<{ searchBy: searchByProps, value: string | null }> = ({ searchBy, value } ) => {

  const searchOptions = {
    searchBy: undefined as searchByProps,
    name: ''
  };

  if (searchBy && value) {
    searchOptions.searchBy = searchBy;
    searchOptions.name = value;
  }

  const suppliers = api.supplier.infiniteSupplierFeed.useInfiniteQuery(
    searchBy && value ? searchOptions : {},
    { getNextPageParam: (lastPage) => lastPage.nextCursor,
      refetchOnWindowFocus: false,
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