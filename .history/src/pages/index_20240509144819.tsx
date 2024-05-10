import Head from "next/head";
import { PublicSupplierDatabaseTable } from "~/components/PublicSupplierDatabaseTable";


export default function Home() {

  return(
    <>
      <Head>
        <title>OvationNetwork Supplier Contacts</title>
        <meta name="description" content="Where to find the contact information of the suppliers that work with The OvationNetwork" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#ffffff] to-[#bebebe]">
        <h1 className="text-lg text-center font-semibold">Suppliers Page</h1>
        <div className="w-full px-8">
          < PublicSupplierDatabaseTable />
        </div>
      </main>
    </>
  );
}

