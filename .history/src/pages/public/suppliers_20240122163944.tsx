/* eslint-disable @typescript-eslint/prefer-for-of */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import Head from "next/head";
import Image from "next/image";
import { PublicSupplierDatabaseTable } from "~/components/PublicSupplierDatabaseTable";
import { authOptions } from "~/server/auth";


export default function Suppliers() {

  


  return (
    <>
      <Head>
        <title>OvationNetwork - Suppliers</title>
        <meta name="description" content="Listed contacts for ON suppliers" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-white">
        <div className="flex flex-col items-center justify-center">
          <div className="flex flex-col">
            <Image
              src="/ovation-logo.png"
              alt="logo"
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: '50%', height: 'auto', marginLeft: 'auto', marginRight: 'auto' }} // optional
            />

            < PublicSupplierDatabaseTable />
            
          </div>
        </div>
      </main>
    </>
  );
}