/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useCallback } from 'react';
import { api } from '~/utils/api';
import Link from 'next/link';

export const AdminSupplierDatabaseTable: React.FC = () => {

  const { data, isLoading } = api.supplier.getSupplierContacts.useQuery({}, {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    staleTime: 3600000
  });

  const [filter, setFilter] = useState<string>('supplier');
  const [search, setSearch] = useState<string>('');
  const [suppliers, setSuppliers] = useState<typeof data>(undefined);
  const [maxPage , setMaxPage] = useState<number>(1);
  const [startIndex, setStartIndex] = useState<number>(0);
  const [endIndex, setEndIndex] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const suppliersPerPage = 50; // suppliers to be show per page

  const nextPage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (currentPage < maxPage) {
      setCurrentPage((currentPage) => currentPage + 1);
    }
  }

  const previousPage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (currentPage > 1) {
      setCurrentPage((currentPage) => currentPage - 1);
    }
  }

  const filterSuppliers = useCallback((filter: string, search: string) => {
    if (filter === 'supplier') {
      return data?.filter(supplier => supplier.name.toLowerCase().includes(search.toLowerCase()));
    } else if (filter === 'location') {
      return data?.filter(supplier => supplier.city?.toLowerCase().includes(search.toLowerCase()) ?? supplier.state?.toLowerCase().includes(search.toLowerCase()) ?? supplier.country?.toLowerCase().includes(search.toLowerCase()));
    } else {
      return data;
    }
  }, [data]);

  useEffect(() => {
    currentPage > maxPage && setCurrentPage(1); // if current page is greater than max page, set current page to max page
    const currentSuppliers = filterSuppliers(/* data,  */filter, search) ?? [];
    
    setMaxPage(Math.ceil(currentSuppliers?.length / suppliersPerPage)); // calculate max page
    setStartIndex((currentPage - 1) * suppliersPerPage); // calculate start index
    setEndIndex(startIndex + suppliersPerPage); // calculate end index
    setSuppliers(filterSuppliers(/* data, */ filter, search)?.slice(startIndex, endIndex)); // filter suppliers based on search and filter
    
  }, [filter, search, data, isLoading, currentPage, startIndex, endIndex, maxPage, filterSuppliers])

  if (isLoading) return (
    <div className="flex justify-center py-80">
      <h1 className='text-bold text-xl text-teal-400 animate-bounce'>
        LOADING
        <>
          <span className="loading loading-ball loading-xs"></span>
          <span className="loading loading-ball loading-sm"></span>
          <span className="loading loading-ball loading-md"></span>
          <span className="loading loading-ball loading-lg"></span>
        </>
      </h1>
    </div>
  )

  return (
    <div className="min-w-full flex flex-col justify-center">
      <div className="flex justify-between mb-auto">
        {/* Search box and filter dropdown */}
        <div className="join ml-2">
          <div>
            <div>
              <input className="input input-bordered join-item" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)}/>
            </div>
          </div>
          <select className="select select-bordered join-item" value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="supplier">Supplier</option>
            <option value="location">Location</option>
          </select>
          <div className="indicator">
            <button className="btn join-item">Search</button>
          </div>
        </div>
        {/* Search box and filter dropdown */}

        {/* PAGINATION */}
        <div className="flex justify-center mr-2 self-center">
          <div className="flex flex-row">
            <button className="btn btn-primary btn-sm" onClick={previousPage}>Previous</button>
            <div className="flex items-center justify-center px-2 text-sm font-medium text-gray-700">
              {currentPage} of {maxPage}
            </div>
            <button className="btn btn-primary btn-sm" onClick={nextPage}>Next</button>
          </div>
        </div>
        {/* PAGINATION */}

        {/* ADD NEW SUPPLIER BUTTON */}
        <Link href={`/admin/supplier/add`}>
          <div className="btn btn-sm bg-green-400">ADD NEW SUPPLIER / PROPERTY</div>
        </Link>

        {/* ADD NEW SUPPLIER BUTTON */}


      </div>
      

    {/* TABLE CONTAINING DATA */}


      <table className="table-fixed w-full min-h-full">
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
          {isLoading && <tr><td><div className="flex w-screen h-60 m-auto justify-center align-middle items-center text-black font-semibold text-lg">LOADING....</div></td></tr>}
          {suppliers?.length === 0 &&  <tr><td><div className="flex w-screen h-60 m-auto justify-center align-middle items-center text-black font-semibold text-lg">No results found....</div></td></tr>}
          {suppliers?.map((row, i) => (
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
                <Link href={`/admin/supplier/${row.id}`}>
                  <div className="btn">EDIT</div>
                </Link>
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
    </div>
  );
}