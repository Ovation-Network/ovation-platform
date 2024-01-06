import { useState, useEffect } from 'react';
import { formatInput, filterEnhancedCommissionsDataByLocation, filterEnhancedCommissionsDataByName } from '~/utils/helpers';



export const PublicEnhancedCommissionsTable: React.FC<PublicEnhancedCommissionProps[]> = (props) => {
  const [filter, setFilter] = useState<string>('supplier');
  const [search, setSearch] = useState<string>('');
  const [enhancedCommissionData, setEnhancedCommissionData] = useState<PublicEnhancedCommissionProps[]>([]);

  useEffect(() => {
    // set enhancedCommissionData to props
    setEnhancedCommissionData(props);

    // if search is not empty, filter enhancedCommissionData by search
    search !== '' && setEnhancedCommissionData((currentData) => filter === 'supplier' ? filterEnhancedCommissionsDataByName(props, formatInput(search)) : filterEnhancedCommissionsDataByLocation(props, formatInput(search)));

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
              <th className="bg-teal-400 text-xl">Commission</th> 
              <th className="bg-teal-400 text-xl">Booking Instructions</th>
              <th className="bg-teal-400 text-xl">Special Amenities</th>
            </tr>
          </thead> 
          <tbody>
            {/* {#each table ? table : sheetData as row, i}
            <tr className="text-black text-md text-center">
              <td className={i % 2 ? "bg-stone-300 p-2" : "bg-stone-100 p-2"}>{row.region}</td>
              <td className={i % 2 ? "bg-stone-300 p-2" : "bg-stone-100 p-2"}>{row.country}</td>
              <td className={i % 2 ? "bg-stone-300 p-2" : "bg-stone-100 p-2"}>{row.city}</td>
              <td className={i % 2 ? "bg-stone-300 p-2" : "bg-stone-100 p-2"}>{row.hotel}</td>
              <td className={i % 2 ? "bg-stone-300 p-2" : "bg-stone-100 p-2"}>{row.commission ? row.commission : ''}</td>
              <td className={i % 2 ? "bg-stone-300" : "bg-stone-100"}>{row.booking_instructions ? row.booking_instructions : ''}</td>
              <td className={i % 2 ? "bg-stone-300" : "bg-stone-100"}>{row.special_amenity ? row.special_amenity : ''}</td>
            </tr>
            {/each}
            {#if table && table.length === 0}
            <div className="justify-center">
              <strong className="text-xl">NO RESULTS FOUND</strong>
            </div>
            
            {/if} */}
          </tbody> 
          <tfoot>
            <tr>
              <th className="bg-teal-400 text-xl">Location</th>
              <th className="bg-teal-400 text-xl">Supplier</th> 
              <th className="bg-teal-400 text-xl">Commission</th> 
              <th className="bg-teal-400 text-xl">Booking Instructions</th>
              <th className="bg-teal-400 text-xl">Special Amenities</th>
            </tr>
          </tfoot>
        </table>
      </div>


    </div>
  );
}

type PublicEnhancedCommissionProps = {
  region: string;
  country: string;
  city: string;
  supplier: string;
  commission: string;
  specialAmenity: string | null;
  bookingInstruction: string | null;
  startDate: Date | null;
  endDate: Date | null;
}