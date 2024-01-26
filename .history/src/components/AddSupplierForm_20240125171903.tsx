import { useState } from 'react'
import { api } from '~/utils/api'
import { useRouter } from 'next/navigation'

export const AddSupplierForm: React.FC = () => {

  const router = useRouter();

  const addSupplierAndContactsAPI = api.supplier.createSupplierAndContacts.useMutation({
    onSuccess: () => {
      // show success message
      alert(' Supplier and contacts added successfully! ');

      // redirect to the Admin Page
      router.push('/admin');
    }
  });

  const [ supplierName, setSupplierName ] = useState<string>('');
  const [ supplierType, setSupplierType ] = useState<string>('');
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
    console.log('submitting form');
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
            <select id="option-select" className="select select-bordered w-full max-w-xs" value={supplierType} onChange={(e) => setSupplierType(e.target.value)} required>
              <option disabled selected value="">--Choose Suppliery Type--</option>
              {supplierTypeOptions.map((option, i) => <option key={`supplier-type-${i}`} value={option}>{option}</option>)}
                                    
            </select>

            <div className="btn-group my-5">
              <div className={onsiteContact ? 'btn btn-active' : 'btn'} onClick={() => setOnsiteContact((prevValue) => !prevValue)}>ONSITE</div>
              <div className={representativeCompany ? 'btn btn-active' : 'btn'} onClick={() => setRepresentativeCompany((prevValue) => !prevValue)}>REP COMPANY</div>
              <div className={generalManager ? 'btn btn-active' : 'btn'} onClick={() => setGeneralManager((prevValue) => !prevValue)}>GEN MANAGER</div>
            </div>
          </div>
        </div>

        {/* CODE FOR ONSITE CONTACT */}
          {onsiteContact && 
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

          <h2 className="font-bold text-md text-center mt-4">REPRESENTATION COMPANY</h2>
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

          <h2 className="font-bold text-md text-center mt-4">GENERAL MANAGER</h2>
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

        <div className="flex">
          <button className="btn btn-wide my-5 mx-auto " type="submit">
          </button>
        </div>
      </form>

    </>
  )
}


// CODE FOR PREVIOUS SUPPLIER ADD FORM
{/* <form on:submit|preventDefault={handleSubmit}>
    <div className="flex justify-center">
      <div className="form-control w-full max-w-xs pr-2">
        <!-- svelte-ignore a11y-label-has-associated-control -->
        <label className="label">
          <span className="label-text">SUPPLIER NAME</span>
        </label>
        <input value={supplier_name} type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" required/>
      </div>

      <div className="form-control w-full max-w-xs">
        <!-- svelte-ignore a11y-label-has-associated-control -->
        <label className="label">
          <span className="label-text">COUNTRY</span>
        </label>
        <input value={supplier_country} type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" required/>
      </div>
    </div>
    <div className="flex justify-center">
      <div className="form-control w-full max-w-xs pr-2">
        <!-- svelte-ignore a11y-label-has-associated-control -->
        <label className="label">
          <span className="label-text">CITY</span>
        </label>
        <input value={supplier_city} type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" required/>
      </div>
      <div className="form-control w-full max-w-xs">
        <!-- svelte-ignore a11y-label-has-associated-control -->
        <label className="label">
          <span className="label-text">STATE</span>
        </label>
        <input value={supplier_state} type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
      </div>
    </div>
    <div className="flex justify-center">
      <div className="form-control w-full max-w-xs">
        <!-- svelte-ignore a11y-label-has-associated-control -->
        <label className="label">
          <span className="label-text">TYPE</span>
        </label>
        <select id="option-select" className="select select-bordered w-full max-w-xs" value={supplier_type} required>
          <option disabled selected value="">--Choose Suppliery Type--</option>
          {#each options as option}
            <option value={option}>{option}</option>
          {/each}
        </select>

      <div className="btn-group my-5">
        <button className={onsite_contact ? 'btn btn-active' : 'btn'} value="onsite" on:click|preventDefault={(e) => handleToggle(e)}>ONSITE</button>
        <button className={representative_company ? 'btn btn-active' : 'btn'} value="rep" on:click|preventDefault={(e) => handleToggle(e)}>REP COMPANY</button>
        <button className={general_manager ? 'btn btn-active' : 'btn'} value="manager" on:click|preventDefault={(e) => handleToggle(e)}>GEN MANAGER</button>
      </div>
    </div>

    </div>
    {#if onsite_contact}
      <h2 className="font-bold text-md text-center mt-2">ONSITE CONTACT</h2>
      <div className="flex justify-center">
        <div className="form-control w-full max-w-xs pr-2">
          <!-- svelte-ignore a11y-label-has-associated-control -->
          <label className="label">
            <span className="label-text">NAME</span>
          </label>
          <input value={onsite_contact_name} type="text" placeholder="Last, First" className="input input-bordered w-full max-w-xs" required/>
        </div>
        
        <div className="form-control w-full max-w-xs">
          <!-- svelte-ignore a11y-label-has-associated-control -->
          <label className="label">
            <span className="label-text">TITLE</span>
          </label>
          <input value={onsite_contact_title} type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs"/>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="form-control w-full max-w-xs pr-2">
          <!-- svelte-ignore a11y-label-has-associated-control -->
          <label className="label">
            <span className="label-text">PHONE</span>
          </label>
          <input value={onsite_contact_phone} type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
        </div>

        <div className="form-control w-full max-w-xs">
          <!-- svelte-ignore a11y-label-has-associated-control -->
          <label className="label">
            <span className="label-text">EMAIL</span>
          </label>
          <input value={onsite_contact_email} type="email" placeholder="contact@example.com" className="input input-bordered w-full max-w-xs" required/>
        </div>
      </div>
    {/if}

    {#if representative_company}
      <h2 className="font-bold text-md text-center mt-4">REPRESENTATION COMPANY</h2>
      <div className="flex justify-center">
        <div className="form-control w-full max-w-xs pr-2">
          <!-- svelte-ignore a11y-label-has-associated-control -->
          <label className="label">
            <span className="label-text">COMPANY</span>
          </label>
          <input value={representative_company_name} type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" required/>
        </div>
        
        <div className="form-control w-full max-w-xs pr-2">
          <!-- svelte-ignore a11y-label-has-associated-control -->
          <label className="label">
            <span className="label-text">NAME</span>
          </label>
          <input value={representative_name} type="text" placeholder="Last, First" className="input input-bordered w-full max-w-xs" required/>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="form-control w-full max-w-xs pr-2">
          <!-- svelte-ignore a11y-label-has-associated-control -->
          <label className="label">
            <span className="label-text">TITLE</span>
          </label>
          <input value={representative_title} type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs"/>
        </div>
        
        <div className="form-control w-full max-w-xs pr-2">
          <!-- svelte-ignore a11y-label-has-associated-control -->
          <label className="label">
            <span className="label-text">PHONE</span>
          </label>
          <input value={representative_phone} type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
        </div>
      </div>
      <div className="flex justify-center">
        <div className="form-control w-full max-w-xs pr-2">
          <!-- svelte-ignore a11y-label-has-associated-control -->
          <label className="label">
            <span className="label-text">EMAIL</span>
          </label>
          <input value={representative_email} type="email" placeholder="contact@example.com" className="input input-bordered w-full max-w-xs" required/>
        </div>
      </div>

    {/if}

    {#if general_manager}
      <h2 className="font-bold text-md text-center mt-4">GENERAL MANAGER</h2>
      <div className="flex justify-center">
        
        <div className="form-control w-full max-w-xs pr-2">
          <!-- svelte-ignore a11y-label-has-associated-control -->
          <label className="label">
            <span className="label-text">NAME</span>
          </label>
          <input value={general_manager_name} type="text" placeholder="Last, First" className="input input-bordered w-full max-w-xs" />
        </div>
        
        <div className="form-control w-full max-w-xs pr-2">
          <!-- svelte-ignore a11y-label-has-associated-control -->
          <label className="label">
            <span className="label-text">TITLE</span>
          </label>
          <input value={general_manager_title} type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs"/>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="form-control w-full max-w-xs pr-2">
          <!-- svelte-ignore a11y-label-has-associated-control -->
          <label className="label">
            <span className="label-text">PHONE</span>
          </label>
          <input value={general_manager_phone} type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
        </div>
        
        <div className="form-control w-full max-w-xs pr-2">
          <!-- svelte-ignore a11y-label-has-associated-control -->
          <label className="label">
            <span className="label-text">EMAIL</span>
          </label>
          <input value={general_manager_email} type="email" placeholder="contact@example.com" className="input input-bordered w-full max-w-xs" />
        </div>
      </div>
    {/if}
    <div className="flex">
      <button className="btn btn-wide my-5 mx-auto {status == "SUCCESS" ? 'btn-info' : ''} {status == "FAILED" ? 'btn-error' : ''}" type="submit">
        {status ? status : "UPDATE"}
      </button>
    </div>
  </form>  */}