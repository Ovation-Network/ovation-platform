/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import { formatInput, filterEnhancedCommissionsDataByLocation, filterEnhancedCommissionsDataByName } from '~/utils/helpers';



export const PublicSupplierDatabaseTable: React.FC<PublicSupplierDatabaseProps[]> = (props) => {
  const [filter, setFilter] = useState<string>('supplier');
  const [search, setSearch] = useState<string>('');
  const [enhancedCommissionData, setEnhancedCommissionData] = useState<PublicSupplierDatabaseProps[]>([]);

  useEffect(() => {
    // set enhancedCommissionData to props
    setEnhancedCommissionData(props);

    // if search is not empty, filter enhancedCommissionData by search
    // search !== '' && setEnhancedCommissionData((currentData) => filter === 'supplier' ? filterEnhancedCommissionsDataByName(props, formatInput(search)) : filterEnhancedCommissionsDataByLocation(props, formatInput(search)));

  }, [filter, search, props])

  return (
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
            {enhancedCommissionData.map((row, i) => (
              <tr className="text-black text-md text-center" key={i}>
                <td className={i % 2 ? "bg-stone-300 p-2" : "bg-stone-100 p-2"}>
                  {row.city}, {row.state}<br/>
                  {row.country}<br/>
                </td>
                <td className={i % 2 ? "bg-stone-300 p-2" : "bg-stone-100 p-2"}>{row.supplier}</td>
                <td className={i % 2 ? "bg-stone-300 p-2" : "bg-stone-100 p-2"}>{row.commission ? row.commission : ''}</td>
                <td className={i % 2 ? "bg-stone-300" : "bg-stone-100"}>{row.bookingInstruction ? row.bookingInstruction : ''}</td>
                <td className={i % 2 ? "bg-stone-300" : "bg-stone-100"}>{row.specialAmenity ? row.specialAmenity : ''}</td>
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
  );
}

/* COMPONENT FOR RENDERING CONTACT INFO */

/* const ContactInfo = () => {

} */

type PublicSupplierDatabaseProps = {
  supplier: string;
  supplierType: string;
  city: string | null;
  country: string | null;
  state: string | null;
  representative: RespresentativeContact | null;
  generalManager: GeneralManagerContact | null;
  representativeCompany: RepresentativeCompanyContact | null;
}

type RespresentativeContact = {
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
  representativeCompany: string | null;
}