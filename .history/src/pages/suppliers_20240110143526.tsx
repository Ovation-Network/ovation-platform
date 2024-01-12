import Head from "next/head";
import { api } from "~/utils/api"
import { type supplierDatabaseData, duplicateIDs } from "~/utils/data-migration";

export default function Suppliers() {

  /* Here we will write the functions to migrate current existing into the new Supabase database
    * 1. Create a function to use api to create a new supplier
    * 2. Create a function to use api to connect an onsite contact to a supplier
    * 3. Create a function to use api to create a new onsite contact
    * 4. Create a function to use api to create a new rep company contact
  */

  const createSupplierAPI = api.supplier.addSupplier.useMutation({
    onSuccess: (supplier) => {
      console.log("Supplier created", supplier)
    }
  })

  const createOnsiteContactAPI = api.supplier.addOnSiteContact.useMutation({
    onSuccess: (contact) => {
      console.log("Onsite contact created", contact)
    }
  })

  const createRepContactAPI = api.supplier.addRepresentativeCompany.useMutation({
    onSuccess: (contact) => {
      console.log("Rep contact created", contact)
    }
  })

  const createGMContactAPI = api.supplier.addGeneralManager.useMutation({
    onSuccess: (contact) => {
      console.log("GM contact created", contact)
    }
  })

  const createSupplier = async (supplierData: typeof supplierDatabaseData[0]) => {

  }

  const migrateSupplier = async (supplierData: typeof supplierDatabaseData) => {

  }

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
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
            {/* CONTENT FOR LINKS TO THE PUBLIC LINK FOR OVATION PAGES */}
          </div>
        </div>
      </main>
    </>
  );
}