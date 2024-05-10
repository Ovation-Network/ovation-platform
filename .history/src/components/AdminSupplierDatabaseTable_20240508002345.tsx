/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useCallback } from 'react';
import { api } from '~/utils/api';
import Link from 'next/link';

type searchByToggleProps = 'name' | 'location';

export const AdminSupplierDatabaseTable: React.FC = () => {

  const { data, isLoading } = api.supplier.getSupplierContacts.useQuery(undefined, {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    staleTime: 3600000
  });

  const maxItemsPerPage = 40;

  const [search, setSearch] = useState<string>('');
  const [searchBy, setSearchBy] = useState<searchByToggleProps>("name");

  const [suppliers, setSuppliers] = useState<typeof data>(data);
  const [page, setPage] = useState<number>(1);
  const [maxPages, setMaxPages] = useState<number>(1);
  const [startIndex, setStartIndex] = useState<number>(0);
  const [endIndex, setEndIndex] = useState<number>(maxItemsPerPage);

  const getPageSuppliers = useCallback((page: number) => {
    setSuppliers(data?.slice(startIndex, endIndex));
  }, [data, startIndex, endIndex]);

  const filterSupplierList = useCallback((searchBy: searchByToggleProps, search: string) => {
    if (search === '') alert('Please enter a value to search for');
    if (searchBy === 'name') { 
      setSuppliers((suppliers) => suppliers?.filter((supplier) => supplier.name.toLowerCase().includes(search.toLowerCase())))
    } else {
      setSuppliers((suppliers) => suppliers?.filter((supplier) => supplier.city?.toLowerCase().includes(search.toLowerCase()) ?? supplier.country?.toLowerCase().includes(search.toLowerCase())));
    }
  }, []);
    

  const handleSupplierSearch = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setPage(1);
    filterSupplierList(searchBy, search);
  }, [search, searchBy, filterSupplierList]);

  useEffect(() => {
    if (suppliers) {
      setMaxPages(Math.ceil(suppliers.length / maxItemsPerPage));
    } else if (data){
      setMaxPages(Math.ceil(data?.length / maxItemsPerPage));
    }

    setSuppliers(data?.slice(startIndex, endIndex));

  }, [suppliers, data, startIndex, endIndex]);

  const handleSearch = (e: React.MouseEvent) => {
    e.preventDefault();

    setSuppliers((suppliers) => suppliers?.filter((supplier) => searchBy === 'name' ? supplier.name.toLowerCase().includes(search.toLowerCase()) : supplier.city?.toLowerCase().includes(search.toLowerCase()) ?? supplier.country?.toLowerCase().includes(search.toLowerCase()) ));
  }

  const handlePageChange = (e: React.MouseEvent, direction: 'next' | 'prev') => {
    e.preventDefault();
    if (direction === 'next' && page < maxPages) {
      setPage(page + 1);
    } else if (direction === 'prev' && page > 1) {
      setPage(page - 1);
    }
  }
  
  const handleReset = (e: React.MouseEvent) => {
    e.preventDefault();
    setSearch('');
    setPage(1);
    setMaxPages(Math.ceil(data!.length / maxItemsPerPage));
    setSuppliers(data?.slice());
  }

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <div className="p-5">
        <div className="join">
          <div>
            <div>
              <input className="input input-bordered join-item" placeholder="Search" onChange={(e) => setSearch(e.target.value)}/>
            </div>
          </div>
          <select className="select select-bordered join-item" onChange={(e) => setSearchBy(e.target.value as searchByToggleProps)} defaultValue={"name"}>
            <option value="name">NAME</option>
            <option value="location">CITY/COUNTRY</option>
          </select>
          <div className="indicator">
            <span className="indicator-item badge badge-secondary">click to reset!</span> 
            <button className="btn join-item" onClick={(e) => handleSearch(e)}>Search</button>
            <button className="btn join-item" onClick={(e) => handleReset(e)}>Reset</button>
          </div>
        </div>
        {/* Search box and filter dropdown */}
        {/* <div className="input-group mb-5">
          <select className="select select-bordered" value={searchBy} onChange={(e) => setSearchBy(e.target.value as searchByToggleProps)}>
            <option value="name">NAME</option>
            <option value="location">CITY/COUNTRY</option>
          </select>
          <input type="text" placeholder="Search…" className="input input-bordered" value={search} onChange={(e) => setSearch(e.target.value)}/>
          <div className="btn" onClick={(e) => handleSearch(e)}>
            SEARCH
          </div>
          <div className="btn" onClick={(e) => handleReset(e)}>
            RESET
          </div>
        </div> */}

        {/* 
        <div className="join">
          <div>
            <div>
              <input className="input input-bordered join-item" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)}/>
            </div>
          </div>
          <select className="select select-bordered join-item" value={searchBy} onChange={(e) => setSearchBy(e.target.value as searchByToggleProps)}>
            <option value="name" selected>NAME</option>
            <option value="location">CITY/COUNTRY</option>
          </select>
          <div className="indicator">
            <span className="indicator-item badge badge-secondary">click to reset!</span> 
            <button className="btn join-item" onClick={(e) => handleSearch(e)}>Search</button>
            <button className="btn join-item" onClick={(e) => handleReset(e)}>Reset</button>
          </div>
        </div>
        
        */}
        <div className="join">
          <button className="btn join-item" onClick={(e) => handlePageChange(e, 'next')}>PREV</button>
          <button className="btn join-item" disabled>Page {page} of {maxPages}</button>
          <button className="btn join-item" onClick={(e) => handlePageChange(e, 'next')}>NEXT</button>
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

