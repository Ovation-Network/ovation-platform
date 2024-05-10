import { api } from '~/utils/api';
import { SupplierScrollContainer } from '~/components/SupplierScrollContainer';
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
      <main className="flex min-h-screen flex-col items-center justify-center bg-[#4dfff9]">
        <h1 className="text-lg text-center font-semibold">Suppliers Page</h1>
        <div className="w-full px-8">
          
          <SupplierList searchBy={searchBy} value={value}/>

            
        </div>
      </main>
    </>
  );
}



const SupplierList: React.FC<{ searchBy: searchByProps, value: string | null }> = ({ searchBy, value } ) => {

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
    <table className="table-fixed table-zebra w-full min-h-full">
      <thead>
        <tr>
          <th className="bg-teal-400 text-xl text-white">Location</th>
          <th className="bg-teal-400 text-xl text-white">Supplier</th> 
          <th className="bg-teal-400 text-xl text-white">Contact</th> 
          <th className="bg-teal-400 text-xl text-white">Rep. Company</th>
          <th className="bg-teal-400 text-xl text-white">GM</th>
          <th className="bg-teal-400 text-xl text-white"></th>
        </tr>
      </thead> 

      <SupplierScrollContainer
        suppliers={suppliers.data?.pages.flatMap((page) => page.supplier)}
        isError={suppliers.isError}
        isLoading={suppliers.isLoading}
        hasMore={suppliers.hasNextPage}
        fetchNewSuppliers={suppliers.fetchNextPage}
      />

      <tfoot>
        <tr>
          <th className="bg-teal-400 text-xl text-white">Location</th>
          <th className="bg-teal-400 text-xl text-white">Supplier</th> 
          <th className="bg-teal-400 text-xl text-white">Contact</th> 
          <th className="bg-teal-400 text-xl text-white">Rep. Company</th>
          <th className="bg-teal-400 text-xl text-white">GM</th>
          <th className="bg-teal-400 text-xl text-white"></th>
        </tr>
      </tfoot>
    </table>
  )
}