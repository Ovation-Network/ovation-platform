/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import { api } from '~/utils/api';
import Link from 'next/link';

export const AdminSupplierDatabaseTable: React.FC = () => {

  const { data, isLoading } = api.supplier.getSupplierContacts.useQuery(undefined, {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  const [filter, setFilter] = useState<string>('supplier');
  const [search, setSearch] = useState<string>('');
  const [filteredSuppliers, setFilteredSuppliers] = useState<typeof data>(undefined);

  useEffect(() => {

    // if search is not empty, filter enhancedCommissionData by search
    if (search !== '') {
      setFilteredSuppliers(data?.filter((supplier) => filter === 'supplier' ? supplier.name.toLowerCase().includes(search.toLowerCase()) : supplier.city?.toLowerCase().includes(search.toLowerCase()) ?? supplier.country?.toLowerCase().includes(search.toLowerCase()) ));
    } else {
      setFilteredSuppliers(data);
    }
    

  }, [filter, search, data, isLoading])

  if (isLoading) return <div>Loading...</div>;



  return (
    <>
      <div className="p-5">
        {/* Search box and filter dropdown */}
        <div className="input-group mb-5">
          <select className="select select-bordered" value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="supplier">Supplier</option>
            <option value="location">Location</option>
          </select>
          <input type="text" placeholder="Search…" className="input input-bordered" value={search} onChange={(e) => setSearch(e.target.value)}/>
          <div className="btn" onClick={() => setSearch('')}>
            RESET
          </div>
        </div>

        {/* TABLE CONTAINING DATA */}

        <div>
          <table className="table-fixed">
            <thead>
              <tr>
                <th className="bg-teal-400 text-xl">Location</th>
                <th className="bg-teal-400 text-xl">Supplier</th> 
                <th className="bg-teal-400 text-xl">Contact</th> 
                <th className="bg-teal-400 text-xl">Rep. Company</th>
                <th className="bg-teal-400 text-xl">GM</th>
                <th className="bg-teal-400 text-xl"></th>
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
                      {/* 
                       <td class={i % 2 ? "bg-stone-300 px-6" : "bg-stone-100 px-6"}>
                        <p class="text-md font-bold">
                          {row.representative_company.company ? row.representative_company.company : ''}
                        </p>
                        <p class="text-md font-semibold pt-1">
                          {row.representative_company.name ? row.representative_company.name : ''}
                        </p>
                        <p class="text-sm italic">
                          {row.representative_company.title ? row.representative_company.title : 'Listed Contact'}
                        </p>
                        {#if row.representative_company.email}
                        <p class="text-sm pt-1">
                          <a href={`mailto:${row.representative_company.email}`}>
                            {row.representative_company.email}
                          </a>
                        </p>
                        {/if}
                        {#if row.representative_company.phone}
                        <p class="text-sm pt-1">
                          <a href={`tel:${row.representative_company.phone}`}>
                            {row.representative_company.phone}
                          </a>
                        </p>
                        {/if}
                      </td>
                      */}
                      {row.contacts?.map((contact, i ) => (
                        <div key={`${i}-contact-item`}>
                          <p className="text-md font-bold">
                            {contact.name ? contact.name : ''}
                          </p>
                          <p className="text-md font-bold">
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
                              {contact.email}
                              </a>
                            }
                          </p>
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className={i % 2 ? "bg-stone-300" : "bg-stone-100"}>CONTACT COMPONENT</td>
                  <td className={i % 2 ? "bg-stone-300" : "bg-stone-100"}>CONTACT COMPONENT</td>
                  <td className={i % 2 ? "bg-stone-300" : "bg-stone-100"}><Link className="btn btn-sm" href={`/admin/suppliers/${row.id}`}>EDIT</Link></td>
                </tr>
              ))}
            </tbody> 
            <tfoot>
              <tr>
                <th className="bg-teal-400 text-xl">Location</th>
                <th className="bg-teal-400 text-xl">Supplier</th> 
                <th className="bg-teal-400 text-xl">Contact</th> 
                <th className="bg-teal-400 text-xl">Rep. Company</th>
                <th className="bg-teal-400 text-xl">GM</th>
                <th className="bg-teal-400 text-xl"></th>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </>
  );
}

