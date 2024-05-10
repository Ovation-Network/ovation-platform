// import { api } from '~/utils/api';
// import { InfiniteSupplierScrollContainer } from '~/components/InfiniteSupplierScrollContainer';
import { PublicSupplierDatabaseTable } from '~/components/PublicSupplierDatabaseTable';
// import { useSearchParams } from 'next/navigation';
import React from 'react';
import Head from "next/head";

type searchByProps = 'name' | 'id' | 'country' | 'city' | undefined;

export default function Suppliers() {

  return (
    <>
      <Head>
        <title>OvationNetwork Contacts Database</title>
        <meta name="description" content="Where to find the contact information of the suppliers that work with The OvationNetwork" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#ffffff] to-[#bebebe]">
        <h1 className="text-lg text-center font-semibold mb-full">Suppliers Page</h1>
        <div className="w-full px-8">
          < PublicSupplierDatabaseTable />
        </div>
      </main>
    </>
  );
}