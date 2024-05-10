/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useReducer } from 'react';
import { api } from '~/utils/api';
import Link from 'next/link';

type searchByToggleProps = 'name' | 'location';

type paginationState = {
  maxItemsPerPage: number;
  startIndex: number;
  page: number;
  maxPages: number;
}

const paginationReducer = (state: paginationState, action: { type: string, payload: number }) => {
  switch (action.type) {
    case 'SET_START_INDEX':
      return { ...state, startIndex: action.payload };
    case 'SET_END_INDEX':
      return { ...state, endIndex: action.payload };
    case 'SET_PAGE':
      return { ...state, page: action.payload };
    case 'SET_MAX_PAGES':
      return { ...state, maxPages: action.payload };
    default:
      return state;
  }
};

const pageState: paginationState = {
  maxItemsPerPage: 25,
  startIndex: 0,
  page: 0,
  maxPages: 0
}

export const AdminSupplierDatabaseTable: React.FC = () => {

  const { data, isLoading } = api.supplier.getSupplierContacts.useQuery(undefined, {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    staleTime: 3600000
  });

  const maxItemsPerPage = 25;


  const [search, setSearch] = useState<string>('');
  const [suppliers, setSuppliers] = useState<typeof data | undefined>(undefined);
  const [page, setPage] = useState<number>(0);
  const [maxPages, setMaxPages] = useState<number>(1);
  const [startIndex, setStartIndex] = useState<number>(0);
  const [endIndex, setEndIndex] = useState<number>(maxItemsPerPage);
  const [searchBy, setSearchBy] = useState<searchByToggleProps>("name");

  const chopSupplierList = ( data: typeof suppliers, firstIndex : number, lastIndex : number ) => {
    return data?.slice(firstIndex, lastIndex);
  }

  useEffect(() => {
    setStartIndex(page * maxItemsPerPage);
    setEndIndex((page + 1) * maxItemsPerPage);
    setSuppliers(data?.slice(startIndex, endIndex));

    if (suppliers != undefined) {
      setMaxPages(Math.ceil((suppliers?.length ? suppliers.length : 1) / maxItemsPerPage));
    } else {
      setMaxPages(Math.ceil((data?.length ? data.length : 1) / maxItemsPerPage));
    }

    // setFilteredSuppliers(undefined);
  }, [data, startIndex, endIndex, page, suppliers]);

  if (isLoading) return <div>Loading...</div>;

  const handleSearch = (e: React.MouseEvent) => {
    e.preventDefault();

    setSuppliers(data?.filter((supplier) => searchBy === 'name' ? supplier.name.toLowerCase().includes(search.toLowerCase()) : supplier.city?.toLowerCase().includes(search.toLowerCase()) ?? supplier.country?.toLowerCase().includes(search.toLowerCase()) ));
  }
  
  const handleReset = (e: React.MouseEvent) => {
    e.preventDefault();
    setSearch('');
    setSuppliers(chopSupplierList(data, startIndex, endIndex));
  }

  return (
    <>
      <div className="p-5">
        <div className="join">
          <div>
            <div>
              <input className="input input-bordered join-item" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)}/>
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
          <button className="btn join-item">Button</button>
          <button className="btn join-item" disabled>Page {page + 1} of {maxPages}</button>
          <button className="btn join-item">Button</button>
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

