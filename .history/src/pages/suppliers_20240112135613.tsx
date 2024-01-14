/* eslint-disable @typescript-eslint/prefer-for-of */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import Head from "next/head";
import { api } from "~/utils/api"
import { supplierDatabaseData, duplicateIDs, suppliersWithNullNameIDs } from "~/utils/data-migration";
import type { SupplierType } from "@prisma/client";
import { useState } from "react";

export default function Suppliers() {

  const [supplierID, setSupplierID] = useState<number>(1)

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

  // function that will generate the Supplier ENUM for type
  function generateSupplierTypeENUM(type: string | null) {
    switch (type) {
      case "Hotel" || "Hotel ":
        return "HOTEL"
      case "DMC":
        return "DMC"
      case "Tour Operator":
        return "TOUR_OPERATOR"
      case "Air":
        return "AIR"
      case "Cruise":
        return "CRUISE"
      case "Representation Company":
        return "REPRESENTATION_COMPANY"
      case "Car Rental":
        return "CAR_RENTAL"
      case "Insurance":
        return "INSURANCE"
      case "Chauffeur Services" || "Chauffered" || "Chauffered ":
        return "CHAUFFEUR_SERVICES"
      case "Trains" || "Rails":
        return "RAIL"
      case null:
        return "OTHER"
      default:
        return "OTHER"
    }
  }

  const addSupplier = async (supplier: { type: "DMC" | "HOTEL" | "CRUISE" | "RAIL" | "TRAINS" | "REPRESENTATION_COMPANY" | "AIR" | "TOUR_OPERATOR" | "CAR_RENTAL" | "TRAVEL_INSURANCE" | "CHAUFFEUR_SERVICES" | "OTHER"; name: string; country: string | null; region: string | null; city: string | null; state: string | null; ovationID: string | null}) => {
    try {
      createSupplierAPI.mutate(supplier)
    } catch (error) {
      console.log(error)
    }

    return
  }

  const addContact = async (contact: { name: string; email: string | null; phone: string | null; title: string | null; supplierId: number }) => {
    try {
      createOnsiteContactAPI.mutate(contact)
    } catch (error) {
      console.log(error)
    }

    return
  }

  const addGeneralManager = async (contact: { name: string; email: string | null; phone: string | null; title: string; supplierId: number }) => {
    try {
      createGMContactAPI.mutate(contact)
    } catch (error) {
      console.log(error)
    }

    return
  }

  const addRepComapany = async (contact: { name: string; email: string | null; phone: string | null; title: string | null; companyName: string | null; supplierId: number }) => {
    try {
      createRepContactAPI.mutate(contact)
    } catch (error) {
      console.log(error)
    }

    return
  }

  async function migrateSuppliers(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault()

    const suppliers = supplierDatabaseData

    for (let i = 0; i <= 50; i++) {

      console.log(`Entering loop ${i}`)

      const supplier = suppliers[i];

      if (supplier && suppliersWithNullNameIDs.includes(supplier.id)) { break; } // this is to skip the suppliers that have null names

      const supplierData = {
        name: supplier!.supplier_name!,
        type: generateSupplierTypeENUM(supplier!.supplier_type) as SupplierType,
        region: null,
        country: supplier!.country,
        city: supplier!.city,
        state: supplier!.state,
        ovationID: supplier!.id,
      }
      await addSupplier(supplierData)
      
      // Create the onsite contact                            if it exists on the data
      if (supplier?.hotel_representative !== null) {
        try {                           
          
          const onSiteContactData = {
            name: supplier!.hotel_representative.name,
            email: supplier!.hotel_representative.email,
            phone: supplier!.hotel_representative.phone,
            title: supplier!.hotel_representative.title,
            supplierId: i+1,
          }
          console.log(`Trying to create onsite contact in loop ${i} with supplierId`)
  
          await addContact(onSiteContactData)
        } catch (error) {
          console.log(error)
        }
      }
  
      // Create the general manager contact if it exists on the data
      if (supplier?.general_manager !== null && supplier?.general_manager !== undefined) {
        try {
          
          const generalManagerData = {
            name: supplier.general_manager.name,
            email: supplier.general_manager.email ?? null,
            phone: supplier.general_manager.phone ?? null,
            title: supplier.general_manager.title ?? 'General Manager',
            supplierId: i+1,
          }
          console.log(`Trying to create GM contact in loop ${i} with supplierID as ${supplierID}`)
          createGMContactAPI.mutate(generalManagerData)
        } catch (error) {
          console.log(error)
        }
      }
  
      // Create the rep company contact if it exists on the data
      if (supplier?.representative_company !== null && supplier?.representative_company !== undefined) {
        try {
          
          const repCompanyData = {
            name: supplier.representative_company.name,
            email: supplier.representative_company.email ?? null,
            phone: supplier.representative_company.phone ?? null,
            title: supplier.representative_company.title,
            companyName: supplier?.representative_company.company,
            supplierId: i+1,
          }
          console.log(`Trying to create REP contact in loop ${i} with supplierID as ${supplierID}`)
          createRepContactAPI.mutate(repCompanyData)
        } catch (error) {
          console.log(error)
        }
      }
      
      
    }
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
            <div className="flex flex-col items-center justify-center gap-4 p-8 bg-[#ffffff] rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold tracking-tight text-[hsl(195,100%,71%)] sm:text-[2.5rem]">
                Migrate Suppliers
              </h2>
              <button onClick={async (e) => await migrateSuppliers(e)} className="px-4 py-2 text-lg font-bold tracking-tight text-white bg-[hsl(195,100%,71%)] rounded-lg shadow-lg">
                Migrate Suppliers
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}