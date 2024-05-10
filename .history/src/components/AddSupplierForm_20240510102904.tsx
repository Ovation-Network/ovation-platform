import { useState } from 'react'
import { api } from '~/utils/api'
import { useRouter } from 'next/navigation'
import type { SupplierType } from '@prisma/client'

export const AddSupplierForm: React.FC = () => {

  const router = useRouter();

  // initiate an instance of trpc Utils in to use when making changes to the supplier database
  const trpcUtils = api.useUtils();

  const addSupplierAndContactsAPI = api.supplier.createSupplierAndContacts.useMutation({
    onSuccess: () => {
      // show success message
      alert(' Supplier and contacts added successfully! ');
      void trpcUtils.supplier.getSupplierContacts.invalidate().then(() => alert('invalidated getSupplierContactsCache! Public page should be updated with changes'));
      
      // redirect to the Admin Page
      router.push('/admin/suppliers');
    }
  });

  const [ supplierName, setSupplierName ] = useState<string>('');
  const [ supplierType, setSupplierType ] = useState<SupplierType>('OTHER');
  const [ supplierCountry, setSupplierCountry ] = useState<string>('');
  const [ supplierCity, setSupplierCity ] = useState<string>('');
  const [ supplierState, setSupplierState ] = useState<string>('');
  const [ onsiteContact, setOnsiteContact ] = useState<boolean>(false);
  const [ onsiteContactName, setOnsiteContactName ] = useState<string>('');
  const [ onsiteContactTitle, setOnsiteContactTitle ] = useState<string>('');
  const [ onsiteContactPhone, setOnsiteContactPhone ] = useState<string>('');
  const [ onsiteContactEmail, setOnsiteContactEmail ] = useState<string>('');
  const [ representativeCompany, setRepresentativeCompany ] = useState<boolean>(false);
  const [ representativeCompanyName, setRepresentativeCompanyName ] = useState<string>('');
  const [ representativeName, setRepresentativeName ] = useState<string>('');
  const [ representativeTitle, setRepresentativeTitle ] = useState<string>('');
  const [ representativePhone, setRepresentativePhone ] = useState<string>('');
  const [ representativeEmail, setRepresentativeEmail ] = useState<string>('');
  const [ generalManager, setGeneralManager ] = useState<boolean>(false);
  const [ generalManagerName, setGeneralManagerName ] = useState<string>('');
  const [ generalManagerTitle, setGeneralManagerTitle ] = useState<string>('');
  const [ generalManagerPhone, setGeneralManagerPhone ] = useState<string>('');
  const [ generalManagerEmail, setGeneralManagerEmail ] = useState<string>('');


  const supplierTypeOptions = ['HOTEL', 'DMC', 'CRUISE', 'RAIL', 'REPRESENTATION_COMPANY', 'AIR', 'TOUR_OPERTATOR', 'CAR_RENTAL', 'TRAVEL_INSURANCE', 'CHAUFFEUR_SERVICES', 'OTHER']

  const handleSubmit = (event: React.MouseEvent<HTMLFormElement>) => {
    event.preventDefault();

    const supplierData = {
      name: supplierName,
      type: supplierType,
      region: null,
      country: supplierCountry,
      city: supplierCity,
      state: supplierState,
      onsiteContact: onsiteContact,
      onsiteContactName: onsiteContactName,
      onsiteContactTitle: onsiteContactTitle,
      onsiteContactPhone: onsiteContactPhone,
      onsiteContactEmail: onsiteContactEmail,
      generalManager: generalManager,
      generalManagerName: generalManagerName,
      generalManagerTitle: generalManagerTitle,
      generalManagerPhone: generalManagerPhone,
      generalManagerEmail: generalManagerEmail,
      representativeCompany: representativeCompany,
      representativeCompanyName: representativeCompanyName,
      representativeCompanyTitle: representativeTitle,
      representativeCompanyPhone: representativePhone,
      representativeCompanyEmail: representativeEmail,
    }

    console.log(supplierData);
    addSupplierAndContactsAPI.mutate(supplierData);
    console.log('form submitted');
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
              <option disabled value="">--Choose Suppliery Type--</option>
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

          
e
        <div className="flex">
          <button className="btn btn-wide my-5 mx-auto " type="submit">
          </button>
        </div>
      </form>

    </>
  )
}

