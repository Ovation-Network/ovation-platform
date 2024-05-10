// import { api } from '~/utils/api';
import { PublicSupplierDatabaseTable } from '~/components/PublicSupplierDatabaseTable';
// import { useSearchParams } from 'next/navigation';
import React from 'react';
import Head from "next/head";

export default function Suppliers() {

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
          <PublicSupplierDatabaseTable />
        </div>
      </main>
    </>
  );
}

