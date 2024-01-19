/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import { api } from '~/utils/api';
import { NotifyIAPopup } from '~/components/NotifyIAPopup';

export const PublicSupplierDatabaseTable: React.FC = () => {

  /* CODE FOR OLD SVELTE PAGE:
    const itemsPerPage = 50;

  let currentPage = 1;

  const suppliers = data.suppliers

  $: startIndex = (currentPage - 1) * itemsPerPage;
  $: endIndex = startIndex + itemsPerPage;

  $: itemsOnCurrentPage = table.slice(startIndex, endIndex);
  $: maxPage = table.length / 50;

  $: currentItems = `${startIndex + 1} - ${endIndex > table.length ? table.length : endIndex} of ${table.length} items`
  */

  const { data, isLoading } = api.supplier.getSupplierContacts.useQuery(undefined, {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  const [filter, setFilter] = useState<string>('supplier');
  const [search, setSearch] = useState<string>('');
  const [filteredSuppliers, setFilteredSuppliers] = useState<typeof data>(undefined);
  const [maxPage , setMaxPage] = useState<number>(0);
  const [startIndex, setStartIndex] = useState<number>(0);
  const [endIndex, setEndIndex] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const suppliersPerPage = 50; // suppliers to be show per page

  const nextPage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (currentPage < maxPage) {
      setCurrentPage(currentPage + 1);
    }
  }

  const previousPage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  useEffect(() => {

    const chopSuppliers = (suppliers: typeof data, startIndex: number, endIndex: number) => {
    return suppliers?.slice(startIndex, endIndex);
  }

    setMaxPage(Math.ceil(data!.length / suppliersPerPage)); // calculate max page

    setStartIndex((currentPage - 1) * suppliersPerPage); // calculate start index
    setEndIndex(startIndex + suppliersPerPage); // calculate end index

    // if search is not empty, filter enhancedCommissionData by search
    if (search !== '') {
      setCurrentPage(1); // reset current page to 1
      const suppliers = data?.filter((supplier) => filter === 'supplier' ? supplier.name.toLowerCase().includes(search.toLowerCase()) : supplier.city?.toLowerCase().includes(search.toLowerCase()) ?? supplier.country?.toLowerCase().includes(search.toLowerCase()));
      setMaxPage(Math.ceil((suppliers!.length) / suppliersPerPage)); // calculate max page
      setFilteredSuppliers(chopSuppliers(suppliers, startIndex, endIndex));
    } else {
      setFilteredSuppliers(chopSuppliers(data, startIndex, endIndex));
    }
    

  }, [filter, search, data, isLoading, currentPage, startIndex, endIndex, filteredSuppliers])

  if (isLoading) return <div>Loading...</div>;



  return (
    <>
{/* <div class="join">
  <div>
    <div>
      <input class="input input-bordered join-item" placeholder="Search"/>
    </div>
  </div>
  <select class="select select-bordered join-item">
    <option disabled selected>Filter</option>
    <option>Sci-fi</option>
    <option>Drama</option>
    <option>Action</option>
  </select>
  <div class="indicator">
    <span class="indicator-item badge badge-secondary">new</span> 
    <button class="btn join-item">Search</button>
  </div>
</div> */}

{/* <div className="input-group mb-5">
      <select className="select select-bordered" value={filter} onChange={(e) => setFilter(e.target.value)}>
        <option value="supplier">Supplier</option>
        <option value="location">Location</option>
      </select>
      <input type="text" placeholder="Search…" className="input input-bordered" value={search} onChange={(e) => setSearch(e.target.value)}/>
      <div className="btn" onClick={() => setSearch('')}>
        RESET
      </div>
    </div> */}

    {/* Search box and filter dropdown */}
    <div className="join">
      <div>
        <div>
          <input className="input input-bordered join-item" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)}/>
        </div>
      </div>
      <select className="select select-bordered join-item">
        <option disabled selected>Filter</option>
        <option>Sci-fi</option>
        <option>Drama</option>
        <option>Action</option>
      </select>
      <div className="indicator">
        <span className="indicator-item badge badge-secondary">new</span> 
        <button className="btn join-item">Search</button>
      </div>
    </div>

    {/* PAGINATION */}
    <div className="flex justify-center">
      <div className="flex flex-row">
        <button className="btn btn-primary btn-sm" onClick={previousPage}>Previous</button>
        <div className="flex items-center justify-center px-2 text-sm font-medium text-gray-700">
          {currentPage} of {maxPage}
        </div>
        <button className="btn btn-primary btn-sm" onClick={nextPage}>Next</button>
      </div>
    </div>

    {/* TABLE CONTAINING DATA */}


      <table className="table-fixed w-full">
        <thead>
          <tr>
            <th className="bg-teal-400 text-xl text-white">Location</th>
            <th className="bg-teal-400 text-xl text-white">Supplier</th> 
            <th className="bg-teal-400 text-xl text-white">Contact</th> 
            <th className="bg-teal-400 text-xl text-white">Rep. Company</th>
            <th className="bg-teal-400 text-xl text-white">GM</th>
            <th className="bg-teal-400 text-xl text-white"></th>
          </tr>
        </thead> 
        <tbody>
          {filteredSuppliers?.map((row, i) => (
            <tr className="text-black text-md text-center" key={i}>
              <td className={i % 2 ? "bg-stone-300 p-2" : "bg-stone-100 p-2"}>
                {row.city && `${row.city}, `}{row.state && `${row.state}, `}<br/>
                {row.country}<br/>
              </td>
              <td className={i % 2 ? "bg-stone-300 p-2" : "bg-stone-100 p-2"}>{row.name}</td>
              <td className={i % 2 ? "bg-stone-300 p-2" : "bg-stone-100 p-2"}>
                <div className="flex flex-col" >
                  {row.contacts?.map((contact, i ) => (
                    <div key={`${i}-contact-item`}>
                      <p className="text-md font-bold">
                        {contact.name ? contact.name : ''}
                      </p>
                      <p className="text-sm font-bold">
                        {contact.title ? contact.title : ''}
                      </p>
                      <p className="text-sm pt-1">
                        {contact.email && 
                          <a href={`mailto:${contact.email}`}>
                          {contact.email}
                          </a>
                        }
                      </p>
                      <p className="text-sm pt-1">
                        {contact.phone && 
                          <a href={`tel:${contact.phone}`}>
                          {contact.phone}
                          </a>
                        }
                      </p>
                    </div>
                  ))}
                </div>
              </td>
              <td className={i % 2 ? "bg-stone-300" : "bg-stone-100"}>
                <div className="flex flex-col" >
                  {row.representativeCompanies?.map((contact, i ) => (
                    <div key={`${i}-contact-item`}>
                      <p className="text-md font-bold">
                        {contact.name ? contact.name : ''}
                      </p>
                      <p className="text-sm font-bold">
                        {contact.companyName ? contact.companyName : ''}
                      </p>
                      <p className="text-sm font-semibold">
                        {contact.title ? contact.title : ''}
                      </p>
                      <p className="text-sm pt-1">
                        {contact.email && 
                          <a href={`mailto:${contact.email}`}>
                          {contact.email}
                          </a>
                        }
                      </p>
                      <p className="text-sm pt-1">
                        {contact.phone && 
                          <a href={`tel:${contact.phone}`}>
                          {contact.phone}
                          </a>
                        }
                      </p>
                    </div>
                  ))}
                </div>
              </td>
              <td className={i % 2 ? "bg-stone-300" : "bg-stone-100"}>
                {row.generalManagers?.map((contact, i ) => (
                  <div key={`${i}-contact-item`}>
                    <p className="text-md font-bold">
                      {contact.name ? contact.name : ''}
                    </p>
                    <p className="text-sm font-semibold">
                      {contact.title ? contact.title : ''}
                    </p>
                    <p className="text-sm pt-1">
                      {contact.email && 
                        <a href={`mailto:${contact.email}`}>
                        {contact.email}
                        </a>
                      }
                    </p>
                    <p className="text-sm pt-1">
                      {contact.phone && 
                        <a href={`tel:${contact.phone}`}>
                        {contact.phone}
                        </a>
                      }
                    </p>
                  </div>
                  ))}
              </td>
              <td className={i % 2 ? "bg-stone-300" : "bg-stone-100"}>
                <NotifyIAPopup supplierId={row.id} supplierName={row.name} />
              </td>
            </tr>
          ))}
        </tbody> 
        <tfoot>
          <tr>
            <th className="bg-teal-400 text-xl text-white">Location</th>
            <th className="bg-teal-400 text-xl text-white">Supplier</th> 
            <th className="bg-teal-400 text-xl text-white">Contact</th> 
            <th className="bg-teal-400 text-xl text-white">Rep. Company</th>
            <th className="bg-teal-400 text-xl text-white">GM</th>
            <th className="bg-teal-400 text-xl text-white"></th>
          </tr>
        </tfoot>
      </table>

    </>
  );
}

