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
  const [ supplierType, setSupplierType ] = useState<string | null>(null);
  const [ supplierCountry, setSupplierCountry ] = useState<string | null>(null);
  const [ supplierCity, setSupplierCity ] = useState<string | null>(null);
  const [ supplierState, setSupplierState ] = useState<string | null>(null);
  const [ onsiteContact, setOnsiteContact ] = useState<boolean>(false);
  const [ onsiteContactName, setOnsiteContactName ] = useState<string | null>(null);
  const [ onsiteContactTitle, setOnsiteContactTitle ] = useState<string | null>(null);
  const [ onsiteContactPhone, setOnsiteContactPhone ] = useState<string | null>(null);
  const [ onsiteContactEmail, setOnsiteContactEmail ] = useState<string | null>(null);
  const [ representativeCompany, setRepresentativeCompany ] = useState<boolean>(false);
  const [ representativeCompanyName, setRepresentativeCompanyName ] = useState<string | null>(null);
  const [ representativeName, setRepresentativeName ] = useState<string | null>(null);
  const [ representativeTitle, setRepresentativeTitle ] = useState<string | null>(null);
  const [ representativePhone, setRepresentativePhone ] = useState<string | null>(null);
  const [ representativeEmail, setRepresentativeEmail ] = useState<string | null>(null);
  const [ generalManager, setGeneralManager ] = useState<boolean>(false);
  const [ generalManagerName, setGeneralManagerName ] = useState<string | null>(null);
  const [ generalManagerTitle, setGeneralManagerTitle ] = useState<string | null>(null);
  const [ generalManagerPhone, setGeneralManagerPhone ] = useState<string | null>(null);
  const [ generalManagerEmail, setGeneralManagerEmail ] = useState<string | null>(null);


  const supplierTypeOptions = ['HOTEL', 'DMC', 'CRUISE', 'RAIL', 'REPRESENTATION_COMPANY', 'AIR', 'TOUR_OPERTATOR', 'CAR_RENTAL', 'TRAVEL_INSURANCE', 'CHAUFFEUR_SERVICES', 'OTHER']

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    console.log('submitting form');
  }
  return (
    <>
    <form onSubmit={handleSubmit}>
    <div class="flex justify-center">
      <div class="form-control w-full max-w-xs pr-2">
        <label class="label">
          <span class="label-text">SUPPLIER NAME</span>
        </label>
        <input bind:value={supplier_name} type="text" placeholder="Type here" class="input input-bordered w-full max-w-xs" required/>
      </div>

      <div class="form-control w-full max-w-xs">
        <!-- svelte-ignore a11y-label-has-associated-control -->
        <label class="label">
          <span class="label-text">COUNTRY</span>
        </label>
        <input bind:value={supplier_country} type="text" placeholder="Type here" class="input input-bordered w-full max-w-xs" required/>
      </div>
    </div>
    <div class="flex justify-center">
      <div class="form-control w-full max-w-xs pr-2">
        <!-- svelte-ignore a11y-label-has-associated-control -->
        <label class="label">
          <span class="label-text">CITY</span>
        </label>
        <input bind:value={supplier_city} type="text" placeholder="Type here" class="input input-bordered w-full max-w-xs" required/>
      </div>
      <div class="form-control w-full max-w-xs">
        <label class="label">
          <span class="label-text">STATE</span>
        </label>
        <input bind:value={supplier_state} type="text" placeholder="Type here" class="input input-bordered w-full max-w-xs" />
      </div>
    </div>
    <div class="flex justify-center">
      <div class="form-control w-full max-w-xs">
        <label class="label">
          <span class="label-text">TYPE</span>
        </label>
        <select id="option-select" class="select select-bordered w-full max-w-xs" bind:value={supplier_type} required>
          <option disabled selected value="">--Choose Suppliery Type--</option>
          {#each options as option}
            <option value={option}>{option}</option>
          {/each}                                             
        </select>

      <div class="btn-group my-5">
        <button class={onsite_contact ? 'btn btn-active' : 'btn'} value="onsite" on:click|preventDefault={(e) => handleToggle(e)}>ONSITE</button>
        <button class={representative_company ? 'btn btn-active' : 'btn'} value="rep" on:click|preventDefault={(e) => handleToggle(e)}>REP COMPANY</button>
        <button class={general_manager ? 'btn btn-active' : 'btn'} value="manager" on:click|preventDefault={(e) => handleToggle(e)}>GEN MANAGER</button>
      </div>
    </div>

    </div>

    // CODE FOR ONSITE CONTACT
      <h2 class="font-bold text-md text-center mt-2">ONSITE CONTACT</h2>
      <div class="flex justify-center">
        <div class="form-control w-full max-w-xs pr-2">
          <!-- svelte-ignore a11y-label-has-associated-control -->
          <label class="label">
            <span class="label-text">NAME</span>
          </label>
          <input bind:value={onsite_contact_name} type="text" placeholder="Last, First" class="input input-bordered w-full max-w-xs" required/>
        </div>
        
        <div class="form-control w-full max-w-xs">
          <!-- svelte-ignore a11y-label-has-associated-control -->
          <label class="label">
            <span class="label-text">TITLE</span>
          </label>
          <input bind:value={onsite_contact_title} type="text" placeholder="Type here" class="input input-bordered w-full max-w-xs"/>
        </div>
      </div>
      <div class="flex justify-center">
        <div class="form-control w-full max-w-xs pr-2">
          <!-- svelte-ignore a11y-label-has-associated-control -->
          <label class="label">
            <span class="label-text">PHONE</span>
          </label>
          <input bind:value={onsite_contact_phone} type="text" placeholder="Type here" class="input input-bordered w-full max-w-xs" />
        </div>

        <div class="form-control w-full max-w-xs">
          <!-- svelte-ignore a11y-label-has-associated-control -->
          <label class="label">
            <span class="label-text">EMAIL</span>
          </label>
          <input bind:value={onsite_contact_email} type="email" placeholder="contact@example.com" class="input input-bordered w-full max-w-xs" required/>
        </div>
      </div>

      <h2 class="font-bold text-md text-center mt-4">REPRESENTATION COMPANY</h2>
      <div class="flex justify-center">
        <div class="form-control w-full max-w-xs pr-2">
          <!-- svelte-ignore a11y-label-has-associated-control -->
          <label class="label">
            <span class="label-text">COMPANY</span>
          </label>
          <input bind:value={representative_company_name} type="text" placeholder="Type here" class="input input-bordered w-full max-w-xs" required/>
        </div>
        
        <div class="form-control w-full max-w-xs pr-2">
          <!-- svelte-ignore a11y-label-has-associated-control -->
          <label class="label">
            <span class="label-text">NAME</span>
          </label>
          <input bind:value={representative_name} type="text" placeholder="Last, First" class="input input-bordered w-full max-w-xs" required/>
        </div>
      </div>
      <div class="flex justify-center">
        <div class="form-control w-full max-w-xs pr-2">
          <!-- svelte-ignore a11y-label-has-associated-control -->
          <label class="label">
            <span class="label-text">TITLE</span>
          </label>
          <input bind:value={representative_title} type="text" placeholder="Type here" class="input input-bordered w-full max-w-xs"/>
        </div>
        
        <div class="form-control w-full max-w-xs pr-2">
          <!-- svelte-ignore a11y-label-has-associated-control -->
          <label class="label">
            <span class="label-text">PHONE</span>
          </label>
          <input bind:value={representative_phone} type="text" placeholder="Type here" class="input input-bordered w-full max-w-xs" />
        </div>
      </div>
      <div class="flex justify-center">
        <div class="form-control w-full max-w-xs pr-2">
          <!-- svelte-ignore a11y-label-has-associated-control -->
          <label class="label">
            <span class="label-text">EMAIL</span>
          </label>
          <input bind:value={representative_email} type="email" placeholder="contact@example.com" class="input input-bordered w-full max-w-xs" required/>
        </div>
      </div>

      <h2 class="font-bold text-md text-center mt-4">GENERAL MANAGER</h2>
      <div class="flex justify-center">
        
        <div class="form-control w-full max-w-xs pr-2">
          <!-- svelte-ignore a11y-label-has-associated-control -->
          <label class="label">
            <span class="label-text">NAME</span>
          </label>
          <input bind:value={general_manager_name} type="text" placeholder="Last, First" class="input input-bordered w-full max-w-xs" />
        </div>
        
        <div class="form-control w-full max-w-xs pr-2">
          <!-- svelte-ignore a11y-label-has-associated-control -->
          <label class="label">
            <span class="label-text">TITLE</span>
          </label>
          <input bind:value={general_manager_title} type="text" placeholder="Type here" class="input input-bordered w-full max-w-xs"/>
        </div>
      </div>
      <div class="flex justify-center">
        <div class="form-control w-full max-w-xs pr-2">
          <!-- svelte-ignore a11y-label-has-associated-control -->
          <label class="label">
            <span class="label-text">PHONE</span>
          </label>
          <input bind:value={general_manager_phone} type="text" placeholder="Type here" class="input input-bordered w-full max-w-xs" />
        </div>
        
        <div class="form-control w-full max-w-xs pr-2">
          <!-- svelte-ignore a11y-label-has-associated-control -->
          <label class="label">
            <span class="label-text">EMAIL</span>
          </label>
          <input bind:value={general_manager_email} type="email" placeholder="contact@example.com" class="input input-bordered w-full max-w-xs" />
        </div>
      </div>

    <div class="flex">
      <button class="btn btn-wide my-5 mx-auto {status == "SUCCESS" ? 'btn-info' : ''} {status == "FAILED" ? 'btn-error' : ''}" type="submit">
        {status ? status : "UPDATE"}
      </button>
    </div>
  </form>

    </>
  )
}


// CODE FOR PREVIOUS SUPPLIER ADD FORM
/* <form on:submit|preventDefault={handleSubmit}>
    <div class="flex justify-center">
      <div class="form-control w-full max-w-xs pr-2">
        <!-- svelte-ignore a11y-label-has-associated-control -->
        <label class="label">
          <span class="label-text">SUPPLIER NAME</span>
        </label>
        <input bind:value={supplier_name} type="text" placeholder="Type here" class="input input-bordered w-full max-w-xs" required/>
      </div>

      <div class="form-control w-full max-w-xs">
        <!-- svelte-ignore a11y-label-has-associated-control -->
        <label class="label">
          <span class="label-text">COUNTRY</span>
        </label>
        <input bind:value={supplier_country} type="text" placeholder="Type here" class="input input-bordered w-full max-w-xs" required/>
      </div>
    </div>
    <div class="flex justify-center">
      <div class="form-control w-full max-w-xs pr-2">
        <!-- svelte-ignore a11y-label-has-associated-control -->
        <label class="label">
          <span class="label-text">CITY</span>
        </label>
        <input bind:value={supplier_city} type="text" placeholder="Type here" class="input input-bordered w-full max-w-xs" required/>
      </div>
      <div class="form-control w-full max-w-xs">
        <!-- svelte-ignore a11y-label-has-associated-control -->
        <label class="label">
          <span class="label-text">STATE</span>
        </label>
        <input bind:value={supplier_state} type="text" placeholder="Type here" class="input input-bordered w-full max-w-xs" />
      </div>
    </div>
    <div class="flex justify-center">
      <div class="form-control w-full max-w-xs">
        <!-- svelte-ignore a11y-label-has-associated-control -->
        <label class="label">
          <span class="label-text">TYPE</span>
        </label>
        <select id="option-select" class="select select-bordered w-full max-w-xs" bind:value={supplier_type} required>
          <option disabled selected value="">--Choose Suppliery Type--</option>
          {#each options as option}
            <option value={option}>{option}</option>
          {/each}
        </select>

      <div class="btn-group my-5">
        <button class={onsite_contact ? 'btn btn-active' : 'btn'} value="onsite" on:click|preventDefault={(e) => handleToggle(e)}>ONSITE</button>
        <button class={representative_company ? 'btn btn-active' : 'btn'} value="rep" on:click|preventDefault={(e) => handleToggle(e)}>REP COMPANY</button>
        <button class={general_manager ? 'btn btn-active' : 'btn'} value="manager" on:click|preventDefault={(e) => handleToggle(e)}>GEN MANAGER</button>
      </div>
    </div>

    </div>
    {#if onsite_contact}
      <h2 class="font-bold text-md text-center mt-2">ONSITE CONTACT</h2>
      <div class="flex justify-center">
        <div class="form-control w-full max-w-xs pr-2">
          <!-- svelte-ignore a11y-label-has-associated-control -->
          <label class="label">
            <span class="label-text">NAME</span>
          </label>
          <input bind:value={onsite_contact_name} type="text" placeholder="Last, First" class="input input-bordered w-full max-w-xs" required/>
        </div>
        
        <div class="form-control w-full max-w-xs">
          <!-- svelte-ignore a11y-label-has-associated-control -->
          <label class="label">
            <span class="label-text">TITLE</span>
          </label>
          <input bind:value={onsite_contact_title} type="text" placeholder="Type here" class="input input-bordered w-full max-w-xs"/>
        </div>
      </div>
      <div class="flex justify-center">
        <div class="form-control w-full max-w-xs pr-2">
          <!-- svelte-ignore a11y-label-has-associated-control -->
          <label class="label">
            <span class="label-text">PHONE</span>
          </label>
          <input bind:value={onsite_contact_phone} type="text" placeholder="Type here" class="input input-bordered w-full max-w-xs" />
        </div>

        <div class="form-control w-full max-w-xs">
          <!-- svelte-ignore a11y-label-has-associated-control -->
          <label class="label">
            <span class="label-text">EMAIL</span>
          </label>
          <input bind:value={onsite_contact_email} type="email" placeholder="contact@example.com" class="input input-bordered w-full max-w-xs" required/>
        </div>
      </div>
    {/if}

    {#if representative_company}
      <h2 class="font-bold text-md text-center mt-4">REPRESENTATION COMPANY</h2>
      <div class="flex justify-center">
        <div class="form-control w-full max-w-xs pr-2">
          <!-- svelte-ignore a11y-label-has-associated-control -->
          <label class="label">
            <span class="label-text">COMPANY</span>
          </label>
          <input bind:value={representative_company_name} type="text" placeholder="Type here" class="input input-bordered w-full max-w-xs" required/>
        </div>
        
        <div class="form-control w-full max-w-xs pr-2">
          <!-- svelte-ignore a11y-label-has-associated-control -->
          <label class="label">
            <span class="label-text">NAME</span>
          </label>
          <input bind:value={representative_name} type="text" placeholder="Last, First" class="input input-bordered w-full max-w-xs" required/>
        </div>
      </div>
      <div class="flex justify-center">
        <div class="form-control w-full max-w-xs pr-2">
          <!-- svelte-ignore a11y-label-has-associated-control -->
          <label class="label">
            <span class="label-text">TITLE</span>
          </label>
          <input bind:value={representative_title} type="text" placeholder="Type here" class="input input-bordered w-full max-w-xs"/>
        </div>
        
        <div class="form-control w-full max-w-xs pr-2">
          <!-- svelte-ignore a11y-label-has-associated-control -->
          <label class="label">
            <span class="label-text">PHONE</span>
          </label>
          <input bind:value={representative_phone} type="text" placeholder="Type here" class="input input-bordered w-full max-w-xs" />
        </div>
      </div>
      <div class="flex justify-center">
        <div class="form-control w-full max-w-xs pr-2">
          <!-- svelte-ignore a11y-label-has-associated-control -->
          <label class="label">
            <span class="label-text">EMAIL</span>
          </label>
          <input bind:value={representative_email} type="email" placeholder="contact@example.com" class="input input-bordered w-full max-w-xs" required/>
        </div>
      </div>

    {/if}

    {#if general_manager}
      <h2 class="font-bold text-md text-center mt-4">GENERAL MANAGER</h2>
      <div class="flex justify-center">
        
        <div class="form-control w-full max-w-xs pr-2">
          <!-- svelte-ignore a11y-label-has-associated-control -->
          <label class="label">
            <span class="label-text">NAME</span>
          </label>
          <input bind:value={general_manager_name} type="text" placeholder="Last, First" class="input input-bordered w-full max-w-xs" />
        </div>
        
        <div class="form-control w-full max-w-xs pr-2">
          <!-- svelte-ignore a11y-label-has-associated-control -->
          <label class="label">
            <span class="label-text">TITLE</span>
          </label>
          <input bind:value={general_manager_title} type="text" placeholder="Type here" class="input input-bordered w-full max-w-xs"/>
        </div>
      </div>
      <div class="flex justify-center">
        <div class="form-control w-full max-w-xs pr-2">
          <!-- svelte-ignore a11y-label-has-associated-control -->
          <label class="label">
            <span class="label-text">PHONE</span>
          </label>
          <input bind:value={general_manager_phone} type="text" placeholder="Type here" class="input input-bordered w-full max-w-xs" />
        </div>
        
        <div class="form-control w-full max-w-xs pr-2">
          <!-- svelte-ignore a11y-label-has-associated-control -->
          <label class="label">
            <span class="label-text">EMAIL</span>
          </label>
          <input bind:value={general_manager_email} type="email" placeholder="contact@example.com" class="input input-bordered w-full max-w-xs" />
        </div>
      </div>
    {/if}
    <div class="flex">
      <button class="btn btn-wide my-5 mx-auto {status == "SUCCESS" ? 'btn-info' : ''} {status == "FAILED" ? 'btn-error' : ''}" type="submit">
        {status ? status : "UPDATE"}
      </button>
    </div>
  </form> */