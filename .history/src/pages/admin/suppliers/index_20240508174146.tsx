import Head from "next/head";
// import { PublicSupplierDatabaseTable } from "~/components/PublicSupplierDatabaseTable";
import { AdminSupplierDatabaseTable } from "~/components/AdminSupplierDatabaseTable";

export default function Suppliers() {

  return (
    <>
      <Head>
        <title>OvationNetwork - Suppliers</title>
        <meta name="description" content="Listed contacts for ON suppliers" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className=" flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#ffffff] to-[#5f5f5f]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-[hsl(195,100%,71%)] sm:text-[5rem]">
            OvationNetwork<span className="text-[hsl(195,100%,71%)]">IA</span>Admin Portal
          </h1>
          <div className="flex">
            < AdminSupplierDatabaseTable />
          </div>
        </div>
      </main>
    </>
  );
}