import { useState, useEffect } from 'react'
import { api } from '~/utils/api'
import { useRouter } from 'next/router'
import type { SupplierType } from '@prisma/client'



export const EditSupplierForm: React.FC = () => {

  const router = useRouter();

  // grab the supplier's id from the route params
  const { id } = router.query;

  // change the ID to a number for the API
  const supplierQueryID = Number(id);

  // get the supplier data from the API
  const supplier = api.supplier.getSupplierById.useQuery({id: supplierQueryID});
  // set the state for the IDs
  const [supplierId, setSupplierId] = useState<number>(supplier.data?.id ?? 0);
  const [contactId, setContactId] = useState<number>(supplier.data?.contacts[0]?.id ?? 0);
  const [represntativeCompanyID, setRepresentativeCompanyID] = useState<number>(supplier.data?.representativeCompanies[0]?.id ?? 0);
  const [generalManagerID, setGeneralManagerID] = useState<number>(supplier.data?.generalManagers[0]?.id ?? 0);

  const [ supplierName, setSupplierName ] = useState<string>(supplier.data?.name ?? '');
  const [ supplierType, setSupplierType ] = useState<SupplierType>(supplier.data?.type ?? 'OTHER');
  const [ supplierCountry, setSupplierCountry ] = useState<string>(supplier.data?.country ?? '');
  const [ supplierCity, setSupplierCity ] = useState<string>(supplier.data?.city ?? '');
  const [ supplierState, setSupplierState ] = useState<string>(supplier.data?.state ??'');

  const [ onsiteContact, setOnsiteContact ] = useState<boolean>(supplier.data?.contacts.length != undefined && supplier.data?.contacts.length  > 0 || false);
  const [ onsiteContactName, setOnsiteContactName ] = useState<string>(supplier.data?.contacts[0]?.name ?? '');
  const [ onsiteContactTitle, setOnsiteContactTitle ] = useState<string>(supplier.data?.contacts[0]?.title ?? '');
  const [ onsiteContactPhone, setOnsiteContactPhone ] = useState<string>(supplier.data?.contacts[0]?.phone ?? '');
  const [ onsiteContactEmail, setOnsiteContactEmail ] = useState<string>(supplier.data?.contacts[0]?.email ?? '');

  const [ representativeCompany, setRepresentativeCompany ] = useState<boolean>(supplier.data?.representativeCompanies.length != undefined && supplier.data?.representativeCompanies.length  > 0 || false);
  const [ representativeCompanyName, setRepresentativeCompanyName ] = useState<string>(supplier.data?.representativeCompanies[0]?.companyName ?? '');
  const [ representativeName, setRepresentativeName ] = useState<string>(supplier.data?.representativeCompanies[0]?.name ?? '');
  const [ representativeTitle, setRepresentativeTitle ] = useState<string>(supplier.data?.representativeCompanies[0]?.title ?? '');
  const [ representativePhone, setRepresentativePhone ] = useState<string>(supplier.data?.representativeCompanies[0]?.phone ?? '');
  const [ representativeEmail, setRepresentativeEmail ] = useState<string>(supplier.data?.representativeCompanies[0]?.email ?? '');

  const [ generalManager, setGeneralManager ] = useState<boolean>(supplier.data?.generalManagers.length != undefined && supplier.data?.generalManagers.length  > 0 || false);
  const [ generalManagerName, setGeneralManagerName ] = useState<string>(supplier.data?.generalManagers[0]?.name ?? '');
  const [ generalManagerTitle, setGeneralManagerTitle ] = useState<string>(supplier.data?.generalManagers[0]?.title ?? '');
  const [ generalManagerPhone, setGeneralManagerPhone ] = useState<string>(supplier.data?.generalManagers[0]?.phone ?? '');
  const [ generalManagerEmail, setGeneralManagerEmail ] = useState<string>(supplier.data?.generalManagers[0]?.email ?? '');

  // initiate an instance of trpc Utils in to use when making changes to the supplier database
  const trpcUtils = api.useUtils();

  const editSupplierAndContactsAPI = api.supplier.editSupplierAndContacts.useMutation({
    onSuccess: ( { supplier } ) => {
      // invalidate invalidate getSupplierContacts cache
      void trpcUtils.supplier.getSupplierContacts.invalidate();
      const newSupplierData = supplier;

      const updateData: Parameters<typeof trpcUtils.supplier.infiniteSupplierFeed.setInfiniteData>[1] =
        (oldData) => {
          if (oldData == null) return;

          return {
            ...oldData,
            pages: oldData.pages.map((page) => {
              return {
                ...page,
                supplier: page.supplier.map((supplier) => {
                  if (supplier.id === supplierQueryID) {
                    return {
                      ...supplier,
                      name: newSupplierData.name,
                      type: newSupplierData.type,
                      country: newSupplierData.country,
                      city: newSupplierData.city,
                      state: newSupplierData.state,
                      contacts: newSupplierData.contacts,
                      generalManagers: newSupplierData.generalManagers,
                      representativeCompanies: newSupplierData.representativeCompanies,
                    }
                  }
                  return supplier;
                })
              }
            })
          }
        };
        // use trpcUtils to update infiniteSupplierFeed data
        trpcUtils.supplier.infiniteSupplierFeed.setInfiniteData({}, updateData);
        console.log('Successfully ran trpcUtils infiniteSupplierFeed.setInfiniteData cache update');

        
        // show success message
        alert(' Successfully updated the database and updated inifniteQuery cache! ');
    }
  });

  // use useEffect to update the state when the supplier data changes
  useEffect(() => {

    // set the state for the IDs
    setSupplierId(supplier.data?.id ?? 0);
    setContactId(supplier.data?.contacts[0]?.id ?? 0);
    setRepresentativeCompanyID(supplier.data?.representativeCompanies[0]?.id ?? 0);
    setGeneralManagerID(supplier.data?.generalManagers[0]?.id ?? 0);


    setSupplierName(supplier.data?.name ?? '');
    setSupplierType(supplier.data?.type ?? 'OTHER');
    setSupplierCountry(supplier.data?.country ?? '');
    setSupplierCity(supplier.data?.city ?? '');
    setSupplierState(supplier.data?.state ??'');
    setOnsiteContact(supplier.data?.contacts.length != undefined && supplier.data?.contacts.length  > 0 || false);
    setOnsiteContactName(supplier.data?.contacts[0]?.name ?? '');
    setOnsiteContactTitle(supplier.data?.contacts[0]?.title ?? '');
    setOnsiteContactPhone(supplier.data?.contacts[0]?.phone ?? '');
    setOnsiteContactEmail(supplier.data?.contacts[0]?.email ?? '');
    setRepresentativeCompany(supplier.data?.representativeCompanies.length != undefined && supplier.data?.representativeCompanies.length  > 0 || false);
    setRepresentativeCompanyName(supplier.data?.representativeCompanies[0]?.companyName ?? '');
    setRepresentativeName(supplier.data?.representativeCompanies[0]?.name ?? '');
    setRepresentativeTitle(supplier.data?.representativeCompanies[0]?.title ?? '');
    setRepresentativePhone(supplier.data?.representativeCompanies[0]?.phone ?? '');
    setRepresentativeEmail(supplier.data?.representativeCompanies[0]?.email ?? '');
    setGeneralManager(supplier.data?.generalManagers.length != undefined && supplier.data?.generalManagers.length  > 0 || false);
    setGeneralManagerName(supplier.data?.generalManagers[0]?.name ?? '');
    setGeneralManagerTitle(supplier.data?.generalManagers[0]?.title ?? '');
    setGeneralManagerPhone(supplier.data?.generalManagers[0]?.phone ?? '');
    setGeneralManagerEmail(supplier.data?.generalManagers[0]?.email ?? '');
  }, [supplier.data])


  const supplierTypeOptions = ['HOTEL', 'DMC', 'CRUISE', 'RAIL', 'REPRESENTATION_COMPANY', 'AIR', 'TOUR_OPERTATOR', 'CAR_RENTAL', 'TRAVEL_INSURANCE', 'CHAUFFEUR_SERVICES', 'OTHER']

  const handleSubmit = async (event: React.MouseEvent<HTMLFormElement>) => {
    event.preventDefault();

    const supplierData = {
      id: supplierId,
      name: supplierName,
      type: supplierType,
      region: null,
      country: supplierCountry,
      city: supplierCity,
      state: supplierState,
      onsiteContact: onsiteContact,
      onsiteContactID: contactId,
      onsiteContactName: onsiteContactName,
      onsiteContactTitle: onsiteContactTitle,
      onsiteContactPhone: onsiteContactPhone,
      onsiteContactEmail: onsiteContactEmail,
      generalManager: generalManager,
      generalManagerID: generalManagerID,
      generalManagerName: generalManagerName,
      generalManagerTitle: generalManagerTitle,
      generalManagerPhone: generalManagerPhone,
      generalManagerEmail: generalManagerEmail,
      representativeCompany: representativeCompany,
      representativeCompanyID: represntativeCompanyID,
      representativeCompanyName: representativeCompanyName,
      representativeCompanyTitle: representativeTitle,
      representativeCompanyPhone: representativePhone,
      representativeCompanyEmail: representativeEmail,
    }

    console.log(supplierData);

    editSupplierAndContactsAPI.mutate(supplierData);
    await router.push('/admin/suppliers');
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="flex justify-center">
          <div className="form-control w-full max-w-xs pr-2">
            <label className="label">
              <span className="label-text">SUPPLIER NAME</span>
            </label>
            <input value={supplierName} onChange={(e) => setSupplierName(e.target.value)} type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" required/>
          </div>

          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">COUNTRY</span>
            </label>
            <input value={supplierCountry} onChange={(e) => setSupplierCountry(e.target.value)} type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" required/>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="form-control w-full max-w-xs pr-2">
            <label className="label">
              <span className="label-text">CITY</span>
            </label>
            <input value={supplierCity} type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" onChange={(e) => setSupplierCity(e.target.value)} required/>
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">STATE</span>
            </label>
            <input value={supplierState} type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" onChange={(e) => setSupplierState(e.target.value)}/>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">TYPE</span>
            </label>
            <select id="option-select" className="select select-bordered w-full max-w-xs" defaultValue={""} onChange={(e) => setSupplierType(e.target.value as SupplierType)} required>
              <option disabled value="OTHER">--Choose Suppliery Type--</option>
              {supplierTypeOptions.map((option, i) => <option key={`supplier-type-${i}`} value={option}>{option}</option>)}
                                    
            </select>

            <div className="btn-group my-5">
              <div className={onsiteContact ? 'btn btn-active' : 'btn'} onClick={() => setOnsiteContact((prevValue) => !prevValue)}>ONSITE</div>
              <div className={representativeCompany ? 'btn btn-active' : 'btn'} onClick={() => setRepresentativeCompany((prevValue) => !prevValue)}>REP COMPANY</div>
              <div className={generalManager ? 'btn btn-active' : 'btn'} onClick={() => setGeneralManager((prevValue) => !prevValue)}>GEN MANAGER</div>
            </div>
          </div>
        </div>

        {/* Section for onsite contact */}
          { onsiteContact && 
          <>
            <h2 className="font-bold text-md text-center mt-2">ONSITE CONTACT</h2>
            <div className="flex justify-center">
              <div className="form-control w-full max-w-xs pr-2">

                <label className="label">
                  <span className="label-text">NAME</span>
                </label>
                <input value={onsiteContactName} type="text" placeholder="Last, First" className="input input-bordered w-full max-w-xs" onChange={(e) => setOnsiteContactName(e.target.value)} required/>
              </div>
              
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">TITLE</span>
                </label>
                <input value={onsiteContactTitle} type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" onChange={(e) => setOnsiteContactTitle(e.target.value)}/>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="form-control w-full max-w-xs pr-2">
                <label className="label">
                  <span className="label-text">PHONE</span>
                </label>
                <input value={onsiteContactPhone} type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" onChange={(e) => setOnsiteContactPhone(e.target.value)} />
              </div>

              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">EMAIL</span>
                </label>
                <input value={onsiteContactEmail} type="email" placeholder="contact@example.com" className="input input-bordered w-full max-w-xs"  onChange={(e) => setOnsiteContactEmail(e.target.value)} required/>
              </div>
            </div>
          </>
          }

          {/* Section for Representative Company */}

          { representativeCompany && 
          <>
            <h2 className="font-bold text-md text-center mt-4 text-gray-900">REPRESENTATION COMPANY</h2>
            <div className="flex justify-center">
              <div className="form-control w-full max-w-xs pr-2">
                <label className="label">
                  <span className="label-text">COMPANY</span>
                </label>
                <input value={representativeCompanyName} type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" onChange={(e) => setRepresentativeCompanyName(e.target.value)} required/>
              </div>
              
              <div className="form-control w-full max-w-xs pr-2">
                <label className="label">
                  <span className="label-text">NAME</span>
                </label>
                <input value={representativeName} type="text" placeholder="Last, First" className="input input-bordered w-full max-w-xs" onChange={(e) => setRepresentativeName(e.target.value)} required/>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="form-control w-full max-w-xs pr-2">
                <label className="label">
                  <span className="label-text">TITLE</span>
                </label>
                <input value={representativeTitle} type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" onChange={(e) => setRepresentativeTitle(e.target.value)}/>
              </div>
              
              <div className="form-control w-full max-w-xs pr-2">
                <label className="label">
                  <span className="label-text">PHONE</span>
                </label>
                <input value={representativePhone} type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" onChange={(e) => setRepresentativePhone(e.target.value)}/>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="form-control w-full max-w-xs pr-2">
                <label className="label">
                  <span className="label-text">EMAIL</span>
                </label>
                <input value={representativeEmail} type="email" placeholder="contact@example.com" className="input input-bordered w-full max-w-xs" onChange={(e) => setRepresentativeEmail(e.target.value)} required/>
              </div>
            </div>
          
          </>}

          {/* Section for General Manager */}

          {generalManager &&
          <>
            <h2 className="font-bold text-md text-center mt-4 text-gray-900">GENERAL MANAGER</h2>
            <div className="flex justify-center">
              
              <div className="form-control w-full max-w-xs pr-2">
                <label className="label">
                  <span className="label-text">NAME</span>
                </label>
                <input value={generalManagerName} type="text" placeholder="Last, First" className="input input-bordered w-full max-w-xs" onChange={(e) => setGeneralManagerName(e.target.value)}/>
              </div>
              
              <div className="form-control w-full max-w-xs pr-2">
                <label className="label">
                  <span className="label-text">TITLE</span>
                </label>
                <input value={generalManagerTitle} type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" onChange={(e) => setGeneralManagerTitle(e.target.value)}/>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="form-control w-full max-w-xs pr-2">
                <label className="label">
                  <span className="label-text">PHONE</span>
                </label>
                <input value={generalManagerPhone} type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" onChange={(e) => setGeneralManagerPhone(e.target.value)}/>
              </div>
              
              <div className="form-control w-full max-w-xs pr-2">
                <label className="label">
                  <span className="label-text">EMAIL</span>
                </label>
                <input value={generalManagerEmail} type="email" placeholder="contact@example.com" className="input input-bordered w-full max-w-xs" onChange={(e) => setGeneralManagerEmail(e.target.value)}/>
              </div>
            </div>
          
          </>}

          

        <div className="flex">
          <button className="btn btn-wide my-5 mx-auto " type="submit">
          </button>
        </div>
      </form>

    </>
  )
}

