/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */

/* THIS FILE CONTAINS ALL THE HELPER FUNCTIONS NEEDED FOR ALL SEARCHING / FILTERING IN TABLES

  * TODOs:
    * Create types and import them into here so that we can use them in the functions
    * 
    * 

*/




export const formatInput = (input: string) => {
  if (input) {
    return input.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1); }) as string;
  }
}



export const filterEnhancedCommissionsDataByLocation = (data: PublicEnhancedCommissionProps[], location: string) => {
  const filteredData = data.filter((entry) => {
    return entry.region?.includes(location) || entry.country?.includes(location) || entry.city?.includes(location)
  });

  return filteredData;
}

// this function will filter ana rray of objects and return only thsoe with a given hotel
export const filterEnhancedCommissionsDataByName = (data: PublicEnhancedCommissionProps[], name: string) => {
  const filteredData = data.filter((entry) => {
    return entry.supplier?.includes(name)
  });

  return filteredData;
}


type PublicEnhancedCommissionProps = {
  region: string;
  country: string;
  city: string;
  supplier: string;
  commission: string;
  specialAmenity: string | null;
  bookingInstruction: string | null;
  startDate: Date | null;
  endDate: Date | null;
}