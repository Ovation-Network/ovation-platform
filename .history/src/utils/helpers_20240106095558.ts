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
    return input.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1); })
  } else {
    return ''
  }
}


// this function will filter an array of objects and return only thsoe with a given location
export const filterEnhancedCommissionsDataByLocation = (data: PublicEnhancedCommissionProps[], location: string) => {
  const filteredData = data.filter((entry) => {
    return entry.region?.includes(location) || entry.country?.includes(location) || entry.city?.includes(location)
  });

  return filteredData;
}

// this function will filter an array of objects and return only thsoe with a given supplier name
export const filterEnhancedCommissionsDataByName = (data: PublicEnhancedCommissionProps[], name: string) => {
  const filteredData = data.filter((entry) => {
    return entry.supplier?.includes(name)
  });

  return filteredData;
}

// function that will filter an array of objects and return suppliers with a specific location
export const filterSupplierDatabseByLocation = (data: PublicSupplierDatabaseProps[], location: string) => {
  const filteredData = data.filter((entry) => {
    const valid = entry.city?.includes(location) ?? entry.country?.includes(location) ?? entry.state?.includes(location)
    return valid
  });

  return filteredData;
}

// function that will filter an array of objects and return suppliers with a specific name
export const filterSupplierDatabseByName = (data: PublicSupplierDatabaseProps[], supplier: string) => {
  const filteredData = data.filter((entry) => {
    return entry.supplier.includes(supplier)
  });

  return filteredData;
}

// function that will filter an array of objects and return suppliers with a specific represetantive company
export const filterDataByRepresentativeCompany = (data: PublicSupplierDatabaseProps[], representativeCompany: string) => {
  const filteredData = data.filter((entry) => {
    return entry.representativeCompany?.companyName?.includes(representativeCompany)
  });

  return filteredData;
}

// function that will filter an array of objects and return suppliers with a specific contact name
export const filterDataByContactName = (data: PublicSupplierDatabaseProps[], contactName: string) => {
  const filteredData = data.filter((entry) => {
    const valid = entry.contact?.name?.includes(contactName) ?? entry.representativeCompany?.name?.includes(contactName);
    return valid
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


type PublicSupplierDatabaseProps = {
  supplier: string;
  supplierType: string;
  city: string | null;
  country: string | null;
  state: string | null;
  contact: OnSiteContact | null;
  generalManager: GeneralManagerContact | null;
  representativeCompany: RepresentativeCompanyContact | null;
}

type OnSiteContact = {
  name: string;
  phone: string | null;
  email: string;
  title: string | null;
}

type GeneralManagerContact = {
  name: string;
  phone: string | null;
  email: string;
  title: string | null;
}

type RepresentativeCompanyContact = {
  name: string;
  phone: string | null;
  email: string;
  title: string | null;
  companyName: string | null;
}