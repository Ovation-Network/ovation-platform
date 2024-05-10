import Head from "next/head";
import Image from "next/image";
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
        
        
        <div className="b relative h-auto w-full overflow-hidden rounded-lg">
            <Image fill src="/ovation-logo.png" alt="logo" className="w-full object-cover" />

        </div>
       
        {/* <Image src="/ovation-logo.png" alt="logo" width={'100%'}/> */}
        <div className="w-full px-8">
          < PublicSupplierDatabaseTable />
        </div>
      </main>
    </>
  );
}

