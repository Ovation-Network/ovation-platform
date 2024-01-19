import Head from "next/head";
import { api } from "~/utils/api";
import { enhancedCommissionsByCountryAndCity, type enhanceCommissionsCleaned, indexOfNulls } from "~/utils/data-migration-enhancedCommissions";

export default function EnhancedHotelCommissions() {

  const addEnhancedCommissionAPI = api.enhancedCommission.connectEnhancedCommissionByOvationID.useMutation({
    onSuccess: (data) => {
      console.log(`Successfully linked enhanced commission`, data)
    }
  })

  const addEnhancedCommission = async (enhancedCommission: typeof enhanceCommissionsCleaned[0]) => {

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
          </div>
        </div>
      </main>
    </>
  );
}