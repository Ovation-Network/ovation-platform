/* eslint-disable @typescript-eslint/non-nullable-type-assertion-style */
/* eslint-disable @typescript-eslint/prefer-for-of */
import Head from "next/head";
import { api } from "~/utils/api";
import { enhancedCommissionsByCountryAndCity, enhanceCommissionsCleaned, indexOfNulls } from "~/utils/data-migration-enhancedCommissions";
import { type SupplierType } from "@prisma/client";

export default function EnhancedHotelCommissions() {

  const createSupplierAndAddEnhancedCommissionAPI = api.supplier.addSupplierAndEnhancedCommission.useMutation({
    onSuccess: () => {
      console.log('Supplier and Enhanced Commission added')
    }
  })

  const addEnhancedCommission = (enhancedCommission: typeof enhanceCommissionsCleaned[0]) => {

    const payload = {
      name: enhancedCommission.hotel!,
      type: "HOTEL" as SupplierType,
      region: enhancedCommission.region,
      country: enhancedCommission.country,
      city: enhancedCommission.city,
      state: null,
      ovationID: null,
      commission: enhancedCommission.commission,
      specialAmenities: enhancedCommission.special_amenity ?? null,
      bookingInstructions: enhancedCommission.booking_instructions,
      startDate: null,
      endDate: null
    }

    
    try {
      createSupplierAndAddEnhancedCommissionAPI.mutate(payload)

    } catch (error) {
      console.log(error)
    }

    return
  }

  const migrateData = () => {
    for (let i = 100; i < 200; i++) {
      console.log('Adding item number', i + 1)
      
      if (indexOfNulls.includes(i)) {
        console.log('Null values / commission has already been added via ovationID found at index', i, 'skipping......')
        continue
      }
      
      if (enhanceCommissionsCleaned[i] !== undefined) {
        addEnhancedCommission(enhanceCommissionsCleaned[i] as typeof enhanceCommissionsCleaned[0])
      }
      

    }
  }

  return (
    <>
      <Head>
        <title>OvationNetwork - Enhanced Hotel Commissions</title>
        <meta name="description" content="Enhanced hotel commissions offers from ON suppliers" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className=" flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#ffffff] to-[#5f5f5f]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-4xl font-bold text-center">Enhanced Hotel Commissions - DATA MIGRATION</h1>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
            {/* CONTENT FOR LINKS TO THE PUBLIC LINK FOR OVATION PAGES */}
            <button className="btn" onClick={() => migrateData()}>MIGRATE</button>
          </div>
        </div>
      </main>
    </>
  );
}